import express from "express"
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../controllers/brand.controller.js";
import { validation } from "../middlewares/validation.js";
import { createBrandSchema } from "../../utils/validators/brand.validator.js";
import { uploadSingleFile } from "../middlewares/fileUpload.js";


const router = express.Router();



router.get("/", getAllBrands)
router.post("/", uploadSingleFile('brand', 'logo'), validation(createBrandSchema), createBrand)
router.get("/:id", getBrandById)
router.put("/:id", updateBrand)
router.delete("/:id", deleteBrand)




export default router