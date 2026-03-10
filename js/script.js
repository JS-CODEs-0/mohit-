/* ============================================
   MOHIT MOTWANI — PORTFOLIO JS
   Animations, Interactions, Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ LOADER ============
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        }, 1500);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        }, 1500);
    }

    // ============ CUSTOM CURSOR ============
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .skill-item, .contact-item, .social-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============ HERO ANIMATIONS ============
    function initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero .reveal-up');
        heroElements.forEach((el, i) => {
            const delay = parseInt(el.dataset.delay || 0) * 150;
            setTimeout(() => {
                el.classList.add('revealed');
            }, 200 + delay);
        });
    }

    // ============ HERO PARTICLES ============
    const particlesContainer = document.getElementById('hero-particles');
    function createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${Math.random() > 0.5 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(6, 214, 214, 0.4)'};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // Add particle animation style
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0); opacity: 0; }
            25% { opacity: 1; }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px); opacity: 0.6; }
            75% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(particleStyle);

    // ============ SCROLL REVEAL (Intersection Observer) ============
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay || 0) * 120;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(el);
            }
        });
    }, revealOptions);

    // Don't observe hero elements (handled by initHeroAnimations)
    document.querySelectorAll('.reveal-up:not(.hero .reveal-up), .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // ============ STAT COUNTER ANIMATION ============
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 40);
    }

    // ============ PORTFOLIO VIDEO HOVER ============
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const video = card.querySelector('.portfolio-video');

        card.addEventListener('mouseenter', () => {
            if (video) {
                video.play().catch(() => {});
            }
        });

        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Click to toggle fullscreen playback
        card.addEventListener('click', () => {
            if (video) {
                if (video.requestFullscreen) {
                    video.muted = false;
                    video.requestFullscreen();
                    video.play();
                } else if (video.webkitRequestFullscreen) {
                    video.muted = false;
                    video.webkitRequestFullscreen();
                    video.play();
                }
            }
        });
    });

    // Mute when exiting fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            portfolioCards.forEach(card => {
                const video = card.querySelector('.portfolio-video');
                if (video) {
                    video.muted = true;
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }
    });

    // ============ SKILL BARS ============
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.classList.add('animated');
                }, 300);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ============ TESTIMONIAL CAROUSEL ============
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonial-dots');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentTestimonial = 0;
    let autoSlideTimer;

    // Create dots
    testimonialCards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        dotsContainer.appendChild(dot);
    });

    function goToTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        document.querySelectorAll('.testimonial-dots .dot').forEach(d => d.classList.remove('active'));

        currentTestimonial = index;
        testimonialCards[currentTestimonial].classList.add('active');
        document.querySelectorAll('.testimonial-dots .dot')[currentTestimonial].classList.add('active');

        resetAutoSlide();
    }

    prevBtn.addEventListener('click', () => {
        const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        goToTestimonial(prev);
    });

    nextBtn.addEventListener('click', () => {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        goToTestimonial(next);
    });

    function autoSlide() {
        autoSlideTimer = setInterval(() => {
            const next = (currentTestimonial + 1) % testimonialCards.length;
            goToTestimonial(next);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlide();
    }

    // Initialize first testimonial
    if (testimonialCards.length > 0) {
        testimonialCards[0].classList.add('active');
        autoSlide();
    }

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        // Construct mailto link
        const mailtoLink = `mailto:mohitmotwani314@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;

        // Show success feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
        submitBtn.querySelector('.btn-icon i').className = 'fas fa-check';

        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.querySelector('.btn-icon i').className = 'fas fa-paper-plane';
            contactForm.reset();
        }, 3000);
    });

    // ============ SMOOTH SCROLLING (for buttons) ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============ PARALLAX EFFECT (HERO) ============
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroVideo = document.querySelector('.hero-video-wrapper');
        const heroContent = document.querySelector('.hero-content');

        if (heroVideo && scrolled < window.innerHeight) {
            heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
        }
    });

    // ============ TILT EFFECT ON SERVICE CARDS ============
    const tiltCards = document.querySelectorAll('.service-card, .skill-item');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ============ MAGNETIC BUTTON EFFECT ============
    const magneticBtns = document.querySelectorAll('.btn, .social-link, .nav-cta');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============ TEXT SCRAMBLE EFFECT FOR HERO ============
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-gradient" style="opacity:0.7">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    // Apply scramble to tagline gradient text
    setTimeout(() => {
        const gradientText = document.querySelector('.hero-tagline .text-gradient');
        if (gradientText) {
            const fx = new TextScramble(gradientText);
            const phrases = ['viral cinematic stories.', 'engaging visual content.', 'scroll-stopping edits.', 'viral cinematic stories.'];
            let counter = 0;

            const nextPhrase = () => {
                fx.setText(phrases[counter]).then(() => {
                    setTimeout(nextPhrase, 3000);
                });
                counter = (counter + 1) % phrases.length;
            };

            setTimeout(nextPhrase, 4000);
        }
    }, 2000);

});
