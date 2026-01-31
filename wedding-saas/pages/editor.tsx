// Path: /pages/editor.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Loader2, CheckCircle, Save, Globe, Eye, Settings } from 'lucide-react';
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
            akad: { enabled: true, date: "2024-12-31", time: "08:00", venue: "Verona Cathedral", address: "Italy", map_url: "" },
            resepsi: { enabled: true, date: "2024-12-31", time: "18:00", venue: "Capulet Hall", address: "Italy", map_url: "" }
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
    const [showSlugWarning, setShowSlugWarning] = useState(false);
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
            setShowSlugWarning(true);
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
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Sidebar - top on mobile, left on desktop */}
            <div className="w-full lg:w-[420px] lg:flex-shrink-0 z-30 lg:h-screen lg:sticky lg:top-0 shadow-2xl shadow-indigo-100/50">
                <EditorSidebar data={data} onUpdate={handleUpdate} />
            </div>

            <main className="flex-1 flex flex-col relative bg-[#F1F5F9]">
                {/* Header Navbar */}
                <div className="sticky top-0 lg:static h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4 lg:px-8 shadow-sm z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <Settings className="animate-spin-slow" size={18} />
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-slate-500 text-xs font-medium bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200">
                            <Globe size={12} /> <span className="truncate max-w-[150px] lg:max-w-none">weddinginvitation-18.vercel.app/{data.metadata.slug}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:flex text-[10px] font-bold uppercase text-slate-400 items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                            {saveStatus === 'saving' ? <Loader2 size={12} className="animate-spin text-indigo-500" /> :
                                saveStatus === 'error' ? <span className="text-red-500">Error!</span> :
                                    <CheckCircle size={12} className={saveStatus === 'saved' ? 'text-emerald-500' : 'text-amber-500'} />}
                            <span className="tracking-wider">{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Failed' : 'Unsaved'}</span>
                        </span>
                        <button
                            onClick={() => { saveToSupabase(); setShowPublishModal(true); }}
                            className="group relative overflow-hidden bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="relative flex items-center gap-2">
                                <Save size={14} /> Publish
                            </span>
                        </button>
                    </div>
                </div>

                {/* SLUG WARNING MODAL */}
                {showSlugWarning && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
                            <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <Settings size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Ganti Link Undangan</h3>
                            <p className="text-slate-500 text-sm text-center mb-6">
                                Sebelum mempublish, mohon ubah <b>Slug / Link Undangan</b> di menu <b>Settings</b> menjadi nama unik Anda (contoh: romeo-juliet).
                            </p>
                            <button
                                onClick={() => setShowSlugWarning(false)}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
                            >
                                Oke, Saya Ganti Sekarang
                            </button>
                        </div>
                    </div>
                )}

                {/* PUBLISH MODAL */}
                {showPublishModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300 border border-white/20">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                                    <CheckCircle size={36} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Undangan Terbit!</h2>
                                <p className="text-slate-500 text-sm leading-relaxed">Undangan pernikahan Anda berhasil disimpan dan siap disebarkan kepada tamu undangan.</p>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 space-y-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-indigo-500">
                                        <Globe size={18} />
                                    </div>
                                    <div className="flex-1 overflow-hidden min-w-0">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">PUBLIC LINK</p>
                                        <p className="text-sm font-semibold text-slate-700 truncate">weddinginvitation-18.vercel.app/{data.metadata.slug}</p>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-4 flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-amber-500">
                                        <Settings size={18} />
                                    </div>
                                    <div className="flex-1 overflow-hidden min-w-0">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">EDIT LINK (SECRET)</p>
                                        <div className="relative group">
                                            <p className="text-xs font-mono text-slate-600 truncate p-2 bg-white border border-slate-200 rounded-lg select-all">?edit={data.metadata.slug}</p>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                                            Simpan link ini untuk mengedit undangan
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setShowPublishModal(false)} className="flex-1 py-3.5 text-slate-600 font-bold text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                                    Tutup
                                </button>
                                <a
                                    href={`/${data.metadata.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Buka Link <Globe size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN PREVIEW AREA */}
                <div className="flex-1 flex items-center justify-center p-4 lg:p-10 shrink-0 min-h-[600px] lg:min-h-0 bg-[#F1F5F9] w-full">
                    {/* Phone Frame: Fixed aspect ratio on mobile too, locked height for scrolling */}
                    <div className="relative w-full max-w-[360px] aspect-[9/19] h-auto lg:h-[85vh] lg:w-auto lg:aspect-[9/19] bg-slate-900 rounded-[2.5rem] shadow-2xl border-[6px] border-slate-800 ring-1 ring-white/10 overflow-hidden transform-gpu translate-z-0">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center gap-2">
                            <div className="w-12 h-1 bg-slate-700 rounded-full opacity-50"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-600"></div>
                        </div>

                        {/* Screen Content */}
                        <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide overscroll-none scroll-smooth">
                            {renderTemplate()}
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2 z-40 pointer-events-none">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Spacing for scrolling */}
                <div className="h-10 lg:hidden"></div>
            </main>
        </div>
    );
}
