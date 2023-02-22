/*Pre Entrega 3 - Calculadora de pago de cuotas - (La calculadora solicita ingresar los datos del producto/servicio (nombre, valor, coutas) y
 despues de terminar de ingresar todos los productos pregunta si se quiere ordenar, en caso de que no, muestra la lista con todos los productos y al final el pago mensual total*/

// Array que almacenará los productos
let productos = [];

// Variable que almacena el pago total mensual
let pagoTotalMensual = 0;

// Verificacion para saber si hay datos en el almacenamiento local
if (localStorage.getItem("productos") !== null) {
    productos = JSON.parse(localStorage.getItem("productos"));
    pagoTotalMensual = parseFloat(localStorage.getItem("pagoTotalMensual"));
  } else {
    productos = [];
    pagoTotalMensual = 0;
}

// Funcion para guardar los datos en el local storage cada vez que se agrega un producto
function guardarDatos() {
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("pagoTotalMensual", pagoTotalMensual.toString());
}

// Funcion para cargar los datos en el local storage
function cargarDatos() {
    let productosGuardados = localStorage.getItem("productos");
    if (productosGuardados !== null) {
      productos = JSON.parse(productosGuardados);
    }
}

// Funcion para borrar los datos del array
function borrarProductos() {
    productos = [];
    pagoTotalMensual = 0; // Reinicia el pago total mensual
    localStorage.removeItem("productos"); // Elimina los productos guardados en el almacenamiento local
    alert("Se han borrado todos los productos.");
}

// Función que pide al usuario los datos de un producto y los agrega al array de productos
function pedirProducto() {
    let productoInput = document.createElement("input");
    productoInput.placeholder = "Ingrese un producto/servicio";
    document.body.appendChild(productoInput);
  
    let valorInput = document.createElement("input");
    valorInput.placeholder = "Ingrese el valor del producto/servicio";
    valorInput.type = "number";
    document.body.appendChild(valorInput);
  
    let cuotasInput = document.createElement("input");
    cuotasInput.placeholder = "Ingrese a cuántas cuotas se va a pagar";
    cuotasInput.type = "number";
    document.body.appendChild(cuotasInput);
  
    let boton = document.createElement("button");
    boton.innerHTML = "Agregar";
    boton.onclick = function() {
      let producto = productoInput.value;
      let valor = parseInt(valorInput.value);
      let cuotas = parseInt(cuotasInput.value);
  
      // Calcula el pago mensual del producto
      let pagoMensual = valor / cuotas;
  
      // Añade el pago mensual al pago total mensual
      pagoTotalMensual += pagoMensual;
  
      // Crea un objeto que representa el producto y lo agrega al array de productos
      let productoObjeto = {
        nombre: producto,
        valor: valor,
        cuotas: cuotas,
        pagoMensual: pagoMensual
      };
  
      productos.push(productoObjeto); //Guardar el producto en el array
      guardarDatos(); // Guarda los datos en el almacenamiento local
      // Elimina los inputs y el botón de la pantalla
      productoInput.remove();
      valorInput.remove();
      cuotasInput.remove();
      boton.remove();
  
      continuar();
    };
    document.body.appendChild(boton);
}

// Función que muestra los productos en el orden en que se encuentran en el array
function mostrarProductos() {
    
    // Obtenemos el contenedor actual de la lista de productos
    let contenedorActual = document.getElementById("contenedor-productos");

    // Si el contenedor actual existe, lo removemos
    if (contenedorActual) {
    contenedorActual.parentNode.removeChild(contenedorActual);
    }

    // Creamos un nuevo contenedor para la lista de productos
    let contenedor = document.createElement("div");
    contenedor.id = "contenedor-productos";

    // Creamos la tabla de productos y la añadimos al div contenedor
    let tabla = document.createElement("table");
    let cabecera = tabla.createTHead();
    let filaCabecera = cabecera.insertRow();
    let celdaCabecera1 = filaCabecera.insertCell();
    celdaCabecera1.innerHTML = "Producto";
    let celdaCabecera2 = filaCabecera.insertCell();
    celdaCabecera2.innerHTML = "Valor";
    let celdaCabecera3 = filaCabecera.insertCell();
    celdaCabecera3.innerHTML = "Cuotas";
    let celdaCabecera4 = filaCabecera.insertCell();
    celdaCabecera4.innerHTML = "Pago mensual";

    // Crear el cuerpo de la tabla y agregar los productos
    let cuerpo = tabla.createTBody();
    for (let i = 0; i < productos.length; i++) {
      let fila = cuerpo.insertRow();
      let celda1 = fila.insertCell();
      celda1.innerHTML = productos[i].nombre;
      let celda2 = fila.insertCell();
      celda2.innerHTML = "$" + productos[i].valor;
      let celda3 = fila.insertCell();
      celda3.innerHTML = productos[i].cuotas;
      let celda4 = fila.insertCell();
      celda4.innerHTML = "$" + productos[i].pagoMensual.toFixed(2);
    }
  
    contenedor.appendChild(tabla);
    document.body.appendChild(contenedor);
    
    // Creamos un div para contener el botón de borrar productos
    let divBotonBorrar = document.createElement("div");
    
    // Creamos el botón de borrar productos y lo añadimos al divBotonBorrar
    let botonBorrar = document.createElement("button");
    botonBorrar.innerHTML = "Borrar productos";
    botonBorrar.addEventListener("click", borrarProductos);
    divBotonBorrar.appendChild(botonBorrar);
  
  // Agregamos el divBotonBorrar al nuevo contenedor
  contenedor.appendChild(divBotonBorrar);
}

// Función para preguntar si se quiere ingresar otro producto
function continuar() {
    let div = document.createElement("div");
  
    let pregunta = document.createElement("p");
    pregunta.innerHTML = "¿Desea ingresar otro producto/servicio? (s/n)";
    div.appendChild(pregunta);
  
    let input = document.createElement("input");
    input.type = "text";
    input.id = "respuesta";
    div.appendChild(input);
  
    let boton = document.createElement("button");
    boton.innerHTML = "Aceptar";
    boton.addEventListener("click", function() {
      let seguir = input.value;
      if (seguir === "s") {
        pedirProducto();
      } else if (seguir === "n") {
        preguntarOrdenar();
        guardarDatos();
      } else {
        alert("No se reconoce el comando, por favor ingresar solo S/N");
        continuar();
      }
      div.remove(); // Elimina el nodo que contiene la pregunta y los botones
    });
    div.appendChild(boton);
  
    document.body.appendChild(div);
}

function preguntarOrdenar() {
    const ordenarDiv = document.createElement("div");
    ordenarDiv.innerHTML = "<p>¿Desea ordenar los valores? (s/n)</p>";

    const ordenarInput = document.createElement("input");
    ordenarInput.setAttribute("type", "text");

    const ordenarButton = document.createElement("button");
    ordenarButton.innerText = "Ordenar";

    ordenarDiv.appendChild(ordenarInput);
    ordenarDiv.appendChild(ordenarButton);

    document.body.appendChild(ordenarDiv);

    ordenarButton.addEventListener("click", () => {
        const ordenar = ordenarInput.value;
        switch (ordenar) {
            case "s":
                const opcionOrdenarDiv = document.createElement("div");
                opcionOrdenarDiv.innerHTML = "<p>1: ordenar de mayor a menor por valor de los productos<br>" + 
                                       "2: ordenar de menor a mayor por valor de los productos<br>" + 
                                       "3: ordenar por mayor cantidad de cuotas<br>" + 
                                       "4: ordenar por menor cantidad de cuotas</p>";

                const opcionOrdenarInput = document.createElement("input");
                opcionOrdenarInput.setAttribute("type", "text");

                const opcionOrdenarButton = document.createElement("button");
                opcionOrdenarButton.innerText = "Aceptar";

                opcionOrdenarDiv.appendChild(opcionOrdenarInput);
                opcionOrdenarDiv.appendChild(opcionOrdenarButton);

                document.body.appendChild(opcionOrdenarDiv);

                opcionOrdenarButton.addEventListener("click", () => {
                    const opcionOrdenar = opcionOrdenarInput.value;
                    switch (opcionOrdenar) {
                        case "1":
                            productos.sort((a, b) => b.valor - a.valor);
                            mostrarProductos();
                            break;
                        case "2":
                            productos.sort((a, b) => a.valor - b.valor);
                            mostrarProductos();
                            break;
                        case "3":
                            productos.sort((a, b) => b.cuotas - a.cuotas);
                            mostrarProductos();
                            break;
                        case "4":
                            productos.sort((a, b) => a.cuotas - b.cuotas);
                            mostrarProductos();
                            break;
                        default:
                            alert("No se reconoce el comando, por favor ingresar solo números del 1 al 4");
                            preguntarOrdenar();
                            break;
                    }
                    opcionOrdenarDiv.remove(); // remover la segunda pregunta después de responder
                });
                break;
            case "n":
                mostrarProductos();
                break;
            default:
                alert("No se reconoce el comando, por favor ingresar solo S/N");
                preguntarOrdenar();
                break;
        }
        ordenarDiv.remove(); // remover la primera pregunta después de responder
    });
}

// Ejecutar la función principal
document.addEventListener("DOMContentLoaded", function() {
    // Funcion para que el usuario pueda seguir cargando productos con un boton
    function botonCargarProducto() {
      let botonCargar = document.createElement("button");
      botonCargar.innerHTML = "Cargar producto";
      botonCargar.addEventListener("click", function() {
        pedirProducto();
      });
      document.body.appendChild(botonCargar);
    }
  
    botonCargarProducto();
});