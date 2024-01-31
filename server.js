const express= require("express")
const { default: mongoose, deleteModel } = require("mongoose")

const fs =require("fs")
const path = require("path")
const areaRouter=require("./apis/area/area")
const cors = require("cors")
const cloudinary = require("cloudinary").v2;
const mailRoute = require("./apis/area/mail/mailRoute")

const sendMail = require("./apis/area/middleware/mail")
const Area = require("./database/areaSchema")

mongoose.connect("mongodb+srv://sadiq:benu1786@cluster0.6g2zjey.mongodb.net/cms?retryWrites=true&w=majority").then(()=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err)
})


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api",areaRouter)
app.use("/api",mailRoute)

cloudinary.config({ 
    cloud_name: 'dtc2xqhba', 
    api_key: '768797555162593', 
    api_secret: '_O9OqOXmc1vp0QChNi9MGJsolag',
    secure: true
  });


app.get("/",async(req,res)=>{
    

   res.send("<h1>Hello World</h1>")
    
})


app.listen(4000,()=>{
    console.log("running")
})


