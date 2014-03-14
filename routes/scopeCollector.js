//performs scope requests

var http = require('http');

exports.getScopes = function(bearerToken) {

			accessToken = bearerToken['access_token'];
			
			console.log('Attempt to make scope request started ... \n');
						
			//params to build openam authorization code to access token request
			var scopeRequestParams = {
				
				host: 'openam.example.com',
				path: '/openam/oauth2/tokeninfo?access_token=',
				port: '8080',
				method: 'GET'
				
			};
			
			//add in access token from the bearer token
			scopeRequestParams['path'] = scopeRequestParams['path'] + accessToken;
			
			console.log('Scope request parameters look like this...');
			console.log(JSON.stringify(scopeRequestParams) + '\n');
			
			//call back to process access token response	
			scopeResponseCallback = function(response) {
			 
				var str = ''
				//capture response
				response.on('data', function (chunk) {
						str += chunk;
				});
			
				//do stuff when response ends
				response.on('end', function () {
						
						console.log('Scope response from OpenAM received...\n');
						console.log(str);
						
				});
			};
			
			//call request to get scopes
			var scopeRequest = http.request(scopeRequestParams, scopeResponseCallback);
			scopeRequest.end(); //close connection
			
}; //func end

    
