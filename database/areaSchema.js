const mongoose = require("mongoose")
// const imageSchema = new mongoose.Schema({
//     name:String,
//     url:String
//   });

// const areaSchema= new mongoose.Schema(
//     {
//         name:String,
//         Image:imageSchema,
//         brochureLink:String,
//         videoLink:String,
//         description:String

//     }
// )

// module.exports= mongoose.model("Area",areaSchema) 
// const mongoose = require("mongoose");

// Schema for images
const imageSchema = new mongoose.Schema({
    url: String
});

// Schema for nested data within certain areas (like in "Damac Lagoons")
const nestedDataSchema = new mongoose.Schema({
    name: String,
    Image: imageSchema,
    BrochureLink: String,
    PaymentPlanLink: String,
    FloorPlanLink: String,
    VideoLink: String,
    Description: String
});

// Schema for areas
const areaSchema = new mongoose.Schema({
    name: String,
    Image: imageSchema,
    PaymentPlanLink: String,
    FloorPlanLink: String,
    BrochureLink: String,
    VideoLink: String,
    Description: String,
    cluster: Boolean, // Property to indicate if nested data exists
    data: [nestedDataSchema] // For nested data arrays like in "Damac Lagoons"
});

module.exports = mongoose.model("Area", areaSchema);
