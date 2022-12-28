const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const vendorStockSchema = new mongoose.Schema({
  email:{
    type:String
  },
  role:{
    type:String
  },
  item_code:{
    type:String
  },
  // foto:{
  //   type:String
  // },
  // LNK:{
  //   type:String
  // },
  // LNK2:{
  //   type:String
  // },
  // FOTO1:{
  //   type:String
  // },
  // FOTO2:{
  //   type:String
  // },
  // FOTO3:{
  //   type:String
  // },
  // FOTO4:{
  //   type:String
  // },
  // ITEM:{
  //   type:String
  // },
  // FULCODE:{
  //   type:String
  // },
  // CAR:{
  //   type:String
  // },
  // VLO :{
  //   type:String
  // },
  pic:{
    type:Array
  },
// new modal Schema #############
  
  variant:{
    type:String
  },     
  variant_desctiption:{
    type:String
  },     
  variant_order:{
    type:String
  },    
  vendor:{
    type:String
  },     
  stock_quantity:{
    type:String
  }  
},{timestamps:true})
 

 

module.exports = mongoose.model("vendorstock",vendorStockSchema);