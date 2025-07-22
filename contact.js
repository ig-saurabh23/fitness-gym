// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navbar) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to a server
        // For demo, we'll just show the success modal
        showSuccessModal();
        
        // Reset form
        this.reset();
    });
}

// Modal Functions
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

// Close modal when clicking X or close button
document.querySelectorAll('.close-modal, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Form Input Animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    // Check if input has value on page load
    if (input.value) {
        input.previousElementSibling.style.top = '-1.2rem';
        input.previousElementSibling.style.fontSize = '0.9rem';
        input.previousElementSibling.style.color = '#ff3131';
    }
    
    input.addEventListener('focus', function() {
        this.previousElementSibling.style.top = '-1.2rem';
        this.previousElementSibling.style.fontSize = '0.9rem';
        this.previousElementSibling.style.color = '#ff3131';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.previousElementSibling.style.top = '1rem';
            this.previousElementSibling.style.fontSize = '1.1rem';
            this.previousElementSibling.style.color = '#777';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.info-box, .contact-form, .map-container, .cta-content').forEach(el => {
    observer.observe(el);
});