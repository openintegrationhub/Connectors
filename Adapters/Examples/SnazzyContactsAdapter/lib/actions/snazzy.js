
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

const request = require('request-promise');

/**
 * This method will create a session in Snazzy Contacts
 *
 * @param config configuration that is account information send from action or trigger
 * @param continueOnSuccess is a callback function
 */
function createSession(config, continueOnSuccess) {

  const { apikey, email, password } = config;
  console.log(`API KEY: ${apikey}`);
  const getTokenOptions = {
    uri: 'http://snazzycontacts.com/mp_base/json_login/login/get_token',
    headers: {
      'X-API-KEY': apikey
    }
  };

  request.post(getTokenOptions)
    .then((res) => {
      const data = JSON.parse(res);
      const { token } = data.content;
      const options = {
        uri: 'http://snazzycontacts.com/mp_base/json_login/login/verify_credentials',
        json: {
          token,
          email,
          password
        },
        headers: {
          'X-API-KEY': apikey
        }
      };
      console.log(`Token: ${token}`);

      request.post(options)
        .then((res) => {
          config.mp_cookie = res.content.mp_cookie;
          console.log(`Cookie: ${config.mp_cookie}`);
          continueOnSuccess();
        }).catch((e) => {
          console.log(`ERROR: ${e}`);
        });
    }).catch((e) => {
      console.log(`ERROR: ${e}`);
    });
}

module.exports = {
  createSession
};
