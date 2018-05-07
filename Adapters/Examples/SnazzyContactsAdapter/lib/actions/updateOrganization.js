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

const snazzy = require('./snazzy.js');

exports.process = processAction;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */

function processAction(msg, cfg) {

  let reply = {};
  const self = this;

  snazzy.createSession(cfg, () => {
    if (cfg.mp_cookie) {

      function updateOrganization() {

        return new Promise((resolve, reject) => {
          const requestOptions = {
            uri: `https://snazzycontacts.com/mp_contact/json_respond/address_company/json_update?mp_cookie=${cfg.mp_cookie}`,
            json: msg.body,
            headers: {
              'X-API-KEY': cfg.apikey
            }
          };

          request.post(requestOptions)
            .then((res) => {
              reply = res;
              resolve(reply);
            }).catch((e) => {
              reject(e);
            });
        });
      }

      function emitData() {
        const data = messages.newMessageWithBody({
          "organization": reply
        });
        self.emit('data', data);
        // console.log(JSON.stringify(data, undefined, 2));
      }

      function emitError(e) {
        console.log('Oops! Error occurred');
        self.emit('error', e);
      }

      function emitEnd() {
        console.log('Finished execution');
        self.emit('end');
      }

      Q()
        .then(updateOrganization)
        .then(emitData)
        .fail(emitError)
        .done(emitEnd);
    }
  });
}
