document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    const closeBtn = document.getElementById('closeBtn');
    const reviewForm = document.getElementById('reviewForm');
    const starRating = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating');
    const overlay = document.getElementById('overlay');
    const photoInput = document.getElementById('photo');
    const fileName = document.getElementById('fileName');
    const sortBy = document.getElementById('sortBy');
    const filterRating = document.getElementById('filterRating');
    
    // Sample reviews data (in a real app, this would come from a database)
    const sampleReviews = [
        {
            name: "Rajesh Kumar",
            membership: "premium",
            duration: "2+",
            rating: 5,
            review: "Joining Elite Fitness was the best decision I made for my health. When I started, I was 105kg with high blood pressure. The trainers created a customized plan that worked with my busy IT job schedule. Today, I'm 78kg with normal BP and ran my first marathon last month!",
            achievements: "Lost 27kg, Normalized BP, Completed Mumbai Marathon",
            date: "June 15, 2023",
            helpful: 24,
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
            beforePhoto: "https://via.placeholder.com/150x150/e63946/ffffff?text=Before",
            afterPhoto: "https://via.placeholder.com/150x150/ffffff/e63946?text=After+1Yr"
        },
        {
            name: "Priya Sharma",
            membership: "family",
            duration: "1-2",
            rating: 5,
            review: "As a mother of two, I struggled with post-pregnancy weight and low energy. The women's-only sessions made me comfortable to start. The nutrition guidance was game-changing - I learned to eat right for my body type. My whole family now comes - my husband takes the HIIT classes while the kids enjoy the childcare area. We've made fitness a family value!",
            achievements: "Post-pregnancy transformation, Family fitness routine, Completed 100 yoga classes",
            date: "May 2, 2023",
            helpful: 56,
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
            featured: true
        },
        {
            name: "Amit Patel",
            membership: "student",
            duration: "6-12",
            rating: 4,
            review: "The student discount makes this gym affordable for me. Equipment is top-notch and well-maintained. The only downside is it gets crowded during 6-8pm. I've learned to come early mornings instead. Special shoutout to trainer Rohan who helped me correct my squat form - my knee pain disappeared after his corrections!",
            achievements: "Gained 8kg muscle, Fixed squat form, Deadlift 1.5x bodyweight",
            date: "April 22, 2023",
            helpful: 12,
            photo: "https://randomuser.me/api/portraits/men/67.jpg"
        },
        {
            name: "Neha Gupta",
            membership: "premium",
            duration: "3-6",
            rating: 5,
            review: "I was skeptical about joining a gym as I'd never exercised regularly before. The beginner's program eased me in perfectly. After 4 months, I'm doing things I never thought possible - lifting weights, enjoying spin classes, and actually looking forward to workouts! The community here is incredibly supportive.",
            achievements: "First-time exerciser, Consistently trained 4x/week for 4 months",
            date: "March 10, 2023",
            helpful: 18,
            photo: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            name: "Vikram Singh",
            membership: "corporate",
            duration: "1-2",
            rating: 4,
            review: "Our company partnered with Elite Fitness for employee wellness. The corporate rates are excellent and having a gym near the office makes it convenient. I've noticed significant improvements in my energy levels and productivity at work since joining. The lunchtime express classes are perfect for busy professionals.",
            achievements: "Lowered stress levels, Improved work productivity",
            date: "February 28, 2023",
            helpful: 9,
            photo: "https://randomuser.me/api/portraits/men/75.jpg"
        }
    ];
    
    // Show review form
    addReviewBtn.addEventListener('click', function() {
        reviewFormContainer.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close review form
    closeBtn.addEventListener('click', closeReviewForm);
    overlay.addEventListener('click', closeReviewForm);
    
    function closeReviewForm() {
        reviewFormContainer.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Star rating functionality
    starRating.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            
            starRating.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.add('far');
                    s.classList.remove('fas');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            
            starRating.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            starRating.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });
    
    // Photo upload display
    photoInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });
    
    // Form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const membership = document.getElementById('membership').value;
        const duration = document.getElementById('duration').value;
        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('review').value;
        const achievements = document.getElementById('achievements').value;
        const photoInput = document.getElementById('photo');
        
        // Get current date
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        // Default photo if none uploaded
        let photoSrc = 'https://randomuser.me/api/portraits/lego/1.jpg';
        
        // Create new review object
        const newReview = {
            name: name,
            membership: membership,
            duration: duration,
            rating: rating,
            review: reviewText,
            achievements: achievements,
            date: formattedDate,
            helpful: 0,
            photo: photoSrc
        };
        
        // Handle photo upload if exists
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newReview.photo = e.target.result;
                addReviewToDOM(newReview);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            addReviewToDOM(newReview);
        }
    });
    
    // Add review to the page
    function addReviewToDOM(review) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.dataset.rating = review.rating;
        reviewCard.dataset.duration = review.duration;
        
        // Determine membership badge class
        let badgeClass = '';
        let badgeText = '';
        if (review.membership === 'premium') {
            badgeClass = 'premium';
            badgeText = 'Premium';
        } else if (review.membership === 'family') {
            badgeClass = 'family';
            badgeText = 'Family';
        } else if (review.membership === 'student') {
            badgeClass = 'student';
            badgeText = 'Student';
        } else if (review.membership === 'corporate') {
            badgeClass = 'corporate';
            badgeText = 'Corporate';
        }
        
        // Create stars HTML
        let starsHTML = '';
        const fullStars = Math.floor(review.rating);
        const hasHalfStar = review.rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(review.rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        // Format duration text
        let durationText = '';
        switch(review.duration) {
            case '1-3':
                durationText = '1-3 months';
                break;
            case '3-6':
                durationText = '3-6 months';
                break;
            case '6-12':
                durationText = '6-12 months';
                break;
            case '1-2':
                durationText = '1-2 years';
                break;
            case '2+':
                durationText = '2+ years';
                break;
            default:
                durationText = review.duration;
        }
        
        // Create review card HTML
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="member-photo">
                    <img src="${review.photo}" alt="${review.name}">
                    ${badgeText ? `<div class="member-badge ${badgeClass}">${badgeText}</div>` : ''}
                </div>
                <div class="member-info">
                    <h3>${review.name}</h3>
                    <div class="meta-info">
                        <span class="duration"><i class="far fa-calendar-alt"></i> ${durationText}</span>
                        ${badgeText ? `<span class="membership"><i class="far fa-id-card"></i> ${badgeText}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${starsHTML}
                        <span>${review.rating}.0</span>
                    </div>
                </div>
            </div>
            <div class="review-content">
                <p>${review.review}</p>
                ${review.achievements ? `
                <div class="achievements">
                    <i class="fas fa-trophy"></i> <strong>Achievements:</strong> ${review.achievements}
                </div>` : ''}
            </div>
            <div class="review-footer">
                <div class="review-date">Posted: ${review.date}</div>
                <div class="review-helpful">
                    <button class="helpful-btn"><i class="far fa-thumbs-up"></i> Helpful (${review.helpful})</button>
                </div>
            </div>
        `;
        
        // Add helpful button functionality
        const helpfulBtn = reviewCard.querySelector('.helpful-btn');
        helpfulBtn.addEventListener('click', function() {
            const countSpan = this.querySelector('span') || document.createElement('span');
            let count = parseInt(this.textContent.match(/\d+/)[0]);
            count++;
            this.innerHTML = `<i class="far fa-thumbs-up"></i> Helpful (${count})`;
        });
        
        // Add new review to the container (after the filter controls)
        const reviewsContainer = document.querySelector('.reviews-container');
        const addReviewBtn = document.getElementById('addReviewBtn');
        reviewsContainer.insertBefore(reviewCard, addReviewBtn.nextSibling);
        
        // Reset form
        reviewForm.reset();
        starRating.forEach(star => {
            star.classList.remove('active');
            star.classList.add('far');
            star.classList.remove('fas');
        });
        fileName.textContent = 'No file chosen';
        
        // Close form
        closeReviewForm();
        
        // Show success message
        showAlert('Thank you for your review! It has been added to our page.');
    }
    
    // Filter and sort functionality
    sortBy.addEventListener('change', filterAndSortReviews);
    filterRating.addEventListener('change', filterAndSortReviews);
    
    function filterAndSortReviews() {
        const reviews = Array.from(document.querySelectorAll('.review-card'));
        const sortValue = sortBy.value;
        const filterValue = filterRating.value;
        
        // Filter reviews
        let filteredReviews = reviews.filter(review => {
            if (filterValue === 'all') return true;
            return review.dataset.rating >= filterValue;
        });
        
        // Sort reviews
        filteredReviews.sort((a, b) => {
            if (sortValue === 'newest') {
                // This would ideally use actual dates, but we're using the order in the HTML for this demo
                return 0;
            } else if (sortValue === 'highest') {
                return b.dataset.rating - a.dataset.rating;
            } else if (sortValue === 'lowest') {
                return a.dataset.rating - b.dataset.rating;
            } else if (sortValue === 'longest') {
                const durationOrder = {'1-3': 1, '3-6': 2, '6-12': 3, '1-2': 4, '2+': 5};
                return durationOrder[b.dataset.duration] - durationOrder[a.dataset.duration];
            }
            return 0;
        });
        
        // Re-append reviews in new order
        const reviewsContainer = document.querySelector('.reviews-container');
        const addReviewBtn = document.getElementById('addReviewBtn');
        const filterControls = document.querySelector('.filter-controls');
        
        // Remove all reviews (except the add review button and filter controls)
        reviews.forEach(review => reviewsContainer.removeChild(review));
        
        // Add filtered and sorted reviews back
        filteredReviews.forEach(review => {
            reviewsContainer.insertBefore(review, addReviewBtn);
        });
    }
    
    // Show alert message
    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert-message';
        alertDiv.textContent = message;
        alertDiv.style.position = 'fixed';
        alertDiv.style.bottom = '20px';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translateX(-50%)';
        alertDiv.style.backgroundColor = 'var(--primary-red)';
        alertDiv.style.color = 'white';
        alertDiv.style.padding = '15px 30px';
        alertDiv.style.borderRadius = '4px';
        alertDiv.style.zIndex = '1001';
        alertDiv.style.boxShadow = '0 3px 10px rgba(0,0,0,0.3)';
        alertDiv.style.animation = 'fadeIn 0.3s ease-in-out';
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'fadeOut 0.3s ease-in-out';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for alert animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the page with sample reviews
    sampleReviews.forEach(review => {
        addReviewToDOM(review);
    });
});
// Booking System Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('freeSessionForm');
    const bookingModal = document.getElementById('bookingModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const bookingDetails = document.getElementById('bookingDetails');
    const printConfirmation = document.getElementById('printConfirmation');
    const addToCalendar = document.getElementById('addToCalendar');
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('bookingName').value;
        const email = document.getElementById('bookingEmail').value;
        const phone = document.getElementById('bookingPhone').value;
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;
        const goals = document.getElementById('bookingGoals').value;
        const experience = document.getElementById('bookingExperience').value;
        
        // Format date
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Format time slot
        let timeSlot = '';
        switch(time) {
            case 'morning':
                timeSlot = 'Morning (6am-10am)';
                break;
            case 'afternoon':
                timeSlot = 'Afternoon (12pm-3pm)';
                break;
            case 'evening':
                timeSlot = 'Evening (5pm-9pm)';
                break;
            case 'custom':
                timeSlot = 'Custom Time (to be arranged)';
                break;
            default:
                timeSlot = time;
        }
        
        // Set confirmation message
        confirmationMessage.innerHTML = `Thank you, <strong>${name}</strong>! Your free session has been scheduled.`;
        
        // Set booking details
        bookingDetails.innerHTML = `
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time Slot:</strong> ${timeSlot}</p>
            <p><strong>Contact:</strong> ${phone} | ${email}</p>
            ${goals ? `<p><strong>Your Goals:</strong> ${goals}</p>` : ''}
            ${experience ? `<p><strong>Experience Level:</strong> ${experience.charAt(0).toUpperCase() + experience.slice(1)}</p>` : ''}
        `;
        
        // Show modal
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // In a real application, you would send this data to your server here
        console.log('Booking submitted:', {
            name,
            email,
            phone,
            date,
            time,
            goals,
            experience
        });
        
        // Reset form
        bookingForm.reset();
    });
    
    // Close modal
    modalCloseBtn.addEventListener('click', function() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Print confirmation
    printConfirmation.addEventListener('click', function() {
        const printContent = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h2 style="color: #e63946; text-align: center;">Elite Fitness - Session Confirmation</h2>
                <div style="margin-top: 30px;">
                    ${confirmationMessage.innerHTML}
                </div>
                <div style="margin-top: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px;">
                    ${bookingDetails.innerHTML}
                </div>
                <div style="margin-top: 30px; font-size: 0.9em; color: #666;">
                    <p>Please bring this confirmation with you when you come for your session.</p>
                    <p>Address: 123 Fitness Street, Gym City, GC 12345</p>
                    <p>Phone: (555) 123-4567</p>
                </div>
            </div>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    });
    
    // Add to calendar
    addToCalendar.addEventListener('click', function() {
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;
        
        // Set default time based on time slot
        let startTime = '10:00';
        let endTime = '11:00';
        
        switch(time) {
            case 'morning':
                startTime = '08:00';
                endTime = '09:00';
                break;
            case 'afternoon':
                startTime = '13:00';
                endTime = '14:00';
                break;
            case 'evening':
                startTime = '18:00';
                endTime = '19:00';
                break;
        }
        
        // Format for ICS file
        const startDateTime = `${date.replace(/-/g, '')}T${startTime.replace(/:/g, '')}00`;
        const endDateTime = `${date.replace(/-/g, '')}T${endTime.replace(/:/g, '')}00`;
        
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:Elite Fitness - Free Session
DESCRIPTION:Your free gym session at Elite Fitness. Please arrive 10 minutes early.
LOCATION:123 Fitness Street, Gym City, GC 12345
END:VEVENT
END:VCALENDAR
        `.trim();
        
        // Create download link
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'elite-fitness-session.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show message
        alert('Calendar event downloaded. Open the file to add to your calendar.');
    });
    
    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});