// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Calculate and update totals
    function updateTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 150) : 0;
        const tax = subtotal * 0.05;
        const total = subtotal + shipping + tax;

        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    // Render cart items
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class='bx bx-cart'></i>
                    <p>Your cart is empty</p>
                    <button class="empty-cart-btn" onclick="window.location.href='index.html'">Continue Shopping</button>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-category">${item.category}</p>
                    <span class="cart-item-remove" data-index="${index}">Remove</span>
                </div>
                <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    saveCart();
                }
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                saveCart();
            });
        });

        // Add event listener to quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const newQuantity = parseInt(this.value);
                if (newQuantity >= 1) {
                    cart[index].quantity = newQuantity;
                    saveCart();
                } else {
                    this.value = cart[index].quantity;
                }
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                saveCart();
            });
        });
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateTotals();
        renderCartItems();
    }

    // Clear cart
    clearCartBtn.addEventListener('click', function() {
        if (cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty. Please add items to proceed to checkout.');
        }
    });

    // Initialize
    updateCartCount();
    updateTotals();
    renderCartItems();
});