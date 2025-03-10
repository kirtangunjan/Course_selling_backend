const {Router}=require("express");
const adminRouter=Router()


const {adminModel, courseModel}=require("../Model/db");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const {ADMIN_SECRET_KEY}=require("../config")
const {adminmiddleware}=require("../middleware/authadmin");
const course = require("./course");

adminRouter.post('/sign-up',async(req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    const hasedpassword=await bcrypt.hash(password,10);

    await adminModel.create({
        email,
        password:hasedpassword,
        firstname,
        lastname,
    })

    res.json({
        message:'signup succeeded'
    })
});

adminRouter.post('/sign-in',async(req,res)=>{
    const {email,password}=req.body
    const admin=await adminModel.findOne({email});
    if(!admin){
        res.json({
            message:"user not found"
        })

    }
    const matchedpassword=await bcrypt.compare(password,admin.password)
    if(matchedpassword){
        const token=jwt.sign({
            id:admin._id.toString()
        },ADMIN_SECRET_KEY);
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"credentials are wrong"
        })
    }
});

adminRouter.post("/create-course",adminmiddleware,async (req,res)=>{
    const adminId=req.adminId;
    const {title,description,imageUrl,price}=req.body;


    const course=await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        createrId:adminId
    });
    

    res.json({
        message:'course created',
        courseId:course._id
    })

})

adminRouter.put("/course-update",adminmiddleware,async(req,res)=>{
    const adminId=req.adminId;
    const {title,description,imageUrl,price,courseId}=req.body;
    const course=await courseModel.updateOne({
        _id:courseId,
        createrId:adminId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    },{
        new:true
    })
    res.json({
        message:"course updated",
        courseId:course._id
    })

})
adminRouter.get("/course-available",adminmiddleware,async (req,res)=>{
    const adminId=req.adminId
    const courses=await courseModel.find({
        createrId:adminId
    })
    
    res.json({
        message:"courses",
        courses
    })
})



module.exports={
    adminRouter:adminRouter
}