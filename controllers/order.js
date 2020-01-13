var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require("body-parser");
var router = express.Router()
var parseUrlencoded = bodyParser.urlencoded({
    extended: true
});
router.get('/order/list', function (req, resp) {
    resp.render('order/list.ejs')
})

router.get('/add', function (req, resp) {
    resp.render('meal.ejs')
})



router.get('/list', function (req, resp) {

    mongoose.model("orders").find(function (err, data) {
        resp.render('order/list.ejs', {
            "orders_data": data
        })
    });
})

router.post('/list', parseUrlencoded, function (req, resp) {

    var orderModel = mongoose.model("orders")
    var new_order = new orderModel()
    new_order.note = req.body.note;
    new_order.time = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    new_order.meals = req.body.mealsid

    new_order.save({
        $push: {
            "meals": req.body.mealsid
        }
    }, function (err, data) {

        console.log(err)
    })

    mongoose.model("orders").find(function (err, data) {

        mongoose.model("orders").populate(data, {
            path: "meals"
        })

        resp.render('order/list.ejs', {
            "orders_data": data
        })
    })
})


router.get('/details/:id', function (req, resp) {
    mongoose.model("orders").findOne({
        _id: req.params.id
    }).populate('meals').exec(function (err, orders) {
        resp.render('order/details.ejs', {
            "order_details": orders
        })
    })

})
router.get('/details/meal', function (req, resp) {

    resp.render('order/details.ejs')
})


module.exports = router;