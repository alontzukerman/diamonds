// ========================================
// DEADLINE MODULE
// Handles deadline popover with calendar and share button
// ========================================

(function() {
    // DOM references
    let popoverOverlay = null;
    let dateInput = null;
    let calendarContainer = null;
    let shareBtn = null;
    let shareLinkBox = null;
    let shareLinkInput = null;
    let shareCopyBtn = null;
    
    // State
    let currentDate = new Date();
    let selectedDate = null;
    let isShareExpanded = false;

    /**
     * Initialize deadline functionality
     */
    function initDeadline() {
        popoverOverlay = document.getElementById('deadline-popover-overlay');
        dateInput = document.getElementById('deadline-popover-input');
        calendarContainer = document.getElementById('deadline-popover-calendar');
        shareBtn = document.getElementById('deadline-popover-share');

        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        selectedDate = tomorrow;
        
        if (dateInput) {
            // Set date value - input is disabled, selection only through calendar
            dateInput.value = formatDateForInput(tomorrow);
        }

        if (popoverOverlay) {
            popoverOverlay.addEventListener('click', (e) => {
                if (e.target === popoverOverlay) {
                    closePopover();
                }
            });
        }

        shareLinkBox = document.getElementById('deadline-share-link-box');
        shareLinkInput = document.getElementById('deadline-share-link');
        shareCopyBtn = document.getElementById('deadline-share-copy');

        if (shareBtn) {
            shareBtn.addEventListener('click', handleShareClick);
        }

        if (shareCopyBtn) {
            shareCopyBtn.addEventListener('click', handleCopyClick);
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isPopoverOpen()) {
                closePopover();
            }
        });

        // Render initial calendar
        renderCalendar();
    }

    /**
     * Format date for display (MM/DD/YYYY)
     */
    function formatDateForDisplay(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    /**
     * Format date for input value (YYYY-MM-DD) without timezone issues
     */
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Render the calendar
     */
    function renderCalendar() {
        if (!calendarContainer) return;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Get first and last day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Build calendar HTML
        let html = `
            <div class="calendar-header">
                <button class="calendar-nav calendar-prev" type="button">&larr;</button>
                <span class="calendar-month-year">${getMonthName(month)} ${year}</span>
                <button class="calendar-nav calendar-next" type="button">&rarr;</button>
            </div>
            <div class="calendar-weekdays">
                <span>Sa</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>
            <div class="calendar-days">
        `;

        // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
        let startDay = firstDay.getDay();
        
        // Today for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Always render 6 rows (42 cells) to prevent height jumping
        const totalCells = 42;
        let cellCount = 0;
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startDay; i++) {
            html += '<span class="calendar-day empty"></span>';
            cellCount++;
        }
        
        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const isPast = date < today;
            const isSelected = selectedDate && 
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
            
            let classes = 'calendar-day';
            if (isPast) classes += ' disabled';
            if (isSelected) classes += ' selected';
            
            html += `<span class="${classes}" data-day="${day}" ${isPast ? '' : 'tabindex="0"'}>${day}</span>`;
            cellCount++;
        }
        
        // Add empty cells to fill remaining space (always 6 rows)
        while (cellCount < totalCells) {
            html += '<span class="calendar-day empty"></span>';
            cellCount++;
        }

        html += '</div>';
        calendarContainer.innerHTML = html;

        // Add event listeners
        const prevBtn = calendarContainer.querySelector('.calendar-prev');
        const nextBtn = calendarContainer.querySelector('.calendar-next');
        const dayElements = calendarContainer.querySelectorAll('.calendar-day:not(.empty):not(.disabled)');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
        }

        dayElements.forEach(dayEl => {
            dayEl.addEventListener('click', () => {
                const day = parseInt(dayEl.dataset.day);
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                
                // Update the date input display
                if (dateInput) {
                    dateInput.value = formatDateForInput(selectedDate);
                }
                
                renderCalendar();
            });
        });
    }

    /**
     * Get month name
     */
    function getMonthName(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month];
    }

    /**
     * Handle share button click - expand to show link and copy
     */
    function handleShareClick() {
        if (!shareBtn || !shareLinkBox || !shareLinkInput) return;

        // Generate the share link
        let shareLink;
        try {
            shareLink = typeof Checkout !== 'undefined' && typeof Checkout.generateShareLink === 'function'
                ? Checkout.generateShareLink()
                : window.location.href;
        } catch (e) {
            console.error('Error generating share link:', e);
            shareLink = window.location.href;
        }

        // Set the link value
        shareLinkInput.value = shareLink;

        // Hide share button, show link box
        shareBtn.style.display = 'none';
        shareLinkBox.style.display = 'flex';
        isShareExpanded = true;

        // Select the link text
        setTimeout(() => {
            shareLinkInput.select();
        }, 100);
    }

    /**
     * Handle copy button click
     */
    function handleCopyClick() {
        if (!shareLinkInput || !shareCopyBtn) return;

        shareLinkInput.select();
        navigator.clipboard.writeText(shareLinkInput.value).then(() => {
            // Visual feedback
            const originalText = shareCopyBtn.textContent;
            shareCopyBtn.textContent = 'Copied!';
            setTimeout(() => {
                shareCopyBtn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            document.execCommand('copy');
        });
    }

    /**
     * Reset share UI to initial state
     */
    function resetShareUI() {
        if (shareBtn) shareBtn.style.display = '';
        if (shareLinkBox) shareLinkBox.style.display = 'none';
        isShareExpanded = false;
    }

    /**
     * Open the deadline popover
     */
    function openPopover() {
        if (!popoverOverlay) return;

        // Make sure cart is closed
        if (typeof closeCart === 'function') {
            closeCart();
        }

        // Make sure share modal is closed
        if (typeof Checkout !== 'undefined' && typeof Checkout.closeModal === 'function') {
            Checkout.closeModal();
        }

        // Reset share UI to initial state
        resetShareUI();

        popoverOverlay.classList.add('open');
        renderCalendar();
    }

    /**
     * Close the deadline popover
     */
    function closePopover() {
        if (popoverOverlay) {
            popoverOverlay.classList.remove('open');
        }
        // Reset share UI when closing
        resetShareUI();
    }

    /**
     * Check if popover is open
     * @returns {boolean}
     */
    function isPopoverOpen() {
        return popoverOverlay && popoverOverlay.classList.contains('open');
    }

    /**
     * Get the selected deadline date
     * @returns {Date|null}
     */
    function getSelectedDate() {
        return selectedDate;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDeadline);
    } else {
        initDeadline();
    }

    // Expose for external use
    window.Deadline = {
        openPopover: openPopover,
        closePopover: closePopover,
        getSelectedDate: getSelectedDate
    };
})();
