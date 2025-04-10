//admin edicion

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Mostrar u ocultar el enlace de Cerrar Sesión según el estado de la sesión
    if (usuarioActivo && usuarioActivo.admin) {
        document.querySelectorAll(".editar-productos").forEach(div => div.style.display = "block");
    } else {
        document.querySelectorAll(".editar-productos").forEach(div => div.style.display = "none");
    }

    // Recuperar los datos de localStorage y actualizar los productos
    const productoIds = ['guitarraDescuento', 'quenaDescuento', 'nuxDescuento', 'bossDescuento', 'gt1'];
    productoIds.forEach(idProducto => {
        const productoDatos = JSON.parse(localStorage.getItem(idProducto));
        if (productoDatos) {
            const producto = document.getElementById(idProducto);
            if (!producto) return;

            const imagen = producto.querySelector('img');
            const descripcion = producto.querySelector('.marca');
            const precioAnterior = producto.querySelector('.precio-anterior');
            const precioActual = producto.querySelector('.precio-actual');
            const precio = producto.querySelector('.precio');

            // Actualizar los valores del producto
            if (imagen) imagen.src = productoDatos.imagen;
            if (descripcion) descripcion.innerHTML = productoDatos.descripcion;
            if (precioAnterior) precioAnterior.innerHTML = productoDatos.precioAnterior;
            if (precioActual) precioActual.innerHTML = productoDatos.precioActual;
            if (precio) precio.innerHTML = productoDatos.precio;
        }
    });
});


// Habilitar la edición de los campos
function cambiarImagen(imagenId, inputId) {
    const inputFile = document.getElementById(inputId);
    inputFile.click(); // Simula un clic en el input de tipo file
}

// Función para actualizar la imagen
function actualizarImagen(imagenId, inputFile) {
    const imagen = document.getElementById(imagenId);
    const archivo = inputFile.files[0];

    if (archivo) {
        const reader = new FileReader();

        reader.onload = function(event) {
            imagen.src = event.target.result; // Actualiza la imagen con el archivo seleccionado
        };

        reader.readAsDataURL(archivo); // Convierte el archivo a un URL base64
    }
}

// Habilitar la edición de un producto
function habilitarEdicion(idProducto) {
    const producto = document.getElementById(idProducto);
    const imagen = producto.querySelector('img');
    const descripcion = producto.querySelector('.marca');
    const precioAnterior = producto.querySelector('.precio-anterior');
    const precioActual = producto.querySelector('.precio-actual');
    const archivoInput = producto.querySelector('input[type="file"]');

    // Activar edición
    imagen.style.pointerEvents = 'auto';  // Permite clic en la imagen
    descripcion.setAttribute('contenteditable', 'true');
    precioAnterior.setAttribute('contenteditable', 'true');
    precioActual.setAttribute('contenteditable', 'true');
    archivoInput.style.display = 'block'; // Muestra el input para cambiar la imagen

    alert('Modo de edición activado. Modifique el contenido y presione "Guardar cambios".');
}

// Guardar los cambios
function guardarCambios(idProducto) {
    const producto = document.getElementById(idProducto);
    const imagen = producto.querySelector('img').src; // Esto obtiene la URL base64 de la imagen
    const descripcion = producto.querySelector('.marca').innerHTML;
    const precioAnterior = producto.querySelector('.precio-anterior').innerHTML;
    const precioActual = producto.querySelector('.precio-actual').innerHTML;
    const archivoImagen = producto.querySelector('input[type="file"]');
    
    // Verifica si se seleccionó una nueva imagen
    const nuevaImagen = archivoImagen.files.length > 0 ? archivoImagen.files[0] : imagen;

    // Si se seleccionó una nueva imagen, convierte a base64 y guarda
    if (archivoImagen.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const productoDatos = {
                imagen: event.target.result,  // Guardamos la imagen como base64
                descripcion: descripcion,
                precioAnterior: precioAnterior,
                precioActual: precioActual
            };

            localStorage.setItem(idProducto, JSON.stringify(productoDatos));

            // Desactivar edición
            desactivarEdicion(idProducto);
            alert('Cambios guardados en localStorage.');
        };
        reader.readAsDataURL(archivoImagen.files[0]); // Convertir imagen a base64
    } else {
        // Si no se seleccionó una nueva imagen, guarda los otros cambios
        const productoDatos = {
            imagen: imagen,
            descripcion: descripcion,
            precioAnterior: precioAnterior,
            precioActual: precioActual
        };

        localStorage.setItem(idProducto, JSON.stringify(productoDatos));
        desactivarEdicion(idProducto);
        alert('Cambios guardados en localStorage.');
    }
}

// Desactivar la edición
function desactivarEdicion(idProducto) {
    const producto = document.getElementById(idProducto);
    const imagen = producto.querySelector('img');
    const descripcion = producto.querySelector('.marca');
    const precioAnterior = producto.querySelector('.precio-anterior');
    const precioActual = producto.querySelector('.precio-actual');
    const archivoInput = producto.querySelector('input[type="file"]');

    // Desactivar la edición de todos los campos
    imagen.style.pointerEvents = 'none';  // Impide hacer clic en la imagen después de guardar
    descripcion.removeAttribute('contenteditable');
    precioAnterior.removeAttribute('contenteditable');
    precioActual.removeAttribute('contenteditable');
    archivoInput.style.display = 'none'; // Ocultar el input de imagen después de guardar

    alert('Edición desactivada. Los cambios han sido guardados.');
}
// Función para cargar los datos desde localStorage
function cargarDatos(idProducto) {
    const productoDatos = JSON.parse(localStorage.getItem(idProducto));

    if (productoDatos) {
        const producto = document.getElementById(idProducto);
        const imagen = producto.querySelector('img');
        const descripcion = producto.querySelector('.marca');
        const precioAnterior = producto.querySelector('.precio-anterior');
        const precioActual = producto.querySelector('.precio-actual');

        // Asignar los valores del producto a los elementos correspondientes
        imagen.src = productoDatos.imagen;
        descripcion.innerHTML = productoDatos.descripcion;
        precioAnterior.innerHTML = productoDatos.precioAnterior;
        precioActual.innerHTML = productoDatos.precioActual;
    }
}

// Cargar los datos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos('guitarraDescuento'); // Cambia 'guitarraDescuento' por el id de tu producto
});
