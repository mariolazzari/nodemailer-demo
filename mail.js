const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// read env vars
dotenv.config();
const { GMAIL_USER, GMAIL_PASS, O365_USER, O365_PASS } = process.env;

// gmail smtp
const gmailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// gmail options
const gmailOptions = {
  from: GMAIL_USER,
  to: O365_USER,
  subject: "Test nodemailer gmail",
  text: "Test nodemailer from gmail to office 365.",
};

// 365 options
const o365Options = {
  from: O365_USER,
  to: GMAIL_USER,
  subject: "Test nodemailer 365",
  text: "Test nodemailer from 365 to gmail.",
};

// from gmail to office 365
const sendGmail = async () => {
  try {
    await gmailTransport.sendMail(gmailOptions);
    console.log(GMAIL_USER + " writes to " + O365_USER);
  } catch (error) {
    console.log("Email sent: " + info.response);
  }
};

// from office 365 to gmail
const send365 = async () => {
  try {
    await gmailTransport.sendMail(o365Options);
    console.log(O365_USER + " writes to " + GMAIL_USER);
  } catch (error) {
    console.log("Email sent: " + info.response);
  }
};

module.exports = { sendGmail, send365 };
