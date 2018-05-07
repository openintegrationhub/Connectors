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

const wice = require('./wice.js');

exports.process = processAction;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */

function processAction(msg, cfg) {

  // Create a session in Wice
  wice.createSession(cfg, () => {
      if (cfg.cookie) {

        let reply = [];
        const self = this;

        function updatePerson() {

          return new Promise((resolve, reject) => {
            const person = JSON.stringify(msg.body);
            const options = {
              method: 'POST',
              uri: 'https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json',
              form: {
                method: 'update_contact',
                cookie: cfg.cookie,
                data: person
              },
              headers: {
                'X-API-KEY': cfg.apikey
              }
            };

            // Send a request to update the person
            request.post(options)
              .then((res) => {
                reply = res;
                console.log('Person updated ...');
                resolve(reply);
              }).catch((e) => {
                reject(e);
              });
          });
      }

      function emitData() {
        const data = messages.newMessageWithBody({
          "person": reply
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
        .then(updatePerson)
        .then(emitData)
        .fail(emitError)
        .done(emitEnd);
    }
  });
}
