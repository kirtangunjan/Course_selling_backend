const {Router}=require("express");
const userRouter=Router();
const {userModel, purchaseModel}=require("../Model/db");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const {JWT_USER_SECRET}=require("../config")

userRouter.post('/sign-up',async(req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    const hashedpassword=await bcrypt.hash(password,10);

    await userModel.create({
        email,
        password:hashedpassword,
        firstname,
        lastname,
    })

    res.json({
        message:'signup succeeded'
    })
});

userRouter.post('/sign-in',async (req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email});
    if(!user){
        res.json({
            message:"user not found"
        })

    }
    const matchedpassword=await bcrypt.compare(password,user.password)
    if(matchedpassword){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_USER_SECRET);
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"credentials are wrong"
        })
    }
    
});



userRouter.get('/purchases',async(req,res)=>{
    const userId=req.userId
    const purchases=await purchaseModel.find({
        userId
    }).populate()
    res.json({
        purchases
    })
})



module.exports={
    userRouter:userRouter
}