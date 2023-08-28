
const mail = require('../utils/mail')

exports.notification = async (req, res) => {
    console.log("notification...")
    console.log(req.body)
    
    var message = {
        from: "ventasml@dyhsopnow.cl",
        to: "dyanez@dyhsopnow.cl",
        subject: "Ejemplo de asunto de correo",
        text: "Plaintext version of the message",
        html: "<p>Link para entrar a la página de microlab: <br> <a href='https://microlab.ec'></a></p>"
    };
    //mail.send(message)

    res.status(200).send({msg:'ok'})


}

exports.authRedirect = async (req, res) => {
    console.log("authRedirect...")
    console.log(req.body)
    console.log(`code->${req.query.code}`)
    console.log(`state->${req.query.state}`)
    res.status(200).send({msg:'ok'})


}

exports.mail = async (req, res) => {
    console.log("mailing......")
    console.log(req.body)
    
    var message = {
        from: "dyanez@dyhsopnow.cl",
        to: "ventasml@dyhsopnow.cl",
        subject: "Ejemplo de asunto de correo",
        text: "Plaintext version of the message",
        html: "<p>Welcome</p>"
    };
    mail.send(message)
    console.log("mailed......")
    res.status(200).send({msg:'ok'})


}
