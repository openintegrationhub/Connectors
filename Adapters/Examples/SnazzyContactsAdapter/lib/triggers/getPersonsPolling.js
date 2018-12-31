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
const { messages } = require('elasticio-node');
const { createSession } = require('./../utils/snazzy');

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 * @param snapshot saves the current state of integration step for the future reference
 */
function processTrigger(msg, cfg, snapshot = {}) {
  const self = this;

  snapshot.lastUpdated = snapshot.lastUpdated || (new Date(0)).toISOString();
  console.log(`Last Updated: ${snapshot.lastUpdated}`);

  async function emitData() {
    const contacts = await getPersons(cfg, snapshot);

    console.log(`Found ${contacts.length} new records.`);

    if (contacts.length > 0) {
      contacts.forEach(elem => {
        self.emit('data', messages.newMessageWithBody(elem));
      });
      snapshot.lastUpdated = contacts[contacts.length - 1].last_update;
      console.log(`New snapshot: ${snapshot.lastUpdated}`);
      self.emit('snapshot', snapshot);
    } else {
      self.emit('snapshot', snapshot);
    }
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
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}

async function getPersons(cfg, snapshot = {}) {
  try {
    const cookie = await createSession(cfg);
    const uri = `http://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_mainview?&mp_cookie=${cookie}`;
    const requestOptions = {
      uri,
      json: {
        'max_hits': 100 // just for testing purposes
      },
      headers: {
        'X-API-KEY': cfg.apikey
      }
    };
    const contacts = await fetchAll(requestOptions, snapshot);

    if (!contacts || !Array.isArray(contacts)) throw `Expected records array. Instead received: ${JSON.stringify(contacts)}`;
    return contacts;
  } catch (e) {
    throw new Error(e);
  }
}

async function fetchAll(options, snapshot) {
  try {
    let result = [];
    const persons = await request.post(options);
    const totalEntries = persons.content[0].total_entries_readable_with_current_permissions;

    if (totalEntries === 0) return result;

    persons.content.filter((person) => {
      const currentPerson = customPerson(person);
      currentPerson.last_update > snapshot.lastUpdated && result.push(currentPerson);
    });

    result.sort((a, b) => Date.parse(a.last_update) - Date.parse(b.last_update));
    return result;
  } catch (e) {
    throw new Error(e);
  }
}

function customPerson(person) {
  const customUserFormat = {
    rowid: person.rowid,
    firstname: person.firstname,
    name: person.name,
    email: person.email,
    for_rowid: person.for_rowid,
    same_contactperson: person.same_contactperson,
    last_update: person.last_update,
    is_deleted: person.is_deleted,
    title: person.title,
    salutation: person.salutation,
    position: person.position,
    date_of_birth: person.date_of_birth,
    private_street: person.private_street,
    private_zip_code: person.private_zip_code,
    private_town: person.private_town,
    private_state: person.private_state,
    private_country: person.private_country,
    private_country_symbol: person.private_country_symbol,
    house_post_code: person.house_post_code,
    fax: person.fax,
    phone: person.phone,
    phone2: person.phone2,
    phone3: person.phone3,
    mobile_phone: person.mobile_phone,
    private_mobile_phone: person.private_mobile_phone,
    private_phone: person.private_phone,
    private_email: person.private_email,
    picture_url: person.picture_url,
    xing_url: person.xing_url,
    facebook_url: person.facebook_url,
    linked_in_url: person.linked_in_url,
    twitter_url: person.twitter_url,
    googleplus_url: person.googleplus_url,
    youtube_url: person.youtube_url,
    url: person.url,
    skype: person.skype
  };
  return customUserFormat;
}

module.exports = {
  process: processTrigger,
  getPersons
}
