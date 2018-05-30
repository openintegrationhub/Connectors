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
const snazzy = require('../actions/snazzy');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {

  snazzy.createSession(cfg, () => {
    const self = this;
    let contacts = [];

    function getPersons() {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          uri: `https://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_mainview?&mp_cookie=${cfg.mp_cookie}`,
          json: true,
          headers: {
            'X-API-KEY': cfg.apikey
          }
        };

        request.get(requestOptions)
          .then((res) => {
            let customPersonFormat;
            let result = [];
            const totalEntries = res.content[0].total_entries_readable_with_current_permissions;

            if (totalEntries == 0) {
              reject('No persons found ...');
            }

            res.content.forEach((person) => {
              customPersonFormat = {
                rowid: person.rowid,
                firstname: person.firstname,
                name: person.name,
                email: person.email,
                for_rowid: person.for_rowid,
                same_contactperson: person.same_contactperson,
                title: person.title,
                salutation: person.salutation,
                date_of_birth: person.date_of_birth,
                private_street: person.private_street,
                private_zip_code: person.private_zip_code,
                private_town: person.private_town,
                private_country: person.private_country,
                house_post_code: person.house_post_code,
                fax: person.fax,
                phone: person.phone,
                mobile_phone: person.mobile_phone,
                private_mobile_phone: person.private_mobile_phone,
                private_phone: person.private_phone,
                private_email: person.private_email,
                facebook_url: person.facebook_url,
                linked_in_url: person.linked_in_url,
                twitter_url: person.twitter_url,
                googleplus_url: person.googleplus_url,
                youtube_url: person.youtube_url,
                url: person.url,
                skype: person.skype
              };
              result.push(customPersonFormat);
            });
            contacts = result;
            resolve(contacts);
          }).catch((e) => {
            reject(e);
          });
      });
    }

    function emitData() {
      const data = messages.newMessageWithBody({
        "persons": contacts
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
      .then(getPersons)
      .then(emitData)
      .fail(emitError)
      .done(emitEnd);
  });
}
