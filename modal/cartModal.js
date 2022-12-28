const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId
    },
    totalPrice:{
        type:String
    },
    qty:{
        type:String
    },
    userId:{
        type:String
    }

}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);