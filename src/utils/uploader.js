import multer from 'multer';

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'src/public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
})
const uploader = multer({storage:storage});
export default uploader;