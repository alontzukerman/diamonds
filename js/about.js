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

// Gallery Overlay functionality
(function() {
    const galleryTrigger = document.getElementById('gallery-trigger');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryCloseBtn = document.getElementById('gallery-close-btn');

    if (!galleryTrigger || !galleryOverlay || !galleryCloseBtn) return;

    function closeGalleryOverlay() {
        // Stop any playing audio in gallery
        galleryOverlay.querySelectorAll('audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        galleryOverlay.classList.add('closing');
        galleryOverlay.addEventListener('animationend', function handler() {
            galleryOverlay.classList.remove('active', 'closing');
            document.body.style.overflow = '';
            galleryOverlay.removeEventListener('animationend', handler);
        });
    }

    // Open overlay
    galleryTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        galleryOverlay.classList.remove('closing');
        galleryOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize gallery if not already done
        if (typeof initGallery === 'function') {
            initGallery();
        }
    });

    // Close overlay
    galleryCloseBtn.addEventListener('click', closeGalleryOverlay);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryOverlay.classList.contains('active') && !galleryOverlay.classList.contains('closing')) {
            closeGalleryOverlay();
        }
    });
})();
