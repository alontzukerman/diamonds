# Love Meter

## Overview

- Vertical gauge with arrow on the right side of the configurator
- Heart icon that moves up and scales based on cart total price
- Real-time price display floating to the left of the heart
- Checkpoint popovers with SVG images at specific price thresholds

---

## Price-Based Positioning

The heart position and scale are calculated as a percentage of the price range:

```
loveLevel = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100
```

### Configuration

Located in `js/config.js`:

```javascript
const LOVE_METER_CONFIG = {
    minPrice: 0,        // Price at bottom of meter (0%)
    maxPrice: 32239,    // Price at top of meter (100%)
    minScale: 1.0,      // Heart scale at 0%
    maxScale: 1.4,      // Heart scale at 100%
    
    // Checkpoints with SVG images (positions in cqh units)
    checkpoints: [
        { offset: 7.76, bottom: 19.83, image: 'assets/texts/pop-t1.svg' },   // 230px
        { offset: 19.83, bottom: 31.90, image: 'assets/texts/pop-t2.svg' },  // 370px
        { offset: 31.90, bottom: 43.97, image: 'assets/texts/pop-t3.svg' },  // 510px
        { offset: 43.96, bottom: 56.03, image: 'assets/texts/pop-t4.svg' },  // 650px
        { offset: 56.03, bottom: 68.10, image: 'assets/texts/pop-t5.svg' }   // 790px
    ]
};
```

### Position Constants

```javascript
const LOVE_METER_MAX_HEIGHT = 56.90;      // Travel distance in cqh (660px range)
const LOVE_METER_BASE_POSITION = 12.07;   // Starting position in cqh (140px)
// Max position = 12.07 + 56.90 = 68.97cqh (800px)
```

---

## Visual Behavior

- Heart icon moves vertically based on cart total
- Heart scales from 1.0x to 1.4x as price increases
- Position formula: `(loveLevel / 100) * 56.90 + 12.07` cqh from bottom
- Smooth transitions (0.5s ease)
- Next button positioned below the love meter

---

## Price Display

- Real-time price shown to the left of the heart icon
- Wrapped in brackets: `[$1,234]`
- Font: Narkiss Yair TRIAL, 25px, weight 400
- Color: #282323 with white glow effect

---

## Checkpoint Popovers

When the heart crosses a checkpoint position (going up), an SVG image pops up in the center of the screen.

### Animation
- **Fade in**: Scale 0.3 → 1.0 with bouncy cubic-bezier, 0.4s
- **Static display**: 1000ms
- **Fade out**: Scale 1.0 → 0.3, 0.25s

### Behavior
- Checkpoints only trigger when crossing upward
- Checkpoints reset when heart goes back below (can trigger again)
- Popovers render inside `.configurator-center` for proper alignment
- Positioned at `top: 370px` to align with display-ring-container

---

## Key Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `calculateLoveLevel()` | `js/love-meter.js` | Calculate percentage based on cart total |
| `updateLoveMeter()` | `js/love-meter.js` | Update heart position, scale, and price |
| `checkCheckpoints()` | `js/love-meter.js` | Detect checkpoint crossings |
| `showCheckpointPopover()` | `js/love-meter.js` | Display popover with SVG image |
| `updateLoveMeterPrice()` | `js/love-meter.js` | Update price text from Cart total |
| `initLoveMeterPrice()` | `js/love-meter.js` | Create price element in DOM |
| `resetCheckpoints()` | `js/love-meter.js` | Clear triggered checkpoints |

---

## Integration

The love meter updates via the Cart's `onUpdate` callback:
1. User makes selection
2. Cart is updated
3. `renderCartItems()` is called
4. `updateLoveMeter()` is called
5. Heart position, scale, price, and checkpoints update
