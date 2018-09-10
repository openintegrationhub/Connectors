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
const Q = require('q');
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'https://api.trello.com/1/';

exports.process = processTrigger;

/**
 * Executes the trigger's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * @returns promise resolving a message to be emitted to the platform
 */
function processTrigger(msg, cfg) {

  // access the value of the apiKey field defined in env variables
  const api_key = process.env.apiKey;
  // access the value of the token field defined in credentials
  const token = cfg.oauth.oauth_token;
  // Initialize empty array for board ids
  let boards = [];
  // Declare requestOptions for receiving user information
  const requestOptions = {
    uri: `${API_BASE_URI}members/me/?key=${api_key}&token=${token}`,
    json: true
  };
  const self = this;
  async function getBoards() {
    try {
      const me = await request.get(requestOptions);
      console.log(`Me: ${me}`);
      const myBoards = me.idBoards;

      await asyncForEach(myBoards, 0);

      return boards;
    } catch (e) {
      console.log(`${e}`);
      throw new Error(e);
    }
  }

  async function asyncForEach(array, i) {
      const temp = async () => {
         const getBoardrequestOptions = {
           uri: `${API_BASE_URI}boards/${array[i]}?cards=all&checklists=all&fields=all&lists=all&members=none&membership=none&membersInvited=none&membersInvited_fields=all&key=${api_key}&token=${token}`,
           json: true
         };
         return await request.get(getBoardrequestOptions);
      }
      const board = await temp();
      boards.push(board);
      if(i<array.length-1){
        await asyncForEach(array, i+1);
      }
  }

  function emitData() {
    boards.forEach(elem => {
      console.log(`elem: ${elem}`);
      self.emit('data', messages.newMessageWithBody(elem));
    });
  }

  function emitError(e) {
    self.emit('error', e);
  }

  function emitEnd() {
    console.log('Finished execution');
    self.emit('end');
  }

  Q()
    .then(getBoards)
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}
