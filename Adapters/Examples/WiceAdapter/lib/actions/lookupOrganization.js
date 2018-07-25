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
const { createSession } = require('./../utils/wice');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {
  let reply = [];
  const self = this;

  async function getOrganization(options) {
    try {
      const organization = await request.get(options);
      const organizationObj = JSON.parse(organization);

      if (!organizationObj.rowid) throw `No organization with ROWID: ${msg.body.rowid} found...`;

      return customOrganization(organizationObj);
    } catch (e) {
      throw new Error(e);
    }
  }

  function customOrganization(organization) {
    const customOrganizationFormat = {
      rowid: organization.rowid,
      name: organization.name,
      email: organization.email,
      phone: organization.phone,
      fax: organization.fax,
      street: organization.street,
      street_number: organization.street_number,
      zip_code: organization.zip_code,
      p_o_box: organization.p_o_box,
      town: organization.town,
      state: organization.state,
      country: organization.country
    };
    return customOrganizationFormat;
  }

  async function executeRequest() {
    try {
      const cookie = await createSession(cfg);
      const options = {
        uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_company&cookie=${cookie}&pkey=${msg.body.rowid}`,
        headers: {
          'X-API-KEY': cfg.apikey
        }
      };
      reply = await getOrganization(options);
      console.log(`Organization: ${JSON.stringify(reply)}`);
      return reply;
    } catch (e) {
      throw new Error(e);
    }
  }

  function emitData() {
    const data = messages.newMessageWithBody(reply);
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
    .then(executeRequest)
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}

//   // Create a session in Wice
//   wice.createSession(cfg, () => {
//     if (cfg.cookie) {
//
//       let organization = [];
//       const self = this;
//
//       function getOrganization() {
//         return new Promise((resolve, reject) => {
//           const options = {
//             uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_company&cookie=${cfg.cookie}&pkey=${msg.body.rowid}`,
//             headers: {
//               'X-API-KEY': cfg.apikey
//             }
//           };
//
//           request.get(options)
//             .then((res) => {
//               let resObj = JSON.parse(res);
//               organization = {
//                 rowid: resObj.rowid,
//                 name: resObj.name,
//                 email: resObj.email,
//                 phone: resObj.phone,
//                 fax: resObj.fax,
//                 street: resObj.street,
//                 street_number: resObj.street_number,
//                 zip_code: resObj.zip_code,
//                 p_o_box: resObj.p_o_box,
//                 town: resObj.town,
//                 state: resObj.state,
//                 country: resObj.country
//               };
//               resolve(organization);
//             }).catch((e) => {
//               reject(e);
//             });
//         });
//       }
//
//       function emitData() {
//         const data = messages.newMessageWithBody({
//           "organization": organization
//         });
//         self.emit('data', data);
//       }
//
//       function emitError(e) {
//         console.log(`ERROR: ${e}`);
//         self.emit('error', e);
//       }
//
//       function emitEnd() {
//         console.log('Finished execution');
//         self.emit('end');
//       }
//
//       Q()
//         .then(getOrganization)
//         .then(emitData)
//         .fail(emitError)
//         .done(emitEnd);
//     }
//   });
// }
