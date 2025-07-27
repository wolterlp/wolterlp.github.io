document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initTypingEffect();
    initTypingEffectTwo();
    initPhotoFreezeEffect();
    initModal();
    initIconClickEffect();

    const lang = localStorage.getItem('lang') || 'es';
    loadTranslations(lang); // Siempre carga el idioma seleccionado

    // Selector de idioma
    document.querySelectorAll('#language-switcher .dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.textContent.trim().toLowerCase().startsWith('ing') ? 'en' : 'es';
            setLanguage(selectedLang);
        });
    });
});

// ========================
// Cambiar tema claro/oscuro
// ========================
function initThemeSwitcher() {
    const themeStyle = document.getElementById('theme-style');
    const colorButtons = document.querySelectorAll('#color-switcher button');

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isDark = button.dataset.color === 'dark';
            const isLight = button.dataset.color === 'light';
            document.body.classList.toggle('dark-mode', isDark);
            document.body.classList.toggle('light-mode', isLight);
        });
    });
}

// ========================
// Animación 1 - Título (máquina de escribir)
// ========================
function initTypingEffect() {
    const typingEffect = document.querySelector('.typing-effect');
    if (!typingEffect) return;

    const text = typingEffect.textContent;
    typingEffect.textContent = '';
    
    let index = 0;
    const speed = 100;
    let typingTimer;
    let isTyping = false;

    const typeWriter = () => {
        if (index < text.length) {
            typingEffect.textContent += text.charAt(index++);
            typingTimer = setTimeout(typeWriter, speed);
        } else {
            typingEffect.classList.add('finished');
            isTyping = false;
        }
    };

    typeWriter();

    typingEffect.addEventListener('mouseenter', () => {
        if (!isTyping) {
            clearTimeout(typingTimer);
            isTyping = true;
            typingEffect.classList.remove('finished');
            typingEffect.textContent = '';
            index = 0;
            typeWriter();
        }
    });
}

// ========================
// Animación 2 - Letras invertidas
// ========================
function initTypingEffectTwo() {
    const typingEffectTwo = document.querySelector('.typing-effecto-two');
    if (!typingEffectTwo) return;

    const textTwo = typingEffectTwo.textContent;
    typingEffectTwo.textContent = '';

    const letters = textTwo.split('');
    letters.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        typingEffectTwo.appendChild(span);
    });

    let indexTwo = letters.length - 1;
    const delay = 100;

    const animateLetters = () => {
        if (
            typingEffectTwo &&
            indexTwo >= 0 &&
            typingEffectTwo.children[indexTwo]
        ) {
            typingEffectTwo.children[indexTwo--].classList.add('show');
            setTimeout(animateLetters, delay);
        } else {
            if (typingEffectTwo) {
                typingEffectTwo.classList.add('finished');
            }
        }
    };

    animateLetters();

    typingEffectTwo.addEventListener('mouseenter', () => {
        typingEffectTwo.classList.remove('finished');
        [...typingEffectTwo.children].forEach(span => span.classList.remove('show'));
        indexTwo = letters.length - 1;
        animateLetters();
    });
}

// ========================
// Efecto congelamiento en la imagen
// ========================
function initPhotoFreezeEffect() {
    const photoCard = document.getElementById('card-photo');
    if (!photoCard) return;

    photoCard.addEventListener('mouseenter', () => {
        setTimeout(() => photoCard.classList.add('clear'), 3000);
    });

    photoCard.addEventListener('mouseleave', () => {
        photoCard.classList.remove('clear');
    });
}

// ========================
// Efecto al hacer clic en íconos
// ========================
function initIconClickEffect() {
    document.querySelectorAll('.iconos a').forEach(icon => {
        icon.addEventListener('click', function () {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 1000);
        });
    });
}

// ========================
// Modal de ampliación de imagen
// ========================
function initModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('imgAmpliada');
    const closeModal = document.getElementsByClassName('close')[0];
    const imgs = document.querySelectorAll('.img-proyecto');

    if (!modal || !modalImg || !closeModal || imgs.length === 0) return;

    imgs.forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    closeModal.onclick = () => modal.style.display = 'none';

    modal.onclick = e => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

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
    // Aplicar traducciones a elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}


