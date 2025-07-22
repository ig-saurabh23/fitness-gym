document.addEventListener('DOMContentLoaded', function() {
    // Product Gallery Image Switching
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Change main image
            const newImageSrc = this.getAttribute('data-image');
            if (newImageSrc) {
                mainImage.src = newImageSrc;
                mainImage.alt = this.querySelector('img').alt;
                
                // Add animation effect
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                const tabContent = document.getElementById(tabId);
                if (tabContent) tabContent.classList.add('active');
            }
        });
    });

    // Quantity Selector
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');
    
    minusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
            animateButton(this);
        }
    });
    
    plusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let currentValue = parseInt(qtyInput.value);
        if (currentValue < 10) {
            qtyInput.value = currentValue + 1;
            animateButton(this);
        }
    });

    // Flavor and Size Selection
    const flavorBtns = document.querySelectorAll('.flavor-btn');
    const sizeBtns = document.querySelectorAll('.size-btn');
    
    flavorBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            flavorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            animateButton(this);
        });
    });
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            sizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            animateButton(this);
        });
    });

    // Review Modal
    const reviewModal = document.getElementById('reviewModal');
    const openReviewBtn = document.getElementById('openReviewModal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Open modal when clicking "Write a Review" button
    openReviewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        reviewModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal when clicking X button
    closeBtn.addEventListener('click', function() {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === reviewModal) {
            reviewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Star Rating
    const starInputs = document.querySelectorAll('.rating-input input');
    const starLabels = document.querySelectorAll('.rating-input label');
    
    starLabels.forEach((label, index) => {
        label.addEventListener('click', function() {
            // Reset all stars
            starLabels.forEach(l => {
                l.innerHTML = '<i class="bx bx-star"></i>';
                if (l.previousElementSibling) {
                    l.previousElementSibling.checked = false;
                }
            });
            
            // Fill stars up to the clicked one
            for (let i = 0; i <= index; i++) {
                starLabels[i].innerHTML = '<i class="bx bxs-star"></i>';
                if (starInputs[i]) {
                    starInputs[i].checked = true;
                }
            }
        });
    });

    // Image Upload Preview
    const imageUpload = document.getElementById('reviewImages');
    const imagePreview = document.getElementById('imagePreview');
    
    imageUpload.addEventListener('change', function() {
        imagePreview.innerHTML = '';
        const files = this.files;
        
        if (files.length > 3) {
            alert('You can upload a maximum of 3 images');
            this.value = '';
            return;
        }
        
        Array.from(files).forEach((file, i) => {
            if (!file.type.match('image.*')) {
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'preview-image';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-image';
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', function() {
                    imgContainer.remove();
                    // Create new FileList without the removed image
                    const dataTransfer = new DataTransfer();
                    Array.from(imageUpload.files)
                        .filter((_, idx) => idx !== i)
                        .forEach(file => dataTransfer.items.add(file));
                    imageUpload.files = dataTransfer.files;
                });
                
                imgContainer.appendChild(img);
                imgContainer.appendChild(removeBtn);
                imagePreview.appendChild(imgContainer);
            };
            
            reader.readAsDataURL(file);
        });
    });

    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.querySelector('.reviews-list');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const rating = document.querySelector('input[name="rating"]:checked');
        const title = document.getElementById('reviewTitle').value;
        const text = document.getElementById('reviewText').value;
        const name = document.getElementById('userName').value;
        
        if (!rating || !title || !text || !name) {
            alert('Please fill all required fields');
            return;
        }
        
        // Create new review element
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.setAttribute('data-rating', rating.value);
        
        // Get current date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Create review HTML
        reviewCard.innerHTML = `
            <div class="reviewer-info">
                <div class="avatar">
                    ${imageUpload.files.length > 0 ? 
                        `<img src="${URL.createObjectURL(imageUpload.files[0])}" alt="${name}">` : 
                        '<i class="bx bx-user"></i>'}
                </div>
                <div class="name-date">
                    <h4>${name}</h4>
                    <div class="verified">
                        <i class='bx bx-badge-check'></i> Verified Buyer
                    </div>
                    <div class="date">${formattedDate}</div>
                </div>
            </div>
            <div class="review-content">
                <div class="rating">${'★'.repeat(rating.value) + '☆'.repeat(5 - rating.value)}</div>
                <h3>${title}</h3>
                <p>${text}</p>
                ${imageUpload.files.length > 0 ? 
                    `<div class="review-images">
                        ${Array.from(imageUpload.files).map(file => 
                            `<img src="${URL.createObjectURL(file)}" alt="Review image">`
                        ).join('')}
                    </div>` : ''}
                <div class="review-actions">
                    <button class="helpful-btn">
                        <i class='bx bx-like'></i> Helpful (0)
                    </button>
                </div>
            </div>
        `;
        
        // Add new review to the top of the list
        reviewsList.prepend(reviewCard);
        
        // Reset form
        reviewForm.reset();
        imagePreview.innerHTML = '';
        imageUpload.value = '';
        
        // Close modal
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Show success message
        showNotification('Thank you for your review!');
        
        // Update helpful buttons for new review
        const newHelpfulBtn = reviewCard.querySelector('.helpful-btn');
        if (newHelpfulBtn) {
            newHelpfulBtn.addEventListener('click', function() {
                const countMatch = this.textContent.match(/\((\d+)\)/);
                if (countMatch) {
                    let count = parseInt(countMatch[1]);
                    count++;
                    this.innerHTML = `<i class='bx bx-like'></i> Helpful (${count})`;
                    animateButton(this);
                }
            });
        }
        
        // Scroll to the new review
        reviewCard.scrollIntoView({ behavior: 'smooth' });
    });

    // Review Sorting and Filtering
    const sortSelect = document.getElementById('sortReviews');
    const filterSelect = document.getElementById('filterReviews');
    const reviewCards = document.querySelectorAll('.review-card');
    
    function updateReviews() {
        const sortValue = sortSelect.value;
        const filterValue = filterSelect.value;
        
        // Convert NodeList to Array for sorting
        const reviewsArray = Array.from(reviewCards);
        
        // Filter reviews
        let filteredReviews = reviewsArray;
        if (filterValue !== 'all') {
            filteredReviews = reviewsArray.filter(review => {
                return review.getAttribute('data-rating') === filterValue;
            });
        }
        
        // Sort reviews
        filteredReviews.sort((a, b) => {
            if (sortValue === 'newest') {
                // This would normally use actual dates from data attributes
                return 0; // For demo, we won't actually sort
            } else if (sortValue === 'highest') {
                return parseInt(b.getAttribute('data-rating')) - parseInt(a.getAttribute('data-rating'));
            } else if (sortValue === 'lowest') {
                return parseInt(a.getAttribute('data-rating')) - parseInt(b.getAttribute('data-rating'));
            } else if (sortValue === 'helpful') {
                // This would use helpful count from data attributes
                return 0; // For demo, we won't actually sort
            }
            return 0;
        });
        
        // Re-append reviews in new order
        const reviewsContainer = document.querySelector('.reviews-list');
        reviewsContainer.innerHTML = '';
        filteredReviews.forEach(review => {
            reviewsContainer.appendChild(review);
        });
    }
    
    sortSelect.addEventListener('change', updateReviews);
    filterSelect.addEventListener('change', updateReviews);

    // Add to Cart Functionality
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = document.querySelector('.product-info h1').textContent;
        const selectedFlavor = document.querySelector('.flavor-btn.active').textContent;
        const selectedSize = document.querySelector('.size-btn.active').textContent;
        const quantity = document.querySelector('.qty-input').value;
        const price = document.querySelector('.current-price').textContent;
        
        // Update cart count
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + parseInt(quantity);
        
        // Show notification
        showNotification(`${quantity}x ${productName} (${selectedFlavor}, ${selectedSize}) added to cart`);
        
        // Animation for visual feedback
        animateButton(this);
        this.innerHTML = '<i class="bx bx-check"></i> Added to Cart';
        setTimeout(() => {
            this.innerHTML = '<i class="bx bx-cart"></i> Add to Cart';
        }, 2000);
    });

    // Buy Now Functionality
    const buyNowBtn = document.querySelector('.buy-now');
    
    buyNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = document.querySelector('.product-info h1').textContent;
        showNotification(`Proceeding to checkout for ${productName}`);
        animateButton(this);
        // In a real implementation, you would redirect to checkout page
        // window.location.href = 'checkout.html';
    });

    // Helpful Review Button
    document.querySelectorAll('.helpful-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const countMatch = this.textContent.match(/\((\d+)\)/);
            if (countMatch) {
                let count = parseInt(countMatch[1]);
                count++;
                this.innerHTML = `<i class='bx bx-like'></i> Helpful (${count})`;
                animateButton(this);
            }
        });
    });

    // Pagination
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            animateButton(this);
        });
    });

    // Quick View buttons in related products
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showNotification(`Quick view for ${productName}`);
        });
    });

    // View Details buttons in related products
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            animateButton(this);
        });
    });

    // Helper function for button animations
    function animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    // Helper function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add notification style dynamically
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--primary);
            color: white;
            padding: 12px 24px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 1000;
            transition: transform 0.3s ease;
        }
        .notification.show {
            transform: translateX(-50%) translateY(0);
        }
    `;
    document.head.appendChild(notificationStyle);
});
