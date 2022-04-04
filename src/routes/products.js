import express from "express";
import { productService } from "../services/services.js";
import uploader from "../utils/uploader.js";
import productController from '../controllers/products.js'
const router = express.Router();

router.get('/',productController.getProducts);
router.get('/:id', productController.getProductId);
router.post('/', uploader.single('thumbnail'), productController.saveProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

export default router;