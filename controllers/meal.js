var express = require('express')
var bodyParser = require("body-parser");
var router = express.Router()
var mongoose = require("mongoose")
mongoose.Promise = global.Promise;


router.get('/add', function (req, resp) {
    resp.render('meal.ejs')
})
router.get('/home', function (req, resp) {
    resp.render("home/resturantapp.ejs")
})



var parseUrlencoded = bodyParser.urlencoded({
    extended: true
})

router.post('/add/detail', parseUrlencoded, function (req, resp) {
    var mealModel = mongoose.model("meals")
    var new_meal = new mealModel()
    new_meal.name = req.body.name;
    new_meal.description = req.body.description;
    new_meal.price = req.body.price;
    new_meal.img = req.body.img;


    new_meal.save(function (err, data) {


    })
    resp.redirect("/login/home")


})


router.get('/order/list', function (req, resp) {
    resp.send('go for order list from nav bar please')
})




module.exports = router;