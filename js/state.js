// ========================================
// STATE MANAGEMENT
// Note: Requires config.js to be loaded first
// ========================================

const state = {
    currentStep: 1,
    currentSection: 'material',
    completedSteps: [], // Track which steps are completed
    unlockedSteps: [1], // Track which steps are unlocked (start with step 1)
    selections: {
        ring: {
            material: null
        },
        diamond: {
            stone: null,
            carat: 0.5,
            source: null,
            packaging: null
        },
        location: null,
        setup: {
            signs: null,
            flowers: [],
            balloons: null,
            extras: []
        },
        music: null,
        deadline: null
    },
    loveLevel: 0,  // Percentage (0-100) based on cart total
    carouselIndices: {} // Track carousel position for each section
};

// ========================================
// STEP COMPLETION REQUIREMENTS
// ========================================

const STEP_REQUIREMENTS = {
    1: () => state.selections.ring.material !== null,
    2: () => state.selections.diamond.stone !== null && 
             state.selections.diamond.source !== null && 
             state.selections.diamond.packaging !== null,
    3: () => state.selections.location !== null,
    4: () => state.selections.setup.signs !== null &&
             state.selections.setup.flowers.length > 0 &&
             state.selections.setup.balloons !== null &&
             state.selections.setup.extras.length > 0,
    5: () => state.selections.music !== null,
    6: () => state.selections.deadline !== null
};

// ========================================
// SELECTION VALUE GETTER
// ========================================

function getSelectionValue(sectionName) {
    switch (sectionName) {
        case 'material': return state.selections.ring.material;
        case 'stone': return state.selections.diamond.stone;
        case 'carat': return state.selections.diamond.carat;
        case 'source': return state.selections.diamond.source;
        case 'packaging': return state.selections.diamond.packaging;
        case 'location': return state.selections.location;
        case 'signs': return state.selections.setup.signs;
        case 'flowers': return state.selections.setup.flowers;
        case 'balloons': return state.selections.setup.balloons;
        case 'extras': return state.selections.setup.extras;
        case 'music': return state.selections.music;
        case 'deadline': return state.selections.deadline;
        default: return null;
    }
}
