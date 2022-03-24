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
        // const payload = result.productos.map(product=>{
        //     productService.getBy({_id:product})
        // })
        // res.send(payload)
        res.send(result)
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

export default router;