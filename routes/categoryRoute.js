var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Category = require("../modal/categoryModal");
var Coupon = require("../modal/couponModal");
var slugify = require("slugify");
var CMS = require("../modal/cmsModal")
var Coupon = require("../modal/couponModal")
const vendorDescriptionModel = require("../modal/vendorDescriptionModal");
const descriptionModal = require("../modal/descriptionModal");
const checkoutModal = require("../modal/checkoutModal");
const notesModal = require("../modal/notesModel");
const User = require("../modal/userModal");
const vatModal = require("../modal/vatModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const general = require("../modal/generalModal");


const multer  = require('multer')
const picPath = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, picPath.join(picPath.dirname(__dirname), "categoryIcon"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });




function createCategories(categories,parentId=null){
  const categoryList = [];
  var category; 

  if(parentId == null){
    category = categories.filter(cat=>cat.parentId==undefined);
    console.log(category)
  }else{
    category = categories.filter(cat=>cat.parentId==parentId)
  }

  for(let cate of category){ 
       categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        unqId:cate.unqId,
        genderBased:cate.genderBased,
        categoryIcon:cate.categoryIcon,
        children:createCategories(categories,cate._id)
       })
  }

  return categoryList;


}


router.post('/addcategory',upload.single("categoryIcon"), function(req, res, next) {
  const {parentId,name,unqId,genderBased} = req.body;
    // const {name,parentId} = req.body;
    const categoryIcon=req.file.filename
    const categoryObj={
      name:name,
      slug:slugify(name),
      unqId:unqId,
      genderBased:genderBased,
      categoryIcon:"https://appapi.albionline.com/cicon/"+categoryIcon
     }
     if(parentId){
      categoryObj.parentId = parentId
     }  
     const cat = new Category(categoryObj);
     cat.save((err,data)=>{
      console.log(err)
      if(err){return res.status(201).json(err)}
      if(data){return res.status(200).json(data)}
     })
});

router.post("/getcategory",(req,res)=>{
  const {genderBased} = req.body;
  console.log(req.body)
  Category.find({genderBased:genderBased}).exec((err,categories)=>{
    if(err){return res.status(201).json(err)}
    if(categories){
      console.log(categories)
      const categoryList = createCategories(categories);
     return res.status(200).json({categoryList})
    }
  })
})
router.get("/getcategories",(req,res)=>{ 
  Category.find({}).exec((err,categories)=>{
    if(err){return res.status(201).json(err)}
    if(categories){ 
      const categoryList = createCategories(categories);
     return res.status(200).json({categoryList})
    }
  })
})


router.post("/deletecategory",async(req,res)=>{
     const { ids } = req.body;
     if(ids!=undefined){
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    console.log(ids[i])
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }}
})

// router.post("/addcms",(req,res)=>{
//   console.log(req.body)
//   const {pageTitle,slugTitle,editorData} = req.body;

//   const cmsObj=CMS({
//     pageTitle,slugTitle,pageContent:editorData
//   });
  
//   cmsObj.save((err,data)=>{
//     if(err){return res.status(201).json(err)}
//     if(data){return res.status(200).json(data)}  
//   })

// })

router.post("/addcms",(req,res)=>{
  console.log(req.body)
  const {pageTitle,slugTitle,editorData} = req.body;

  const cmsObj=CMS({
    pageTitle,slugTitle,pageContent:editorData
  });
  console.log("---req.body.slugTitle---------", req.body.slugTitle);
    CMS.findOne({slugTitle:req.body.slugTitle})
    .then(resfind => {
        // res.send(res);
        if(resfind != null){
          console.log("--------req.body.slugTitle0", resfind);
          return res.send({mesage:`Slug alreday exit`})
        }
        else {
            cmsObj.save()
            .then((data)=>{
              console.log("--------save", data);
              return res.send({mesage:`Saved`})               
              }).catch(err=>{
    
              })
          }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
})

router.post("/getcms",(req,res)=>{
    CMS.find({},(err,data)=>{
    if(err){return res.status(201).json(err)}
    if(data){return res.status(200).json(data)}  
  })
})



router.post("/deletecms",(req,res)=>{
  const {id} = req.body;
  CMS.findOneAndDelete({_id:id},(err,data)=>{
    if(err){
      return res.status(201).json(err)
    }
    if(data){
      return res.status(200).json(data);
    }
  })
})

router.post("/updatecms",(req,res)=>{
  const {id,pageTitle,editorData,slugTitle} = req.body;
  CMS.findOneAndUpdate({_id:id},{pageTitle:pageTitle,slugTitle:slugTitle,pageContent:editorData},(err,data)=>{
    if(err){
      return res.status(201).json(err)
    }
    if(data){
      return res.status(200).json(data);
    }
  })
})

router.post("/addcoupon",(req,res)=>{
  console.log(req.body)
  const {couponCode,
couponDescription,
couponType,
couponUsage,
couponExpire,
indivisualUse,
excludeUse,
productList,
couponPrice} = req.body;

  Coupon.findOne({couponCode:couponCode},(errCou,dataCou)=>{
    if(dataCou){
      return res.status(201).json({msg:"Coupon Code already exists"});
    }else{

  const couponObj=Coupon({
    couponCode,
couponDescription,
couponType,
couponUsage,
couponExpire,
indivisualUse,
excludeUse,
productList,
  })

  couponObj.save((err,data)=>{
    if(err){
      return res.status(201).json(err)
    }
    if(data){
      return res.status(200).json(data);
    }
  })
}
  })
  
})

router.post("/getcoupon",(req,res)=>{
    Coupon.find({},(err,data)=>{
    if(err){return res.status(201).json(err)}
    if(data){return res.status(200).json(data)}  
 

})
  })

router.post("/deletecoupon",(req,res)=>{
  const {id} = req.body;
  Coupon.findOneAndDelete({_id:id},(err,data)=>{
    if(err){
      return res.status(201).json(err)
    }
    if(data){
      return res.status(200).json(data);
    }
  })
})

router.post("/editcoupon",(req,res)=>{
  const {couponId,couponCode,couponDescription,couponType,couponUsage,couponExpire} = req.body;
  Coupon.findOneAndUpdate({_id:couponId},{couponCode:couponCode,couponDescription:couponDescription,couponType:couponType,couponUsage:couponUsage,couponExpire:couponExpire},(err,data)=>{
    if(err){
      return res.status(201).json(err)
    }
    if(data){
      return res.status(200).json(data);
    }
  })
})


router.post("/getallproductadmin",(req,res)=>{
  vendorDescriptionModel.find({},(err,data)=>{
    if(err){res.status(201).json(err)}
    if(data){res.status(200).json(data)}
  })
})

router.post("/getFilter",(req,res)=>{
  const {id,catId} = req.body; 
  vendorDescriptionModel.find({catId:catId },(err,data)=>{
    if(err){return res.status(201).json(err)}
      if(data){return res.status(200).json(data)}
  })
})


router.post("/getvariant",(req,res)=>{
  const {itemId} = req.body;
   vendorDescriptionModel.find({item_code:{'$regex': itemId}},(err,data)=>{
    if(err){return res.status(201).json(err)}
      if(data){return res.status(200).json(data)}
  })
});

router.post("/checkout",(req,res,next)=>{
    console.log(req.body)
  const {fname,lname,email,confermPassword,address,city,phoneNumber,anyComment,paymentMethod,productList} = req.body.data;
  var userAuth;

  User.findOne({email:email}).exec(async(err,data)=>{
      
      if(data){
          // return res.status(201).json(err);
            const orderIdGen = Math.floor(1000000000+Math.random()*9000000000);
    const orderId="OD"+orderIdGen;
    console.log(orderId)

  const checkOutObj= new checkoutModal({
    fname,lname,email,address,city,phoneNumber,anyComment,paymentMethod,productList,orderId
  });

  checkOutObj.save((err,datax)=>{
    if(err){return res.status(201).json({msg:err})} 
    if(datax){
        return datax;
      }
  })
      }
      const hashPassword =  await bcrypt?.hash(confermPassword,10);
        const role = "Buyer";
        const otp = Math.floor(100000+Math.random()*900000);
      
      const userData =new User({
        fname,lname,email,hashPassword,role,otp
      });
        
      userData.save((err,dt)=>{
            
        if(err){
                console.log(err);
          return res.status(201).json(err);
        }
        if(dt){         
                const token = jwt.sign({_id:dt._id,role:dt.role},process.env.port,{expiresIn:"1d"})
          // res.cookie("token",token,{expiresIn:"1d"})
                const {_id,fname,lname,email,username,role} = dt;
          const userDetail = {token,user:{_id,fname,lname,email,username,role}}; 
          userAuth=userDetail
           const orderIdGen = Math.floor(1000000000+Math.random()*9000000000);
    const orderId="OD"+orderIdGen;
    console.log(orderId)

  const checkOutObj= new checkoutModal({
    fname,lname,email,address,city,phoneNumber,anyComment,paymentMethod,productList,orderId
  });

  checkOutObj.save((erx,datax)=>{
    if(erx){return res.status(201).json({msg:erx})} 
    if(datax){ 
        return datax;
      }
  })
        }
      })



    })
  


})


router.post("/getcheckout",(req,res)=>{
    checkoutModal.find({},(err,data)=>{ 
    if(err){return res.status(201).json({msg:err})}
      if(data){
        return res.status(200).json(data);
      }
  })
  })

router.post("/getorderslist",(req,res)=>{
    const {id} = req.body;
    checkoutModal.find({_id:id},(err,data)=>{ 
    if(err){return res.status(201).json({msg:err})}
      if(data){
        return res.status(200).json(data);
      }
  })
  })


router.post("/updateorder",(req,res)=>{
    const {id,statusValue} = req.body;
    checkoutModal.update({_id:id},{status:statusValue},(err,data)=>{ 
    if(err){return res.status(201).json({msg:err})}
      if(data){
        return res.status(200).json(data);
      }
  })
  })

router.post("/sendnotes",(req,res)=>{
    const {orderId,notes} = req.body;
    const notesObj= new notesModal({
    orderId,notes
  });

  notesObj.save((erx,datax)=>{
    if(erx){return res.status(201).json({msg:erx})} 
    if(datax){ 
       return res.status(200).json(datax)
      }
  })
  })


router.post("/getnotes",(req,res)=>{ 
  notesModal.find({},(erx,datax)=>{
    if(erx){return res.status(201).json({msg:erx})} 
    if(datax){ 
        return res.status(200).json(datax);
      }
  }).sort( { createdAt: -1 } )
  })

router.post("/name",(req,res)=>{ 
  notesModal.find({},(erx,datax)=>{
    if(erx){return res.status(201).json({msg:erx})} 
    if(datax){ 
        return res.status(200).json(datax);
      }
  })
  })


router.post("/vatupdate",(req,res)=>{
       const {vatData} = req.body
       // const vatModalObj = vatModal({
       //  vatData
       // })

       // vatModalObj.save((err,data)=>{
       //  if(err){return res.status(201).json(err)}
       //  if(data){return res.status(200).json(data)}  
       // })

       vatModal.update({},{vatData:vatData},(err,data)=>{
        if(err){return res.status(201).json(err)}
        if(data){return res.status(200).json(data)}  
       })
  })

router.post("/getvatupdate",(req,res)=>{
       const {vatData} = req.body

       vatModal.find({},(err,data)=>{
        if(err){return res.status(201).json(err)}
        if(data){return res.status(200).json(data)}  
       })
  })

router.post("/getinvoice",(req,res)=>{
       const {id} = req.body
       const idd = mongoose.Types.ObjectId(id);

       // checkoutModal.find({orderId:orderId},(err,data)=>{
       //  if(err){return res.status(201).json(err)}
       //  if(data){return res.status(200).json(data)}  
       // })

 const invoice=checkoutModal.aggregate([
       
        {$match : {_id : idd}}, // use dynamic email
       { $lookup: {
          from: "vats", //mongodb collectionName
          localField: "paymentMethod", //vendroStocks collectionId
          foreignField: "paymentType", //join(vendorDescriptionModel) Model id
          as: "invoice", //outpu values after joining
         },
       },
     // { $project: {"stocks.email":false} },
     {$unwind: "$invoice"},
  ]);
  invoice.exec((err,data)=>{
        if(err){
            return res.status(201).json(err);
        }
        if(data.length>0){
            return res.status(200).json(data);
        }else{

            return res.status(200).json({msg:"Data not found"});
        }
    });



  })


  // router.post("/general",(req,res)=>{

  //   console.log("-----req.body-----------", req.body);

  //   const {allData}= req.body;

  //   console.log("-----allData-----------", allData);
  //   const generalObj = general({
  //     allData
  //   })
  //   generalObj.save((err,data)=>{
  //     if(err){return res.status(201).json(err)}
  //     if(data){return res.status(200).json(data)}
  //   })
    
  // })

  router.post("/general",(req,res)=>{

    console.log("-----req.body-----------", req.body);

    const {allData}= req.body;

    console.log("-----allData-----------", allData);
    const generalObj = general({
      allData
    })
    /*
    generalObj.save((err,data)=>{
      if(err){return res.status(201).json(err)}
      if(data){return res.status(200).json(data)}
    })*/

    general.remove({}, (err,allData)=>{
            
      if(err){
          console.log(err);
          return res.status(201).json({msg:err});
      }
      if(allData){ 
          generalObj.save((err,data)=>{
            if(err){return res.status(201).json(err)}
            if(data){return res.status(200).json(data)}
          })
      }
  })
  })


  // router.post("/generalGet",(req,res)=>{
  //   general.find({},(err, dt)=>{
  //     if(err){
  //         console.log(err);
  //         return res.status(201).json({msg:err});
  //     }
  //     if(dt){     		
  //         return res.status(200).json(dt);
  //     }
  //   })
  // })

  router.post("/general",(req,res)=>{

    console.log("-----req.body-----------", req.body);

    const {allData}= req.body;

    console.log("-----allData-----------", allData);
    const generalObj = general({
      allData
    })
    /*
    generalObj.save((err,data)=>{
      if(err){return res.status(201).json(err)}
      if(data){return res.status(200).json(data)}
    })*/

    general.remove({}, (err,allData)=>{
            
      if(err){
          console.log(err);
          return res.status(201).json({msg:err});
      }
      if(allData){ 
          generalObj.save((err,data)=>{
            if(err){return res.status(201).json(err)}
            if(data){return res.status(200).json(data)}
          })
      }
  })
  })


  router.post("/generalGet",(req,res)=>{
    general.find({},(err, dt)=>{
      if(err){
          console.log(err);
          return res.status(201).json({msg:err});
      }
      if(dt){     		
          return res.status(200).json(dt);
      }
    })
  })



module.exports = router;
