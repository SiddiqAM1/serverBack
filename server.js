const express = require("express")
const { default: mongoose } = require("mongoose")
const fs = require("fs")
const path = require("path")
const https = require("https")
const areaRouter = require("./apis/area/area")
const cors = require("cors")
const cloudinary = require("cloudinary").v2
const mailRoute = require("./apis/area/mail/mailRoute")
const authRoutes = require("./apis/login/login")
mongoose.connect("mongodb+srv://sadiq:benu1786@cluster0.6g2zjey.mongodb.net/cms?retryWrites=true&w=majority")
  .then(() => console.log("connected"))
  .catch(err => console.log(err))

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api", areaRouter)
app.use("/api", mailRoute)
app.use("/api/auth", authRoutes)

cloudinary.config({ 
    cloud_name: 'dtc2xqhba', 
    api_key: '768797555162593', 
    api_secret: '_O9OqOXmc1vp0QChNi9MGJsolag',
    secure: true
})
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/uploader.eposrealty.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/uploader.eposrealty.com/fullchain.pem')
}

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS server running on port 443")
})



