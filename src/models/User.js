import mongoose from "mongoose";

let Schema = mongoose.Schema;
export default class User{
    constructor(data){
        this.data = data;
    }
    static get model(){
        return 'Users';
    }
    static get schema(){
        return{
            email:String,
            password:String,
            first_name:String,
            last_name:String,
            address:String,
            age:Number,
            phone:Number,
            avatar:String,
            carts:[]
        }
    }
}