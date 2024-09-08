const express = require("express")
const controller = require("../controllers/topic")
const router = express.Router()

const path = 'topic'


router.post(
    `/${path}/pubsub`,
    controller.notification
)
module.exports = router