
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Templates
// Templates
import ClassicSerif from '../../templates/ClassicSerif';
import DarkLuxury from '../../templates/DarkLuxury';
import BotanicalLine from '../../templates/BotanicalLine';
import GamerQuest from '../../templates/GamerQuest';
import RoyalGlass from '../../templates/RoyalGlass';

// Types
import { InvitationData } from '../../types/invitation';

const DUMMY_DATA: InvitationData = {

    metadata: {
        theme_id: 'classic-serif',
        music_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        slug: 'demo-couple',
        is_active: true,
    },
    content: {
        hero: {
            nicknames: 'Romeo & Juliet',
            date: 'Minggu, 12 Desember 2024',
            main_image: 'https://images.unsplash.com/photo-1583939003579-73013917a611?q=80&w=1000&auto=format&fit=crop',
        },
        couples: {
            pria: {
                name: 'Romeo Montague',
                parents: 'Putra dari Bpk. Montague & Ibu Montague',
                ig: 'romeo.montague',
                photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
            },
            wanita: {
                name: 'Juliet Capulet',
                parents: 'Putri dari Bpk. Capulet & Ibu Capulet',
                ig: 'juliet.capulet',
                photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
            },
        },
        events: {
            akad: {
                enabled: true,
                date: '2024-12-12',
                time: '08:00 - 10:00 WIB',
                venue: 'Masjid Agung Verona',
                address: 'Jl. Verona Pusat No. 1, Italia',
                map_url: 'https://maps.app.goo.gl/xxxxx',
            },
            resepsi: {
                enabled: true,
                date: '2024-12-12',
                time: '11:00 - 13:00 WIB',
                venue: 'Grand Ballroom Verona',
                address: 'Jl. Verona Pusat No. 1, Italia',
                map_url: 'https://maps.app.goo.gl/xxxxx',
            },
        },
        gallery: {
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1522673607200-1645062e7d78?q=80&w=800&auto=format&fit=crop',
            ],
        },
        quote: {
            content: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
            source: "QS. Ar-Rum: 21",
        },
        texts: {
            open_button: 'Buka Undangan',
            hero_title: 'The Wedding Of',
            hero_subtitle: 'We Are Getting Married',
            couple_title: 'The Couple',
            events_title: 'Save The Date',
            akad_title: 'Akad Nikah',
            resepsi_title: 'Resepsi',
            gallery_title: 'Our Memories',
            gift_title: 'Wedding Gift',
            gift_text: 'Kehadiran dan doa restu Anda adalah kado terindah bagi kami.',
            footer_text: 'Thank You',
        },
    },
    engagement: {
        rsvp: true,
        rsvp_settings: {
            whatsapp_number: '628123456789',
            message_template: 'Halo, saya [Nama] akan hadir...',
        },
        gifts: [
            { bank: 'BCA', acc_number: '1234567890', holder: 'Romeo Montague' },
            { bank: 'Mandiri', acc_number: '0987654321', holder: 'Juliet Capulet' },
        ],
        wishes: [],
    },
};

const THEMES: Record<string, any> = {
    'classic-serif': ClassicSerif,
    'dark-luxury': DarkLuxury,
    'botanical-line': BotanicalLine,
    'gamer-quest': GamerQuest,
    'royal-glass': RoyalGlass,
};


export default function DemoPage() {
    const router = useRouter();
    const { slug } = router.query;

    // Default to Classic if slug not found
    const themeId = (slug as string) || 'classic-serif';
    const Template = THEMES[themeId] || ClassicSerif;

    // Use dummy data but override theme_id
    const demoData: InvitationData = {
        ...DUMMY_DATA,
        metadata: {
            ...DUMMY_DATA.metadata,
            theme_id: themeId as any,
        }
    };

    return (
        <>
            <Head>
                <title>Demo Tema - UndanganKita</title>
                <meta name="robots" content="noindex" />
            </Head>

            {/* Demo Banner */}
            <div className="fixed top-0 left-0 w-full bg-slate-900 text-white text-xs font-bold py-2 px-4 z-[9999] flex justify-between items-center shadow-md">
                <span>👁️ Mode Preview Demo</span>
                <div className="flex gap-4">
                    <button onClick={() => router.push('/')} className="hover:text-pink-400 underline">
                        &larr; Kembali
                    </button>
                    <button onClick={() => router.push('/login')} className="bg-pink-600 px-3 py-1 rounded-full hover:bg-pink-700 transition">
                        Buat Undangan
                    </button>
                </div>
            </div>

            <div className="pt-8"> {/* Spacer for banner */}
                <Template data={demoData} />
            </div>
        </>
    );
}
