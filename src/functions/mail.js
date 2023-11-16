const { google } = require('googleapis');
const credentials = require('./Data.json');
require('dotenv').config();

const redirect_uris  = process.env.REDIRECT_URIS;
const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const url = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: GMAIL_SCOPES,
});

console.log('Authorize this app by visiting this url:', url);