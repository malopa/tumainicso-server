const mongoose = require("mongoose");

const UserSchema  =new mongoose.Schema({
    username:{type:String,requred:true},
    password:{type:String,requred:true},
})

module.exports = mongoose.model("User",UserSchema);