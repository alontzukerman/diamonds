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
            
            // Add source and carat as inline sub-text (e.g., "[Natural, 2.10 ct]")
            if (item.source || item.carat) {
                const stoneSpan = document.createElement('span');
                stoneSpan.className = 'receipt-item-size';
                const parts = [];
                if (item.source) {
                    parts.push(item.source === 'lab' ? 'Lab Grown' : 'Natural');
                }
                if (item.carat) {
                    parts.push(`${item.carat.toFixed(2)} ct`);
                }
                stoneSpan.textContent = ` [${parts.join(', ')}]`;
                name.appendChild(stoneSpan);
            }
            
            const price = document.createElement('span');
            price.className = 'receipt-item-price';
            price.textContent = formatPriceWithSymbol(item.price);
            
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
     * Initialize payment modal
     */
    function initPaymentModal() {
        const payBtn = document.getElementById('receipt-pay-btn');
        const modalOverlay = document.getElementById('payment-modal-overlay');
        const cardNumberInput = document.getElementById('payment-card-number');
        const expiryInput = document.getElementById('payment-expiry');
        const cvvInput = document.getElementById('payment-cvv');

        if (payBtn && modalOverlay) {
            payBtn.addEventListener('click', () => {
                modalOverlay.classList.add('open');
            });

            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    modalOverlay.classList.remove('open');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
                    modalOverlay.classList.remove('open');
                }
            });
        }

        // Card number: max 16 digits with spaces between groups of 4
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 16) {
                    value = value.slice(0, 16);
                }
                // Add space after every 4 digits
                let formatted = '';
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formatted += ' ';
                    }
                    formatted += value[i];
                }
                e.target.value = formatted;
            });
        }

        // Expiry date: 4 digits with auto "/" after first 2
        if (expiryInput) {
            let prevExpiryLength = 0;
            
            expiryInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 4) {
                    value = value.slice(0, 4);
                }
                
                // Add separator when typing (not deleting) and have 2+ digits
                if (value.length >= 2 && value.length > prevExpiryLength) {
                    value = value.slice(0, 2) + ' / ' + value.slice(2);
                } else if (value.length > 2) {
                    value = value.slice(0, 2) + ' / ' + value.slice(2);
                }
                
                prevExpiryLength = value.replace(/\D/g, '').length;
                e.target.value = value;
            });
        }

        // CVV: max 3 digits
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 3) {
                    value = value.slice(0, 3);
                }
                e.target.value = value;
            });
        }
    }

    /**
     * Initialize checkout page
     */
    function initCheckoutPage() {
        const items = parseCartFromURL();
        renderReceiptItems(items);
        initCountdown();
        initPaymentModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckoutPage);
    } else {
        initCheckoutPage();
    }
})();
