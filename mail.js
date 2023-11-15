const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Function to generate a random verification token
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Function to send a verification email
const sendVerificationEmail = (recipientEmail, verificationToken) => {
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.porkbun.com',
    port: 587, // Change port to 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ibrahim@ibadulkarim.co',
      pass: 'EVie1234',
    },
  });
  
  // Email content
  const mailOptions = {
    from: 'smartgrader.co', // replace with your email
    to: recipientEmail,
    subject: 'Email Verification',
    text: `Your verification token is: ${verificationToken}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

// Example usage
const recipientEmail = 'aliveevie@gmail.com';
const verificationToken = generateToken();

// In a real application, you would typically store the token in a database
// along with the user's information for later verification.

// For now, let's just print the token and send the email
console.log(`Verification token: ${verificationToken}`);
sendVerificationEmail(recipientEmail, verificationToken);
