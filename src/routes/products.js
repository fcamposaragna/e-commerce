import express from "express";
import { productService } from "../services/services.js";
import uploader from "../utils/uploader.js";
import config from "../config/config.js";
const router = express.Router();

router.get('/',(req,res)=>{
    productService.getAll().then(result=>{
        res.send(result)
    })
})

router.get('/:id', (req,res)=>{
    let id = req.params.id;
    productService.getBy({_id:id}).then(result=>{
        res.send(result);
    })
})

router.post('/', uploader.single('thumbnail'), (req,res)=>{
    let product = req.body;
    let file = req.file;
    product.thumbnail = req.protocol+"://"+req.hostname+":"+process.env.PORT||8080+'/images'+file.filename;
    console.log(product)
    productService.save(product).then(result=>{
        res.send(result);
    })
})
//REVISAR!
router.put('/:id',(req,res)=>{
    let body = req.body;
    let id = req.params.id;
    productService.update(id).then(result=>{
        res.send(result)
    })
})
router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    productService.delete(id).then(result=>{
        res.send(result);
    })
})
export default router;