const jwt=require('jsonwebtoken')
const {JWT_USER_SECRET}=require("../config");

function usermiddelware(req,res,next){
    const token=req.headers.token;
    const decodedata=jwt.verify(token,JWT_USER_SECRET);
    if(decodedata){
        req.userId=decodedata.id 
        next()
    }else{
        res.status(403).json({
            message:"you are not sign-in"
        })
    }

}

module.exports={
    usermiddelware:usermiddelware
}