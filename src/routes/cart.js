import express from "express";
import cartController from '../controllers/carts.js'
const router = express.Router();

router.post('/', cartController.saveCart);
router.get('/:id/products', cartController.getById);
router.post('/:id/products', cartController.addProduct);  
router.delete('/:id', cartController.deleteCart);
router.delete('/:id/products/:id_prod', cartController.deleteProduct);

export default router;