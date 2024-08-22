const multer = require("multer")

const storage = multer.memoryStorage()
const Upload = multer({storage: storage}).any()

module.exports = Upload
