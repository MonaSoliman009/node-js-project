var mongoose = require("mongoose")
var Schema = mongoose.Schema
var orders = new Schema({
    note: String,
    time: Date,

    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "meals",
        required: true
    }]
})
mongoose.model("orders", orders)