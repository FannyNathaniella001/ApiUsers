var contenido = document.querySelector('#app')
function traerDatos(){
  fetch('https://randomuser.me/api/') //recibe una URL o archivo ejem: src/archivo/datos.txt
 .then(res => res.json()) //una promesa que convierte el contenido de la url en un archivo .JSON o .txt
 .then(data =>{ //una promesa que envia el resultado de la consulta a un lugare especifico
   app.innerHTML =`
        <img src="${data.results['0'].picture.large}" width="100px" class="img-fluid rounded-circle"></img>
        <p style="margin-top:10px;"> ${data.results['0'].name.last}</p>
        <p style="margin-top:10px;"> ${data.results['0'].email}</p>

   `
 }
 )
}
