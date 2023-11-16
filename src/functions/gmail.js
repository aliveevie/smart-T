const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

require('dotenv').config();


const access_token = process.env.access_token;
const refresh_token = process.env.refresh_token;
const scope = process.env.scope;
const token_type = process.env.token_type;
const expiry_date = process.env.expiry_date;

const tokens = { access_token, refresh_token, scope, token_type, expiry_date }

const getGmailService = () => {
  const redirect_uris  = process.env.REDIRECT_URIS;
  const client_secret = process.env.CLIENT_SECRET;
  const client_id = process.env.CLIENT_ID;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  return gmail;
};

const encodeMessage = (message) => {
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

const sendMail = async (options) => {
  const gmail = getGmailService();
  const rawMessage = await createMail(options);
  const { data: { id } = {} } = gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: rawMessage,
    },
  });
  return id;
};


module.exports = sendMail;