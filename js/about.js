// Gallery Link - Store referrer for returning to current page
(function() {
    // Find all gallery links
    const galleryLinks = document.querySelectorAll('a[href="gallery.html"]');
    
    galleryLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Store the current page path so gallery can return to it
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            sessionStorage.setItem('galleryReferrer', currentPage);
        });
    });
})();

// About Overlay functionality
(function() {
    const aboutTrigger = document.getElementById('about-trigger');
    const aboutOverlay = document.getElementById('about-overlay');
    const aboutCloseBtn = document.getElementById('about-close-btn');

    if (!aboutTrigger || !aboutOverlay || !aboutCloseBtn) return;

    function closeOverlay() {
        aboutOverlay.classList.add('closing');
        aboutOverlay.addEventListener('animationend', function handler() {
            aboutOverlay.classList.remove('active', 'closing');
            document.body.style.overflow = '';
            aboutOverlay.removeEventListener('animationend', handler);
        });
    }

    // Open overlay
    aboutTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        aboutOverlay.classList.remove('closing');
        aboutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close overlay
    aboutCloseBtn.addEventListener('click', closeOverlay);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aboutOverlay.classList.contains('active') && !aboutOverlay.classList.contains('closing')) {
            closeOverlay();
        }
    });
})();
