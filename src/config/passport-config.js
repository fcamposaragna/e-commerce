import passport from 'passport';
import local from 'passport-local';
import logger from '../utils/logger.js';
import { userService, cartService } from '../services/services.js';
import { createHash, isValidPassword } from '../utils/utils.js';
import {cookieExtractor} from '../utils/cookieExtractor.js'
import jwt from 'passport-jwt';
import config from './config.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport= ()=>{
    passport.use("register",new LocalStrategy({passReqToCallback:true,usernameField:"email",session:false},async(req,username,password,done)=>{
        let {first_name,last_name,email,address,age,phone} = req.body;
        try{
            if(!req.file) return done(null,false,{message:`Avatar couldn't upload`});
            let user = await userService.getBy({email:email});
            if(user) return done(null,false,{message:'User already exists'});
            let cart = await cartService.save({});
            const newUser = {
                first_name,
                last_name,
                email,
                password:createHash(password),
                address,
                age,
                phone,
                carts:cart._id,
                avatar:req.file.filename
            }
            let result = await userService.save(newUser);
            return done(null,result)
        }catch(error){
            logger.error(error);
            return done(error);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:"email"},async(username,password,done)=>{
        try{
            const user = await userService.getBy({email:username})
            if(!user) return done(null,false,{message:"No user found"})
            if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password"})
            return done(null,user);
        }catch(error){
            logger.error(error);
            return done(error);
        }
    }))
    passport.use('jwt', new JWTStrategy({jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:config.jwt.SECRET},
        async(jwt_payload,done)=>{
            try{
                let user = await userService.getBy({_id:jwt_payload._id});
                if(!user) return done(null,false,{message:'User not found'})
                return done(null,user)
            }catch(error){
                logger.error(error)
            }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.getBy({_id:id})
        done(null,result);
    })
}
export default initializePassport;
