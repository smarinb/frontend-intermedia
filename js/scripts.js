


// Variables
let baseDeDatos = [
    {
        id: 1,
        descripcion: 'Consola Nintendo Switch',
        precio: 345,
        imagen: './img/nintendo-switch.jpeg',
        unidades: 10,
        categoria:'videoconsolas'
    },
    {
        id: 2,
        descripcion: 'Thermomix',
        precio: 990,
        imagen: 'img/thermomix.jpeg',
        unidades: 5,
        categoria:'electrodomesticos'
    },
    {
        id: 3,
        descripcion: 'Rosas San Valentin',
        precio: 59,
        imagen: 'img/rosas.jpeg',
        unidades: 7,
        categoria:'plantas'
    },
    {
        id: 4,
        descripcion: 'Sofá',
        precio: 599,
        imagen: 'img/sofa.jpeg',
        unidades: 4,
        categoria: 'sofas'
    },
    {
        id: 5,
        descripcion: 'Consola PS5',
        precio: 499.95,
        imagen: './img/ps5.jpeg',
        unidades: 10,
        categoria:'videoconsolas'
    },
    {
        id: 6,
        descripcion: 'Consola PS5',
        precio: 499.95,
        imagen: './img/ps5.jpeg',
        unidades: 10,
        categoria:'videoconsolas'
    }

];



let carrito = [];
let productosAnadidos = [];



let categorias = ["videoconsolas","electrodomesticos","plantas","sofas"];
if(JSON.parse(localStorage.getItem("categorias"))!=null){
    console.log("entro aqui");
    categorias = JSON.parse(localStorage.getItem("categorias"));

}

if(JSON.parse(localStorage.getItem("productos"))!=null){
    console.log("PRODUCTO");
    baseDeDatos = JSON.parse(localStorage.getItem("productos"));

}






//let sumaTotal = 0;
//let sumaParcial = 0;
let precioTotal = 0;

const divisa = '€';

//Contenedor donde iran las categorias
const DOMContenedor = document.getElementById('accordion');

//const DOMitems = document.getElementById('items');
const DOMtest = document.getElementById('test');
const DOMcarrito = document.getElementById('carrito');
const DOMtotal = document.getElementById('total');
const DOMbotonVaciar = document.getElementsByClassName('boton-vaciar');
const DOMbotonComprar = document.getElementById('boton-comprar');
DOMbotonComprar.addEventListener('click',realizarPedido);

const miNodoBotonEliminarCarrito = document.getElementById('boton-vaciar');
miNodoBotonEliminarCarrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito(){
    document.getElementById('carrito').innerHTML = '';
    document.getElementById('total').innerHTML = '';
    carrito = [];
    precioTotal = 0;
}





function realizarPedido(){
    if(carrito.length !=0){
        swal({
            title: "¿Estas seguro de que quieres realizar la compra. No podrás dar marcha atras?",
            text: "Una vez realizada la compra no habrá marcha atras... ",
            icon: "info",
            buttons: true,
            dangerMode: false,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("!Compra realizada con exito!", {
                icon: "success",
              });
              document.getElementById('carrito').innerHTML = '';
                document.getElementById('total').innerHTML = '';
                carrito = [];
                precioTotal = 0;
            } else {
              swal("Pareces indeciso, piensatelo más antes de ir a pagar!");
            }
          });
       /* var resultado = window.confirm('¿Estas seguro de que quieres realizar la compra. No podrás dar marcha atras?');
            if (resultado === true) {

                window.alert('Compra realizada con exito.');
                document.getElementById('carrito').innerHTML = '';
                document.getElementById('total').innerHTML = '';
                carrito = [];
                precioTotal = 0;
            } else { 
                window.alert('Pareces indeciso, piensatelo más antes de ir a pagar');
            }*/
    }else{
        swal({icon:'warning',
              text:'El carrito esta vacio antes tiene que añadir al menos un producto'
            });
    }
    
}

function renderizarCategorias(){
    categorias.forEach((categoria =>{
        //Titulo de la categoria
        const headerCategoria = document.createElement('h3');
        headerCategoria.classList.add(`h3-${categoria}`);
        headerCategoria.innerHTML = categoria;

        //Nodo para los items de cada categoria

        const nodoItemsCateoria = document.createElement('div');
        nodoItemsCateoria.classList.add('row',`items-${categoria}`);

        //Añadir el header y el nodo al contenedor
        DOMContenedor.appendChild(headerCategoria);
        DOMContenedor.appendChild(nodoItemsCateoria);


    }));
}



 function renderizarProductos() {
    renderizarCategorias();

    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add(`card-body`);
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid',`img-${info.id}`);
        miNodoImagen.setAttribute('src', info.imagen);
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.descripcion;
        // Codigo
        const miNodoCodigo = document.createElement('p');
        miNodoCodigo.classList.add('card-text');
        miNodoCodigo.textContent = `Código: ${info.id}`;
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `Precio: ${info.precio}${divisa}`;
        // Unidades
        const miNodoUnidades = document.createElement('p');
        miNodoUnidades.classList.add('card-text');
        miNodoUnidades.classList.add(`unidades-${info.id}`);
        miNodoUnidades.textContent = `Unidades disponibles: ${info.unidades}`;
        //Categoria
        const categoria = info.categoria;
        // Boton Agregar
        const miNodoBotonAgregar = document.createElement('button');
        miNodoBotonAgregar.classList.add('btn', 'btn-success','mt-2','mb-2',`btn-${info.id}`);
        miNodoBotonAgregar.textContent = 'AGREGAR A LA CESTA';
        miNodoBotonAgregar.setAttribute('marcador', info.id);
        miNodoBotonAgregar.addEventListener('click', anyadirProductoAlCarrito);
        if(info.unidades==0){
            miNodoBotonAgregar.disabled =true;
            miNodoImagen.style.opacity=0.5;
        }
            
        
        
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoCodigo);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoUnidades);
        miNodoCardBody.appendChild(miNodoBotonAgregar);
        miNodo.appendChild(miNodoCardBody);
        
        var DOMitem = document.getElementsByClassName(`items-${categoria}`)[0]; 
        DOMitem.appendChild(miNodo);
        
        
        
    });
}

function devolverProducto(id){
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
        // ¿Coincide las id? Solo puede existir un caso
        return itemBaseDatos.id == id;
    });
    return miItem[0];
}

//Contar elementos de cada id de producto
function contarProductos(id){
    cont = 0;
    for(var i=0;i<carrito.length;i++){
        if(carrito[i]==id){
            cont++;
        }
    }
    return cont;
}


 function renderizarCarrito() {
   DOMcarrito.innerHTML = '';
   

            if(carrito.length == 0){
                console.log("CARRITO VACIO");
                DOMcarrito.innerHTML = '';
               
            }else{
        
              
                
 
            carrito.forEach((id)=>{
                

                const miItem = devolverProducto(id);
               

                if(document.getElementsByClassName(`card-${id}`)[0]==null){

                
                
                    // Estructura
                const miNodo = document.createElement('div');
                miNodo.classList.add(`card-${id}`);
                // Body
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add(`card-body-${id}`);

               

               
               
                //if(!productosAnadidos.includes(miItem.id)){
                  //  productosAnadidos.push(miItem.id);
                   
                    //if(contarProductos(id)==1){

                            // Imagen
                            const miNodoImagen = document.createElement('img');
                            miNodoImagen.classList.add('img-fluid');
                            miNodoImagen.setAttribute('src', miItem.imagen);
                            // Titulo
                            const miNodoTitle = document.createElement('h5');
                            miNodoTitle.classList.add('card-title');
                            miNodoTitle.textContent = miItem.descripcion;
                            // Codigo
                            const miNodoCodigo = document.createElement('p');
                            miNodoCodigo.classList.add('card-text');
                            miNodoCodigo.textContent = `Código: ${miItem.id}`;

                            //Precio Relativo
                            const miNodoPrecioRel = document.createElement('p');
                            miNodoPrecioRel.classList.add('card-text');
                            miNodoPrecioRel.classList.add(`cantidad-${miItem.id}`);
                            miNodoPrecioRel.textContent = `${contarProductos(miItem.id)} x ${miItem.descripcion}`;
                            const precio = document.createElement('p');
                            precio.classList.add('card-text',`precio-${miItem.id}`);
                            
                            precio.textContent = `${parseInt(contarProductos(miItem.id))*miItem.precio}${divisa}`;
                            // Boton Eliminar
                            const miNodoBotonEliminar = document.createElement('button');
                            miNodoBotonEliminar.classList.add('btn', 'btn-danger','mt-2','mb-2',`btn-eliminar-${miItem.id}`);
                            miNodoBotonEliminar.textContent = 'ELIMINAR DE LA CESTA';
                            miNodoBotonEliminar.setAttribute('marcador', miItem.id);
                            miNodoBotonEliminar.addEventListener('click', eliminarProductoDelCarrito);
                            // Insertamos
                            miNodoCardBody.appendChild(miNodoImagen);
                            miNodoCardBody.appendChild(miNodoTitle);
                            miNodoCardBody.appendChild(miNodoCodigo);
                            miNodoCardBody.appendChild(miNodoPrecioRel);
                            miNodoCardBody.appendChild(precio);
                            miNodoCardBody.appendChild(miNodoBotonEliminar);
                            miNodo.appendChild(miNodoCardBody);
                            DOMcarrito.appendChild(miNodo);

                }else{
                    
                        
                        console.log("fdfsfsd" + carrito.length);
                        document.getElementsByClassName(`cantidad-${miItem.id}`)[0].innerHTML=`${contarProductos(miItem.id)} x ${miItem.descripcion}`;
                        document.getElementsByClassName(`precio-${miItem.id}`)[0].innerHTML = `${parseInt(contarProductos(miItem.id))*miItem.precio}${divisa}`;
                    

                }

                
                

          
        });

    }     
    
        
        document.getElementById('total').innerHTML = precioTotal;


        
        

       
}
/**
 * Evento para añadir un producto al carrito de la compra
 */
 function anyadirProductoAlCarrito(e) {
    
    // Anyadimos el Nodo a nuestro carrito
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
        // ¿Coincide las id? Solo puede existir un caso
        return itemBaseDatos.id == parseInt(e.currentTarget.getAttribute('marcador'));
    });

    const unidades = document.getElementsByClassName(`unidades-${miItem[0].id}`);
    const btn = document.getElementsByClassName(`btn-${miItem[0].id}`);
   
    if(miItem[0].unidades!=0){
        miItem[0].unidades --;
    }

    if(miItem[0].unidades==0){
        btn[0].disabled = true;
        document.getElementsByClassName(`img-${miItem[0].id}`)[0].style.opacity = 0.5;
       
    }
    unidades[0].innerHTML=`<p class="card-text unidades-${miItem[0].id}">Unidades disponibles: ${miItem[0].unidades} </p>`;
    

    //console.log(miItem[0].precio);
    precioTotal = precioTotal + parseFloat(miItem[0].precio);
    
    carrito.push(e.currentTarget.getAttribute('marcador'));

    //productosAnadidos.push(e.currentTarget.getAttribute('marcador'));
   
  
   
    // Actualizamos el carrito 
   renderizarCarrito();

}




function eliminarProductoDelCarrito(e){
    id = parseInt(e.currentTarget.getAttribute('marcador'));
    
    
    // Anyadimos el Nodo a nuestro carrito
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
        // ¿Coincide las id? Solo puede existir un caso
        return itemBaseDatos.id == id;
    });
    const unidades = document.getElementsByClassName(`unidades-${miItem[0].id}`);
    const btnEliminar = document.getElementsByClassName(`btn-eliminar-${miItem[0].id}`);
    const btnAgregar = document.getElementsByClassName(`btn-${miItem[0].id}`);

    if(contarProductos(miItem[0].id)!=0){
        miItem[0].unidades ++; //al eliminar del carrito vuelve a subir el stock en 1 en cada click
    }

    if(contarProductos(miItem[0].id)==0){
        btnEliminar[0].disabled=true; //si no esta ese producto en el carrito el boton de eliminar se deshabilita
    }
    
    unidades[0].innerHTML=`<p class="card-text unidades-${miItem[0].id}">Unidades disponibles: ${miItem[0].unidades} </p>`;
    if(miItem[0].unidades >0){
        btnAgregar[0].disabled = false; //si vuelve haber stock habilito el boton de agregar
        document.getElementsByClassName(`img-${miItem[0].id}`)[0].style.opacity = 1;
    }
    if(precioTotal==0){ //si ya el precio es 0 no resto más
        precioTotal=0;
    }else{
        precioTotal = precioTotal - parseInt(miItem[0].precio); //al eliminar del carrito resto su valor
    }
    

    
      //eliminamos del carrito 
    for(var i=0;i<carrito.length;i++){
        if(carrito[i] == id){
            carrito.splice(i,1);
            break;
        }
    }
   
    renderizarCarrito(); 

}

function exiteId(id){
    let exite= false;

    baseDeDatos.forEach((producto)=>{
        if(producto.id == id)
            exite = true;
    })
    return exite;
}


function exiteCategoria(categoria){
    let exite= false;

    categorias.forEach((c)=>{
        if(categoria == c)
            exite = true;
    })
    return exite;
}








