import express from "express";
import jwt from 'jsonwebtoken';

import uploader from '../utils/uploader.js'
import { productService } from "../services/services.js";
import { passportCall } from "../middlewares/passportMiddlewares.js";
import config from '../config/config.js';
import { io } from "../app.js";

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
router.get('/profile',passportCall('jwt'),(req,res)=>{
    let user = req.user;
    io.on('connection', async socket=>{
        let products = await productService.getAll();
        socket.emit('showProducts', products);
    })
    res.render('profile', user)
})
router.get('/logout',(req,res)=>{
    res.clearCookie('JWT_COOKIE')
    res.send({message:'Logged Out'})
})

export default router;