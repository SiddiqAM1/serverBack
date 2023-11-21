const express= require("express")
const { default: mongoose, deleteModel } = require("mongoose")
const Area=require('./database/areaSchema')
const fs =require("fs")
const path = require("path")
const areaRouter=require("./apis/area/area")
const cors = require("cors")
const cloudinary = require("cloudinary").v2;
const mailRoute = require("./apis/area/mail/mailRoute")

const sendMail = require("./apis/area/middleware/mail")

mongoose.connect("mongodb+srv://sadiq:benu1786@cluster0.6g2zjey.mongodb.net/cms?retryWrites=true&w=majority").then(()=>{
    console.log("connected")
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
    // const image= await Popular.findOne({ 'Image.name': 'handsome' })
    // const base64Image = image.Image.data.toString('base64');
    // const contentType = image.Image.contentType;
    // const imageUrl = `data:${contentType};base64,${base64Image}`;

    // const htmlResponse = `<img src="${imageUrl}" alt="Handsome Image"/>`;

    // res.send(htmlResponse);
    
})

const imagePath = path.join(__dirname, '/images', 'handsome.jpg');

/////////////////////////////////////
const uploadAsset = async (file , name) => {

    try {
        // Get details about the asset
        const result = await cloudinary.uploader.upload(file);
        const newArea=new Area({
            name:name,
            Image:{
                name:result.original_filename,
                url:result.url
            }
        })
        await newArea.save();
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
// uploadAsset(imagePath,"hansome")


app.listen(4000,()=>{
    console.log("running")
})


/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};


// function createImage(imagePath) {
//     try {
//         const imageData = fs.readFileSync(imagePath);
//         const imageBuffer=Buffer.from(imageData)
//         console.log(imageBuffer)

        

//         const newImage = new Area({
//             name:"Siddiq",
//             Image: {
//                 name:"handsome",
//                 data: imageBuffer,
//                 contentType: "content/jpg"
//             }
//         });
//         newImage.save();
//     } catch (error) {
//         console.error("Error reading image file:", error);
//     }
// }


// createImage(imagePath)
