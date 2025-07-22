// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });
});

// Dropdown menu functionality for mobile
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = toggle.parentElement;
            parent.classList.toggle('active');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.parentElement.classList.remove('active');
                }
            });
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// BMI Calculator
const calculateBtn = document.getElementById('calculate-btn');
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateBMI);
}

function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    
    // Clear previous error styles
    heightInput.style.borderColor = '';
    weightInput.style.borderColor = '';
    
    // Get values
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    // Validate inputs
    if (isNaN(height) || height <= 0) {
        resultDiv.textContent = 'Please enter valid height (positive number)';
        resultDiv.style.color = 'red';
        heightInput.style.borderColor = 'red';
        return;
    }
    
    if (isNaN(weight) || weight <= 0) {
        resultDiv.textContent = 'Please enter valid weight (positive number)';
        resultDiv.style.color = 'red';
        weightInput.style.borderColor = 'red';
        return;
    }
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Determine category
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3498db';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = '#2ecc71';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f39c12';
    } else {
        category = 'Obese';
        color = '#e74c3c';
    }
    
    // Display result
    resultDiv.innerHTML = `
        <p style="margin-bottom:5px;font-size:1.8rem">Your BMI: <strong>${bmi.toFixed(1)}</strong></p>
        <p style="font-size:1.6rem">Category: <strong style="color:${color}">${category}</strong></p>
    `;
    resultDiv.style.color = 'white';
}

// Event registration buttons
const registerButtons = document.querySelectorAll('.register-btn');
registerButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Thank you for your interest! Registration will open soon.');
    });
});

// Smooth scrolling for all links
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
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.row, .achievement-card, .schedule-card, .plan-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.row, .achievement-card, .schedule-card, .plan-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation after a short delay
    setTimeout(animateOnScroll, 100);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Form submission handler
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your submission! We will contact you soon.');
        form.reset();
    });
});

// Fix for mobile background rendering
function fixMobileBackground() {
    const homeSection = document.querySelector('.home');
    if (window.innerWidth <= 768) {
        homeSection.style.backgroundAttachment = 'scroll';
    }
}

// Run on load and resize
window.addEventListener('load', fixMobileBackground);
window.addEventListener('resize', fixMobileBackground);