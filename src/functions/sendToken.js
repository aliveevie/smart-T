const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');
const token = require('./generateToken');

const main = async (receiver, schoolName, code) => {
   
    const options = {
        from: 'info@smartgrader.co',
        to: receiver,
        cc: 'ibrahim@ibadulkarim.co, info@smartgrader.co, iabdulkarim472@gmail.com',
        replyTo: 'aliveevie@gmail.com',
        subject: 'Complete Your Sign Up For the Smart Grading System',
        text: `Hello ${schoolName}!\n\nThis is your token code: ${code}\n\nUse this code to complete your registration.`,
        html: `
          <p>Hello ${schoolName}!</p>
          <p>Your token code for registration is: <strong>${code}</strong></p>
          <p>Use this code to complete your registration on the Smart Grading System.</p>
        `,
        textEncoding: 'base64',
        headers: [
          { key: 'X-Mailer', value: 'Smart Grading System Mailer' },
          { key: 'X-Application-Developer', value: 'Ibrahim Abdulkarim' },
          { key: 'X-Application-Version', value: 'v1.0.0.2' },
        ],
      };
      
  const messageId = await sendMail(options);
  return messageId;
};


module.exports = main;

  