const mongoose = require("mongoose");
const adminImageSchema = new mongoose.Schema({

  adminEmail:{
    type:String
  }, 
  adminImage:{
    type:Array
  }, 

},{timestamps:true})
 

 

module.exports = mongoose.model("adminimage", adminImageSchema);