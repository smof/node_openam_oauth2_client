//Startup engine - OAuth2 client demo

//require statgements
var express = require('express');
var app = express();
var authenticator = require('./routes/authenticator.js');

//Express API setup ///////////////////////////////////////////////////////////////////

//for parsing POST payloads
app.use(express.bodyParser());

//basic openam authentication
app.post('/authenticate', authenticator.authenticate);

//set listener port
var port = 3002;

//start listener on HTTP port
app.listen(port);
console.log('Starting...');

//startup log
console.log('OAuth2 Demo Client Listening on port ' + port + '...\n');
//Express API setup ///////////////////////////////////////////////////////////////////


