// Path: /pages/editor.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Loader2, CheckCircle, Save, Globe, Eye } from 'lucide-react';
import { InvitationData } from '../types/invitation';
import EditorSidebar from '../components/EditorSidebar';
import { supabase } from '../lib/supabase';

// Templates
import ModernArch from '../templates/ModernArch';
import ClassicSerif from '../templates/ClassicSerif';
import BotanicalLine from '../templates/BotanicalLine';
import RusticWood from '../templates/RusticWood';
import DarkLuxury from '../templates/DarkLuxury';

// Initial Data
const INITIAL_DATA: InvitationData = {
    metadata: {
        slug: "romeo-juliet",
        theme_id: "modern-arch",
        music_url: "https://www.bensound.com/bensound-music/bensound-love.mp3",
        is_active: true
    },
    content: {
        hero: { nicknames: "Romeo & Juliet", date: "2024-12-31", main_image: "" },
        couples: {
            pria: { name: "Romeo Montague", parents: "Putra Bpk. Montague", ig: "@romeo", photo: "" },
            wanita: { name: "Juliet Capulet", parents: "Putri Bpk. Capulet", ig: "@juliet", photo: "" }
        },
        events: {
            akad: { date: "2024-12-31", time: "08:00", venue: "Verona Cathedral", address: "Italy", map_url: "" },
            resepsi: { date: "2024-12-31", time: "18:00", venue: "Capulet Hall", address: "Italy", map_url: "" }
        },
        gallery: { images: [], video_url: "" },
        texts: {
            open_button: "Buka Undangan",
            hero_title: "The Wedding Of",
            hero_subtitle: "We Are Getting Married",
            couple_title: "The Couple",
            events_title: "Save The Date",
            akad_title: "Akad Nikah",
            resepsi_title: "Resepsi",
            gallery_title: "Our Memories",
            gift_title: "Wedding Gift",
            gift_text: "Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.",
            footer_text: "Thank you for being part of our story"
        },
        quote: {
            content: "And over all these virtues put on love, which binds them all together in perfect unity.",
            source: "Colossians 3:14"
        }
    },
    engagement: {
        rsvp_settings: {
            whatsapp_number: "6281234567890",
            message_template: "Halo, saya [Nama] ingin konfirmasi kehadiran untuk [Jumlah] orang. [Pesan]"
        },
        rsvp: true,
        wishes: [],
        gifts: []
    }
};

import { useRouter } from 'next/router';

export default function EditorPage() {
    const router = useRouter();
    const [data, setData] = useState<InvitationData>(() => ({
        ...INITIAL_DATA,
        metadata: {
            ...INITIAL_DATA.metadata,
            slug: `invitation-${Math.random().toString(36).substr(2, 6)}`
        }
    }));
    const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving' | 'error'>('saved');
    const [showPublishModal, setShowPublishModal] = useState(false);
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Initial Fetch (Simplified for Demo: fetching hardcoded slug)
    // In production, you might want to fetch based on query param or user session
    // Load Data from URL Slug if present
    useEffect(() => {
        if (!router.isReady) return;

        const slug = router.query.edit as string; // use ?edit=slug to load
        if (slug) {
            const fetchData = async () => {
                const { data: remoteData, error } = await supabase
                    .from('invitations')
                    .select('data')
                    .eq('slug', slug)
                    .single();

                if (remoteData?.data) {
                    setData(remoteData.data as InvitationData);
                }
            };
            fetchData();
        }
    }, [router.isReady, router.query]);

    const handleUpdate = useCallback((path: string, value: any) => {
        setData((prev) => {
            const newData = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
        setSaveStatus('unsaved');
    }, []);

    const saveToSupabase = useCallback(async () => {
        if (data.metadata.slug.startsWith('invitation-')) {
            alert('Mohon ubah "Link Undangan (Slug)" di menu Pengaturan (Settings) sebelum mempublish! Gunakan nama unik Anda.');
            // setActiveTab('settings'); // Cannot access child state directly
            return;
        }

        setSaveStatus('saving');
        try {
            const { error } = await supabase.from('invitations').upsert({
                slug: data.metadata.slug,
                data: data,
                updated_at: new Date().toISOString()
            }, { onConflict: 'slug' });

            if (error) throw error;
            setSaveStatus('saved');
        } catch (err: any) {
            console.error(err);
            setSaveStatus('error');
            alert(`Gagal menyimpan: ${err.message || 'Unknown error'}. Pastikan Anda sudah menjalankan query SQL di Supabase.`);
        }
    }, [data]);

    useEffect(() => {
        if (saveStatus === 'unsaved') {
            if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
            autoSaveTimerRef.current = setTimeout(saveToSupabase, 2000);
        }
        return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); };
    }, [data, saveStatus, saveToSupabase]);

    const renderTemplate = () => {
        switch (data.metadata.theme_id) {
            case 'classic-serif': return <ClassicSerif data={data} />;
            case 'botanical-line': return <BotanicalLine data={data} />;
            case 'rustic-wood': return <RusticWood data={data} />;
            case 'dark-luxury': return <DarkLuxury data={data} />;
            case 'modern-arch': default: return <ModernArch data={data} />;
        }
    };

    return (
        <div className="h-screen flex bg-gray-100 font-sans overflow-hidden">
            <EditorSidebar data={data} onUpdate={handleUpdate} />

            <main className="flex-1 flex flex-col relative bg-gray-200">
                <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <Globe size={16} /> <span>weddinginvitation-18.vercel.app/{data.metadata.slug}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1">
                            {saveStatus === 'saving' ? <Loader2 size={12} className="animate-spin" /> :
                                saveStatus === 'error' ? <span className="text-red-500">Error!</span> :
                                    <CheckCircle size={12} className={saveStatus === 'saved' ? 'text-green-500' : 'text-amber-500'} />}
                            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'All Saved' : saveStatus === 'error' ? 'Failed' : 'Unsaved'}
                        </span>
                        <button onClick={() => { saveToSupabase(); setShowPublishModal(true); }} className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-black transition-colors">
                            <Save size={14} /> Publish
                        </button>
                    </div>
                </div>

                {/* PUBLISH MODAL */}
                {showPublishModal && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Undangan Terbit!</h2>
                                <p className="text-gray-500 text-sm">Undangan pernikahan Anda berhasil disimpan dan siap dibagikan.</p>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                                <Globe size={20} className="text-gray-400 flex-shrink-0" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">PUBLIC LINK</p>
                                    <p className="text-sm font-medium text-indigo-600 truncate">weddinginvitation-18.vercel.app/{data.metadata.slug}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setShowPublishModal(false)} className="flex-1 py-3 text-gray-600 font-bold text-xs bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    Tutup
                                </button>
                                <a
                                    href={`/${data.metadata.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-center"
                                >
                                    Buka Link <Globe size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                    <div className="relative h-[85vh] aspect-[9/19] bg-black rounded-[3rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden ring-4 ring-gray-300/50">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-50"></div>
                        <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
                            {renderTemplate()}
                        </div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-lg border border-gray-200 flex items-center gap-2 z-40">
                            <Eye size={12} className="text-gray-500" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Live Preview</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
