import multer from "multer"
import AppError from "../../utils/AppError.js"

export const uploadSingleFile = (folderName, fieldName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith(fieldName)) {
            cb(null, true)
        }
        else {
            cb(new AppError("ivalid image", 400), false)
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload.single(fieldName)
}

export const uploadMultipleFiles = (folderName, arrayFields) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimeType.startsWith(arrayFields)) {
            cb(null, true)
        } else {
            cb(new AppError("invalid image", 400), false)
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload.fields(arrayFields)
}