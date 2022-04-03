import express from "express";
import { productService } from "../services/services.js";
import uploader from "../utils/uploader.js";
import productDTO from '../dtos/productDTO.js'
const router = express.Router();

router.get('/',(req,res)=>{
    productService.getAll().then(result=>{
        res.send(result.map(product=>new productDTO(product)))
    })
})

router.get('/:id', (req,res)=>{
    let id = req.params.id;
    productService.getBy({_id:id}).then(result=>{
        res.status(200).send(new productDTO(result));
    })
})

router.post('/', uploader.single('thumbnail'), (req,res)=>{
    let product = req.body;
    let file = req.file;
    product.thumbnail = req.protocol+"://"+req.hostname+":"+process.env.PORT||8080+'/images'+file.filename;
    productService.save(product).then(result=>{
        res.status(201).send(new productDTO(result));
    })
})

router.put('/:id',(req,res)=>{
    let body = req.body;
    let id = req.params.id;
    productService.update(id,body).then(result=>{
        res.status(204)
    })
})
router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    productService.delete(id).then(result=>{
        res.status(204);
    })
})
export default router;