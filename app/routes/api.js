const express = require("express")
const controller = require("../controllers/api")
const router = express.Router()

const path = 'api'

router.get(
    `/${path}`,
    controller.getData
)

module.exports = router