const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    name:String,
    url:String
  });

const areaSchema= new mongoose.Schema(
    {
        name:String,
        Image:imageSchema,
        brochureLink:String,
        videoLink:String,
        description:String

    }
)

module.exports= mongoose.model("Area",areaSchema) 