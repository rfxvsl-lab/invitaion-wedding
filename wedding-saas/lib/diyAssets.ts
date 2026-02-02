/**
 * DIY Asset Catalog
 * Decorative elements for template customization
 */

export interface DIYAsset {
    id: string;
    name: string;
    category: 'icon' | 'frame' | 'sticker' | 'shape' | 'font';
    svg?: string;
    preview: string;
    premium?: boolean; // Exclusive tier only
}

/**
 * ICONS - Hearts, Rings, Flowers, Leaves
 */
export const DIY_ICONS: DIYAsset[] = [
    {
        id: 'heart-solid',
        name: 'Solid Heart',
        category: 'icon',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        preview: '❤️'
    },
    {
        id: 'heart-outline',
        name: 'Heart Outline',
        category: 'icon',
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
        preview: '♡'
    },
    {
        id: 'ring-diamond',
        name: 'Diamond Ring',
        category: 'icon',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9H15L12 2M9 9L2 22H22L15 9H9M12 11.5L16 22L12 18L8 22L12 11.5Z"/></svg>',
        preview: '💍'
    },
    {
        id: 'flower-rose',
        name: 'Rose',
        category: 'icon',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C11 2 10 2.5 9.5 3.5C9 3 8 2.5 7 3S5.5 4.5 5.5 5.5C5 5 4 4.5 3 5S2 7 2 8C2 9 2.5 10 3.5 10.5C3 11 2.5 12 3 13S5 14 6 13.5V22H12V13.5C13 14 14.5 14 15.5 13S16 11 15.5 10.5C16.5 10 17 9 17 8S16.5 6 15.5 5.5S14 5 13.5 5.5C13.5 4.5 13 3.5 12 3C12.5 2.5 12.5 2 12 2Z"/></svg>',
        preview: '🌹'
    },
    {
        id: 'flower-lotus',
        name: 'Lotus',
        category: 'icon',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 17C15.3 17 16 16.3 16 15.5C16 14.7 15.3 14 14.5 14C13.7 14 13 14.7 13 15.5C13 16.3 13.7 17 14.5 17M9.5 17C10.3 17 11 16.3 11 15.5C11 14.7 10.3 14 9.5 14C8.7 14 8 14.7 8 15.5C8 16.3 8.7 17 9.5 17M17.5 13C18.3 13 19 12.3 19 11.5C19 10.7 18.3 10 17.5 10C16.7 10 16 10.7 16 11.5C16 12.3 16.7 13 17.5 13M12 13C12.8 13 13.5 12.3 13.5 11.5C13.5 10.7 12.8 10 12 10C11.2 10 10.5 10.7 10.5 11.5C10.5 12.3 11.2 13 12 13M6.5 13C7.3 13 8 12.3 8 11.5C8 10.7 7.3 10 6.5 10C5.7 10 5 10.7 5 11.5C5 12.3 5.7 13 6.5 13M12 20.5C12 20.5 4 16.5 4 11.5C4 9.5 6 7.5 9 7.5C10 7.5 11 8 12 8C13 8 14 7.5 15 7.5C18 7.5 20 9.5 20 11.5C20 16.5 12 20.5 12 20.5Z"/></svg>',
        preview: '🪷'
    },
    {
        id: 'leaf-simple',
        name: 'Leaf',
        category: 'icon',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>',
        preview: '🍃'
    }
];

/**
 * FRAMES - Decorative Borders
 */
export const DIY_FRAMES: DIYAsset[] = [
    {
        id: 'frame-classic-rect',
        name: 'Classic Rectangle',
        category: 'frame',
        svg: '<svg viewBox="0 0 200 150"><rect x="5" y="5" width="190" height="140" fill="none" stroke="currentColor" stroke-width="3" rx="10"/><rect x="10" y="10" width="180" height="130" fill="none" stroke="currentColor" stroke-width="1" rx="8"/></svg>',
        preview: '▭'
    },
    {
        id: 'frame-ornate-gold',
        name: 'Ornate Gold',
        category: 'frame',
        svg: '<svg viewBox="0 0 200 150"><path d="M10 10 L190 10 L185 20 L195 30 L190 40 L190 110 L195 120 L185 130 L190 140 L10 140 L15 130 L5 120 L10 110 L10 40 L5 30 L15 20 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
        preview: '🖼️',
        premium: true
    },
    {
        id: 'frame-floral-corners',
        name: 'Floral Corners',
        category: 'frame',
        svg: '<svg viewBox="0 0 200 150"><rect x="10" y="10" width="180" height="130" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="8" fill="currentColor"/><circle cx="190" cy="10" r="8" fill="currentColor"/><circle cx="10" cy="140" r="8" fill="currentColor"/><circle cx="190" cy="140" r="8" fill="currentColor"/></svg>',
        preview: '✿'
    }
];

/**
 * STICKERS - Wedding Themed Illustrations
 */
export const DIY_STICKERS: DIYAsset[] = [
    {
        id: 'sticker-bells',
        name: 'Wedding Bells',
        category: 'sticker',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,4.5C10,4.5 8.21,5.2 6.79,6.79C5.2,8.21 4.5,10 4.5,12C4.5,14 5.2,15.79 6.79,17.21C8.21,18.8 10,19.5 12,19.5C14,19.5 15.79,18.8 17.21,17.21C18.8,15.79 19.5,14 19.5,12C19.5,10 18.8,8.21 17.21,6.79C15.79,5.2 14,4.5 12,4.5M10,17V11H14V17H10M11,20H13V22H11V20Z"/></svg>',
        preview: '🔔'
    },
    {
        id: 'sticker-cake',
        name: 'Wedding Cake',
        category: 'sticker',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,6.5C13.4,6.5 14.5,5.4 14.5,4C14.5,2.6 13.4,1.5 12,1.5C10.6,1.5 9.5,2.6 9.5,4C9.5,5.4 10.6,6.5 12,6.5M6,9V11H18V9H6M7,13V15H17V13H7M8,17V19H16V17H8M2,21V22H22V21H2Z"/></svg>',
        preview: '🎂'
    },
    {
        id: 'sticker-champagne',
        name: 'Champagne',
        category: 'sticker',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8,2H16V5H8V2M9,7H15C16.1,7 17,7.9 17,9V14C17,15.1 16.1,16 15,16V22H13V16H11V22H9V16C7.9,16 7,15.1 7,14V9C7,7.9 7.9,7 9,7Z"/></svg>',
        preview: '🥂'
    },
    {
        id: 'sticker-dove',
        name: 'Dove',
        category: 'sticker',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,3C9.8,3 7.7,3.7 6,5.1L12,11.1V3M12,3C14.2,3 16.3,3.7 18,5.1L12,11.1V3M3.5,7C3.5,8.3 4.8,9.4 5.8,10.1L12,5L5.8,10.1C4.8,9.4 3.5,8.3 3.5,7M20.5,7C20.5,8.3 19.2,9.4 18.2,10.1L12,5L18.2,10.1C19.2,9.4 20.5,8.3 20.5,7M12,13L7,18C7,18 9,20 12,20C15,20 17,18 17,18L12,13Z"/></svg>',
        preview: '🕊️',
        premium: true
    }
];

/**
 * SHAPES - Geometric Decorations
 */
export const DIY_SHAPES: DIYAsset[] = [
    {
        id: 'shape-divider-wave',
        name: 'Wave Divider',
        category: 'shape',
        svg: '<svg viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0,10 Q50,0 100,10 T200,10" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
        preview: '〜'
    },
    {
        id: 'shape-divider-dots',
        name: 'Dots Divider',
        category: 'shape',
        svg: '<svg viewBox="0 0 200 20"><circle cx="40" cy="10" r="3" fill="currentColor"/><circle cx="80" cy="10" r="3" fill="currentColor"/><circle cx="120" cy="10" r="3" fill="currentColor"/><circle cx="160" cy="10" r="3" fill="currentColor"/></svg>',
        preview: '• • •'
    },
    {
        id: 'shape-circle',
        name: 'Circle',
        category: 'shape',
        svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
        preview: '○'
    },
    {
        id: 'shape-star',
        name: 'Star',
        category: 'shape',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/></svg>',
        preview: '⭐'
    }
];

/**
 * FONTS - Typography Options
 */
export const DIY_FONTS = [
    { id: 'inter', name: 'Inter (Default)', family: 'Inter, sans-serif' },
    { id: 'playfair', name: 'Playfair Display', family: "'Playfair Display', serif" },
    { id: 'dancing', name: 'Dancing Script', family: "'Dancing Script', cursive", premium: true },
    { id: 'great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", premium: true },
    { id: 'cinzel', name: 'Cinzel', family: "'Cinzel', serif" },
    { id: 'cormorant', name: 'Cormorant', family: "'Cormorant', serif" },
    { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
    { id: 'lora', name: 'Lora', family: "'Lora', serif" }
];

/**
 * Get all assets by category
 */
export function getAssetsByCategory(category: DIYAsset['category']): DIYAsset[] {
    switch (category) {
        case 'icon': return DIY_ICONS;
        case 'frame': return DIY_FRAMES;
        case 'sticker': return DIY_STICKERS;
        case 'shape': return DIY_SHAPES;
        default: return [];
    }
}

/**
 * Get asset by ID
 */
export function getAssetById(id: string): DIYAsset | undefined {
    const all = [...DIY_ICONS, ...DIY_FRAMES, ...DIY_STICKERS, ...DIY_SHAPES];
    return all.find(asset => asset.id === id);
}
