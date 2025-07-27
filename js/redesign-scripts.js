document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality for project images and certificados
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('imgAmpliada');
    const closeBtn = document.querySelector('.close');
    const modalImages = document.querySelectorAll('.img-proyecto, .img-modal');
    let modalOpen = false;

    if (modal && modalImg && closeBtn && modalImages.length > 0) {
        modalImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalOpen = true;
                document.body.style.overflow = 'hidden'; // Evita scroll en fondo
            });
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            modalImg.src = '';
            modalOpen = false;
            document.body.style.overflow = ''; // Restaura scroll
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                modalImg.src = '';
                modalOpen = false;
                document.body.style.overflow = '';
            }
        });

        // Opcional: cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (modalOpen && e.key === 'Escape') {
                modal.style.display = 'none';
                modalImg.src = '';
                modalOpen = false;
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Theme switcher functionality
    const lightBtn = document.querySelector('[data-color="light"]');
    const darkBtn = document.querySelector('[data-color="dark"]');

    if (lightBtn && darkBtn) {
        lightBtn.addEventListener('click', function() {
            document.body.setAttribute('data-color', 'light');
            document.documentElement.style.setProperty('--dark-gradient', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)');
            document.documentElement.style.setProperty('--text-primary', '#333333');
            document.documentElement.style.setProperty('--text-secondary', 'rgba(51, 51, 51, 0.8)');
            document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
            document.documentElement.style.setProperty('--card-border', 'rgba(0, 0, 0, 0.1)');
        });

        darkBtn.addEventListener('click', function() {
            document.body.setAttribute('data-color', 'dark');
            document.documentElement.style.setProperty('--dark-gradient', 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.8)');
            document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.1)');
            document.documentElement.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.2)');
        });
    }

    // Parallax effect for background - optimizado
    window.addEventListener('scroll', function() {
        // El pseudo-elemento no se puede seleccionar directamente con querySelector
        // Se aplica el efecto a través de CSS animations
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.col1, .col2').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Traducción dinámica
    const lang = localStorage.getItem('lang') || 'es';
    loadTranslations(lang);

    // Selector de idioma
    document.querySelectorAll('#language-switcher .dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.textContent.trim().toLowerCase().startsWith('ing') ? 'en' : 'es';
            setLanguage(selectedLang);
        });
    });

    // Coverflow para certificados
    const coverflow = document.getElementById('coverflow');
    if (coverflow) {
        const certificados = [
            "analisis-de-codigo-estatico-en-php_page-0001.jpg",
            "arquitectura-hexagonal_page-0001.jpg",
            "Certificado clean-code_page-0001.jpg",
            "Certificado principios-solid-aplicados_page-0001.jpg",
            "comunicacion-entre-microservicios-event-driven-architecture_page-0001.jpg",
            "diploma-pro-arquitectura_page-0001.jpg",
            "diploma-python-data-science_page-0001.jpg",
            "diploma-redes-neuronales-tensorflow_page-0001.jpg",
            "testing-introduccion-y-buenas-practicas_page-0001.jpg",
            "web-performance_page-0001.jpg"
        ];
        coverflow.innerHTML = '';
        certificados.forEach((nombre, i) => {
            const img = document.createElement('img');
            img.src = `storage/certificados/${nombre}`;
            img.alt = `Certificado ${i + 1}`;
            img.className = 'coverflow-img img-modal';
            coverflow.appendChild(img);
        });

        const imgs = coverflow.querySelectorAll('.coverflow-img');
        let active = 0;
        function updateCoverflow() {
            imgs.forEach((img, i) => {
                img.classList.remove('active', 'left', 'right');
                if (i === active) {
                    img.classList.add('active');
                } else if (i === active - 1) {
                    img.classList.add('left');
                } else if (i === active + 1) {
                    img.classList.add('right');
                }
            });
        }
        updateCoverflow();
        coverflow.addEventListener('click', function(e) {
            if (modalOpen) return; // No navegar si modal está abierto
            if (!e.target.classList.contains('coverflow-img')) return;
            const idx = Array.from(imgs).indexOf(e.target);
            if (idx !== -1) {
                active = idx;
                updateCoverflow();
            }
        });
        document.addEventListener('keydown', function(e) {
            if (modalOpen) return; // No navegar si modal está abierto
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
            if (e.key === 'ArrowLeft') {
                active = Math.max(0, active - 1);
                updateCoverflow();
            }
            if (e.key === 'ArrowRight') {
                active = Math.min(imgs.length - 1, active + 1);
                updateCoverflow();
            }
        });
    }
});

// ========================
// Traducción
// ========================
async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Error al cargar traducciones: ${response.status}`);
        }
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error('Error cargando traducciones:', error);
    }
}

function applyTranslations(translations) {
    // Remove duplicate header_name elements (for mobile)
    const headerNameElements = document.querySelectorAll('.typing-effect[data-i18n="header_name"]');
    if (headerNameElements.length > 1) {
        for (let i = 1; i < headerNameElements.length; i++) {
            headerNameElements[i].parentNode.removeChild(headerNameElements[i]);
        }
    }
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            if (key === 'header_name') {
                element.textContent = translations[key];
            } else {
                element.innerHTML = translations[key];
            }
        }
    });
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
    const currentTheme = document.body.getAttribute('data-color') || 'dark';
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', currentTheme);
    location.reload();
}