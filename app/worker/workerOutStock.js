// worker.js
const { parentPort } = require('worker_threads');

// Aquí puedes hacer el trabajo que quieras en el worker
parentPort.on('message', (message) => {
  console.log(`Worker recibió el mensaje: ${message}`);
  //1.- get token ML
  //2.- get item from order
  //3.- validate stock availabilty by item in order for each
  //4.- if out stock, send message template whatsapp
  //.- else ....



  parentPort.postMessage(`Respuesta desde el worker: ${message}`);
});