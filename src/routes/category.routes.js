import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";
import subCategoryRouter from "../routes/subCategory.routes.js"
import { validation } from "../middlewares/validation.js";
import { createCategorySchema, getCategoryByIdSchema } from "../../utils/validators/category.validator.js";
import multer from "multer";
import AppError from "../../utils/AppError.js";
import { uploadSingleFile } from "../middlewares/fileUpload.js";


const router = express.Router();

//in middleware first thing is multer

router.use("/:id/subcategory", subCategoryRouter)
router.get("/", getAllCategories)
router.post("/", uploadSingleFile("category", "image"), validation(createCategorySchema), createCategory)
router.get("/:id", validation(getCategoryByIdSchema), getCategoryById)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router