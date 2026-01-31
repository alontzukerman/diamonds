# UI Components

## Accordion Menu (6 Steps)

- [01] The Ring - **IMPLEMENTED**
- [02] The Diamond - **IMPLEMENTED**
- [03] Location - **IMPLEMENTED**
- [04] Setup - **COMPLETE**
- [05] Music - Placeholder (ready for items)
- [06] Deadline - Placeholder (ready for items)

### Accordion Behavior
- Each step now shows **descriptions only** (not selection items)
- Sub-sections are collapsible within each step (only one expanded at a time)
- Clicking a section header expands it and shows the corresponding selector at bottom center
- Selection items are rendered dynamically in the bottom selection container
- Smooth open/close animation (0.3s max-height transition)
- **All steps start collapsed** - user clicks Step 1 to begin
- When opening a step, the first sub-section automatically expands and shows its selector
- Opening a new step **collapses the previous step** (only one step open at a time)
- **No auto-advance** - after selecting an item, user manually navigates to next section/step

### Disabled Steps
- Steps 2-6 start with `.disabled` class (opacity: 0.5, pointer-events: none)
- When a step is unlocked, the `.disabled` class is removed
- Locked steps cannot be clicked or expanded

### Step Header Styling
- Font: Narkiss Yair TRIAL, 25px
- Step number: weight 400
- Step title: weight 700
- Height: 60px (configurable via `STEP_HEADER_HEIGHT`)
- **Active/Expanded/Hover step number:** Sloop Script Two, 25px, weight 700
- Menu width: 250px

### Section Styling
- Section title: Narkiss Yair TRIAL, 20px, weight 400, clickable
- Description: Narkiss Yair TRIAL, 20px
- Description text: IBM Plex Serif, 12px
- Clicking section title activates corresponding bottom selector

---

## Progress Bar (Left of Menu)

- Vertical progress bar positioned to the left of the accordion menu
- Width: 50px
- Contains a **single continuous yellow line** (`#F2E772`) connecting all circles from behind
- Line dynamically stretches as steps expand/collapse using `requestAnimationFrame` sync

### Progress Bar States

| State | Circle | Icon | Animation |
|-------|--------|------|-----------|
| **Active** | Black (`#000`) | Yellow dot (`assets/dot.svg`) | Pulse animation |
| **Locked** | Yellow (`#F2E772`) | Gray lock (`assets/lock.svg`) | None |
| **Completed** | Black (`#000`) | Yellow checkmark (`assets/v.svg`) | None |
| **Unlocked (not active)** | Black (`#000`) | Yellow dot (`assets/dot.svg`) | None |

### Active Step Logic
- Active step = first unlocked step that is not yet completed
- Active indicator shows **even when the step is collapsed**
- When a step is completed, the next step automatically becomes active

### Progress Bar Height Sync
- Progress bar total height syncs with menu height for proper flex-end alignment
- Each progress step height matches its corresponding menu step height
- Heights sync in real-time during expand/collapse animations via `animateSyncProgressBarHeights()`
- Progress circles: 32px diameter, icons: 13px width
- Uses `requestAnimationFrame` for smooth 350ms animation sync

### Step Completion Requirements
- Step 1 (The Ring): Material AND Ring Size must be selected
- Step 2 (The Diamond): Stone, Source, AND Packaging must be selected
- Step 3 (Location): Location must be selected
- Step 4 (Setup): Signs, Flowers, Balloons, AND Extras must be selected
- Step 5 (Music): Music must be selected
- Step 6 (Deadline): Deadline must be selected

---

## Selection Container (Step Element)

- Positioned at the bottom of the center column (inside `.configurator-center`)
- Part of the vertical flex layout, not fixed positioned
- Dynamically renders different selector types based on current section
- Five selector types available:
  - **Carousel:** Arrow navigation, one item at a time (material, stones, source, packaging)
  - **Buttons:** Horizontal row of buttons (ring sizes)
  - **Slider:** Range input with value display (carat)
  - **Grid:** Multiple items visible at once
  - **Multiselect:** Multiple selections allowed (flowers, extras)

### Carousel Features
- Navigation arrows using `left-arrow-long.svg` and `right-arrow-long.svg`
- Subtle slide animation with fade (15px movement, 0.2s duration)
- Delayed entrance for smooth sequencing (outgoing fades first, then incoming appears)
- Image centered with label and price below (same font styling: Narkiss Yair TRIAL, 25px, weight 400)
- Premium badge (`red-star.svg`) positioned top-right for gold material, natural source, and carat max
- Selected state: White blur/glow behind image
- Hover state: Scale 1.05x on entire carousel item
- Fixed width container (250px) with min-height items to prevent layout shift
- Silver image scaled to 1.2x, Lab/Natural images scaled to 1.1x/1.3x, Stones scaled to 1.5x for visual balance
- Each carousel image has section-specific class for individual adjustments (e.g., `.carousel-image-signs-4`)

### Selector Types

| Type | Use Case | Features |
|------|----------|----------|
| `carousel` | Single item view with navigation | Left/right arrows, click to select |
| `buttons` | Simple options in a row | Horizontal layout, instant select |
| `slider` | Range values | Min/max labels, floating label, confirm button |
| `grid` | Multiple items visible | Wrap layout, click to select |
| `multiselect` | Multiple selections (e.g., flowers) | Flex-wrap grid, toggle select, multiple items allowed |

---

## Custom Cursor

- Custom hand pointer cursor (`assets/cursor.png`) follows mouse
- Implemented via `cursor.js` - creates an image element that tracks mouse position
- Native cursor hidden (`cursor: none`) across all elements
- Cursor hides when mouse leaves window

---

## Keyboard Navigation

- **Arrow Up/Down:** Navigate between steps (respects unlock state - cannot navigate to locked steps)
- **Arrow Left/Right:** Navigate carousel items
- **Enter:** Select current carousel item
- **Escape:** Close cart if open, otherwise return to landing page
