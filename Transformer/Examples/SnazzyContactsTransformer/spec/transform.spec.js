/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const {expect} = require('chai');
const {messages} = require('elasticio-node');
const {personFromOih, personToOih} = require('./seed/person');
const transformPersonFromOih = require('../lib/actions/transformPersonFromOih');
const transformPersonToOih = require('../lib/actions/transformPersonToOih');

describe('Transformation test', () => {
  it('should handle simple person tranformation in direction from OIH', () => {
    const exp = personFromOih();
    return transformPersonFromOih.process(messages.newMessageWithBody(exp))
      .then(result => {
        expect(result.body).to.be.an('object');
        expect(result.body).to.deep.include({
          rowid: exp.oihApplicationRecords[0].recordUid,
          name: exp.lastName,
          firstname: exp.firstName,
          position: exp.jobTitle,
          private_street: exp.addresses[0].street,
          private_street_number: exp.addresses[0].streetNumber,
          private_zip_code: exp.addresses[0].zipCode,
          private_town: exp.addresses[0].city,
          private_country: exp.addresses[0].country,
          email: exp.contactData[3].value,
          phone: exp.contactData[0].value,
          mobile_phone: exp.contactData[5].value,
          xing_url: exp.contactData[4].value,
          last_update: exp.oihApplicationRecords[0].lastModified
        });
      });
  });

  it('should not produce an empty message if transformation returns undefined', () => {
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
          firstName: exp.firstname,
          lastName: exp.name,
          jobTitle: exp.position
        });
        expect(result.body.test).to.be.undefined;
        expect(result.body.oihApplicationRecords[0]).to.deep.include({
          recordUid: exp.rowid
        });
        expect(result.body.addresses).to.be.an('array');
        const street = exp.private_street.split(' ');
        expect(result.body.addresses[0]).to.deep.include({
          street: `${street[0]} ${street[1]}`,
          streetNumber: parseInt(street[2], 10)
        });
      });
  });

  it('should not produce an empty message if transformation returns undefined', () => {
    return transformPersonToOih.process(messages.newMessageWithBody({}))
      .then(result => {
        expect(result).to.be.undefined;
      });
  });
});
