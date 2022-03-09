let form = document.getElementById('logForm');
form.addEventListener('submit',function(event){
    event.preventDefault();
    let info = new FormData(form);
    let sendObject={
        email:info.get('email'),
        password:info.get('password')
    }
    console.log(sendObject)
    fetch('/session/login',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===404){
            return window.alert('Usuario o contraseña inválidos')
         }
         else{
             location.replace('/session/profile')
         }
    })
})