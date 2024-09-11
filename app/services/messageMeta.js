const axios = require('axios');

const {META_PHONE_NUMBER_ID,META_ACCESS_TOKEN,TO_PHONE_NUMBER} = process.env

const templateName = 'out_stock_tmp'; // Nombre de la plantilla aprobada



exports.notificationOutStock = async (sku) => {
  //const usuarioId = req.params.id;
  //res.send(`El ID del usuario es: ${usuarioId}`);
  console.log('[notification] - inicio');
  console.log('[notification] - recipientPhone: ',TO_PHONE_NUMBER);
  let message = `https://railway-node-express-app.up.railway.app/views?sku=${sku}`
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${META_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: TO_PHONE_NUMBER,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en'
          },
          components:[
            {
              type:'body',
              parameters: [
                {
                  type: 'text',
                  text: `${message}`
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Mensaje enviado:', response.data);


    
  } catch (error) {
    console.error('Error al enviar mensaje:', error.response ? error.response.data : error.message);
  }
  console.log('[notification] - inicio');
}



