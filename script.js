/* =========================================
   SCRIPT.JS - GUARDIANES DEL TEIDE
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL Y NAVEGACIÓN (CORREGIDO) ---
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('header');
    
    // Función global para abrir/cerrar menú
    window.toggleMenu = function() {
        navbar.classList.toggle('active');
        
        // Cambiar icono de hamburguesa a X y bloquear scroll
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden'; // Evita scroll con menú abierto
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = 'auto'; // Devuelve el scroll
        }
    };

    // CERRAR AUTOMÁTICAMENTE AL HACER CLICK EN UN ENLACE (Para navegación móvil)
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', () => {
            // Solo actuar si estamos en versión móvil
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // Efecto de fondo en el header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 2. SISTEMA DE MODALES GENERALES (PDF, Avisos, Héroes) ---
    const modal = document.getElementById('mainModal');
    const modalContent = document.getElementById('modalInjection');
    const modalFrame = document.getElementById('modalFrame');

    window.openPdfModal = function(pdfName) {
        if (!modal) return;
        modalFrame.src = pdfName; 
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.openReminderModal = function(eventName) {
        if (!modal) return;
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

    window.openHeroModal = function() {
        if (!modal) return;
        modalContent.innerHTML = `
            <div style="text-align:center; padding: 40px 20px;">
                <i class="fas fa-gamepad" style="font-size: 4rem; color: var(--primary-orange); margin-bottom:20px;"></i>
                <h2 style="color: #333;">Liga de Guardianes</h2>
                <p>La gamificación estará disponible próximamente en la App oficial.</p>
                <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Limpiar el contenido para el siguiente uso
        setTimeout(() => {
            modalContent.innerHTML = `<iframe id="modalFrame" src="" width="100%" height="100%" style="border:none; border-radius: 8px;"></iframe>`;
        }, 300);
    };


    // --- 3. FUNCIONES "LAS PALABRAS DEL GUARDIÁN" ---
    const wordsModal = document.getElementById('wordsModal');
    const wordsFormContent = document.getElementById('wordsFormContent');

    window.openWordsForm = function() {
        wordsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeWordsModal = function() {
        wordsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Si el formulario se envió con éxito, recargamos para limpiar estado al cerrar
        setTimeout(() => {
            if (wordsFormContent.innerHTML.includes('¡Gracias')) {
                location.reload(); 
            }
        }, 300);
    };

    window.handleWordsSubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('wName').value;
        
        // Feedback de envío exitoso
        wordsFormContent.innerHTML = `
            <div style="text-align:center; padding: 40px 10px;">
                <i class="fas fa-heart" style="font-size: 4.5rem; color: #e74c3c; margin-bottom: 25px; animation: heroic-float 2s infinite;"></i>
                <h2 style="color: #333; margin-bottom:15px;">¡Gracias, ${name}!</h2>
                <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin-bottom: 30px;">
                    Tus palabras han llegado al corazón de la montaña.<br><br>
                    Nuestro equipo moderará tu mensaje y lo publicará en el muro en las próximas horas. 
                    ¡Sigue protegiendo nuestro legado!
                </p>
                <button class="btn btn-primary" onclick="closeWordsModal()">ENTENDIDO</button>
            </div>
        `;
    };


    // --- 4. ANIMACIÓN DE CONTADORES ---
    const counterSection = document.querySelector('.counter-grid');
    const counters = document.querySelectorAll('.counter-item h3');

    if (counterSection && counters.length > 0) {
        const speed = 200; 

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    let target = 0;
                    if(counter.id === 'count-trees') target = 50000;
                    if(counter.id === 'count-co2') target = 120;
                    if(counter.id === 'count-guardians') target = 3500;
                    
                    if(counter.innerText.includes('%')) return;

                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target; 
                    }
                };
                updateCount();
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counterSection);
    }


    // --- 5. SCROLL SUAVE (SMOOTH SCROLL) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // --- 6. CIERRE DE MODALES AL CLICAR FUERA ---
    window.onclick = function(event) {
        if (event.target == modal) closeModal();
        if (event.target == wordsModal) closeWordsModal();
    };

});