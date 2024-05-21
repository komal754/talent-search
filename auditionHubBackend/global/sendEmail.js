// const nodemailer = require("nodemailer");
// require("dotenv").config({ path: "./../.env" });
// const HTML_TEMPLATE = require("../emailTemplate/messageTemplate");
// const message = "Hi...";
// // Set up the email transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: process.env.GMAIL_HOST,
//   port: process.env.GMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// // Email details
// const mailOptions = {
//   from: process.env.GMAIL, // Sender's address
//   to: "jayeshvijay649@gmail.com", // Receiver's address
//   subject: "Test Email",
//   //   text: "Hello, this is a test email!",
//   html: HTML_TEMPLATE(message),
// };

// // Send email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("Email sent:", info.response);
//   }
// });
// emailSender.js
const nodemailer = require("nodemailer");
const HTML_TEMPLATE = require("../emailTemplate/messageTemplate");
require("dotenv").config({ path: "./../.env" });

// Function to send an email
const sendEmail = (to, subject, message) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // Email details
  const mailOptions = {
    from: process.env.GMAIL, // Sender's address
    to, // Receiver's address
    subject,
    html: HTML_TEMPLATE(message),
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
// how to use it on another Controller...
// const message = "Hi...";
// sendEmail("jayeshvijay649@gmail.com", "Test Email", message);
// Export the function
module.exports = sendEmail;
