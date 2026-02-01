// ========================================
// NAVIGATION BUTTONS MANAGEMENT
// Note: Requires config.js, state.js to be loaded first
// ========================================

// Reference to navigation button
let navBtnNext = null;

// ========================================
// SECTION REQUIREMENTS (per sub-step)
// ========================================

const SECTION_REQUIREMENTS = {
    // Step 1: Ring
    material: () => state.selections.ring.material !== null,
    
    // Step 2: Diamond
    stone: () => state.selections.diamond.stone !== null,
    source: () => state.selections.diamond.source !== null,
    carat: () => true, // Carat always has a default value
    packaging: () => state.selections.diamond.packaging !== null,
    
    // Step 3: Location
    location: () => state.selections.location !== null,
    
    // Step 4: Setup
    signs: () => state.selections.setup.signs !== null,
    flowers: () => state.selections.setup.flowers.length > 0,
    balloons: () => state.selections.setup.balloons !== null,
    extras: () => state.selections.setup.extras.length > 0,
    
    // Step 5: Music
    music: () => state.selections.music !== null
};

// ========================================
// INITIALIZATION
// ========================================

function initNavigation() {
    navBtnNext = document.getElementById('nav-btn-next');
    
    if (navBtnNext) {
        navBtnNext.addEventListener('click', navigateNext);
    }
    
    // Initial update
    updateNavButtons();
}

// ========================================
// NAVIGATION STATE UPDATE
// ========================================

function updateNavButtons() {
    if (!navBtnNext) return;
    
    const currentStep = state.currentStep;
    const currentSection = state.currentSection;
    const stepConfig = STEPS_CONFIG[currentStep];
    
    if (!stepConfig) {
        navBtnNext.disabled = true;
        return;
    }
    
    // === NEXT BUTTON ===
    // Enabled if the current section requirement is met
    const sectionRequirement = SECTION_REQUIREMENTS[currentSection];
    const isCurrentSectionComplete = sectionRequirement ? sectionRequirement() : false;
    navBtnNext.disabled = !isCurrentSectionComplete;
    
    // Check if we're on the last section of the last step (music)
    const sections = stepConfig.sections;
    const currentSectionIndex = sections.indexOf(currentSection);
    const isLastSectionOfLastStep = currentStep === TOTAL_STEPS && currentSectionIndex === sections.length - 1;
    
    // Update button text: "Confirm" on last step, "Next" otherwise
    const btnLabel = navBtnNext.querySelector('.nav-btn-label');
    if (btnLabel) {
        btnLabel.textContent = isLastSectionOfLastStep ? 'Submit' : 'Next';
    }
}

// ========================================
// NAVIGATION ACTIONS
// ========================================

function navigateNext() {
    const currentStep = state.currentStep;
    const currentSection = state.currentSection;
    const stepConfig = STEPS_CONFIG[currentStep];
    
    if (!stepConfig) return;
    
    const sections = stepConfig.sections;
    const currentSectionIndex = sections.indexOf(currentSection);
    
    if (currentSectionIndex < sections.length - 1) {
        // Navigate to next section within the same step
        const nextSection = sections[currentSectionIndex + 1];
        navigateToSection(currentStep, nextSection);
    } else if (currentStep < TOTAL_STEPS) {
        // Navigate to first section of the next step
        const nextStep = currentStep + 1;
        if (state.unlockedSteps.includes(nextStep)) {
            const nextStepConfig = STEPS_CONFIG[nextStep];
            const firstSection = nextStepConfig.sections[0];
            navigateToSection(nextStep, firstSection);
        }
    } else {
        // On the last section of the last step - open deadline popover
        // (cart and share modal should NOT be opened)
        
        // Stop music when confirming
        if (typeof stopMusicPlayback === 'function') {
            stopMusicPlayback();
        }
        
        if (typeof Deadline !== 'undefined' && typeof Deadline.openPopover === 'function') {
            Deadline.openPopover();
        }
    }
}

function navigateToSection(stepNumber, sectionName) {
    // Stop music if leaving the music step (step 5)
    if (state.currentStep === 5 && stepNumber !== 5) {
        if (typeof stopMusicPlayback === 'function') {
            stopMusicPlayback();
        }
    }
    
    // If we're changing steps, expand the new step
    if (stepNumber !== state.currentStep) {
        // Collapse all steps
        document.querySelectorAll('.menu-step.expanded').forEach(step => {
            step.classList.remove('expanded');
        });
        
        // Expand the target step
        const stepElement = document.querySelector(`.menu-step[data-step="${stepNumber}"]`);
        if (stepElement) {
            stepElement.classList.add('expanded');
        }
        
        state.currentStep = stepNumber;
        updateProgressBar();
    }
    
    // Collapse all sections in the step
    const stepContent = document.getElementById(`step-content-${stepNumber}`);
    if (stepContent) {
        stepContent.querySelectorAll('.menu-section').forEach(s => {
            s.classList.remove('expanded');
        });
    }
    
    // Expand the target section
    const sectionElement = document.querySelector(`.menu-section[data-section="${sectionName}"]`);
    if (sectionElement) {
        sectionElement.classList.add('expanded');
    }
    
    // Show the selector for this section
    // Note: showSelector is defined in renderers.js and needs SELECTORS_CONFIG
    // This will be called from configurator.js context
    if (typeof showSelectorFromNav === 'function') {
        showSelectorFromNav(sectionName);
    }
    
    // Animate sync heights during transition
    animateSyncProgressBarHeights();
    
    // Update nav button states
    updateNavButtons();
}
