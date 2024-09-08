const axios = require('axios');

const phoneNumberId = '******'; // ID del número de teléfono en WhatsApp
const accessToken = '**********'; // Token de acceso de la API
//const recipientPhone = '56996782312'; // Número de teléfono del destinatario
const templateName = 'hello_world'; // Nombre de la plantilla aprobada


exports.notification = async (req, res) => {
  //const usuarioId = req.params.id;
  //res.send(`El ID del usuario es: ${usuarioId}`);
  console.log('[notification] - inicio');
  const recipientPhone = req.params.to;
  console.log('[notification] - recipientPhone: ',recipientPhone);
  //https://graph.facebook.com/v20.0/419762124552205/messages
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: recipientPhone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en_US'
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Mensaje enviado:', response.data);


    
  } catch (error) {
    console.error('Error al enviar mensaje:', error.response ? error.response.data : error.message);
  }
  console.log('[notification] - inicio');

  res.send({ staus: 'ok' })
}



