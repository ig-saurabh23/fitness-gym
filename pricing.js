document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const paymentModal = document.getElementById('paymentModal');
    const hireModal = document.getElementById('hireModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Pay Now buttons for plans
    const paynowButtons = document.querySelectorAll('.paynow-btn');
    paynowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            
            document.getElementById('paymentPlan').textContent = plan;
            document.getElementById('paymentAmount').textContent = price;
            
            paymentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Hire Now buttons for experts
    const hireButtons = document.querySelectorAll('.hire-btn');
    hireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expert = this.getAttribute('data-expert');
            const service = this.getAttribute('data-service');
            const price = this.getAttribute('data-price');
            
            document.getElementById('hireExpertName').textContent = expert;
            document.getElementById('hireService').textContent = service;
            document.getElementById('hirePrice').textContent = price;
            
            hireModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            paymentModal.style.display = 'none';
            hireModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === hireModal) {
            hireModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submissions
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const plan = document.getElementById('paymentPlan').textContent;
        const amount = document.getElementById('paymentAmount').textContent;
        
        // In real implementation, process payment here
        alert(`Payment initiated for ${plan} plan (₹${amount})\nThank you, ${name}!`);
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.reset();
    });
    
    document.getElementById('hireForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('hireName').value;
        const expert = document.getElementById('hireExpertName').textContent;
        const service = document.getElementById('hireService').textContent;
        const price = document.getElementById('hirePrice').textContent;
        
        // In real implementation, process booking here
        alert(`Booking confirmed with ${expert} for ${service} (₹${price})\nThank you, ${name}!`);
        hireModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.reset();
    });
    
    // Hover effects for all buttons
    const allButtons = document.querySelectorAll('.btn, .hire-btn, .modal-pay-btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 0 15px #ff0000';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Animation for pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 0 25px #ff0000';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Animation for expert cards
    const expertCards = document.querySelectorAll('.expert-card');
    expertCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 0 25px #ff0000';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Animation for payment options
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'translateY(-5px)';
            option.style.boxShadow = '0 0 15px #ff0000';
        });
        
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'translateY(0)';
            option.style.boxShadow = 'none';
        });
    });
});