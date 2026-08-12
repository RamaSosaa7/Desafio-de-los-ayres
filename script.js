// 1. Efecto en la barra de navegación al hacer scroll (pasa a blanca/marino)
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

// 4. Envío de formulario sin recargar la página (AJAX)
const form = document.getElementById('miFormulario');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function(event) {
        // Evitamos que el navegador nos lleve a otra página
        event.preventDefault(); 
        
        // Ponemos el botón en estado de carga (opcional pero queda bien)
        const btn = form.querySelector('.btn-enviar');
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = 'ENVIANDO...';
        btn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json' // Formspree pide esto para responder por AJAX
                }
            });

            if (response.ok) {
                // Si salió todo bien, mostramos el cartel verde
                formStatus.className = 'form-status-message';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado! Nos contactaremos pronto a tu mail.';
                form.reset(); // Vaciamos los campos
            } else {
                // Si hubo un error por parte de Formspree
                formStatus.className = 'form-status-message error';
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Hubo un problema. Intentá de nuevo más tarde.';
            }
        } catch (error) {
            // Si el usuario no tiene internet o falla la conexión
            formStatus.className = 'form-status-message error';
            formStatus.innerHTML = '<i class="fas fa-wifi"></i> Error de conexión. Revisá tu internet.';
        }

        // Restauramos el botón
        btn.innerHTML = textoOriginal;
        btn.disabled = false;

        // Ocultamos el cartel después de 5 segundos
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    });
}