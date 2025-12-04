// TDV Adviseert - Ultra-Modern JavaScript
// Smooth scrolling, mobile menu, and scroll animations

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Smooth Scrolling Navigation
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinksMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinksMenu = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinksMenu.classList.remove('active');
        }
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });

    // Observe text blocks
    const textBlocks = document.querySelectorAll('.text-block');
    textBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(' + (index % 2 === 0 ? '-30px' : '30px') + ')';
        block.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(block);
    });

    // ============================================
    // Form Handling (Basic validation)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const naam = document.getElementById('naam').value;
            const telefoon = document.getElementById('telefoon').value;
            const email = document.getElementById('email').value;
            const bericht = document.getElementById('bericht').value;

            // Basic validation
            if (naam && telefoon && email && bericht) {
                // Here you would normally send the form data to a server
                // For now, we'll just show an alert
                alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
                contactForm.reset();
            } else {
                alert('Vul alsjeblieft alle velden in.');
            }
        });
    }

    // ============================================
    // Smooth Page Load
    // ============================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // ============================================
    // Performance: Reduce animations on low-end devices
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.animate-fade-in-up').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
        });
    }
});

// ============================================
// Parallax Effect for Hero (Optional)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
