// Path: /components/EditorSidebar.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Type, Users, Calendar, Gift, Palette, Plus, Trash2, Settings, Quote, MessageSquare, Globe } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { InvitationData } from '../types/invitation';
import { supabase } from '@/lib/supabase';
import { TEMPLATES } from '../lib/templates';
import { getEffectivePlan, isAdmin } from '../lib/admin';
import DIYEditor from './DIYEditor';
import { BrandLogo } from './Logo';

interface EditorSidebarProps {
    data: InvitationData;
    onUpdate: (path: string, value: any) => void;
    userProfile?: any;
}

// Moved Input component outside to prevent re-mounting on every render
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
    const [activeTab, setActiveTab] = useState<'content' | 'events' | 'media' | 'design' | 'settings'>('content');
    const [plan, setPlan] = useState<'free' | 'basic' | 'premium' | 'exclusive'>('free');
    const [uploadingMusic, setUploadingMusic] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [tokens, setTokens] = useState<number>(5);

    useEffect(() => {
        // Fetch User Plan with admin override
        const fetchPlan = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // If userProfile passed from parent, use that for tier/tokens to be consistent
                const effectivePlan = getEffectivePlan(
                    userProfile?.tier || 'free',
                    user.email
                ) as 'free' | 'basic' | 'premium' | 'exclusive';

                setPlan(effectivePlan);

                // Admin users get unlimited tokens (bypass token system)
                if (isAdmin(user.email)) {
                    setTokens(Infinity); // Unlimited for admin
                } else {
                    // Regular users: use tokens from DB or default to 5
                    setTokens(userProfile?.tokens ?? 5);
                }
            }
        };
        fetchPlan();
    }, [userProfile]); // Update when userProfile changes

    const getValue = (path: string) => {
        return path.split('.').reduce((o: any, i) => (o ? o[i] : ''), data);
    };

    // ... (rest of handleThemeChange, uploads, etc. - keep existing logic but just update the Settings tab content at the end)

    const handleThemeChange = (themeId: string, tier: 'free' | 'basic' | 'premium' | 'exclusive') => {
        // Logic same as before...
        // FREE TIER: Block non-free themes + Token system
        if (plan === 'free') {
            if (tier !== 'free') {
                alert('🔒 Template ini memerlukan upgrade ke ' + (tier === 'exclusive' ? 'Premium/Exclusive' : tier.toUpperCase()) + ' plan!');
                return;
            }
            // Token system for free tier
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

        // BASIC TIER: Allow Free + Basic templates only
        if (plan === 'basic') {
            if (tier === 'premium' || tier === 'exclusive') {
                alert('🔒 Template ini memerlukan upgrade ke ' + tier.toUpperCase() + ' plan!');
                return;
            }
            onUpdate('metadata.theme_id', themeId);
            return;
        }

        // PREMIUM TIER: Allow all except Exclusive
        if (plan === 'premium') {
            if (tier === 'exclusive') {
                alert('🔒 Template Exclusive hanya untuk Exclusive plan!');
                return;
            }
            onUpdate('metadata.theme_id', themeId);
            return;
        }

        // EXCLUSIVE/OTHER: Allow all templates
        onUpdate('metadata.theme_id', themeId);
    };

    // ... (Use existing handleMusicUpload and handleVideoUpload)
    const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type.startsWith('video/')) {
            alert("Mohon maaf, fitur konversi otomatis MP4 ke MP3 belum tersedia. Silakan upload file .MP3 untuk performa terbaik.");
            return;
        }
        if (!file.type.startsWith('audio/')) {
            alert("Mohon upload file audio (MP3).");
            return;
        }
        setUploadingMusic(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;
            const { error: uploadError } = await supabase.storage.from('music').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from('music').getPublicUrl(filePath);
            onUpdate('metadata.music_url', publicUrl);
        } catch (error: any) {
            alert('Gagal upload musik: ' + error.message);
        } finally {
            setUploadingMusic(false);
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 50 * 1024 * 1024) {
            alert('Ukuran video maksimal 50MB!');
            return;
        }
        if (!file.type.startsWith('video/')) {
            alert('Mohon upload file video (MP4, MOV, etc).');
            return;
        }
        setUploadingVideo(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;
            const { error: uploadError } = await supabase.storage.from('videos').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from('videos').getPublicUrl(filePath);
            onUpdate('content.gallery.video_url', publicUrl);
        } catch (error: any) {
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
                {['content', 'events', 'media', 'design', 'settings'].map(tab => {
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

                {/* EVENTS - keep same as before */}
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

                {/* MEDIA & DESIGN - keep similar but abbreviate for now to fit */}
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
                            {/* ... video upload part ... */}
                            <div className="mt-4 relative">
                                {(plan === 'free' || plan === 'basic') && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl border border-slate-100">
                                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">🔒 Premium Plan Only</div>
                                    </div>
                                )}
                                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold transition-all cursor-pointer ${uploadingVideo ? 'bg-slate-100 border-slate-300 text-slate-400' : 'border-slate-200 text-slate-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50'}`}>
                                    {uploadingVideo ? <Settings className="animate-spin" size={16} /> : <Layout size={16} />}
                                    {uploadingVideo ? 'Mengupload...' : 'Upload Video (MP4/MOV)'}
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

                {/* DESIGN - shortened for brevity since logic was correct... */}
                {activeTab === 'design' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Palette} title="Tema & Musik" />
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
                                            {/* Preview Image Mockup */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300 font-bold text-xs uppercase tracking-widest">
                                                {template.thumbnail ? (
                                                    <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{template.name}</span>
                                                )}
                                            </div>

                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                                            {/* Lock Overlay */}
                                            {isLocked && (
                                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-4 text-center">
                                                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2">
                                                        <Gift size={14} />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                                        {template.tier} Plan
                                                    </span>
                                                </div>
                                            )}

                                            {/* Active Indicator */}
                                            {isCurrent && (
                                                <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-3 bg-white">
                                            <h4 className={`text-xs font-bold leading-tight mb-1 ${isCurrent ? 'text-pink-600' : 'text-slate-700'}`}>
                                                {template.name}
                                            </h4>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                                                    ${template.tier === 'free' ? 'bg-slate-100 text-slate-500' :
                                                        template.tier === 'basic' ? 'bg-blue-50 text-blue-600' :
                                                            template.tier === 'premium' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'}
                                                `}>
                                                    {template.tier}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {/* DIY Editor ... */}
                        {(plan === 'premium' || plan === 'exclusive') && (
                            <DIYEditor initialLayout={data.metadata.diy_layout} plan={plan} onLayoutChange={(layout) => onUpdate('metadata.diy_layout', layout)} />
                        )}

                        {/* CUSTOM BACKGROUND SECTION */}
                        <div className="mb-6 border-b border-slate-100 pb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Background Custom</label>
                                {(plan === 'free' || plan === 'basic') && <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">PREMIUM</span>}
                            </div>

                            {/* Locked Overlay for Free/Basic */}
                            {(plan === 'free' || plan === 'basic') ? (
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                                    <p className="text-xs text-slate-500 mb-2">Upgrade ke Premium untuk ganti background sesuka hati.</p>
                                    <button disabled className="text-[10px] font-bold text-slate-400 bg-slate-200 px-3 py-1.5 rounded-lg cursor-not-allowed">
                                        Upload Background
                                    </button>
                                </div>
                            ) : (
                                <ImageUploader
                                    label="Upload Background Image"
                                    currentUrl={data.metadata.custom_bg_url}
                                    onUpdate={(url) => onUpdate('metadata.custom_bg_url', url)}
                                />
                            )}
                            <p className="text-[10px] text-slate-400 mt-2 italic">Kosongkan jika ingin menggunakan background bawaan tema.</p>
                        </div>

                        {/* Music Section ... */}
                        <div className="mb-4">
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Musik Latar</label>
                            <div className="flex flex-col gap-3">
                                <input type="text" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition" value={getValue('metadata.music_url')} onChange={(e) => onUpdate('metadata.music_url', e.target.value)} />
                                <div className="relative">
                                    {plan === 'free' && (<div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl border border-slate-100"><div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg">🔒 Basic Plan Only</div></div>)}
                                    <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold transition-all cursor-pointer ${uploadingMusic ? 'bg-slate-100 border-slate-300 text-slate-400' : 'border-slate-200 text-slate-500 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'}`}>
                                        {uploadingMusic ? 'Mengupload...' : 'Upload MP3 (Pribadi)'}
                                        <input type="file" accept="audio/*" className="hidden" onChange={handleMusicUpload} disabled={plan === 'free' || uploadingMusic} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* QUOTE SECTION */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-4">
                            <SectionHeader icon={Quote} title="Kutipan (Quote)" />
                            <div className="mb-4">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Isi Kutipan</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition resize-none h-24"
                                    value={getValue('content.quote.content')}
                                    onChange={(e) => onUpdate('content.quote.content', e.target.value)}
                                    placeholder="Tulis kutipan indah di sini..."
                                />
                            </div>
                            <Input label="Sumber / Penulis" value={getValue('content.quote.source')} onChange={(v) => onUpdate('content.quote.source', v)} />
                        </div>

                        {/* GIFT SECTION */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-4">
                            <SectionHeader icon={Gift} title="Amplop Digital (Hadiah)" />

                            {data.engagement.gifts?.map((gift: any, index: number) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 group relative hover:border-pink-200 transition-colors">
                                    <button
                                        onClick={() => {
                                            const newGifts = [...(data.engagement.gifts || [])];
                                            newGifts.splice(index, 1);
                                            onUpdate('engagement.gifts', newGifts);
                                        }}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition p-1"
                                    >
                                        <Trash2 size={14} />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Bank / E-Wallet</label>
                                            <input
                                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-pink-500"
                                                value={gift.bank_name}
                                                onChange={(e) => {
                                                    const newGifts = [...(data.engagement.gifts || [])];
                                                    newGifts[index].bank_name = e.target.value;
                                                    onUpdate('engagement.gifts', newGifts);
                                                }}
                                                placeholder="BCA"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">No. Rekening</label>
                                            <input
                                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-pink-500"
                                                value={gift.account_number}
                                                onChange={(e) => {
                                                    const newGifts = [...(data.engagement.gifts || [])];
                                                    newGifts[index].account_number = e.target.value;
                                                    onUpdate('engagement.gifts', newGifts);
                                                }}
                                                placeholder="1234567890"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Atas Nama</label>
                                        <input
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-pink-500"
                                            value={gift.account_holder}
                                            onChange={(e) => {
                                                const newGifts = [...(data.engagement.gifts || [])];
                                                newGifts[index].account_holder = e.target.value;
                                                onUpdate('engagement.gifts', newGifts);
                                            }}
                                            placeholder="Nama Pemilik"
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => {
                                    const newGifts = [...(data.engagement.gifts || [])];
                                    newGifts.push({ bank_name: '', account_number: '', account_holder: '' });
                                    onUpdate('engagement.gifts', newGifts);
                                }}
                                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> Tambah Rekening
                            </button>
                        </div>

                        {/* RSVP PREFERENCES */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-4">
                            <SectionHeader icon={MessageSquare} title="Konfirmasi Kehadiran (RSVP)" />

                            <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Aktifkan RSVP?</h4>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Tamu bisa kirim konfirmasi kehadiran via WhatsApp.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.engagement.rsvp !== false}
                                        onChange={(e) => onUpdate('engagement.rsvp', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                                </label>
                            </div>

                            {data.engagement.rsvp !== false && (
                                <div className="space-y-4 animate-fade-in">
                                    <Input
                                        label="Nomor WhatsApp Penerima"
                                        value={getValue('engagement.rsvp_settings.whatsapp_number')}
                                        onChange={(v) => onUpdate('engagement.rsvp_settings.whatsapp_number', v)}
                                        placeholder="6281234567890"
                                        subtext={<span className="text-[10px] text-slate-400">Gunakan format internasional (62...) tanpa tanda plus.</span>}
                                    />
                                    <div>
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pesan Default</label>
                                        <textarea
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition resize-none h-24"
                                            value={getValue('engagement.rsvp_settings.message_template') || "Halo, saya [Nama] ingin konfirmasi kehadiran..."}
                                            onChange={(e) => onUpdate('engagement.rsvp_settings.message_template', e.target.value)}
                                            placeholder="Halo, saya [Nama] ingin konfirmasi kehadiran..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Settings} title="Pengaturan Umum" />

                        <div className="mb-8 bg-gradient-to-br from-pink-50 to-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Globe size={14} className="text-pink-500" />
                                <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest">LINK UNDANGAN (SLUG)</p>
                            </div>

                            {/* SLUG INPUT WITH LOGIC */}
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
                    </div>
                )}
            </div>
        </aside>
    );
};

export default EditorSidebar;
