const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {responseError,responseSuccess} = require("../helper/Status");

exports.login = (req,res) =>{
     const {email,password} = req.body;
     console.log(req.body);
     User.findOne({email:email})
         .exec(async(err,data)=>{

         	if(err){
         		return responseError(res,201,4);
         	}
         	if(data){
         		const checkPassword = await data.authenticate(password); 

         		if(checkPassword && (data.role==="Admin" || data.role==="User")){
         			const token = jwt.sign({_id:data._id,role:data.role},process.env.port,{expiresIn:"1d"})
    			    res.cookie("token",token,{expiresIn:"1d"})
                    const {_id,fname,lname,email,username,role,fullname} = data;
    			    const userDetail = {token,user:{_id,fname,lname,email,username,role}};
    			    return responseSuccess(res,200,userDetail);
         		}else{
         			return responseError(res,201,16)
         		}
         	}else{ 
               return responseError(res,201,10);
         	}
         })
}



exports.reg=(req,res)=>{
	const {fname,lname,username,email,password,role,otp} = req.body;

    User.findOne({email:email}).exec(async(err,data)=>{
    	
    	if(data){
    		return responseError(res,201,14);
    	}
    	const hashPassword =  await bcrypt.hash(password,10);
        const otp = Math.floor(100000+Math.random()*900000);
    	const userData =new User({
    		fname,lname,username,email,hashPassword,role,otp
    	});
        
    	userData.save((err,dt)=>{
            
    		if(err){
                console.log(err);
    			return responseError(res,201,4);
    		}
    		if(dt){     		
                const token = jwt.sign({_id:dt._id,role:dt.role},process.env.port,{expiresIn:"1d"})
    			res.cookie("token",token,{expiresIn:"1d"})
                const {_id,fname,lname,email,username,role,fullname} = dt;
    			const userDetail = {token,user:{_id,fname,lname,email,username,role}}; 
    			return responseSuccess(res,200,userDetail);
    		}
    	})

    })
}