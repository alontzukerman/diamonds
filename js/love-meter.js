// ========================================
// LOVE METER
// Note: Requires config.js and state.js to be loaded first
// ========================================

function calculateLovePoints() {
    let points = START_POINTS;
    
    // Ring points
    const material = state.selections.ring.material;
    if (material && POINTS_CONFIG.ring.material[material]) {
        points += POINTS_CONFIG.ring.material[material];
    }
    
    // Diamond points
    if (state.selections.diamond.stone) {
        points += POINTS_CONFIG.diamond.stone;
    }
    
    if (state.selections.diamond.carat > 0.5) {
        points += Math.floor(state.selections.diamond.carat * POINTS_CONFIG.diamond.caratPerUnit);
    }
    
    const source = state.selections.diamond.source;
    if (source && POINTS_CONFIG.diamond.source[source]) {
        points += POINTS_CONFIG.diamond.source[source];
    }
    
    if (state.selections.diamond.packaging) {
        points += POINTS_CONFIG.diamond.packaging;
    }
    
    return points;
}

function updateLoveMeter() {
    state.lovePoints = calculateLovePoints();
    
    const additionalPoints = state.lovePoints - START_POINTS;
    const maxAdditionalPoints = MAX_LOVE_POINTS - START_POINTS;
    
    state.loveLevel = Math.min((additionalPoints / maxAdditionalPoints) * 100, 100);
    
    const loveMeterHeart = document.getElementById('love-meter-heart');
    if (loveMeterHeart) {
        const heartPosition = (state.loveLevel / 100) * LOVE_METER_MAX_HEIGHT + LOVE_METER_BASE_POSITION;
        loveMeterHeart.style.bottom = `${heartPosition}px`;
    }
}
