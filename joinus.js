document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });
    }

    // Photo Preview
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    photoPreview.querySelector('img').style.display = 'block';
                }
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Payment Method Toggle
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentDetails = {
        'credit-card': document.getElementById('creditCardDetails'),
        'upi': document.getElementById('upiDetails'),
        'net-banking': document.getElementById('netBankingDetails')
    };
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            Object.values(paymentDetails).forEach(detail => {
                if (detail) detail.classList.remove('active');
            });
            
            // Show selected payment details
            const selectedDetail = paymentDetails[this.value];
            if (selectedDetail) selectedDetail.classList.add('active');
        });
    });

    // Calculate and display payment summary
    function calculatePayment() {
        const selectedPlan = document.querySelector('input[name="membershipPlan"]:checked');
        const durationSelect = document.getElementById('duration');
        
        if (!selectedPlan || !durationSelect.value) return;
        
        const monthlyPrice = parseFloat(selectedPlan.dataset.monthlyPrice);
        const duration = parseInt(durationSelect.value);
        const discount = parseInt(durationSelect.options[durationSelect.selectedIndex].dataset.discount);
        
        const totalPrice = monthlyPrice * duration;
        const discountAmount = totalPrice * (discount / 100);
        const totalPayable = totalPrice - discountAmount;
        
        // Update payment summary
        document.getElementById('planPrice').textContent = `₹${monthlyPrice.toLocaleString()}`;
        document.getElementById('durationText').textContent = `${duration} Month${duration > 1 ? 's' : ''}`;
        document.getElementById('discountAmount').textContent = `₹${discountAmount.toFixed(2)} (${discount}%)`;
        document.getElementById('totalPayable').textContent = `₹${totalPayable.toFixed(2)}`;
    }
    
    // Listen for changes in plan or duration
    document.querySelectorAll('input[name="membershipPlan"]').forEach(radio => {
        radio.addEventListener('change', calculatePayment);
    });
    
    document.getElementById('duration').addEventListener('change', calculatePayment);

    // Form Validation and Submission
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Validate payment method details
            const selectedPaymentMethod = this.querySelector('input[name="paymentMethod"]:checked');
            if (!selectedPaymentMethod) {
                alert('Please select a payment method');
                return;
            }
            
            // Simulate form submission
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Form Data:', formObject); // For debugging
            
            // Show success message with payment summary
            const totalPayable = document.getElementById('totalPayable').textContent;
            alert(`Thank you for joining Fitness Freak!\n\nAmount Payable: ${totalPayable}\n\nYour membership will be activated after payment confirmation.`);
            
            // Reset form
            this.reset();
            photoPreview.innerHTML = `<i class='bx bx-user'></i><span>Preview will appear here</span>`;
            Object.values(paymentDetails).forEach(detail => {
                if (detail) detail.classList.remove('active');
            });
            
            // Reset payment summary
            document.getElementById('planPrice').textContent = '₹0';
            document.getElementById('durationText').textContent = '0 Months';
            document.getElementById('discountAmount').textContent = '₹0 (0%)';
            document.getElementById('totalPayable').textContent = '₹0';
        });
    }

    // Reset Button
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const photoPreview = document.getElementById('photoPreview');
            if (photoPreview) {
                photoPreview.innerHTML = `<i class='bx bx-user'></i><span>Preview will appear here</span>`;
            }
            
            Object.values(paymentDetails).forEach(detail => {
                if (detail) detail.classList.remove('active');
            });
            
            // Reset payment summary
            document.getElementById('planPrice').textContent = '₹0';
            document.getElementById('durationText').textContent = '0 Months';
            document.getElementById('discountAmount').textContent = '₹0 (0%)';
            document.getElementById('totalPayable').textContent = '₹0';
        });
    }

    // Card Number Formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = this.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            this.value = value;
        });
    }

    // Expiry Date Formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
});