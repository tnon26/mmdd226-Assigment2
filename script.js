// Video scrolling effect - cycles through images based on scroll position
function initVideoScroll() {
    const scrollImage = document.getElementById('scroll-image');
    const scrollSection = document.querySelector('.video-scroll-section');
    const scrollSpacer = document.querySelector('.video-scroll-spacer');
    
    if (!scrollImage || !scrollSection || !scrollSpacer) return;
    
    const totalImages = 40; // 40 images total (00000 to 00039)
    const imagePath = 'assets/video-scrolling/Grandfather_Clock_Video_Generation_';
    let currentImageIndex = -1;
    
    function updateImage() {
        const scrollY = window.pageYOffset;
        const sectionTop = scrollSection.offsetTop;
        const spacerHeight = scrollSpacer.offsetHeight;
        
        // Calculate progress: 0 when at section start, 1 when spacer is fully scrolled
        const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / spacerHeight));
        
        // Calculate which image to display (0 to 39)
        const imageIndex = Math.min(Math.floor(progress * totalImages), totalImages - 1);
        
        // Update image only if it changed
        if (imageIndex !== currentImageIndex) {
            currentImageIndex = imageIndex;
            const imageNumber = String(imageIndex).padStart(5, '0');
            scrollImage.src = `${imagePath}${imageNumber}.jpeg`;
        }
    }
    
    window.addEventListener('scroll', updateImage);
    updateImage(); // Initial load
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video scroll effect
    initVideoScroll();
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.nav-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Add click handlers for product buttons
    const productButtons = document.querySelectorAll('.product-button');
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            alert(`${productName} has been added to your cart.`);
        });
    });

    // Add click handlers for category buttons
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryName = this.closest('.category-card').querySelector('h3').textContent;
            alert(`Exploring category: ${categoryName}`);
        });
    });

    // Add click handler for View All button
    const viewAllButton = document.querySelector('.view-all-button');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            alert('Viewing all categories');
        });
    }

    // Add click handler for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product and category cards
    const cards = document.querySelectorAll('.product-card, .category-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

