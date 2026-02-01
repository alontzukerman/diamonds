# Styling Guide

## Fonts Used

- **Sloop Script Three** (Adobe Fonts) - "Are" in title, Premium labels
- **Narkiss Block Condensed** - "Diamonds" and "Forever" in title, banner
- **Narkiss Block TRIAL** - Cart title, Navbar links (Index, About)
- **Narkiss Yair TRIAL** - Step headers, section titles, material info, size buttons, cart item details
- **IBM Plex Serif** - Body text, descriptions

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Yellow | `#F2E772` | Primary accent, buttons, menu background |
| Black | `#000000` | Text, main borders (4px) |
| Dark Gray | `#282323` | Size buttons, dividers, thin borders |
| White | `#FFFFFF` | Text on dark backgrounds |
| Red | `#FF0000` | Love meter, Premium labels, Cart sidepanel accents |
| Pink | `#FFD2F6` | Cart sidepanel background |

---

## CSS Variables

```css
:root {
    --step-header-height: 5.17cqh;  /* 60px at 1160px height */
    --yellow: #F2E772;
    --black: #000000;
}
```

---

## Common Patterns

### Navbar Links (Index, About)
- Font: Narkiss Block TRIAL, 25px, weight 600 (Semibold)
- Color: `#282323`
- No background, border, or padding
- Hover: Bounce animation

### Navbar Cart Icon
- Uses `assets/icons/cart.svg` directly (no button wrapper)
- Size: 46×39px
- Hover: Bounce animation

### Button Style (Selection)
- Background: `#F2E772`
- Border: 2px solid `#282323`
- Border-radius: 200px (pill shape)
- Font: Narkiss Yair TRIAL, 25px, weight 400
- Hover: Bounce animation

### Selected State
- Filter: `drop-shadow(0 0 12px rgba(255, 255, 255, 0.95))`
- Background: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)`

### Premium Indicator
- Red star icon (`red-star.svg`)
- Positioned absolutely, top-right of element

---

## Animations

### Pulse (Active Progress Step)
```css
@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
    70% { box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
}
```

### Ring Drop
```css
@keyframes ringDrop {
    0% { opacity: 0; transform: translateY(-30px); }
    60% { opacity: 1; transform: translateY(4px); }
    100% { opacity: 1; transform: translateY(0); }
}
```

### Fade In/Out (Flowers, Extras, Balloons)
```css
@keyframes flowerFadeIn {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
}
```

### Carousel Slide
```css
@keyframes slideInLeft {
    0% { transform: translateX(-15px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
}
```

---

## Responsive Scaling (All Pages)

All pages use a **fixed aspect ratio container** (2100:1160) to maintain consistent layout across all screen sizes.

### How It Works

1. **`.page-scene` container** (defined in `common.css`):
   - Maintains exact 2100:1160 aspect ratio
   - Centers itself in the viewport
   - Scales to fill available space while preserving proportions
   - Uses CSS Container Queries (`container-type: size`)

2. **All child elements** use container-relative units:
   - Navbar, banner, menu, display, selectors all scale proportionally
   - Positions remain consistent regardless of screen size

### Container Query Units

| Unit | Meaning | Example |
|------|---------|---------|
| `cqw` | % of container width | `21.43cqw` = 450px at 2100px width |
| `cqh` | % of container height | `8.62cqh` = 100px at 1160px height |

### Conversion Formulas

```
cqw value = (pixel value / 2100) × 100
cqh value = (pixel value / 1160) × 100
```

### Page-Specific Notes

| Page | Container | Notes |
|------|-----------|-------|
| Landing (`index.html`) | `.page-scene` | Fixed viewport, all elements inside |
| Configurator (`configurator.html`) | `.page-scene` | Fixed viewport, navbar + layout inside |
| Checkout (`checkout.html`) | `.page-scene` | Fixed viewport, receipt card inside |
| Gallery (`gallery.html`) | Scrollable | Uses `vw`/`vh` units; cards use container queries internally |
| Cart Sidepanel | Outside `.page-scene` | Uses `vw`/`vh` units for viewport-relative scaling |
| About Overlay | Outside `.page-scene` | Uses `vw`/`vh` units for viewport-relative scaling |
| Payment Modal | Outside `.page-scene` | Uses `vw`/`vh` units for viewport-relative scaling |

### Files Converted

All CSS files now use responsive units:
- `common.css` - `.page-scene` container, navbar, banner
- `landing.css` - Landing page elements
- `css/layout.css` - Configurator three-column layout
- `css/menu.css` - Accordion menu
- `css/progress-bar.css` - Step progress indicator
- `css/display.css` - Ring display, flowers, balloons, extras
- `css/selectors.css` - Carousel, buttons, sliders, grids
- `css/cart.css` - Cart sidepanel (uses vw/vh)
- `css/checkout.css` - Checkout receipt page
- `gallery.css` - Gallery list (uses vw/vh + container queries on cards)

---

## Z-Index Layers

| Element | Z-index |
|---------|---------|
| Signs | -1 |
| Packaging | 0 |
| Ring | 1 |
| Stone | 2 |
| Cart Overlay | 998 |
| Cart Sidepanel | 999 |
| About Overlay | 1000 |
| Flying Cart Item | 10000 |
| Custom Cursor | 99999 |

---

## Custom Cursor

The site uses a custom cursor image (`assets/ui/cursor.png`) that follows the mouse. The system cursor is hidden using JavaScript injection in `cursor.js`:

- Injects a `<style>` tag with `cursor: none !important` for all elements
- Sets `cursor: none` directly on `body` and `html` via JavaScript
- On every mouse move, forces `cursor: none` on the element currently under the mouse
- Custom cursor image positioned at mouse coordinates with CSS transform offset
