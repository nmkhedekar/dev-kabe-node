const mongoose = require("mongoose"); 
const vendorDescriptionModal= require("../modal/vendorDescriptionModal");

exports.getFilterProduct=async(req,res)=>{ 
 

const articles = await vendorDescriptionModal.find({
    'vendordescriptions': {
        $elemMatch: {
            "collectionn": "FW22",
        }
    }
});
return res.status(200).json(articles)
}



exports.getFilterProduct=async(req,res)=>{ 
const articles = await vendorDescriptionModal.find({
    'vendordescriptions': {
        $elemMatch: {
            "collectionn": "FW22",
        }
    }
});
return res.status(200).json(articles)
}

