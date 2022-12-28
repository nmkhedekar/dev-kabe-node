const mongoose = require("mongoose");
const faqModal = require("../modal/faqModal");
const Faq = require("../modal/faqModal");
const VendorDescriptionModel = require("../modal/vendorDescriptionModal");

exports.FaqReg=(req,res)=>{
    const {faqlist}=req.body;
    const faqobj = Faq({faqlist})

    faqModal.remove({}, (err,dt)=>{
            
        if(err){
            console.log(err);
            return res.status(201).json({msg:err});
        }
        if(dt){     		
            faqobj.save((errx,dtx)=>{
            
                if(errx){
                    console.log(errx);
                    return res.status(201).json({msg:errx});
                }
                if(dtx){     		
                    return res.status(200).json(dtx);
                }
            })
        }
    })
}

exports.FaqGet=(req,res)=>{
    Faq.find({},(err, dt)=>{
        if(err){
            console.log(err);
            return res.status(201).json({msg:err});
        }
        if(dt){     		
            return res.status(200).json(dt);
        }
    })
}

exports.FilterProducts=(req,res)=>{
    console.log(req.body)
    const{sort, gender, categories, subcategories, brands, sizes, colors, price}=req.body
    console.log(price)
    var categoryId = gender.concat(".", categories, ".", subcategories);
    VendorDescriptionModel.find({
        "catId" : categoryId,        
        // "regular_price" : { $lte: price, $gt: 0 },    
        "vendor" : { $in: [brands] }    
    },(err, dt)=>{
        if(err){
            console.log(err);
            return res.status(201).json({msg:err});
        }
        if(dt){ 
            console.log(dt)    		
            return res.status(200).json(dt);
        }
    }).sort({'regular_price': 1})
}
