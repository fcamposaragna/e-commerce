import express from "express";
import jwt from 'jsonwebtoken';

import uploader from '../utils/uploader.js'
import { passportCall } from "../middlewares/passportMiddlewares.js";
import config from '../config/config.js';
import { io } from "../app.js";
import { sendEmail, sendEmailConfirmation } from '../utils/nodemailer.js'
import { serialize } from '../utils.js'

const router = express.Router();

router.post('/register',uploader.single('avatar'),passportCall('register'),(req,res)=>{
    const user = req.user
    sendEmail(user)
    res.send({status:'success', message:"Signed up"})
})
router.post('/login',passportCall('login'),(req,res)=>{
    let user;
    if(req.user.role!=='superadmin'){
        user= serialize(req.user,['first_name', 'last_name'])
    }else{
        user = req.user;
    }
    let token = jwt.sign(user,config.jwt.SECRET)
    res.cookie('JWT_COOKIE', token,{
        httpOnly:true,
        maxAge:1000*60*60
    });
    res.cookie('sessioinCookie', 'boom', {
        maxAge: 60*60*1000
    })
    res.send({status:"success", payload:{user}});
})
router.get('/current', passportCall('jwt'),(req,res)=>{
    let user = req.user;
    res.send({status:'success', payload:user})
})

// router.get('/profile',passportCall('jwt'),(req,res)=>{
//     let user = req.user;
//     io.on('connection', async socket=>{
//         let products = await productService.getAll();
//         socket.emit('showProducts', products);
//     })
//     res.render('profile', user)
// })
// router.get('/confirm',(req,res)=>{
//     res.render('confirm')
// })
// router.post('/confirm',async (req,res)=>{
//     let body = req.body;
//     let cart = await cartService.getBy({_id:body.products})
//     let prodctProcessed = cart.productos.map(prod=>{
//         return prod.nombre
//     })
//     const processedObject = {
//         first_name : body.first_name,
//         last_name : body.last_name,
//         products: prodctProcessed
//     }
//     sendWhatsapp(processedObject);
//     sendEmailConfirmation(processedObject)
// })
// router.get('/logout',(req,res)=>{
//     res.clearCookie('JWT_COOKIE')
//     res.redirect('/')

// })

export default router;