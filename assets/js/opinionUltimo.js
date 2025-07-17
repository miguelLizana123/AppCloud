import { collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "../../conexion/firebase-config.js";

let currentIndex = 0;
let testimonios = [];
let autoSlideInterval;

const imagenesUsuarios = [
  "assets/images/avatar1.png",
  "assets/images/avatar2.png",
  "assets/images/avatar3.png",
  "assets/images/avatar4.png",
  "assets/images/avatar5.png",
  "assets/images/avatar6.png",
  "assets/images/avatar7.png",
  "assets/images/avatar8.png",
  "assets/images/avatar9.png",
  "assets/images/avatar10.png"
];

function obtenerImagenAleatoria() {
  const indice = Math.floor(Math.random() * imagenesUsuarios.length);
  return imagenesUsuarios[indice];
}

function crearTestimonioHTML(nombre, comentario, imagenURL) {
  const testimonial = document.createElement("div");
  testimonial.className = "testimonial";
  testimonial.innerHTML = `
    <p class="description">${comentario}</p>
    <div class="pic">
      <img src="${imagenURL}" alt="User Pic">
    </div>
    <div class="detail">
      <h4 class="name">${nombre}</h4>
      <small class="role">Usuario</small>
    </div>
  `;
  return testimonial;
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedorTestimonios = document.getElementById("testimonial-slider");

  if (!contenedorTestimonios || !db) {
    console.error("Contenedor o DB no disponible.");
    return;
  }

  const opinionesQuery = query(
    collection(db, "opiniones"),
    orderBy("fecha", "desc"),
    limit(5)
  );

  // 🔴 Escuchar en tiempo real los cambios
  onSnapshot(opinionesQuery, (querySnapshot) => {
    testimonios = [];

    let index = 0;
    querySnapshot.forEach((doc) => {
      const { nombre, comentario } = doc.data();

      // Reutiliza una imagen si ya existe, o asigna una nueva aleatoria
      const imagenURL = obtenerImagenAleatoria();

      const testimonialHTML = crearTestimonioHTML(nombre, comentario, imagenURL);
      testimonios.push(testimonialHTML);
    });

    renderTestimonios(contenedorTestimonios);
    updateCarousel();
    startAutoSlide();
  });
});

function renderTestimonios(container) {
  container.innerHTML = '';
  testimonios.forEach((t) => container.appendChild(t));
}

function updateCarousel() {
  const slider = document.getElementById("testimonial-slider");
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${currentIndex * 101}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonios.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + testimonios.length) % testimonios.length;
  updateCarousel();
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

document.getElementById("nextBtn").addEventListener("click", () => {
  nextSlide();
  startAutoSlide();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  prevSlide();
  startAutoSlide();
});
