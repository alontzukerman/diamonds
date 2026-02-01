# Pages

## 1. Gallery/Index Page (`gallery.html`)

A grid gallery showcasing curated proposal package examples.

### Layout & Structure

**Container:**
- Full viewport with scrollable content
- Fixed background image (doesn't scroll with content)
- 3-column grid layout with 30px gap
- Padding: 140px top (navbar clearance), 50px sides, 80px bottom
- Max-width: 1800px, centered

**Gallery Cards:**
- Aspect ratio: 2100/1160 (wide landscape)
- Border-radius: 20px
- Location image as background (cover, centered)
- Box shadow with hover enhancement
- Hover: translateY(-8px) scale(1.02) with enhanced shadow

**Card Display:**
- Scaled down (0.25) version of configurator display
- Shows ring, stone, packaging, sign, flowers, balloons, extras
- Same positioning classes as configurator display

**Card Info (below card):**
- Flexbox row with space-between
- Location name on left, price on right
- Typography: Narkiss Block TRIAL 18px (title), IBM Plex Serif 16px (price)

### Features

- **11 curated examples** with creative combinations
- **Audio on hover**: Each card has a song that plays when hovered
- Each example includes: material, stone, carat, packaging, location, sign, flowers, balloon, extras, and song

### Navigation
- Navbar "Index" link points to this page
- Cards link to configurator with pre-filled state (future enhancement)

---

## 2. Landing Page (`index.html`)

- Navbar with logo on left, navigation buttons on right (Index, About, Cart icon)
- Navbar buttons styled with yellow background, 2px border, pill shape (200px border-radius)
- Cart uses `cart.svg` icon instead of text
- Scrolling marquee banner with romantic messages
- Large title "Diamonds Are Forever" with custom fonts
- Decorative GIF animations (flowers, bird, cupid, diamond)
- "Start" button with infinite bounce animation on hover

---

## 2. Configurator Page (`configurator.html`)

- Fixed overlay layout with margins (left: 40px, right: 40px, bottom: 40px)
- Three-column flexbox layout:
  - **Left Column:** Menu wrapper (progress bar + accordion menu)
  - **Center Column:** Vertical flex container with:
    - Display area (top) - shows selected items (ring, stone, packaging)
    - Selection container (bottom) - dynamically rendered selectors
  - **Right Column:** Love meter gauge that fills as selections are made

---

## 3. About Overlay

A full-screen overlay accessible from the navbar "About" button.

### Layout & Structure

**Container:**
- Fixed position, full viewport (100vw x 100vh)
- Background: #FFD2F6 (pink)
- Z-index: 1000
- Pop-in/pop-out animation (scale transform, 0.2s ease-out)

**Close Button:**
- Position: absolute, top-right (30px, 40px)
- Uses `about-x.svg` icon
- Hover: opacity 0.7

**Content:**
- Flex column layout, justify: flex-start
- Padding: 65px
- Main text about the platform with manual line breaks

**Content Typography:**
- Main text: Narkiss Block TRIAL, 80px, weight 400, line-height 115%, color #FF0000
- "forever" word: Sloop Script Three, 105px, weight 700, line-height 50%, margin: 0 5px 0 -5px

**Footer:**
- No border (divider removed)
- Padding: 0 65px 65px
- Three columns with gap: 130px
- Columns: Terms of Service, Privacy, Contact Us

**Footer Typography:**
- Title: Narkiss Yair TRIAL, 24px, weight 700, line-height 160%, color #FF0000
- Links/Description: Narkiss Yair TRIAL, 24px, weight 400, line-height 117%, underlined, color #FF0000
- Gap between title and links: 10px

**Contact Us Column:**
- Email link: Standard link style + red arrow icon (`red-arrow.svg`)
- Copyright line: Title style (bold 700) with underline

### Interactions

- **Open:** Click "About" button in navbar
- **Close:** Click X button or press Escape key

---

## 4. Checkout Page (`checkout.html`)

A receipt-style checkout page for reviewing and paying for cart items.

### Layout & Structure

**Container:**
- Centered on page with fixed background image
- Scrollable page content (background stays fixed)
- Padding: 60px 20px

**Receipt Card:**
- Max-width: 530px
- Background: #F5F5F5
- Box-shadow: 20px 20px 26px 0px #00000040
- Torn paper edge effect (top and bottom)

**Receipt Title:**
- Font: Sloop Script Three, 160px, weight 500
- Color: #FF0000
- Centered

**Order Info:**
- Date and Order No. rows
- Font: Narkiss Yair TRIAL, 25px
- Color: #282323
- Red dashed dividers below

**Items List:**
- Item name (left) and price with $ (right)
- Font: Narkiss Yair TRIAL, 25px, line-height 120%
- Sub-items (size, carat, source): 18px, 70% opacity, indented

**Total:**
- Label: Narkiss Yair TRIAL, 32px, weight 400
- Price: Narkiss Yair TRIAL, 32px, weight 700
- Color: #282323

**Countdown Timer:**
- Font: Sloop Script Three, 130px, letter-spacing 4%
- Color: #FF0000
- Labels: Narkiss Yair TRIAL, 25px, #282323
- Counts down from 14 days

**Pay Button:**
- Font: Sloop Script Three, 32px, weight 700
- Border: 3px solid #FF0000
- Pill shape (border-radius: 50px)
- Hover: Red background, light text

**Barcode:**
- Image: `assets/ui/barcode.png`
- Positioned absolute at bottom of receipt

**Heart Decoration:**
- `assets/decorations/heart.gif`
- Positioned bottom-right of receipt card

### Payment Modal

Opens when clicking Pay button.

- Overlay: 30% black opacity
- Modal: Pink background (#FFD2F6), rounded corners
- Fields: Card number, Expiry date, CVV
- Inputs: Red border, Narkiss Yair TRIAL font
- Close: Click outside or press Escape

### Cart Data

- Cart items are encoded in URL as base64 JSON
- Generated via share link from configurator cart
- URL format: `checkout.html?cart={base64_encoded_data}`

---

## Navbar Layout

- **Left side:** Logo (`navbar-logo.svg`, 390px width)
- **Right side:** Three buttons - "Index", "About", Cart icon
  - Yellow background (#F2E772), 2px solid border (#282323)
  - Border-radius: 200px (pill shape)
  - Font: Narkiss Yair TRIAL, 25px, weight 400
  - Gap between buttons: 50px
  - Hover: Bounce animation
  - Cart button uses `cart.svg` icon (35x35px)
- Padding: 30px 50px 30px 40px
- Both pages share identical navbar structure and styles
