const nodemailer = require('nodemailer');
const token = require('crypto');

// Function to generate a random verification token
const generateToken = () => {
  return token.randomBytes(20).toString('hex');
};

// Function to send a verification email
const sendVerificationEmail = async (recipientEmail, verificationToken) => {
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: 'aliveevie@gmail.com', // replace with your email
      pass: '08138300357', // replace with your password or use app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: 'aliveevie@gmail.com', // replace with your email
    to: recipientEmail,
    subject: 'Email Verification',
    text: `Your verification token is: ${verificationToken}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Message ID:', info);
    //console.log('Email sent: ' + info.response);

    console.log('Message ID:', info.messageId);
  });
};

// Example usage
const recipientEmail = 'ibrahimabdulkarim193@gmail.com';
const verificationToken = generateToken();

// In a real application, you would typically store the token in a database
// along with the user's information for later verification.

// For now, let's just print the token and send the email
console.log(`Verification token: ${verificationToken}`);

sendVerificationEmail(recipientEmail, verificationToken);
