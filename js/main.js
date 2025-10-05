const productos= [
    {id:1,nombre:"reel Curado 200DC",precio: 600000, rutaImg:"https://acdn-us.mitiendanube.com/stores/004/447/303/products/d_nq_np_2x_630790-mla50018082669_052022-f-320137128a760877ae17430238035506-1024-1024.jpg"},
    {id:2,nombre:"caña slx 20lb",precio:240000, rutaImg:"https://www.devotocamping.com.ar/cache_images/7/6/2/4/6/76246f312da1cbe9fc4949bfce9a71d9043cd041--.jpg"},
    {id:3,nombre:"caña mojo bass 20lb",precio: 450000, rutaImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA94A4kiu07ikZhB1UOd-K8l5PTTsg-A-9kw&s"},
    {id:4,nombre:"reel legacy",precio:430000 ,rutaImg:"https://http2.mlstatic.com/D_NQ_NP_692009-MLA91374490147_082025-O.webp"},
    {id:5,nombre:"caña curado brasil 20lb",precio: 500000, rutaImg:"https://http2.mlstatic.com/D_NQ_NP_819776-MLA75301393868_032024-O.webp"},
    {id:6,nombre:"multifilamento power pro",precio:120000, rutaImg:"https://www.devotocamping.com.ar/cache_images/d/7/f/9/4/d7f94d65e7c0a8fcc51d967d3c970cf9adc23c4c--.jpg"},
    {id:7,nombre:"señuelo rapala",precio:60000, rutaImg:"https://acdn-us.mitiendanube.com/stores/005/733/648/products/73-3541292ea09053404917398204050962-1024-1024.jpg"}
];
let contenedorProducto= document.querySelector("#contenedorProducto");
let barraBusqueda = document.querySelector("#barraBusqueda");
let contenedorCarrito= document.querySelector("#carrito");
let carrito =[];
function mostrarProductos(array){
    let cartaProducto= "";
    array.forEach(element => {
        cartaProducto += `<div class="card-producto">
                <img src="${element.rutaImg}" alt="${element.nombre}">
                <h3>${element.nombre}</h3>
                <p>$${element.precio}</p>
                <button onclick = "agregarACarrito(${element.id})">Agregar al carrito</button>
            </div> `;
    });
    contenedorProducto.innerHTML = cartaProducto;
}
function init(){
    mostrarProductos(productos);
    mostrarCarrito();
}
// usar antes el cargar carrito porq que sino ingresa al init  y entra el else de mostrar carrito y me borra la memoria
cargarCarrito();
init();

barraBusqueda.addEventListener("keyup",filtrarPorducto)
function filtrarPorducto()
{
    let lectura = barraBusqueda.value;
    const array = productos.filter(producto => producto.nombre.includes(lectura));
    mostrarProductos(array);
    
}

function agregarACarrito(id){
    carrito.push(productos.find(valor => valor.id == id))
   mostrarCarrito();
   

}
function mostrarCarrito(){
    let cartaCarrito = "";
    if(carrito.length>0)
    {
        cartaCarrito+= "<ul>"
        carrito.forEach((element,indice) => {
            cartaCarrito+= `<li class= "bloque-carrito">
            <div>
            <img src="${element.rutaImg}" alt="${element.nombre}">
            <p class = "nombre-item">${element.nombre}-$${element.precio}-${indice}</p> </div>
            
            <button class= "eliminar-bloque" onclick="eliminarCarrito(${element.indice})">Eliminar</button> </li>`;
        });
        guardarCarritoLocalStorage();
        cartaCarrito+=`</ul><button class= "eliminar-carrito" onclick= "vaciarCarrito()">Vaciar carrito</button>`; 
    }
    else{
        borrarMemoria();
        cartaCarrito+=`<h4 class= "vacio">Agregue un elemento al carrito</h4>`
    }
    
    contenedorCarrito.innerHTML= cartaCarrito;
}

function vaciarCarrito(){
    carrito= [];
    contenedorCarrito.innerHTML= `<h4 class= "vacio">Agregue un elemento al carrito</h4>`;
    borrarMemoria();
}
function eliminarCarrito(indice)
{
    carrito.splice(indice,1);
    mostrarCarrito();
}
function guardarCarritoLocalStorage()
{
    if(carrito.length > 0){
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }else{
         borrarMemoria();
    }
}
function borrarMemoria(){
    if(carrito.length== 0){
        localStorage.removeItem("carrito");
    }
}
function cargarCarrito(){
    
    if(localStorage.getItem("carrito") != null){
        let carritoAux = JSON.parse(localStorage.getItem("carrito"));
        if(carritoAux.length>0){
            carrito = carritoAux;
        }
     }
}
