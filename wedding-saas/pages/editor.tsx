import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import EditorSidebar from '@/components/EditorSidebar';
import { TEMPLATES } from '@/lib/templates';
import { InvitationData } from '@/types/invitation';
import { Eye, Smartphone, Monitor, Save, ArrowLeft } from 'lucide-react';

export default function Editor() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [invitation, setInvitation] = useState<any>(null);
    const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
    const [data, setData] = useState<InvitationData | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }
        fetchInvitation();
    }, [user, authLoading]);

    const fetchInvitation = async () => {
        try {
            // 1. Cek Invitation
            const { data: existing, error } = await supabase.from('invitations').select('*').eq('user_id', user?.id).single();

            if (existing) {
                setInvitation(existing);
                // Merge DB Data with Defaults to prevent Crash
                const mergedData = mergeWithDefaults(existing.content, existing.metadata);
                setData(mergedData);
                setLoading(false);
            } else {
                // 2. Create if not exists (Auto-create)
                createStarterInvitation();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createStarterInvitation = async () => {
        const defaultSlug = `undangan-${Math.random().toString(36).substring(7)}`;
        const { data: newInv, error } = await supabase.from('invitations').insert({
            user_id: user?.id,
            slug: defaultSlug,
            metadata: { theme_id: 'modern-arch', tier: 'free' },
            content: {} // will trigger default merge
        }).select().single();

        if (newInv) {
            setInvitation(newInv);
            const mergedData = mergeWithDefaults({}, { theme_id: 'modern-arch', tier: 'free' });
            setData(mergedData);
            setLoading(false);
        } else {
            alert("Gagal membuat data awal. Silakan refresh.");
        }
    };

    const mergeWithDefaults = (content: any, metadata: any): InvitationData => {
        // Fallback structure
        return {
            metadata: {
                theme_id: metadata?.theme_id || 'modern-arch',
                slug: metadata?.slug || invitation?.slug || '',
                music_url: metadata?.music_url || '',
                custom_bg_url: metadata?.custom_bg_url || '',
                ...metadata
            },
            content: {
                hero: { nicknames: 'Romeo & Juliet', date: '2024-12-31', ...content?.hero },
                couples: {
                    pria: { name: 'Romeo Montague', parents: 'Mr. & Mrs. Montague', ...content?.couples?.pria },
                    wanita: { name: 'Juliet Capulet', parents: 'Mr. & Mrs. Capulet', ...content?.couples?.wanita }
                },
                events: {
                    akad: { date: '2024-12-31', time: '08:00', venue: 'Masjid Agung', address: 'Jalan Raya No. 1', ...content?.events?.akad },
                    resepsi: { date: '2024-12-31', time: '11:00', venue: 'Grand Ballroom', address: 'Jalan Raya No. 1', ...content?.events?.resepsi }
                },
                gallery: { images: [], video_url: '', ...content?.gallery },
                quote: { content: 'Love is in the air.', source: 'Anonymous', ...content?.quote },
                texts: { ...content?.texts },
                ...content
            },
            engagement: {
                rsvp: true,
                rsvp_settings: { whatsapp_number: '', message_template: '' },
                gifts: [],
                ...content?.engagement // Corrected: spread at root of engagement not inside gifts
            }
        };
    };

    const handleUpdate = (path: string, value: any) => {
        if (!data) return;

        // Deep clone & update
        const newData = JSON.parse(JSON.stringify(data));

        // Helper to set value by path string "content.hero.nicknames"
        const parts = path.split('.');
        let current = newData;
        for (let i = 0; i < parts.length - 1; i++) {
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;

        setData(newData);

        // Auto-save logic (Debounce could be added here preferably)
        // For now we save on blur or explicit save button to avoid spamming DB
    };

    const saveChanges = async () => {
        if (!invitation || !data) return;
        setSaving(true);
        try {
            const { error } = await supabase.from('invitations').update({
                content: data.content,
                metadata: data.metadata,
                // Update slug if changed in settings
                slug: data.metadata.slug
            }).eq('id', invitation.id);

            if (error) throw error;
            alert("Perubahan berhasil disimpan! ✅");
        } catch (err: any) {
            alert("Gagal menyimpan: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading || !data) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div></div>;

    // Find Active Template Component
    const ActiveTemplate = TEMPLATES.find(t => t.id === data.metadata.theme_id)?.component || (() => <div className="p-10 text-center">Template Not Found</div>);

    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans text-slate-900">
            <Head>
                <title>Editor Undangan - UndanganKita</title>
            </Head>

            {/* LEFT SIDEBAR (Controls) */}
            <div className="w-[400px] flex-shrink-0 flex flex-col border-r border-slate-200 bg-white z-20 shadow-xl">
                {/* Header Navbar in Sidebar */}
                <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between bg-white shrink-0">
                    <button onClick={() => router.push('/')} className="text-slate-500 hover:text-slate-800 transition flex items-center gap-2 text-sm font-bold">
                        <ArrowLeft size={18} /> Home
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={saving}
                        className="bg-pink-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-pink-700 transition flex items-center gap-2 shadow-lg shadow-pink-200"
                    >
                        <Save size={14} /> {saving ? 'Saving...' : 'Simpan'}
                    </button>
                </div>

                {/* EDITOR COMPONENT */}
                <div className="flex-1 overflow-hidden relative">
                    <EditorSidebar data={data} onUpdate={handleUpdate} />
                </div>
            </div>

            {/* MAIN PREVIEW AREA */}
            <div className="flex-1 bg-slate-100 relative flex flex-col h-full overflow-hidden">
                {/* Toobar */}
                <div className="h-16 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 shrink-0 z-10">
                    <div className="bg-slate-100 p-1 rounded-lg flex items-center">
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            className={`p-2 rounded-md transition ${previewMode === 'mobile' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Smartphone size={18} />
                        </button>
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            className={`p-2 rounded-md transition ${previewMode === 'desktop' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Monitor size={18} />
                        </button>
                    </div>
                    <a
                        href={`/${invitation?.slug}`}
                        target="_blank"
                        className="flex items-center gap-2 text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100 hover:bg-pink-100 transition"
                    >
                        <Eye size={14} /> Live Preview
                    </a>
                </div>

                {/* Canvas */}
                <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center cursor-default custom-scrollbar">
                    <div
                        className={`transition-all duration-500 bg-white shadow-2xl overflow-hidden origin-top
                            ${previewMode === 'mobile' ? 'w-[375px] min-h-[800px] rounded-[3rem] border-[8px] border-slate-800' : 'w-full h-full rounded-xl border border-slate-200'}
                        `}
                        style={{
                            transform: previewMode === 'mobile' ? 'scale(0.95)' : 'scale(1)'
                        }}
                    >
                        {/* Render Template with Live Data */}
                        <div className="w-full h-full overflow-y-auto scrollbar-hide">
                            <ActiveTemplate data={data} guestName="Tamu Undangan" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
