const jwt=require('jsonwebtoken')
const {ADMIN_SECRET_KEY}=require("../config");

function adminmiddleware(req,res,next){
    const token=req.headers.token;
    const decodedata=jwt.verify(token,ADMIN_SECRET_KEY);
    if(decodedata){
        req.adminId=decodedata.id 
        next()
    }else{
        res.status(403).json({
            message:"you are not sign-in"
        })
    }

}

module.exports={
    adminmiddleware:adminmiddleware
}