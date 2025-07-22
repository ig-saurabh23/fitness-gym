 // Mobile Menu Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');

            mobileBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileBtn.classList.toggle('active');
            });

            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    navLinks.classList.remove('active');
                    mobileBtn.classList.remove('active');
                });
            });

            // Program Tabs
            const tabButtons = document.querySelectorAll('.tab-button');
            const programTabs = document.querySelectorAll('.program-tab');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and tabs
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    programTabs.forEach(tab => tab.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Show corresponding tab
                    const tabId = button.getAttribute('data-tab') + '-tab';
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Pricing Toggle
            const pricingToggle = document.getElementById('pricingToggle');
            const monthlyPrices = document.querySelectorAll('.price.monthly');
            const annualPrices = document.querySelectorAll('.price.annually');

            pricingToggle.addEventListener('change', () => {
                if (pricingToggle.checked) {
                    monthlyPrices.forEach(price => price.classList.add('hidden'));
                    annualPrices.forEach(price => price.classList.remove('hidden'));
                } else {
                    monthlyPrices.forEach(price => price.classList.remove('hidden'));
                    annualPrices.forEach(price => price.classList.add('hidden'));
                }
            });

            // Before/After Image Hover
            const resultCards = document.querySelectorAll('.result-card');
            
            resultCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.querySelector('.after').style.opacity = '1';
                    card.querySelector('.before').style.opacity = '0';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.querySelector('.after').style.opacity = '0';
                    card.querySelector('.before').style.opacity = '1';
                });
            });

            // Form Submission
            const tourForm = document.querySelector('.tour-form');
            
            if (tourForm) {
                tourForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Here you would typically send the form data to your server
                    alert('Thank you! We will contact you shortly to confirm your tour.');
                    this.reset();
                });
            }

            // Back to Top Button
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Scroll Animation
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.benefit-card, .program-tab, .result-card, .pricing-card, .tour-container');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };

            // Set initial state for animation
            const animatedElements = document.querySelectorAll('.benefit-card, .program-tab, .result-card, .pricing-card, .tour-container');
            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.5s ease';
            });

            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on load
        });