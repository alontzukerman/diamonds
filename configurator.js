// ========================================
// CONFIGURATOR PAGE - MAIN ORCHESTRATOR
// ========================================
// Dependencies (load in this order in HTML):
// 1. js/config.js      - Configuration constants and data
// 2. js/cart.js        - Cart utility module
// 3. js/state.js       - State management
// 4. js/progress.js    - Progress bar management
// 5. js/love-meter.js  - Love meter calculations
// 6. js/display.js     - Display area updates
// 7. js/cart-helpers.js - Cart helper functions
// 8. js/cart-ui.js     - Cart UI rendering
// 9. js/renderers.js   - Selector renderers
// 10. configurator.js  - This file (main orchestrator)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SELECTORS CONFIGURATION
    // (kept here due to callback dependencies on state and functions)
    // ========================================
    const SELECTORS_CONFIG = {
        material: {
            type: 'flex-carousel',
            items: [
                { id: 'gold', label: 'Gold', price: '[From $400]', image: ASSETS.rings.gold, premium: true },
                { id: 'silver', label: 'Silver', price: '[From $80]', image: ASSETS.rings.silver, premium: false },
                { id: 'rose-gold', label: 'Rose Gold', price: '[From $300]', image: ASSETS.rings['rose-gold'], premium: false },
                { id: 'white-gold', label: 'White Gold', price: '[From $700]', image: ASSETS.rings['white-gold'], premium: true }
            ],
            onSelect: (value, sourceElement) => {
                state.selections.ring.material = value;
                updateDisplay();
                updateRingCartItem(sourceElement);
            }
        },
        stone: {
            type: 'flex-carousel',
            items: STONE_NAMES.map((name, i) => ({
                id: String(i + 1),
                label: name,
                image: ASSETS.stonesCarousel(i + 1)
            })),
            onSelect: (value, sourceElement) => {
                state.selections.diamond.stone = value;
                updateStoneDisplay();
                updateStoneCartItem(sourceElement);
            }
        },
        carat: {
            type: 'slider',
            min: 0.5,
            max: 4,
            step: 0.1,
            defaultValue: 0.5,
            unit: 'ct',
            // Dynamic prices based on selected source
            getMinPrice: () => {
                const source = state.selections.diamond.source;
                if (source && CARAT_RANGES[source]) {
                    return CARAT_RANGES[source].minPrice;
                }
                return CARAT_RANGES.lab.minPrice; // Default to lab
            },
            getMaxPrice: () => {
                const source = state.selections.diamond.source;
                if (source && CARAT_RANGES[source]) {
                    return CARAT_RANGES[source].maxPrice;
                }
                return CARAT_RANGES.lab.maxPrice; // Default to lab
            },
            onSelect: (value, sourceElement) => {
                state.selections.diamond.carat = parseFloat(value);
                updateStoneDisplay();
                // No flying animation for carat changes
                updateStoneCartItem(null);
            }
        },
        source: {
            type: 'flex-carousel',
            items: [
                { id: 'lab', label: 'Lab', price: '[From $600]', image: ASSETS.rings.lab, premium: false },
                { id: 'natural', label: 'Natural', price: '[From $1,800]', image: ASSETS.rings.natural, premium: true }
            ],
            onSelect: (value, sourceElement) => {
                state.selections.diamond.source = value;
                
                // Get the source image for the flying animation
                const sourceImage = value === 'lab' ? ASSETS.rings.lab : ASSETS.rings.natural;
                
                // Update the stone cart item (source is now part of the stone item, not separate)
                updateStoneCartItem(sourceElement, sourceImage);
                
                // Re-render carat slider if it's currently shown (prices depend on source)
                if (state.currentSection === 'carat') {
                    showSelector('carat', SELECTORS_CONFIG);
                }
            }
        },
        packaging: {
            type: 'flex-carousel',
            items: PACKAGING.map((pkg, i) => ({
                id: String(i + 1),
                label: pkg.name,
                price: pkg.priceDisplay,
                image: ASSETS.packing(i + 1)
            })),
            onSelect: (value, sourceElement) => {
                state.selections.diamond.packaging = value;
                updatePackagingDisplay();
                
                const pkgIndex = parseInt(value) - 1;
                const cartItem = Cart.createItem(
                    `packaging-${value}`,
                    'packaging',
                    PACKAGING[pkgIndex].name,
                    PACKAGING[pkgIndex].price,
                    ASSETS.packing(value)
                );
                Cart.setItem(cartItem, sourceElement);
            }
        },
        location: {
            type: 'flex-carousel',
            items: LOCATIONS.map(loc => ({
                id: loc.name,
                label: loc.name,
                price: loc.price > 0 ? `[$${loc.price.toLocaleString()}]` : '[$0]',
                image: `assets/locations/${loc.image}`,
                premium: loc.premium
            })),
            onSelect: (value, sourceElement) => {
                state.selections.location = value;
                updateLocationBackground(value);
                
                const location = LOCATIONS.find(loc => loc.name === value);
                const locationImage = location ? `assets/locations/${location.image}` : null;
                const cartItem = {
                    id: `location-${value}`,
                    category: 'location',
                    name: value,
                    price: location ? location.price : LOCATION_PRICE,
                    image: locationImage,
                    premium: location ? location.premium : false
                };
                Cart.setItem(cartItem, sourceElement);
            }
        },
        signs: {
            type: 'flex-carousel',
            items: SIGNS.map((sign, i) => ({
                id: String(i + 1),
                label: sign.name,
                price: sign.priceDisplay,
                image: ASSETS.signs(i + 1)
            })),
            onSelect: (value, sourceElement) => {
                state.selections.setup.signs = value;
                updateSignDisplay();
                
                const signIndex = parseInt(value) - 1;
                const cartItem = Cart.createItem(
                    `signs-${value}`,
                    'signs',
                    SIGNS[signIndex].name,
                    SIGNS[signIndex].price,
                    ASSETS.signs(value)
                );
                Cart.setItem(cartItem, sourceElement);
            }
        },
        flowers: {
            type: 'flex-carousel',
            multiselect: true,
            items: FLOWERS.map((flower, i) => ({
                id: String(i + 1),
                label: flower.name,
                price: flower.priceDisplay,
                image: ASSETS.flowers(i + 1)
            })),
            onSelect: (value, isSelected, sourceElement) => {
                if (isSelected) {
                    if (!state.selections.setup.flowers.includes(value)) {
                        state.selections.setup.flowers.push(value);
                    }
                    const flowerIndex = parseInt(value) - 1;
                    const cartItem = Cart.createItem(
                        `flowers-${value}`,
                        'flowers',
                        FLOWERS[flowerIndex].name,
                        FLOWERS[flowerIndex].price,
                        ASSETS.flowers(value)
                    );
                    Cart.addItem(cartItem, sourceElement);
                } else {
                    state.selections.setup.flowers = state.selections.setup.flowers.filter(f => f !== value);
                    Cart.removeItem(`flowers-${value}`);
                }
                updateFlowersDisplay();
            }
        },
        balloons: {
            type: 'flex-carousel',
            items: BALLOONS.map((balloon, i) => ({
                id: String(i + 1),
                label: balloon.name,
                price: balloon.priceDisplay,
                image: ASSETS.balloons(i + 1)
            })),
            onSelect: (value, sourceElement) => {
                state.selections.setup.balloons = value;
                updateBalloonsDisplay();
                
                const balloonIndex = parseInt(value) - 1;
                const cartItem = Cart.createItem(
                    `balloons-${value}`,
                    'balloons',
                    BALLOONS[balloonIndex].name,
                    BALLOONS[balloonIndex].price,
                    ASSETS.balloons(value)
                );
                Cart.setItem(cartItem, sourceElement);
            }
        },
        extras: {
            type: 'flex-carousel',
            multiselect: true,
            items: EXTRAS.map((extra, i) => ({
                id: String(i + 1),
                label: extra.name,
                price: extra.priceDisplay,
                image: ASSETS.extras(i + 1)
            })),
            onSelect: (value, isSelected, sourceElement) => {
                if (isSelected) {
                    if (!state.selections.setup.extras.includes(value)) {
                        state.selections.setup.extras.push(value);
                    }
                    const extraIndex = parseInt(value) - 1;
                    const cartItem = Cart.createItem(
                        `extras-${value}`,
                        'extras',
                        EXTRAS[extraIndex].name,
                        EXTRAS[extraIndex].price,
                        ASSETS.extras(value)
                    );
                    Cart.addItem(cartItem, sourceElement);
                } else {
                    state.selections.setup.extras = state.selections.setup.extras.filter(e => e !== value);
                    Cart.removeItem(`extras-${value}`);
                }
                updateExtrasDisplay();
            }
        },
        music: {
            type: 'flex-carousel',
            musicPlayer: true,
            items: MUSIC.map((track, i) => ({
                id: String(i + 1),
                label: `${track.artist} - ${track.song}`,
                artist: track.artist,
                song: track.song,
                image: ASSETS.music.image(track.image),
                audio: ASSETS.music.audio(track.audio)
            })),
            onSelect: (value, sourceElement) => {
                state.selections.music = value;
                updateMusicDisplay();
                
                const trackIndex = parseInt(value) - 1;
                const track = MUSIC[trackIndex];
                const cartItem = Cart.createItem(
                    `music-${value}`,
                    'music',
                    `${track.artist} - ${track.song}`,
                    0, // Music is free
                    ASSETS.music.image(track.image)
                );
                Cart.setItem(cartItem, sourceElement);
            }
        }
    };
    
    // ========================================
    // INITIALIZE MODULES
    // ========================================
    
    initRenderers();
    initCartUI();
    initNavigation();
    
    // Create a global function for navigation.js to call showSelector
    window.showSelectorFromNav = function(sectionName) {
        showSelector(sectionName, SELECTORS_CONFIG);
    };
    
    // ========================================
    // ACCORDION MENU
    // ========================================
    
    const menuStepHeaders = document.querySelectorAll('.menu-step-header');
    
    menuStepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const stepNumber = parseInt(this.getAttribute('data-step-toggle'));
            toggleStep(stepNumber);
        });
    });
    
    // Helper function to expand a step (shared by toggleStep and expandStep)
    function doExpandStep(stepNumber) {
        // Stop music if leaving the music step (step 5)
        if (state.currentStep === 5 && stepNumber !== 5) {
            if (typeof stopMusicPlayback === 'function') {
                stopMusicPlayback();
            }
        }
        
        // Collapse all other steps first
        document.querySelectorAll('.menu-step.expanded').forEach(step => {
            step.classList.remove('expanded');
        });
        
        const stepElement = document.querySelector(`.menu-step[data-step="${stepNumber}"]`);
        if (!stepElement) return;
        
        stepElement.classList.add('expanded');
        state.currentStep = stepNumber;
        updateProgressBar();
        
        // Find which section is currently expanded in this step
        let expandedSection = stepElement.querySelector('.menu-section.expanded');
        
        // If no section is expanded, expand the first one
        if (!expandedSection) {
            expandedSection = stepElement.querySelector('.menu-section');
            if (expandedSection) {
                expandedSection.classList.add('expanded');
            }
        }
        
        // Show the selector for the expanded section
        if (expandedSection) {
            const sectionName = expandedSection.getAttribute('data-section');
            showSelector(sectionName, SELECTORS_CONFIG);
        }
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    function toggleStep(stepNumber) {
        // Don't allow toggling locked steps
        if (!state.unlockedSteps.includes(stepNumber)) {
            return;
        }
        
        const stepElement = document.querySelector(`.menu-step[data-step="${stepNumber}"]`);
        
        if (stepElement.classList.contains('expanded')) {
            stepElement.classList.remove('expanded');
            hideAllSelectors();
        } else {
            doExpandStep(stepNumber);
        }
        
        // Animate sync heights during transition
        animateSyncProgressBarHeights();
    }
    
    function expandStep(stepNumber) {
        // Don't allow expanding locked steps
        if (!state.unlockedSteps.includes(stepNumber)) {
            return;
        }
        
        doExpandStep(stepNumber);
    }
    
    // Section header clicks (toggle expand/collapse and show selector)
    document.querySelectorAll('.menu-section').forEach(section => {
        const header = section.querySelector('.menu-section-header');
        const sectionType = section.getAttribute('data-section');
        
        if (header && sectionType) {
            header.addEventListener('click', () => {
                toggleSection(sectionType);
            });
        }
    });
    
    function toggleSection(sectionName) {
        const section = document.querySelector(`.menu-section[data-section="${sectionName}"]`);
        if (!section) return;
        
        const wasExpanded = section.classList.contains('expanded');
        
        // Collapse all sections in the same step
        const stepContent = section.closest('.menu-step-content');
        if (stepContent) {
            stepContent.querySelectorAll('.menu-section').forEach(s => {
                s.classList.remove('expanded');
            });
        }
        
        // If it wasn't expanded, expand it now
        if (!wasExpanded) {
            section.classList.add('expanded');
            showSelector(sectionName, SELECTORS_CONFIG);
        } else {
            hideAllSelectors();
        }
        
        // Animate sync heights during transition
        animateSyncProgressBarHeights();
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowDown':
                if (state.currentStep < TOTAL_STEPS) {
                    const nextStep = state.currentStep + 1;
                    if (state.unlockedSteps.includes(nextStep)) {
                        expandStep(nextStep);
                    }
                }
                break;
            case 'ArrowUp':
                if (state.currentStep > 1) {
                    const prevStep = state.currentStep - 1;
                    if (state.unlockedSteps.includes(prevStep)) {
                        expandStep(prevStep);
                    }
                }
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                // Navigate carousel with animation
                const config = SELECTORS_CONFIG[state.currentSection];
                if (config && config.type === 'carousel') {
                    const prevIndex = state.carouselIndices[state.currentSection];
                    const direction = e.key === 'ArrowLeft' ? -1 : 1;
                    state.carouselIndices[state.currentSection] = 
                        (state.carouselIndices[state.currentSection] + direction + config.items.length) % config.items.length;
                    animateCarousel(state.currentSection, config, prevIndex, direction === 1 ? 'right' : 'left');
                }
                break;
            case 'Enter':
                // Select current carousel item
                const currentConfig = SELECTORS_CONFIG[state.currentSection];
                if (currentConfig && currentConfig.type === 'carousel') {
                    const currentIndex = state.carouselIndices[state.currentSection] || 0;
                    const item = currentConfig.items[currentIndex];
                    if (item) selectItem(state.currentSection, item.id, currentConfig, SELECTORS_CONFIG);
                }
                break;
            case 'Escape':
                // Close cart if open, otherwise go to index
                if (isCartOpen()) {
                    closeCart();
                } else {
                    window.location.href = 'index.html';
                }
                break;
        }
    });
    
    // ========================================
    // INITIALIZATION
    // ========================================
    
    initLoveMeterPrice();  // Initialize price display element
    updateLoveMeter();
    updateProgressBar();
    syncProgressBarHeights();
    
    // Everything starts collapsed - no selector shown by default
});
