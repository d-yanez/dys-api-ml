
const mail = require('../utils/mail')
const authML = require('../services/authML')
const authMLController = require('../controllers/authML')
const orderWorder = require('../controllers/orderWorker')
const orderApiServices = require('../services/orderApi');

const Queue = require('bull');

// Crear una cola para las órdenes
const orderQueue = new Queue('orderQueue');

// Procesar los trabajos en segundo plano
orderQueue.process(async (job) => {
  // Aquí haces la lógica pesada como consultar a Mercado Libre
  console.log('Procesando la orden:', job.data);
  //await handleOrderLogic(job.data); // Lógica que procesa el pedido
  let order = job.data.match(/\/(\d+)$/)[1];
  let resp = await orderApiServices.getOrderInfo(order)
  console.log(resp)
  console.log('Orden procesada');
});

exports.notification = async (req, res) => {
    console.log("notification...")
    const messageOrder = req.body

    console.log(messageOrder)
    res.status(200).send({msg:'Orden recibida'})

      // Ejecutar la lógica en segundo plano usando setImmediate
    setImmediate(async () => {
        console.log('Procesando la lógica en segundo plano...');
        let order = (messageOrder.resource).match(/\/(\d+)$/)[1];
        console.log(`order ->${order}`)
        //await orderApiServices.getOrderInfo(order)
        await orderApiServices.cfCheckStockML(order)
        console.log('Lógica de la orden completada');
    });
    //console.log(`message ml: ${req.body}`)
    //mail.send(message)
    //orderWorder.order(req.body)

      // Añadir el trabajo a la cola
    /*const orderData = req.body;
    if ('resource' in orderData) {
        console.log('put order in orderQueue');
        //orderQueue.add(orderData);

    }
    else {
        console.log('not exist resource field in object!');
    }
    */
   

    // Responder inmediatamente con 200 OK
    //res.status(200).send('Orden recibida');

    


}
// auth first time => save code tg and call api ml to get info access token and refresh token
exports.authRedirect = async (req, res) => {
    console.log("authRedirect...")
    //console.log(req.body)
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


