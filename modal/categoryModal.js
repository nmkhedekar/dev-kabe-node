const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const categorySchema = new mongoose.Schema({

  name:{
    type:String,
    trim:true
  },
  slug:{
    type:String,
    unique:true,
    trim:true
  },
  parentId:{
    type:String,
    trim:true
  },
  unqId:{
    type:String
  },
  genderBased:{
    type:String
  },
  categoryIcon:{
    type:String
  }

});
 
module.exports = mongoose.model("category",categorySchema);