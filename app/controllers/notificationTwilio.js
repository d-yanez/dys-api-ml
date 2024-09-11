// Your AccountSID and Auth Token from console.twilio.com
const {ACCOUNT_SID_TWILIO,AUTH_TOKEN_TWILIO,FROM_PHONE_NUMBER,TO_PHONE_NUMBER} = process.env


//const client = require('twilio')(ACCOUNT_SID_TWILIO, AUTH_TOKEN_TWILIO);
exports.notification = async (req, res) => {

    let cajas = '*C003, C027*'
    let qty = '*5*'
    let sku = '2125798784'
    //let message = `Producto en cajas ${cajas} sacar ${qty} unidades`
    let message = `Sku https://railway-node-express-app.up.railway.app/views?sku=${sku} agotado en Mercado Libre Full`
    /*client.messages
    .create({
       from: `whatsapp:${FROM_PHONE_NUMBER}`,
       body: message,
       to: `whatsapp:${TO_PHONE_NUMBER}`
     })
    .then(message => console.log(message.sid))*/
    
    res.send({staus:'ok'})
}

exports.outStockNotification = async (sku) =>{
  console.log('outStockNotification - init')
  l/*et message = `Sku https://railway-node-express-app.up.railway.app/views?sku=${sku} agotado en Mercado Libre, favor validar!`
  
  client.messages
  .create({
     from: `whatsapp:${FROM_PHONE_NUMBER}`,
     body: message,
     to: `whatsapp:${TO_PHONE_NUMBER}`
   })
  .then(message => console.log(message.sid))*/
  console.log('outStockNotification - end')
}
