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
    --step-header-height: 60px;
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
