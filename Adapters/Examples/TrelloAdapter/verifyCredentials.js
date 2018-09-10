/**
 * Copyright 2018 Cloud Ecosystem e.V.

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
const request = require('request-promise');

const base = "https://api.trello.com";

const {getToken} = require('./lib/utils/trello.js');

module.exports = verify;

/**
 * Executes the verification logic by sending a simple to the Petstore API using the provided apiKey.
 * If the request succeeds, we can assume that the apiKey is valid. Otherwise it is not valid.
 *
 * @param credentials object to retrieve apiKey from
 *
 * @returns Promise sending HTTP request and resolving its response
 */
async function verify(credentials) {

    // access the value of the apiKey field defined in credentials section of component.json
    const api_key = process.env.apiKey;

    if (!api_key) {
        throw new Error('API key is missing');
    }

    //sending a request to the most simple endpoint of the target API
    try{
      const token = credentials.oauth.oauth_token;

      const requestOptions = {
          uri: `${base}/1/members/me/?key=${api_key}&token=${token}`,
          json: true
      };

      const valid = await request.get(requestOptions);

      console.log(JSON.stringify(valid));
      if(valid){
        console.log('Credentials verified successfully');
        return true;
      } else {
        throw new Error('Error in validating credentials!');
        return false;
      }
    } catch (e) {
      console.log(`${e}`);
      throw new Error(e);
    }
}
