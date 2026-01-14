document.addEventListener('DOMContentLoaded', () => {
    console.log('Sunface Studio Loaded');

    // Navigation Toggle (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav ul');
    let isMenuOpen = false;

    if (menuToggle && nav) {
        function toggleMenu(e) {
            if (e.type === 'touchstart') {
                e.preventDefault();
            }
            isMenuOpen = !isMenuOpen;
            nav.classList.toggle('open');
            menuToggle.classList.toggle('open');
        }

        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('touchstart', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
                isMenuOpen = false;
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (isMenuOpen && e.key === 'Escape') {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
                isMenuOpen = false;
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simple form validation
            const name = this.querySelector('[name="name"]');
            const email = this.querySelector('[name="email"]');
            const message = this.querySelector('[name="message"]');

            if (name && !name.value.trim()) {
                alert('Please enter your name');
                name.focus();
                return;
            }

            if (email && !email.value.trim()) {
                alert('Please enter your email');
                email.focus();
                return;
            }

            // TODO: Implement AJAX/email sending here
            console.log('Form submitted:', {
                name: name?.value,
                email: email?.value,
                service: this.querySelector('[name="service"]')?.value,
                message: message?.value
            });

            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // WhatsApp Button Logic
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function () {
                const formData = new FormData(contactForm);
                const fields = [
                    { label: 'Name', key: 'name' },
                    { label: 'Email', key: 'email' },
                    { label: 'Service', key: 'service' },
                    { label: 'Message', key: 'message' }
                ];

                let waMsg = fields
                    .map(f => {
                        const value = formData.get(f.key);
                        return value && value.toString().trim() ?
                            `${f.label}: ${value.toString().trim()}` : '';
                    })
                    .filter(Boolean)
                    .join('\n');

                // Add a greeting if there's content
                if (waMsg) {
                    waMsg = 'Hello! I have a query:\n' + waMsg;
                } else {
                    waMsg = 'Hello! I would like to inquire about your services.';
                }

                const waNumber = '27617367160';
                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;
                window.open(waUrl, '_blank');
            });
        }
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize animation for elements
    const animatedElements = document.querySelectorAll('.service-item, .portfolio-card, .price-card');
    animatedElements.forEach(el => {
        // Only add if not already animated
        if (!el.classList.contains('animated')) {
            el.classList.add('animated');
            observer.observe(el);
        }
    });

    // Currency Toggle Logic
    const currencyButtons = document.querySelectorAll('.currency-toggle');
    const priceElements = document.querySelectorAll('.price');

    if (currencyButtons.length > 0) {
        currencyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                currencyButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const currency = btn.getAttribute('data-currency'); // zar, usd, gbp

                // Update prices
                priceElements.forEach(priceEl => {
                    const newPrice = priceEl.getAttribute(`data-${currency}`);
                    if (newPrice) {
                        // Optional: Add a fade effect
                        priceEl.style.opacity = '0';
                        setTimeout(() => {
                            priceEl.textContent = newPrice;
                            priceEl.style.opacity = '1';
                        }, 200);
                    }
                });
            });
        });
    }
    // Collapsible Sections (Why Work With Us)
    const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
    collapsibleTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            trigger.classList.toggle('active');
            const content = trigger.nextElementSibling;

            if (trigger.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // FAQ Accordion
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isActive = trigger.classList.contains('active');

            // Close all
            faqTriggers.forEach(t => {
                t.classList.remove('active');
                t.nextElementSibling.style.maxHeight = null;
            });


            // If it wasn't active, open it
            if (!isActive) {
                trigger.classList.add('active');
                const content = trigger.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Message Button & Toast Logic
    const messageBtns = document.querySelectorAll('.btn-insta-message');

    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        container.appendChild(toast);

        // Trigger reflow
        void toast.offsetWidth;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    messageBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('This feature is not available yet');
        });
    });

});

// Add to your CSS:
/*
.animated {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animated.visible {
    opacity: 1;
    transform: translateY(0);
}
*/