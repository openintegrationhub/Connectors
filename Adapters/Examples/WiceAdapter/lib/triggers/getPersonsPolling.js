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

const wice = require('./../actions/wice.js');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {

  // Create a session in Wice
  wice.createSession(cfg, () => {

    if (cfg.cookie) {
      let contacts = [];
      const self = this;

      function getPersons() {
        return new Promise((resolve, reject) => {
          const requestOptions = {
            uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_all_persons&full_list=1&cookie=${cfg.cookie}`,
            headers: {
              'X-API-KEY': cfg.apikey
            }
          };

          request.get(requestOptions)
            .then((res) => {
              const resObj = JSON.parse(res);
              let customPersonFormat;

              if (resObj.loop_addresses == undefined) {
                reject('No contacts found ...');
              }

              resObj.loop_addresses.forEach((user) => {
                customPersonFormat = {
                  rowid: user.rowid,
                  for_rowid: user.for_rowid,
                  name: user.name,
                  firstname: user.firstname,
                  email: user.email,
                  title: user.title,
                  salutation: user.salutation,
                  date_of_birth: user.date_of_birth,
                  private_street: user.private_street,
                  private_street_number: user.private_street_number,
                  private_zip_code: user.private_zip_code,
                  private_town: user.private_town,
                  private_state: user.state,
                  private_country: user.private_country,
                  house_post_code: user.house_post_code,
                  phone: user.phone,
                  fax: user.fax,
                  private_phone: user.private_phone,
                  private_mobile_phone: user.private_mobile_phone,
                  private_email: user.private_email
                };
                contacts.push(customPersonFormat);
              });
              resolve(contacts);
            }).catch((e) => {
              reject(e);
            });
        });
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
  });
}
