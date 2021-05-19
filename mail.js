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

// https://stackoverflow.com/questions/60094539/not-able-to-send-emails-from-nodemailer-with-office365-account-in-nodejs-getting/62267653#62267653
// office 365 smtp
const o365Transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: "587",
  auth: { user: O365_USER, pass: O365_PASS },
  secureConnection: false,
  requireTLS: true,
  tls: { ciphers: "SSLv3" },
});

// office 365 options
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
    console.log("GMail error:", error);
  }
};

// from office 365 to gmail
const send365 = async () => {
  try {
    await o365Transport.sendMail(o365Options);
    console.log(O365_USER + " writes to " + GMAIL_USER);
  } catch (error) {
    console.log("Office 365 error:", error);
  }
};

module.exports = { sendGmail, send365 };
