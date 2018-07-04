/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

"use strict";
const Q = require('q');
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const { createSession } = require('./../utils/wice');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {
  const self = this;
  let contacts = [];

  async function fetchAll(options) {
    try {
      let result = [];
      const persons = await request.get(options);
      const personsObj = JSON.parse(persons);

      if (personsObj.loop_addresses == undefined) {
        throw new Error('No contacts found...');
      }

      personsObj.loop_addresses.forEach((person) => {
        const currentPerson = customPerson(person);
        result.push(currentPerson);
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  function customPerson(person) {
    const customUserFormat = {
      rowid: person.rowid,
      for_rowid: person.for_rowid,
      same_contactperson: person.same_contactperson,
      name: person.name,
      firstname: person.firstname,
      email: person.email,
      title: person.title,
      salutation: person.salutation,
      birthday: person.birthday,
      private_street: person.private_street,
      private_street_number: person.private_street_number,
      private_zip_code: person.private_zip_code,
      private_town: person.private_town,
      private_state: person.private_state,
      private_country: person.private_country,
      phone: person.phone,
      fax: person.fax,
      private_phone: person.private_phone,
      private_mobile_phone: person.private_mobile_phone,
      private_email: person.private_email
    };
    return customUserFormat;
  }

  async function getPersons() {
    try {
      const cookie = await createSession(cfg);
      const options = {
        uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_all_persons&full_list=1&cookie=${cookie}`,
        headers: { 'X-API-KEY': cfg.apikey }
      };

      contacts = await fetchAll(options);
      return contacts;
    } catch (e) {
      throw new Error(e);
    }
  }

  function emitData() {
    const data = messages.newMessageWithBody({
      "persons": contacts
    });
    self.emit('data', data);
  }

  function emitError(e) {
    console.log(`ERROR: ${e}`);
    self.emit('error', e);
  }

  function emitEnd() {
    console.log('Finished execution');
    self.emit('end');
  }

  Q()
    .then(getPersons)
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}
