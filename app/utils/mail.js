const nodemailer = require('nodemailer');

const {MAIL_USER,MAIL_PASS,SA_CLIENT_ID,SA_CLIENT_EMAIL,SA_PRIVATE_KEY} = process.env

exports.send = async  (message) => {

    console.log("createTransport... ")

    //sa-inventory@inventory-396402.iam.gserviceaccount.com
    try{
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                serviceClient:SA_CLIENT_ID,
                user: "dyanez@dyshopnow.cl",
                privateKey:SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
                accessUrl:"https://oauth2.googleapis.com/token"
            }
        })
        console.log('transporter.verify()....')
        await transporter.verify()
        console.log('transporter.sendMail()....')
        transporter.on('token', token => console.log(token));
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log("Error enviando email")
                console.log(error.message)
            } else {
                console.log("Email enviado")
                console.log(`Message sent: ${info.messageId}`)
            }
        })
        
        

    } catch(error){
        console.log(error)
    }
}