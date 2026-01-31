// ========================================
// PROGRESS BAR MANAGEMENT
// Note: Requires config.js and state.js to be loaded first
// ========================================

function checkStepCompletion(stepNumber) {
    const requirement = STEP_REQUIREMENTS[stepNumber];
    if (requirement && requirement()) {
        if (!state.completedSteps.includes(stepNumber)) {
            completeStep(stepNumber);
        }
    }
}

function completeStep(stepNumber) {
    if (state.completedSteps.includes(stepNumber)) return;
    
    state.completedSteps.push(stepNumber);
    
    // Unlock next step
    const nextStep = stepNumber + 1;
    if (nextStep <= 6 && !state.unlockedSteps.includes(nextStep)) {
        state.unlockedSteps.push(nextStep);
        unlockStep(nextStep);
    }
    
    // Update progress bar UI
    updateProgressBar();
}

function updateProgressBar() {
    // Determine the active step: first unlocked step that is not completed
    let activeStepNumber = null;
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        if (state.unlockedSteps.includes(i) && !state.completedSteps.includes(i)) {
            activeStepNumber = i;
            break;
        }
    }
    
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        const progressStep = document.querySelector(`.progress-step[data-progress-step="${i}"]`);
        const menuStep = document.querySelector(`.menu-step[data-step="${i}"]`);
        
        if (!progressStep) continue;
        
        // Clear all state classes
        progressStep.classList.remove('active', 'completed', 'locked');
        
        if (state.completedSteps.includes(i)) {
            // Step is completed - black circle with checkmark
            progressStep.classList.add('completed');
            progressStep.innerHTML = `
                <div class="progress-header">
                    <div class="progress-circle">
                        <img src="${ASSETS.icons.check}" alt="Completed" class="progress-check-icon">
                    </div>
                </div>
            `;
        } else if (i === activeStepNumber) {
            // Active step (first unlocked, not completed) - black circle with dot and pulse animation
            progressStep.classList.add('active');
            progressStep.innerHTML = `
                <div class="progress-header">
                    <div class="progress-circle">
                        <img src="${ASSETS.icons.dot}" alt="Active" class="progress-dot-icon">
                    </div>
                </div>
            `;
        } else if (state.unlockedSteps.includes(i)) {
            // Unlocked but not active - black circle with dot (no animation)
            progressStep.innerHTML = `
                <div class="progress-header">
                    <div class="progress-circle">
                        <img src="${ASSETS.icons.dot}" alt="Unlocked" class="progress-dot-icon">
                    </div>
                </div>
            `;
        } else {
            // Locked - yellow circle with lock icon
            progressStep.classList.add('locked');
            progressStep.innerHTML = `
                <div class="progress-header">
                    <div class="progress-circle">
                        <img src="${ASSETS.icons.lock}" alt="Locked" class="progress-lock-icon">
                    </div>
                </div>
            `;
        }
    }
    
    // Sync progress step heights with menu step heights
    syncProgressBarHeights();
}

function syncProgressBarHeights() {
    const progressBar = document.querySelector('.progress-bar');
    const menu = document.querySelector('.configurator-menu');
    
    // Sync overall height
    if (progressBar && menu) {
        progressBar.style.height = `${menu.offsetHeight}px`;
    }
    
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        const progressStep = document.querySelector(`.progress-step[data-progress-step="${i}"]`);
        const menuStep = document.querySelector(`.menu-step[data-step="${i}"]`);
        
        if (progressStep && menuStep) {
            const menuStepHeight = menuStep.offsetHeight;
            progressStep.style.height = `${menuStepHeight}px`;
        }
    }
    
    // Update the continuous line height
    updateProgressBarLine();
}

function updateProgressBarLine() {
    const progressBarLine = document.getElementById('progress-bar-line');
    const firstStep = document.querySelector('.progress-step[data-progress-step="1"]');
    const lastStep = document.querySelector('.progress-step[data-progress-step="6"]');
    const firstCircle = document.querySelector('.progress-step[data-progress-step="1"] .progress-circle');
    
    if (progressBarLine && firstStep && lastStep && firstCircle) {
        // Get the padding-top of progress step (where circle starts)
        const paddingTop = parseFloat(getComputedStyle(firstStep).paddingTop) || 0;
        const circleHeight = firstCircle.offsetHeight;
        
        // Line starts at center of first circle
        const lineTop = firstStep.offsetTop + paddingTop + (circleHeight / 2);
        
        // Line ends at center of last circle
        const lineBottom = lastStep.offsetTop + paddingTop + (circleHeight / 2);
        
        const lineHeight = lineBottom - lineTop;
        
        progressBarLine.style.top = `${lineTop}px`;
        progressBarLine.style.height = `${lineHeight}px`;
    }
}

// Continuously sync heights during transitions
function animateSyncProgressBarHeights() {
    const startTime = performance.now();
    const duration = TRANSITION_DURATION;
    
    function tick() {
        syncProgressBarHeights();
        if (performance.now() - startTime < duration) {
            requestAnimationFrame(tick);
        }
    }
    
    requestAnimationFrame(tick);
}

function unlockStep(stepNumber) {
    const menuStep = document.querySelector(`.menu-step[data-step="${stepNumber}"]`);
    if (menuStep) {
        menuStep.classList.remove('disabled');
    }
}
