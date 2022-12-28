const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const generalSchema = new mongoose.Schema({



 allData:{
    type:Array
  }
},{timestamps:true})





module.exports = mongoose.model("general",generalSchema);