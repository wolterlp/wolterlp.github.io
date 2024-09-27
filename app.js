
document.addEventListener('DOMContentLoaded', () => {
    const themeStyle = document.getElementById('theme-style');
    const colorButtons = document.querySelectorAll('#color-switcher button');

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode', button.dataset.color === 'dark');
            document.body.classList.toggle('light-mode', button.dataset.color === 'light');
        });
    });

    /* movimiento del titulo como escrito*/

    
    const typingEffect = document.querySelector('.typing-effect');
    const text = typingEffect.textContent;
    typingEffect.textContent = ''; // Limpia el contenido del texto
    
    let index = 0;
    const speed = 100; // Velocidad de escritura en milisegundos
    let typingTimer;
    let isTyping = false; // Variable para controlar si se está escribiendo

    function typeWriter() {
        if (index < text.length) {
            typingEffect.textContent += text.charAt(index);
            index++;
            typingTimer = setTimeout(typeWriter, speed);
        } else {
            // Añade la clase 'finished' al finalizar la escritura
            typingEffect.classList.add('finished');
            isTyping = false;
        }
    }

    // Inicia la animación de escritura al cargar la página
    typeWriter();

    // Reanuda la animación al pasar el mouse
    typingEffect.addEventListener('mouseenter', () => {
        if (!isTyping) {
            clearTimeout(typingTimer); // Limpia cualquier temporizador anterior
            isTyping = true;
            typingEffect.classList.remove('finished');
            typingEffect.textContent = ''; // Limpia el texto actual
            index = 0; // Reinicia el índice
            typeWriter(); // Inicia de nuevo la animación
        }
    });

    /* animacion 2 */




    /* Fin - movimiento del titulo como escrito */
  
});

/* menu icono */

    document.querySelectorAll('.iconos a').forEach(icon => {
        icon.addEventListener('click', function() {
            this.classList.add('clicked'); // Añade la clase clicked
            setTimeout(() => {
                this.classList.remove('clicked'); // Elimina la clase clicked después de 1 segundo
            }, 1000); // 1000 ms = 1 segundo
        });
    });

/* fin menu icono */

/* Segunda animacion del titulo 2*/
    document.addEventListener('DOMContentLoaded', () => {
        const typingEffectTwo = document.querySelector('.typing-effecto-two');
        const textTwo = typingEffectTwo.textContent;
        typingEffectTwo.textContent = ''; // Limpia el contenido del texto
        
        const letters = textTwo.split(''); // Divide el texto en letras
        letters.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            typingEffectTwo.appendChild(span);
        });
        
        let indexTwo = letters.length - 1; // Comienza desde la última letra
        const delay = 100; // Retraso entre la aparición de las letras
        
        function animateLetters() {
            if (indexTwo >= 0) {
                typingEffectTwo.children[indexTwo].classList.add('show');
                indexTwo--;
                setTimeout(animateLetters, delay);
            } else {
                typingEffectTwo.classList.add('finished'); // Añade la clase 'finished' cuando la animación ha terminado
            }
        }

        // Inicia la animación al cargar la página
        animateLetters();

        // Reanuda la animación al pasar el mouse
        typingEffectTwo.addEventListener('mouseenter', () => {
            typingEffectTwo.classList.remove('finished');
            Array.from(typingEffectTwo.children).forEach(span => {
                span.classList.remove('show');
            });
            indexTwo = letters.length - 1;
            animateLetters();
        });
    });

/* Fin - Segunda animacion del titulo 2*/

/* fin animacion foto */

    // Simulación de "congelación" con agua realista
    document.getElementById("card-photo").addEventListener("mouseenter", function() {
        let photoCard = document.getElementById("card-photo");
        setTimeout(function() {
            // Inicia el efecto de congelamiento después de 3 segundos
            photoCard.classList.add('clear');
        }, 3000);
    });

    document.getElementById("card-photo").addEventListener("mouseleave", function() {
        let photoCard = document.getElementById("card-photo");
        photoCard.classList.remove('clear');
    });

/* Fin animacion foto */

/* modal */
    // Obtener el modal
    var modal = document.getElementById("modal");

    // Obtener la imagen del modal y el span que cierra el modal
    var modalImg = document.getElementById("imgAmpliada");
    var closeModal = document.getElementsByClassName("close")[0];

    // Obtener todas las imágenes en la clase "img-proyecto"
    var imgs = document.querySelectorAll(".img-proyecto");

    imgs.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src; // Coloca la imagen seleccionada en el modal
        });
    });

    // Al hacer clic en "cerrar" (la X), oculta el modal
    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    // También cerrar al hacer clic fuera de la imagen
    modal.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
/* fin modal */


/* traduccion */

// Cargar las traducciones desde el archivo es.json
async function loadTranslations() {
    const response = await fetch('/lang/es.json'); // Cambia esta ruta por la correcta
    return await response.json();
}

// Mapa para las traducciones cargadas
let translations = {};

// Manejar los clics en los enlaces de idioma
document.getElementById('lang-en').addEventListener('click', function(event) {
    event.preventDefault();
    changeLanguage('en'); // Cambiar a inglés
});

document.getElementById('lang-es').addEventListener('click', function(event) {
    event.preventDefault();
    changeLanguage('es'); // Cambiar a español
});

async function changeLanguage(lang) {
    // Cargar las traducciones si aún no se han cargado
    if (Object.keys(translations).length === 0) {
        translations = await loadTranslations();
    }
    
    // Actualizar el contenido de la página
    updateContent(lang);
    
    // Guardar el idioma en el almacenamiento local
    localStorage.setItem('language', lang);
}

function updateContent(lang) {
    // Cambiar el contenido basado en el idioma
    if (lang === 'es') {
        document.getElementById('title').innerText = translations["Welcome"];
        document.getElementById('description').innerText = translations["This is an English description."];
        // Agrega más elementos según sea necesario
    } else {
        // Restablecer a contenido en inglés
        document.getElementById('title').innerText = "Welcome";
        document.getElementById('description').innerText = "This is an English description.";
    }
}

// Cargar el idioma guardado al cargar la página
window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en'; // Por defecto inglés
    changeLanguage(savedLanguage);
};



    
/* Fin traduccion */