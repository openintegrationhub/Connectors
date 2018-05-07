"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const silvererp = require('../actions/silvererp.js');

exports.process = processTrigger;

/**
 *  This method will be called from elastic.io platform providing following data
 *
 * @param msg
 * @param cfg
 */
function processTrigger(msg, cfg) {

  let contacts = [];
  let self = this;

// Create a session in silvererp and then make a post request to get all persons saved by a specific user in silvererp
  silvererp.createSession(cfg, () => {

    let apiKey = cfg.apikey;
    // let cookie = cfg.mp_cookie;
    let uri = `http://yq.is-leet.com/SilvERP-OIH/index.php?rest&oih&rt=RestOih&command=getPersons`;

    let requestOptions = {
      json: {
        max_hits: 100,
        print_address_data_only: 1
      },
      headers: {
        'X-API-KEY': apiKey
      }
    };

    // Make a post request to get all persons saved by a specific user in snazzycontacts
    request.post(uri, requestOptions)
    .then((res) => {
      // console.log('PostRes: '+ JSON.stringify(res, undefined, 2));
      contacts = res.content;
      emitData();
    }, (err) => {
      emitError();
    });

  });

  // Emit data from promise depending on the result
  function emitData() {
    let data = messages.newMessageWithBody({
      "persons": contacts
    });
    console.log('Emitdata: '+ JSON.stringify(data, undefined, 2));
    self.emit('data', data);
  }

  function emitError(e) {
    console.log(`ERROR: ${e}`);

    self.emit('error', e);
  }
}
