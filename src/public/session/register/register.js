let form = document.getElementById('registerForm');
form.addEventListener('submit', function(event){
    event.preventDefault();
    let info = new FormData(form);
    fetch('/session/register',{
        method:'POST',
        body:info
    }).then(result=>result.json()).then(json=>{
        if(json.error) return alert('Ese usuario ya está registrado')
        else location.href='/'
    })
})