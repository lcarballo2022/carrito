var myProducts=new Object();

function add(id, nombreProducto, descripcionProducto){
  myProducts.id=id;
  myProducts.nombre=nombreProducto;
  myProducts.deciption=descripcionProducto;
  myProducts.foto="https://picsum.photos/80/80" ;
    Swal.fire({
        title: 'Esta seguro?',
        text: "Esta seguro que desea agregarlo al carrito!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {   
       /*     var addProducts= JSON.parse(localStorage.getItem("product"));
            console.log(addProducts);
*/
            localStorage.setItem("product_"+id, JSON.stringify(myProducts));
            Swal.fire("¡Agregado!", "", "success");
          } else{
            Swal.fire("Has cancelado", "", "info");
          }
      })
}

