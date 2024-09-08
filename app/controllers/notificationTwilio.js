// Your AccountSID and Auth Token from console.twilio.com
const {ACCOUNT_SID_TWILIO,AUTH_TOKEN_TWILIO} = process.env

const client = require('twilio')(ACCOUNT_SID_TWILIO, AUTH_TOKEN_TWILIO);
exports.notification = async (req, res) => {

    let cajas = '*C003, C027*'
    let qty = '*5*'
    let sku = '2125798784'
    //let message = `Producto en cajas ${cajas} sacar ${qty} unidades`
    let message = `Sku https://railway-node-express-app.up.railway.app/views?sku=${sku} agotado en Mercado Libre Full`
    client.messages
    .create({
       from: 'whatsapp:+56937148839',
       body: message,
       to: 'whatsapp:+56996235706'
     })
    .then(message => console.log(message.sid))
    
    res.send({staus:'ok'})
}
