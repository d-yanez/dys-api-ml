const express = require("express")
const controller = require("../controllers/stock")
const router = express.Router()

const path = 'stock'

router.post(
    `/${path}`,
    controller.saveData
)
router.get(
    `/${path}`,
    controller.getData
)

module.exports = router