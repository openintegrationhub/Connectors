"use strict";
const co = require('co');
const request = require('request-promise');
const messages = require('elasticio-node').messages;


const {getToken} = require('./lib/utils/trello.js');
const API_BASE_URI = 'https://api.trello.com/1/';

exports.process = processAction;

/**
 * Executes the action's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * @returns promise resolving a message to be emitted to the platform
 */
function processAction(msg, cfg) {

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = cfg.apiKey;
    console.log(apiKey);
    // body contains the mapped data
    const token = getToken(apiKey);
    console.log(token);
    // access the value of the mapped value into name field of the in-metadata
    const name = body.name;

    if (!name) {
        throw new Error('Name is required');
    }

    console.log('About to create new board');

    const requestOptions = {
        uri: `${API_BASE_URI}/boards`,
        headers: {
            'name': name,
            'key': apiKey,
            'token': token
        },
        json: true
    };

    response = await request.get(requestOptions);
    return messages.newMessageWithBody(response);
}
