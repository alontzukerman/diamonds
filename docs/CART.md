# Cart Sidepanel

A slide-in cart panel accessible from the navbar cart icon.

## Layout & Structure

### Container
- Fixed position overlay from top to bottom, right side
- Width: 430px
- Slides in from right to left with 0.3s transition
- Border-left: 2px solid #FF0000
- Background: #FFD2F6 (pink)
- Z-index: 999 (above everything)

### Overlay
- Semi-transparent dark backdrop (rgba(0, 0, 0, 0.5))
- Covers entire page when cart is open
- Clicking overlay closes cart
- Z-index: 998

### Header
- Title "Cart" on left, close button (X) on right
- Title: Narkiss Block TRIAL, 70px, weight 400, color #FF0000
- Close button uses `cart-x.svg` icon
- Divider below header: 2px solid #FF0000
- Padding: 20px

### Content (Scrollable)
- List of cart items with overflow-y: auto
- Padding: 30px
- Gap between items: 30px

### Cart Item
- Horizontal layout with 25px gap
- **Image container:**
  - Fixed size: 125px width x 163px height
  - Border: 1px solid #FF0000
  - Border-radius: 26px
  - Image inside uses object-fit: contain (cover for locations)
  - Premium items show red star icon on top-right corner
- **Details (right side):**
  - Vertical layout with space-between
  - Info box (top): Name, optional subtitle (size/carat), and Price stacked
  - Delete button (bottom) with thin underline
  - All text: Narkiss Yair TRIAL, 20px, weight 400, color #FF0000

### Footer
- Fixed at bottom
- "Total" label (left) and price (right) with space-between
- Total label: Narkiss Yair TRIAL, 32px, weight 400, color #FF0000
- Price: Narkiss Yair TRIAL, 32px, weight 700, color #FF0000
- Padding: 20px

---

## Cart Logic

### Cart Utility Module (`js/cart.js`)
- Generic cart management with add, remove, update operations
- `setItem()` for single-select categories (replaces existing item)
- `addItem()`/`removeItem()` for multi-select categories
- `calculateCaratPrice()` - Linear interpolation: 0.5ct=$500, 4ct=$6000
- Callbacks for UI updates and flying animation

### Combined Cart Items
- **Ring:** Material-based item
  - Name: "Gold Ring" or "Silver Ring"
  - Price: $400 (gold) or $80 (silver)
  - Image: gold-ring.png or silver-ring.png
  - Premium: Gold is premium
- **Stone:** Stone + Carat combined into one item
  - Name: Stone name
  - Subtitle: "{carat} ct"
  - Price: Calculated from carat
  - Image: Stone image
- **Source:** Separate item
  - Premium: Natural is premium
- **Location:** Separate item
  - Image: Location background (object-fit: cover)
  - Premium: Based on location data

### Price Configuration
- Material: Gold $400, Silver $80
- Carat: $500 (0.5ct) to $6000 (4ct) linear interpolation
- Source: Lab $1000, Natural $4000
- Location: $1000 (all locations)
- Signs, Flowers, Packaging: Individual prices in config

---

## Interactions

- **Open:** Click cart icon in navbar
- **Close:** Click X button, click overlay, or press Escape key
- **Flying animation:** Items animate from source element to cart button
  - Duration: 1 second with ease-in-out timing
  - Size: 120x120px flying element
  - Scales down to 0.4 and fades out as it reaches destination
- **Delete item:** Click "Delete" button (placeholder - functionality pending)

---

## Files

- `configurator.html` - Cart sidepanel HTML structure
- `configurator.css` - Cart sidepanel styles
- `configurator.js` - Cart integration with selectors, UI rendering
- `js/cart.js` - Cart utility module
- `js/config.js` - Price data for all items
- `common.css` - Added Narkiss Block TRIAL font-face

### Assets
- `assets/icons/cart-x.svg` - Close button icon for cart
