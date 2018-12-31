/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { messages } = require('elasticio-node');
const { personFromOih, personToOih } = require('./seed/person');
const transformPersonFromOih = require('../lib/actions/transformPersonFromOih');
const transformPersonToOih = require('../lib/actions/transformPersonToOih');

describe('Transformation test', () => {
  it('should handle simple person tranformation in direction from OIH', () => {
    const exp = personFromOih();
    return transformPersonFromOih.process(messages.newMessageWithBody(exp))
      .then(result => {
        expect(result.body).to.be.an('object');
        expect(result.body).to.deep.include({
          rowid: '98765',
          name: 'Doe',
          firstname: 'John',
          position: 'Sales manager',
          private_street: 'Hohestr',
          private_street_number: '3',
          private_zip_code: '50667',
          private_town: 'Cologne',
          private_country: 'Germany',
          email: 'jon@doe.com',
          phone: '123456789',
          mobile_phone: '98326307',
          xing_url: 'xing.de/yourUsername',
          last_update: '2018-01-02'
        });
      });
  });

  it('should produce an empty message if transformation returns undefined', () => {
    return transformPersonFromOih.process(messages.newMessageWithBody({}))
      .then(result => {
        expect(result).to.be.undefined;
      });
  });

  it('should handle simple person tranformation in direction to OIH', () => {
    const exp = personToOih();
    return transformPersonToOih.process(messages.newMessageWithBody(exp))
      .then(result => {
        expect(result.body).to.be.an('object');
        expect(result.body).to.deep.include({
          firstName: 'Mark',
          lastName: 'Smith',
          jobTitle: 'Marketing Manager'
        });
        expect(result.body.test).to.be.undefined;
        expect(result.body.oihApplicationRecords[0]).to.deep.include({
          recordUid: 98123
        });
        expect(result.body.addresses).to.be.an('array');
        expect(result.body.addresses[0]).to.deep.include({
          street: 'Main Str.',
          streetNumber: 120
        });
      });
  });

  it('should produce an empty message if transformation returns undefined', () => {
    return transformPersonToOih.process(messages.newMessageWithBody({}))
      .then(result => {
        expect(result).to.be.undefined;
      });
  });
});
