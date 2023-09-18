
const mail = require('../utils/mail')
const axios = require('axios')
const FormData = require('form-data');

const authMLServices = require('../services/authML')

const {API_ML_CLIENT_ID,USER_TOKEN,PASS_TOKEN} = process.env

exports.mlUriRedirect = async (req, res) => {
    console.log("mlUriRedirect...")
    //var authCallback = GetBaseUrl() + '/auth/mercadolibre/callback';
    
    clientId = API_ML_CLIENT_ID
    authCallback="https://dys-api-ml-prd.up.railway.app/callback/auth"
    redirectUrl= `https://auth.mercadolibre.cl/authorization?response_type=code&client_id=${clientId}&redirect_uri=${authCallback}`
    //var redirectUrl = util.format('https://auth.mercadolibre.cl/authorization?response_type=code&client_id=%s&redirect_uri=%s',
    //    clientId, authCallback);
    console.log(`redirectUrl->${redirectUrl}`)
    res.redirect(redirectUrl);
    
}


//Important: user pass as future as input
exports.getAccessTokenAsync = async (req, res) => {
    //call services asincrono
    authMLServices.getAccessTokenAsync();
    
    res.send({staus:'ok'})
}


   /*Parámetros
    grant_type: refresh_token indica que la operación deseada es actualizar un token.
    refresh_token: el refresh token del paso de aprobación guardado previamente.
    client_id: es el APP ID de la aplicación que se creó.
    client_secret: es Secret Key que se generó al crear la
    source:https://developers.mercadolibre.com.ar/es_ar/autenticacion-y-autorizacion
    */
exports.getAccessTokenByRefreshToken = async (req, res) => {
    
    //get token by refresh token
    console.log("getAccessTokenByRefreshToken - inicio")
    let user = req.headers['user']
    let pass = req.headers['pass']
    let data = 'Error'
    
    if(user === USER_TOKEN && pass === PASS_TOKEN){
        data = await authMLServices.getAccessTokenByRefreshToken()
    }
    

    console.log("getAccessTokenByRefreshToken - inicio")
    res.send({token:data})
    
}

