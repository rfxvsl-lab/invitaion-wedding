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
    const [showSlugWarning, setShowSlugWarning] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }
        fetchInvitation();
    }, [user, authLoading]);

    const fetchInvitation = async () => {
        // Safety Timeout
        const timeout = setTimeout(() => {
            if (loading) {
                setLoading(false);
                alert("Loading took too long. Please refresh.");
            }
        }, 10000);

        try {
            console.log("Fetching invitation for user:", user?.id);
            // 1. Cek Invitation
            const { data: existing, error } = await supabase.from('invitations').select('*').eq('user_id', user?.id).limit(1).maybeSingle();

            if (error) {
                console.error("Supabase Error:", error);
                throw error;
            }

            if (existing) {
                console.log("Found existing invitation:", existing);
                setInvitation(existing);
                // Merge DB Data with Defaults to prevent Crash
                const mergedData = mergeWithDefaults(existing.content, existing.metadata);
                setData(mergedData);
                setLoading(false);
            } else {
                // 2. Create if not exists (Auto-create)
                console.log("No invitation found, creating new one...");
                await createStarterInvitation();
            }
        } catch (err: any) {
            console.error("Fetch Error:", err);
            alert("Gagal memuat data: " + err.message);
            setLoading(false);
        } finally {
            clearTimeout(timeout);
        }
    };

    const createStarterInvitation = async () => {
        const defaultSlug = `undangan-${Math.random().toString(36).substring(7)}`;
        console.log("Attempting to create invitation with slug:", defaultSlug);

        const { data: newInv, error } = await supabase.from('invitations').insert({
            user_id: user?.id,
            slug: defaultSlug,
            metadata: { theme_id: 'modern-arch', tier: 'free' },
            content: {} // will trigger default merge
        }).select().maybeSingle();

        if (error) {
            console.error('Error creating invitation:', error);
            alert("Gagal membuat data awal: " + (error?.message || "Unknown Error"));
            setLoading(false); // Ensure loading stops
            return;
        }

        if (newInv) {
            console.log("Created invitation:", newInv);
            setInvitation(newInv);
            const mergedData = mergeWithDefaults({}, { theme_id: 'modern-arch', tier: 'free' });
            setData(mergedData);
            setLoading(false);
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

        // 1. Check for Default Slug
        if (data.metadata.slug.startsWith('undangan-') && data.metadata.slug.length > 15) {
            // Assume random slug is "undangan-" + 7-8 random chars, so length usually > 15
            setShowSlugWarning(true);
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase.from('invitations').update({
                content: data.content,
                metadata: data.metadata,
                // Update slug if changed in settings
                slug: data.metadata.slug
            }).eq('id', invitation.id);

            if (error) throw error;

            // Show Success Modal instead of Alert
            setShowSuccessModal(true);

        } catch (err: any) {
            console.error("Save Error:", err);
            // Handle Unique Constraint Violation (Duplicate Slug)
            if (err.code === '23505' || err.message?.includes('invitations_slug_key')) {
                alert("Gagal Menyimpan: Link/Slug undangan ini sudah dipakai orang lain. Silakan ganti dengan yang lain di menu Settings.");
            } else {
                alert("Gagal menyimpan: " + err.message);
            }
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

            {/* SLUG WARNING MODAL */}
            {showSlugWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center animate-bounce-in">
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Ganti Link Undangan Dulu!</h3>
                        <p className="text-slate-600 mb-6">
                            Link undangan Anda masih default (acak). Silakan ganti menjadi nama yang cantik (misal: <strong>romeo-juliet</strong>) sebelum menyimpan.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowSlugWarning(false)}
                                className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    setShowSlugWarning(false);
                                    // Logic to focus on settings input would be nice, but simple close is OK for now.
                                    // User needs to go to settings manually.
                                    alert("Silakan buka tab 'SETTINGS' di sidebar kiri lalu ganti 'Link Undangan'.");
                                }}
                                className="px-6 py-2 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition"
                            >
                                Ganti Link Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center animate-bounce-in">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Save size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Undangan Berhasil Disimpan!</h3>
                        <p className="text-slate-600 mb-2">
                            Undangan Anda sudah siap disebar.
                        </p>
                        <div className="bg-slate-50 p-3 rounded-lg mb-6 border border-slate-200 font-mono text-sm text-slate-600 break-all select-all">
                            {typeof window !== 'undefined' ? window.location.origin : ''}/{data?.metadata.slug}
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition"
                            >
                                Tutup
                            </button>
                            <a
                                href={`/${data?.metadata.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition flex items-center gap-2"
                            >
                                <Eye size={16} /> Buka Undangan
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
