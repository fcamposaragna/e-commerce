fetch('/session/current',{
    method: 'GET',
    credentials: 'include'
}).then(result=>result.json()).then(json=>console.log(json))