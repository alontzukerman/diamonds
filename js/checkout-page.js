// ========================================
// CHECKOUT PAGE - Receipt Style
// Parses cart data from URL and displays as receipt
// ========================================

(function() {
    /**
     * Format price as number (no $ symbol, added by CSS for first item)
     * @param {number} price - Price in dollars
     * @returns {string}
     */
    function formatPrice(price) {
        if (price === 0 || price === null || price === undefined) {
            return '0';
        }
        return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    /**
     * Format price with $ symbol
     * @param {number} price - Price in dollars
     * @returns {string}
     */
    function formatPriceWithSymbol(price) {
        if (price === 0 || price === null || price === undefined) {
            return '$0';
        }
        return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    /**
     * Parse cart data from URL parameter
     * @returns {Array} Array of cart items
     */
    function parseCartFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const cartParam = urlParams.get('cart');
        
        if (!cartParam) {
            return [];
        }
        
        try {
            const decoded = atob(cartParam);
            return JSON.parse(decoded);
        } catch (e) {
            console.error('Failed to parse cart data:', e);
            return [];
        }
    }

    /**
     * Generate a random order number
     * @returns {string}
     */
    function generateOrderNumber() {
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    /**
     * Get today's date formatted as DD/MM/YYYY
     * @returns {string}
     */
    function getTodayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Render cart items to the receipt
     * @param {Array} items - Array of cart items
     */
    function renderReceiptItems(items) {
        const container = document.getElementById('receipt-items');
        const totalPriceEl = document.getElementById('receipt-total-price');
        const dateEl = document.getElementById('receipt-date');
        const orderNoEl = document.getElementById('receipt-order-no');
        
        if (!container) return;
        
        // Set date and order number
        if (dateEl) dateEl.textContent = getTodayDate();
        if (orderNoEl) orderNoEl.textContent = generateOrderNumber();
        
        container.innerHTML = '';
        let total = 0;
        
        items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'receipt-item';
            
            const name = document.createElement('span');
            name.className = 'receipt-item-name';
            name.textContent = item.name;
            
            const price = document.createElement('span');
            price.className = 'receipt-item-price';
            // First item gets $ from CSS, rest just show number
            price.textContent = index === 0 ? formatPrice(item.price) : formatPrice(item.price);
            
            itemEl.appendChild(name);
            itemEl.appendChild(price);
            container.appendChild(itemEl);
            
            total += item.price || 0;
        });
        
        // Update total
        if (totalPriceEl) {
            totalPriceEl.textContent = formatPriceWithSymbol(total);
        }
    }

    /**
     * Generate barcode visualization
     */
    function generateBarcode() {
        const barcodeEl = document.getElementById('receipt-barcode');
        if (!barcodeEl) return;
        
        // Create random barcode pattern
        const barCount = 60;
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'barcode-bar';
            // Random width between 1-4px
            const width = Math.random() > 0.7 ? (Math.random() > 0.5 ? 3 : 4) : (Math.random() > 0.5 ? 1 : 2);
            bar.style.width = width + 'px';
            // Occasionally add gaps
            if (Math.random() > 0.85) {
                bar.style.background = 'transparent';
            }
            barcodeEl.appendChild(bar);
        }
    }

    /**
     * Initialize and run countdown timer
     * Counts down from 14 days
     */
    function initCountdown() {
        // Set countdown to 14 days from now
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + 14);
        
        function updateCountdown() {
            const now = new Date();
            const diff = endTime - now;
            
            if (diff <= 0) {
                // Timer expired
                document.getElementById('countdown-days').textContent = '00';
                document.getElementById('countdown-hours').textContent = '00';
                document.getElementById('countdown-minutes').textContent = '00';
                document.getElementById('countdown-seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
            document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /**
     * Initialize checkout page
     */
    function initCheckoutPage() {
        const items = parseCartFromURL();
        renderReceiptItems(items);
        generateBarcode();
        initCountdown();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckoutPage);
    } else {
        initCheckoutPage();
    }
})();
