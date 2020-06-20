import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service : 'gmail',
    secure: true, 
    port: 587,
    auth : {
        user : process.env.MAIL,
        pass : process.env.MAIL_PASS                
    },
    tls : {
        rejectUnauthorized : false
    }
})

export default transporter