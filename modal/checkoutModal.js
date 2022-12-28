const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    orderId:{
        type:String
    },
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    anyComment:{
        type:String
    },
    paymentMethod:{
        type:String
    },
    productList:{
        type:Array
    },
    status:{
        type:String
    }

}, { timestamps: true });


module.exports = mongoose.model('order', checkoutSchema);