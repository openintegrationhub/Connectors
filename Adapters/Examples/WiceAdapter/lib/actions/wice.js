const request = require('request-promise');

function createSession (config, continueOnSuccess) {

  const uri = "https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json";
  console.log(`API KEY: ${config.apikey}`);

  const options = {
    uri,
    form: {
      "method": "login",
      "mandant_name": config.mandant,
      "username": config.username,
      "password": config.password
    },
    headers: {
      'X-API-KEY': config.apikey
    }
  };

  request.post(options)
    .then((res) => {
      const data = JSON.parse(res);
      config.cookie = data.cookie;
      console.log(`COOKIE: ${config.cookie}`);
      continueOnSuccess();
    }).catch((e) => {
      console.log(`ERROR: ${e}`);
    });
}
module.exports = {
  createSession
};
