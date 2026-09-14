document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.background = 'rgba(6, 8, 20, 0.92)';
            navbar.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.1) inset';
        } else {
            navbar.style.background = 'var(--bg-glass)';
            navbar.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255, 255, 255, 0.08) inset';
        }
    });
    const menuToggle = document.querySelector('.menu-toggle');
    const tabbar = document.querySelector('.tabbar');

    if (menuToggle && tabbar) {
        menuToggle.addEventListener('click', () => {
            tabbar.classList.toggle('expanded');
        });
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !tabbar.contains(e.target)) {
                tabbar.classList.remove('expanded');
            }
        });
    }
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('main section[id]');

    const updateActiveTab = () => {
        let current = 'home';
        const scrollPosition = window.scrollY + 200;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        tabs.forEach((tab) => {
            const targetId = tab.getAttribute('href').replace('#', '');
            tab.classList.toggle('active', targetId === current);
        });
    };

    window.addEventListener('scroll', updateActiveTab, { passive: true });
    updateActiveTab();

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            if (tabbar) tabbar.classList.remove('expanded');
        });
    });

    const revealTargets = document.querySelectorAll(
        '.section-head, .about-card, .skill-card, .showcase-card, .next-venture-card, .contact-grid > *, .trust-item'
    );
    
    revealTargets.forEach((el) => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el) => revealObserver.observe(el));
    const projectVisual = document.querySelector('.project-visual');
    if (projectVisual) {
        const previewObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                projectVisual.classList.toggle('in-view', entry.isIntersecting);
            });
        }, { threshold: 0.3 });

        previewObserver.observe(projectVisual);
    }
    const form = document.getElementById('portfolio-contact-form');
    const formNote = document.getElementById('form-note');

    if (form && formNote) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.name.value.trim();

            if (!form.checkValidity()) {
                formNote.textContent = 'Please fill out all required fields accurately.';
                formNote.style.color = '#F59E0B';
                return;
            }

            formNote.textContent = 'Transmitting message to Swetha...';
            formNote.style.color = 'var(--accent-cyan)';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formNote.textContent = `Thank you, ${name}! Your message has been dispatched. I'll get back to you within 24 hours.`;
                    formNote.style.color = 'var(--accent-emerald)';
                    form.reset();
                } else {
                    formNote.textContent = 'Unable to send message via automated gateway. Please email swetha1120068@gmail.com directly.';
                    formNote.style.color = '#EF4444';
                }
            } catch (err) {
                formNote.textContent = 'Network timeout. Please email swetha1120068@gmail.com directly.';
                formNote.style.color = '#EF4444';
                console.error(err);
            }
        });
    }
});
