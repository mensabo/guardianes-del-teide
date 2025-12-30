/* =========================================
   SCRIPT.JS - GUARDIANES DEL TEIDE
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL Y NAVEGACIÓN ---
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('header');
    
    window.toggleMenu = function() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    };

    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

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
        
        // Limpiar el iframe para el siguiente uso
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
        
        // Opcional: Recargar el formulario original si se había enviado
        setTimeout(() => {
            if (wordsFormContent.innerHTML.includes('¡Gracias')) {
                location.reload(); 
            }
        }, 300);
    };

    window.handleWordsSubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('wName').value;
        
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

    // --- 5. SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Cerrar modales al hacer click fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) closeModal();
        if (event.target == wordsModal) closeWordsModal();
    };
});