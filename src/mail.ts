const nodemailer = require('nodemailer');
const token = require('crypto');

// Function to generate a random verification token
const generateToken = () => {
  return token.randomBytes(20).toString('hex');
};

// Function to send a verification email
const sendVerificationEmail = (recipientEmail:any, verificationToken:any) => {
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.porkbun.com',
    security: true,
    port: 587,
    auth: {
      user: 'ibrahim@ibadulkarim.co', // replace with your email
      pass: 'EVie1234', // replace with your password or use app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: 'ibrahim@ibadulkarim.co', // replace with your email
    to: recipientEmail,
    subject: 'Email Verification',
    text: `Your verification token is: ${verificationToken}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error:Error, info:any) => {
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

module.exports = sendVerificationEmail(recipientEmail, verificationToken);
