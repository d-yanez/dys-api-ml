
const mail = require('../utils/mail')
const {API_ML_CLIENT_ID} = process.env

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
