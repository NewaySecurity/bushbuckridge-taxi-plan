document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => {
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Add fade-in animation for cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all strategy cards and impact cards
    document.querySelectorAll('.strategy-card, .impact-card, .timeline-item').forEach(card => {
        observer.observe(card);
    });

    // Add loading animation for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Add hover effects for strategy cards
    const strategyCards = document.querySelectorAll('.strategy-card');
    strategyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#38a169';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#3182ce';
        });
    });

    // Add click-to-call functionality
    const phoneNumbers = document.querySelectorAll('.contact-details p:first-child');
    phoneNumbers.forEach(phone => {
        phone.style.cursor = 'pointer';
        phone.addEventListener('click', function() {
            const phoneText = this.textContent.trim();
            const phoneNumber = phoneText.replace(/\D/g, '');
            window.open(`tel:+27${phoneNumber}`, '_self');
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Add counter animation for vision stats
    const counters = document.querySelectorAll('.stat-item');
    const countOptions = {
        threshold: 0.7
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                statItem.classList.add('count-up');
            }
        });
    }, countOptions);

    counters.forEach(counter => {
        countObserver.observe(counter);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add progressive loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Add form submission handling (if contact form exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.cssText = `
                background: #38a169;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                animation: slideIn 0.5s ease-out;
            `;
            
            this.appendChild(successMessage);
            this.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Add download functionality for presentation
    function downloadPresentation() {
        // This would typically trigger a download of the presentation file
        alert('Presentation download will be available soon. Please contact Brilliant Mashele for a copy.');
    }

    // Add print functionality
    function printPage() {
        window.print();
    }

    // Add share functionality
    function shareContent() {
        if (navigator.share) {
            navigator.share({
                title: 'Bushbuckridge Taxi Association Economic Growth Plan',
                text: 'Check out this comprehensive economic development plan for the Bushbuckridge Taxi Association',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    }

    // Make functions globally available
    window.downloadPresentation = downloadPresentation;
    window.printPage = printPage;
    window.shareContent = shareContent;

    // Add scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3182ce, #38a169);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    createScrollProgress();

    // Add easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);

        if (konamiCode.join('') === konamiSequence.join('')) {
            // Easter egg: Show special message
            const easterEgg = document.createElement('div');
            easterEgg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #1a365d, #3182ce);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: bounceIn 0.8s ease-out;
            `;
            easterEgg.innerHTML = `
                <h3>🎉 Congratulations! 🎉</h3>
                <p>You found the secret! You're clearly committed to exploring every detail of our plan.</p>
                <p>That's the kind of dedication we need to transform Bushbuckridge!</p>
                <button onclick="this.parentElement.remove()" style="
                    background: #38a169;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    margin-top: 1rem;
                    cursor: pointer;
                ">Close</button>
            `;
            document.body.appendChild(easterEgg);

            setTimeout(() => {
                if (easterEgg.parentElement) {
                    easterEgg.remove();
                }
            }, 10000);
        }
    });

    console.log('🚌 Welcome to the Bushbuckridge Taxi Association Digital Transformation Plan!');
    console.log('💡 Built with passion by BubbleRoot Studios');
    console.log('📱 Try the Konami code for a surprise!');
});
