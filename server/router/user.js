const express = require("express")
const router = express.Router();
const user = require("../controller/user")

router.route('/register')
    .post(user.registerUser)

router.route('/login')
    .post(user.loginUser)

module.exports = router;