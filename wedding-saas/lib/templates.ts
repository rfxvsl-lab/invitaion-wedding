import React from 'react';
import dynamic from 'next/dynamic';

// Free & Basic Templates
// const ModernArch = dynamic(() => import('@/templates/ModernArch'));
// const RusticWood = dynamic(() => import('@/templates/RusticWood'));
// const ElegantVanilla = dynamic(() => import('@/templates/ElegantVanilla'));
// const PremiumPeppy = dynamic(() => import('@/templates/PremiumPeppy'));

const ClassicSerif = dynamic(() => import('@/templates/ClassicSerif'));
const BotanicalLine = dynamic(() => import('@/templates/BotanicalLine'));
const DarkLuxury = dynamic(() => import('@/templates/DarkLuxury'));
const GamerQuest = dynamic(() => import('@/templates/GamerQuest'));
const RoyalGlass = dynamic(() => import('@/templates/RoyalGlass'));
const NetflixLuxury = dynamic(() => import('@/templates/NetflixLuxury'));
const GrandBallroom = dynamic(() => import('@/templates/GrandBallroom'));
const RoyalArabian = dynamic(() => import('@/templates/RoyalArabian'));
const LuxuryPink = dynamic(() => import('@/templates/LuxuryPink'));
const SpotiLove = dynamic(() => import('@/templates/SpotiLove'));
const LuxuryJavanese = dynamic(() => import('@/templates/LuxuryJavanese'));
const PremiumFloral = dynamic(() => import('@/templates/PremiumFloral'));

export type TemplateTier = 'free' | 'basic' | 'premium' | 'exclusive';

export interface Template {
    id: string;
    name: string;
    thumbnail_url?: string;
    tier: 'free' | 'basic' | 'premium' | 'exclusive';
    preview_url?: string;
    slug?: string;
    created_at?: string;
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
    { id: 'classic-serif', name: 'Classic Serif', tier: 'free', component: ClassicSerif },
    { id: 'botanical-line', name: 'Botanical Line', tier: 'free', component: BotanicalLine },

    // PREMIUM
    { id: 'dark-luxury', name: 'Dark Luxury', tier: 'premium', component: DarkLuxury },
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
    },
    {
        id: 'luxury-javanese',
        name: 'Luxury Javanese',
        thumbnail_url: '/assets/luxury-javanese/gunungan.png', // Use Gunungan as thumbnail for now
        tier: 'exclusive',
        component: LuxuryJavanese
    },
    {
        id: 'premium-floral',
        name: 'Premium Floral',
        thumbnail_url: '/themes/premium-floral/bg-1.png',
        tier: 'free',
        component: PremiumFloral
    }
];

