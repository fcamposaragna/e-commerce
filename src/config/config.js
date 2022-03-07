import dotenv from 'dotenv';
dotenv.config();
export default{
    mongo:{
        url:{
            session: process.env.MONGO_URL_SESSION        
        }
    },jwt:{
        SECRET:process.env.JWT_SECRET
    }
}