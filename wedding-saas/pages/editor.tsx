import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import EditorSidebar from '@/components/EditorSidebar';
import { TEMPLATES } from '@/lib/templates';
import { InvitationData } from '@/types/invitation';
import { Eye, Smartphone, Monitor, Save, ArrowLeft } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

export default function Editor() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    // State
    const [loading, setLoading] = useState(true);
    const [invitation, setInvitation] = useState<any>(null);
    const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
    const [data, setData] = useState<InvitationData | null>(null);
    const [saving, setSaving] = useState(false);
    const [showSlugWarning, setShowSlugWarning] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Profile Stats for restrictions
    const [profileStats, setProfileStats] = useState<any>(null);

    const isDefaultSlug = (slug: string) => {
        return slug && slug.startsWith('undangan-') && slug.length > 15;
    };

    useEffect(() => {
        if (data && isDefaultSlug(data.metadata.slug)) {
            setShowSlugWarning(true);
        }
    }, [data?.metadata.slug]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }
        // Use a ref or check if we already have data? 
        // Actually just relying on user.id is enough to stop loops on token refresh.
        fetchInvitation();
    }, [user?.id, authLoading]);

    // Send to Iframe with Debounce (Optimized Frame Rate)
    const sendToIframe = useDebouncedCallback((payload) => {
        const iframe = document.getElementById('preview-frame') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ type: 'UPDATE_DATA', payload }, '*');
        }
    }, 500);

    // SYNC DATA TO IFRAME (Handshake Version)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'PREVIEW_READY' && data) {
                // Initial load: Send immediately
                sendToIframe.flush();
                const iframe = document.getElementById('preview-frame') as HTMLIFrameElement;
                iframe?.contentWindow?.postMessage({ type: 'UPDATE_DATA', payload: data }, '*');
            }
        };
        window.addEventListener('message', handleMessage);

        // When data changes, use Debounce!
        if (data) {
            sendToIframe(data);
        }

        return () => {
            window.removeEventListener('message', handleMessage);
            sendToIframe.cancel(); // Cleanup pending debounce
        };
    }, [data, sendToIframe]);

    const fetchInvitation = async () => {
        // Safety Timeout
        const timeout = setTimeout(() => {
            if (loading) {
                setLoading(false);
                // Don't alert here to avoid annoyance, just log
                console.warn("Loading timeout reached");
            }
        }, 15000);

        try {
            console.log("Fetching data for user:", user?.id);

            // 0. Fetch Profile Stats (Tier, Limits)
            const { data: profile } = await supabase.from('profiles').select('tier, max_slug_changes, slug_change_count').eq('id', user?.id).single();
            setProfileStats(profile);

            // 1. Cek Invitation
            const { data: existing, error } = await supabase.from('invitations').select('*').eq('user_id', user?.id).limit(1).maybeSingle();

            if (error) throw error;

            if (existing) {
                setInvitation(existing);
                // Pass existing.slug explicitly to ensure it is picked up
                const mergedData = mergeWithDefaults(existing.content, existing.metadata, existing.slug);
                setData(mergedData);
                setLoading(false);
            } else {
                // LOGIKA SLUG ACAK DIHAPUS - User harusnya sudah punya data dari Onboarding
                console.warn("No invitation found for this user.");
                alert("Data undangan tidak ditemukan. Pastikan Anda sudah menyelesaikan proses pendaftaran/onboarding.");
                setLoading(false);
            }
        } catch (err: any) {
            console.error("Fetch Error:", err);
            alert("Gagal memuat data: " + err.message);
            setLoading(false);
        } finally {
            clearTimeout(timeout);
        }
    };

    // Removed createStarterInvitation as per request to avoid random slugs

    const mergeWithDefaults = (content: any, metadata: any, rootSlug?: string): InvitationData => {
        // Fallback structure
        return {
            metadata: {
                theme_id: metadata?.theme_id || 'modern-arch',
                // Use rootSlug (from DB column) if metadata.slug is missing
                slug: metadata?.slug || rootSlug || invitation?.slug || '',
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
                guests: [], // Initialize guests list
                rsvp_settings: { whatsapp_number: '', message_template: '' },
                gifts: [],
                ...content?.engagement // Spread last to override defaults if exists
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
        if (!invitation?.id || !data) {
            console.error("Save failed: Missing invitation ID or data");
            return;
        }

        // 1. Check for Default Slug
        if (isDefaultSlug(data.metadata.slug)) {
            setShowSlugWarning(true);
            return;
        }

        setSaving(true);
        try {
            // Slug Change Logic
            let shouldIncrementCount = false;
            if (data.metadata.slug !== invitation.slug) {
                // Check if user allowed to change
                if (profileStats?.tier === 'free') {
                    // For legacy/free users, if they change slug, we block it unless checking is skipped (e.g. initial setup)
                    // But here we enforce strict rules.
                    throw new Error("User Free tidak dapat mengganti link undangan. Upgrade ke Basic/Premium.");
                }

                const currentCount = profileStats?.slug_change_count || 0;
                const maxChanges = profileStats?.max_slug_changes || 0;

                if (currentCount >= maxChanges) {
                    throw new Error(`Kuota ganti link habis (${maxChanges}x). Upgrade plan untuk menambah kuota.`);
                }
                shouldIncrementCount = true;
            }

            // Use Native Fetch to bypass Supabase Client AbortController issues
            const updateWithNativeFetch = async (): Promise<void> => {
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
                const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

                if (!supabaseUrl || !supabaseKey) {
                    throw new Error("Missing Supabase config");
                }

                const payload = {
                    content: { ...data.content, engagement: data.engagement },
                    metadata: data.metadata,
                    slug: data.metadata.slug,
                    updated_at: new Date().toISOString()
                };

                const response = await fetch(
                    `${supabaseUrl}/rest/v1/invitations?id=eq.${invitation.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': supabaseKey,
                            'Authorization': `Bearer ${supabaseKey}`,
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(payload)
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    // Check for duplicate key error
                    if (errorText.includes('invitations_slug_key') || errorText.includes('23505')) {
                        throw { code: '23505', message: 'Slug sudah dipakai' };
                    }
                    throw new Error(`Save failed: ${response.status} - ${errorText}`);
                }
            };

            await updateWithNativeFetch();

            // Increment Count if success
            if (shouldIncrementCount && user) {
                await supabase.rpc('increment_slug_count', { p_user_id: user.id });
                // Update local state
                setProfileStats({ ...profileStats, slug_change_count: (profileStats?.slug_change_count || 0) + 1 });
                // Update invitation state to reflect new slug as 'current'
                setInvitation({ ...invitation, slug: data.metadata.slug });
            }

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

    const handleLivePreview = () => {
        if (data && isDefaultSlug(data.metadata.slug)) {
            setShowSlugWarning(true);
        } else if (invitation?.slug) {
            window.open(`/${invitation.slug}`, '_blank');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden font-sans text-slate-900">
            <Head>
                <title>Editor Undangan - UndanganKita</title>
            </Head>

            {/* LEFT SIDEBAR (Controls) */}
            <div className="w-full lg:w-[400px] h-[50vh] lg:h-full flex-shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 bg-white z-20 shadow-xl">
                {/* Header Navbar in Sidebar */}
                <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between bg-white shrink-0">
                    <button
                        onClick={() => router.push(user?.email === 'mhmmadridho64@gmail.com' ? '/admin' : '/dashboard/user')}
                        className="text-slate-500 hover:text-slate-800 transition flex items-center gap-2 text-sm font-bold"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </button>
                    <button
                        type="button"
                        onClick={saveChanges}
                        disabled={saving}
                        className="bg-pink-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-pink-700 transition flex items-center gap-2 shadow-lg shadow-pink-200"
                    >
                        <Save size={14} /> {saving ? 'Saving...' : 'Simpan'}
                    </button>
                </div>

                {/* EDITOR COMPONENT */}
                <div className="flex-1 overflow-hidden relative">
                    <EditorSidebar data={data} onUpdate={handleUpdate} userProfile={profileStats} />
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
                    <button
                        onClick={handleLivePreview}
                        className="flex items-center gap-2 text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100 hover:bg-pink-100 transition"
                    >
                        <Eye size={14} /> Live Preview
                    </button>
                </div>

                {/* Canvas */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex items-start justify-center cursor-default custom-scrollbar bg-slate-200/50">
                    <div
                        className={`transition-all duration-500 bg-white shadow-2xl overflow-hidden origin-top
                            ${previewMode === 'mobile' ? 'w-[375px] h-[812px] rounded-[3rem] border-[12px] border-slate-900 shadow-xl' : 'w-full h-full rounded-none lg:rounded-xl border border-slate-200'}
                        `}
                        style={{
                            transform: previewMode === 'mobile' ? 'scale(0.85) lg:scale(0.95)' : 'scale(1)'
                        }}
                    >
                        {/* IFRAME PREVIEWER */}
                        <iframe
                            id="preview-frame"
                            src="/preview-renderer"
                            className="w-full h-full bg-white"
                            title="Preview"
                            onLoad={(e) => {
                                // Send initial data when iframe loads
                                const iframe = e.currentTarget;
                                if (iframe.contentWindow && data) {
                                    iframe.contentWindow.postMessage({ type: 'UPDATE_DATA', payload: data }, '*');
                                }
                            }}
                        />
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
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Peringatan Link Undangan</h3>
                        <p className="text-slate-600 mb-6 font-medium">
                            KAMU BELUM MENGGANTI SLUG PADA SETTING.<br />
                            GANTI SEKARANG DENGAN NAMA ANDA DAN PASANGAN.
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
                                    alert("Silakan buka tab 'SETTINGS' di sidebar kiri lalu ganti 'Link Undangan'.");
                                }}
                                className="px-6 py-2 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition"
                            >
                                Ganti Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
                                Edit Lagi
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
