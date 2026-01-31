// ========================================
// DISPLAY AREA
// Note: Requires config.js and state.js to be loaded first
// ========================================

let currentRingMaterial = null;
let currentStone = null;
let currentPackaging = null;
let currentSign = null;
let currentFlowersSet = new Set();
let currentBalloon = null;
let currentExtrasSet = new Set();

function updateDisplay() {
    const displayContainer = document.querySelector('.display-container');
    let ringContainer = document.getElementById('ring-container');
    
    // Create ring container if it doesn't exist
    if (!ringContainer && state.selections.ring.material) {
        ringContainer = document.createElement('div');
        ringContainer.className = 'display-ring-container';
        ringContainer.id = 'ring-container';
        displayContainer.appendChild(ringContainer);
        
        // Create inner core container for ring, stone, packaging (with floating animation)
        const coreContainer = document.createElement('div');
        coreContainer.className = 'display-core floating';
        coreContainer.id = 'display-core';
        ringContainer.appendChild(coreContainer);
    }
    
    // Get or create core container
    let coreContainer = document.getElementById('display-core');
    
    if (coreContainer && state.selections.ring.material) {
        // Map material to display ring image
        const materialDisplayImages = {
            gold: ASSETS.rings.goldRing,
            silver: ASSETS.rings.silverRing,
            'rose-gold': ASSETS.rings.roseGoldRing,
            'white-gold': ASSETS.rings.whiteGoldRing
        };
        const newSrc = materialDisplayImages[state.selections.ring.material] || ASSETS.rings.goldRing;
        
        // Check if material changed
        if (state.selections.ring.material !== currentRingMaterial) {
            // Remove existing ring image to re-trigger animation
            let ringImage = coreContainer.querySelector('.display-ring');
            if (ringImage) ringImage.remove();
            
            // Create new ring image with animation
            ringImage = document.createElement('img');
            ringImage.className = 'display-ring';
            ringImage.src = newSrc;
            ringImage.alt = `${state.selections.ring.material} Ring`;
            coreContainer.appendChild(ringImage);
            
            currentRingMaterial = state.selections.ring.material;
        }
    }
    
    updateStoneDisplay();
    updatePackagingDisplay();
}

function updateStoneDisplay() {
    const coreContainer = document.getElementById('display-core');
    if (!coreContainer) return;
    
    let stone = coreContainer.querySelector('.display-stone');
    
    if (state.selections.diamond.stone) {
        const stoneChanged = state.selections.diamond.stone !== currentStone;
        
        if (stoneChanged || !stone) {
            if (stone) stone.remove();
            
            stone = document.createElement('img');
            stone.className = 'display-stone';
            stone.src = ASSETS.stones(state.selections.diamond.stone);
            stone.alt = `Stone ${state.selections.diamond.stone}`;
            coreContainer.appendChild(stone);
            
            currentStone = state.selections.diamond.stone;
        }
        
        stone = coreContainer.querySelector('.display-stone');
        if (stone) {
            const caratScale = 1.5 + (state.selections.diamond.carat - 0.5) * 0.7;
            stone.style.transform = `translate(-50%, -50%) scale(${caratScale})`;
        }
    } else if (stone) {
        stone.remove();
        currentStone = null;
    }
}

function updatePackagingDisplay() {
    const coreContainer = document.getElementById('display-core');
    if (!coreContainer) return;
    
    let packagingEl = coreContainer.querySelector('.display-packaging');
    
    if (state.selections.diamond.packaging) {
        if (state.selections.diamond.packaging !== currentPackaging) {
            if (packagingEl) packagingEl.remove();
            
            currentPackaging = state.selections.diamond.packaging;
            
            packagingEl = document.createElement('img');
            packagingEl.className = `display-packaging display-packaging-${state.selections.diamond.packaging}`;
            packagingEl.src = ASSETS.packing(state.selections.diamond.packaging);
            packagingEl.alt = `Packaging ${state.selections.diamond.packaging}`;
            coreContainer.insertBefore(packagingEl, coreContainer.firstChild);
        }
    } else if (packagingEl) {
        packagingEl.remove();
        currentPackaging = null;
    }
}

// ========================================
// SIGN DISPLAY
// ========================================

function updateSignDisplay() {
    const ringContainer = document.getElementById('ring-container');
    if (!ringContainer) return;
    
    let signEl = ringContainer.querySelector('.display-sign');
    
    if (state.selections.setup.signs) {
        if (state.selections.setup.signs !== currentSign) {
            if (signEl) signEl.remove();
            
            currentSign = state.selections.setup.signs;
            
            signEl = document.createElement('img');
            signEl.className = `display-sign display-sign-${state.selections.setup.signs}`;
            signEl.src = ASSETS.signs(state.selections.setup.signs);
            signEl.alt = SIGNS[state.selections.setup.signs - 1]?.name || `Sign ${state.selections.setup.signs}`;
            
            // Append to ring container (z-index handles layering)
            ringContainer.appendChild(signEl);
        }
    } else if (signEl) {
        signEl.remove();
        currentSign = null;
    }
}

// ========================================
// FLOWERS DISPLAY
// ========================================

function updateFlowersDisplay() {
    const ringContainer = document.getElementById('ring-container');
    if (!ringContainer) return;
    
    // Get or create flowers container
    let flowersContainer = ringContainer.querySelector('.flowers-container');
    if (!flowersContainer) {
        flowersContainer = document.createElement('div');
        flowersContainer.className = 'flowers-container';
        ringContainer.appendChild(flowersContainer);
    }
    
    const selectedFlowers = new Set(state.selections.setup.flowers || []);
    
    // Remove flowers that are no longer selected
    currentFlowersSet.forEach(flowerId => {
        if (!selectedFlowers.has(flowerId)) {
            const flowerEl = flowersContainer.querySelector(`.display-flower-${flowerId}`);
            if (flowerEl) {
                flowerEl.classList.add('fade-out');
                setTimeout(() => flowerEl.remove(), 300);
            }
            currentFlowersSet.delete(flowerId);
        }
    });
    
    // Add newly selected flowers
    selectedFlowers.forEach(flowerId => {
        if (!currentFlowersSet.has(flowerId)) {
            const flowerEl = document.createElement('img');
            flowerEl.className = `display-flower display-flower-${flowerId}`;
            flowerEl.src = ASSETS.flowers(flowerId);
            flowerEl.alt = FLOWERS[flowerId - 1]?.name || `Flower ${flowerId}`;
            flowersContainer.appendChild(flowerEl);
            currentFlowersSet.add(flowerId);
        }
    });
}

// ========================================
// BALLOONS DISPLAY
// ========================================

function updateBalloonsDisplay() {
    const ringContainer = document.getElementById('ring-container');
    if (!ringContainer) return;
    
    // Get or create balloons container
    let balloonsContainer = ringContainer.querySelector('.balloons-container');
    if (!balloonsContainer) {
        balloonsContainer = document.createElement('div');
        balloonsContainer.className = 'balloons-container';
        ringContainer.appendChild(balloonsContainer);
    }
    
    const selectedBalloon = state.selections.setup.balloons;
    
    // Remove previous balloon if different
    if (currentBalloon && currentBalloon !== selectedBalloon) {
        const balloonEl = balloonsContainer.querySelector(`.display-balloon-${currentBalloon}`);
        if (balloonEl) {
            balloonEl.classList.add('fade-out');
            setTimeout(() => balloonEl.remove(), 300);
        }
        currentBalloon = null;
    }
    
    // Add new balloon if selected
    if (selectedBalloon && selectedBalloon !== currentBalloon) {
        const balloonEl = document.createElement('img');
        balloonEl.className = `display-balloon display-balloon-${selectedBalloon}`;
        balloonEl.src = ASSETS.balloons(selectedBalloon);
        balloonEl.alt = BALLOONS[selectedBalloon - 1]?.name || `Balloon ${selectedBalloon}`;
        balloonsContainer.appendChild(balloonEl);
        currentBalloon = selectedBalloon;
    }
}

// ========================================
// EXTRAS DISPLAY
// ========================================

function updateExtrasDisplay() {
    const ringContainer = document.getElementById('ring-container');
    if (!ringContainer) return;
    
    // Get or create extras container
    let extrasContainer = ringContainer.querySelector('.extras-container');
    if (!extrasContainer) {
        extrasContainer = document.createElement('div');
        extrasContainer.className = 'extras-container';
        ringContainer.appendChild(extrasContainer);
    }
    
    const selectedExtras = new Set(state.selections.setup.extras || []);
    
    // Remove extras that are no longer selected
    currentExtrasSet.forEach(extraId => {
        if (!selectedExtras.has(extraId)) {
            const extraEl = extrasContainer.querySelector(`.display-extra-${extraId}`);
            if (extraEl) {
                extraEl.classList.add('fade-out');
                setTimeout(() => extraEl.remove(), 300);
            }
            currentExtrasSet.delete(extraId);
        }
    });
    
    // Add newly selected extras
    selectedExtras.forEach(extraId => {
        if (!currentExtrasSet.has(extraId)) {
            const extraEl = document.createElement('img');
            extraEl.className = `display-extra display-extra-${extraId}`;
            extraEl.src = ASSETS.extras(extraId);
            extraEl.alt = EXTRAS[extraId - 1]?.name || `Extra ${extraId}`;
            extrasContainer.appendChild(extraEl);
            currentExtrasSet.add(extraId);
        }
    });
}

// ========================================
// LOCATION BACKGROUND
// ========================================

function updateLocationBackground(locationName) {
    const pageBackground = document.querySelector('.page-background');
    if (!pageBackground) return;
    
    // Find the location by name
    const location = LOCATIONS.find(loc => loc.name === locationName);
    
    if (location) {
        pageBackground.style.backgroundImage = `url('assets/locations/${location.image}')`;
    }
}
