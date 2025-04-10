//reportes de venta
window.onload = function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario && usuario.admin) {
        document.getElementById("nav-reporte").style.display = "inline-block";
    }
};

function mostrarReporteDeVentas() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || !usuario.admin) {
        alert("🚫 Solo el administrador puede ver el reporte de ventas.");
        return;
    }

    // Ocultar todas las secciones principales
    const secciones = [
        "inicio", "servicios", "charangos", "guitarra", "teclados", "violines", 
        "accesorios", "contacto", "iniciarSesion"
    ];

    secciones.forEach(id => {
        let seccion = document.getElementById(id);
        if (seccion) {
            seccion.style.display = "none";
        }
    });
    
    
    // Mostrar solo el reporte
    document.getElementById("reporteVentas").style.display = "block";

    // Mostrar ventas guardadas
    let ventas = JSON.parse(localStorage.getItem("reporteVentas")) || [];
    let contenedor = document.getElementById("contenido-reporte");
    contenedor.innerHTML = "";

    if (ventas.length === 0) {
        contenedor.innerHTML = "<p>No hay ventas registradas.</p>";
        return;
    }

    ventas.forEach((venta, index) => {
        contenedor.innerHTML += `
            <div style="margin-bottom: 10px;">
                ${index + 1}. <strong>${venta.cantidad}</strong> x ${venta.nombre} = ${venta.precio * venta.cantidad} Bs<br>
                <small>${venta.fecha}</small>
            </div><hr>
        `;
    });
    
}

function enviarReportePorWhatsApp() {
    const ventas = JSON.parse(localStorage.getItem("reporteVentas")) || [];
    if (ventas.length === 0) {
        alert("No hay ventas registradas para enviar.");
        return;
    }

    let mensaje = "Reporte de Ventas:\n\n";
    ventas.forEach((venta, index) => {
        mensaje += `${index + 1}. ${venta.cantidad} x ${venta.nombre} = ${venta.precio * venta.cantidad} Bs\n`;
        mensaje += `Fecha: ${venta.fecha}\n\n`;
    });

    let total = ventas.reduce((acc, venta) => acc + (venta.precio * venta.cantidad), 0);
    mensaje += `Total de ventas: ${total.toFixed(2)} Bs`;

    let numero = "59167607710";  // Reemplaza con tu número de WhatsApp
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // Eliminar el reporte de ventas después de enviarlo
    localStorage.removeItem("reporteVentas");

     

    alert("✅ Reporte enviado y eliminado.");
}


function imprimirReporteDeVentas() {
    const ventas = JSON.parse(localStorage.getItem("reporteVentas")) || [];
    if (ventas.length === 0) {
        alert("No hay ventas registradas para imprimir.");
        return;
    }

    let contenido = "<h2>Reporte de Ventas</h2>";
    ventas.forEach((venta, index) => {
        contenido += `
            <div>
                <p>${index + 1}. ${venta.cantidad} x ${venta.nombre} = ${venta.precio * venta.cantidad} Bs</p>
                <p>Fecha: ${venta.fecha}</p>
            </div><hr>
        `;
    });

    let total = ventas.reduce((acc, venta) => acc + (venta.precio * venta.cantidad), 0);
    contenido += `<h3>Total de ventas: ${total.toFixed(2)} Bs</h3>`;

    // Crear una ventana de impresión
    let ventanaImpresion = window.open('', '', 'width=600,height=400');
    ventanaImpresion.document.write('<html><head><title>Reporte de Ventas</title></head><body>');
    ventanaImpresion.document.write(contenido);
    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();

    // Eliminar el reporte de ventas después de imprimirlo
    localStorage.removeItem("reporteVentas");
    alert("✅ Reporte impreso y eliminado.");
}

function vaciarReporteDeVentas() {
    localStorage.removeItem("reporteVentas");
    alert("✅ El reporte de ventas ha sido vaciado.");
}