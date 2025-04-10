document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("formRegistro");
  
    formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const correo = document.getElementById("registroEmail").value.trim();
      const contraseña = document.getElementById("registroPassword").value.trim();
  
      if (!correo || !contraseña) {
        alert("⚠️ Todos los campos son obligatorios.");
        return;
      }
  
      // Obtener usuarios ya registrados
      const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  
      // Verificar si ya existe un usuario con ese correo
      const existe = usuarios.some(user => user.email === correo);
  
      if (existe) {
        alert("⚠️ Ya existe un usuario con ese correo.");
        return;
      }
  
      // Crear nuevo usuario con admin: true
      const nuevoUsuario = {
        email: correo,
        password: contraseña,
        admin: true // Establecer como admin siempre
      };
  
      // Guardar el nuevo usuario en localStorage
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
  
      alert("✅ Usuario administrador registrado correctamente.");
      formRegistro.reset();
  
      // Redirigir a la página de login después del registro
      window.location.href = "index.html"; // Puedes redirigir al login o al panel de administración
    });
  });
  
  function validar(event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const esAdmin = document.getElementById("esAdmin").checked;
  
      // Obtener lista de usuarios registrados
      const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  
      // Buscar el usuario que coincida con el email
      const usuarioEncontrado = usuarios.find(user => user.email === email);
  
      if (!usuarioEncontrado) {
          alert("❌ Usuario no registrado.");
          return false;
      }
  
      if (usuarioEncontrado.password !== password) {
          alert("❌ Contraseña incorrecta.");
          return false;
      }
  
      // Verificar si se intenta iniciar como admin pero el usuario no lo es
      if (esAdmin && !usuarioEncontrado.admin) {
          alert("⛔ Este usuario NO tiene permisos de administrador.");
          return false;
      }
  
      // Verificar si el usuario es admin pero no marcó el checkbox
      if (!esAdmin && usuarioEncontrado.admin) {
          alert("⛔ Este usuario ES administrador. Marca la opción 'Iniciar como administrador'.");
          return false;
      }
  
      // Guardar el usuario activo en localStorage
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
  
      if (usuarioEncontrado.admin) {
          console.log("✅ Inicio de sesión como ADMIN");
          alert("Inicio de sesión como administrador.");
          window.location.href = "index.html"; // Página de administración
      } else {
          console.log("✅ Inicio de sesión como usuario normal");
          alert("Inicio de sesión exitoso.");
          window.location.href = "index.html"; // Página de cliente
      }
  
      cancelar(); // Ocultar formulario
      return false;
  }
  
  function iniciarSesion() {
      document.getElementById("overlay").style.display = "block";  // Mostrar overlay
      document.getElementById("iniciarSesion").style.display = "block";  // Mostrar formulario
  }
  
  function cancelar() {
      document.getElementById("overlay").style.display = "none";  // Ocultar overlay
      document.getElementById("iniciarSesion").style.display = "none";  // Ocultar formulario
  }
  
  document.addEventListener("DOMContentLoaded", () => {
      const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
      
      // Mostrar u ocultar el enlace de Cerrar Sesión según el estado de la sesión
      if (usuarioActivo) {
          document.querySelector(".cerrarSesion").style.display = "inline"; // Mostrar cerrar sesión
          document.querySelector("a[href='#iniciarSesion']").style.display = "none"; // Ocultar iniciar sesión
      } else {
          document.querySelector(".cerrarSesion").style.display = "none"; // Ocultar cerrar sesión
          document.querySelector("a[href='#iniciarSesion']").style.display = "inline"; // Mostrar iniciar sesión
      }
  });
  
  function cerrarSesion() {
      localStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada.");
      
      document.querySelector(".cerrarSesion").style.display = "none";
      document.querySelector("a[href='#iniciarSesion']").style.display = "inline";
      localStorage.removeItem("usuarioActivo");
      document.getElementById("nav-reporte").style.display = "none";
      document.getElementById("reporteVentas").style.display = "none";
      alert("Sesión cerrada.");
      // Redirigir según tipo de sesión anterior (opcionalmente podrías guardarlo antes)
      window.location.href = "index.html";
  }
  

//registrarse a la pagina
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const unirseWhatsapp = document.getElementById("unirseWhatsapp").checked;
  
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
  
      const nuevoUsuario = {
        email: email,
        password: password,
        whatsapp: unirseWhatsapp
      };
  
      // Recuperar lista de usuarios ya registrados
      let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  
      // Comprobar si el correo ya está registrado
      const yaExiste = usuarios.some(user => user.email === email);
      if (yaExiste) {
        alert("Este correo ya está registrado.");
        return;
      }
  
      // Agregar el nuevo usuario
      usuarios.push(nuevoUsuario);
  
      // Guardar la nueva lista en localStorage
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
  
      alert("¡Registro exitoso!");
  
      // Abrir el grupo de WhatsApp si se eligió
      if (unirseWhatsapp) {
        const enlaceWhatsapp = "https://chat.whatsapp.com/JYYo9CmNNSXDcl2xwSTRrf";
        window.open(enlaceWhatsapp, "_blank");
      }
  
      // Redirigir al formulario de iniciar sesión
      window.location.href = "index.html#iniciarSesion";
    });
  });