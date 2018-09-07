const { expect } = require('chai');
const seed =  require('./seed/seed');
const { createSession, getToken } = require('./../lib/utils/snazzy');
const { organizations, persons, configOptions, options } = require('./seed/seed');
const { checkForExistingUser, getSameContactId, createOrUpdatePerson} = require('./../lib/actions/upsertPerson');
const { checkForExistingOrganization, createOrUpdateOrganization } = require('./../lib/actions/upsertOrganization');

describe('Test actions', () => {

  it('should create or update a person', async () => {
    const cookie = await createSession(configOptions);
    const person = seed.persons[2];
    const sameContactId = await getSameContactId(cookie, options.headers);
    const existningUserRowid = await checkForExistingUser(person, cookie, options.headers);
    const newUser = await createOrUpdatePerson(existningUserRowid, cookie, options.headers, person);
    expect(cookie).to.have.lengthOf(32);
    expect(newUser.age).to.not.exist;
    expect(newUser).to.deep.include({
      name: person.body.name,
      firstname: person.body.firstname,
      email: person.body.email
    });
  });

  it('should create or update an organization', async () => {
    const cookie = await createSession(configOptions);
    const organization = seed.organizations[0];
    const existningOrganizationrRowid = await checkForExistingOrganization(organization, cookie, options.headers);
    const newOrganization = await createOrUpdateOrganization(existningOrganizationrRowid, cookie, options.headers, organization);
    expect(cookie).to.have.lengthOf(32);
    expect(existningOrganizationrRowid).to.have.lengthOf(6);
    expect(newOrganization).to.deep.include({
      name: organization.body.name,
      email: organization.body.email
    });
  });
});
