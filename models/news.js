const mongoose  = require("mongoose");

const newsSchema = new mongoose.Schema({
    content:{type:String,required:true},
    
},{
    timestamps: true
  })

module.exports = mongoose.model("news",newsSchema);