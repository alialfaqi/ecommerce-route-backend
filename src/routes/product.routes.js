import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { uploadMultipleFiles } from "../middlewares/fileUpload.js";


const router = express.Router();



router.get("/", getAllProducts)
router.post("/", createProduct)
router.get("/:id", getProductById)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)



//uploadMultipleFiles("product", [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 8 }])
export default router