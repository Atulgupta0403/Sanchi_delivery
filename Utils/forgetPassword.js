const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service : "gmail",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
      user: process.env.USER,
      pass: process.env.PASS,
  },
});

module.exports = transporter