# JavaScript Architecture

## Technical Notes

- Pure HTML/CSS/JS (no frameworks)
- CSS custom properties for theming
- Flexbox for layouts
- CSS animations for banner scroll
- Event delegation for accordion menu
- Custom cursor implemented via JavaScript (image follows mouse pointer)
- Progress bar height sync using `requestAnimationFrame` for smooth animations
- Menu width: 250px (configurable via CSS)
- Menu wrapper uses `flex-end` alignment (menu grows upward)
- **Three-column layout:** Left (menu), Center (display + selector), Right (love meter)
- Center column uses vertical flexbox: display area (flex: 1) + selection container (flex-shrink: 0)

---

## JavaScript Modules

The configurator JavaScript is split into modular files for maintainability:

| Module | File | Description |
|--------|------|-------------|
| **Config** | `js/config.js` | Constants, data arrays, asset paths |
| **Cart** | `js/cart.js` | Cart utility (add, remove, calculate) |
| **State** | `js/state.js` | Application state, step requirements |
| **Progress** | `js/progress.js` | Progress bar updates, step completion |
| **Love Meter** | `js/love-meter.js` | Point calculations, heart position |
| **Display** | `js/display.js` | Display area updates (ring, stone, packaging in floating core; signs, flowers, balloons, extras) |
| **Cart Helpers** | `js/cart-helpers.js` | Ring/stone cart item builders |
| **Cart UI** | `js/cart-ui.js` | Cart sidepanel rendering, animations |
| **Renderers** | `js/renderers.js` | Selector renderers (carousel, buttons, etc.) |
| **Main** | `configurator.js` | Orchestrator, event handlers, initialization |

---

## CSS Modules

The configurator CSS is split into modular files:

| Module | File | Description |
|--------|------|-------------|
| **Layout** | `css/layout.css` | Three-column layout, love meter |
| **Progress Bar** | `css/progress-bar.css` | Progress bar styles |
| **Menu** | `css/menu.css` | Accordion menu styles |
| **Display** | `css/display.css` | Ring, stone, packaging, flowers, balloons, extras (with floating animation) |
| **Selectors** | `css/selectors.css` | Carousel, buttons, slider, multiselect |
| **Cart** | `css/cart.css` | Cart sidepanel styles |

---

## Configuration Module (`js/config.js`)

| Constant | Description |
|----------|-------------|
| `TOTAL_STEPS` | Number of configurator steps (6) |
| `STEP_HEADER_HEIGHT` | Height of step headers (60px) |
| `TRANSITION_DURATION` | CSS transition timing (350ms) |
| `LOVE_METER_MAX_HEIGHT` | Love meter gauge height (700px) |
| `LOVE_METER_BASE_POSITION` | Base position offset (180px) |
| `STEPS_CONFIG` | Step definitions |
| `POINTS_CONFIG` | Love meter point values |
| `STONE_NAMES` | Array of 20 stone names for the stone carousel |
| `SIGNS` | Array of 6 sign objects with name and price |
| `FLOWERS` | Array of 8 flower objects with name and price |
| `BALLOONS` | Array of 6 balloon objects with name and price |
| `EXTRAS` | Array of 8 extra objects with name and price |
| `PACKAGING` | Array of 7 packaging objects with name and price |
| `LOCATIONS` | Array of 15 location objects with name, image, and premium status |
| `ASSETS` | Centralized asset paths |

---

## Main Orchestrator (`configurator.js`)

| Component | Description |
|-----------|-------------|
| `SELECTORS_CONFIG` | Selector definitions with callbacks |
| Accordion menu handlers | Step/section toggle logic |
| Keyboard navigation | Arrow keys, Enter, Escape |
| Initialization | Calls init functions from modules |

---

## Modular Selector System

The configurator uses a modular, config-driven system for all selectors.

### Configuration Objects

**`STEPS_CONFIG`** - Defines each step:
```javascript
1: {
    name: 'The Ring',
    sections: ['material', 'size'],
    defaultSection: 'material'
}
```

**`SELECTORS_CONFIG`** - Defines each selector:
```javascript
material: {
    type: 'carousel',  // 'carousel' | 'buttons' | 'slider' | 'grid' | 'multiselect'
    items: [
        { id: 'gold', label: 'Gold', price: '[From $400]', image: 'assets/gold.png', premium: true },
        { id: 'silver', label: 'Silver', price: '[From $80]', image: 'assets/silver.png' }
    ],
    onSelect: (value) => { /* update state */ }
}
```

**`STEP_REQUIREMENTS`** - Defines completion requirements for each step:
```javascript
1: () => state.selections.ring.material !== null && state.selections.ring.size !== null,
2: () => state.selections.diamond.stone !== null && 
         state.selections.diamond.source !== null && 
         state.selections.diamond.packaging !== null,
// etc.
```

---

## Adding a New Section

1. Add asset path to `js/config.js`:
```javascript
const ASSETS = {
    // ... existing paths ...
    newItems: (id) => `assets/new-items/n${id}.png`
};
```

2. Add data array to `js/config.js`:
```javascript
const NEW_ITEMS = [
    { name: 'Item 1', priceDisplay: '[$100]', price: 100 },
    // ...
];
```

3. Add to `SELECTORS_CONFIG` in `configurator.js`:
```javascript
newSection: {
    type: 'carousel',
    items: NEW_ITEMS.map((item, i) => ({
        id: String(i + 1),
        label: item.name,
        price: item.priceDisplay,
        image: ASSETS.newItems(i + 1)
    })),
    onSelect: (value, sourceElement) => {
        state.selections.newCategory = value;
        updateLoveMeter();
        // Add to cart, update display, etc.
    }
}
```

4. Add HTML section with `data-section` attribute:
```html
<div class="menu-section" data-section="newSection">
    <div class="menu-section-header">
        <span class="menu-section-title clickable">New Section</span>
    </div>
    <div class="menu-section-content">
        <p class="menu-description">Description text...</p>
    </div>
</div>
```

5. (Optional) Add points to `POINTS_CONFIG`

---

## State Structure

```javascript
const state = {
    currentStep: 1,
    currentSection: 'material',
    completedSteps: [],
    unlockedSteps: [1],
    selections: {
        ring: { material: null, size: null },
        diamond: { stone: null, carat: 0.5, source: null, packaging: null },
        location: null,
        setup: { signs: null, flowers: [], balloons: null, extras: [] },
        music: null,
        deadline: null
    },
    lovePoints: START_POINTS,
    loveLevel: 0,
    carouselIndices: {}
};
```

---

## File Dependencies

Load order in HTML (order matters):
1. `cursor.js` - Custom cursor
2. `js/about.js` - About overlay functionality
3. `js/config.js` - Configuration constants
4. `js/cart.js` - Cart utility module
5. `js/state.js` - State management
6. `js/progress.js` - Progress bar management
7. `js/love-meter.js` - Love meter calculations
8. `js/display.js` - Display area updates
9. `js/cart-helpers.js` - Cart helper functions
10. `js/cart-ui.js` - Cart UI rendering
11. `js/renderers.js` - Selector renderers
12. `configurator.js` - Main orchestrator
