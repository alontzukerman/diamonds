# Love Meter

## Overview

- Vertical gauge with arrow
- Heart icon that moves up as user makes selections
- Title: "How much he loves me?"
- Point-based system with configurable values per selection

---

## Point System

| Selection | Points | Variable |
|-----------|--------|----------|
| Gold Ring | 15 | `GOLD_RING_POINTS` |
| Silver Ring | 10 | `SILVER_RING_POINTS` |
| Stone (any) | 5 | `STONE_POINTS[n]` |
| Carat | 5/ct | `CARAT_POINTS_PER_UNIT` |
| Lab Source | 5 | `LAB_SOURCE_POINTS` |
| Natural Source | 10 | `NATURAL_SOURCE_POINTS` |
| Packaging (any) | 3 | `PACKAGING_POINTS[n]` |
| Location (any) | TBD | `LOCATION_POINTS` |
| Signs (any) | TBD | `SIGNS_POINTS` |
| Flowers (any) | TBD | `FLOWERS_POINTS` |
| Balloons (any) | TBD | `BALLOONS_POINTS` |
| Extras (any) | TBD | `EXTRAS_POINTS` |
| *Music* | TBD | `MUSIC_POINTS` |
| *Deadline* | TBD | `DEADLINE_POINTS` |

**Max Points:** 100 (`MAX_LOVE_POINTS`)

---

## Configuration

Points are configured in `js/config.js`:

```javascript
const POINTS_CONFIG = {
    ring: {
        material: { gold: 15, silver: 10 }
    },
    diamond: {
        stone: 5,
        caratPerUnit: 5,
        source: { lab: 5, natural: 10 },
        packaging: 3
    }
};

const START_POINTS = 90;
const MAX_LOVE_POINTS = 150;
```

---

## Visual Behavior

- Heart icon moves vertically based on accumulated points
- Position calculated as percentage of max points
- Smooth transition animation (0.5s ease)
- Base position: 180px from bottom
- Max height: 700px travel distance
