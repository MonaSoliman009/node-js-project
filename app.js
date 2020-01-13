var express = require("express");
var mongoose = require("mongoose");
var http = require('http');



var bodyparser = require("body-parser");
var fs = require("fs");
var router = express.Router();
var resappcontroller = require("./controllers/resapp");
var ordercontroller = require("./controllers/order");
var mealcontroller = require("./controllers/meal");

var app = express();
app.use(express.static("public"));

app.use("/", resappcontroller);
app.use("/login/order", ordercontroller);
app.use("/login/meal", mealcontroller);
app.use(function (req, resp, next) {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.all("*", (req, resp, next) => {
  resp.status(404).send("cant find this url");
});
app.set("viewengine", "ejs");
app.set("views", "./views");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/project");

mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

var files_arr = fs.readdirSync(__dirname + "/models");
files_arr.forEach(function (file) {
  require(__dirname + "/models/" + file);
});


app.listen(8080, function () {
  console.log("server created");
});