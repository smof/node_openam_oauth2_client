//Starts initial authentication process, which receives authz code, which then gets an oauth2 access token..

var http = require('http');
var authorizer = require('./authorizer.js'); //getAuthzCode

//Authentication function ////////////////////////////////////////////////////////////
exports.authenticate = function(req, res) {
	
        console.log('Authentication request received:');
        
        //what gets sent back to the calling client
        var responseObj = {};
        
	//read in user / password data
	//var authorizationCode = req.params(':authorizationCode');
	var user = req.body.user;
	var password = req.body.password;

	console.log(JSON.stringify(req.body) + '\n');
	
	//params to build openam authenticaiton request //////////////////////////////////////////////////////////////////////////////////////////////
	var authNParams = {
		
		host: 'openam.example.com',
		path: '/openam/json/authenticate',
		port: '8080',
		method: 'POST',
		headers: {'X-OpenAM-Username': user, 'X-OpenAM-Password': password, 'Content-Type': 'application/json'}
	};
	//params to build openam authenticaiton request //////////////////////////////////////////////////////////////////////////////////////////////
	
	console.log('Authentication request parameters look like this...');
	console.log(JSON.stringify(authNParams) + '\n');
	
	//call back to process initial authn response from openam ////////////////////////////////////////////////////////////////////////////////////	
	authNResponseCallback = function(response) {
	 
		var str = ''
		//capture response
		response.on('data', function (chunk) {
				str += chunk;
		});
	
		//do stuff when response ends
		response.on('end', function () {
				
				console.log('Authentication response from OpenAM received...');
				//split out tokenId from response
				openAMResponse = JSON.parse(str);
				tokenId = openAMResponse['tokenId'];
				
				console.log('TokenId captured as: ' + tokenId + '\n');
				//call authz function
				authorizer.getAuthzCode(tokenId);
		});
	};
	//call back to process initial authn response from openam ////////////////////////////////////////////////////////////////////////////////////

	//call initial authentication http request ///////////////////////////////////////////////////////////////////////////////////////////////////
	var authNRequest = http.request(authNParams, authNResponseCallback);
	authNRequest.end();

	//call initial authentication http request ///////////////////////////////////////////////////////////////////////////////////////////////////
	
	//send something back to calling client
	res.send(responseObj);

        
};
///////////////////////////////////////////////////////////////////////////////////////


