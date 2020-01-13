var express = require('express')
var bodyParser = require("body-parser");
var mongoose = require('mongoose')
var router = express.Router()
var parseUrlencoded = bodyParser.urlencoded({
    extended: true
})


router.get('', function (req, resp) {


    resp.render('login.ejs')


})

router.post('/login/admin', parseUrlencoded, function (req, resp) {
    mongoose.model("admins").find({
            "email": req.body.email,
            "password": req.body.password
        },
        function (err, data) {
            if (data.length == 0) {
                resp.redirect('/')
            } else {
                mongoose.model("meals").find(function (err, data) {
                    resp.render('home/resturantapp.ejs', {
                        "meals_data": data
                    })
                });

            }
        })



})
router.get('/login/home', function (req, resp) {


    mongoose.model("meals").find(function (err, data) {
        resp.render('home/resturantapp.ejs', {
            "meals_data": data
        })
    });

})



module.exports = router;