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
const { createSession } = require('./../utils/snazzy');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {
  const self = this;
  let organizations = [];

  async function fetchAll(options) {
    try {
      let result = [];
      const organizations = await request.post(options);
      const totalEntries = organizations.content[0].total_entries_readable_with_current_permissions;

      if (totalEntries == 0) {
        throw new Error('No organizations found ...');
      }

      organizations.content.forEach((organization) => {
        const currentOrganization = customOrganization(organization);
        result.push(currentOrganization);
      });
      console.log(JSON.stringify(result.length, undefined, 2));
      return result;
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
      town_area: organization.town_area,
      state: organization.state,
      country: organization.country
    };
    return customOrganizationFormat;
  }

  async function getOrganizations() {
    try {
      const cookie = await createSession(cfg);
      const uri = `http://snazzycontacts.com/mp_contact/json_respond/address_company/json_mainview?&mp_cookie=${cookie}`;
      const requestOptions = {
        uri,
        json: { 'max_hits': 100 }, // just for testing purposes
        headers: { 'X-API-KEY': cfg.apikey }
      };
      organizations = await fetchAll(requestOptions);
      return organizations;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
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
