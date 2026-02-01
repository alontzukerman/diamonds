// ========================================
// CHECKOUT MODULE
// Handles share link generation for cart
// ========================================

(function() {
    /**
     * Generate a share link with cart data and deadline encoded
     * @returns {string} The checkout URL with cart data and deadline
     */
    function generateShareLink() {
        const items = typeof Cart !== 'undefined' && typeof Cart.getItems === 'function' 
            ? Cart.getItems() 
            : [];
        
        // Create a simplified cart data structure for the URL
        const cartData = items.map(item => ({
            id: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            image: item.image,
            // Include optional fields if present
            ...(item.carat && { carat: item.carat }),
            ...(item.source && { source: item.source }),
            ...(item.premium && { premium: item.premium })
        }));

        // Encode cart data as base64
        const encodedCart = btoa(JSON.stringify(cartData));
        
        // Get deadline from Deadline module if available
        let deadlineParam = '';
        if (typeof Deadline !== 'undefined' && typeof Deadline.getSelectedDate === 'function') {
            const deadline = Deadline.getSelectedDate();
            if (deadline) {
                // Encode deadline as ISO string
                deadlineParam = `&deadline=${encodeURIComponent(deadline.toISOString())}`;
            }
        }
        
        // Build checkout URL
        const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
        return `${baseUrl}checkout.html?cart=${encodedCart}${deadlineParam}`;
    }

    // Expose for external use
    window.Checkout = {
        generateShareLink: generateShareLink
    };
})();
