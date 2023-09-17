const express = require("express")
const controller = require("../controllers/authML")
const router = express.Router()

const path = 'ml'

router.get(
    `/${path}/uriredirect`,
    controller.mlUriRedirect
)
//get access token + refresh token by grant_type=acess_token (1st time) asincrono!!!
router.post(
    `/${path}/token`,
    controller.getAccessTokenAsync
)
//get access token + refresh token by grant_type=acess_token (post time)
router.post(
    `/${path}/auth/token`,
    controller.getAccessTokenByRefreshToken
)
module.exports = router