const express=require("express")
const sendMail = require("../middleware/mail")



const router = express.Router()

router.post("/mail",sendMail)


module.exports=router