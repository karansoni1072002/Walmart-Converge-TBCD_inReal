const express = require("express")
const router = express.Router();

router.route('/register')
    .post((req, res) => {
        console.log(req.body);
    })

router.route('/login')
    .post((req, res) => {
        console.log(req.body);
    })

module.exports = router;