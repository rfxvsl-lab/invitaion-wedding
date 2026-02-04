import { useRouter } from 'next/router';
import Head from 'next/head';
import { TEMPLATES } from '@/lib/templates';
import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThemePreview() {
    const router = useRouter();
    const { themeId } = router.query;

    const ActiveTemplate = useMemo(() => {
        return TEMPLATES.find(t => t.id === themeId)?.component;
    }, [themeId]);

    // Dummy Data for Preview
    const dummyData = {
        metadata: {
            theme_id: themeId,
            music_url: '',
            custom_bg_url: ''
        },
        content: {
            hero: {
                nicknames: 'Romeo & Juliet',
                title: 'The Wedding of',
                date: '2024-12-31'
            },
            couples: {
                pria: { name: 'Romeo Montague', parents: 'Mr. & Mrs. Montague' },
                wanita: { name: 'Juliet Capulet', parents: 'Mr. & Mrs. Capulet' }
            },
            events: {
                akad: { date: '2024-12-31', time: '08:00', venue: 'Masjid Agung', address: 'Jl. Ahmad Yani No. 1' },
                resepsi: { date: '2024-12-31', time: '11:00', venue: 'Grand Ballroom', address: 'Jl. Merdeka No. 99' }
            },
            gallery: { images: [] },
            quote: { content: "Love is not about looking at each other, but looking in the same direction.", source: "Antoine de Saint-Exupéry" },
            texts: { greeting: "Assalamu'alaikum Wr. Wb." }
        },
        engagement: {
            rsvp: false,
            gifts: []
        }
    };

    if (!router.isReady) return <div>Loading...</div>;

    if (!ActiveTemplate) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold text-red-500">Tema Tidak Ditemukan</h1>
                <p>ID Tema: {themeId}</p>
                <Link href="/" className="text-blue-500 underline">Kembali ke Home</Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            <Head>
                <title>Preview Tema: {themeId}</title>
            </Head>

            {/* Floating Back Button */}
            <div className="fixed top-4 left-4 z-50">
                <Link href="/themes" className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-white transition text-sm font-bold border border-slate-200">
                    <ArrowLeft size={16} /> Kembali
                </Link>
            </div>

            <ActiveTemplate data={dummyData} guestName="Tamu Undangan" />
        </div>
    );
}
