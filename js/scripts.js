// Variables
const baseDeDatos = [
    {
        id: 1,
        descripcion: 'Consola Nintendo Switch',
        precio: 1250,
        imagen: './img/nintendo-switch.jpeg',
        unidades: 3
    },
    {
        id: 2,
        descripcion: 'Consola Nintendo Switch',
        precio: 135,
        imagen: 'img/nintendo-switch.jpeg',
        unidades: 5
    },
    {
        id: 3,
        descripcion: 'Consola Nintendo Switch',
        precio: 44,
        imagen: 'img/nintendo-switch.jpeg',
        unidades: 7
    },
    {
        id: 4,
        descripcion: 'Consola Nintendo Switch',
        precio: 500,
        imagen: 'img/nintendo-switch.jpeg',
        unidades: 4
    }

];

let carrito = [];
let productosAnadidos = [];



//let sumaTotal = 0;
//let sumaParcial = 0;
let precioTotal = 0;

const divisa = '€';
const DOMitems = document.getElementsByClassName('items');
const DOMcarrito = document.getElementsByClassName('carrito');
const DOMtotal = document.getElementsByClassName('total');
const DOMbotonVaciar = document.getElementsByClassName('boton-vaciar');

console.log(DOMitems);
//console.log(DOMcarrito);
/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
 function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
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
        // Boton Agregar
        const miNodoBotonAgregar = document.createElement('button');
        miNodoBotonAgregar.classList.add('btn', 'btn-success','mt-2','mb-2',`btn-${info.id}`);
        miNodoBotonAgregar.textContent = 'AGREGAR A LA CESTA';
        miNodoBotonAgregar.setAttribute('marcador', info.id);
        miNodoBotonAgregar.addEventListener('click', anyadirProductoAlCarrito);
        
        
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoCodigo);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoUnidades);
        miNodoCardBody.appendChild(miNodoBotonAgregar);
        miNodo.appendChild(miNodoCardBody);
 
        DOMitems[0].appendChild(miNodo);
        
    });
}
/**
 * Dibuja todos los productos guardados en el carrito
 */
 function renderizarCarrito() {
    // Vaciamos todo el html
    //DOMcarrito[0].innerHTML = '';

            if(carrito.length == 0){
                console.log("CARRITO VACIO");
                DOMcarrito[0].innerHTML = '';
               
            }else{
        
                console.log("ENTRO AQUI");
         //const miNodo = document.createElement('li');
        //miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        /*miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].descripcion} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito[0].appendChild(miNodo);*/
   
    // Renderizamos el precio total en el HTML
    //DOMtotal.textContent = calcularTotal();
            carrito.forEach((id)=>{

                baseDeDatos.forEach((miItem)=>{

                if(id==miItem.id){
                    // Estructura
                const miNodo = document.createElement('div');
                miNodo.classList.add('card');
                // Body
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');

               
               
                if(!productosAnadidos.includes(miItem.id)){
                    productosAnadidos.push(miItem.id);

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
                            console.log("Productos ahora: " +contarProductos(miItem.id) );
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
                            DOMcarrito[0].appendChild(miNodo);

                }else{
                    if(carrito.length!=0){
                        console.log("fdfsfsd" + carrito.length);
                        document.getElementsByClassName(`cantidad-${miItem.id}`)[0].innerHTML = `${contarProductos(miItem.id)} x ${miItem.descripcion} - ${miItem.precio}*${contarProductos(miItem.id)}${divisa}`;
                        document.getElementsByClassName(`precio-${miItem.id}`)[0].innerHTML =`${parseInt(contarProductos(miItem.id))*miItem.precio}${divisa}`;
                    }

                }

                }
                

            });
        });

    }     
    
        
        document.getElementsByClassName('total')[0].innerHTML = precioTotal;


        
        

       
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
    console.log(miItem);
    const unidades = document.getElementsByClassName(`unidades-${miItem[0].id}`);
    const btn = document.getElementsByClassName(`btn-${miItem[0].id}`);
    console.log("AQUI: " + unidades[0].textContent);
    if(miItem[0].unidades!=0){
        miItem[0].unidades --;
    }

    if(miItem[0].unidades==0){
        btn[0].disabled = true;
    }
    unidades[0].innerHTML=`<p class="card-text unidades-${miItem[0].id}">Unidades disponibles: ${miItem[0].unidades} </p>`;
    

    //console.log(miItem[0].precio);
    precioTotal = precioTotal + parseInt(miItem[0].precio);
    
    carrito.push(e.currentTarget.getAttribute('marcador'));


   
  
   
    // Actualizamos el carrito 
   renderizarCarrito();

}

//Contar elementos de cada id de producto
function contarProductos(id){
    cont = 0;
    carrito.forEach((i)=>{
        if(id==i){
            cont++;
        }
    });
    return cont;
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
    console.log("ERROR: " + miItem[0]);
    if(contarProductos(miItem[0].id)!=0){
        miItem[0].unidades ++;
    }

    if(contarProductos(miItem[0].id)==0){
        btnEliminar[0].disabled=true;
    }
    
    unidades[0].innerHTML=`<p class="card-text unidades-${miItem[0].id}">Unidades disponibles: ${miItem[0].unidades} </p>`;
    if(miItem[0].unidades >0){
        btnAgregar[0].disabled = false;
    }
    if(precioTotal==0){
        precioTotal=0;
    }else{
        precioTotal = precioTotal - parseInt(miItem[0].precio);
    }
    

    
    console.log("antes: " + carrito);
    for(var i=0;i<carrito.length;i++){
        if(carrito[i] == id){
            carrito.splice(i,1);
            break;
        }
    }
    console.log("despues: " + carrito);
    console.log("longitud: " + carrito.length);
    renderizarCarrito(); 

}









