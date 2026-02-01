// ========================================
// GALLERY PAGE - Package Examples Generator
// Note: Requires config.js to be loaded first
// ========================================

// Package display names
const PACKAGE_NAMES = [
    'Iconic',
    'All Inclusive',
    'Once in a Lifetime',
    'Love Story',
    'Unforgettable',
    'Dreamy',
    'Classic',
    'Romantic',
    'Fairytale',
    'Forever Yours',
    'Magical'
];

// Static gallery examples
const GALLERY_EXAMPLES = [
    // 1. Romantic Paris Evening
    {
        name: PACKAGE_NAMES[0], // Iconic
        premium: true,
        material: 'gold',
        stone: 5,
        carat: 3.8,
        source: 'natural',
        packaging: 3,
        location: LOCATIONS[9], // Paris
        sign: 2,
        flowers: [1, 3, 5],
        balloon: 4,
        extras: [3, 5],
        song: MUSIC[5] // Ed Sheeran - Perfect
    },
    // 2. Maldives Beach Sunset
    {
        name: PACKAGE_NAMES[1], // Classic
        premium: true,
        material: 'white-gold',
        stone: 8,
        carat: 4,
        source: 'natural',
        packaging: 2,
        location: LOCATIONS[6], // Maldives
        sign: 1,
        flowers: [1, 2, 3, 4, 5, 6, 7, 8],
        balloon: 1,
        extras: [1, 2, 3, 4, 5, 6, 8],
        song: MUSIC[11] // Elvis - Can't Help Falling in Love
    },
    // 3. New York City Lights
    {
        name: PACKAGE_NAMES[2], // Once in a Lifetime
        material: 'silver',
        stone: 12,
        carat: 1.5,
        packaging: 5,
        location: LOCATIONS[8], // New York
        sign: 4,
        flowers: [1, 6],
        balloon: 3,
        extras: [2, 5, 7],
        song: MUSIC[3] // Bruno Mars - Marry You
    },
    // 4. Santorini Dream
    {
        name: PACKAGE_NAMES[3], // Love Story
        material: 'rose-gold',
        stone: 3,
        carat: 2.0,
        source: 'natural',
        packaging: 1,
        location: LOCATIONS[11], // Santorini
        sign: 3,
        flowers: [2, 5, 7],
        balloon: 6,
        extras: [4, 6],
        song: MUSIC[7] // John Legend - All of Me
    },
    // 5. Hot Air Balloon Adventure
    {
        name: PACKAGE_NAMES[4], // Dreamer
        material: 'gold',
        stone: 17,
        carat: 1.2,
        source: 'lab',
        packaging: 4,
        location: LOCATIONS[4], // Hot Air Balloon
        sign: 5,
        flowers: [3, 4, 8],
        balloon: 2,
        extras: [5],
        song: MUSIC[13] // Jason Mraz - I'm Yours
    },
    // 6. Jerusalem Sacred Moment
    {
        name: PACKAGE_NAMES[5], // Eternal
        material: 'white-gold',
        stone: 6,
        carat: 1.6,
        packaging: 6,
        location: LOCATIONS[5], // Jerusalem
        sign: 6,
        flowers: [1, 2, 3, 5],
        balloon: null,
        extras: [3, 7],
        song: MUSIC[4] // Idan Raichel - Mi'Ma'amakim
    },
    // 7. Rome Eternal Love
    {
        name: PACKAGE_NAMES[6], // Timeless
        premium: true,
        material: 'gold',
        stone: 19,
        carat: 2.4,
        source: 'natural',
        packaging: 7,
        location: LOCATIONS[10], // Rome
        sign: 1,
        flowers: [1, 4, 6, 8],
        balloon: 5,
        extras: [1, 2, 6],
        song: MUSIC[10] // Bill Withers - Just The Two Of Us
    },
    // 8. Cozy Home Proposal
    {
        name: PACKAGE_NAMES[7], // Fairytale
        material: 'rose-gold',
        stone: 11,
        carat: 1.0,
        source: 'lab',
        packaging: 3,
        location: LOCATIONS[0], // At Home
        sign: 3,
        flowers: [2, 7],
        balloon: 4,
        extras: [3, 4, 7],
        song: MUSIC[2] // Arik Einstein - Ahava Mimabat Rishon
    },
    // 9. Barcelona Fiesta
    {
        name: PACKAGE_NAMES[8], // Enchanted
        material: 'silver',
        stone: 15,
        carat: 1.7,
        packaging: 2,
        location: LOCATIONS[2], // Barcelona
        sign: 5,
        flowers: [3, 5, 6],
        balloon: 1,
        extras: [2, 4, 8],
        song: MUSIC[9] // Ishay Levi - Haachat Sheli
    },
    // 10. Thailand Paradise
    {
        name: PACKAGE_NAMES[9], // Unforgettable
        premium: true,
        material: 'gold',
        stone: 9,
        carat: 4,
        source: 'natural',
        packaging: 4,
        location: LOCATIONS[13], // Thailand
        sign: 2,
        flowers: [1, 2, 3, 4, 5, 6,7, 8],
        balloon: 6,
        extras: [1, 5],
        song: MUSIC[0] // Ben Snof - Boey Beshalom
    },
    // 11. Amsterdam Canal Romance
    {
        name: PACKAGE_NAMES[10], // Forever Yours
        material: 'white-gold',
        stone: 14,
        carat: 2.1,
        source: 'lab',
        packaging: 5,
        location: LOCATIONS[1], // Amsterdam
        sign: 4,
        flowers: [1, 2, 6, 7],
        balloon: 3,
        extras: [3, 6, 8],
        song: MUSIC[12] // Nathan Goshen - Shney Yeladim Ba'olam
    }
];

// Create a gallery card element from a package
function createGalleryCard(pkg) {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.backgroundImage = `url('assets/locations/${pkg.location.image}')`;
    
    // Create display area
    const display = document.createElement('div');
    display.className = 'gallery-display';
    
    // Create ring container (scaled down)
    const ringContainer = document.createElement('div');
    ringContainer.className = 'gallery-ring-container';
    
    // Create core (ring, stone, packaging)
    const core = document.createElement('div');
    core.className = 'gallery-core';
    
    // Sign (behind everything)
    const signImg = document.createElement('img');
    signImg.className = `gallery-sign gallery-sign-${pkg.sign}`;
    signImg.src = ASSETS.signs(pkg.sign);
    signImg.alt = 'Sign';
    ringContainer.appendChild(signImg);
    
    // Flowers container
    const flowersContainer = document.createElement('div');
    flowersContainer.className = 'gallery-flowers-container';
    pkg.flowers.forEach(flowerId => {
        const flowerImg = document.createElement('img');
        flowerImg.className = `gallery-flower gallery-flower-${flowerId}`;
        flowerImg.src = ASSETS.flowers(flowerId);
        flowerImg.alt = 'Flower';
        flowersContainer.appendChild(flowerImg);
    });
    ringContainer.appendChild(flowersContainer);
    
    // Packaging
    const packagingImg = document.createElement('img');
    packagingImg.className = `gallery-packaging gallery-packaging-${pkg.packaging}`;
    packagingImg.src = ASSETS.packing(pkg.packaging);
    packagingImg.alt = 'Packaging';
    core.appendChild(packagingImg);
    
    // Ring
    const materialDisplayImages = {
        gold: 'assets/rings/gold-ring.png',
        silver: 'assets/rings/silver-ring.png',
        'rose-gold': 'assets/rings/rose-gold-ring.png',
        'white-gold': 'assets/rings/silver-ring.png'
    };
    const ringImg = document.createElement('img');
    ringImg.className = 'gallery-ring';
    ringImg.src = materialDisplayImages[pkg.material];
    ringImg.alt = 'Ring';
    core.appendChild(ringImg);
    
    // Stone
    const stoneImg = document.createElement('img');
    stoneImg.className = 'gallery-stone';
    stoneImg.src = ASSETS.stones(pkg.stone);
    stoneImg.alt = 'Stone';
    const caratScale = 1.5 + (pkg.carat - 0.5) * 0.7;
    stoneImg.style.transform = `translate(-50%, -50%) scale(${caratScale})`;
    core.appendChild(stoneImg);
    
    ringContainer.appendChild(core);
    
    // Balloons container (if balloon selected)
    if (pkg.balloon) {
        const balloonsContainer = document.createElement('div');
        balloonsContainer.className = 'gallery-balloons-container';
        const balloonImg = document.createElement('img');
        balloonImg.className = `gallery-balloon gallery-balloon-${pkg.balloon}`;
        balloonImg.src = ASSETS.balloons(pkg.balloon);
        balloonImg.alt = 'Balloon';
        balloonsContainer.appendChild(balloonImg);
        ringContainer.appendChild(balloonsContainer);
    }
    
    // Extras container
    const extrasContainer = document.createElement('div');
    extrasContainer.className = 'gallery-extras-container';
    pkg.extras.forEach(extraId => {
        const extraImg = document.createElement('img');
        extraImg.className = `gallery-extra gallery-extra-${extraId}`;
        extraImg.src = ASSETS.extras(extraId);
        extraImg.alt = 'Extra';
        extrasContainer.appendChild(extraImg);
    });
    ringContainer.appendChild(extrasContainer);
    
    display.appendChild(ringContainer);
    card.appendChild(display);
    
    // Song UI component at bottom center of card (same as music carousel)
    const songCard = document.createElement('div');
    songCard.className = 'gallery-music-card';
    
    // Image container with cover
    const imageContainer = document.createElement('div');
    imageContainer.className = 'gallery-music-card-image';
    
    const coverImg = document.createElement('img');
    coverImg.className = 'gallery-music-card-cover';
    coverImg.src = ASSETS.music.image(pkg.song.image);
    coverImg.alt = pkg.song.song;
    imageContainer.appendChild(coverImg);
    
    songCard.appendChild(imageContainer);
    
    // Song info
    const songInfo = document.createElement('div');
    songInfo.className = 'gallery-music-card-info';
    
    const songTitle = document.createElement('div');
    songTitle.className = 'gallery-music-card-song';
    songTitle.textContent = pkg.song.song;
    songInfo.appendChild(songTitle);
    
    const songArtist = document.createElement('div');
    songArtist.className = 'gallery-music-card-artist';
    songArtist.textContent = pkg.song.artist;
    songInfo.appendChild(songArtist);
    
    songCard.appendChild(songInfo);
    card.appendChild(songCard);
    
    // Create audio element for hover playback
    const audio = document.createElement('audio');
    audio.src = ASSETS.music.audio(pkg.song.audio);
    audio.preload = 'none';
    audio.loop = true;
    card.appendChild(audio);
    
    // Play on hover, stop on leave
    card.addEventListener('mouseenter', () => {
        audio.currentTime = 0;
        audio.play().catch(() => {}); // Catch autoplay restrictions
    });
    
    card.addEventListener('mouseleave', () => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    // Create wrapper for card + info
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.appendChild(card);
    
    // Info on the right side of the card
    const info = document.createElement('div');
    info.className = 'gallery-card-info';
    
    // Title (The + package name + premium icon if applicable)
    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    
    const titleThe = document.createElement('span');
    titleThe.className = 'gallery-card-title-the';
    titleThe.textContent = 'The';
    title.appendChild(titleThe);
    
    const titleName = document.createElement('span');
    titleName.className = 'gallery-card-title-name';
    titleName.textContent = pkg.name;
    title.appendChild(titleName);
    
    // Add premium icon if package is premium
    if (pkg.premium) {
        const premiumIcon = document.createElement('img');
        premiumIcon.src = 'assets/icons/premium.svg';
        premiumIcon.alt = 'Premium';
        premiumIcon.className = 'gallery-card-premium-icon';
        title.appendChild(premiumIcon);
    }
    
    info.appendChild(title);
    
    // Bottom row with description and price
    const bottom = document.createElement('div');
    bottom.className = 'gallery-card-bottom';
    
    // Description with all selected item names
    const features = [];
    
    // Location name
    features.push(pkg.location.name);
    
    // Material
    features.push(pkg.material.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Ring');
    
    // Stone name
    if (STONE_NAMES[pkg.stone - 1]) {
        features.push(STONE_NAMES[pkg.stone - 1]);
    }
    
    // Carat
    features.push(`${pkg.carat} Carat`);
    
    // Source (if defined)
    if (pkg.source) {
        features.push(pkg.source === 'natural' ? 'Natural Diamond' : 'Lab-Grown Diamond');
    }
    
    // Packaging name
    if (PACKAGING[pkg.packaging - 1]) {
        features.push(PACKAGING[pkg.packaging - 1].name);
    }
    
    // Sign name
    if (SIGNS[pkg.sign - 1]) {
        features.push(SIGNS[pkg.sign - 1].name);
    }
    
    // Each flower by name
    pkg.flowers.forEach(flowerId => {
        if (FLOWERS[flowerId - 1]) {
            features.push(FLOWERS[flowerId - 1].name);
        }
    });
    
    // Balloon name
    if (pkg.balloon && BALLOONS[pkg.balloon - 1]) {
        features.push(BALLOONS[pkg.balloon - 1].name);
    }
    
    // Each extra by name
    pkg.extras.forEach(extraId => {
        if (EXTRAS[extraId - 1]) {
            features.push(EXTRAS[extraId - 1].name);
        }
    });
    
    const description = document.createElement('div');
    description.className = 'gallery-card-description';
    description.textContent = `including: ${features.join(', ')}.`;
    bottom.appendChild(description);
    
    // Price
    const price = document.createElement('div');
    price.className = 'gallery-card-price';
    const totalPrice = calculatePackagePrice(pkg);
    price.textContent = `$${totalPrice.toLocaleString()}`;
    bottom.appendChild(price);
    
    info.appendChild(bottom);
    item.appendChild(info);
    
    return item;
}

// Calculate carat price based on source (same formula as Cart.calculateCaratPrice)
// Lab: $1,000 - $5,000 | Natural: $4,000 - $30,000
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

// Calculate approximate package price
function calculatePackagePrice(pkg) {
    let total = 0;
    
    // Material price
    total += MATERIAL_PRICES[pkg.material] || 0;
    
    // Carat price (includes source-based pricing, no separate source price)
    // Use defined source or default to lab
    const source = pkg.source || 'lab';
    total += calculateCaratPrice(pkg.carat, source);
    
    // Location price
    total += pkg.location.price || 0;
    
    // Packaging price
    const packagingItem = PACKAGING[pkg.packaging - 1];
    total += packagingItem?.price || 0;
    
    // Sign price
    const signItem = SIGNS[pkg.sign - 1];
    total += signItem?.price || 0;
    
    // Flowers prices
    pkg.flowers.forEach(flowerId => {
        const flowerItem = FLOWERS[flowerId - 1];
        total += flowerItem?.price || 0;
    });
    
    // Balloon price
    if (pkg.balloon) {
        const balloonItem = BALLOONS[pkg.balloon - 1];
        total += balloonItem?.price || 0;
    }
    
    // Extras prices
    pkg.extras.forEach(extraId => {
        const extraItem = EXTRAS[extraId - 1];
        total += extraItem?.price || 0;
    });
    
    return total;
}

// Initialize gallery
function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    // Create cards from static examples
    GALLERY_EXAMPLES.forEach(pkg => {
        const card = createGalleryCard(pkg);
        grid.appendChild(card);
    });
    
    // Set up close button to return to the previous page
    setupCloseButton();
}

// Set up close button to navigate back to the referring page
function setupCloseButton() {
    const closeBtn = document.querySelector('.gallery-close-btn');
    if (!closeBtn) return;
    
    // Check if we have a stored referrer from sessionStorage
    const storedReferrer = sessionStorage.getItem('galleryReferrer');
    
    // Also check document.referrer as fallback
    const docReferrer = document.referrer;
    
    // Determine the return URL
    let returnUrl = 'index.html'; // Default fallback
    
    if (storedReferrer) {
        // Use stored referrer (set when clicking gallery link)
        returnUrl = storedReferrer;
    } else if (docReferrer) {
        // Parse the document referrer to get just the page
        try {
            const url = new URL(docReferrer);
            const pathname = url.pathname;
            
            // Check if it's from our site (configurator or index)
            if (pathname.includes('configurator.html')) {
                returnUrl = 'configurator.html';
            } else if (pathname.includes('index.html') || pathname.endsWith('/')) {
                returnUrl = 'index.html';
            }
        } catch (e) {
            // Invalid URL, use default
        }
    }
    
    // Update the close button href
    closeBtn.href = returnUrl;
    
    // Add click handler to use history.back() for better state preservation
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Clear the stored referrer
        sessionStorage.removeItem('galleryReferrer');
        
        // Use history.back() to preserve the previous page's state
        if (window.history.length > 1 && docReferrer) {
            window.history.back();
        } else {
            // Fallback to direct navigation
            window.location.href = returnUrl;
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initGallery);
