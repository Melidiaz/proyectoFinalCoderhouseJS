let carritoLocal = JSON.parse(localStorage.getItem('carritoGuardado')) || []

let acumulador = ``;
let totalCarrito = 0;

const ProductoUno = {nombre: "Dematología", precio: 3000, imagen:'image0.jpg'};
const ProductoDos = {nombre: "Espirómetro", precio: 4500, imagen: 'image1.jpg'};
const ProductoTres = {nombre: "Termómetro", precio: 3000, imagen: 'image2.jpg'};
const ProductoCuatro = {nombre: "Odontología", precio: 5000, imagen: 'image3.jpg'};
const ProductoCinco = {nombre: "Electrocardiograma", precio: 5000, imagen: 'image4.jpg'};
const ProductoSeis = {nombre: "Tensiómetro", precio: 4000, imagen: 'image5.jpg'};

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
        <button onclick='agregarAlCarrito(${JSON.stringify(BaseDeDatosProductos[i])})'>Agregar al carrito</button>
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
    listacompra.push(producto);
        
    mostrarEnElCarrito(listacompra)
   
    totalCarrito += producto.precio;
    document.getElementById("totalDelCarrito").innerHTML = totalCarrito;

    localStorage.setItem('carritoGuardado',JSON.stringify(listacompra))
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
        <div class="p-2 bd-highlight">Cantidad</div>
        <div class="p-2 bd-highlight">${listacompra[i].precio}</div>
        <div class="p-2 bd-highlight"><button onclick='borrarProducto(${JSON.stringify(listacompra[i])})'>Tachito</button></div>
      </div>
       </li>`
    }

    document.getElementById("lista").innerHTML = acum;
}
