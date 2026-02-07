// Path: /components/EditorSidebar.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Type, Users, Calendar, Gift, Palette, Plus, Trash2, Settings, Quote, MessageSquare, Globe, Music, Video } from 'lucide-react'; // Tambah icon Music/Video
import ImageUploader from './ImageUploader';
import { InvitationData } from '../types/invitation';
import { supabase } from '@/lib/supabase';
import { TEMPLATES } from '../lib/templates';
import { getEffectivePlan, isAdmin } from '../lib/admin';
import DIYEditor from './DIYEditor';
import { BrandLogo } from './Logo';
import { uploadResumable } from '@/lib/tusUpload';
import GuestModal from './GuestModal';
import { getGuestLimit } from '@/lib/limits';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface EditorSidebarProps {
    data: InvitationData;
    onUpdate: (path: string, value: any) => void;
    userProfile?: any;
}

// Helper: Upload Direct via Native Fetch (Bypass Supabase Client Timeout)
const uploadDirect = async (file: File, path: string) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const bucketName = 'site-assets'; // Pastikan nama bucket benar

    if (!supabaseUrl || !supabaseKey) throw new Error("Missing Supabase Config");

    // Gunakan Fetch Native agar tidak kena "Signal Aborted" dari library
    const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucketName}/${path}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'x-upsert': 'true', // Timpa file jika ada
        },
        body: file // Kirim file mentah
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload Failed: ${response.status} - ${errorText}`);
    }

    // Return Public URL
    return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}`;
};

// 2. FUNGSI UPLOAD dipindahkan ke lib/tusUpload.ts

// ... (Komponen Input & SectionHeader TETAP SAMA seperti sebelumnya) ...
const Input = ({ label, value, onChange, placeholder, disabled, readOnly, subtext }: { label: string, value: any, onChange: (val: string) => void, placeholder?: string, disabled?: boolean, readOnly?: boolean, subtext?: React.ReactNode }) => (
    <div className="mb-5 group">
        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 group-focus-within:text-pink-500 transition-colors">{label}</label>
        <div className="relative">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={`w-full border text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium placeholder:text-slate-400 outline-none transition-all shadow-sm
                    ${disabled || readOnly ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed' : 'bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 group-hover:bg-white'}
                `}
            />
            {!disabled && !readOnly && <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-slate-300 pointer-events-none transition-colors" />}
        </div>
        {subtext && <div className="mt-1.5">{subtext}</div>}
    </div>
);

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
        <div className="p-1.5 bg-pink-50 rounded-lg text-pink-600">
            <Icon size={14} strokeWidth={2.5} />
        </div>
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">{title}</h3>
    </div>
);

const EditorSidebar: React.FC<EditorSidebarProps> = ({ data, onUpdate, userProfile }) => {
    const [activeTab, setActiveTab] = useState<'content' | 'events' | 'media' | 'design' | 'settings' | 'guest'>('content');
    const [plan, setPlan] = useState<'free' | 'basic' | 'premium' | 'exclusive'>('free');
    const [uploadingMusic, setUploadingMusic] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [tokens, setTokens] = useState<number>(5);

    // --- MUSIC SEARCH STATE ---
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);

    const searchMusic = async () => {
        if (!searchQuery) return;
        setIsSearching(true);
        try {
            // Limit 5 results, entity song
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&media=music&entity=song&limit=5`);
            const data = await res.json();
            setSearchResults(data.results);
        } catch (err) {
            console.error(err);
            alert("Gagal mencari lagu");
        } finally {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        const fetchPlan = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const effectivePlan = getEffectivePlan(
                    userProfile?.tier || 'free',
                    user.email
                ) as 'free' | 'basic' | 'premium' | 'exclusive';
                setPlan(effectivePlan);
                if (isAdmin(user.email)) {
                    setTokens(Infinity);
                } else {
                    setTokens(userProfile?.tokens ?? 5);
                }
            }
        };
        fetchPlan();
    }, [userProfile]);

    const getValue = (path: string) => {
        return path.split('.').reduce((o: any, i) => (o ? o[i] : ''), data);
    };

    const handleThemeChange = (themeId: string, tier: 'free' | 'basic' | 'premium' | 'exclusive') => {
        if (plan === 'free') {
            if (tier !== 'free') {
                alert('🔒 Template ini memerlukan upgrade ke ' + (tier === 'exclusive' ? 'Premium/Exclusive' : tier.toUpperCase()) + ' plan!');
                return;
            }
            if (tokens <= 0) {
                alert('❌ Token Anda habis! Upgrade ke Basic plan untuk unlimited edits.');
                return;
            }
            if (confirm(`🪙 Gunakan 1 token untuk ganti tema?\n\nSisa token: ${tokens - 1}/5`)) {
                setTokens(tokens - 1);
                onUpdate('metadata.theme_id', themeId);
            }
            return;
        }
        if (plan === 'basic') {
            if (tier === 'premium' || tier === 'exclusive') {
                alert('🔒 Template ini memerlukan upgrade ke ' + tier.toUpperCase() + ' plan!');
                return;
            }
            onUpdate('metadata.theme_id', themeId);
            return;
        }
        if (plan === 'premium') {
            if (tier === 'exclusive') {
                alert('🔒 Template Exclusive hanya untuk Exclusive plan!');
                return;
            }
            onUpdate('metadata.theme_id', themeId);
            return;
        }
        onUpdate('metadata.theme_id', themeId);
    };

    // --- PERBAIKAN UPLOAD MUSIK (Gunakan Native Fetch) ---
    // --- PERBAIKAN UPLOAD MUSIK (Gunakan Native Fetch) ---
    const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi
        if (file.size > 20 * 1024 * 1024) { // Naikkan limit ke 20MB karena TUS kuat
            alert("File musik maksimal 20MB.");
            return;
        }

        setUploadingMusic(true);
        try {
            // Panggil fungsi Resumable tadi
            // Pastikan bucket 'site-assets' sudah ada
            const publicUrl = await uploadResumable(file, 'site-assets', 'music');

            onUpdate('metadata.music_url', publicUrl);
            alert("Berhasil upload musik! (Resumable Upload)");
        } catch (error: any) {
            console.error("Music Upload Error:", error);
            alert('Gagal upload musik: ' + error.message);
        } finally {
            setUploadingMusic(false);
        }
    };

    // --- PERBAIKAN UPLOAD VIDEO (Gunakan Native Fetch) ---
    // --- PERBAIKAN UPLOAD VIDEO (Gunakan Native Fetch) ---
    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 50 * 1024 * 1024) { // Naikkan limit ke 50MB karena TUS kuat
            alert('File video maksimal 50MB.');
            return;
        }

        setUploadingVideo(true);
        try {
            // Panggil fungsi Resumable tadi
            const publicUrl = await uploadResumable(file, 'site-assets', 'videos');

            onUpdate('content.gallery.video_url', publicUrl);
            alert("Berhasil upload video! (Resumable Upload)");
        } catch (error: any) {
            console.error("Video Upload Error:", error);
            alert('Gagal upload video: ' + error.message);
        } finally {
            setUploadingVideo(false);
        }
    };

    return (
        <aside className="w-full h-[50vh] lg:h-screen flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-gray-200 z-30">
            {/* Logo area */}
            <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-white">
                <BrandLogo size={32} />
                <span className="font-bold text-slate-800 tracking-tight">UndanganKita<span className="text-pink-600">.</span></span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10 overflow-x-auto scrollbar-hide shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                {['content', 'events', 'media', 'design', 'guest', 'settings'].map(tab => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 min-w-[70px] py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative group
                                ${isActive ? 'text-pink-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                        >
                            {tab}
                            {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded-t-full shadow-[0_-2px_6px_rgba(236,72,153,0.3)]"></span>}
                        </button>
                    )
                })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#FAFAFA] space-y-5 custom-scrollbar pb-20 lg:pb-6">
                {activeTab === 'content' && (
                    <>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <SectionHeader icon={Layout} title="Hero Section" />
                            <Input label="Judul / Nicknames" value={getValue('content.hero.nicknames')} onChange={(v) => onUpdate('content.hero.nicknames', v)} />
                            <Input label="Tanggal (Teks)" value={getValue('content.hero.date')} onChange={(v) => onUpdate('content.hero.date', v)} placeholder="Contoh: 12 Desember 2024" />
                            <ImageUploader label="Foto Sampul Utama" currentUrl={data.content.hero.main_image} onUpdate={(url) => onUpdate('content.hero.main_image', url)} />
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <SectionHeader icon={Users} title="Mempelai" />
                            <Input label="Nama Pria" value={getValue('content.couples.pria.name')} onChange={(v) => onUpdate('content.couples.pria.name', v)} />
                            <Input label="Orang Tua Pria" value={getValue('content.couples.pria.parents')} onChange={(v) => onUpdate('content.couples.pria.parents', v)} />
                            <Input label="Instagram Pria (@username)" value={getValue('content.couples.pria.ig')} onChange={(v) => onUpdate('content.couples.pria.ig', v)} />
                            <ImageUploader label="Foto Pria" currentUrl={data.content.couples.pria.photo} onUpdate={(url) => onUpdate('content.couples.pria.photo', url)} />
                            <div className="my-8 flex items-center gap-4">
                                <div className="h-px bg-slate-100 flex-1"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                <div className="h-px bg-slate-100 flex-1"></div>
                            </div>
                            <Input label="Nama Wanita" value={getValue('content.couples.wanita.name')} onChange={(v) => onUpdate('content.couples.wanita.name', v)} />
                            <Input label="Orang Tua Wanita" value={getValue('content.couples.wanita.parents')} onChange={(v) => onUpdate('content.couples.wanita.parents', v)} />
                            <Input label="Instagram Wanita (@username)" value={getValue('content.couples.wanita.ig')} onChange={(v) => onUpdate('content.couples.wanita.ig', v)} />
                            <ImageUploader label="Foto Wanita" currentUrl={data.content.couples.wanita.photo} onUpdate={(url) => onUpdate('content.couples.wanita.photo', url)} />
                        </div>
                    </>
                )}

                {activeTab === 'events' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Calendar} title="Detail Acara" />
                        <div className="p-4 bg-slate-50 rounded-xl mb-6 ring-1 ring-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                                <p className="text-xs font-bold text-slate-700">AKAD NIKAH</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-end mb-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Tampilkan Acara Ini?</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={data.content.events.akad.enabled !== false} onChange={(e) => onUpdate('content.events.akad.enabled', e.target.checked)} className="sr-only peer" />
                                        <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pink-600"></div>
                                    </label>
                                </div>
                                {data.content.events.akad.enabled !== false && (
                                    <>
                                        <Input label="Tanggal (YYYY-MM-DD)" value={getValue('content.events.akad.date')} onChange={(v) => onUpdate('content.events.akad.date', v)} />
                                        <Input label="Waktu" value={getValue('content.events.akad.time')} onChange={(v) => onUpdate('content.events.akad.time', v)} />
                                        <Input label="Lokasi" value={getValue('content.events.akad.venue')} onChange={(v) => onUpdate('content.events.akad.venue', v)} />
                                        <Input label="Alamat" value={getValue('content.events.akad.address')} onChange={(v) => onUpdate('content.events.akad.address', v)} />
                                        <Input label="Link Google Maps" value={getValue('content.events.akad.map_url')} onChange={(v) => onUpdate('content.events.akad.map_url', v)} placeholder="https://maps.app.goo.gl/..." />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl ring-1 ring-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                                <p className="text-xs font-bold text-slate-700">RESEPSI</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-end mb-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Tampilkan Acara Ini?</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={data.content.events.resepsi.enabled !== false} onChange={(e) => onUpdate('content.events.resepsi.enabled', e.target.checked)} className="sr-only peer" />
                                        <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pink-600"></div>
                                    </label>
                                </div>
                                {data.content.events.resepsi.enabled !== false && (
                                    <>
                                        <Input label="Tanggal (YYYY-MM-DD)" value={getValue('content.events.resepsi.date')} onChange={(v) => onUpdate('content.events.resepsi.date', v)} />
                                        <Input label="Waktu" value={getValue('content.events.resepsi.time')} onChange={(v) => onUpdate('content.events.resepsi.time', v)} />
                                        <Input label="Lokasi" value={getValue('content.events.resepsi.venue')} onChange={(v) => onUpdate('content.events.resepsi.venue', v)} />
                                        <Input label="Alamat" value={getValue('content.events.resepsi.address')} onChange={(v) => onUpdate('content.events.resepsi.address', v)} />
                                        <Input label="Link Google Maps" value={getValue('content.events.resepsi.map_url')} onChange={(v) => onUpdate('content.events.resepsi.map_url', v)} placeholder="https://maps.app.goo.gl/..." />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'media' && (
                    <>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={Layout} title="Video Prewedding" />
                            <Input
                                label="Youtube / Vimeo URL"
                                value={getValue('content.gallery.video_url')}
                                onChange={(v) => {
                                    const ytMatch = v.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                                    if (ytMatch && ytMatch[1]) {
                                        onUpdate('content.gallery.video_url', `https://www.youtube.com/embed/${ytMatch[1]}`);
                                    } else {
                                        onUpdate('content.gallery.video_url', v);
                                    }
                                }}
                                placeholder="https://youtube.com/..."
                            />
                            {getValue('content.gallery.video_url') && (
                                <button
                                    onClick={() => onUpdate('content.gallery.video_url', '')}
                                    className="mt-2 text-[10px] text-red-500 flex items-center gap-1 font-bold hover:bg-red-50 px-2 py-1 rounded"
                                >
                                    <Trash2 size={12} /> Hapus Video
                                </button>
                            )}

                            <div className="mt-4 relative">
                                {(plan === 'free' || plan === 'basic') && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl border border-slate-100">
                                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">🔒 Premium Plan Only</div>
                                    </div>
                                )}
                                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold transition-all cursor-pointer ${uploadingVideo ? 'bg-slate-100 border-slate-300 text-slate-400' : 'border-slate-200 text-slate-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50'}`}>
                                    {uploadingVideo ? <Settings className="animate-spin" size={16} /> : <Video size={16} />}
                                    {uploadingVideo ? 'Mengupload... (Tunggu)' : 'Upload Video (MP4 Max 25MB)'}
                                    <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={plan === 'free' || plan === 'basic' || uploadingVideo} />
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={Palette} title="Galeri Foto" />
                            {plan === 'free' && (<div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl"><p className="text-xs text-amber-700 font-bold">⚠️ Free Plan: Maksimal 4 foto.</p></div>)}
                            <div className="grid grid-cols-2 gap-4">
                                {[0, 1, 2, 3, 4, 5, 6, 7].slice(0, plan === 'free' ? 4 : plan === 'basic' ? 6 : 8).map((idx) => (
                                    <ImageUploader key={idx} label={`Foto ${idx + 1}`} currentUrl={data.content.gallery.images[idx] || ''} onUpdate={(url) => { const newImages = [...(data.content.gallery.images || [])]; newImages[idx] = url; onUpdate('content.gallery.images', newImages); }} />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'design' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Palette} title="Tema & Musik" />

                        {/* TEMPLATE GRID (Tetap Sama) */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {TEMPLATES.map((template) => {
                                const isCurrent = data.metadata.theme_id === template.id;
                                let isLocked = false;
                                if (plan === 'free' && template.tier !== 'free') isLocked = true;
                                if (plan === 'basic' && (template.tier === 'premium' || template.tier === 'exclusive')) isLocked = true;
                                if (plan === 'premium' && template.tier === 'exclusive') isLocked = true;

                                return (
                                    <button
                                        key={template.id}
                                        onClick={() => handleThemeChange(template.id, template.tier as any)}
                                        className={`relative group rounded-xl overflow-hidden text-left transition-all duration-300 border-2
                                            ${isCurrent ? 'border-pink-500 ring-2 ring-pink-500/20 shadow-lg scale-[1.02]' : 'border-slate-100 hover:border-pink-300 hover:shadow-md'}
                                        `}
                                    >
                                        <div className="aspect-[3/4] bg-slate-100 relative">
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300 font-bold text-xs uppercase tracking-widest">
                                                {template.thumbnail_url ? (
                                                    <img src={template.thumbnail_url} alt={template.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{template.name}</span>
                                                )}
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                                            {isLocked && (
                                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-4 text-center">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{template.tier} Plan</span>
                                                </div>
                                            )}
                                            {isCurrent && (
                                                <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3 bg-white">
                                            <h4 className={`text-xs font-bold leading-tight mb-1 ${isCurrent ? 'text-pink-600' : 'text-slate-700'}`}>{template.name}</h4>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* DIY Editor */}
                        {(plan === 'premium' || plan === 'exclusive') && (
                            <DIYEditor initialLayout={data.metadata.diy_layout} plan={plan} onLayoutChange={(layout) => onUpdate('metadata.diy_layout', layout)} />
                        )}

                        {/* CUSTOM BACKGROUND */}
                        <div className="mb-6 border-b border-slate-100 pb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Background Custom</label>
                                {(plan === 'free' || plan === 'basic') && <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">PREMIUM</span>}
                            </div>
                            {(plan === 'free' || plan === 'basic') ? (
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                                    <p className="text-xs text-slate-500 mb-2">Upgrade ke Premium untuk ganti background.</p>
                                    <button disabled className="text-[10px] font-bold text-slate-400 bg-slate-200 px-3 py-1.5 rounded-lg cursor-not-allowed">Upload Background</button>
                                </div>
                            ) : (
                                <ImageUploader
                                    label="Upload Background Image"
                                    currentUrl={data.metadata.custom_bg_url || ''}
                                    onUpdate={(url) => onUpdate('metadata.custom_bg_url', url)}
                                />
                            )}
                        </div>

                        {/* MUSIC UPLOAD SECTION (Updated) */}
                        <div className="mb-4">
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Musik Latar</label>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <input type="text" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition" value={getValue('metadata.music_url')} onChange={(e) => onUpdate('metadata.music_url', e.target.value)} />
                                    {getValue('metadata.music_url') && (
                                        <button
                                            onClick={() => onUpdate('metadata.music_url', '')}
                                            className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                            title="Hapus Musik"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    {plan === 'free' && (<div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl border border-slate-100"><div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg">🔒 Basic Plan Only</div></div>)}
                                    <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold transition-all cursor-pointer ${uploadingMusic ? 'bg-slate-100 border-slate-300 text-slate-400' : 'border-slate-200 text-slate-500 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'}`}>
                                        {uploadingMusic ? <Settings className="animate-spin" size={16} /> : <Music size={16} />}
                                        {uploadingMusic ? 'Mengupload... (Tunggu)' : 'Upload MP3 (Pribadi)'}
                                        <input type="file" accept="audio/*" className="hidden" onChange={handleMusicUpload} disabled={plan === 'free' || uploadingMusic} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* MUSIC SEARCH (ITUNES) */}
                        <div className="mb-6 border-t border-slate-100 pt-6">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Cari Lagu (iTunes Preview)</label>
                                <span className="text-[9px] bg-green-100 text-green-600 px-2 py-0.5 rounded font-bold border border-green-200">FREE</span>
                            </div>

                            <div className="flex gap-2 mb-3">
                                <input
                                    className="flex-1 border text-sm px-3 py-2 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                                    placeholder="Judul lagu / Penyanyi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchMusic()}
                                />
                                <button
                                    onClick={searchMusic}
                                    disabled={isSearching}
                                    className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSearching ? '...' : 'Cari'}
                                </button>
                            </div>

                            {/* Hasil Pencarian */}
                            {searchResults.length > 0 && (
                                <div className="space-y-2 bg-white border border-slate-100 rounded-xl p-2 shadow-sm max-h-60 overflow-y-auto custom-scroll">
                                    {searchResults.map((track) => (
                                        <div key={track.trackId} className="flex items-center gap-3 p-2 hover:bg-pink-50 rounded-lg cursor-pointer transition group relative">
                                            <img src={track.artworkUrl60} className="w-10 h-10 rounded-lg shadow-sm bg-slate-200" alt="cover" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-800 truncate leading-tight mb-0.5">{track.trackName}</p>
                                                <p className="text-[10px] text-slate-500 truncate">{track.artistName}</p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onUpdate('metadata.music_url', track.previewUrl);
                                                }}
                                                className="text-[10px] bg-white border border-pink-200 text-pink-600 px-3 py-1.5 rounded-lg font-bold hover:bg-pink-600 hover:text-white transition shadow-sm"
                                            >
                                                Pilih
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'guest' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Users} title="Tamu Undangan" />

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                <Users size={32} className="text-pink-500" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">Kelola Daftar Tamu</h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Buat link unik untuk setiap tamu undangan Anda agar terasa lebih personal.
                            </p>

                            <div className="flex justify-center gap-4 text-xs font-bold text-slate-600 mb-6">
                                <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                                    Total Tamu: <span className="text-pink-600">{data.engagement?.guests?.length || 0}</span>
                                </div>
                                <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                                    Limit Tier: <span className="text-pink-600">{getGuestLimit(plan)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowGuestModal(true)}
                                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
                            >
                                <Settings size={16} /> Kelola Tamu
                            </button>
                        </div>
                    </div>
                )}

                {/* SETTINGS (TETAP SAMA) */}
                {activeTab === 'settings' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Settings} title="Pengaturan Umum" />
                        <div className="mb-8 bg-gradient-to-br from-pink-50 to-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Globe size={14} className="text-pink-500" />
                                <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest">LINK UNDANGAN (SLUG)</p>
                            </div>
                            <Input
                                label=""
                                value={getValue('metadata.slug')}
                                onChange={(v) => onUpdate('metadata.slug', v.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                                placeholder="contoh: romeo-juliet"
                                disabled={plan === 'free' || (userProfile?.slug_change_count >= userProfile?.max_slug_changes)}
                                subtext={
                                    plan === 'free' ? (
                                        <div className="flex items-center gap-2 text-[10px] text-amber-600 font-bold bg-amber-50 p-2 rounded-lg border border-amber-100">
                                            🔒 Akun Free tidak bisa ganti link. Upgrade ke Basic/Premium.
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <span className="text-[10px] text-slate-500">
                                                Sisa Kuota Ganti: <strong className="text-slate-800">{Math.max(0, (userProfile?.max_slug_changes || 0) - (userProfile?.slug_change_count || 0))}x</strong>
                                            </span>
                                            {userProfile?.slug_change_count >= userProfile?.max_slug_changes && (
                                                <span className="text-[10px] text-red-500 font-bold">Kuota Habis</span>
                                            )}
                                        </div>
                                    )
                                }
                            />
                            <p className="text-[10px] text-pink-400/70 mt-1 font-medium italic">Hanya huruf kecil, angka, dan strip (-).</p>
                        </div>
                        <div className="mb-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Kustomisasi Label Teks</h4>
                            <div className="space-y-1">
                                <Input label="Tombol Buka" value={getValue('content.texts.open_button') || 'Buka Undangan'} onChange={(v) => onUpdate('content.texts.open_button', v)} />
                                <Input label="Judul Hero (The Wedding Of)" value={getValue('content.texts.hero_title') || 'The Wedding Of'} onChange={(v) => onUpdate('content.texts.hero_title', v)} />
                                <Input label="Sub-Judul Hero" value={getValue('content.texts.hero_subtitle') || 'We Are Getting Married'} onChange={(v) => onUpdate('content.texts.hero_subtitle', v)} />
                                <Input label="Judul Bagian Pasangan" value={getValue('content.texts.couple_title') || 'The Couple'} onChange={(v) => onUpdate('content.texts.couple_title', v)} />
                                <Input label="Judul Akad Nikah" value={getValue('content.texts.akad_title') || 'Akad Nikah'} onChange={(v) => onUpdate('content.texts.akad_title', v)} />
                                <Input label="Judul Resepsi" value={getValue('content.texts.resepsi_title') || 'Resepsi'} onChange={(v) => onUpdate('content.texts.resepsi_title', v)} />
                                <Input label="Judul Galeri" value={getValue('content.texts.gallery_title') || 'Galeri Foto'} onChange={(v) => onUpdate('content.texts.gallery_title', v)} />
                                <Input label="Judul Amplop Digital" value={getValue('content.texts.gift_title') || 'Wedding Gift'} onChange={(v) => onUpdate('content.texts.gift_title', v)} />
                                <Input label="Judul RSVP" value={getValue('content.texts.rsvp_title') || 'R.S.V.P'} onChange={(v) => onUpdate('content.texts.rsvp_title', v)} />
                                <Input label="Teks Footer" value={getValue('content.texts.footer_text') || 'Thank you'} onChange={(v) => onUpdate('content.texts.footer_text', v)} />
                            </div>
                        </div>

                        {/* RSVP CONFIGURATION */}
                        <div className="mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare size={12} />
                                    Konfigurasi RSVP (WhatsApp)
                                </h4>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.engagement?.rsvp !== false}
                                        onChange={(e) => onUpdate('engagement.rsvp', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pink-600"></div>
                                </label>
                            </div>

                            {/* Conditional Rendering based on toggle */}
                            {data.engagement?.rsvp !== false && (
                                <div className="space-y-4">
                                    <Input
                                        label="Nomor WhatsApp Penerima"
                                        value={getValue('engagement.rsvp_settings.whatsapp_number') || ''}
                                        onChange={(v) => onUpdate('engagement.rsvp_settings.whatsapp_number', v)}
                                        placeholder="628123456789 (Tanpa + atau -)"
                                        subtext={<span className="text-[10px] text-slate-400">Gunakan format 62... (Contoh: 628123456789)</span>}
                                    />
                                    <div className="group">
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 group-focus-within:text-pink-500 transition-colors">Template Pesan WhatsApp</label>
                                        <textarea
                                            value={getValue('engagement.rsvp_settings.message_template') || "Halo, saya {name} ingin konfirmasi kehadiran untuk {pax} orang.\nStatus: {status}\nPesan: {message}"}
                                            onChange={(e) => onUpdate('engagement.rsvp_settings.message_template', e.target.value)}
                                            className="w-full border bg-white border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 transition-all min-h-[100px]"
                                        />
                                        <div className="mt-1.5 text-[10px] text-slate-400">
                                            Gunakan variabel: <code className="bg-slate-200 px-1 rounded text-slate-600">{`{name}`}</code>, <code className="bg-slate-200 px-1 rounded text-slate-600">{`{pax}`}</code>, <code className="bg-slate-200 px-1 rounded text-slate-600">{`{status}`}</code>, <code className="bg-slate-200 px-1 rounded text-slate-600">{`{message}`}</code>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* DIGITAL GIFT / AMPLOP CONFIGURATION */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Gift size={14} className="text-pink-500" />
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Amplop Digital & QRIS
                                </h4>
                            </div>

                            {/* BANK ACCOUNTS */}
                            <div className="space-y-3 mb-6">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Rekening Bank / E-Wallet</label>
                                {(data.engagement?.gifts || []).map((gift, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 relative group transition-all hover:border-pink-200 hover:shadow-sm">
                                        <button
                                            onClick={() => {
                                                const newGifts = [...(data.engagement?.gifts || [])];
                                                newGifts.splice(idx, 1);
                                                onUpdate('engagement.gifts', newGifts);
                                            }}
                                            className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="grid grid-cols-1 gap-2 pr-6">
                                            <input
                                                type="text"
                                                placeholder="Nama Bank (mis: BCA)"
                                                value={gift.bank}
                                                onChange={(e) => {
                                                    const newGifts = [...(data.engagement?.gifts || [])];
                                                    newGifts[idx].bank = e.target.value;
                                                    onUpdate('engagement.gifts', newGifts);
                                                }}
                                                className="text-xs font-bold text-slate-700 bg-transparent border-b border-slate-100 focus:border-pink-500 outline-none w-full py-1 placeholder:font-normal"
                                            />
                                            <input
                                                type="text"
                                                placeholder="No. Rekening"
                                                value={gift.acc_number}
                                                onChange={(e) => {
                                                    const newGifts = [...(data.engagement?.gifts || [])];
                                                    newGifts[idx].acc_number = e.target.value;
                                                    onUpdate('engagement.gifts', newGifts);
                                                }}
                                                className="text-xs text-slate-600 bg-transparent border-b border-slate-100 focus:border-pink-500 outline-none w-full py-1 font-mono"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Atas Nama"
                                                value={gift.holder}
                                                onChange={(e) => {
                                                    const newGifts = [...(data.engagement?.gifts || [])];
                                                    newGifts[idx].holder = e.target.value;
                                                    onUpdate('engagement.gifts', newGifts);
                                                }}
                                                className="text-xs text-slate-500 bg-transparent border-b border-slate-100 focus:border-pink-500 outline-none w-full py-1"
                                            />
                                        </div>
                                    </div>
                                ))}

                                {(data.engagement?.gifts?.length || 0) < 3 && (
                                    <button
                                        onClick={() => {
                                            const newGifts = [...(data.engagement?.gifts || [])];
                                            newGifts.push({ bank: '', acc_number: '', holder: '' });
                                            onUpdate('engagement.gifts', newGifts);
                                        }}
                                        className="w-full py-2 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-400 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50 transition flex items-center justify-center gap-2"
                                    >
                                        <Plus size={14} /> Tambah Rekening
                                    </button>
                                )}
                            </div>

                            {/* QRIS UPLOAD */}
                            <div className="pt-4 border-t border-slate-200">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">QRIS Image (Scan)</label>
                                <ImageUploader
                                    label="Upload QRIS"
                                    currentUrl={data.engagement?.qris_url || ''}
                                    onUpdate={(url) => onUpdate('engagement.qris_url', url)}
                                />
                                <p className="text-[9px] text-slate-400 mt-2 text-center">
                                    Upload gambar kode QRIS untuk memudahkan tamu memberikan hadiah.
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            {/* Guest Modal */}
            <GuestModal
                isOpen={showGuestModal}
                onClose={() => setShowGuestModal(false)}
                guestCount={data.engagement?.guests?.length || 0}
                maxGuests={getGuestLimit(plan)}
                baseUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/${data.metadata.slug}`}
                guests={data.engagement?.guests || []}
                onAddGuest={(name) => {
                    const newGuests = [...(data.engagement?.guests || [])];
                    newGuests.push(name);
                    onUpdate('engagement.guests', newGuests);
                }}
                onRemoveGuest={(index) => {
                    const newGuests = [...(data.engagement?.guests || [])];
                    newGuests.splice(index, 1);
                    onUpdate('engagement.guests', newGuests);
                }}
            />
        </aside>
    );
};

export default EditorSidebar;
