particlesJS("particles-js", {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00f7ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 4 },
        "line_linked": { "enable": true, "distance": 150, "color": "#00f7ff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 3 }
    },
    "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" } },
        "modes": { "repulse": { "distance": 100 } }
    },
    "retina_detect": true
});
  const text = "Estamos empezando nuestro viaje en el mundo de la programación, construyendo ideas con pasión y curiosidad. ¡Este es solo el comienzo!";
  const typedTextElement = document.getElementById("typed-text");

  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      typedTextElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 40); // Velocidad de escritura (milisegundos)
    }
  }

  // Espera que el DOM cargue
  document.addEventListener("DOMContentLoaded", typeWriter);

