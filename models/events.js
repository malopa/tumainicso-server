const mongoose = require("mongoose");

const EventSchema= new mongoose.Schema({
    description:{type:String,required:true},
    image:{type:String,required:true},
},{
    timestamps: true
  })

module.exports = mongoose.model("Events",EventSchema);