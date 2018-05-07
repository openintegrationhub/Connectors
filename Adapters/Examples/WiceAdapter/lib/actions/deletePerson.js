"use strict";
const Q = require('q');
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const wice = require('./wice.js');

exports.process = processAction;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */


function processAction(msg, cfg) {

  // Create a session in Wice
  wice.createSession(cfg, () => {
    if (cfg.cookie) {

      let reply = [];
      const self = this;

      function deletePerson() {

        return new Promise((resolve, reject) => {
          const person = JSON.stringify(msg.body);
          const options = {
            method: 'POST',
            uri: 'https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json',
            form: {
              method: 'delete_person',
              cookie: cfg.cookie,
              data: person
            },
            headers: {
              'X-API-KEY': cfg.apikey
            }
          };

          // Send a request to delete the person
          request.post(options)
            .then((res) => {
              reply = res;
              console.log('Person has been deleted...');
              resolve(reply);
            }).catch((e) => {
              reject(e);
            });
        });
      }

      function emitData() {
        const data = messages.newMessageWithBody({
          "person": reply
        });
        self.emit('data', data);
      }

      function emitError(e) {
        console.log('Oops! Error occurred');
        self.emit('error', e);
      }

      function emitEnd() {
        console.log('Finished execution');
        self.emit('end');
      }

      Q()
        .then(deletePerson)
        .then(emitData)
        .fail(emitError)
        .done(emitEnd);
    }
  });
}
