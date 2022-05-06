import express from "express";
import cartController from '../controllers/carts.js'
const router = express.Router();

router.post('/', cartController.saveCart);
router.get('/:id/productos', cartController.getById);
router.post('/:id/productos', cartController.addProduct);  
router.delete('/:id', cartController.deleteCart);
router.delete('/:id/productos/:id_prod', cartController.deleteProduct);

export default router;