"use strict";

module.exports = function verifyCredentials(credentials, cb) {
  console.log('Credentials passed for verification %j', credentials)

  if (!credentials.apikey) {
    console.log('Invalid apikey');
    return cb(null, {verified: false});
  }

  if (!credentials.mandant) {
    console.log('Invalid mandant');
    return cb(null, {verified: false});
  }

  console.log('Credentials verified successfully');

  cb(null, {verified: true});
}
