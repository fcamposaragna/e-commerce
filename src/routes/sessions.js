import express from "express";
import jwt from 'jsonwebtoken';

import uploader from '../utils/uploader.js'
import { productService, cartService } from "../services/services.js";
import { passportCall } from "../middlewares/passportMiddlewares.js";
import config from '../config/config.js';
import { io } from "../app.js";
import { sendEmail, sendEmailConfirmation } from '../utils/nodemailer.js'
import { sendWhatsapp } from "../utils/twilio.js";

const router = express.Router();


router.post('/register',uploader.single('avatar'),passportCall('register'),(req,res)=>{
    const user = req.user
    sendEmail(user)
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
router.get('/confirm',(req,res)=>{
    res.render('confirm')
})
router.post('/confirm',async (req,res)=>{
    let body = req.body;
    let cart = await cartService.getBy({_id:body.products})
    let prodctProcessed = cart.productos.map(x=>{
        return x.nombre
    })
    const processedObject = {
        first_name : body.first_name,
        last_name : body.last_name,
        products: prodctProcessed
    }
    sendWhatsapp(processedObject);
    sendEmailConfirmation(processedObject)
})
router.get('/logout',(req,res)=>{
    res.clearCookie('JWT_COOKIE')
    res.redirect('/')

})

export default router;