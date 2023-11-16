const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');

const main = async () => {
 
  const options = {
    to: 'ibrahimabdulkarim193@gmail.com',
    cc: 'ibrahim@ibadulkarim.co, info@smartgrader.co, iabdulkarim472@gmail.com',
    replyTo: 'aliveevie@gmail.com',
    subject: 'Hello Ibrahim We Testing This Item!',
    text: 'This email is sent from the command line',
    html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> from <a href="https://ibadulkarim.co">Ibrahim Abdulkarim Website</a>.</p>`,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Ibrahim Abdulkarim!' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };

  const messageId = await sendMail(options);
  return messageId;
};

main()
  .then((messageId) => console.log('Message sent successfully:', messageId));



  