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

const request = require('request-promise');
const BASE_URI = 'http://snazzycontacts.com/mp_base/json_login/login';

async function createSession(config) {
  console.log(`API KEY: ${config.apikey}`);

  try {
    const token = await getToken(config);
    console.log(`Token: ${token}`);
    const cookie = await getCookie(token, config);
    console.log(`Cookie: ${config.mp_cookie}`);
    return cookie;
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function getToken(config) {
  const getTokenOptions = {
    uri: `${BASE_URI}/get_token`,
    headers: {
      'X-API-KEY': config.apikey
    }
  };

  try {
    const tokenRequest = await request.post(getTokenOptions);
    const tokenObject = JSON.parse(tokenRequest);
    const { token } = tokenObject.content;
    return token;
  } catch (e) {
    console.log(`ERROR: ${e}`);
    throw new Error(e);
  }
}

async function getCookie(token, config) {
  try {
    const options = {
      uri: `${BASE_URI}/verify_credentials`,
      json: {
        token,
        email: config.email,
        password: config.password
      },
      headers: {
        'X-API-KEY': config.apikey
      }
    };
    const cookie = await request.post(options);
    config.mp_cookie = cookie.content.mp_cookie;
    return cookie.content.mp_cookie;
  } catch (e) {
    console.log(`ERROR: ${e}`);
    return undefined;
    throw new Error(e);
  }
}

module.exports = {
  createSession,
  getToken,
  getCookie
};
