
// Efecto de carga suave
document.body.style.opacity = '0';
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Animación al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .project-card, .timeline-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Configurar elementos para animación
document.querySelectorAll('.section, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
});

// Event listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
