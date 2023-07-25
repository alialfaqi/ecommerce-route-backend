import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";
import subCategoryRouter from "../routes/subCategory.routes.js"


const router = express.Router();

router.use("/:id/subcategory", subCategoryRouter)

router.get("/", getAllCategories)
router.post("/", createCategory)
router.get("/:id", getCategoryById)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)




export default router