"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const snazzy = require('./snazzy.js');

exports.process = processAction;

/**
 *  This method will be called from elastic.io platform providing following data
 *
 * @param msg
 * @param cfg
 */
function processAction(msg, cfg) {

  let reply = {};
  let self = this;

  // Create a session in snazzycontacts and then make a post request to create a new person in snazzycontacts
  snazzy.createSession(cfg, () => {
    if (cfg.mp_cookie) {

      let apiKey = cfg.apikey;
      let cookie = cfg.mp_cookie;

      let uri = `https://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_insert?mp_cookie=${cookie}`;
      let sameContactUri = `https://snazzycontacts.com/mp_contact/json_respond/same_contactperson/json_insert?&mp_cookie=${cookie}`;

      let requestOptions = {
        json: msg.body,
        headers: {
          'X-API-KEY': apiKey
        }
      };

      // Generate a sameContactId before creating the user
      function getSameContactId() {
        return new Promise((resolve, reject) => {
          request(sameContactUri, {
            headers: {
              'X-API-KEY': apiKey
            }
          }, (err, res, body) => {
            if (err) {
              reject(err);
              return;
            }

            let jsonDecode = JSON.parse(body);
            let sameContactId = jsonDecode.rowid;
            resolve(sameContactId);
            // console.log(`sameContactId: ${sameContactId}`);
          });
        });
      }

      // Make a post request to create a new person in snazzycontacts
      (function() {
        getSameContactId()
          .then((res) => {
            msg.body.same_contactperson = res;
            console.log(`same_contactperson: ${msg.body.same_contactperson}`);
            request.post(uri, requestOptions)
              .then((res) => {
                reply = res.content;
                emitData();
                console.log(JSON.stringify(res, undefined, 2));
              }, (err) => {
                console.log(`ERROR: ${err}`);
              });
          })
          .catch((e) => {
            emitError();
            console.log(`ERROR: ${e}`);
          });
      }());
    }
  });

  // Emit data from promise depending on the result
  function emitData() {
    let data = messages.newMessageWithBody(reply);
    self.emit('data', data);
    console.log(JSON.stringify(data, undefined, 2));
  }

  function emitError(e) {
    console.log('Oops! Error occurred');
    self.emit('error', e);
  }
}
