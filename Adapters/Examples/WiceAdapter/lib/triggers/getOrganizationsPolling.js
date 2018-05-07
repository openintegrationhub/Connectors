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

const wice = require('./../actions/wice');

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
      let organizations = [];
      const self = this;

      function getOrganizations() {
        return new Promise((resolve, reject) => {
          const requestOptions = {
            uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_all_companies&full_list=1&cookie=${cfg.cookie}`,
            headers: {
              'X-API-KEY': cfg.apikey
            }
          };

          request.get(requestOptions)
            .then((res) => {
              const resObj = JSON.parse(res);
              let customOrganizaiontFormat;

              if (resObj.loop_addresses == undefined) {
                reject('No organizations found ...');
              }

              resObj.loop_addresses.forEach((organization) => {
                customOrganizaiontFormat = {
                  rowid: organization.rowid,
                  name: organization.name,
                  number_of_employees: organization.number_of_employees,
                  email: organization.email,
                  phone: organization.phone,
                  fax: organization.fax,
                  street: organization.street,
                  street_number: organization.street_number,
                  zip_code: organization.zip_code,
                  p_o_box: organization.p_o_box,
                  town: organization.town,
                  town_area: organization.town_area,
                  state: organization.state,
                  country: organization.country
                };
                organizations.push(customOrganizaiontFormat)
              });
              resolve(organizations);
            }).catch((e) => {
              reject(e);
            });
        });
      }

      function emitData() {
        const data = messages.newMessageWithBody({
          "organizations": organizations
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
        .then(getOrganizations)
        .then(emitData)
        .fail(emitError)
        .done(emitEnd);
    }
  });
}
