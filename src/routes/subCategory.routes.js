import express from "express"
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from "../controllers/subCategory.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", getAllSubCategories)
router.post("/", createSubCategory)
router.get("/:id", getSubCategoryById)
router.put("/:id", updateSubCategory)
router.delete("/:id", deleteSubCategory)


export default router;