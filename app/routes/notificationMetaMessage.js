const express = require("express")
const controller = require("../controllers/messageMeta")
const router = express.Router()

const path = 'meta'


router.post(
    `/${path}/message/:sku`,
    controller.notification
)
module.exports = router