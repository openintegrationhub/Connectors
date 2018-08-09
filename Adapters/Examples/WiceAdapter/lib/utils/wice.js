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

async function createSession(cfg) {
  console.log(`API KEY: ${cfg.apikey}`);
  const options = {
    uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json`,
    form: {
      "method": "login",
      "mandant_name": cfg.client_name,
      "username": cfg.username,
      "password": cfg.password
    },
    headers: { 'X-API-KEY': cfg.apikey }
  };

  const getCookie = await request.post(options);
  const { cookie } = JSON.parse(getCookie);
  console.log(`COOKIE: ${cookie}`);
  return cookie;
}

module.exports = { createSession };
