import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});

export const sendVerificationEmail = (token, receiver) => transporter.sendMail({
    from: 'noreply@venue-app.com',
    to: receiver,
    subject: "verification mail",
    text: 'hello ',
    html: `<h1>hello, this is your verification ${token}</h1>`
  });

export default transporter;
