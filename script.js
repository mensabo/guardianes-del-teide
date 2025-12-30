/* =========================================
   SCRIPT.JS - GUARDIANES DEL TEIDE & VOLCANO PLUS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL Y NAVEGACIÓN ---
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('header');
    
    // Función global para abrir/cerrar menú (usada en el HTML)
    window.toggleMenu = function() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    };

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. SISTEMA DE MODALES (PDF y AVISOS) ---
    const modal = document.getElementById('mainModal');
    const modalContent = document.getElementById('modalInjection');
    const modalFrame = document.getElementById('modalFrame');

    // Función para abrir PDF
    window.openPdfModal = function(pdfName) {
        if (!modal) return; // Protección por si no existe el modal en la página
        
        // Simulación de carga de PDF (En producción sería la ruta real)
        // Como no tienes los PDFs reales subidos, mostramos un mensaje o iframe genérico
        // Para el ejemplo, usaremos un placeholder visual si el archivo no existe
        
        modalFrame.src = pdfName; 
        // Nota: Si el PDF no existe localmente, el navegador mostrará error 404 dentro del iframe.
        // Puedes cambiar pdfName por una URL real para probar.
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll
    };

    // Función para abrir Modal de Recordatorio (Agenda)
    window.openReminderModal = function(eventName) {
        if (!modal) return;
        
        // Inyectamos HTML dinámico para el aviso
        modalContent.innerHTML = `
            <div style="text-align:center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--forest-green); margin-bottom:20px;"></i>
                <h2 style="color: #333;">¡Oído Cocina!</h2>
                <p style="font-size: 1.1rem; color: #666; margin: 20px 0;">
                    Te avisaremos sobre <strong>"${eventName}"</strong> en cuanto se abran las inscripciones.
                </p>
                <button class="btn btn-primary" onclick="closeModal()">Entendido</button>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Función para abrir Modal de "Héroes/Juego"
    window.openHeroModal = function() {
        if (!modal) return;
        
        modalContent.innerHTML = `
            <div style="text-align:center; padding: 40px 20px;">
                <i class="fas fa-gamepad" style="font-size: 4rem; color: var(--primary-orange); margin-bottom:20px;"></i>
                <h2 style="color: #333;">Liga de Guardianes</h2>
                <p>La gamificación estará disponible próximamente en la App.</p>
                <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Función para cerrar cualquier modal
    window.closeModal = function() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Reactivar scroll
        
        // Restaurar el iframe por si acaso (limpiar inyección HTML)
        setTimeout(() => {
            modalContent.innerHTML = `
                <span class="close-modal" onclick="closeModal()">&times;</span>
                <div id="modalInjection" style="height: 100%;">
                    <iframe id="modalFrame" src="" width="100%" height="100%" style="border:none; border-radius: 8px;"></iframe>
                </div>
            `;
        }, 300); // Pequeño delay para que no se vea el cambio
    };

    // Cerrar modal al hacer click fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };


    // --- 3. ANIMACIÓN DE CONTADORES (CORREGIDO PARA VOLCANO PLUS) ---
    // Esta sección solo se ejecuta si existen contadores en la página actual
    const counterSection = document.querySelector('.counter-grid');
    const counters = document.querySelectorAll('.counter-item h3');

    if (counterSection && counters.length > 0) {
        
        const speed = 200; // Velocidad de conteo

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    // Obtener el objetivo del texto HTML o atributo data
                    // Aquí usamos valores hardcodeados para la demo si están en 0
                    let target = 0;
                    
                    if(counter.id === 'count-trees') target = 50000;
                    if(counter.id === 'count-co2') target = 120;
                    if(counter.id === 'count-guardians') target = 3500;
                    
                    // Si ya tiene número (ej: "100%"), no animamos o lo parseamos
                    if(counter.innerText.includes('%')) return;

                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target; // Asegurar valor final exacto
                    }
                };
                updateCount();
            });
        };

        // Intersection Observer para activar la animación al hacer scroll
        const observerOptions = {
            root: null,
            threshold: 0.5 // Se activa cuando el 50% de la sección es visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, observerOptions);

        observer.observe(counterSection);
    }

    // --- 4. SCROLL SUAVE (SMOOTH SCROLL) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});