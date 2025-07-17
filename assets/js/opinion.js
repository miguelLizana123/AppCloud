import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "../../conexion/firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("opinionForm");
  const mensaje = document.getElementById("mensajeEnviado");
  const inputNombre = document.getElementById("nombre");
  const inputComentario = document.getElementById("comentario");

  if (!form || !db || !mensaje || !inputNombre || !inputComentario) {
    console.error("Formulario, DB o elementos necesarios no disponibles.");
    return;
  }

  // 🚫 Filtrar caracteres inválidos en el nombre (solo letras y espacios)
  inputNombre.addEventListener("input", () => {
    const valorOriginal = inputNombre.value;
    const valorFiltrado = valorOriginal.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, "");
    if (valorOriginal !== valorFiltrado) {
      inputNombre.value = valorFiltrado;
    }
  });

  // 🚫 Filtrar caracteres inválidos en el comentario (letras, números, puntuación básica y espacios)
  inputComentario.addEventListener("input", () => {
    const valorOriginal = inputComentario.value;
    const valorFiltrado = valorOriginal.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,!?¿¡()\s]/g, "");
    if (valorOriginal !== valorFiltrado) {
      inputComentario.value = valorFiltrado;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const comentario = inputComentario.value.trim();

    const nombreValido = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombre);
    const palabrasProhibidas = ["tonto", "estúpido", "mierda", "spam", "http", "www"];
    const contieneProhibido = palabrasProhibidas.some(p => comentario.toLowerCase().includes(p));

    if (nombre.length < 3 || nombre.length > 50) {
      alert("El nombre debe tener entre 3 y 50 caracteres.");
      return;
    }

    if (!nombreValido) {
      alert("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (comentario.length < 10 || comentario.length > 300) {
      alert("El comentario debe tener entre 10 y 300 caracteres.");
      return;
    }

    if (contieneProhibido) {
      alert("Tu comentario contiene palabras no permitidas.");
      return;
    }

  // ✅ Validación de reCAPTCHA aquí
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("Por favor, verifica el reCAPTCHA antes de enviar.");
    return;
  }
    try {
      await addDoc(collection(db, "opiniones"), {
        nombre,
        comentario,
        fecha: new Date()
      });

      form.reset();
      mostrarMensaje("Opinión enviada con éxito.", true);
    } catch (error) {
      console.error("Error al guardar opinión:", error);
      mostrarMensaje("Ocurrió un error al enviar tu opinión.", false);
    }
  });

  function mostrarMensaje(texto, esExito) {
    mensaje.textContent = texto;
    mensaje.style.backgroundColor = esExito ? "#03330fff" : "#5f020aff";
    mensaje.style.color = esExito ? "#0ff745ff" : "#f32a3eff";
    mensaje.style.border = esExito ? "1px solid #0cff45ff" : "1px solid #ff2f44ff";
    mensaje.classList.remove("hidden");
    mensaje.classList.add("show");

    setTimeout(() => {
      mensaje.classList.remove("show");
      mensaje.classList.add("hidden");
    }, 4000);
  }
});
