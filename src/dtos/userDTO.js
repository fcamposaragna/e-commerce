export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.profile_picture = user.profile_picture,
        this.cart = user.carts,
        this.role = user.role
    }
}