import Cart from "../models/Cart.js";
import User from "../models/User.js";
import GenericQueries from "./genericQueries.js";

export default class CartService extends GenericQueries{
    constructor(dao){
        super(dao,User.model)
    }
}