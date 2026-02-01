// ========================================
// LOVE METER
// Heart position based on cart total price
// Note: Requires config.js, state.js, and cart.js to be loaded first
// ========================================

// Track which checkpoints have been triggered (to avoid repeating)
let triggeredCheckpoints = new Set();

/**
 * Calculate love level as percentage based on cart total
 * @returns {number} Percentage from 0-100
 */
function calculateLoveLevel() {
    if (typeof Cart === 'undefined' || !Cart.getTotal) {
        return 0;
    }
    
    const currentPrice = Cart.getTotal();
    const minPrice = LOVE_METER_CONFIG.minPrice;
    const maxPrice = LOVE_METER_CONFIG.maxPrice;
    
    // Calculate percentage within price range
    const priceRange = maxPrice - minPrice;
    if (priceRange <= 0) return 0;
    
    const percentage = ((currentPrice - minPrice) / priceRange) * 100;
    
    // Clamp between 0 and 100
    return Math.max(0, Math.min(100, percentage));
}

/**
 * Update love meter heart position, scale, and price display
 */
function updateLoveMeter() {
    // Store previous position for checkpoint detection
    const previousPosition = state.loveMeterPosition || LOVE_METER_BASE_POSITION;
    
    // Calculate love level based on cart total
    state.loveLevel = calculateLoveLevel();
    
    // Update heart position and scale
    const loveMeterHeart = document.getElementById('love-meter-heart');
    if (loveMeterHeart) {
        // Position (using cqh units for responsive scaling)
        const heartPosition = (state.loveLevel / 100) * LOVE_METER_MAX_HEIGHT + LOVE_METER_BASE_POSITION;
        loveMeterHeart.style.bottom = `${heartPosition}cqh`;
        
        // Store current position for next comparison
        state.loveMeterPosition = heartPosition;
        
        // Check for checkpoint crossings (only when going UP)
        checkCheckpoints(previousPosition, heartPosition);
        
        // Scale: interpolate between minScale and maxScale based on love level
        const minScale = LOVE_METER_CONFIG.minScale || 1.0;
        const maxScale = LOVE_METER_CONFIG.maxScale || 1.4;
        const scale = minScale + (state.loveLevel / 100) * (maxScale - minScale);
        
        const heartIcon = loveMeterHeart.querySelector('.love-meter-heart-icon');
        if (heartIcon) {
            heartIcon.style.transform = `scale(${scale})`;
        }
    }
    
    // Update price display
    updateLoveMeterPrice();
}

/**
 * Check if any checkpoints were crossed and trigger popover
 */
function checkCheckpoints(previousPosition, currentPosition) {
    const checkpoints = LOVE_METER_CONFIG.checkpoints || [];
    
    checkpoints.forEach((checkpoint, index) => {
        const checkpointPosition = checkpoint.bottom;
        
        // Trigger if we crossed this checkpoint going UP and haven't triggered it yet
        if (previousPosition < checkpointPosition && 
            currentPosition >= checkpointPosition && 
            !triggeredCheckpoints.has(index)) {
            
            triggeredCheckpoints.add(index);
            showCheckpointPopover(checkpoint.image);
        }
        
        // Reset checkpoint if we go back below it
        if (currentPosition < checkpointPosition && triggeredCheckpoints.has(index)) {
            triggeredCheckpoints.delete(index);
        }
    });
}

/**
 * Show a popover image in the center of the screen
 */
function showCheckpointPopover(imagePath) {
    // Remove any existing popover
    const existingPopover = document.querySelector('.love-meter-popover');
    if (existingPopover) {
        existingPopover.remove();
    }
    
    // Create popover element with image
    const popover = document.createElement('div');
    popover.className = 'love-meter-popover';
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = '';
    img.className = 'love-meter-popover-image';
    popover.appendChild(img);
    
    // Append to configurator-center for proper alignment
    const center = document.querySelector('.configurator-center') || document.body;
    center.appendChild(popover);
    
    // Trigger animation after element is in DOM
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            popover.classList.add('show');
        });
    });
    
    // Fade out and remove after delay
    setTimeout(() => {
        popover.classList.remove('show');
        popover.classList.add('hide');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            popover.remove();
        }, 250);
    }, 1500);
}

/**
 * Update the price display next to the heart
 */
function updateLoveMeterPrice() {
    const priceElement = document.getElementById('love-meter-price');
    if (priceElement && typeof Cart !== 'undefined' && Cart.getTotal) {
        const totalPrice = Cart.getTotal();
        priceElement.textContent = `${Cart.formatPrice(totalPrice)}`;
    }
}

/**
 * Initialize price display element in DOM
 */
function initLoveMeterPrice() {
    const heartContainer = document.getElementById('love-meter-heart');
    if (heartContainer && !document.getElementById('love-meter-price')) {
        const priceElement = document.createElement('span');
        priceElement.id = 'love-meter-price';
        priceElement.className = 'love-meter-price';
        priceElement.textContent = '$0';
        heartContainer.insertBefore(priceElement, heartContainer.firstChild);
    }
}

/**
 * Reset checkpoint tracking (e.g., when starting fresh)
 */
function resetCheckpoints() {
    triggeredCheckpoints.clear();
}
