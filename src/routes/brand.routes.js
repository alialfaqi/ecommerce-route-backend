import express from "express"
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../controllers/brand.controller.js";


const router = express.Router();



router.get("/", getAllBrands)
router.post("/", createBrand)
router.get("/:id", getBrandById)
router.put("/:id", updateBrand)
router.delete("/:id", deleteBrand)




export default router