const express = require("express")
const controller = require("../controllers/authML")
const router = express.Router()

const path = 'ml'

router.get(
    `/${path}/uriredirect`,
    controller.mlUriRedirect
)
module.exports = router