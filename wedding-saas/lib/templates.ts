import React from 'react';
import dynamic from 'next/dynamic';

const ModernArch = dynamic(() => import('@/templates/ModernArch'));
const ClassicSerif = dynamic(() => import('@/templates/ClassicSerif'));
const RusticWood = dynamic(() => import('@/templates/RusticWood'));
const BotanicalLine = dynamic(() => import('@/templates/BotanicalLine'));
const ElegantVanilla = dynamic(() => import('@/templates/ElegantVanilla'));
const DarkLuxury = dynamic(() => import('@/templates/DarkLuxury'));
const PremiumPeppy = dynamic(() => import('@/templates/PremiumPeppy'));
const GamerQuest = dynamic(() => import('@/templates/GamerQuest'));
const RoyalGlass = dynamic(() => import('@/templates/RoyalGlass'));
const NetflixLuxury = dynamic(() => import('@/templates/NetflixLuxury'));
const GrandBallroom = dynamic(() => import('@/templates/GrandBallroom'));
const RoyalArabian = dynamic(() => import('@/templates/RoyalArabian'));
const LuxuryPink = dynamic(() => import('@/templates/LuxuryPink'));
const SpotiLove = dynamic(() => import('@/templates/SpotiLove'));

export type TemplateTier = 'free' | 'basic' | 'premium' | 'exclusive';

export interface Template {
    id: string;
    name: string;
    thumbnail_url: string;
    tier: 'free' | 'basic' | 'premium' | 'exclusive';
    preview_url?: string;
    slug: string;
    created_at: string;
    component: React.ComponentType<any>;
}

export const TEMPLATES: Template[] = [
    {
        id: 'spotilove',
        name: 'SpotiLove Music',
        tier: 'exclusive',
        thumbnail_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
        slug: 'spotilove',
        created_at: new Date().toISOString(),
        component: SpotiLove
    },
    // FREE & BASIC
    { id: 'modern-arch', name: 'Modern Arch', tier: 'free', component: ModernArch },
    { id: 'classic-serif', name: 'Classic Serif', tier: 'free', component: ClassicSerif },
    { id: 'rustic-wood', name: 'Rustic Wood', tier: 'free', component: RusticWood },
    { id: 'botanical-line', name: 'Botanical Line', tier: 'free', component: BotanicalLine },

    // PREMIUM
    { id: 'elegant-vanilla', name: 'Elegant Vanilla', tier: 'premium', component: ElegantVanilla },
    { id: 'dark-luxury', name: 'Dark Luxury', tier: 'premium', component: DarkLuxury },
    { id: 'premium-peppy', name: 'Premium Peppy', tier: 'premium', component: PremiumPeppy },
    { id: 'gamer-quest', name: 'Gamer Quest', tier: 'premium', component: GamerQuest },

    // EXCLUSIVE
    { id: 'royal-glass', name: 'Royal Glass', tier: 'exclusive', component: RoyalGlass },
    { id: 'netflix-luxury', name: 'Netflix Luxury', tier: 'exclusive', component: NetflixLuxury },
    { id: 'grand-ballroom', name: 'Grand Ballroom', tier: 'exclusive', component: GrandBallroom },
    {
        id: 'royal-arabian',
        name: 'Royal Arabian (Exclusive)',
        thumbnail_url: 'https://images.unsplash.com/photo-1542259148-5c40149d6389?w=600&q=80',
        tier: 'exclusive',
        component: RoyalArabian
    },
    {
        id: 'luxury-pink',
        name: 'Luxury Pink',
        thumbnail_url: 'https://images.unsplash.com/photo-1596726615557-4b7261973007?w=600&q=80',
        tier: 'exclusive',
        component: LuxuryPink
    }
];
