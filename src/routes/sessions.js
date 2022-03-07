import express from "express";
import uploader from '../utils/uploader.js'
import { passportCall } from "../middlewares/passportMiddlewares.js";
import jwt from 'jsonwebtoken';
import config from '../config/config.js';



const router = express.Router();

router.post('/register',uploader.single('avatar'),passportCall('register'),(req,res)=>{
    res.send({message:"Signed up"})
})
router.post('/login',passportCall('login'),(req,res)=>{
    let user = req.user;
    let token = jwt.sign(user,config.jwt.SECRET)
    res.cookie('JWT_COOKIE', token,{
        httpOnly:true,
        maxAge:1000*60*60
    })
    res.send({status:"success", message:"Logged in"})
})
router.get('/current', passportCall('jwt'),(req,res)=>{
    let user = req.user;
    res.send(user)
})
export default router;