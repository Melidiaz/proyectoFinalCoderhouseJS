let carritoLocal = JSON.parse(localStorage.getItem('carritoGuardado')) || []

let acumulador = ``;
let totalCarrito = 0;

// VER ESTE 
const botonVaciar = document.getElementById("botonVaciar");
const contadorCarrito = document.getElementById("contadorCarrito");

const ProductoUno = {nombre: "Dematología", precio: 3000, imagen:'image0.jpg', stock: 20};
const ProductoDos = {nombre: "Espirómetro", precio: 4500, imagen: 'image1.jpg', stock: 30};
const ProductoTres = {nombre: "Termómetro", precio: 3000, imagen: 'image2.jpg', stock: 40};
const ProductoCuatro = {nombre: "Odontología", precio: 5000, imagen: 'image3.jpg', stock: 15};
const ProductoCinco = {nombre: "Electrocardiograma", precio: 5000, imagen: 'image4.jpg', stock: 20};
const ProductoSeis = {nombre: "Tensiómetro", precio: 4000, imagen: 'image5.jpg', stock: 30};

const BaseDeDatosProductos = [ProductoUno, ProductoDos, ProductoTres, ProductoCuatro, ProductoCinco, ProductoSeis];

for (let i = 0; i < BaseDeDatosProductos.length; i++) {
    acumulador += `
    <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
    <a href="#"><img class="card-img-top" src="${BaseDeDatosProductos[i].imagen}" alt=""></a>
    <div class="card-body">
        <h4 class="card-title">
            <a href="#">${BaseDeDatosProductos[i].nombre}</a>
        </h4>
        <h5> $${BaseDeDatosProductos[i].precio}</h5>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p>
    </div>
    <div class="card-footer">
        <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        <button type="button" class="btn btn-primary" onclick='agregarAlCarrito(${JSON.stringify(BaseDeDatosProductos[i])})' >Agregar al carrito</button>
     </div>
    </div>
</div>`;
}

document.getElementById("destacados").innerHTML = acumulador;

let listacompra= [];

if(carritoLocal.length>0){
    carritoLocal.forEach(element => {
    agregarAlCarrito(element)
    });
}

//agregamos al array del carrito, y llamamos a mostrar el contenido
function agregarAlCarrito(producto){

// siguiendo lo del after de conrado: para que no se repitan los productos!

    // let producto = listacompra.find(el => el.id == producto)

    // if (producto) {
    //     producto.cantidad += 1
    // } else {

    // }

// lo mio

    listacompra.push(producto);
        
    mostrarEnElCarrito(listacompra)
   
    totalCarrito += producto.precio;
    document.getElementById("totalDelCarrito").innerHTML = totalCarrito;

    localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))

    contadorCarrito.innerText = listacompra.length;
    totalCarrito.innerText = listacompra.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);
}

//sacamos del array del carrito, y llamamos a mostrar el contenido. Esta es la función para eliminar un item del carrito
function borrarProducto(articulo){
    let productoAEliminar = listacompra.find(producto => producto.nombre == articulo.nombre)
    let indice = listacompra.indexOf(productoAEliminar)
    listacompra.splice(indice, 1)

    totalCarrito -= articulo.precio;
    document.getElementById("totalDelCarrito").innerHTML = totalCarrito;

    mostrarEnElCarrito(listacompra);
    localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))
    
}

//mostrar Array del carrito
function mostrarEnElCarrito(listacompra){
    let acum = '';
    for (let i = 0; i < listacompra.length; i++) {
        acum +=`
        <li>
        <div class="d-flex bd-highlight">
        <div class="p-2 flex-grow-1 bd-highlight">${listacompra[i].nombre}</div>
        <div class="p-2 bd-highlight">$${listacompra[i].precio}</div>
        <div class="p-2 bd-highlight">${listacompra[i].stock}<type="button" class="btn btn-light btn-sm"><img class="iconoplus" src="iconoplus.png"></div>
        <div class="p-2 bd-highlight"><type="button" class="btn btn-light btn-sm" button onclick='borrarProducto(${JSON.stringify(listacompra[i])})'><img class="iconotrash" src="iconotrash.png"></button></div>
      </div>
       </li>`
    }

    document.getElementById("lista").innerHTML = acum;
}


// VER ESTA FUNCION QUE NO ANDA PARA ELIMINAR TODO
botonVaciar.addEventListener("click", ()=> {
    vaciarCarrito();
 })


 $('#botonPagar').on("click", myFunction);

function myFunction() {
  alert ("Muchas gracias por su compra!")
}

