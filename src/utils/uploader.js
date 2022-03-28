import multer from 'multer';
import { __dirname } from '../dirname.js';
import config from '../config/config.js'


const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,__dirname+'/public/images/profilePictures')
    },
    filename:(req,file,cb)=>{
        //const dir = req.protocol + req.hostname + ":" + (process.env.PORT||8080) + "/images/" + file.originalname
        //cb(null,dir);
        cb(null,Date.now()+file.originalname);
    }
})
const uploader = multer({storage:storage});
export default uploader;