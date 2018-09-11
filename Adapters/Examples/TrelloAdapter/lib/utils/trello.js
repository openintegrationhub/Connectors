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
const baseURI = "https://trello.com";

async function getToken(key) {

  const apiKey = key;

  const requestOptions = {
      uri: `${baseURI}/1/authorize?callback_method=postMessage&expiration=1hour&name=myTestToken&scope=read,write&response_type=token&key=${apiKey}`,
      json: true
  };
    console.log("right before await function");
    const token = await request.get(requestOptions);

    console.log(`The token is of type` + typeof token);
    console.log(token);

    console.log('test');

    return token;
}

module.exports = { getToken };
