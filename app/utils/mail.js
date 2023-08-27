const nodemailer = require('nodemailer');

const {MAIL_USER,MAIL_PASS} = process.env






exports.send = (message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    })
    console.log('Sending message to mail....')
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
        } else {
            console.log("Email enviado")
        }
    })
}