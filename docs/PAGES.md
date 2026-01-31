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
