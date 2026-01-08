
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"FoundIt App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};


//all nodemailer setup
