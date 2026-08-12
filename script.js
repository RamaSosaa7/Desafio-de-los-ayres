// 1. Efecto en la barra de navegación al hacer scroll (pasa a blanca)
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Efecto Parallax en la imagen del banner
const parallaxImg = document.getElementById('parallax-img');

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if (parallaxImg) {
        parallaxImg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// 3. Animaciones de aparición al hacer scroll (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});