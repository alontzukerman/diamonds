// ========================================
// SELECTOR RENDERERS
// Note: Requires config.js, state.js, and other modules to be loaded first
// ========================================

// Reference to selection container (set during initialization)
let selectionContainer = null;

// Reference to item info box elements
let itemInfoBox = null;
let itemInfoLabel = null;
let itemInfoPrice = null;

// Track selected item info per section
let selectedItemInfo = {};

function initRenderers() {
    selectionContainer = document.getElementById('selection-container');
    itemInfoBox = document.getElementById('item-info-box');
    itemInfoLabel = document.getElementById('item-info-label');
    itemInfoPrice = document.getElementById('item-info-price');
}

// ========================================
// ITEM INFO BOX FUNCTIONS
// ========================================

function showItemInfo(label, price) {
    if (!itemInfoBox || !itemInfoLabel || !itemInfoPrice) return;
    
    // Don't show item info box for music section
    if (state.currentSection === 'music') return;
    
    itemInfoLabel.textContent = label || '';
    itemInfoPrice.textContent = price || '';
    itemInfoPrice.style.display = price ? 'block' : 'none';
    itemInfoBox.classList.add('visible');
}

function hideItemInfo() {
    if (!itemInfoBox) return;
    itemInfoBox.classList.remove('visible');
}

function setSelectedItemInfo(sectionName, label, price) {
    selectedItemInfo[sectionName] = { label, price };
}

function clearSelectedItemInfo(sectionName) {
    delete selectedItemInfo[sectionName];
}

function showSelectedItemInfo(sectionName) {
    const info = selectedItemInfo[sectionName];
    if (info) {
        showItemInfo(info.label, info.price);
    } else {
        hideItemInfo();
    }
}

function hideAllSelectors() {
    if (selectionContainer) {
        selectionContainer.innerHTML = '';
    }
    // Hide the item info box when switching sections
    hideItemInfo();
}

function showSelector(sectionName, SELECTORS_CONFIG) {
    const config = SELECTORS_CONFIG[sectionName];
    if (!config) {
        hideAllSelectors();
        return;
    }
    
    // For carousel/buttons/grid, check if items exist
    if (config.type !== 'slider' && (!config.items || config.items.length === 0)) {
        hideAllSelectors();
        return;
    }
    
    state.currentSection = sectionName;
    hideAllSelectors();
    
    switch (config.type) {
        case 'carousel':
            renderCarousel(sectionName, config, SELECTORS_CONFIG);
            break;
        case 'flex-carousel':
            renderFlexCarousel(sectionName, config, SELECTORS_CONFIG);
            break;
        case 'music-carousel':
            renderMusicCarousel(sectionName, config, SELECTORS_CONFIG);
            break;
        case 'buttons':
            renderButtons(sectionName, config);
            break;
        case 'slider':
            renderSlider(sectionName, config);
            break;
        case 'grid':
            renderGrid(sectionName, config, SELECTORS_CONFIG);
            break;
        case 'multiselect':
            renderMultiSelect(sectionName, config);
            break;
    }
    
    // Update navigation buttons after showing selector
    if (typeof updateNavButtons === 'function') {
        updateNavButtons();
    }
}

// ========================================
// CAROUSEL RENDERER
// ========================================

function renderCarousel(sectionName, config, SELECTORS_CONFIG) {
    // Initialize carousel index if not exists
    if (state.carouselIndices[sectionName] === undefined) {
        state.carouselIndices[sectionName] = 0;
    }
    
    const carousel = document.createElement('div');
    carousel.className = 'selection-carousel';
    carousel.id = `${sectionName}-carousel`;
    
    // Left arrow
    const leftArrow = document.createElement('button');
    leftArrow.className = 'carousel-arrow carousel-arrow-left';
    const leftArrowImg = document.createElement('img');
    leftArrowImg.src = ASSETS.icons.leftArrow;
    leftArrowImg.alt = 'Previous';
    leftArrow.appendChild(leftArrowImg);
    leftArrow.addEventListener('click', () => {
        const prevIndex = state.carouselIndices[sectionName];
        state.carouselIndices[sectionName] = (state.carouselIndices[sectionName] - 1 + config.items.length) % config.items.length;
        animateCarousel(sectionName, config, prevIndex, 'left');
    });
    
    // Content container
    const content = document.createElement('div');
    content.className = 'carousel-content';
    content.id = `${sectionName}-carousel-content`;
    
    // Render all items (only current one visible)
    config.items.forEach((item, index) => {
        const itemEl = createCarouselItem(item, sectionName, config, SELECTORS_CONFIG);
        itemEl.style.display = index === state.carouselIndices[sectionName] ? 'flex' : 'none';
        content.appendChild(itemEl);
    });
    
    // Right arrow
    const rightArrow = document.createElement('button');
    rightArrow.className = 'carousel-arrow carousel-arrow-right';
    const rightArrowImg = document.createElement('img');
    rightArrowImg.src = ASSETS.icons.rightArrow;
    rightArrowImg.alt = 'Next';
    rightArrow.appendChild(rightArrowImg);
    rightArrow.addEventListener('click', () => {
        const prevIndex = state.carouselIndices[sectionName];
        state.carouselIndices[sectionName] = (state.carouselIndices[sectionName] + 1) % config.items.length;
        animateCarousel(sectionName, config, prevIndex, 'right');
    });
    
    carousel.appendChild(leftArrow);
    carousel.appendChild(content);
    carousel.appendChild(rightArrow);
    
    selectionContainer.appendChild(carousel);
}

function createCarouselItem(item, sectionName, config, SELECTORS_CONFIG) {
    const itemEl = document.createElement('div');
    itemEl.className = 'carousel-item';
    itemEl.setAttribute(`data-${sectionName}`, item.id);
    
    // Check if this item is currently selected
    const isSelected = getSelectionValue(sectionName) === item.id;
    if (isSelected) {
        itemEl.classList.add('selected');
    }
    
    // Image with section-specific class
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.label;
    img.className = `carousel-image carousel-image-${sectionName}-${item.id}`;
    itemEl.appendChild(img);
    
    // Info container
    const info = document.createElement('div');
    info.className = 'carousel-info';
    
    // Label
    const label = document.createElement('span');
    label.className = 'carousel-label';
    label.textContent = item.label;
    info.appendChild(label);
    
    // Price (if exists)
    if (item.price) {
        const price = document.createElement('span');
        price.className = 'carousel-price';
        price.textContent = item.price;
        info.appendChild(price);
    }
    
    itemEl.appendChild(info);
    
    // Premium label (if exists) - positioned absolutely on the item
    if (item.premium) {
        const premium = document.createElement('div');
        premium.className = 'carousel-premium';
        const premiumImg = document.createElement('img');
        premiumImg.src = ASSETS.icons.premium;
        premiumImg.alt = 'Premium';
        premium.appendChild(premiumImg);
        itemEl.appendChild(premium);
    }
    
    // Click to select
    itemEl.addEventListener('click', () => {
        selectItem(sectionName, item.id, config, SELECTORS_CONFIG);
    });
    
    return itemEl;
}

function animateCarousel(sectionName, config, prevIndex, direction) {
    const content = document.getElementById(`${sectionName}-carousel-content`);
    if (!content) return;
    
    const items = content.querySelectorAll('.carousel-item');
    const currentIndex = state.carouselIndices[sectionName];
    
    // Get the previous and current items
    const prevItem = items[prevIndex];
    const currentItem = items[currentIndex];
    
    if (!prevItem || !currentItem) return;
    
    // Clear previous animations
    items.forEach(item => {
        item.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    });
    
    // Show both items during animation
    prevItem.style.display = 'flex';
    currentItem.style.display = 'flex';
    
    // Apply animations based on direction
    if (direction === 'right') {
        // Clicking right arrow: current slides out left, new comes from right
        prevItem.classList.add('slide-out-right');
        currentItem.classList.add('slide-in-left');
    } else {
        // Clicking left arrow: current slides out right, new comes from left
        prevItem.classList.add('slide-out-left');
        currentItem.classList.add('slide-in-right');
    }
    
    // After animation ends, hide the previous item
    setTimeout(() => {
        prevItem.style.display = 'none';
        prevItem.classList.remove('slide-out-left', 'slide-out-right');
    }, 200);
}

// ========================================
// FLEX CAROUSEL RENDERER (all items visible)
// ========================================

function renderFlexCarousel(sectionName, config, SELECTORS_CONFIG) {
    const container = document.createElement('div');
    container.className = 'flex-carousel';
    container.id = `${sectionName}-flex-carousel`;
    
    // Find currently selected item to show its info
    const currentValue = getSelectionValue(sectionName);
    let selectedItem = null;
    
    // Render all items visible
    config.items.forEach((item) => {
        const itemEl = createFlexCarouselItem(item, sectionName, config, SELECTORS_CONFIG);
        container.appendChild(itemEl);
        
        // Track selected item for single-select
        if (!config.multiselect && currentValue === item.id) {
            selectedItem = item;
        }
    });
    
    // If there's a pre-selected item (single-select), store and show its info
    if (selectedItem) {
        setSelectedItemInfo(sectionName, selectedItem.label, selectedItem.price);
        showItemInfo(selectedItem.label, selectedItem.price);
    } else {
        // Clear any previous selected info and hide
        clearSelectedItemInfo(sectionName);
        hideItemInfo();
    }
    
    selectionContainer.appendChild(container);
}

function createFlexCarouselItem(item, sectionName, config, SELECTORS_CONFIG) {
    const itemEl = document.createElement('div');
    itemEl.className = 'flex-carousel-item';
    itemEl.setAttribute(`data-${sectionName}`, item.id);
    
    // Check if this item is currently selected (handle both single and multiselect)
    const currentValue = getSelectionValue(sectionName);
    const isSelected = config.multiselect 
        ? (Array.isArray(currentValue) && currentValue.includes(item.id))
        : currentValue === item.id;
    if (isSelected) {
        itemEl.classList.add('selected');
    }
    
    // Music player items have special rendering with card layout
    if (config.musicPlayer) {
        itemEl.classList.add('music-flex-item');
        
        // Check if this item is currently playing
        if (currentPlayingId === item.id) {
            itemEl.classList.add('playing');
        }
        
        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'music-flex-image-container';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label;
        img.className = `flex-carousel-image flex-carousel-image-${sectionName}-${item.id}`;
        img.onerror = function() {
            this.style.display = 'none';
            imageContainer.classList.add('placeholder');
        };
        imageContainer.appendChild(img);
        itemEl.appendChild(imageContainer);
        
        // Info container (song + artist)
        const info = document.createElement('div');
        info.className = 'music-flex-info';
        
        // Song name (first, bold)
        const song = document.createElement('span');
        song.className = 'music-flex-song';
        song.textContent = item.song;
        info.appendChild(song);
        
        // Artist name (second, regular)
        const artist = document.createElement('span');
        artist.className = 'music-flex-artist';
        artist.textContent = item.artist;
        info.appendChild(artist);
        
        itemEl.appendChild(info);
    } else {
        // Regular image with container for premium label positioning
        const imageContainer = document.createElement('div');
        imageContainer.className = 'flex-carousel-image-container';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label;
        img.className = `flex-carousel-image flex-carousel-image-${sectionName}-${item.id}`;
        imageContainer.appendChild(img);
        
        // Premium label (if exists) - inside container to scale together
        if (item.premium) {
            const premium = document.createElement('div');
            premium.className = 'flex-carousel-premium';
            const premiumImg = document.createElement('img');
            premiumImg.src = ASSETS.icons.premium;
            premiumImg.alt = 'Premium';
            premium.appendChild(premiumImg);
            imageContainer.appendChild(premium);
        }
        
        itemEl.appendChild(imageContainer);
    }
    
    // Hover to show info in item info box
    itemEl.addEventListener('mouseenter', () => {
        showItemInfo(item.label, item.price);
        // For music items, also start playback on hover
        if (config.musicPlayer && item.audio) {
            startMusicFlexPlayback(item, itemEl);
        }
    });
    
    itemEl.addEventListener('mouseleave', () => {
        // When not hovering, show selected item info if any
        showSelectedItemInfo(sectionName);
        // For music items, stop playback on mouse leave
        if (config.musicPlayer && item.audio) {
            stopMusicFlexPlayback(item, itemEl);
        }
    });
    
    // Click to select
    itemEl.addEventListener('click', () => {
        selectFlexCarouselItem(sectionName, item.id, item, config, SELECTORS_CONFIG);
    });
    
    return itemEl;
}

function selectFlexCarouselItem(sectionName, value, itemData, config, SELECTORS_CONFIG) {
    const container = document.getElementById(`${sectionName}-flex-carousel`);
    let selectedElement = null;
    
    if (config.multiselect) {
        // Multiselect: toggle the clicked item
        if (container) {
            const clickedItem = container.querySelector(`.flex-carousel-item[data-${sectionName}="${value}"]`);
            if (clickedItem) {
                const isNowSelected = !clickedItem.classList.contains('selected');
                clickedItem.classList.toggle('selected', isNowSelected);
                selectedElement = isNowSelected ? clickedItem : null;
                
                // For multiselect, we don't persist single item info
                // (could be enhanced to show count or last selected)
                
                // Call the onSelect handler with isSelected state
                if (config.onSelect) {
                    config.onSelect(value, isNowSelected, selectedElement);
                }
            }
        }
    } else {
        // Single select: only one item selected at a time
        if (container) {
            container.querySelectorAll('.flex-carousel-item').forEach(item => {
                const isSelected = item.getAttribute(`data-${sectionName}`) === value;
                item.classList.toggle('selected', isSelected);
                if (isSelected) {
                    selectedElement = item;
                }
            });
        }
        
        // Store selected item info for showing when not hovering
        setSelectedItemInfo(sectionName, itemData.label, itemData.price);
        showItemInfo(itemData.label, itemData.price);
        
        // For music items, toggle play/stop when clicking the same song
        if (config.musicPlayer && itemData.audio) {
            // Check if clicking the same song that's already selected
            if (selectedMusicId === value) {
                // Toggle play/stop, but keep selection
                if (currentAudio && currentPlayingId === value) {
                    // Currently playing - stop it
                    currentAudio.pause();
                    currentAudio = null;
                    currentPlayingId = null;
                    
                    // Remove playing class but keep selected
                    document.querySelectorAll('.music-card.playing, .music-flex-item.playing').forEach(card => {
                        card.classList.remove('playing');
                    });
                } else {
                    // Currently stopped - play it again
                    currentAudio = new Audio(itemData.audio);
                    currentPlayingId = value;
                    currentAudio.loop = true;
                    
                    if (selectedElement) {
                        selectedElement.classList.add('playing');
                    }
                    
                    currentAudio.play().catch(() => {});
                }
                
                return; // Don't call onSelect again, selection is unchanged
            }
            
            // New song selected - stop any currently playing audio first
            selectedMusicId = value;
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
                document.querySelectorAll('.music-card.playing, .music-flex-item.playing').forEach(card => {
                    card.classList.remove('playing');
                });
            }
            
            // Start playing the selected song
            currentAudio = new Audio(itemData.audio);
            currentPlayingId = value;
            currentAudio.loop = true; // Loop the selected song
            
            // Add playing class
            if (selectedElement) {
                selectedElement.classList.add('playing');
            }
            
            currentAudio.play().catch(() => {});
        }
        
        // Call the onSelect handler
        if (config.onSelect) {
            config.onSelect(value, selectedElement);
        }
    }
    
    // Check if current step is now complete
    checkStepCompletion(state.currentStep);
}

// ========================================
// MUSIC CAROUSEL RENDERER
// ========================================

function renderMusicCarousel(sectionName, config, SELECTORS_CONFIG) {
    // Initialize carousel index if not exists
    if (state.carouselIndices[sectionName] === undefined) {
        state.carouselIndices[sectionName] = 0;
    }
    
    const carousel = document.createElement('div');
    carousel.className = 'selection-carousel music-carousel';
    carousel.id = `${sectionName}-carousel`;
    
    // Left arrow
    const leftArrow = document.createElement('button');
    leftArrow.className = 'carousel-arrow carousel-arrow-left';
    const leftArrowImg = document.createElement('img');
    leftArrowImg.src = ASSETS.icons.leftArrow;
    leftArrowImg.alt = 'Previous';
    leftArrow.appendChild(leftArrowImg);
    leftArrow.addEventListener('click', () => {
        const prevIndex = state.carouselIndices[sectionName];
        state.carouselIndices[sectionName] = (state.carouselIndices[sectionName] - 1 + config.items.length) % config.items.length;
        animateMusicCarousel(sectionName, config, prevIndex, 'left');
    });
    
    // Content container
    const content = document.createElement('div');
    content.className = 'carousel-content music-carousel-content';
    content.id = `${sectionName}-carousel-content`;
    
    // Render all items (only current one visible)
    config.items.forEach((item, index) => {
        const itemEl = createMusicCarouselItem(item, sectionName, config, SELECTORS_CONFIG);
        itemEl.style.display = index === state.carouselIndices[sectionName] ? 'flex' : 'none';
        content.appendChild(itemEl);
    });
    
    // Right arrow
    const rightArrow = document.createElement('button');
    rightArrow.className = 'carousel-arrow carousel-arrow-right';
    const rightArrowImg = document.createElement('img');
    rightArrowImg.src = ASSETS.icons.rightArrow;
    rightArrowImg.alt = 'Next';
    rightArrow.appendChild(rightArrowImg);
    rightArrow.addEventListener('click', () => {
        const prevIndex = state.carouselIndices[sectionName];
        state.carouselIndices[sectionName] = (state.carouselIndices[sectionName] + 1) % config.items.length;
        animateMusicCarousel(sectionName, config, prevIndex, 'right');
    });
    
    carousel.appendChild(leftArrow);
    carousel.appendChild(content);
    carousel.appendChild(rightArrow);
    
    selectionContainer.appendChild(carousel);
}

// Global audio element for music playback
let currentAudio = null;
let currentPlayingId = null;
let selectedMusicId = null; // Track the selected song to keep playing it

// Global function to stop music playback (called when leaving music step)
function stopMusicPlayback() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        currentPlayingId = null;
        document.querySelectorAll('.music-card.playing, .music-flex-item.playing').forEach(card => {
            card.classList.remove('playing');
        });
    }
}

function createMusicCarouselItem(item, sectionName, config, SELECTORS_CONFIG) {
    const itemEl = document.createElement('div');
    itemEl.className = 'carousel-item music-card';
    itemEl.setAttribute(`data-${sectionName}`, item.id);
    
    // Check if this item is currently selected
    const isSelected = getSelectionValue(sectionName) === item.id;
    if (isSelected) {
        itemEl.classList.add('selected');
    }
    
    // Check if this item is currently playing
    if (currentPlayingId === item.id) {
        itemEl.classList.add('playing');
    }
    
    // Album art / cover image
    const imageContainer = document.createElement('div');
    imageContainer.className = 'music-card-image';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = `${item.artist} - ${item.song}`;
    img.className = 'music-card-cover';
    // Placeholder styling in case image doesn't exist yet
    img.onerror = function() {
        this.style.display = 'none';
        imageContainer.classList.add('placeholder');
    };
    imageContainer.appendChild(img);
    
    // Play/Pause overlay
    const playOverlay = document.createElement('div');
    playOverlay.className = 'music-play-overlay';
    
    const playIcon = document.createElement('div');
    playIcon.className = 'music-play-icon';
    playOverlay.appendChild(playIcon);
    
    // Play/Pause click handler with stopPropagation
    playOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusicPlayback(item, itemEl);
    });
    
    imageContainer.appendChild(playOverlay);
    itemEl.appendChild(imageContainer);
    
    // Info container (song + artist)
    const info = document.createElement('div');
    info.className = 'music-card-info';
    
    // Song name (first, bold)
    const song = document.createElement('span');
    song.className = 'music-card-song';
    song.textContent = item.song;
    info.appendChild(song);
    
    // Artist name (second, regular)
    const artist = document.createElement('span');
    artist.className = 'music-card-artist';
    artist.textContent = item.artist;
    info.appendChild(artist);
    
    itemEl.appendChild(info);
    
    // Hover to play music
    itemEl.addEventListener('mouseenter', () => {
        startMusicPlayback(item, itemEl);
    });
    
    itemEl.addEventListener('mouseleave', () => {
        stopMusicCardPlayback(item, itemEl);
    });
    
    // Click to select
    itemEl.addEventListener('click', () => {
        selectMusicItem(sectionName, item.id, config, SELECTORS_CONFIG, itemEl);
    });
    
    return itemEl;
}

function startMusicPlayback(item, cardElement) {
    // If a song is already selected, don't let hover change it
    if (selectedMusicId !== null) {
        return;
    }
    
    // If already playing this song, do nothing
    if (currentPlayingId === item.id && currentAudio && !currentAudio.paused) {
        return;
    }
    
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        // Remove playing class from all cards
        document.querySelectorAll('.music-card.playing, .music-flex-item.playing').forEach(card => {
            card.classList.remove('playing');
        });
    }
    
    // Create and play new audio
    currentAudio = new Audio(item.audio);
    currentPlayingId = item.id;
    
    // Add playing class to this card
    cardElement.classList.add('playing');
    document.querySelectorAll(`.music-card[data-music="${item.id}"], .music-flex-item[data-music="${item.id}"]`).forEach(card => {
        card.classList.add('playing');
    });
    
    currentAudio.play().catch(() => {});
    
    // Handle audio ending
    currentAudio.addEventListener('ended', () => {
        cardElement.classList.remove('playing');
        document.querySelectorAll(`.music-card[data-music="${item.id}"], .music-flex-item[data-music="${item.id}"]`).forEach(card => {
            card.classList.remove('playing');
        });
        currentPlayingId = null;
    });
}

function stopMusicCardPlayback(item, cardElement) {
    // Don't stop if a song is selected (it should keep playing)
    if (selectedMusicId !== null) {
        return;
    }
    
    // Only stop if this is the currently playing song
    if (currentPlayingId === item.id && currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        cardElement.classList.remove('playing');
        document.querySelectorAll(`.music-card[data-music="${item.id}"], .music-flex-item[data-music="${item.id}"]`).forEach(card => {
            card.classList.remove('playing');
        });
        currentPlayingId = null;
    }
}

function toggleMusicPlayback(item, cardElement) {
    // If clicking on the same song that's playing, pause it
    if (currentPlayingId === item.id && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        cardElement.classList.remove('playing');
        // Update all cards with this id
        document.querySelectorAll(`.music-card[data-music="${item.id}"]`).forEach(card => {
            card.classList.remove('playing');
        });
        currentPlayingId = null;
        return;
    }
    
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        // Remove playing class from all cards
        document.querySelectorAll('.music-card.playing').forEach(card => {
            card.classList.remove('playing');
        });
    }
    
    // Create and play new audio
    currentAudio = new Audio(item.audio);
    currentPlayingId = item.id;
    
    // Add playing class to this card
    cardElement.classList.add('playing');
    document.querySelectorAll(`.music-card[data-music="${item.id}"]`).forEach(card => {
        card.classList.add('playing');
    });
    
    // Handle audio ending
    currentAudio.addEventListener('ended', () => {
        cardElement.classList.remove('playing');
        document.querySelectorAll(`.music-card[data-music="${item.id}"]`).forEach(card => {
            card.classList.remove('playing');
        });
        currentPlayingId = null;
    });
    
    currentAudio.play().catch(err => {
        console.warn('Audio playback failed:', err);
        cardElement.classList.remove('playing');
        currentPlayingId = null;
    });
}

function toggleMusicFlexPlayback(item, cardElement) {
    // If clicking on the same song that's playing, pause it
    if (currentPlayingId === item.id && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        cardElement.classList.remove('playing');
        // Update all flex music items with this id
        document.querySelectorAll(`.music-flex-item[data-music="${item.id}"]`).forEach(card => {
            card.classList.remove('playing');
        });
        currentPlayingId = null;
        return;
    }
    
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        // Remove playing class from all music items
        document.querySelectorAll('.music-flex-item.playing, .music-card.playing').forEach(card => {
            card.classList.remove('playing');
        });
    }
    
    // Create and play new audio
    currentAudio = new Audio(item.audio);
    currentPlayingId = item.id;
    
    // Add playing class to this card
    cardElement.classList.add('playing');
    document.querySelectorAll(`.music-flex-item[data-music="${item.id}"]`).forEach(card => {
        card.classList.add('playing');
    });
    
    // Handle audio ending
    currentAudio.addEventListener('ended', () => {
        cardElement.classList.remove('playing');
        document.querySelectorAll(`.music-flex-item[data-music="${item.id}"]`).forEach(card => {
            card.classList.remove('playing');
        });
        currentPlayingId = null;
    });
    
    currentAudio.play().catch(err => {
        console.warn('Audio playback failed:', err);
        cardElement.classList.remove('playing');
        currentPlayingId = null;
    });
}

function startMusicFlexPlayback(item, cardElement) {
    // If a song is already selected, don't let hover change it
    if (selectedMusicId !== null) {
        return;
    }
    
    // If already playing this song, do nothing
    if (currentPlayingId === item.id && currentAudio && !currentAudio.paused) {
        return;
    }
    
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        // Remove playing class from all cards
        document.querySelectorAll('.music-card.playing, .music-flex-item.playing').forEach(card => {
            card.classList.remove('playing');
        });
    }
    
    // Create and play new audio
    currentAudio = new Audio(item.audio);
    currentPlayingId = item.id;
    
    // Add playing class to this card
    cardElement.classList.add('playing');
    
    currentAudio.play().catch(() => {});
    
    // Handle audio ending
    currentAudio.addEventListener('ended', () => {
        cardElement.classList.remove('playing');
        currentPlayingId = null;
    });
}

function stopMusicFlexPlayback(item, cardElement) {
    // Don't stop if a song is selected (it should keep playing)
    if (selectedMusicId !== null) {
        return;
    }
    
    // Only stop if this is the currently playing song
    if (currentPlayingId === item.id && currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        cardElement.classList.remove('playing');
        currentPlayingId = null;
    }
}

function selectMusicItem(sectionName, value, config, SELECTORS_CONFIG, sourceElement = null) {
    // Update visual state
    const content = document.getElementById(`${sectionName}-carousel-content`);
    let selectedElement = sourceElement;
    
    if (content) {
        content.querySelectorAll('.music-card').forEach(item => {
            const isSelected = item.getAttribute(`data-${sectionName}`) === value;
            item.classList.toggle('selected', isSelected);
            if (isSelected && !selectedElement) {
                selectedElement = item;
            }
        });
    }
    
    // Find the selected item data and start playing it
    const selectedItem = config.items.find(item => item.id === value);
    if (selectedItem) {
        selectedMusicId = value;
        
        // Stop any currently playing audio first
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
            document.querySelectorAll('.music-card.playing, .music-flex-item.playing').forEach(card => {
                card.classList.remove('playing');
            });
        }
        
        // Start playing the selected song
        currentAudio = new Audio(selectedItem.audio);
        currentPlayingId = value;
        currentAudio.loop = true; // Loop the selected song
        
        // Add playing class
        if (selectedElement) {
            selectedElement.classList.add('playing');
        }
        document.querySelectorAll(`.music-card[data-music="${value}"], .music-flex-item[data-music="${value}"]`).forEach(card => {
            card.classList.add('playing');
        });
        
        currentAudio.play().catch(() => {});
    }
    
    // Call the onSelect handler with source element for animation
    if (config.onSelect) {
        config.onSelect(value, selectedElement);
    }
    
    // Check if current step is now complete
    checkStepCompletion(state.currentStep);
}

function animateMusicCarousel(sectionName, config, prevIndex, direction) {
    const content = document.getElementById(`${sectionName}-carousel-content`);
    if (!content) return;
    
    const items = content.querySelectorAll('.music-card');
    const currentIndex = state.carouselIndices[sectionName];
    
    // Get the previous and current items
    const prevItem = items[prevIndex];
    const currentItem = items[currentIndex];
    
    if (!prevItem || !currentItem) return;
    
    // Clear previous animations
    items.forEach(item => {
        item.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    });
    
    // Show both items during animation
    prevItem.style.display = 'flex';
    currentItem.style.display = 'flex';
    
    // Apply animations based on direction
    if (direction === 'right') {
        prevItem.classList.add('slide-out-right');
        currentItem.classList.add('slide-in-left');
    } else {
        prevItem.classList.add('slide-out-left');
        currentItem.classList.add('slide-in-right');
    }
    
    // After animation ends, hide the previous item
    setTimeout(() => {
        prevItem.style.display = 'none';
        prevItem.classList.remove('slide-out-left', 'slide-out-right');
    }, 200);
}

// ========================================
// BUTTONS RENDERER
// ========================================

function renderButtons(sectionName, config) {
    const container = document.createElement('div');
    container.className = `selection-buttons selection-buttons-${sectionName}`;
    container.id = `${sectionName}-buttons`;
    
    const currentValue = getSelectionValue(sectionName);
    
    config.items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `selection-btn selection-btn-${sectionName}`;
        btn.setAttribute('data-value', item);
        btn.textContent = item;
        
        // Check if this is a premium location
        if (sectionName === 'location') {
            const locationData = LOCATIONS.find(loc => loc.name === item);
            if (locationData && locationData.premium) {
                btn.classList.add('premium');
                const star = document.createElement('img');
                star.src = 'assets/icons/red-star.svg';
                star.alt = 'Premium';
                star.className = 'location-premium-star';
                btn.appendChild(star);
            }
        }
        
        if (item === currentValue) {
            btn.classList.add('selected');
        }
        
        btn.addEventListener('click', () => {
            // Update UI
            container.querySelectorAll('.selection-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            // Call onSelect with button as source element
            if (config.onSelect) {
                config.onSelect(item, btn);
            }
            
            // Check if current step is now complete
            checkStepCompletion(state.currentStep);
        });
        
        container.appendChild(btn);
    });
    
    selectionContainer.appendChild(container);
}

// ========================================
// SLIDER RENDERER
// ========================================

function renderSlider(sectionName, config) {
    const container = document.createElement('div');
    container.className = 'selection-slider';
    container.id = `${sectionName}-slider`;
    
    const currentValue = getSelectionValue(sectionName) || config.defaultValue;
    
    // Get dynamic prices (use functions if available, otherwise fallback to static values)
    const minPriceValue = config.getMinPrice ? config.getMinPrice() : 500;
    const maxPriceValue = config.getMaxPrice ? config.getMaxPrice() : 6000;
    
    // Format price for display
    const formatPrice = (price) => {
        if (price >= 1000) {
            return `[$${price.toLocaleString()}]`;
        }
        return `[$${price}]`;
    };
    
    // Slider wrapper (contains left label, bar, right label) in a row
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'carat-slider-wrapper';
    
    // Left label wrapper
    const minLabelWrapper = document.createElement('div');
    minLabelWrapper.className = 'carat-min-wrapper';
    
    const minLabel = document.createElement('span');
    minLabel.className = 'carat-label-min';
    minLabel.textContent = `${config.min.toFixed(2)} ${config.unit}`;
    
    const minPrice = document.createElement('span');
    minPrice.className = 'carat-price';
    minPrice.textContent = formatPrice(minPriceValue);
    
    minLabelWrapper.appendChild(minLabel);
    minLabelWrapper.appendChild(minPrice);
    
    // Bar container with handle
    const barContainer = document.createElement('div');
    barContainer.className = 'carat-bar-container';
    
    // Draggable handle
    const handle = document.createElement('div');
    handle.className = 'carat-handle';
    handle.id = 'carat-handle';
    
    // Floating label above handle
    const handleLabel = document.createElement('span');
    handleLabel.className = 'carat-handle-label';
    handleLabel.id = 'carat-handle-label';
    handleLabel.textContent = `${currentValue.toFixed(2)} ${config.unit}`;
    handle.appendChild(handleLabel);
    
    const barImg = document.createElement('img');
    barImg.src = 'assets/carat-bar.svg';
    barImg.alt = 'Carat bar';
    barImg.className = 'carat-bar-img';
    
    barContainer.appendChild(handle);
    barContainer.appendChild(barImg);
    
    // Right label with premium tag
    const maxLabelWrapper = document.createElement('div');
    maxLabelWrapper.className = 'carat-max-wrapper';
    
    const premiumTag = document.createElement('div');
    premiumTag.className = 'carat-premium-tag';
    const premiumImg = document.createElement('img');
    premiumImg.src = ASSETS.icons.premium;
    premiumImg.alt = 'Premium';
    premiumTag.appendChild(premiumImg);
    
    const maxLabel = document.createElement('span');
    maxLabel.className = 'carat-label-max';
    maxLabel.textContent = `${config.max.toFixed(2)} ${config.unit}`;
    
    const maxPrice = document.createElement('span');
    maxPrice.className = 'carat-price';
    maxPrice.textContent = formatPrice(maxPriceValue);
    
    maxLabelWrapper.appendChild(premiumTag);
    maxLabelWrapper.appendChild(maxLabel);
    maxLabelWrapper.appendChild(maxPrice);
    
    // Assemble slider wrapper (left, bar, right)
    sliderWrapper.appendChild(minLabelWrapper);
    sliderWrapper.appendChild(barContainer);
    sliderWrapper.appendChild(maxLabelWrapper);
    
    container.appendChild(sliderWrapper);
    
    selectionContainer.appendChild(container);
    
    // Initialize handle position
    const minVal = config.min;
    const maxVal = config.max;
    const range = maxVal - minVal;
    // Map value to 4-96% range
    const initialPercent = 4 + ((currentValue - minVal) / range) * 92;
    handle.style.left = `${initialPercent}%`;
    
    // Drag functionality
    let isDragging = false;
    
    const updateHandlePosition = (clientX) => {
        const barRect = barContainer.getBoundingClientRect();
        let percent = ((clientX - barRect.left) / barRect.width) * 100;
        percent = Math.max(4, Math.min(96, percent));
        
        handle.style.left = `${percent}%`;
        
        // Calculate value (map 4-96% to min-max range)
        const normalizedPercent = (percent - 4) / 92; // Convert 4-96 range to 0-1
        const value = minVal + normalizedPercent * range;
        const steppedValue = Math.round(value / config.step) * config.step;
        const clampedValue = Math.max(minVal, Math.min(maxVal, steppedValue));
        
        // Update floating label
        const label = document.getElementById('carat-handle-label');
        if (label) {
            label.textContent = `${clampedValue.toFixed(2)} ${config.unit}`;
        }
        
        if (config.onSelect) {
            config.onSelect(clampedValue, handle);
        }
    };
    
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateHandlePosition(e.clientX);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Click on bar to move handle
    barContainer.addEventListener('click', (e) => {
        updateHandlePosition(e.clientX);
    });
}

// ========================================
// MULTISELECT RENDERER (for flowers/extras multi-select)
// ========================================

function renderMultiSelect(sectionName, config) {
    const container = document.createElement('div');
    container.className = `multiselect-container multiselect-${sectionName}`;
    container.id = `${sectionName}-multiselect`;
    
    config.items.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = `multiselect-item multiselect-item-${sectionName}`;
        itemEl.setAttribute(`data-${sectionName}`, item.id);
        
        // Check if this item is currently selected
        const selectedItems = getSelectionValue(sectionName) || [];
        if (selectedItems.includes(item.id)) {
            itemEl.classList.add('selected');
        }
        
        // Image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label;
        img.className = `multiselect-image multiselect-image-${sectionName}-${item.id}`;
        itemEl.appendChild(img);
        
        // Info container
        const info = document.createElement('div');
        info.className = 'multiselect-info';
        
        // Label
        const label = document.createElement('span');
        label.className = 'multiselect-label';
        label.textContent = item.label;
        info.appendChild(label);
        
        // Price
        if (item.price) {
            const price = document.createElement('span');
            price.className = 'multiselect-price';
            price.textContent = item.price;
            info.appendChild(price);
        }
        
        itemEl.appendChild(info);
        
        // Click to toggle selection
        itemEl.addEventListener('click', () => {
            const isCurrentlySelected = itemEl.classList.contains('selected');
            itemEl.classList.toggle('selected');
            
            if (config.onSelect) {
                config.onSelect(item.id, !isCurrentlySelected, itemEl);
            }
            
            // Check if current step is now complete
            checkStepCompletion(state.currentStep);
        });
        
        container.appendChild(itemEl);
    });
    
    selectionContainer.appendChild(container);
}

// ========================================
// GRID RENDERER (for multiple items visible)
// ========================================

function renderGrid(sectionName, config, SELECTORS_CONFIG) {
    const container = document.createElement('div');
    container.className = 'selection-grid';
    container.id = `${sectionName}-grid`;
    
    config.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'grid-item';
        itemEl.setAttribute('data-value', item.id);
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label;
        itemEl.appendChild(img);
        
        itemEl.addEventListener('click', () => {
            container.querySelectorAll('.grid-item').forEach(i => i.classList.remove('selected'));
            itemEl.classList.add('selected');
            selectItem(sectionName, item.id, config, SELECTORS_CONFIG);
        });
        
        container.appendChild(itemEl);
    });
    
    selectionContainer.appendChild(container);
}

// ========================================
// SELECTION HELPERS
// ========================================

function selectItem(sectionName, value, config, SELECTORS_CONFIG, sourceElement = null) {
    // Update visual state
    const content = document.getElementById(`${sectionName}-carousel-content`);
    let selectedElement = sourceElement;
    
    if (content) {
        content.querySelectorAll('.carousel-item').forEach(item => {
            const isSelected = item.getAttribute(`data-${sectionName}`) === value;
            item.classList.toggle('selected', isSelected);
            if (isSelected && !selectedElement) {
                selectedElement = item;
            }
        });
    }
    
    // Call the onSelect handler with source element for animation
    if (config.onSelect) {
        config.onSelect(value, selectedElement);
    }
    
    // Check if current step is now complete
    checkStepCompletion(state.currentStep);
}
