export default class UserDTO{
    constructor(user){
        this.email = user.email,
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.address = user.address,
        this.age = user.age,
        this.phone = user.phone,
        this.avatar = user.avatar,
        this.carts = user.carts,
        this.full_name = `${this.first_name} ${this.last_name}`
    }
}