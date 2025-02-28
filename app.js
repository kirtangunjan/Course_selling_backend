const express=require('express');
const mongoose=require('mongoose')
require('dotenv').config()


const jwt=require('jsonwebtoken');
const {userRouter}=require("./Routes/users")
const {courseRouter}=require("./Routes/course")
const {adminRouter}=require("./Routes/admin")
const app=express();
//middlewares
app.use(express.json());


//user-router
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter)


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
}
main()
