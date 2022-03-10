import multer from 'multer';
import config from '../config/config.js'

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'src/public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,req.protocol + req.hostname + ":" + (process.env.PORT||8080) + "/images" + file.filename);
    }
})
const uploader = multer({storage:storage});
export default uploader;