import express from "express";
import cartController from '../controllers/carts.js'
const router = express.Router();

router.post('/', cartController.saveCart);
router.get('/:cid', cartController.getById);
router.post('/:cid/products/:pid', cartController.addProduct);  
router.delete('/:id', cartController.deleteCart);
router.delete('/:cid/products/:pid', cartController.deleteProduct);


export default router;