import React from 'react';
import ModernArch from '@/templates/ModernArch';
import ClassicSerif from '@/templates/ClassicSerif';
import RusticWood from '@/templates/RusticWood';
import BotanicalLine from '@/templates/BotanicalLine';
import ElegantVanilla from '@/templates/ElegantVanilla';
import DarkLuxury from '@/templates/DarkLuxury';
import PremiumPeppy from '@/templates/PremiumPeppy';
import GamerQuest from '@/templates/GamerQuest';
import RoyalGlass from '@/templates/RoyalGlass';
import NetflixLuxury from '@/templates/NetflixLuxury';
import GrandBallroom from '@/templates/GrandBallroom';
import RoyalArabian from '@/templates/RoyalArabian';

export type TemplateTier = 'free' | 'basic' | 'premium' | 'exclusive';

export interface TemplateConfig {
    id: string;
    name: string;
    tier: TemplateTier;
    thumbnail?: string;
    component: React.ComponentType<any>;
}

export const TEMPLATES: TemplateConfig[] = [
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
        thumbnail: 'https://images.unsplash.com/photo-1542259148-5c40149d6389?w=600&q=80',
        tier: 'exclusive',
        component: RoyalArabian
    }
];
