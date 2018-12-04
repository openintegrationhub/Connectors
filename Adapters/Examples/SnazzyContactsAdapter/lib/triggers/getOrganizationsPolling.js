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

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 * @param snapshot saves the current state of integration step for the future reference
 */
function processTrigger(msg, cfg, snapshot = {}) {
  const self = this;

  snapshot.lastUpdated = snapshot.lastUpdated || (new Date(0)).toISOString();
  console.log(`Last Updated: ${snapshot.lastUpdated}`);

  async function emitData() {
    const organizations = await getOrganizations(cfg, snapshot);

    console.log(`Found ${organizations.length} new records.`);

    if (organizations.length > 0) {
      organizations.forEach(elem => {
        self.emit('data', messages.newMessageWithBody(elem));
      });
      snapshot.lastUpdated = organizations[organizations.length - 1].last_update;
      console.log(`New snapshot: ${snapshot.lastUpdated}`);
      self.emit('snapshot', snapshot);
    } else {
      self.emit('snapshot', snapshot);
    }
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
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}

async function getOrganizations(cfg, snapshot = {}) {
  try {
    const cookie = await createSession(cfg);
    const uri = `http://snazzycontacts.com/mp_contact/json_respond/address_company/json_mainview?&mp_cookie=${cookie}`;
    const requestOptions = {
      uri,
      json: {
        'max_hits': 100 // just for testing purposes
      },
      headers: {
        'X-API-KEY': cfg.apikey
      }
    };
    const organizations = await fetchAll(requestOptions, snapshot);

    if (!organizations || !Array.isArray(organizations)) throw `Expected records array. Instead received: ${JSON.stringify(organizations)}`;
    return organizations;
  } catch (e) {
    throw new Error(e);
  }
}

async function fetchAll(options, snapshot) {
  try {
    let result = [];
    const organizations = await request.post(options);
    const totalEntries = organizations.content[0].total_entries_readable_with_current_permissions;

    if (totalEntries === 0) return result;

    organizations.content.filter((organization) => {
      const currentOrganization = customOrganization(organization);
      currentOrganization.last_update > snapshot.lastUpdated && result.push(currentOrganization);
    });

    result.sort((a, b) => Date.parse(a.last_update) - Date.parse(b.last_update));
    return result;
  } catch (e) {
    throw new Error(e);
  }
}

function customOrganization(organization) {
  const customOrganizationFormat = {
    rowid: organization.rowid,
    last_update: organization.last_update,
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

module.exports = {
  process: processTrigger,
  getOrganizations
}
