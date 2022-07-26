const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    fullname:String,
    email:String,
    age:Number,
});


module.exports = mongoose.model("users",userSchema);