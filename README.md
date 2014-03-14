<b>OpenAM OAuth2 NodeJS Client</b>
<br/>
Basic NodeJS OAuth2 client application for testing OAuth2 access token requests, using the authorization code grant.
<br/>
Install nodeJS.  Run npm install in app directory to install dependencies.  To start run node server.js.  Listens on port 3002 - changeable in server.js
<br/>
<br/>
Edit necessary locations and ports for OpenAM.  Has one open API that takes username and password (simulates form based log in) then performs the following: 1) authenticates to OpenAM, 2) receives tokenID, 3) converts tokenId to necessary
authorization code, 4) converts authorization code into access token, 5) converts access token into scope query.
<br/>
Requires the necessary OAuth2 client profile being setup within OpenAM.
<br/>
OpenAM OAuth2 REST API - http://docs.forgerock.org/en/openam/11.0.0/dev-guide/index/chap-rest.html#rest-api-oauth2
<br/>
Configuring OAuth2 in OpenAM - http://docs.forgerock.org/en/openam/11.0.0/admin-guide/index/chap-oauth2.html
<br/>
<br/>
<b>Example</b>
<br/>
curl -H "Content-Type: application/json" --request POST --data '{"user":"smof","password":"*******"}' "http://localhost:3002/authenticate"
<br/>
Authentication request received:
{"user":"smof","password":"*******"}

Authentication request parameters look like this...
{"host":"openam.example.com","path":"/openam/json/authenticate","port":"8080","method":"POST","headers":{"X-OpenAM-Username":"smof","X-OpenAM-Password":"password","Content-Type":"application/json"}}

Authentication response from OpenAM received...
TokenId captured as: AQIC5wM2LY4SfcykV5WH_cjJDP8ClzDqMLeyx086kMRqsoc.*AAJTSQACMDEAAlNLABQtNDMxMDI5NzQ2NjkwNTUwNjQ4Mg..*

Attempt to get authorization code started...
Authorization code request parameters look like this...
{"host":"openam.example.com","path":"/openam/oauth2/authorize?service=apiService","port":"8080","method":"POST","headers":{"Cookie":"iPlanetDirectoryPro=AQIC5wM2LY4SfcykV5WH_cjJDP8ClzDqMLeyx086kMRqsoc.*AAJTSQACMDEAAlNLABQtNDMxMDI5NzQ2NjkwNTUwNjQ4Mg..*","Content-Type":"application/x-www-form-urlencoded"}}

Authorization code request payload looks like this...
response_type=code&save_consent=0&decision=Allow&scope=uid&client_id=oauth2_app&redirect_uri=http://localhost:3002/oauth2

Authorization code response from OpenAM...
Authorization code: a4a33cd9-8095-4692-b45e-95324d59e9a9

Attempt to get access token started ... 

Access token request parameters look like this...
{"host":"openam.example.com","path":"/openam/oauth2/access_token?service=apiService","port":"8080","method":"POST","headers":{"Content-Type":"application/x-www-form-urlencoded","Authorization":"Basic b2F1dGgyX2FwcDpMZXRtZTFuMTAwIQ=="}}

Access token request payload looks like this...
grant_type=authorization_code&code=a4a33cd9-8095-4692-b45e-95324d59e9a9&redirect_uri=http://localhost:3002/oauth2

Access Token response from OpenAM received...

{"scope":"am.protected.user.REST_API_Attribute uid","expires_in":59,"token_type":"Bearer","refresh_token":"19a0ca99-7d86-48a8-ad99-a6708702ff38","access_token":"e821e999-88b2-43de-b064-29268ad55966"}


Attempt to make scope request started ... 

Scope request parameters look like this...
{"host":"openam.example.com","path":"/openam/oauth2/tokeninfo?access_token=e821e999-88b2-43de-b064-29268ad55966","port":"8080","method":"GET"}

Scope response from OpenAM received...

{"uid":"smof","scope":["uid"],"realm":"/","token_type":"Bearer","expires_in":59,"access_token":"e821e999-88b2-43de-b064-29268ad55966"}


