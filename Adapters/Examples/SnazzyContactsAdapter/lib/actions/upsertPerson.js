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

async function checkForExistingUser(user, cookie, headers) {
  try {
    let existingRowid = 0;
    const requestOptions = {
      uri: `${BASE_URI}/address_contactperson/json_mainview?&mp_cookie=${cookie}`,
      json: {
        // Best practise is to use email to check user identity,
        // but for testing purposes we just use first name and last name
        "address_contactperson_name": user.body.name,
        "address_contactperson_firstname": user.body.firstname
      },
      headers
    };
    const getExistingRowid = await request.post(requestOptions);
    if (getExistingRowid.content[0].rowid) {
      existingRowid = getExistingRowid.content[0].rowid;
      console.log(`Person already exists... ROWID: ${existingRowid}`);
    }
    return existingRowid;
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function getSameContactId(cookie, headers) {
  try {
    const requestOptions = {
      uri: `${BASE_URI}/same_contactperson/json_insert?&mp_cookie=${cookie}`,
      headers
    };
    const getId = await request.post(requestOptions);
    const jsonDecode = JSON.parse(getId);
    let sameContactId = jsonDecode.rowid;
    return sameContactId;
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function createOrUpdatePerson(existingRowid, cookie, headers, msg) {
  try {
    const requestOptions = {
      json: msg.body,
      headers
    };

    if (existingRowid === 0) {
      console.log('Creating person ...');
      requestOptions.uri = `${BASE_URI}/address_contactperson/json_insert?&mp_cookie=${cookie}`;
      const sameContactId = await getSameContactId(cookie, headers);
      msg.body.same_contactperson = sameContactId;
      const person = await request.post(requestOptions);
      console.log(JSON.stringify(person, undefined, 2));
      return person;
    } else {
      console.log('Updating person ...');
      requestOptions.uri = `${BASE_URI}/address_contactperson/json_update?&mp_cookie=${cookie}`;
      msg.body.rowid = existingRowid;
      const person = await request.post(requestOptions);
      return person;
    }
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function executeRequest(msg, cfg, headers) {
  try {
    const cookie = await createSession(cfg);
    const existingRowid = await checkForExistingUser(msg, cookie, headers);
    return await createOrUpdatePerson(existingRowid, cookie, headers, msg);
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

module.exports = {
  process: processAction,
  checkForExistingUser,
  getSameContactId,
  createOrUpdatePerson
};
