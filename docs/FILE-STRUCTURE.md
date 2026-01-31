# File Structure

```
shahar-diamond/
├── index.html              # Landing page
├── landing.css             # Landing page styles
├── gallery.html            # Gallery/Index page with package examples
├── gallery.css             # Gallery page styles
├── configurator.html       # Configurator page
├── configurator.css        # Configurator page styles (imports from css/)
├── configurator.js         # Main configurator orchestrator
├── common.css              # Shared styles (fonts, navbar, banner, custom cursor)
├── cursor.js               # Custom cursor follower script
│
├── docs/                   # Documentation
│   ├── README.md           # Main documentation index
│   ├── FILE-STRUCTURE.md   # This file
│   ├── PAGES.md            # Page descriptions
│   ├── STEPS.md            # Step implementation details
│   ├── COMPONENTS.md       # UI component documentation
│   ├── CART.md             # Cart system documentation
│   ├── LOVE-METER.md       # Love meter point system
│   ├── STYLING.md          # Visual design documentation
│   ├── ARCHITECTURE.md     # JavaScript architecture
│   └── ROADMAP.md          # Project roadmap
│
├── css/                    # Modular CSS files
│   ├── layout.css          # Three-column layout and love meter
│   ├── progress-bar.css    # Progress bar styles
│   ├── menu.css            # Accordion menu styles
│   ├── display.css         # Display area (ring, stone, flowers, etc.)
│   ├── selectors.css       # Selection container (carousel, buttons, slider, etc.)
│   └── cart.css            # Cart sidepanel styles
│
├── js/                     # JavaScript modules
│   ├── config.js           # Configuration constants, asset paths, and data
│   ├── cart.js             # Cart utility module (add, remove, update, calculate)
│   ├── about.js            # About overlay open/close functionality
│   ├── state.js            # Application state management
│   ├── progress.js         # Progress bar management
│   ├── love-meter.js       # Love meter calculations
│   ├── display.js          # Display area updates
│   ├── cart-helpers.js     # Cart helper functions (ring, stone items)
│   ├── cart-ui.js          # Cart UI rendering and animations
│   ├── renderers.js        # Selector renderers (carousel, buttons, slider, etc.)
│   └── gallery.js          # Gallery page: static examples and card generation
│
└── assets/
    ├── fonts/              # Custom fonts (Narkiss, IBM Plex Serif, Narkiss Yair)
    ├── stones/             # Stone images (s1.png - s20.png)
    ├── packing/            # Packaging images (p1.png - p7.png)
    ├── signs/              # Sign images (si1.png - si6.png)
    ├── flowers/            # Flower images (f1.gif - f8.gif)
    ├── baloons/            # Balloon images (b1.gif - b6.gif)
    ├── extras/             # Extra images (e1.gif - e8.gif)
    ├── locations/          # Location background images (15 locations)
    │
    ├── icons/              # SVG icons
    │   ├── arrow-right.svg     # Start button arrow
    │   ├── left-arrow-long.svg # Carousel left navigation arrow
    │   ├── right-arrow-long.svg # Carousel right navigation arrow
    │   ├── love-meter-arrow.svg # Love meter gauge arrow
    │   ├── heart.svg           # Love meter heart indicator
    │   ├── premium.svg         # Premium label with star (replaced by red-star.svg)
    │   ├── plus.svg            # Plus icon for step expand/collapse
    │   ├── cart.svg            # Cart icon for navbar
    │   ├── cart-x.svg          # Close button icon for cart sidepanel
    │   ├── about-x.svg         # Close button icon for about overlay
    │   ├── red-arrow.svg       # Red arrow icon for about footer email link
    │   ├── cart-star.svg       # Cart/star icon (unused)
    │   ├── red-star.svg        # Red star icon (premium indicator)
    │   ├── dot.svg             # Yellow dot for active/unlocked steps
    │   ├── lock.svg            # Gray lock for locked steps
    │   └── v.svg               # Yellow checkmark for completed steps
    │
    ├── carat-bar.svg       # Custom carat slider track
    │
    ├── ui/                 # UI elements and backgrounds
    │   ├── background.jpeg     # Page background image
    │   ├── logo.png            # "By" logo on landing page
    │   ├── navbar-logo.svg     # Main navbar logo
    │   ├── cursor.png          # Custom cursor image (hand pointer)
    │   └── cursor-mini.png     # Small cursor variant
    │
    ├── rings/              # Ring and material images
    │   ├── gold.png            # Gold material option thumbnail
    │   ├── silver.png          # Silver material option thumbnail
    │   ├── gold-ring.png       # Gold ring display image
    │   ├── silver-ring.png     # Silver ring display image
    │   ├── lab.png             # Lab source option
    │   └── natural.png         # Natural source option
    │
    └── decorations/        # GIFs and decorative elements
        ├── diamond.gif         # Main diamond animation
        ├── flowers.gif         # Decorative flowers
        ├── bird.gif            # Decorative bird
        ├── cupid.gif           # Decorative cupid
        ├── heart.gif           # Heart animation
        ├── pearl.gif           # Pearl animation
        ├── rose-left.gif       # Left rose decoration
        ├── rose-right.gif      # Right rose decoration
        ├── step-3-diamond.gif  # Step 3 diamond animation
        ├── green-hand.png      # Green hand decoration
        ├── pink-hand.png       # Pink hand decoration
        ├── purple-hand.png     # Purple hand decoration
        ├── white-hand.png      # White hand decoration
        └── yellow-hand.png     # Yellow hand decoration
```
