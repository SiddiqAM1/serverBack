const express=require("express")
const Area=require('../../database/areaSchema')
const cloudinary=require("cloudinary").v2;
const multer = require("multer")
const Upload = require("./middleware/multer")

const getDataUri=require("../../utils/dataUri")



const router = express.Router()

const storage = multer.memoryStorage()
// api/popular/
router.get("/area", async (req, res) => {
    try {
        const areas = await Area.find();
        const response = {
            areas: areas.map(area => ({
                id: area._id,
                name: area.name,
                image: area.Image,
                brochureLink: area.BrochureLink,
                videoLink: area.VideoLink,
                description: area.Description,
                cluster: area.cluster,
                data: area.data
            }))
        };
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post("/area/upload", Upload, async (req, res) => {
    try {
      const mainFile = req.files.find(file => file.fieldname === 'file');
    //   console.log(mainFile);
      const mainFileUri = mainFile ? getDataUri(mainFile) : null;
    //   console.log(mainFileUri);
      const mainFileResult = mainFileUri ? await cloudinary.uploader.upload(mainFileUri.content) : null;
    //   console.log(mainFileResult);
  
      const newArea = new Area({
        name: req.body.name,
        Image: mainFileResult ? { url: mainFileResult.url } : undefined,
        FloorPlanLink: req.body.FloorPlanLink,
        PaymentPlanLink: req.body.PaymentPlanLink,
        BrochureLink: req.body.BrochureLink,
        VideoLink: req.body.VideoLink,
        Description: req.body.Description,
        cluster: req.body.cluster === 'true',
        data: []
      });
    //   console.log(req.body.data);
let dataArray
if (req.body.data) {
if (typeof req.body.data === 'string') {
try {
dataArray = JSON.parse(req.body.data);
} catch (error) {
console.error('Error parsing data:', error);
dataArray = [];
}
} else if (Array.isArray(req.body.data)) {
dataArray = req.body.data;
} else {
dataArray = [req.body.data];
}

// console.log(dataArray);
for (let i = 0; i < dataArray.length; i++) {
const nestedFile = req.files.find(file => file.fieldname === `data[${i}][file]`);
console.log(nestedFile);
const nestedFileUri = nestedFile ? getDataUri(nestedFile) : null;
//   console.log(nestedFileUri);
const nestedFileResult = nestedFileUri ? await cloudinary.uploader.upload(nestedFileUri.content) : null;
//   console.log(nestedFileResult);

newArea.data.push({
name: dataArray[i].name,
Image: nestedFileResult ? { url: nestedFileResult.url } : undefined,
BrochureLink: dataArray[i].BrochureLink,
PaymentPlanLink: dataArray[i].PaymentPlanLink,
FloorPlanLink: dataArray[i].FloorPlanLink,
VideoLink: dataArray[i].VideoLink,
Description: dataArray[i].Description
});
}
}
  
      await newArea.save();
      res.status(200).json({ message: "Area uploaded successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.put("/area/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = {
            name: req.body.name,
            BrochureLink: req.body.brochureLink,
            VideoLink: req.body.videoLink,
            Description: req.body.description,
            cluster: req.body.cluster === 'true',
            data: req.body.data ? JSON.parse(req.body.data) : undefined
        };

        const updatedArea = await Area.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedArea) {
            return res.status(404).json({ message: "Area not found" });
        }

        return res.status(200).json({ message: "Area updated successfully", area: updatedArea });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
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

// const uploadAsset = async (file , name) => {

//     try {
//         // Get details about the asset
//         const result = await cloudinary.uploader.upload(file);
//         const newArea=new Area({
//             name:name,
//             Image:{
//                 name:result.original_filename,
//                 url:result.url
//             }
//         })
//         await newArea.save()
//         console.log(result);
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };      
          



module.exports=router