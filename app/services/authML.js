
const model = require('../models/param')
const FormData = require('form-data');
const {API_ML_CLIENT_ID,API_ML_CLIENT_SECRET,API_ML_REDIRECT_URI} = process.env

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


//get code tgr from mondo after redirect first
exports.getCodeTG = async () => {
    console.log(`getCodeTG init`)
    const doc = await model.findOne({ name: 'code_tg',type:'auth_ml' });
    if (doc){
        console.log(`tg code get success->${doc.value}`)
        return {status:true,codeTg:doc.value}
    }
    console.log(`tg code get failed, not found`)
    return {status:false,codeTg:null}
    
}


// save refresh token
exports.saveRefreshToken = async (refreshToken) => {
    console.log(`saveRefreshToken - init - refresh_token: ${refreshToken}`)
    const doc = await model.findOne({ name: 'refresh_token',type:'auth_ml' });
    if (doc){
        console.log(`updating.....`)
        const update = { value: refreshToken };
        await doc.updateOne(update);
    }
    else{
        console.log(`saving...`)
        const instance = new model(
            { 
                name: "refresh_token",
                type:"auth_ml",
                value:refreshToken
    
            }
        );
        await instance.save();

    }
    console.log(`saveRefreshToken - end`)
    
}


// save access token
exports.saveAccessToken = async (accessToken) => {
    console.log(`saveAccessToken - init - accessToken: ${accessToken}`)
    const doc = await model.findOne({ name: 'access_token',type:'auth_ml' });
    if (doc){
        console.log(`updating.....`)
        const update = { value: accessToken };
        await doc.updateOne(update);
    }
    else{
        console.log(`saving...`)
        const instance = new model(
            { 
                name: "access_token",
                type:"auth_ml",
                value:accessToken
    
            }
        );
        await instance.save();

    }
    console.log(`saveAccessToken - end`)
    
}


//get refresh token
exports.getRefreshToken = async () => {
    console.log(`getRefreshToken - init`)
    const doc = await model.findOne({ name: 'refresh_token',type:'auth_ml' });
    if (doc){
        console.log(`refresh_token code get success->${doc.value}`)
        return {status:true,refreshToken:doc.value}
    }
    console.log(`refresh_token code get failed, not found`)
    return {status:false,refreshToken:null}
    
}

//get refresh token
exports.getAccessToken = async () => {
    console.log(`getAccessToken - init`)
    const doc = await model.findOne({ name: 'access_token',type:'auth_ml' });
    if (doc){
        console.log(`access_token code get success->${doc.value}`)
        return {status:true,accessToken:doc.value}
    }
    console.log(`access_token code get failed, not found`)
    return {status:false,accessToken:null}
    
}

exports.getAccessTokenCallBack =  () => {
    console.log(`getAccessToken - init`)
    model.findOne({ name: 'access_token',type:'auth_ml' }, (err,doc) => {

        if (err){

        }
        if (doc){
            console.log(`access_token code get success->${doc.value}`)
            return {status:true,accessToken:doc.value}
        }
        console.log(`access_token code get failed, not found`)
        return {status:false,accessToken:null}

    });

    
}

//Important: user pass as future as input
exports.getAccessTokenAsync = async () => {
    
    console.log("call getCodeTG...")

    const responseCodeTg = await this.getCodeTG();
    const  respData = 'Error'
    if(responseCodeTg.status){

           //let payload = { name: 'John Doe', occupation: 'gardener' };
        console.log(`code tg getted!! now completing formdata...`)
        const form_data = new FormData();
        form_data.append('grant_type', 'authorization_code')
        form_data.append('client_id', API_ML_CLIENT_ID)
        form_data.append('client_secret', API_ML_CLIENT_SECRET)
        form_data.append('code', responseCodeTg.codeTg)
        form_data.append('redirect_uri', API_ML_REDIRECT_URI)

        
        const url_token = "https://api.mercadolibre.com/oauth/token"
        console.log(`calling ${url_token} ...`)
        const responseML = await axios.post(url_token, form_data,{ headers: form_data.getHeaders()})
        console.log(`result responseML...`)
        console.log(responseML)
        if(responseML & responseML.data !== 'undefined'){
            const access_token = responseML.data.access_token
            const refresh_token = responseML.data.refresh_token
            //save the access_token and refresh_token in mongo to future to get access token by refresh_token
            const responseRefreshToken = await authMLServices.saveRefreshToken(refresh_token);
            const responseAccessToken = await authMLServices.saveAccessToken(access_token);

            respData = access_token
            console.log(data);
        }
        
    }
    else{
        console.log("Error to get token!!")
    }

 


    //curl --location 'https://api.mercadolibre.com/oauth/token' \
    //--header 'accept: application/json' \
    //--header 'content-type: application/x-www-form-urlencoded' \
    //--data-urlencode 'grant_type=authorization_code' \
    //--data-urlencode 'client_id=5886772185912953' \
    //--data-urlencode 'client_secret=BPz3trtzz7DiZPQ7PjCNNZQ17jUBgEug' \
    //--data-urlencode 'code=TG-64eec1212bc5b00001588061-1244824352' \
    //--data-urlencode 'redirect_uri=https://dys-api-ml-prd.up.railway.app/callback/auth'

    //res.send({token:respData})

    
    
    
}


exports.getAccessTokenByRefreshToken = async (req, res) => {
    
    console.log("getAccessToken")
    let refreshToken = await this.getRefreshToken()
    //let payload = { name: 'John Doe', occupation: 'gardener' };
    const form_data = new FormData();
    form_data.append('grant_type', 'refresh_token')
    form_data.append('client_id', API_ML_CLIENT_ID)
    form_data.append('client_secret', API_ML_CLIENT_SECRET)
    form_data.append('refresh_token', refreshToken)


    
    const url_token = "https://api.mercadolibre.com/oauth/token"
    const responseML = await axios.post(url_token, form_data,{ headers: form_data.getHeaders()})

    const data = responseML.data.access_token;
    console.log(data);


    //curl --location 'https://api.mercadolibre.com/oauth/token' \
    //--header 'accept: application/json' \
    //--header 'content-type: application/x-www-form-urlencoded' \
    //--data-urlencode 'grant_type=authorization_code' \
    //--data-urlencode 'client_id=5886772185912953' \
    //--data-urlencode 'client_secret=BPz3trtzz7DiZPQ7PjCNNZQ17jUBgEug' \
    //--data-urlencode 'code=TG-64eec1212bc5b00001588061-1244824352' \
    //--data-urlencode 'redirect_uri=https://dys-api-ml-prd.up.railway.app/callback/auth'


    
    res.send({token:data})
    
}