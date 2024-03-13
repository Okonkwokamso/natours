const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    timeout: 150000000
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'okonkwomitchelle@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) Send the email
  // const emailContent = await transporter.sendMail(mailOptions);
  // return(emailContent);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
};

module.exports = sendEmail;

















