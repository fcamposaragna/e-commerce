import { RestoreAssistantInstance } from "twilio/lib/rest/autopilot/v1/restoreAssistant.js";
import { cartService, productService } from "../services/services.js";
import logger from "../utils/logger.js";

const saveCart = async (req, res)=>{
    try{
        cartService.save().then(result=>{
            res.send({status:'success', payload:result})
        })
    }catch(error){
        logger.error(error);
        res.status(404).send({status:'error', error:error})
    }
};
const getById = async (req,res)=>{
    try{
        let id = req.params.cid;
        // cartService.getBy({_id:id}).then(result=>{
        // res.send({status:'success', payload:result})
    // })
        let cart = await cartService.getBy({_id:id});
        console.log(cart)
        res.send({status:'success', payload:cart});
    }catch(error){
        logger.error(error);
        res.status(404).send({status:'error', error:error})
    }
};
const addProduct = async (req,res)=>{
    let quantityChanged = false;
    let { cid, pid } = req.params;
    let { quantity } = req.body;
    try{
        //Check product
        let product = await productService.getBy({_id:pid});
        if(!product) return res.status(404).send({status:'error', error:'Product not found'});
        //Check cart
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart not found'})
        //Check stock
        if(product.stock===0) return res.status(400).send({status:'error', error:'No stock'});
        //Check quantity
        if(product.stock<quantity){
            quantity = product.stock
            quantityChanged = true
        };
        //Update stock
        product.stock = product.stock - quantity;
        //Check if stock is 0
        if(product.stock===0){
            product.status = 'unaviable'
        }
        cart.products.push({product:pid,quantity});
        await cartService.update(cid,cart);
        res.send({status:'success', quantityChanged, newQuantity:quantity, message:'Product added in cart'});
    }catch(error){
        logger.error(error);
        res.status(404).send({status:'error', error:error});
    }
};
const deleteCart = async (req,res)=>{
    let id = req.params.id;
    try{
        cartService.delete(id).then(result=>{
            res.send({status:"success", message:"Cart deleted"})
        }).catch(res.send({status:'error', error:'Cart not found'}))

    }catch(error){
        logger.error(error);
        res.status(404).send({status:'error', error:error});
    }
};
const deleteProduct = async (req,res)=>{
    let { cid, pid } = req.params;
    try{
        //Check cart
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart not found'});
        //Exists product in to the cart?
        if(cart.products.some(element=>element.product._id.toString()===pid)){
            let product = await productService.getBy({_id:pid});
            if(!product) return res.status(404).send({status:'error', error:'Product not found'});
            //product on cart
            let productInCart = cart.products.find(element=>element.product._id.toString()===pid);
            //refresh quantity
            product.stock = product.stock + productInCart.quantity;
            await productService.update(pid, product);
            //delete product from cart
            cart.products = cart.products.filter(element=>element.product._id.toString()!==pid);
            await cartService.update(cid, cart);
            res.send({staus:'success', message:'product deleted'})
        }else{
            res.status(400).send({status:'error', error:'Product not found in Cart'})
        }
    }catch(error){
        logger.error(error);
        res.status(404).send({status:'error', error:error});
    }
}

export default {
    saveCart,
    getById,
    addProduct,
    deleteCart,
    deleteProduct
}