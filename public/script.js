// Global variables
const whatsappNumber = "573001234567"; // Cambiar por el número real
const whatsappMessage = "Hola! Me interesa solicitar una cotización para servicios eléctricos";
let currentSlide = 0;
const totalSlides = 3;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    showSlide(currentSlide);
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    
    // Initialize icons
    if (typeof feather !== 'undefined') {
        feather.replace();
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
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
});

// WhatsApp contact handler
function handleWhatsAppContact() {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
}

// Phone call handler
function handlePhoneCall() {
    window.open(`tel:+${whatsappNumber}`, '_blank');
}

// Mobile menu handlers
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Carousel functions
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    
    if (n >= totalSlides) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = totalSlides - 1;
    }
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const serviceType = document.getElementById('service-type').value;
    const projectDescription = document.getElementById('project-description').value;
    
    const message = `Hola! Me interesa solicitar una cotización para:
    
Tipo de servicio: ${serviceType}
Descripción: ${projectDescription}

Gracias!`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Preload carousel images
function preloadImages() {
    const images = [
        'src/assets/electrical-work-1.jpg',
        'src/assets/electrical-work-2.jpg',
        'src/assets/electrical-work-3.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on DOM ready
document.addEventListener('DOMContentLoaded', preloadImages);

// Add click handlers for carousel navigation
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Add touch/swipe support for mobile carousel
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });
    }
});

// Analytics tracking (placeholder - replace with actual analytics)
function trackEvent(eventName, eventData = {}) {
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
    
    console.log('Event tracked:', eventName, eventData);
}

// Track important interactions
function trackWhatsAppClick() {
    trackEvent('whatsapp_click', {
        source: 'website',
        page: window.location.pathname
    });
}

function trackPhoneClick() {
    trackEvent('phone_click', {
        source: 'website',
        page: window.location.pathname
    });
}

// Enhanced WhatsApp contact with tracking
function handleWhatsAppContact() {
    trackWhatsAppClick();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
}

// Enhanced phone contact with tracking
function handlePhoneCall() {
    trackPhoneClick();
    window.open(`tel:+${whatsappNumber}`, '_blank');
}

// Form validation
function validateForm() {
    const serviceType = document.getElementById('service-type');
    const projectDescription = document.getElementById('project-description');
    
    if (!serviceType.value) {
        alert('Por favor selecciona un tipo de servicio');
        return false;
    }
    
    if (!projectDescription.value.trim()) {
        alert('Por favor describe tu proyecto');
        return false;
    }
    
    if (projectDescription.value.trim().length < 10) {
        alert('Por favor proporciona una descripción más detallada (mínimo 10 caracteres)');
        return false;
    }
    
    return true;
}

// Enhanced form submission with validation
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const serviceType = document.getElementById('service-type').value;
    const projectDescription = document.getElementById('project-description').value;
    
    const message = `Hola! Me interesa solicitar una cotización para:

Tipo de servicio: ${serviceType}
Descripción: ${projectDescription}

Gracias!`;
    
    trackEvent('form_submission', {
        service_type: serviceType,
        description_length: projectDescription.length
    });
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add loading states
function showLoading(element) {
    const originalText = element.innerHTML;
    element.innerHTML = '<i data-feather="loader" class="animate-spin"></i> Cargando...';
    element.disabled = true;
    
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    return originalText;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
    
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send to error tracking service here
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log('Page loaded in:', Math.round(loadTime), 'ms');
    
    // Track page load time
    trackEvent('page_load', {
        load_time: Math.round(loadTime),
        page: window.location.pathname
    });
});