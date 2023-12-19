const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/upload'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + file.originalname.replace(/\s+/g, '-').toLowerCase())
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        const type = /jpeg|jpg|png/
        const extName = type.test(path.extname(file.originalname).toLowerCase())
        if(extName) {
            cb(null, true)
        } else {
            cb(new Error('Unsupported file'))
        }
    }

})


module.exports = upload