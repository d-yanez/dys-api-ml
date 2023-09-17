const express = require("express")
const controller = require("../controllers/orderApiML")
const router = express.Router()

const path = 'orders'

router.get(
    `/${path}/:orderNumber`,
    controller.getOrderInfo
)
module.exports = router