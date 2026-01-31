// Custom Cursor Follower
(function() {
    // Create cursor element
    const cursor = document.createElement('img');
    cursor.src = 'assets/ui/cursor.png';
    cursor.alt = '';
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    // Inject a style to hide cursor on ALL elements
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after, html, body {
            cursor: none !important;
        }
    `;
    document.head.appendChild(style);

    // Also set cursor:none on body directly
    document.body.style.setProperty('cursor', 'none', 'important');
    document.documentElement.style.setProperty('cursor', 'none', 'important');

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Force hide cursor on the element under mouse
        if (e.target && e.target.style) {
            e.target.style.setProperty('cursor', 'none', 'important');
        }
    });

    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.remove('hidden');
    });
})();
