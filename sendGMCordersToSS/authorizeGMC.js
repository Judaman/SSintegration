#!/usr/local/bin/node

const opn = require('opn');
const fs = require('fs')
const readline = require('readline')
const {
  google
} = require('googleapis');

var credentials = {
  "installed": {
    "client_id": "1078578761778-9bjldf1jv79akcvmkah2r65qjb1nji0g.apps.googleusercontent.com",
    "project_id": "quickstart-1564897750854",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "Qu1HSeJMkMSo0O3n8Y9PhViO",
    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
  }
}

var auth;


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/content'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
// Load client secrets from a local file.

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  try {
    var token = fs.readFileSync(TOKEN_PATH, 'utf8')
  } catch (e) {
    return getNewToken(oAuth2Client);
  }
  oAuth2Client.setCredentials(JSON.parse(token));

  auth = oAuth2Client;
  return auth;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  // opens the url in the default browser
  opn(authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });

      //  callback(oAuth2Client);
    });
  });
}

module.exports = {
  authorize: async function() {
     authorize(credentials);
    return auth

  }
}
