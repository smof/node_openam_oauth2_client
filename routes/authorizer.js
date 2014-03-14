//authorizer.js - converts session token into authorization code

var http = require('http');
var tokenizer = require('./tokenizer.js'); //getToken
	
//gets authorization code ////////////////////////////////////////////////////////////
exports.getAuthzCode = function(tokenId) {
		
		console.log('Attempt to get authorization code started...');

		//params to build openam authorization code request ////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var authZCodeParams = {
			
			host: 'openam.example.com',
			path: '/openam/oauth2/authorize?service=apiService',
			port: '8080',
			method: 'POST',
			headers: {'Cookie': '', 'Content-Type' : 'application/x-www-form-urlencoded'}
		};
		//params to build openam authorization code request ////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//set tokenID in the request for the authorization code with arg that gets dropped into function		
		authZCodeParams['headers']['Cookie']='iPlanetDirectoryPro=' + tokenId;
		
		console.log('Authorization code request parameters look like this...');
		console.log(JSON.stringify(authZCodeParams) + '\n');
		
		//set payload
		client_id="oauth2_app";
		redirect_uri="http://localhost:3002/oauth2";
		data = "response_type=code&save_consent=0&decision=Allow&scope=uid&client_id=" + client_id + "&redirect_uri=" + redirect_uri
		
		//console.log(data);
		
		//create request for authorization code - in-situ callback to capture authorization code via the response header ///////////////////////////////////////////////
		var authZCodeRequest = http.request(authZCodeParams,function(res) {
						  
						  //get the authz code
						  authorizationCode = res.headers.location.split("?")[1].split("=")[1];//JSON.stringify(res.headers.location.split("?")[1].split("=")[1].replace(/"/g, ""));
						  
						  console.log('Authorization code response from OpenAM...');
						  console.log('Authorization code: ' + authorizationCode + '\n');
						  
						  //call getToken function now we have authorizationCode
						  tokenizer.getToken(authorizationCode);						  
						  
					});
		
		console.log('Authorization code request payload looks like this...');
		console.log(data + '\n');
			
		authZCodeRequest.write(data);
		authZCodeRequest.end();
		//create request for authorization code - in-situ callback to capture authorization code via the response header ///////////////////////////////////////////////
	
}; //func end

///////////////////////////////////////////////////////////////////////////////////////


