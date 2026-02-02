export type TemplateTier = 'free' | 'basic' | 'premium' | 'exclusive';

export interface TemplateConfig {
    id: string;
    name: string;
    tier: TemplateTier;
    thumbnail?: string; // Optional for now
}

export const TEMPLATES: TemplateConfig[] = [
    // FREE & BASIC
    { id: 'modern-arch', name: 'Modern Arch', tier: 'free' },
    { id: 'classic-serif', name: 'Classic Serif', tier: 'free' },
    { id: 'rustic-wood', name: 'Rustic Wood', tier: 'free' },
    { id: 'botanical-line', name: 'Botanical Line', tier: 'free' },

    // PREMIUM
    { id: 'elegant-vanilla', name: 'Elegant Vanilla', tier: 'premium' },
    { id: 'dark-luxury', name: 'Dark Luxury', tier: 'premium' },
    { id: 'premium-peppy', name: 'Premium Peppy', tier: 'premium' },
    { id: 'gamer-quest', name: 'Gamer Quest', tier: 'premium' },

    // EXCLUSIVE
    { id: 'royal-glass', name: 'Royal Glass', tier: 'exclusive' },
    { id: 'netflix-luxury', name: 'Netflix Luxury', tier: 'exclusive' },
    { id: 'grand-ballroom', name: 'Grand Ballroom', tier: 'exclusive' },
    {
        id: 'royal-arabian',
        name: 'Royal Arabian (Exclusive)',
        thumbnail: 'https://images.unsplash.com/photo-1542259148-5c40149d6389?w=600&q=80', // Arabian Night / Mosque placeholder
        tier: 'exclusive'
    }
];

