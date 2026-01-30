// Path: /types/invitation.ts

export interface CoupleProfile {
    name: string;
    parents: string;
    ig: string;
    photo: string;
}

export interface EventDetail {
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
        theme_id: 'modern-arch' | 'classic-serif' | 'botanical-line' | 'rustic-wood' | 'dark-luxury';
        music_url: string;
        is_active: boolean;
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
    };
    engagement: {
        rsvp: boolean;
        wishes: any[];
        gifts: GiftAccount[];
    };
}
