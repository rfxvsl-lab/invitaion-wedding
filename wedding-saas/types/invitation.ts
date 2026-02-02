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

export interface InvitationData {
    metadata: {
        slug: string;
        theme_id: 'modern-arch' | 'classic-serif' | 'botanical-line' | 'rustic-wood' | 'dark-luxury' | 'premium-peppy' | 'gamer-quest' | 'maroon-vintage' | 'adat-bone' | 'elegant-vanilla' | 'royal-glass' | 'netflix-luxury' | 'grand-ballroom' | 'royal-arabian';
        music_url: string;
        custom_bg_url?: string; // Optional custom background
        is_active: boolean;
        published_at?: string; // ISO timestamp when published
        expires_at?: string; // ISO timestamp when expires (null for exclusive = forever)
    };
    content: {
        hero: {
            nicknames: string;
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
        gifts: GiftAccount[];
    };
}
