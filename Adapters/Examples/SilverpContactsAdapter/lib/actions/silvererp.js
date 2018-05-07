const
request = require('request');

exports.createSession = function(config, continueOnSuccess) {
    // let token;
    let
    apiKey = config.apikey;
    // let email = config.email;
    // let password = config.password;
    console.log('API KEY:' + apiKey);

    request.post('http://yq.is-leet.com/SilvERP-OIH/index.php?rest&oih&rt=RestOih&command=connect', {
	headers : {
	    'X-API-KEY' : apiKey
	}
    }, function(error, response, body) {
	if (!error && response.statusCode == 200) {
	    // let data = JSON.parse(body);
	    // token = data['content']['token'];
	    console.log('Connect successfull');
	    continueOnSuccess();
	} else if (error) {
	    console.log(error);
	}
    });
}
