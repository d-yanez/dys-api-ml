
const model = require('../models/param')
const {URLSearchParams} = require('url');
const axios = require('axios')

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
    console.log(`getOrderInfo.init`)
    //1.- get token by refresh token
    
    const uri_token = "https://dys-api-ml-prd.up.railway.app/ml/auth/token"
    console.log(`getOrderInfo - get token by url ->${uri_token}`)
    const respToken = await axios.post(uri_token)
    
    //2.- get order info from api ML by order number
    //const form_data = new FormData();
    let auth = `Bearer ${respToken.token} `
    //form_data.append('Authorization',auth)
    const uriOrder = `https://api.mercadolibre.com/orders/${orderNumber}`

    console.log(`getOrderInfo - order info for ->${orderNumber}`)
    const config = {
        headers: { 'Authorization': auth }
      };
    const orderResponse = await axios.get(uriOrder, config)
    console.log(`getOrderInfo.end`)
    return orderResponse
    
}