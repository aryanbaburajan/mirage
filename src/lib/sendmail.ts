const nodemailer = require("nodemailer");

const SEND_MAIL_CONFIG = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(SEND_MAIL_CONFIG);

export async function sendMail(
  recipients: string,
  subject: string,
  html: string
) {
  try {
    let info = await transporter.sendMail({
      from: SEND_MAIL_CONFIG.auth.user,
      to: recipients,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}
