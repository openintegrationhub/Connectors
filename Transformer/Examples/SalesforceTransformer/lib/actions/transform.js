/**
 * Original code
 * Copyright 2018 elasticio GmbH

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

/**
 * Edited code
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

/* eslint no-invalid-this: 0 no-console: 0 */

const eioUtils = require('elasticio-node').messages;
const jsonata = require('@elastic.io/jsonata-moment');
const PASSTHROUGH_BODY_PROPERTY = 'elasticio';

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
module.exports.transform = function (msg, exp) {
  const stringifiedExpression = JSON.stringify(exp);
  const compiledExpression = jsonata(stringifiedExpression);

  handlePassthrough(msg);
  console.log('Evaluating expression="%s" on body=%j', stringifiedExpression, exp);
  const result = compiledExpression.evaluate(exp);
  console.log('Evaluation completed, result=%j', result);
  if (result === undefined || result === null || Object.keys(result).length === 0) {
    return Promise.resolve();
  }
  if (typeof result[Symbol.iterator] === 'function') {
        // We have an iterator as result
    for (const item of result) {
      this.emit('data', eioUtils.newMessageWithBody(item));
    }
    return Promise.resolve();
  }
  return Promise.resolve(eioUtils.newMessageWithBody(result));
}

function handlePassthrough(message) {
  if (message.passthrough && Object.keys(message.passthrough)) {
    if (PASSTHROUGH_BODY_PROPERTY in message.body) {
      throw new Error(`${PASSTHROUGH_BODY_PROPERTY} property is reserved \
            if you are using passthrough functionality`);
    }

    message.body.elasticio = {};
    Object.assign(message.body.elasticio, message.passthrough);
  }
  return message;
}

// module.exports.process = processAction;
