const { expect } = require('chai');
const { createSession, getToken, getCookie } = require('./../lib/utils/snazzy');
const { configOptions } = require('./seed/seed');

describe('Test utils', () => {
  it('should create a session', async () => {
    const token = await getToken(configOptions)
    const session = await createSession(configOptions);
    const cookie = await getCookie(token, configOptions);
    expect(session).to.be.a('string').that.have.lengthOf(32);
    expect(token).to.be.a('string').that.have.lengthOf(32);
    expect(cookie).to.be.a('string').that.have.lengthOf(32);
  });

  it('should not create cookie and session', async () => {
    const session = await createSession({});
    const cookie = await getCookie({});
    expect(session).to.be.undefined;
    expect(cookie).to.be.undefined;
  });
});
