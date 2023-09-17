const orderApiServices = require('../services/orderApi')

//WIP
exports.getOrderInfo = async (req, res) => {
    //get order number from param
    //get token by refresh token
    //ger orden info from ML by Authorization (token)
    //send info order by response

    let orderNumber = req.params['orderNumber'] 
    console.log(`[getOrderInfo] orderNumber ->${orderNumber}`)
    let resp = orderApiServices.getOrderInfo(orderNumber)

    res.send(resp)
}