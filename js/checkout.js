// ========================================
// CHECKOUT MODULE
// Handles checkout modal and share link generation
// ========================================

(function() {
    // DOM references
    let checkoutBtn = null;
    let modalOverlay = null;
    let modalClose = null;
    let linkInput = null;
    let copyBtn = null;

    /**
     * Initialize checkout functionality
     */
    function initCheckout() {
        checkoutBtn = document.getElementById('cart-checkout-btn');
        modalOverlay = document.getElementById('checkout-modal-overlay');
        modalClose = document.getElementById('checkout-modal-close');
        linkInput = document.getElementById('checkout-modal-link');
        copyBtn = document.getElementById('checkout-modal-copy');

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', openCheckoutModal);
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeCheckoutModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeCheckoutModal();
                }
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', copyLink);
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isModalOpen()) {
                closeCheckoutModal();
            }
        });
    }

    /**
     * Generate a share link with cart data encoded
     * @returns {string} The checkout URL with cart data
     */
    function generateShareLink() {
        const items = Cart.getItems();
        
        // Create a simplified cart data structure for the URL
        const cartData = items.map(item => ({
            id: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            image: item.image,
            // Include optional fields if present
            ...(item.size && { size: item.size }),
            ...(item.carat && { carat: item.carat }),
            ...(item.source && { source: item.source }),
            ...(item.premium && { premium: item.premium })
        }));

        // Encode cart data as base64
        const encodedData = btoa(JSON.stringify(cartData));
        
        // Build checkout URL
        const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
        return `${baseUrl}checkout.html?cart=${encodedData}`;
    }

    /**
     * Open the checkout modal and generate share link
     */
    function openCheckoutModal() {
        if (!modalOverlay || !linkInput) return;

        // Generate and display the share link
        const shareLink = generateShareLink();
        linkInput.value = shareLink;

        // Open modal
        modalOverlay.classList.add('open');
        
        // Select the link text for easy copying
        setTimeout(() => {
            linkInput.select();
        }, 100);
    }

    /**
     * Close the checkout modal
     */
    function closeCheckoutModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('open');
        }
    }

    /**
     * Check if modal is open
     * @returns {boolean}
     */
    function isModalOpen() {
        return modalOverlay && modalOverlay.classList.contains('open');
    }

    /**
     * Copy the share link to clipboard
     */
    function copyLink() {
        if (!linkInput) return;

        linkInput.select();
        navigator.clipboard.writeText(linkInput.value).then(() => {
            // Visual feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            document.execCommand('copy');
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckout);
    } else {
        initCheckout();
    }

    // Expose for external use if needed
    window.Checkout = {
        openModal: openCheckoutModal,
        closeModal: closeCheckoutModal,
        generateShareLink: generateShareLink
    };
})();
