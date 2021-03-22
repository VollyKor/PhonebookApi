const multer = require('multer')
const path = require('path')
const { UPLOAD_FOLDER } = require('./constants')

const UPLOAD_DIR_PATH = path.join(process.cwd(), UPLOAD_FOLDER)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
            return
        }
        cb(null, false)
    },
})

module.exports = upload
