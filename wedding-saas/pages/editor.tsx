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
        gallery: { images: [], video_url: "" }
    },
    engagement: {
        rsvp: true,
        wishes: [],
        gifts: []
    }
};

export default function EditorPage() {
    const [data, setData] = useState<InvitationData>(INITIAL_DATA);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving' | 'error'>('saved');
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Initial Fetch (Simplified for Demo: fetching hardcoded slug)
    // In production, you might want to fetch based on query param or user session
    useEffect(() => {
        const fetchData = async () => {
            const { data: remoteData, error } = await supabase
                .from('invitations')
                .select('data')
                .eq('slug', INITIAL_DATA.metadata.slug)
                .single();

            if (remoteData?.data) {
                setData(remoteData.data as InvitationData);
            }
        };
        fetchData();
    }, []);

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
                        <button onClick={() => saveToSupabase()} className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-black transition-colors">
                            <Save size={14} /> Deploy
                        </button>
                    </div>
                </div>

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
