const express=require("express")
const Area=require('../../database/areaSchema')
const cloudinary=require("cloudinary").v2;
const multer = require("multer")
const Upload = require("./middleware/multer")

const getDataUri=require("../../utils/dataUri")



const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage:storage})
// api/popular/

router.get("/area", async (req,res)=>{
        try {
        const areas= await Area.find()

        const response={
            areas:[]
        }

        for(const area of areas){
            const areaName=area.name
            const areaImage=area.Image
            const id = area._id
            response.areas.push({
                name:areaName,
                image:areaImage,
                id
            })
        }
        res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
        });

        router.get("/area/delete/:id", async (req, res) => {
            try {
                const areaId = req.params.id;
                // Use findById to find the document by ID
                const existingArea = await Area.findById(areaId);
                if (!existingArea) {
                    return res.status(404).json({ error: "Area not found" });
                }
        
                // Use remove to delete the document
                await Area.findByIdAndDelete(areaId);
        
                res.status(200).json({ message: "Area Deleted Successfully" });
            } catch (error) {
                console.error(error.message);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

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
        await newArea.save()
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
router.post("/area/upload",upload.single("file"), async(req,res)=>{
        try {
        const file = req.file

        if(!file){
            return res.status(404).json({message:"File not found"})
        }
        // console.log(file)

        const fileUri=getDataUri(file)

        // console.log(fileUri)
        uploadAsset(fileUri.content,req.body.name)


        res.status(200).json({message:"Area uploaded successfully"});

        } catch (error) {
            console.log(error.message)
        }
    
})

router.put("/area/update/:id",async (req,res)=>{
    try {
        const id = req.params.id
        console.log(req.params, req.body)
        console.log(id)
        const newName=req.body.name
        console.log(newName)

        const updatedName=await Area.findByIdAndUpdate(id, {name : newName}, {new:true})

        if(!updatedName){
            return res.status(404).json({message:"Area not found"})
        }


        return res.status(200).json({message:"Area updated successfully"})


    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Internal server error."})
    }
})


        
          



module.exports=router