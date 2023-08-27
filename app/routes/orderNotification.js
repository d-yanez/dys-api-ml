const express = require("express")
const controller = require("../controllers/orderNotification")
const router = express.Router()

const path = 'callback'

router.post(
    `/${path}`,
    controller.notification
)
router.get(
    `/${path}/auth`,
    controller.authRedirect
)
module.exports = router