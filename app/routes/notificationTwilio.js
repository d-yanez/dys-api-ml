const express = require("express")
const controller = require("../controllers/notificationTwilio")
const router = express.Router()

const path = 'twilio'


router.post(
    `/${path}/message`,
    controller.notification
)
module.exports = router