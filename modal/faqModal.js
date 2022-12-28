const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    // title:{
    //     type:String
    // },
    // description:{
    //     type:String
    // }
    faqlist: {
        type: Array
    }

}, { timestamps: true });


module.exports = mongoose.model('faq', faqSchema);