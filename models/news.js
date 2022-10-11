const mongoose  = require("mongoose");

const newsSchema = new mongoose.Schema({

    title:{type:String,required:true},
    content:{type:String,required:true},
    pdf_url:{type:String,}
    
},{
    timestamps: true
  })

module.exports = mongoose.model("news",newsSchema);