// ========================================
// CART UTILITY MODULE
// Generic cart management for the configurator
// ========================================

const Cart = (function() {
    // Cart state - array of cart items
    // Each item: { id, category, name, price, image }
    let items = [];
    
    // Callbacks for UI updates
    let onUpdateCallback = null;
    let onItemAddedCallback = null;
    
    // ========================================
    // CORE CART OPERATIONS
    // ========================================
    
    /**
     * Add an item to the cart
     * @param {Object} item - { id, category, name, price, image }
     * @param {HTMLElement} sourceElement - Element to animate from (optional)
     */
    function addItem(item, sourceElement = null) {
        items.push(item);
        
        if (onItemAddedCallback && sourceElement) {
            onItemAddedCallback(item, sourceElement);
        }
        
        notifyUpdate();
    }
    
    /**
     * Remove an item from the cart by id
     * @param {string} id - Unique item identifier
     */
    function removeItem(id) {
        items = items.filter(item => item.id !== id);
        notifyUpdate();
    }
    
    /**
     * Remove all items in a category
     * @param {string} category - Category name (e.g., 'material', 'stone')
     */
    function removeByCategory(category) {
        items = items.filter(item => item.category !== category);
        notifyUpdate();
    }
    
    /**
     * Check if an item exists in cart by id
     * @param {string} id - Item identifier
     * @returns {boolean}
     */
    function hasItem(id) {
        return items.some(item => item.id === id);
    }
    
    /**
     * Check if category has any items
     * @param {string} category - Category name
     * @returns {boolean}
     */
    function hasCategory(category) {
        return items.some(item => item.category === category);
    }
    
    /**
     * Get item by category (for single-select categories)
     * @param {string} category - Category name
     * @returns {Object|null}
     */
    function getByCategory(category) {
        return items.find(item => item.category === category) || null;
    }
    
    /**
     * Get all items in a category (for multi-select categories like flowers)
     * @param {string} category - Category name
     * @returns {Array}
     */
    function getAllByCategory(category) {
        return items.filter(item => item.category === category);
    }
    
    /**
     * Update or add an item in a category (for single-select)
     * Removes existing item in category, then adds new one
     * @param {Object} item - { id, category, name, price, image }
     * @param {HTMLElement} sourceElement - Element to animate from (optional)
     * @param {string} animationImage - Optional image to use for flying animation (overrides item.image)
     */
    function setItem(item, sourceElement = null, animationImage = null) {
        const existingItem = getByCategory(item.category);
        
        // Check if item has actually changed (compare relevant properties)
        const hasChanged = !existingItem || 
            existingItem.id !== item.id ||
            existingItem.name !== item.name ||
            existingItem.price !== item.price ||
            existingItem.carat !== item.carat ||
            existingItem.source !== item.source;
        
        // Remove existing item in this category (silently, no update yet)
        items = items.filter(i => i.category !== item.category);
        
        // Add the new item
        items.push(item);
        
        // Animate if item has changed and we have a source element
        if (hasChanged && onItemAddedCallback && sourceElement) {
            // Use animationImage if provided, otherwise use item's image
            const animItem = animationImage ? { ...item, image: animationImage } : item;
            onItemAddedCallback(animItem, sourceElement);
        }
        
        notifyUpdate();
    }
    
    /**
     * Toggle an item in cart (for multi-select like flowers)
     * @param {Object} item - { id, category, name, price, image }
     * @param {HTMLElement} sourceElement - Element to animate from (optional)
     * @returns {boolean} - true if added, false if removed
     */
    function toggleItem(item, sourceElement = null) {
        if (hasItem(item.id)) {
            removeItem(item.id);
            return false;
        } else {
            addItem(item, sourceElement);
            return true;
        }
    }
    
    /**
     * Clear all items from cart
     */
    function clear() {
        items = [];
        notifyUpdate();
    }
    
    /**
     * Get all cart items
     * @returns {Array}
     */
    function getItems() {
        return [...items];
    }
    
    /**
     * Calculate total price
     * @returns {number}
     */
    function getTotal() {
        return items.reduce((sum, item) => sum + (item.price || 0), 0);
    }
    
    /**
     * Get formatted total price string
     * @returns {string}
     */
    function getFormattedTotal() {
        return formatPrice(getTotal());
    }
    
    /**
     * Get item count
     * @returns {number}
     */
    function getCount() {
        return items.length;
    }
    
    // ========================================
    // CALLBACKS
    // ========================================
    
    /**
     * Set callback for cart updates (renders UI)
     * @param {Function} callback - Called with (items, total)
     */
    function onUpdate(callback) {
        onUpdateCallback = callback;
    }
    
    /**
     * Set callback for item added (for flying animation)
     * @param {Function} callback - Called with (item, sourceElement)
     */
    function onItemAdded(callback) {
        onItemAddedCallback = callback;
    }
    
    /**
     * Notify that cart was updated
     */
    function notifyUpdate() {
        if (onUpdateCallback) {
            onUpdateCallback(getItems(), getTotal());
        }
    }
    
    // ========================================
    // HELPERS
    // ========================================
    
    /**
     * Format price as currency string
     * @param {number} price - Price in dollars
     * @returns {string}
     */
    function formatPrice(price) {
        if (price === 0 || price === null || price === undefined) {
            return '$0';
        }
        return '$' + price.toLocaleString('en-US');
    }
    
    /**
     * Parse price from string like "[$400]" or "[From $400]"
     * @param {string} priceString - Price string
     * @returns {number}
     */
    function parsePrice(priceString) {
        if (!priceString) return 0;
        const match = priceString.match(/\$?([\d,]+)/);
        if (match) {
            return parseInt(match[1].replace(/,/g, ''), 10);
        }
        return 0;
    }
    
    /**
     * Calculate carat price using linear interpolation based on source
     * Lab: 0.5 ct = $1,000, 4.0 ct = $5,000
     * Natural: 0.5 ct = $4,000, 4.0 ct = $30,000
     * @param {number} carat - Carat value (0.5 to 4.0)
     * @param {string} source - Diamond source ('lab' or 'natural')
     * @returns {number}
     */
    function calculateCaratPrice(carat, source) {
        const minCarat = 0.5;
        const maxCarat = 4.0;
        
        // Get price range based on source (default to lab if not specified)
        const priceRange = (source && CARAT_RANGES[source]) ? CARAT_RANGES[source] : CARAT_RANGES.lab;
        const minPrice = priceRange.minPrice;
        const maxPrice = priceRange.maxPrice;
        
        // Linear interpolation
        const ratio = (carat - minCarat) / (maxCarat - minCarat);
        const price = minPrice + ratio * (maxPrice - minPrice);
        
        return Math.round(price);
    }
    
    /**
     * Create a cart item object
     * @param {string} id - Unique identifier
     * @param {string} category - Category name
     * @param {string} name - Display name
     * @param {number} price - Price in dollars
     * @param {string} image - Image path
     * @returns {Object}
     */
    function createItem(id, category, name, price, image) {
        return { id, category, name, price, image };
    }
    
    // ========================================
    // PUBLIC API
    // ========================================
    
    return {
        // Core operations
        addItem,
        removeItem,
        removeByCategory,
        setItem,
        toggleItem,
        clear,
        
        // Getters
        getItems,
        getTotal,
        getFormattedTotal,
        getCount,
        hasItem,
        hasCategory,
        getByCategory,
        getAllByCategory,
        
        // Callbacks
        onUpdate,
        onItemAdded,
        notifyUpdate,
        
        // Helpers
        formatPrice,
        parsePrice,
        calculateCaratPrice,
        createItem
    };
})();
