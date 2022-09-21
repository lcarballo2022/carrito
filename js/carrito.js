
//   document.addEventListener('DOMContentLoaded', () => {


var carrito = [];

const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;

function addEl(id, nombre, precio, imagen) {
;
    var elemento = new Object();

    elemento.id = id;
    elemento.nombre = nombre;
    elemento.precio = precio;
    elemento.imagen = imagen;
    elemento.count = 1;

    //carrito.push(elemento);

    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage(elemento);

    renderizarCarrito();

}

// Funciones



/**
* Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
*/
/*       function renderizarProductos() {
           baseDeDatos.forEach((info) => {
               // Estructura
               const miNodo = document.createElement('div');
               miNodo.classList.add('card', 'col-sm-4');
               // Body
               const miNodoCardBody = document.createElement('div');
               miNodoCardBody.classList.add('card-body');
               // Titulo
               const miNodoTitle = document.createElement('h5');
               miNodoTitle.classList.add('card-title');
               miNodoTitle.textContent = info.nombre;
               // Imagen
               const miNodoImagen = document.createElement('img');
               miNodoImagen.classList.add('img-fluid');
               miNodoImagen.setAttribute('src', info.imagen);
               // Precio
               const miNodoPrecio = document.createElement('p');
               miNodoPrecio.classList.add('card-text');
               miNodoPrecio.textContent = `${info.precio}${divisa}`;
               // Boton 
               const miNodoBoton = document.createElement('button');
               miNodoBoton.classList.add('btn', 'btn-primary');
               miNodoBoton.textContent = '+';
               miNodoBoton.setAttribute('marcador', info.id);
               miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
               // Insertamos
               miNodoCardBody.appendChild(miNodoImagen);
               miNodoCardBody.appendChild(miNodoTitle);
               miNodoCardBody.appendChild(miNodoPrecio);
               miNodoCardBody.appendChild(miNodoBoton);
               miNodo.appendChild(miNodoCardBody);
               DOMitems.appendChild(miNodo);
           });
       }

       /**
       * Evento para añadir un producto al carrito de la compra
       
       function anyadirProductoAlCarrito(evento) {
     
           // Anyadimos el Nodo a nuestro carrito
           carrito.push(evento.target.getAttribute('marcador'))
           // Actualizamos el carrito 
           renderizarCarrito();
           // Actualizamos el LocalStorage
           guardarCarritoEnLocalStorage();
       }
*/
/**
* Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito() {

     carrito = JSON.parse(miLocalStorage.getItem("carrito"));
    // Vaciamos todo el html
    DOMcarrito.textContent = '';

    if (carrito === null) {
        DOMtotal.textContent = "0";
        document.getElementById("catBuys").innerHTML="0";
    } else {
        // Generamos los Nodos a partir de carrito
        carrito.forEach((item) => {
        
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');


            miNodo.textContent = `${item.aproducto.count} x ${item.aproducto.nombre} - ${item.aproducto.precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item.aproducto.id;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        })
        DOMtotal.textContent = calcularTotal();
        document.getElementById("catBuys").innerHTML=cantElement();
    }
   
}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    let id = evento.target.dataset.item;


    carrito= carrito.filter(item => item.aproducto.id != id)

    // volvemos a renderizar
    miLocalStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
 


}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {

    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        /*  const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });*/
        // Los sumamos al total
        return total + item.aproducto.precio * item.aproducto.count;
    }, 0).toFixed(2);
}

/**
* Varia el carrito y vuelve a dibujarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados

    carrito = [];
    // Borra LocalStorage
    miLocalStorage.clear();
    // Renderizamos los cambios
    renderizarCarrito();

    document.getElementById("total").innerHTML = "0";
    document.getElementById("catBuys").innerHTML = "0";



}

function guardarCarritoEnLocalStorage(elemento) {
    // miLocalStorage.setItem('carrito', JSON.stringify(carrito));

    carrito = miLocalStorage.getItem("carrito");
    var aproducto = elemento;
    if (carrito === null) {
        carrito = [{ aproducto }]
        miLocalStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        carrito = JSON.parse(carrito);

        let id = elemento.id;

        let pos = carrito.find(element => element.aproducto.id === id) ?? -1
        // console.log("pos"+pos);
        if (pos < 0) {

            carrito.push({ aproducto });
        } else {

            aproducto = pos;
            //  aproducto=carrito.pop(pos);

            aproducto.aproducto.count += 1;
            //  carrito.push( aproducto );      
        }

        miLocalStorage.setItem("carrito", JSON.stringify(carrito));

    }
    document.getElementById("catBuys").innerHTML =cantElement();
}


function cargarCarritoDeLocalStorage() {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

  


      function cantElement(){
 
        return carrito.reduce((total, item) => {            
            return total + item.aproducto.count;
        }, 0);
      }

      cargarCarritoDeLocalStorage
      renderizarCarrito();