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

export const sendVerificationEmail = (token, receiver) => transporter.sendMail({
    from: 'noreply@venue-app.com',
    to: receiver,
    subject: "verification mail",
    text: 'hello ',
    html: `<h1>hello, this is your verification ${token}</h1>`
  });

export default transporter;
