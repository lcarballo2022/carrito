
//   document.addEventListener('DOMContentLoaded', () => {

baseDeDatos = [
  {
    id: 1,
    name: "Tirador",
    description: "Este es un tirador muy lindo y esta de todos los personajes de Disney",
    price: "150"
  },
  {
    id: 2,
    name: "Medias",
    description: "Par de medias de todos los personajes de Disney",
    price: "157"
  }
  ,
  {
    id: 3,
    name: "Remeras",
    description: "Remeras de todos los personajes de Disney",
    price: "750"
  }
]

var carrito = [];

const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;

function add(id, nombre, precio, imagen) {
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




function addEl(id) {


  let pos = baseDeDatos.find(element => element.id === id) ?? -1

  let nombre = pos.name;
  let precio = pos.price;


  Swal.fire({
    title: 'Esta seguro?',
    text: "Esta seguro que desea agregar 1 x " + nombre + " al carrito!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {

      var elemento = new Object();

      elemento.id = id;
      elemento.nombre = nombre;
      elemento.precio = precio;

      elemento.count = 1;

      guardarCarritoEnLocalStorage(elemento);

      renderizarCarrito();
      Swal.fire("¡Agregado!", "", "success");
    } else {
      Swal.fire("Has cancelado", "", "info");
    }
  })
}
// Funciones



/**
* Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito() {

  carrito = JSON.parse(miLocalStorage.getItem("carrito"));
  // Vaciamos todo el html
  DOMcarrito.textContent = '';

  if (carrito!= null) /*{
    DOMtotal.textContent = "0";
    document.getElementById("catBuys").innerHTML = "0";
  } else */{
    // Generamos los Nodos a partir de carrito
    carrito.forEach((item) => {

      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');


      miNodo.textContent = `${item.aproducto.count} x ${item.aproducto.nombre} - ${parseFloat(item.aproducto.precio).toFixed(2)}${divisa}`;
      // Boton de borrar
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-0');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item.aproducto.id;
      miBoton.addEventListener('click', borrarItemCarrito);

      const miBotonAdd = document.createElement('button');
      miBotonAdd.classList.add('btn', 'btn-success', 'mx-0');
      miBotonAdd.textContent = '+';

      miBotonAdd.dataset.item = item.aproducto.id;
      miBotonAdd.addEventListener('click', addElement);

      const miBotonRem = document.createElement('button');
      miBotonRem.classList.add('btn', 'btn-danger', 'mx-0');
      miBotonRem.textContent = '-';

      miBotonRem.dataset.item = item.aproducto.id;
      miBotonRem.addEventListener('click', remElement);
      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      miNodo.appendChild(miBotonAdd);
      miNodo.appendChild(miBotonRem);
      DOMcarrito.appendChild(miNodo);
    })
    DOMtotal.textContent = calcularTotal() + divisa;
    document.getElementById("catBuys").innerHTML = cantElement();
  }
  DOMtotal.textContent = calcularTotal() + divisa;
  document.getElementById("catBuys").innerHTML = cantElement();
}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  let id = evento.target.dataset.item;


  carrito = carrito.filter(item => item.aproducto.id != id)

  // volvemos a renderizar
  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();



}


function remElement(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  let id = parseInt(evento.target.dataset.item);



  let pos = carrito.find(element => element.aproducto.id === id) ?? -1
  console.log("pos" + pos);
  if (pos < 0) {

    carrito.push({ aproducto });
  } else {

    aproducto = pos;
    //  aproducto=carrito.pop(pos);
    if (aproducto.aproducto.count > 1) {
      aproducto.aproducto.count -= 1;
    } else {
      carrito = carrito.filter(item => item.aproducto.id != id)
    }


  }

  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();


}


function addElement(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  let id = parseInt(evento.target.dataset.item);



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
  renderizarCarrito();


}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {

  // Recorremos el array del carrito 
  return carrito.reduce((total, item) => {
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

  document.getElementById("total").innerHTML = "0.00" + divisa;
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
  document.getElementById("catBuys").innerHTML = cantElement();
}


function cargarCarritoDeLocalStorage() {
  // ¿Existe un carrito previo guardado en LocalStorage?
  if (miLocalStorage.getItem('carrito') !== null) {
    // Carga la información
    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}




function cantElement() {

  return carrito.reduce((total, item) => {
    return total + item.aproducto.count;
  }, 0);
}



function renderizarProductos() {
  baseDeDatos.forEach((item) => {

    productoHtml = '<div class="card-body row ">'
      + ' <div id="caruselIndicador' + item.id + '" class="carousel slide col-6" data-bs-ride="carousel">'
      + '  <!--la barra de navegacion botones-->'
      + '   <div class="carousel-indicators">'
      + '       <button type="button" data-bs-target="#caruselIndicador' + item.id + '" data-bs-slide-to="0"'
      + '            class="active"></button>'
      + '        <button type="button" data-bs-target="#caruselIndicador' + item.id + '"'
      + '            data-bs-slide-to="1"></button>'
      + '        <button type="button" data-bs-target="#caruselIndicador' + item.id + '"'
      + '             data-bs-slide-to="2"></button>'
      + '    </div>'
      + '    <!--item-->'
      + '     <div class="carousel-inner">'
      + '        <div class="carousel-item active">'
      + '            <!--aca adentro se pone lo q quieras dentro del carusel-->'

      + '            <img src="https://picsum.photos/270/400" alt="imagen" class="d-block w-100">'
      + '         </div>'
      + '        <div class="carousel-item">'
      + '            <img src="https://picsum.photos/270/400" alt="imagen" class="d-block w-100">'
      + '        </div>'
      + '        <div class="carousel-item">'
      + '            <img src="https://picsum.photos/270/400" alt="imagen" class="d-block w-100">'
      + '        </div>'
      + '    </div>'
      + '    <!--flechitas para adelante y atras -contrles-->'
      + '    <button class="carousel-control-prev" type="button"'
      + '        data-bs-target="#caruselIndicador' + item.id + '" data-bs-slide="prev">'
      + '        <span class="carousel-control-prev-icon"></span>'
      + '    </button>'
      + '    <button class="carousel-control-next" type="button"'
      + '        data-bs-target="#caruselIndicador' + item.id + '" data-bs-slide="next">'
      + '         <span class="carousel-control-next-icon"></span>'
      + '    </button>'
      + ' </div>'
      + ' <div class="col-12 col-ms-12  col-md-12 col-lg-6">  '
      + '    <h5 class="card-title mb-3 fw-bold">' + item.name + '</h5>'
      + '    <span class="fw-bold card-price">' + divisa + parseFloat(item.price).toFixed(2) + '</span><br>'
      + '    <i class="fa-solid fa-star "></i>'
      + '     <i class="fa-solid fa-star "></i>'
      + '    <i class="fa-solid fa-star "></i>'
      + '    <i class="fa-solid fa-star "></i>'
      + '    <i class="fa-solid fa-star-half-stroke"></i>'

      + '     <p class="card-text">' + item.description
      + ' </p>'
      + '<p class="card-text my-3"><small class="text-muted">Shoes, T-shirt teen</small>'
      + '</p>'
      + '<div class="card-btn-container btn-buy">'

      + '<button type="button" class="btn border-button btn-buyItem" id=p' + item.id + " "
      + 'onclick="addEl(' + item.id + ')">'
      + ' <i class="fa-solid fa-cart-shopping "></i> Add to cart '

      + '</button>'
      + '<button type="button" class="btn border-button btn-buyItem">'
      + ' <i class="fa-regular fa-heart"></i>'
      + '</button>'
      + '<button type="button" class="btn border-button btn-buyItem">'
      + '<i class="fa-solid fa-arrow-up-right-from-square"></i>'
      + '</button>'
      + '</div>'
      + '    </div>'


      + '</div>    '
    document.getElementById("productChartList").innerHTML = document.getElementById("productChartList").innerHTML + productoHtml;
  })
 
}

/**
* Evento para añadir un producto al carrito de la compra
*/
function anyadirProductoAlCarrito(evento) {

  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute('marcador'))
  // Actualizamos el carrito 
  renderizarCarrito();
  // Actualizamos el LocalStorage
  guardarCarritoEnLocalStorage();
}

cargarCarritoDeLocalStorage
renderizarProductos();
renderizarCarrito();



