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
      let contact = [];
      const self = this;

      function getPerson() {
        return new Promise((resolve, reject) => {
          const options = {
            uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_person&cookie=${cfg.cookie}&pkey=${msg.body.rowid}`,
            headers: {
              'X-API-KEY': cfg.apikey
            }
          };

          request.get(options)
            .then((res) => {
              let resObj = JSON.parse(res);
              contact = {
                rowid: resObj.rowid,
                for_rowid: resObj.for_rowid,
                same_contactperson: resObj.same_contactperson,
                firstname: resObj.firstname,
                name: resObj.name,
                email: resObj.email,
                title: resObj.title,
                salutation: resObj.salutation,
                birthday: resObj.birthday,
                private_street: resObj.private_street,
                private_street_number: resObj.private_street_number,
                private_zip_code: resObj.private_zip_code,
                private_town: resObj.private_town,
                private_state: resObj.private_state,
                private_country: resObj.private_country,
                phone: resObj.phone,
                fax: resObj.fax,
                private_phone: resObj.private_phone,
                private_mobile_phone: resObj.private_mobile_phone,
                private_email: resObj.private_email
              };
              resolve(contact);
            }).catch((e) => {
              reject(e);
            });
        });
      }

      function emitData() {
        const data = messages.newMessageWithBody({
          "person": contact
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
        .then(getPerson)
        .then(emitData)
        .fail(emitError)
        .done(emitEnd);
    }
  });
}
