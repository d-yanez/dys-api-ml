
const mail = require('../utils/mail')
const authML = require('../services/authML')
const authMLController = require('../controllers/authML')

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
// auth first time => save code tg and call api ml to get info access token and refresh token
exports.authRedirect = async (req, res) => {
    console.log("authRedirect...")
    console.log(req.body)
    console.log(`code->${req.query.code}`)
    console.log(`state->${req.query.state}`)
    //save tgr in mongo!!
    await authML.saveCodeTg(req.query.code)
    //get access token and refresh token to save from api ML (dejar llamado asincrono)
    await authML.getAccessTokenAsync()

    res.status(200).send({code:req.query.code})


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


