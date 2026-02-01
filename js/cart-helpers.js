// ========================================
// CART HELPER FUNCTIONS
// Note: Requires config.js, state.js, and cart.js to be loaded first
// ========================================

/**
 * Update the ring cart item (combines material + size into one item)
 * Only adds to cart if material is selected
 */
function updateRingCartItem(sourceElement) {
    const material = state.selections.ring.material;
    const size = state.selections.ring.size;
    
    if (!material) {
        // No material selected yet, remove ring from cart
        Cart.removeByCategory('ring');
        return;
    }
    
    // Map material to display name
    const materialNames = {
        gold: 'Gold Ring',
        silver: 'Silver Ring',
        'rose-gold': 'Rose Gold Ring',
        'white-gold': 'White Gold Ring'
    };
    
    // Map material to display image
    const materialImages = {
        gold: ASSETS.rings.goldRing,
        silver: ASSETS.rings.silverRing,
        'rose-gold': ASSETS.rings.roseGoldRing,
        'white-gold': ASSETS.rings.whiteGoldRing
    };
    
    const ringName = materialNames[material] || 'Ring';
    const ringImage = materialImages[material] || ASSETS.rings.goldRing;
    const ringPrice = MATERIAL_PRICES[material];
    const isPremium = material === 'gold' || material === 'white-gold';
    
    // Create cart item with size info if available
    const cartItem = {
        id: 'ring',
        category: 'ring',
        name: ringName,
        size: size, // Store size separately for display
        price: ringPrice,
        image: ringImage,
        premium: isPremium
    };
    
    Cart.setItem(cartItem, sourceElement);
}

/**
 * Update the stone cart item (combines stone + carat + source into one item)
 * Only adds to cart if stone is selected
 * @param {HTMLElement} sourceElement - Element to animate from (optional)
 * @param {string} animationImage - Optional image to use for flying animation (e.g., source image)
 */
function updateStoneCartItem(sourceElement, animationImage = null) {
    const stoneId = state.selections.diamond.stone;
    const carat = state.selections.diamond.carat;
    const source = state.selections.diamond.source;
    
    if (!stoneId) {
        // No stone selected yet, remove stone from cart
        Cart.removeByCategory('diamond-stone');
        return;
    }
    
    const stoneIndex = parseInt(stoneId) - 1;
    const stoneName = STONE_NAMES[stoneIndex];
    const stoneImage = ASSETS.stones(stoneId);
    const caratPrice = Cart.calculateCaratPrice(carat, source);
    
    // Determine if premium based on source
    const isPremium = source === 'natural';
    
    // Create cart item with carat and source info
    const cartItem = {
        id: 'diamond-stone',
        category: 'diamond-stone',
        name: stoneName,
        carat: carat, // Store carat separately for display
        source: source, // Store source separately for display
        price: caratPrice,
        image: stoneImage,
        premium: isPremium
    };
    
    Cart.setItem(cartItem, sourceElement, animationImage);
}
