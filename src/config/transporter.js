import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 587,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendVerificationEmail = (token) => transporter.sendMail({
    from: 'rikoaxel@gmail.com',
    to: 'fauzan.habib@outlook.com',
    subject: "you're georegeous",
    text: 'hello ',
    html: `<h1>hello, this is your${token}</h1>`
  });

export default transporter;
