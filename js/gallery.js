// ========================================
// GALLERY PAGE - Package Examples Generator
// Note: Requires config.js to be loaded first
// ========================================

// Static gallery examples
const GALLERY_EXAMPLES = [
    // 1. Romantic Paris Evening
    {
        material: 'gold',
        stone: 5,
        carat: 1.8,
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
        material: 'white-gold',
        stone: 8,
        carat: 2.2,
        packaging: 2,
        location: LOCATIONS[6], // Maldives
        sign: 1,
        flowers: [2, 4, 7, 8],
        balloon: 1,
        extras: [1, 4, 6],
        song: MUSIC[11] // Elvis - Can't Help Falling in Love
    },
    // 3. New York City Lights
    {
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
        material: 'rose-gold',
        stone: 3,
        carat: 2.0,
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
        material: 'gold',
        stone: 17,
        carat: 1.2,
        packaging: 4,
        location: LOCATIONS[4], // Hot Air Balloon
        sign: 5,
        flowers: [3, 4, 8],
        balloon: 2,
        extras: [5],
        song: MUSIC[14] // Jason Mraz - I'm Yours
    },
    // 6. Jerusalem Sacred Moment
    {
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
        material: 'gold',
        stone: 19,
        carat: 2.4,
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
        material: 'rose-gold',
        stone: 11,
        carat: 1.0,
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
        material: 'gold',
        stone: 9,
        carat: 1.9,
        packaging: 4,
        location: LOCATIONS[13], // Thailand
        sign: 2,
        flowers: [4, 7, 8],
        balloon: 6,
        extras: [1, 5],
        song: MUSIC[13] // Sarit Hadad - Ahava Kmo Shelanu
    },
    // 11. Amsterdam Canal Romance
    {
        material: 'white-gold',
        stone: 14,
        carat: 2.1,
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
    
    // Info below the card
    const info = document.createElement('div');
    info.className = 'gallery-card-info';
    
    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.textContent = pkg.location.name;
    
    const price = document.createElement('div');
    price.className = 'gallery-card-price';
    // Calculate approximate price
    const totalPrice = calculatePackagePrice(pkg);
    price.textContent = `$${totalPrice.toLocaleString()}`;
    
    info.appendChild(title);
    info.appendChild(price);
    item.appendChild(info);
    
    return item;
}

// Calculate approximate package price
function calculatePackagePrice(pkg) {
    let total = 0;
    
    // Material price
    total += MATERIAL_PRICES[pkg.material] || 0;
    
    // Source (random between lab and natural for display)
    total += Math.random() > 0.5 ? SOURCE_PRICES.lab : SOURCE_PRICES.natural;
    
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
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initGallery);
