import express from "express";

import { cartService } from "../services/services.js";
const router = express.Router();


router.post('/',(req,res)=>{
    cartService.save().then(result=>{
        res.send(result)
    })
})

export default router;