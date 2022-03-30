function deleteItem (id_prod){
    fetch(window.location+'/'+id_prod,{
        method:'DELETE'
    }).then(result=>result.json()).then(json=>{
        if(json.status===200){
            alert('Producto eliminado')
            window.location.reload();
        }
    })
}
