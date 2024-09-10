// worker.js
const { parentPort } = require('worker_threads');
const orderApiServices = require('../services/orderApi');

// Aquí puedes hacer el trabajo que quieras en el worker
//recibe el campo "resource"
parentPort.on('message', (message) => {
  console.log(`Worker recibió el mensaje: ${message}`);
  //1.- get token ML
  //2.- get item from order
  //3.- validate stock availabilty by item in order for each
  //4.- if out stock, send message template whatsapp
  //.- else ....

  let order = message.match(/\/(\d+)$/)[1];
  let resp = orderApiServices.getOrderInfo(order)
  console.log(resp)
  




  parentPort.postMessage(`Respuesta desde el worker: ${message}`);
});