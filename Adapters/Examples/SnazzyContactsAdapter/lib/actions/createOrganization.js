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
const BASE_URI = `https://snazzycontacts.com/mp_contact/json_respond`;

exports.process = processAction;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */

function processAction(msg, cfg) {

  let reply = [];
  const self = this;

  // Create a session in snazzycontacts and then make a post request to create a new organization in snazzycontacts
  snazzy.createSession(cfg, () => {
    if (cfg.mp_cookie) {

      const apiKey = cfg.apikey;
      const cookie = cfg.mp_cookie;
      let existingRowid = 0;

      function checkForExistingOrganization() {

        return new Promise((resolve, reject) => {
          const requestOptions = {
            uri: `${BASE_URI}/address_company/json_mainview?&mp_cookie=${cookie}`,
            json: true,
            headers: {
              'X-API-KEY': apiKey
            }
          };

          request.get(requestOptions)
            .then((res) => {
              res.content.forEach((currentOrganization) => {
                if (msg.body.name == currentOrganization.name) {
                  existingRowid = currentOrganization.rowid;
                  msg.body.rowid = existingRowid;
                  console.log(`Organization alreday exists ... ROWID: ${existingRowid}`);
                }
              });

              // if (existingRowid == 0) {
              //   // uri = `${path}/mp_contact/json_respond/address_company/json_insert?&mp_cookie=${cookie}`;
              //   console.log('Creating an organization ...');
              // } else {
              //   msg.body.rowid = existingRowid;
              //   // uri = `${path}/mp_contact/json_respond/address_company/json_update?mp_cookie=${cookie}`;
              //   console.log(`existingRowid: ${existingRowid}`);
              // }

              resolve(existingRowid);
            }).catch((e) => {
              reject(e);
            })
        });
      }

      function createOrganization() {
        console.log(`eixisting rowid ${existingRowid}`);

        return new Promise((resolve, reject) => {
          const options = {
            json: msg.body,
            headers: {
              'X-API-KEY': apiKey
            }
          };

          if (existingRowid > 0) {
            const uri = `${BASE_URI}/address_company/json_update?mp_cookie=${cookie}`;
            request.post(uri, options)
              .then((res) => {
                reply.push(res);
                console.log('Updating an organization ...');
                resolve(reply);
              }).catch((e) => {
                reject(e);
              })
          } else {
            let uri = `${BASE_URI}/address_company/json_insert?mp_cookie=${cookie}`;
            request.post(uri, options)
              .then((res) => {
                reply.push(res);
                console.log('Creating an organization ...');
                resolve(reply);
              }).catch((e) => {
                reject(e);
              });
          }
        });
      }

      function emitData() {
        const data = messages.newMessageWithBody({
          "organization": reply
        });
        self.emit('data', data);
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
        .then(checkForExistingOrganization)
        .then(createOrganization)
        .then(emitData)
        .fail(emitError)
        .done(emitEnd);

    }
  });
}
