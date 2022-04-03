export default class productDTO{
    constructor(product){
        this._id = product._id
        // this.nombre = product.nombre,
        // this.descripcion = product.descripcion,
        this.codigo = product.codigo,
        this.thumbnail = product.thumbnail,
        this.precio = product.precio,
        this.stock = product.stock,
        this.resume = `${product.nombre} ${product.descripcion}`
    }
}