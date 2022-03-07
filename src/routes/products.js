import express from "express";
import { productService } from "../services/services.js";
const router = express.Router();

router.get('/',(req,res)=>{
    productService.getAll().then(result=>{
        res.send(result)
    })
})