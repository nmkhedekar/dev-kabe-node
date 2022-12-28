const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    orderId:{
        type:String
    },
    notes:{
        type:String
    }

}, { timestamps: true });


module.exports = mongoose.model('note', cartSchema);