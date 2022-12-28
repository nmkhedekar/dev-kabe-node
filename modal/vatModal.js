const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({

  vatData:{
    type:String
  },
  paymentType:{
    type:String,
    default:"cod"
  }

},{timestamps:true})
 

 

module.exports = mongoose.model("vat",userSchema);