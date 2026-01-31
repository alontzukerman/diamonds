// ========================================
// CART UI (Sidepanel rendering and animations)
// Note: Requires cart.js to be loaded first
// ========================================

// References to cart elements (set during initialization)
let cartOverlay = null;
let cartSidepanel = null;
let cartCloseBtn = null;
let cartBtn = null;
let cartContent = null;
let cartTotalPrice = null;

function initCartUI() {
    cartOverlay = document.getElementById('cart-overlay');
    cartSidepanel = document.getElementById('cart-sidepanel');
    cartCloseBtn = document.getElementById('cart-close-btn');
    cartBtn = document.querySelector('.navbar-cart');
    cartContent = document.getElementById('cart-content');
    cartTotalPrice = document.querySelector('.cart-total-price');
    
    // Set up event listeners
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }
    
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Set up Cart callbacks
    Cart.onUpdate(renderCartItems);
    Cart.onItemAdded(animateToCart);
    
    // Initial render
    renderCartItems(Cart.getItems(), Cart.getTotal());
}

function openCart() {
    if (cartOverlay) cartOverlay.classList.add('open');
    if (cartSidepanel) cartSidepanel.classList.add('open');
}

function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('open');
    if (cartSidepanel) cartSidepanel.classList.remove('open');
}

function isCartOpen() {
    return cartSidepanel && cartSidepanel.classList.contains('open');
}

// Render cart items
function renderCartItems(items, total) {
    if (!cartContent) return;
    
    // Clear current content
    cartContent.innerHTML = '';
    
    // Render each item
    items.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.setAttribute('data-cart-id', item.id);
        
        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'cart-item-image';
        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            imageContainer.appendChild(img);
        }
        
        // Premium star indicator
        if (item.premium) {
            const premiumStar = document.createElement('img');
            premiumStar.src = 'assets/icons/red-star.svg';
            premiumStar.alt = 'Premium';
            premiumStar.className = 'cart-item-premium';
            imageContainer.appendChild(premiumStar);
        }
        
        cartItemEl.appendChild(imageContainer);
        
        // Details container
        const details = document.createElement('div');
        details.className = 'cart-item-details';
        
        // Info box (name + optional size + price)
        const info = document.createElement('div');
        info.className = 'cart-item-info';
        
        const name = document.createElement('span');
        name.className = 'cart-item-name';
        name.textContent = item.name;
        info.appendChild(name);
        
        // Add size info for ring items
        if (item.size) {
            const sizeInfo = document.createElement('span');
            sizeInfo.className = 'cart-item-subtitle';
            sizeInfo.textContent = `Size: ${item.size}`;
            info.appendChild(sizeInfo);
        }
        
        // Add carat and source info for stone items (displayed side by side)
        if (item.carat || item.source) {
            const stoneInfo = document.createElement('span');
            stoneInfo.className = 'cart-item-subtitle';
            
            const parts = [];
            if (item.carat) {
                parts.push(`${item.carat.toFixed(2)} ct`);
            }
            if (item.source) {
                const sourceName = item.source === 'lab' ? 'Lab' : 'Natural';
                parts.push(sourceName);
            }
            stoneInfo.textContent = parts.join(' · ');
            info.appendChild(stoneInfo);
        }
        
        const price = document.createElement('span');
        price.className = 'cart-item-price';
        price.textContent = Cart.formatPrice(item.price);
        info.appendChild(price);
        
        details.appendChild(info);
        
        // Delete button (not functional yet)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'cart-item-delete';
        deleteBtn.textContent = 'Delete';
        details.appendChild(deleteBtn);
        
        cartItemEl.appendChild(details);
        cartContent.appendChild(cartItemEl);
    });
    
    // Update total price
    if (cartTotalPrice) {
        cartTotalPrice.textContent = Cart.formatPrice(total);
    }
}

// Flying animation to cart
function animateToCart(item, sourceElement) {
    if (!sourceElement || !cartBtn) return;
    
    // Get positions
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = cartBtn.getBoundingClientRect();
    
    // Create flying element
    const flyingEl = document.createElement('div');
    flyingEl.className = 'cart-flying-item';
    
    // If there's an image, use it
    if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        flyingEl.appendChild(img);
    } else {
        // Use a simple circle for non-image items
        flyingEl.style.background = '#F2E772';
        flyingEl.style.borderRadius = '50%';
    }
    
    // Position at source (centered)
    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;
    flyingEl.style.left = `${startX}px`;
    flyingEl.style.top = `${startY}px`;
    flyingEl.style.transform = 'translate(-50%, -50%) scale(1)';
    
    document.body.appendChild(flyingEl);
    
    // Calculate target position (center of cart button)
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    
    // Trigger animation after a small delay to ensure initial position is set
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            flyingEl.style.left = `${targetX}px`;
            flyingEl.style.top = `${targetY}px`;
            flyingEl.classList.add('flying');
        });
    });
    
    // Remove after animation (1s transition + buffer)
    setTimeout(() => {
        flyingEl.remove();
    }, 1100);
}
