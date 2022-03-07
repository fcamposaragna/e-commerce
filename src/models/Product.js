import mongoose from "mongoose";

export default class Product{
    constructor(data){
        this.data = data;
    }
    static get model(){
        return 'products'
    }
    static get schema(){
        return{
            nombre:String,
            descripcion:String,
            codigo:String,
            thumbnail:String,
            precio:Number,
            stock:Number
        }
    }
}