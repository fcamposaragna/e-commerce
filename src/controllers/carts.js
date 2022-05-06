import { cartService } from "../services/services.js";
import logger from "../utils/logger.js";

const saveCart = async (req, res)=>{
    try{
        cartService.save().then(result=>{
            res.send({status:'success', payload:result})
        })
    }catch(error){
        logger.error(error);
        res.send({status:'error', error:error})
    }
};
const getById = async (req,res)=>{
    try{
        let id = req.params.id;
        cartService.getBy({_id:id}).then(result=>{
            res.send({status:'success', payload:result})
    })
    }catch(error){
        logger.error(error);
        res.send({status:'error', error:error})
    }
};
const addProduct = async (req,res)=>{
    try{
        let id = req.params.id;
        let id_prod = req.body.id_prod;
        cartService.addProductInCart(id,id_prod).then(result=>{
        res.send({status:'success', message:'Product added in cart'})
    });
    }catch(error){
        logger.error(error);
        res.send({status:'error', error:error});
    }
};
const deleteCart = async (req,res)=>{
    try{
        let id = req.params.id;
        cartService.delete(id).then(result=>{
            res.send({status:"success", message:"Cart deleted"})
        }).catch(res.send({status:'error', error:'Cart not found'}))

    }catch(error){
        logger.error(error);
        res.send({status:'error', error:error});
    }
};
const deleteProduct = async (req,res)=>{
    try{
        let id = req.params.id;
        let id_prod = req.params.id_prod;
        cartService.deleteProduct(id,id_prod)
        res.send({status:'success', message:'Product deleted'})
    }catch(error){
        logger.error(error);
        res.send({status:'error', error:error});
    }
}

export default {
    saveCart,
    getById,
    addProduct,
    deleteCart,
    deleteProduct
}