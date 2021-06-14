// Variables

let carritoLocal = JSON.parse(localStorage.getItem('carritoGuardado')) || []
let acumulador = ``;

const botonVaciar = document.getElementById("botonVaciar");
const contadorCarrito = document.getElementById("contadorCarrito");

const ProductoUno = {nombre: "Dermatología", precio: 3000, imagen:'image0.jpg', cantidad: 1};
const ProductoDos = {nombre: "Espirómetro", precio: 4500, imagen: 'image1.jpg', cantidad: 1};
const ProductoTres = {nombre: "Termómetro", precio: 3000, imagen: 'image2.jpg', cantidad: 1};
const ProductoCuatro = {nombre: "Odontología", precio: 5000, imagen: 'image3.jpg', cantidad: 1};
const ProductoCinco = {nombre: "Electros", precio: 5000, imagen: 'image4.jpg', cantidad: 1};
const ProductoSeis = {nombre: "Tensiómetro", precio: 4000, imagen: 'image5.jpg', cantidad: 1};

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
function agregarAlCarrito(producto) {

    let productoEnCarrito = listacompra.find(el => el.nombre == producto.nombre)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1
    } else {     
        listacompra.push(producto);       
    }

    // listacompra.push(producto);
        
    mostrarEnElCarrito(listacompra)

    localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))
// totalCarrito.innerText = listacompra.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);
}

//sacamos del array del carrito, y llamamos a mostrar el contenido. También para eliminar un item del carrito
function borrarProducto(articulo){

    let productoAEliminar = listacompra.find(producto => producto.nombre == articulo.nombre)

    productoAEliminar.cantidad -= 1

    if (productoAEliminar.cantidad === 0) {       
            let indice = listacompra.indexOf(productoAEliminar)
            listacompra.splice(indice, 1)
    }

   
    mostrarEnElCarrito(listacompra);
    localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))
    
}

//mostrar (actualizar) Array del carrito
function mostrarEnElCarrito(listacompra){
    let acum = '';
    for (let i = 0; i < listacompra.length; i++) {
        acum +=`
        <li>
            <div class="d-flex bd-highlight">
                <div class="p-2 flex-grow-1 bd-highlight">${listacompra[i].nombre}</div>
                <div class="p-2 bd-highlight">$${listacompra[i].precio}</div>
                <div class="p-2 bd-highlight">${listacompra[i].cantidad}</div>
                <div class="p-2 bd-highlight"><type="button" class="btn btn-light btn-sm" button onclick='borrarProducto(${JSON.stringify(listacompra[i])})'><img class="iconotrash" src="iconotrash.png"></button></div>
            </div>
       </li>`
    }

    document.getElementById("lista").innerHTML = acum;

    document.getElementById("totalDelCarrito").innerHTML = listacompra.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);;
    contadorCarrito.innerText = listacompra.reduce((acumulador, producto) => acumulador+= producto.cantidad,0 );
}

// VER ESTA FUNCION QUE quede en 0 el TOTAL A PAGAR
function vaciarCarrito() {
    listacompra = [];
    totalCarrito = 0
    mostrarEnElCarrito(listacompra);
}

botonVaciar.addEventListener("click", ()=> {
    vaciarCarrito();
    localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))
 })

//Función cuando se finaliza compra 

$('#botonPagar').on("click", myFunction);

function myFunction() {
    swal ( " Muchas gracias por su compra ! " );
  vaciarCarrito()

  localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))
}

