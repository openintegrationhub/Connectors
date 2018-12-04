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
const BASE_URI = `https://snazzycontacts.com/mp_contact/json_respond`;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processAction(msg, cfg) {
  const headers = { 'X-API-KEY': cfg.apikey };
  const self = this;

  async function emitData() {
    const reply = await executeRequest(msg, cfg, headers);
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
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}

async function checkForExistingOrganization(organization, cookie, headers) {
  try {
    let existingRowid = 0;
    const requestOptions = {
      uri: `${BASE_URI}/address_company/json_mainview?&mp_cookie=${cookie}`,
      json: {
        "address_company_name": organization.body.name
      },
      headers
    };
    const getExistingRowid = await request.post(requestOptions);
    if (getExistingRowid.content[0].rowid) {
      existingRowid = getExistingRowid.content[0].rowid;
      console.log(`Organization already exists ... ROWID: ${existingRowid}`);
    }
    return existingRowid;
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function createOrUpdateOrganization(existingRowid, cookie, headers, msg) {
  try {
    const requestOptions = {
      json: msg.body,
      headers
    };
    if (existingRowid === 0) {
      console.log('Creating organization ...');
      requestOptions.uri = `${BASE_URI}/address_company/json_insert?&mp_cookie=${cookie}`;
      const organization = await request.post(requestOptions);
      console.log(JSON.stringify(organization, undefined, 2));
      return organization;
    } else {
      console.log('Updating organization ... ');
      requestOptions.uri = `${BASE_URI}/address_company/json_update?mp_cookie=${cookie}`;
      msg.body.rowid = existingRowid;
      const organization = await request.post(requestOptions);
      return organization;
    }
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function executeRequest(msg, cfg, headers) {
  try {
    const cookie = await createSession(cfg);
    const existingRowid = await checkForExistingOrganization(msg, cookie, headers);
    return await createOrUpdateOrganization(existingRowid, cookie, headers, msg);
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

module.exports = {
  process:processAction,
  checkForExistingOrganization,
  createOrUpdateOrganization
};
