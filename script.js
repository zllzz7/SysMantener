// ================================
// Animacion de Revelado al Hacer Scroll
// ================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check on page load
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// ================================
// Efecto de Scroll en la Barra de Navegacion
// ================================
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ================================
// Desplazamiento Suave para Enlaces Ancla
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Contador Animado
// ================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = current.toFixed(1);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Inicializar contadores
animateCounters();

// ================================
// Alternar Menu Movil
// ================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        
        // Crear menu movil si no existe
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <ul>
                    <li><a href="#resumen">Resumen</a></li>
                    <li><a href="#tipos">Tipos</a></li>
                    <li><a href="#aseguramiento">Aseguramiento</a></li>
                    <li><a href="#herramientas">Herramientas</a></li>
                    <li><a href="#buenas-practicas">Buenas Practicas</a></li>
                </ul>
            `;
            
            // Add styles for mobile menu
            mobileMenu.style.cssText = `
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                padding: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 999;
            `;
            
            mobileMenu.querySelector('ul').style.cssText = `
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 16px;
            `;
            
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.style.cssText = `
                    color: #a0a0a0;
                    text-decoration: none;
                    font-size: 1.125rem;
                    display: block;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    transition: color 0.2s ease;
                `;
                
                link.addEventListener('click', () => {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                    mobileMenuBtn.classList.remove('active');
                });
            });
            
            navbar.appendChild(mobileMenu);
        }
        
        // Toggle menu visibility
        if (mobileMenuBtn.classList.contains('active')) {
            mobileMenu.style.transform = 'translateY(0)';
            mobileMenu.style.opacity = '1';
        } else {
            mobileMenu.style.transform = 'translateY(-100%)';
            mobileMenu.style.opacity = '0';
        }
    });
}

// ================================
// Efectos Hover Interactivos en Tarjetas
// ================================
const cards = document.querySelectorAll('.bento-card, .assurance-card, .tool-card, .practice-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ================================
// Efecto Parallax para el Brillo del Hero
// ================================
const heroGlow = document.querySelector('.hero-glow');

if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        
        heroGlow.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
    });
}

// ================================
// Enlace de Navegacion Activo
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    link.style.color = '#ffffff';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ================================
// Animacion de Linea de Tiempo
// ================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ================================
// Efecto de Escritura para el Hero (Mejora Opcional)
// ================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ================================
// Animacion del Grafico de Riesgo
// ================================
const riskBars = document.querySelectorAll('.risk-bar');

const riskObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'riskBarGrow 1s ease-out forwards';
            riskObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

riskBars.forEach(bar => {
    bar.style.height = '0';
    riskObserver.observe(bar);
});

// Agregar keyframes de animacion dinamicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes riskBarGrow {
        from {
            height: 0;
        }
        to {
            height: var(--height);
        }
    }
`;
document.head.appendChild(styleSheet);

// ================================
// Efecto Ripple en Botones
// ================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Agregar animacion ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ================================
// Animacion de Carga de Pagina
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animar elementos del hero con retraso
    const heroElements = document.querySelectorAll('.hero .reveal');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 150);
    });
});

// ================================
// Intersection Observer para Rendimiento
// ================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// ================================
// Prevenir Flash de Contenido sin Estilos
// ================================
document.documentElement.classList.add('js-enabled');

console.log('SysMantener - Sitio Web Educativo Cargado Exitosamente');
