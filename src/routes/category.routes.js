import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";
import subCategoryRouter from "../routes/subCategory.routes.js"
import { validation } from "../middlewares/validation.js";
import { createCategorySchema, getCategoryByIdSchema } from "../../utils/validators/category.validator.js";
import { uploadSingleFile } from "../middlewares/fileUpload.js";
import AppError from "../../utils/AppError.js";
import multer from "multer";


const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/category')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + '-' + file.originalname)
//     }
// })

// function fileFilter(req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true)
//     }
//     else {
//         cb(new AppError("ivalid image", 400), false)
//     }
// }

// const upload = multer({ storage, fileFilter })

//in middleware first thing is multer

router.use("/:id/subcategory", subCategoryRouter)
router.get("/", getAllCategories)
router.post("/", uploadSingleFile("category", "image"), validation(createCategorySchema), createCategory)
router.get("/:id", validation(getCategoryByIdSchema), getCategoryById)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

//uploadSingleFile("category", "image")

export default router