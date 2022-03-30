import express from "express";

import { cartService, productService } from "../services/services.js";
const router = express.Router();


router.post('/',(req,res)=>{
    cartService.save().then(result=>{
        res.send(result)
    })
})
router.get('/:id/productos', (req,res)=>{
    let id = req.params.id;
    cartService.getBy({_id:id}).then(result=>{
        const templateObject = {
            products : result.productos
        }
        res.render('carrito',templateObject)
    })
})
router.post('/:id/productos',(req,res)=>{
    let id = req.params.id;
    let id_prod = req.body.id_prod;
    cartService.addProductInCart(id,id_prod).then(result=>{
        console.log(result)
    });
})
   
router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    cartService.delete(id).then(result=>{
        res.send({status:"success", message:"Cart deleted"})
    }).catch(res.send({status:404, message:'Cart not found'}))
})

router.delete('/:id/productos/:id_prod',(req,res)=>{
    let id = req.params.id;
    let id_prod = req.params.id_prod;
    cartService.deleteProduct(id,id_prod)
    res.send({status:200,message:'Product deleted'})
})

export default router;