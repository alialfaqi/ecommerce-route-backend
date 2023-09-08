import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { uploadMultipleFile, uploadMultipleFiles } from "../middlewares/fileUpload.js";


const router = express.Router();



router.get("/", getAllProducts)
router.post("/", uploadMultipleFiles(product, [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]), createProduct)
router.get("/:id", getProductById)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)




export default router