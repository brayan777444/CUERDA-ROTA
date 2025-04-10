document.querySelectorAll(".contenedor-video").forEach(contenedor => {
    const imagen = contenedor.querySelector("img");
    const video = contenedor.querySelector("video");

    contenedor.addEventListener("mouseenter", () => {
        imagen.style.opacity = "0"; // Oculta la imagen
        video.style.opacity = "1"; // Muestra el video
        video.play();              // Reproduce el video
        video.muted = false;       // Asegura que el video tenga sonido
    });

    contenedor.addEventListener("mouseleave", () => {
        video.pause();             // Detiene el video
        video.currentTime = 0;     // Regresa al inicio del video
        video.style.opacity = "0"; // Oculta el video
        imagen.style.opacity = "1"; // Vuelve a mostrar la imagen
    });
});

  