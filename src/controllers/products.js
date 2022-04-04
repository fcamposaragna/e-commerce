import { productService } from '../services/services.js'
import productDTO from '../dtos/productDTO.js';
import logger from '../utils/logger.js';

const getProducts = async (req,res)=>{
    try{
        productService.getAll().then(result=>{
            return res.send(result.map(product=>new productDTO(product)))
        })
    }catch(error){
        logger.error(error)
        return res.status(500)
    }
}
const getProductId = async(req,res)=>{
    try{
        let id = req.params.id;
        productService.getBy({_id:id}).then(result=>{
            res.status(200).send(new productDTO(result));
        })
    }catch(error){
        logger.error(error)
        return res.status(500)
    }
}
const saveProduct = async(req,res)=>{
    try{
        let product = req.body;
        let file = req.file;
        product.thumbnail = req.protocol+"://"+req.hostname+":"+process.env.PORT||8080+'/images'+file.filename;
        productService.save(product).then(result=>{
            res.status(201).send(new productDTO(result));
        });
    }catch(error){
        logger.error(error);
        res.status(500)
    }
}
const updateProduct = async(req,res)=>{
    try{
        let body = req.body;
        let id = req.params.id;
        productService.update(id,body).then(result=>{
            res.status(204);
        })
    }catch(error){
        logger.error(error);
        res.status(500)
    }
}
const deleteProduct = async(req,res)=>{
    try{
        let id = req.params.id;
        productService.delete(id).then(result=>{
            res.status(204);
        })
    }catch(error){
        logger.error(error);
        res.status(500)
    }
}

export default {
    getProducts,
    getProductId,
    saveProduct,
    updateProduct,
    deleteProduct
}