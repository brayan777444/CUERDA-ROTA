let carrito = JSON.parse(localStorage.getItem('carro')) || [];

// Función para agregar productos normales (sin descuento, sin login)
function agregarAlCarrito(nombre, precio) {
    let producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carro', JSON.stringify(carrito));
    mostrarCarrito(); 
    mostrarCarritoDeslizar(); 
    alert(`✅ "${nombre}" se ha añadido al carrito.`);
}

// Función para agregar productos en descuento (requiere login)
function agregarDescuento(nombre, precio) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        alert("🚫 Debes iniciar sesión o registrarte para agregar productos al carrito.");
        mostrarSeccion("iniciarSesion");
        return;
    }

    let producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carro', JSON.stringify(carrito));
    mostrarCarrito(); 
    mostrarCarritoDeslizar(); 
    alert(`✅ "${nombre}" se ha añadido al carrito.`);
}




// Función para mostrar el carrito
function mostrarCarrito() {
    let listaCarrito = document.getElementById('lista-carrito');
    let totalElement = document.getElementById('total');
    listaCarrito.innerHTML = ""; // Limpiar lista antes de mostrar productos
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        carrito.forEach((producto, index) => {
            let item = document.createElement('div');
            item.innerHTML = `
                <p>${producto.cantidad} x ${producto.nombre} - ${producto.precio * producto.cantidad} Bs</p>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            listaCarrito.appendChild(item);
            total += producto.precio * producto.cantidad;
        });
    }

    totalElement.innerText = total.toFixed(2); // Mostrar total con 2 decimales
}

// Función para eliminar productos del carrito
function eliminarProducto(index) {
    // Eliminar el producto del array del carrito
    carrito.splice(index, 1);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carro', JSON.stringify(carrito));

    // Volver a mostrar el carrito
    mostrarCarrito();
}

// Función para mostrar el carrito con efecto deslizante
function mostrarCarritoDeslizar() {
    let carroDiv = document.getElementById('carro');
    carroDiv.classList.add('mostrar'); // Agregar la clase para deslizar el carrito
    carroDiv.style.display = "block"; // Asegurarse de que el carrito se muestre
}

// Función para cerrar el carrito
function cerrarCarrito() {
    let carroDiv = document.getElementById('carro');
    carroDiv.style.display = "none"; // Ocultar el carrito
}
function enviarPorWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Hola, quiero hacer el siguiente pedido:\n";
    carrito.forEach(producto => {
        mensaje += `- ${producto.cantidad} x ${producto.nombre} = ${producto.precio * producto.cantidad} Bs\n`;
    });

    let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    mensaje += `\nTotal: ${total.toFixed(2)} Bs`;

    // Guardar la venta en localStorage
    let ventas = JSON.parse(localStorage.getItem("reporteVentas")) || [];

    let fechaActual = new Date().toLocaleString(); // Fecha y hora

    carrito.forEach(producto => {
        ventas.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
            fecha: fechaActual
        });
    });

    localStorage.setItem("reporteVentas", JSON.stringify(ventas));

    // Vaciar el carrito
    carrito = [];
    localStorage.setItem("carro", JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar interfaz

    // Redirigir a WhatsApp
    let numero = "59167607710";
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

function mostrarQR() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    document.getElementById("totalQR").innerText = total.toFixed(2);
    document.getElementById("modalQR").style.display = "flex";
}

function cerrarQR() {
    document.getElementById("modalQR").style.display = "none";
}





// Función para mostrar las secciones
function mostrarSeccion(seccion) {
    const secciones = ['inicio', 'servicios', 'carro', 'contacto', 'iniciarSesion','charangos', 'guitarra', 'teclado', 'violin', 'accesorio','reporteVentas'];
    // Ocultar todas las secciones
    secciones.forEach(s => {
        const elem = document.getElementById(s);
        if (elem) elem.style.display = "none";
    });
    // Mostrar la sección seleccionada
    const seccionElemento = document.getElementById(seccion);
    if (seccionElemento) seccionElemento.style.display = "block";
}

// Mostrar Inicio
function mostrarInicio() {
    mostrarSeccion('inicio');
}

// Mostrar Servicios
function mostrarServicios() {
    mostrarSeccion('servicios');
}

// Mostrar Contacto
function mostrarContacto() {
    mostrarSeccion('contacto');
}

function iniciarSesion(){
    mostrarSeccion('iniciarSesion');

}

// Funciones para mostrar productos específicos
function mostrarCharango() {
    mostrarSeccion('charangos');
}

function mostrarGuitarra() {
    mostrarSeccion('guitarra');
}

function mostrarTeclados() {
    mostrarSeccion('teclado');
}

function mostrarViolines(){
    mostrarSeccion('violin');
}

function mostrarAccesorios(){
    mostrarSeccion('accesorio');
}
// Al cargar la página, mostrar el carrito si hay productos
document.addEventListener("DOMContentLoaded", mostrarCarrito);



  
  

  










 
