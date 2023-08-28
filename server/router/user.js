const express = require("express")
const router = express.Router();
const user = require("../controller/user")
const barcode = require("../public/javascipt/barcode")

router.route('/home')
    .get(function (req, res) {
        console.log('Inside Home Login');
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        console.log('Books : ', JSON.stringify(books));
        res.end(JSON.stringify(books));
    });

router.route('/register')
    .post(user.registerUser)

router.route('/login')
    .post(user.loginUser)

router.route('/scanproduct')
    .get((req, res) => { res.render("../views/barcodescanner.ejs") })

router.route('/getproductdata')
    .post((req, res) => {

        console.log(req.body);
    })



module.exports = router;