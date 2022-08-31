var myProducts=new Object();
var products=[];

function add(id, nombreProducto, descripcionProducto, aprice){
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
           // localStorage.setItem("product_"+id, JSON.stringify(myProducts));
           myProducts.id=id;
           myProducts.nombre=nombreProducto;
           myProducts.deciption=descripcionProducto;
           myProducts.foto="https://picsum.photos/80/80" ;
           myProducts.price=aprice;
         
           products.push(myProducts);
           document.getElementById("catBuys").innerHTML=products.length;
            Swal.fire("¡Agregado!", "", "success");
          } else{
            Swal.fire("Has cancelado", "", "info");
          }
      })
}
function show(){
  let productShow="";
  let acumulador=0;
  for (let i = 0; i < products.length; i++) {
    productShow=productShow+products[i].nombre +"- $"+ products[i].price+"<br>"
  }
  let total=products.reduce(
    (acumulador, p) => acumulador + parseInt(p.price),
    0
  );
  document.getElementById("comprado").innerHTML = productShow + " total:$ "+ total
  
}
