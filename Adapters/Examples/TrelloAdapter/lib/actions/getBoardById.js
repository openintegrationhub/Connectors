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
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'https://api.trello.com/1/boards';

exports.process = processTrigger;

/**
 * Executes the trigger's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * @returns promise resolving a message to be emitted to the platform
 */
async function processTrigger(msg, cfg) {

    // access the value of the apiKey field defined in env variables
    const api_key = process.env.apiKey;
    // access the value of the token field defined in credentials
    const token = cfg.oauth.oauth_token;
    // access the value of the token field defined in credentials
    const boardId = msg.body.id;

    if (!boardId) {
        throw new Error('Id field is required');
    }

    console.log('About to find board by id:', boardId);

    const requestOptions = {
        uri: `${API_BASE_URI}/${boardId}`,
        qs: {
          cards: 'all',
          checklists: 'all',
          fields: 'all',
          labels: 'all',
          lists: 'all',
          members: 'none',
          memberships: 'none',
          membersInvited: 'none',
          membersInvited_fields: 'all',
          tags: 'true',
          key: api_key,
          token: token
        },
        json: true
    };
    const response = await request.get(requestOptions);
    console.log(response);

    return messages.newMessageWithBody(response);
    // return the promise that sends a request to the Petstore API
}
