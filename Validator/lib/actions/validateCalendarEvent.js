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
const eioUtils = require('elasticio-node').messages;
const request = require('request-promise');
const Ajv = require('ajv');
const calendarevent = require('../schemas/collaboration/calendarevent.json');
const collaborationelement = require('../schemas/collaboration/collaborationelement.json');
const record = require('../schemas/oih-data-record.json');


/**
 * Executes the action's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * @returns promise resolving a message to be emitted to the platform
 */
async function processAction(msg, cfg) {

  try{
  let ajv = new Ajv();
  let validate = ajv.addSchema(collaborationelement).addSchema(record).compile(calendarevent);
  let valid = validate(msg.body);

  if (valid) {
    console.log(`FLAG 1`);
    console.log('Validation successful');
    return eioUtils.newMessageWithBody(msg.body);
  } else {
    console.log(`FLAG 2`);
    console.log(JSON.stringify(validate.errors));
    throw new Error(JSON.stringify(validate.errors));
  }

  } catch (e) {
    throw new Error(e);
  }
}

module.exports.process = processAction;
