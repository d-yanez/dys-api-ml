const axios = require('axios');

const messageMetaServices = require('../services/messageMeta');


//const recipientPhone = '56996782312'; // Número de teléfono del destinatario
const templateName = 'out_stock'; // Nombre de la plantilla aprobada


exports.notification = async (req, res) => {

  let sku = req.params.sku
  console.log(`[notification] - sku:${sku}`);
  messageMetaServices.notificationOutStock(sku)

  res.send({ staus: 'ok' })
}



