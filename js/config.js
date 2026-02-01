// ========================================
// CONFIGURATION - All config objects for the configurator
// ========================================

// Constants
const TOTAL_STEPS = 6;
const STEP_HEADER_HEIGHT = 60;
const TRANSITION_DURATION = 350;
// Love meter positions in cqh units (relative to 1160px height)
// 730px / 1160 * 100 = 62.93cqh
const LOVE_METER_MAX_HEIGHT = 62.93;
// 140px / 1160 * 100 = 12.07cqh
const LOVE_METER_BASE_POSITION = 12.07;

// Steps configuration
const STEPS_CONFIG = {
    1: {
        name: 'The Ring',
        sections: ['material', 'size'],
        defaultSection: 'material'
    },
    2: {
        name: 'The Diamond',
        sections: ['stone', 'source', 'carat', 'packaging'],
        defaultSection: 'stone'
    },
    3: {
        name: 'Location',
        sections: ['location'],
        defaultSection: 'location'
    },
    4: {
        name: 'Setup',
        sections: ['signs', 'flowers', 'balloons', 'extras'],
        defaultSection: 'signs'
    },
    5: {
        name: 'Music',
        sections: ['music'],
        defaultSection: 'music'
    },
    6: {
        name: 'Deadline',
        sections: ['deadline'],
        defaultSection: 'deadline'
    }
};

// ========================================
// LOVE METER CONFIGURATION
// Heart position based on cart total price
// ========================================

const LOVE_METER_CONFIG = {
    minPrice: 0,        // Price at bottom of meter (0%)
    maxPrice: 32239,    // Price at top of meter (100%)
    minScale: 1.0,      // Heart scale at 0%
    maxScale: 1.4,      // Heart scale at 100%
    
    // Checkpoints: trigger popover messages at specific positions (in cqh units)
    // bottom = LOVE_METER_BASE_POSITION + offset (where offset is in cqh)
    // image: path to SVG image
    // Original px values: 250, 405, 560, 715, 865 -> converted to cqh
    checkpoints: [
        { offset: 9.48, bottom: 21.55, image: 'assets/texts/pop-t1.svg' },   // 250px / 1160 = 21.55cqh
        { offset: 22.84, bottom: 34.91, image: 'assets/texts/pop-t2.svg' },  // 405px / 1160 = 34.91cqh
        { offset: 36.21, bottom: 48.28, image: 'assets/texts/pop-t3.svg' },  // 560px / 1160 = 48.28cqh
        { offset: 49.57, bottom: 61.64, image: 'assets/texts/pop-t4.svg' },  // 715px / 1160 = 61.64cqh
        { offset: 62.5, bottom: 74.57, image: 'assets/texts/pop-t5.svg' }    // 865px / 1160 = 74.57cqh
    ]
};

// Location data (15 locations) - name, image filename, premium status, and price
const LOCATIONS = [
    { name: 'At Home', image: 'l4.png', premium: false, price: 0 },
    { name: 'Amsterdam', image: 'l7.png', premium: true, price: 4500 },
    { name: 'Barcelona', image: 'l13.png', premium: true, price: 4300 },
    { name: 'Eilat', image: 'l1.png', premium: false, price: 1800 },
    { name: 'Hot Air Balloon', image: 'l8.png', premium: true, price: 2000 },
    { name: 'Jerusalem – Western Wall', image: 'l10.png', premium: false, price: 0 },
    { name: 'Maldives', image: 'l12.png', premium: true, price: 8000 },
    { name: 'Mount Hermon', image: 'l11.png', premium: false, price: 0 },
    { name: 'New York', image: 'l6.png', premium: true, price: 5000 },
    { name: 'Paris', image: 'l5.png', premium: true, price: 5200 },
    { name: 'Rome', image: 'l2.png', premium: true, price: 4700 },
    { name: 'Santorini', image: 'l9.png', premium: true, price: 6000 },
    { name: 'Tel Aviv Port', image: 'l14.png', premium: false, price: 0 },
    { name: 'Thailand', image: 'l3.png', premium: true, price: 4000 }
];

// Material prices
const MATERIAL_PRICES = {
    gold: 400,
    silver: 80,
    'rose-gold': 300,
    'white-gold': 700
};

// Source prices
const SOURCE_PRICES = {
    lab: 600,
    natural: 1800
};

// Carat price ranges based on source
const CARAT_RANGES = {
    lab: { minPrice: 600, maxPrice: 4000 },
    natural: { minPrice: 1800, maxPrice: 20000 }
};

// Signs data (6 signs) - name, display price string, and numeric price
const SIGNS = [
    { name: 'Light-Up Heart Frame', priceDisplay: '[$180]', price: 180 },
    { name: 'Floral Circle Arch', priceDisplay: '[$420]', price: 420 },
    { name: 'Marry Me Rose Sign', priceDisplay: '[$290]', price: 290 },
    { name: 'Rose Letters – Custom Name', priceDisplay: '[$350]', price: 350 },
    { name: 'Classic Balloon Arch', priceDisplay: '[$190]', price: 190 },
    { name: 'Romantic Proposal Silk Ribbon', priceDisplay: '[$40]', price: 40 }
];

// Flowers data (8 flowers) - name, display price string, and numeric price
const FLOWERS = [
    { name: 'Red Rose', priceDisplay: '[$25]', price: 25 },
    { name: 'Blush Pink Rose', priceDisplay: '[$35]', price: 35 },
    { name: 'Pink Lily', priceDisplay: '[$30]', price: 30 },
    { name: 'Blue Flax Flowers', priceDisplay: '[$32]', price: 32 },
    { name: 'Sunflower', priceDisplay: '[$28]', price: 28 },
    { name: 'Orange Rose', priceDisplay: '[$24]', price: 24 },
    { name: 'Pink Orchid', priceDisplay: '[$42]', price: 42 },
    { name: 'Pink Lotus', priceDisplay: '[$32]', price: 32 }
];

// Packaging data (7 packaging options) - name, display price string, and numeric price
const PACKAGING = [
    { name: 'Minimal Black Velvet Ring Box', priceDisplay: '[$12]', price: 12 },
    { name: 'Shell-Inspired Ring Box', priceDisplay: '[$18]', price: 18 },
    { name: 'Romantic Heart Ring Box', priceDisplay: '[$14]', price: 14 },
    { name: 'Vintage Wooden Ring Box', priceDisplay: '[$22]', price: 22 },
    { name: 'Deep Blue Velvet Ring Box', priceDisplay: '[$16]', price: 16 },
    { name: 'Antique Angel Heart Ring Box', priceDisplay: '[$26]', price: 26 },
    { name: 'Modern Red Heart Ring Box', priceDisplay: '[$15]', price: 15 }
];

// Balloons data (6 balloons) - name, display price string, and numeric price
const BALLOONS = [
    { name: 'Classic Red Balloon Bouquet', priceDisplay: '[$55]', price: 55 },
    { name: 'Engagement Ring Balloon Stand', priceDisplay: '[$120]', price: 120 },
    { name: 'I Love You Balloon Letters', priceDisplay: '[$90]', price: 90 },
    { name: 'Bride & Groom Heart Balloons', priceDisplay: '[$35]', price: 35 },
    { name: 'Kiss Me Balloon Set', priceDisplay: '[$70]', price: 70 },
    { name: 'Golden Celebration Balloon Bouquet', priceDisplay: '[$85]', price: 85 }
];

// Extras data (8 extras) - name, display price string, and numeric price
const EXTRAS = [
    { name: 'Symbolic Dove Release', priceDisplay: '[$450]', price: 450 },
    { name: 'Fireworks', priceDisplay: '[$1,200]', price: 1200 },
    { name: 'Celebration Cake', priceDisplay: '[$180]', price: 180 },
    { name: 'Champagne', priceDisplay: '[$95]', price: 95 },
    { name: 'Professional Proposal Photographer', priceDisplay: '[$650]', price: 650 },
    { name: 'Candlelight Atmosphere', priceDisplay: '[$55]', price: 55 },
    { name: 'Family & Friends Presence', priceDisplay: '[$0]', price: 0 },
    { name: 'Red Carpet Entrance', priceDisplay: '[$95]', price: 95 }
];

// Music data (15 songs) - artist, song name, cover image, and audio filename
const MUSIC = [
    { artist: 'Ben Snof', song: 'Boey Beshalom', image: 'c1.png', audio: 's1.mp3' },
    { artist: 'Kobi Aflalo', song: 'Ma Shehalev Bachar', image: 'c2.png', audio: 's2.mp3' },
    { artist: 'Arik Einstein', song: 'Ahava Mimabat Rishon', image: 'c3.png', audio: 's3.mp3' },
    { artist: 'Bruno Mars', song: 'Marry You', image: 'c4.png', audio: 's4.mp3' },
    { artist: 'Idan Raichel Project', song: 'Mi\'Ma\'amakim', image: 'c5.png', audio: 's5.mp3' },
    { artist: 'Ed Sheeran', song: 'Perfect', image: 'c6.png', audio: 's6.mp3' },
    { artist: 'Haim Moshe', song: 'Nishba', image: 'c7.png', audio: 's7.mp3' },
    { artist: 'John Legend', song: 'All of Me', image: 'c8.png', audio: 's8.mp3' },
    { artist: 'Shlomi Shabbat', song: 'Bereshit Olam', image: 'c9.png', audio: 's9.mp3' },
    { artist: 'Ishay Levi', song: 'Haachat Sheli', image: 'c10.png', audio: 's10.mp3' },
    { artist: 'Bill Withers', song: 'Just The Two Of Us', image: 'c11.png', audio: 's11.mp3' },
    { artist: 'Elvis Presley', song: 'Can\'t Help Falling in Love', image: 'c12.png', audio: 's12.mp3' },
    { artist: 'Nathan Goshen', song: 'Shney Yeladim Ba\'olam', image: 'c13.png', audio: 's13.mp3' },
    { artist: 'Jason Mraz', song: 'I\'m Yours', image: 'c14.png', audio: 's14.mp3' }
];

// Stone names (20 stones) - no price, just name and image
const STONE_NAMES = [
    'Aura pear-shaped diamond ring',
    'Classic round brilliant halo diamond ring with side stones',
    'Classic emerald-cut and tapered diamond ring',
    'Classic oval-shaped diamond ring',
    'Classic heart-shaped diamond ring',
    'Classic round brilliant diamond ring',
    'Aura oval-shaped diamond ring',
    'Aura round brilliant diamond ring',
    'Aura fancy yellow oval-shaped diamond ring',
    'Classic floral-halo round brilliant diamond ring',
    'Classic petal-set in silver round brilliant diamond ring',
    'Classic petal-set in gold round brilliant diamond ring',
    'Aura heart-shaped diamond ring',
    'Aura emerald-cut diamond ring',
    'Classic marquise-shaped diamond ring',
    'Classic Oval-Cut Side Stones Diamond Ring',
    'Classic radiant cut diamond ring in platinum',
    'Classic Pave fancy yellow cushion-cut diamond ring',
    'Classic trio emerald-cut diamond ring',
    'Classic trio round brilliant diamond ring'
];

// Asset paths
const ASSETS = {
    icons: {
        leftArrow: 'assets/icons/left-arrow-long.svg',
        rightArrow: 'assets/icons/right-arrow-long.svg',
        premium: 'assets/icons/red-star.svg',
        dot: 'assets/icons/dot.svg',
        lock: 'assets/icons/lock.svg',
        check: 'assets/icons/v.svg'
    },
    rings: {
        gold: 'assets/rings/gold.png',
        silver: 'assets/rings/silver.png',
        'rose-gold': 'assets/rings/rose-gold.png',
        'white-gold': 'assets/rings/white-gold.png',
        goldRing: 'assets/rings/gold-ring.png',
        silverRing: 'assets/rings/silver-ring.png',
        roseGoldRing: 'assets/rings/rose-gold-ring.png',
        whiteGoldRing: 'assets/rings/silver-ring.png',
        lab: 'assets/rings/lab.png',
        natural: 'assets/rings/natural.png'
    },
    stones: (id) => `assets/stones/s${id}.png`,
    stonesCarousel: (id) => `assets/stones/s-c${id}.png`,
    packing: (id) => `assets/packing/p${id}.png`,
    signs: (id) => `assets/signs/si${id}.png`,
    flowers: (id) => `assets/flowers/f${id}.gif`,
    balloons: (id) => `assets/baloons/b${id}.gif`,
    extras: (id) => `assets/extras/e${id}.gif`,
    music: {
        image: (filename) => `assets/music/${filename}`,
        audio: (filename) => `assets/music/${filename}`
    }
};
