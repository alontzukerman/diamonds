# Step Implementation Details

## Unified Selection UI

All selection steps (except Size and Carat) now use a unified **Flex Carousel** layout:
- All items visible at once (no arrow navigation)
- Hover shows item name and price in a **center-top info box**
- Selected items have white/yellow glow effect
- Items wrap into multiple rows when needed (with `flex-wrap`)
- Premium items show a star icon

---

## [01] The Ring - COMPLETE

### Material Selection (Flex Carousel)
- Gold, Silver, Rose Gold, White Gold options
- All materials visible at once with images
- Hover shows name and price in center-top info box
- Gold and White Gold have "Premium" label
- Prices: Gold [From $400], Silver [From $80], Rose Gold [From $300], White Gold [From $700]

### Size Selection (Buttons)
- Sizes 48-56 available as horizontal button row
- Yellow background buttons with 2px border, pill shape (matching navbar style)
- Hover: bounce animation
- Selected: White glow effect
- Does NOT affect display area or love meter

### Display Area
- Ring appears with drop animation when material selected
- Ring drop animation re-triggers each time material is changed
- Ring: 500px height, positioned in center

---

## [02] The Diamond - COMPLETE

### Stone Selection (Flex Carousel)
- 20 stone options (`assets/stones/s1.png` - `s20.png`)
- All stones visible at once, wrapped into 2 rows
- Hover shows stone name in center-top info box
- Stone names configured in `STONE_NAMES` array in `js/config.js`
- Selected stone appears on ring in display area

### Source Selection (Flex Carousel)
- Lab and Natural options visible at once
- Hover shows name and price in center-top info box
- Lab: `assets/rings/lab.png`, [From $600]
- Natural: `assets/rings/natural.png`, [From $1,800], has "Premium" label
- **Source must be selected before carat** - carat prices depend on source

### Carat Slider (Custom)
- Custom slider using `assets/carat-bar.svg` as track
- Range: 0.5 ct to 4.0 ct (step 0.1)
- Draggable yellow circle handle (constrained to 4-96% of bar width)
- Labels: "0.50 ct" on left, "4.00 ct" on right (always 2 decimal places)
- **Dynamic pricing based on selected source:**
  - Lab: [$1,000] on left, [$5,000] on right
  - Natural: [$4,000] on left, [$30,000] on right
- Floating label above handle shows current carat value dynamically
- Premium tag above the max value
- Slider scales the stone in display area (1.5x at 0.5ct, scaling with 0.7x per carat)
- User manually navigates to packaging section after selection
- **Cart item combines stone + carat + source** (displayed as "0.50 ct · Lab" or "1.25 ct · Natural")

### Packaging Selection (Flex Carousel)
- 7 packaging options (`assets/packing/p1.png` - `p7.png`)
- All options visible at once
- Hover shows name and price in center-top info box
- Packaging names and prices configured in `PACKAGING` array in `js/config.js`
- Selected packaging appears behind ring in display area

---

## [03] Location - COMPLETE

### Location Selection (Flex Carousel)
- 15 location options displayed as image thumbnails with flex-wrap (2 rows)
- Location images from `assets/locations/` (l1.png - l15.png)
- Image size: 150px width × 83px height
- Hover shows location name and price in center-top info box
- Locations configured in `LOCATIONS` array in `js/config.js`
- Each location has: name, image filename, premium status, price
- Selecting a location changes the page background image
- Premium locations display a star icon

### Location Options

| Location | Image | Premium |
|----------|-------|---------|
| At Home | home.jpg | No |
| Amsterdam | amsterdam.jpg | Yes |
| Barcelona | barcelona.jpg | Yes |
| Eilat | eilat.png | No |
| Hot Air Balloon | hot-air-balloon.jpg | Yes |
| Jerusalem – Western Wall | western-wall.jpg | No |
| Maldives | maldives.jpg | Yes |
| Mount Hermon | mount-hermon.png | No |
| New York | new-york.jpg | Yes |
| Paris | paris.png | Yes |
| Rome | rome.jpg | Yes |
| Santorini | santorini.png | Yes |
| Tel Aviv Port | tlv-port.jpg | No |
| Thailand | thailand.jpg | Yes |
| Yes Planet Lake, Rishon LeZion | yes-planet-lake.jpg | No |

### Display Area
- Selected location background image displayed on `.page-background` element
- Images stored in `assets/locations/` folder

---

## [04] Setup - COMPLETE

### Sub-steps
- Signs (Flex Carousel) - **IMPLEMENTED**
- Flowers (Flex Carousel, Multiselect) - **IMPLEMENTED**
- Balloons (Flex Carousel) - **IMPLEMENTED**
- Extras (Flex Carousel, Multiselect) - **IMPLEMENTED**

### Step Completion Requirement
All four sub-steps must be completed before Step 5 (Music) unlocks:
- Signs must be selected
- At least one flower must be selected
- Balloons must be selected
- Extras must be selected

### Signs Selection (Flex Carousel)
- 6 sign options (`assets/signs/si1.png` - `si6.png`)
- All signs visible at once
- Hover shows name and price in center-top info box
- Signs configured in `SIGNS` array in `js/config.js` with name and price
- Selected sign appears in display area behind packaging but above background

**Sign Names:**
1. Light-Up Heart Frame - $180
2. Floral Circle Arch - $420
3. "Marry Me" Rose Sign - $290
4. Rose Letters – Custom Name - $350
5. Classic Balloon Arch - $190
6. Romantic Proposal Silk Ribbon - $40

### Flowers Selection (Flex Carousel, Multiselect)
- 8 flower options (`assets/flowers/f1.gif` - `f8.gif`)
- All flowers visible at once
- Hover shows name and price in center-top info box
- Multi-select behavior: click to select, click again to deselect
- Multiple flowers can be selected simultaneously
- Selected flowers show white glow effect
- Flowers configured in `FLOWERS` array in `js/config.js` with name and price

**Flower Names:**
1. Red Rose - $25
2. Blush Pink Rose - $35
3. Pink Lily - $30
4. Blue Flax Flowers - $32
5. Sunflower - $28
6. Orange Rose - $24
7. Baby's breath flower - $18
8. Pink Lotus - $32

### Balloons Selection (Flex Carousel)
- 6 balloon options (`assets/baloons/b1.gif` - `b6.gif`)
- All balloons visible at once
- Hover shows name and price in center-top info box
- Single-select behavior: selecting a new balloon replaces the previous one
- Selected balloon appears in display area
- Balloons configured in `BALLOONS` array in `js/config.js` with name and price

**Balloon Names:**
1. Classic Red Balloon Bouquet - $55
2. Engagement Ring Balloon Stand - $120
3. I Love You Balloon Letters - $90
4. Bride & Groom Heart Balloons - $35
5. Kiss Me Balloon Set - $70
6. Golden Celebration Balloon Bouquet - $85

### Extras Selection (Flex Carousel, Multiselect)
- 8 extra options (`assets/extras/e1.gif` - `e8.gif`)
- All extras visible at once
- Hover shows name and price in center-top info box
- Multi-select behavior: click to select, click again to deselect
- Multiple extras can be selected simultaneously
- Selected extras show white glow effect
- Extras configured in `EXTRAS` array in `js/config.js` with name and price

**Extra Names:**
1. Symbolic Dove Release - $450
2. Fireworks - $1,200
3. Celebration Cake - $180
4. Champagne - $95
5. Professional Proposal Photographer - $650
6. Candlelight Atmosphere - $55
7. Family & Friends Presence - $0
8. Red Carpet Entrance - $95

### Display Area
- Sign element inserted into `#ring-container` with z-index: -1
- Flowers container (`.flowers-container`) holds all selected flowers
- Balloons container (`.balloons-container`) holds selected balloon with rotation styling
- Extras container (`.extras-container`) holds all selected extras on the right side
- Individual flower/extra elements with fade-in/fade-out animations
- Z-index layering (back to front): Sign (z-index: -1) → Packaging (0) → Ring (1) → Stone (2)

---

## [05] Music - COMPLETE

### Music Selection (Flex Carousel with Card Layout)
- 15 song options with cover art displayed as cards
- All cards visible at once, wrapped into 2 rows
- Hover shows "Artist - Song" in center-top info box
- Music configured in `MUSIC` array in `js/config.js`
- Each song has: artist, song name, cover image (`c1.png` - `c15.png`), audio file (`s1.mp3` - `s15.mp3`)
- Assets stored in `assets/music/` folder

### Card Design
- Horizontal card layout with dark background (`#282323`)
- Cover image on left (89x89px, border-radius: 15px)
- Song name (bold, yellow) and artist name (regular, yellow) on right
- Card has 20px border-radius and 8px padding
- Selected card has white glow effect

**Song List:**
1. Boey Beshalom - Ben Snof
2. Ma Shehalev Bachar - Kobi Aflalo
3. Ahava Mimabat Rishon - Arik Einstein
4. Marry You - Bruno Mars
5. Mi'Ma'amakim - Idan Raichel Project
6. Perfect - Ed Sheeran
7. Nishba - Haim Moshe
8. All of Me - John Legend
9. Bereshit Olam - Shlomi Shabbat
10. Haachat Sheli - Ishay Levi
11. Just The Two Of Us - Bill Withers
12. Can't Help Falling in Love - Elvis Presley
13. Shney Yeladim Ba'olam - Nathan Goshen
14. Ahava Kmo Shelanu - Sarit Hadad
15. I'm Yours - Jason Mraz

---

## [06] Deadline - TODO
*Awaiting implementation*
