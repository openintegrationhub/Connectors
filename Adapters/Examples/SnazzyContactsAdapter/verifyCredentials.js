"use strict";

module.exports = function verifyCredentials(credentials, cb) {
  console.log('Credentials passed for verification %j', credentials)

  if (!credentials.email) {
    console.log('Invalid email');
    return cb(null, {verified: false});
  }

  if (!credentials.apikey) {
    console.log('Invalid API key');
    return cb(null, {verified: false});
  }

  console.log('Credentials verified successfully');

  cb(null, {verified: true});
}
