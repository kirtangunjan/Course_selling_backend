const {Router}=require("express")
const courseRouter=Router()
const {purchaseModel, courseModel}=require("../Model/db")
const { usermiddelware } = require("../middleware/authuser")

courseRouter.post('/purchase',usermiddelware,async (req,res)=>{
    const userId=req.userId
    const courseId=req.body.courseId
    
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message:'you are succesfully bougth'
    })

})

courseRouter.get('/previewcourse',async(req,res)=>{
    const courses=await courseModel.find({})
    res.json({
        courses
    })
})


module.exports={
    courseRouter:courseRouter
}