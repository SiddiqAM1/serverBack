const multer = require("multer")

const storage = multer.memoryStorage()
const Upload= multer({storage:storage}).single("file")

module.exports=Upload