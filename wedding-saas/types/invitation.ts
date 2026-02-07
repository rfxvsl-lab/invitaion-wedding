// Path: /types/invitation.ts

export interface CoupleProfile {
    name: string;
    parents: string;
    ig: string;
    photo: string;
}

export interface EventDetail {
    enabled?: boolean; // Optional, default true
    date: string; // YYYY-MM-DD
    time: string;
    venue: string;
    address: string;
    map_url: string;
}

export interface GiftAccount {
    bank: string;
    acc_number: string;
    holder: string;
}

export interface DIYElement {
    id: string;
    type: 'text' | 'image' | 'icon' | 'frame' | 'sticker' | 'shape';
    assetId?: string; // Reference to asset from diyAssets.ts
    position: { x: number; y: number }; // Percentage-based (0-100)
    size: { width: number; height: number }; // Percentage-based
    rotation: number; // Degrees
    zIndex: number;
    locked: boolean;
    // Type-specific data
    content?: {
        text?: string;
        imageUrl?: string;
        color?: string;
        fontSize?: number;
        fontFamily?: string;
    };
}

export interface DIYLayout {
    enabled: boolean;
    elements: DIYElement[];
}

export interface InvitationData {
    metadata: {
        slug: string;
        theme_id: 'modern-arch' | 'classic-serif' | 'botanical-line' | 'rustic-wood' | 'dark-luxury' | 'premium-peppy' | 'gamer-quest' | 'maroon-vintage' | 'adat-bone' | 'elegant-vanilla' | 'royal-glass' | 'netflix-luxury' | 'grand-ballroom' | 'royal-arabian' | 'luxury-pink' | 'spotilove' | 'luxury-javanese';
        music_url: string;
        custom_bg_url?: string; // Optional custom background
        diy_layout?: DIYLayout; // DIY customization data
        is_active: boolean;
        published_at?: string; // ISO timestamp when published
        expires_at?: string; // ISO timestamp when expires (null for exclusive = forever)
    };
    content: {
        hero: {
            nicknames: string;
            groom_nickname?: string;
            bride_nickname?: string;
            date: string;
            main_image: string;
        };
        couples: {
            pria: CoupleProfile;
            wanita: CoupleProfile;
        };
        events: {
            akad: EventDetail;
            resepsi: EventDetail;
        };
        gallery: {
            images: string[];
            video_url: string;
        };
        texts: {
            open_button: string;
            hero_title: string;
            hero_subtitle: string;
            couple_title: string;
            events_title: string;
            akad_title: string;
            resepsi_title: string;
            gallery_title: string;
            gift_title: string;
            gift_text: string;
            footer_text: string;
        };
        quote: {
            content: string;
            source: string;
        };
    };
    engagement: {
        rsvp_settings: {
            whatsapp_number: string;
            message_template: string;
        };
        rsvp: boolean;
        wishes: any[];
        guests: string[]; // List of guest names
        gifts: GiftAccount[];
        qris_url?: string; // TUS Uploaded QRIS Image
    };
}
