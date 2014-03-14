//converts authorization code into access token...

var http = require('http');
var scopeCollector = require('./scopeCollector.js');

exports.getToken = function(authorizationCode) {
			
			console.log('Attempt to get access token started ... \n');
			
			//client creds
			clientId = "oauth2_app";
			clientPassword = "Letme1n100!";
			clientCredentials = clientId + ":" + clientPassword;
			base64EncodedClientCredentials = new Buffer(clientCredentials).toString('base64');
			
			//params to build openam authorization code to access token request
			var accessTokenParams = {
				
				host: 'openam.example.com',
				path: '/openam/oauth2/access_token?service=apiService',
				port: '8080',
				method: 'POST',
				headers: {'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic ' + base64EncodedClientCredentials}
			};
				
			console.log('Access token request parameters look like this...');
			console.log(JSON.stringify(accessTokenParams) + '\n');
			
			//call back to process access token response	
			accessTokenResponseCallback = function(response) {
			 
				var str = ''
				//capture response
				response.on('data', function (chunk) {
						str += chunk;
				});
			
				//do stuff when response ends
				response.on('end', function () {
						
						console.log('Access Token response from OpenAM received...\n');
						console.log(str);
						console.log('\n');
						
						//make scope request by sending bearer JSON
						scopeCollector.getScopes(JSON.parse(str));
						
				});
			}
			
			//set data payload
			redirect_uri = "http://localhost:3002/oauth2";
			data = "grant_type=authorization_code&code=" + authorizationCode + "&redirect_uri=" + redirect_uri;
			
			console.log('Access token request payload looks like this...');
			console.log(data+ '\n');
			
			//call request to get access_token
			var accessTokenRequest = http.request(accessTokenParams, accessTokenResponseCallback);
			accessTokenRequest.write(data); //deliver payload
			accessTokenRequest.end(); //close connection
			
}; //func end

    
