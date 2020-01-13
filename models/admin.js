var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var admins = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});
mongoose.model("admins", admins);