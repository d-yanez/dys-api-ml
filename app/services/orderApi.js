
const model = require('../models/param')
const {URLSearchParams} = require('url');
const messageMetaServices = require('../services/messageMeta')
const LogOrderSku = require('../models/logOrderSku');
const connectDB = require('../../config/db')



const axios = require('axios')
const {USER_TOKEN,PASS_TOKEN} = process.env

exports.saveData = async (req, res) => {
    console.log("saving the next Stock...")
    console.log(req.body)
    //console.log(req.body.title)
    const awesome_instance = new model(
        { 
            sku: "1374696258",
            title:"Kit Cumpleaños Hot Wheels Decoración + Tela Fondo",
            location:"C009",
            stock:2,
            obs:""

        }
    );
    await awesome_instance.save();
    console.log("saved!")

    res.send({data:'saveData!'})


}
// guarda tgr code necesario para obtener access token, luego se obtiene po refresh token!!
exports.saveCodeTg = async (codeTg) => {
    console.log(`saveCodeTg - init - codeTg: ${codeTg}`)
    const doc = await model.findOne({ name: 'code_tg',type:'auth_ml' });
    if (doc){
        console.log(`updating.....`)
        const update = { value: codeTg };
        await doc.updateOne(update);
    }
    else{
        console.log(`saving...`)
        const instance = new model(
            { 
                name: "code_tg",
                type:"auth_ml",
                value:codeTg
    
            }
        );
        await instance.save();

    }
    console.log(`saveCodeTg - end`)
    
}


//call ml/token (services dyshopnow who call api ml auth to get access token and refresh token)
//get refresh token
exports.getOrderInfo = async (orderNumber) => {
    console.log(`getOrderInfo.init ->${orderNumber}`)
    //1.- get token by refresh token
    
    const uri_token = "https://dys-api-ml-prd.up.railway.app/ml/auth/token"
    console.log(`getOrderInfo - get token by url ->${uri_token}`)
    const headers = {
        'Content-Type': 'application/json',
        'user': USER_TOKEN,
        'pass': PASS_TOKEN
      };
    
    const respToken = await axios.post(uri_token, {}, { headers })
    console.log(`getOrderInfo.token ->${respToken.data.token}`)
    //2.- get order info from api ML by order number
    //const form_data = new FormData();
    let auth = `Bearer ${respToken.data.token}`
    //form_data.append('Authorization',auth)
    const uriOrder = `https://api.mercadolibre.com/orders/${orderNumber}`

    console.log(`getOrderInfo - order info for ->${orderNumber}`)
    //const config = {
    //    headers: { 'Authorization': auth }
    //  };
    headersAuth = {
        'Content-Type': 'application/json',
        'Authorization': auth 
    }
    console.log(`getOrderInfo - uriOrder ->${uriOrder}`)
    const response = {}
    try{
        const response = await axios.get(uriOrder, {
            headers: {
              'Authorization': `Bearer ${respToken.data.token}` 
            }
          });
        //console.log(`total_amount ->${response.data.total_amount}`)
        //recorriendo cada item

        for (const orderItem of response.data.order_items){
            const item = orderItem.item;
            console.log(`ID: ${item.id}, Título: ${item.title}`);

            try {
              // Aquí puedes hacer una solicitud asíncrona con await
              const respuesta = await axios.get(`https://api.mercadolibre.com/items/${item.id}`,
                {
                    headers: {
                      'Authorization': `Bearer ${respToken.data.token}` 
                    }
                  }
              );
              
              console.log(`available_quantity (main): ${respuesta.data.available_quantity}`);
              if (respuesta.data.available_quantity == 0){
                let sku = item.id.slice(3);
                console.log(`sku out stock ->${sku}`)
                /*let resp = await skuOrderExist(sku,orderNumber)
                if(!resp){

                  messageMetaServices.notificationOutStock(sku)
                }*/

                  // Conectar a MongoDB
                /*connectDB()
                .then(() => {
                  console.log('Conexión a MongoDB exitosa');


                  // Llamar a la función para manejar la notificación
                  skuOrderExist(sku,orderNumber)
                    .then(result => {
                      if (result) {
                        console.log('La orden ya existe en la base de datos.');
                      } else {
                        console.log('La orden fue insertada en la base de datos.');
                      }
                    })
                    .catch(err => {
                      console.error('Error procesando la orden:', err);
                    });
                })
                .catch((error) => {
                  console.error('No se pudo conectar a MongoDB:', error);
                }); */

                //usando async/awai
                    // Esperar la conexión a la base de datos
                await connectDB();
                console.log('Conexión a MongoDB exitosa');
                    // Esperar el manejo de la notificación de la orden
                const result = await skuOrderExist(sku,orderNumber);
                // Verificar el resultado
                if (result) {
                  console.log('La orden ya existe en la base de datos.');
                } else {
                  console.log('La orden fue insertada en la base de datos.');
                  messageMetaServices.notificationOutStock(sku)
                }
                

              }
              else{
                
                let inventory_id = getInventoryId(respuesta.data)
                console.log(`inventory_id: ${inventory_id}`);
                if(inventory_id !== null){
                  //consultamos stock en FULL!!!
                  const respuestaFull = await axios.get(`https://api.mercadolibre.com/inventories/${inventory_id}/stock/fulfillment`,
                    {
                        headers: {
                          'Authorization': `Bearer ${respToken.data.token}` 
                        }
                      }
                  );

                  if (!respuestaFull || typeof respuestaFull !== 'object') {
                    console.error('La respuesta no es un objeto válido o es null.');
                    return false;
                  }
                    // Verifica si contiene propiedades clave
                  if (!respuestaFull.hasOwnProperty('data')) {
                    console.error('La respuesta no contiene la propiedad "data".');
                    return false;
                  }
                  // Valida que el campo precio no sea null o undefined
                  if (respuestaFull.data.available_quantity === null || respuestaFull.data.available_quantity === undefined) {
                    console.error('El campo "available_quantity" es inválido.');
                    return false;
                  }
                  //todo ok!!
                  console.log(`available_quantity for inventory_id(${inventory_id}): ${respuestaFull.data.available_quantity}`);
                  if (respuestaFull.data.available_quantity == 0){
                    let sku = item.id.slice(3);
                    console.log(`sku out stock (en FULL) ->${sku}`)
                    /*let exists = await skuOrderExist(sku,orderNumber);
                    if(!exists){
                      messageMetaServices.notificationOutStock(sku);
                    }*/
                    await connectDB();
                    console.log('Conexión a MongoDB exitosa');
                        // Esperar el manejo de la notificación de la orden
                    const result = await skuOrderExist(sku,orderNumber);
                    // Verificar el resultado
                    if (result) {
                      console.log('La orden ya existe en la base de datos.');
                    } else {
                      console.log('La orden fue insertada en la base de datos.');
                      messageMetaServices.notificationOutStock(sku)
                    }
                  }

                }
                
                else{
                  console.log("No es fulfillment")
                }
              }


            } catch (error) {
              console.error(`Error al obtener detalles del item ${item.id}:`, error);
            }
        }

    }
    catch (error) {
        console.error('Error en getOrderInfo:', error);
    }
   
    console.log(`getOrderInfo.end`)
    return response
    
}

function isFulfillment(data){
  console.log(`data.shipping.logistic_type ->${data.shipping.logistic_type}`)
    return data.shipping.logistic_type === "fulfillment";
}

function getInventoryId(data){
  let resp = {}
  console.log("obteniendo inventory_id...")
  let inventory_id = null
  //buscamos primero en cuerpo principal
  if (data.inventory_id !== null){
      console.log(`Encontrado en data.inventory_id->${data.inventory_id}`)
      return data.inventory_id;
  }

  if(data.variations.length > 0){
    console.log("obteniendo el invenroty id")
    for (let i = 0; i < data.variations.length; i++){
      if (data.variations[i].inventory_id !== undefined){
        inventory_id = data.variations[i].inventory_id;
        console.log(`Encontrado en data.variations[${i}].inventory_id->${inventory_id}`)
        break;
      }
    }
  }
  else {
    console.log("Sin variacion en full para invenroty id")
  }
  return inventory_id
}

async function  skuOrderExist(sku, order)
{
  console.log(`searching by sku ${sku} and order ${order}`)
  try {
    // Buscar si ya existe un documento con el mismo sku y order_number
    const existingEntry = await LogOrderSku.findOne({ sku, order });

    if (existingEntry) {
      // Si ya existe, retornar true
      console.log(`Exists: Yes`)
      return true;
    } else {
      // Si no existe, crear una nueva entrada y retornar false
      const newEntry = new LogOrderSku({ sku, order });
      const savedEntry = await newEntry.save();
      
      // Imprimir el ID del objeto guardado
      console.log('Exists: Not and ID del objeto guardado:', savedEntry._id);
      return false;
    }
  } catch (error) {
    console.error('Error al manejar la orden:', error);
    throw new Error('Error al procesar la orden');
  }
}