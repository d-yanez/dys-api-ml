
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
    res.status(200).send({msg:'ok'})


}
