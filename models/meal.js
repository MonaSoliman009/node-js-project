var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var meals = new Schema({
  name: {
    type: String,
    required: [true, "each meal must have a name"],
    trim: true,
    unique: true,
    minlength: [3, "meal must have more than one character "]
  },
  description: String,
  price: Number,
  img: String
});
mongoose.model("meals", meals);