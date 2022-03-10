const socket = io();

socket.on('showProducts', data=>{
    fetch('../templates/tableProducts.handlebars').then(string=>string.text()).then(template=>{
        const templateObject = {
            products : data
        }
        const processedTemplate = Handlebars.compile(template)
        const html = processedTemplate(templateObject);
        let div = document.getElementById('product-container');
        div.innerHTML=html
    })
})

addProduct = (id)=>{
    console.log(id)
    fetch('/session/current').then(result=>result.json()).then(json=>{
        const cart = json.carts[0]
            let body = {
            id_prod: id
        }
        console.log(body)
        fetch(`/api/carrito/${cart}/productos`,{
            method:'POST',
            body : JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>result.json()).then(json=>console.log(json))
        
    })
}

miFunc = ()=>{
    fetch('/session/current').then(result=>result.json()).then(json=>{
        const id = json.carts[0]
        location.replace(`/api/carrito/${id}/productos`)
    })
    
}