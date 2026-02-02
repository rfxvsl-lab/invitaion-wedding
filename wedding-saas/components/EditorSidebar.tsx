// Path: /components/EditorSidebar.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Type, Users, Calendar, Gift, Palette, Plus, Trash2, Settings, Quote, MessageSquare, Globe } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { InvitationData } from '../types/invitation';
import { supabase } from '@/lib/supabase';
import { TEMPLATES } from '../lib/templates';
import { getEffectivePlan } from '../lib/admin';
import DIYEditor from './DIYEditor';

interface EditorSidebarProps {
    data: InvitationData;
    onUpdate: (path: string, value: any) => void;
}

// Moved Input component outside to prevent re-mounting on every render
const Input = ({ label, value, onChange, placeholder }: { label: string, value: any, onChange: (val: string) => void, placeholder?: string }) => (
    <div className="mb-5 group">
        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 group-focus-within:text-pink-500 transition-colors">{label}</label>
        <div className="relative">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all shadow-sm group-hover:bg-white"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-slate-300 pointer-events-none transition-colors" />
        </div>
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

const EditorSidebar: React.FC<EditorSidebarProps> = ({ data, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<'content' | 'events' | 'media' | 'design' | 'settings'>('content');
    const [plan, setPlan] = useState<'free' | 'basic' | 'premium' | 'exclusive'>('free');
    const [uploadingMusic, setUploadingMusic] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [tokens, setTokens] = useState<number>(5); // Free tier token system

    useEffect(() => {
        // Fetch User Plan with admin override
        const fetchPlan = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('subscription_plan, tokens')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    // Apply admin god mode override
                    const effectivePlan = getEffectivePlan(
                        profile.subscription_plan || 'free',
                        user.email
                    ) as 'free' | 'basic' | 'premium' | 'exclusive';

                    setPlan(effectivePlan);
                    // Tokens column might not exist, use default if undefined
                    setTokens(profile.tokens ?? 5);
                }
            }
        };
        fetchPlan();
    }, []);

    const getValue = (path: string) => {
        return path.split('.').reduce((o: any, i) => (o ? o[i] : ''), data);
    };

    const handleThemeChange = (themeId: string, tier: 'free' | 'basic' | 'premium' | 'exclusive') => {
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
            // No token system for basic users
            onUpdate('metadata.theme_id', themeId);
            return;
        }

        // PREMIUM TIER: Allow all except Exclusive
        if (plan === 'premium') {
            if (tier === 'exclusive') {
                alert('🔒 Template Exclusive hanya untuk Exclusive plan!');
                return;
            }
            // No token, unlimited edits
            onUpdate('metadata.theme_id', themeId);
            return;
        }

        // EXCLUSIVE/OTHER: Allow all templates
        onUpdate('metadata.theme_id', themeId);
    };

    const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation - NO Video allowed for direct upload (as per request to avoid backend complexity)
        if (file.type.startsWith('video/')) {
            alert("Mohon maaf, fitur konversi otomatis MP4 ke MP3 belum tersedia. Silakan upload file .MP3 untuk performa terbaik.");
            return;
        }
        if (!file.type.startsWith('audio/')) {
            alert("Mohon upload file audio (MP3).");
            return;
        }

        // Upload Logic
        setUploadingMusic(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Make sure 'music' bucket exists (user should have run SQL)
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

        // Limit file size to 50MB for video
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

            // Upload to 'videos' bucket
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
            {/* Logo area for desktop */}
            <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-white">
                <div className="w-8 h-8 bg-pink-600 rounded-lg shadow-lg shadow-pink-200 flex items-center justify-center overflow-visible">
                    {/* Animated Envelope Icon */}
                    <div className="css-envelope">
                        <div className="env-body"></div>
                        <div className="env-left"></div>
                        <div className="env-right"></div>
                        <div className="env-flap"></div>
                    </div>
                </div>
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
                                        <input
                                            type="checkbox"
                                            checked={data.content.events.akad.enabled !== false}
                                            onChange={(e) => onUpdate('content.events.akad.enabled', e.target.checked)}
                                            className="sr-only peer"
                                        />
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
                                        <input
                                            type="checkbox"
                                            checked={data.content.events.resepsi.enabled !== false}
                                            onChange={(e) => onUpdate('content.events.resepsi.enabled', e.target.checked)}
                                            className="sr-only peer"
                                        />
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

                            {/* URL Input (For everyone) */}
                            <Input
                                label="Youtube / Vimeo URL"
                                value={getValue('content.gallery.video_url')}
                                onChange={(v) => {
                                    // Auto-format YouTube links to Embed format
                                    const ytMatch = v.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                                    if (ytMatch && ytMatch[1]) {
                                        onUpdate('content.gallery.video_url', `https://www.youtube.com/embed/${ytMatch[1]}`);
                                    } else {
                                        onUpdate('content.gallery.video_url', v);
                                    }
                                }}
                                placeholder="https://youtube.com/..."
                            />

                            {/* File Upload (Premium/Exclusive Only) */}
                            <div className="mt-4 relative">
                                {(plan === 'free' || plan === 'basic') && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl border border-slate-100">
                                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
                                            🔒 Premium Plan Only
                                        </div>
                                    </div>
                                )}
                                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold transition-all cursor-pointer ${uploadingVideo ? 'bg-slate-100 border-slate-300 text-slate-400' : 'border-slate-200 text-slate-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50'}`}>
                                    {uploadingVideo ? <Settings className="animate-spin" size={16} /> : <Layout size={16} />}
                                    {uploadingVideo ? 'Mengupload...' : 'Upload Video (MP4/MOV)'}
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleVideoUpload}
                                        disabled={plan === 'free' || plan === 'basic' || uploadingVideo}
                                    />
                                </label>
                            </div>

                            {plan === 'free' || plan === 'basic' ? (
                                <p className="text-[10px] text-amber-600 font-bold mt-2">⚠️ Free/Basic: URL only. Upgrade ke Premium untuk upload file.</p>
                            ) : (
                                <p className="text-[10px] text-slate-400 italic mt-2">✅ Anda bisa upload video langsung (Max 50MB).</p>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={Palette} title="Galeri Foto" />
                            {plan === 'free' && (
                                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                                    <p className="text-xs text-amber-700 font-bold">⚠️ Free Plan: Maksimal 4 foto. Upgrade ke Basic untuk 6 foto.</p>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                {[0, 1, 2, 3, 4, 5, 6, 7].slice(0, plan === 'free' ? 4 : plan === 'basic' ? 6 : 8).map((idx) => (
                                    <ImageUploader
                                        key={idx}
                                        label={`Foto ${idx + 1}`}
                                        currentUrl={data.content.gallery.images[idx] || ''}
                                        onUpdate={(url) => {
                                            const newImages = [...(data.content.gallery.images || [])];
                                            newImages[idx] = url;
                                            onUpdate('content.gallery.images', newImages);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'design' && (
                    <>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={Palette} title="Tema & Musik" />

                            {/* Token Balance Display (Free Users Only) */}
                            {plan === 'free' && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-black text-amber-700 uppercase tracking-wider mb-1">🪙 Token Tersisa</p>
                                            <p className="text-3xl font-bold text-amber-600">{tokens} / 5</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-amber-600 italic">1 Token = 1x Ganti Tema Free</p>
                                            <p className="text-[10px] text-slate-500 mt-1">Upgrade untuk unlimited</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Theme Selection Grid */}
                            <div className="space-y-6 mb-6">
                                {/* FREE & BASIC TIER */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Free & Basic</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {TEMPLATES.filter(t => t.tier === 'free' || t.tier === 'basic').map(template => (
                                            <button
                                                key={template.id}
                                                onClick={() => handleThemeChange(template.id, template.tier)}
                                                className={`p-4 text-xs font-bold rounded-xl border-2 text-left capitalize transition-all duration-200
                                                ${data.metadata.theme_id === template.id
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                                                        : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                                            >
                                                <div className={`w-3 h-3 rounded-full mb-2 ${data.metadata.theme_id === template.id ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                                {template.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* PREMIUM TIER */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {TEMPLATES.filter(t => t.tier === 'premium').map(template => (
                                            <button
                                                key={template.id}
                                                onClick={() => handleThemeChange(template.id, template.tier)}
                                                disabled={plan === 'free' || plan === 'basic'}
                                                className={`relative p-4 text-xs font-bold rounded-xl border-2 text-left capitalize transition-all duration-200 overflow-hidden
                                                ${data.metadata.theme_id === template.id
                                                        ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                                                        : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                                            >
                                                {/* Lock Overlay for Free/Basic Users */}
                                                {(plan === 'free' || plan === 'basic') && (
                                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-xl">
                                                        <div className="text-center">
                                                            <div className="text-2xl mb-1">🔒</div>
                                                            <p className="text-[9px] text-white font-bold uppercase">Premium Plan</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Premium Badge */}
                                                <div className="absolute top-0 right-0 bg-violet-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg">PRO</div>

                                                <div className={`w-3 h-3 rounded-full mb-2 ${data.metadata.theme_id === template.id ? 'bg-violet-500' : 'bg-slate-200'}`}></div>
                                                {template.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* EXCLUSIVE TIER */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exclusive</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {TEMPLATES.filter(t => t.tier === 'exclusive').map(template => (
                                            <button
                                                key={template.id}
                                                onClick={() => handleThemeChange(template.id, template.tier)}
                                                disabled={plan !== 'exclusive'}
                                                className={`relative p-4 text-xs font-bold rounded-xl border-2 text-left capitalize transition-all duration-200 overflow-hidden
                                                ${data.metadata.theme_id === template.id
                                                        ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                                                        : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                                            >
                                                {/* Lock Overlay for Non-Exclusive Users */}
                                                {plan !== 'exclusive' && (
                                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-xl">
                                                        <div className="text-center">
                                                            <div className="text-2xl mb-1">🔒</div>
                                                            <p className="text-[9px] text-white font-bold uppercase">Exclusive Plan</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Exclusive Badge */}
                                                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg">VIP</div>

                                                <div className={`w-3 h-3 rounded-full mb-2 ${data.metadata.theme_id === template.id ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
                                                {template.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CUSTOM BACKGROUND (Premium/Exclusive Tier) */}
                            {(plan === 'premium' || plan === 'exclusive') && (
                                <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl animate-in fade-in">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                        <p className="text-[10px] font-black text-purple-700 uppercase tracking-wider">✨ Background Kustom</p>
                                        <span className="ml-auto text-[8px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                                            {plan === 'exclusive' ? 'VIP' : 'PRO'}
                                        </span>
                                    </div>
                                    <ImageUploader
                                        label="Upload Background Image"
                                        currentUrl={data.metadata.custom_bg_url || ''}
                                        onUpdate={(url) => onUpdate('metadata.custom_bg_url', url)}
                                    />
                                    <p className="text-[10px] text-purple-600 font-medium mt-2">
                                        💡 Upload gambar kustom untuk background undangan. Biarkan kosong untuk default.
                                    </p>
                                </div>
                            )}

                            {/* DIY CUSTOMIZATION (Premium/Exclusive Tier) */}
                            {(plan === 'premium' || plan === 'exclusive') && (
                                <DIYEditor
                                    initialLayout={data.metadata.diy_layout}
                                    plan={plan}
                                    onLayoutChange={(layout) => onUpdate('metadata.diy_layout', layout)}
                                />
                            )}

                            {/* MUSIC SECTION */}
                            <div className="mb-4">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Musik Latar</label>

                                <div className="flex flex-col gap-3">
                                    {/* URL Input (For everyone) */}
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                                        value={getValue('metadata.music_url')}
                                        onChange={(e) => onUpdate('metadata.music_url', e.target.value)}
                                    />

                                    {/* Upload Button (Basic/Premium) */}
                                    <div className="relative">
                                        {plan === 'free' && (
                                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl border border-slate-100">
                                                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
                                                    🔒 Basic Plan Only
                                                </div>
                                            </div>
                                        )}
                                        <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold transition-all cursor-pointer ${uploadingMusic ? 'bg-slate-100 border-slate-300 text-slate-400' : 'border-slate-200 text-slate-500 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'}`}>
                                            {uploadingMusic ? <Settings className="animate-spin" size={16} /> : <Gift size={16} />}
                                            {uploadingMusic ? 'Mengupload...' : 'Upload MP3 (Pribadi)'}
                                            <input
                                                type="file"
                                                accept="audio/*,video/mp4"
                                                className="hidden"
                                                onChange={handleMusicUpload}
                                                disabled={plan === 'free' || uploadingMusic}
                                            />
                                        </label>
                                    </div>
                                    {plan === 'free' ? (
                                        <p className="text-[10px] text-amber-600 font-bold">⚠️ Free: URL only. Upgrade ke Basic untuk upload file.</p>
                                    ) : (
                                        <p className="text-[10px] text-slate-400 italic">✅ Anda bisa upload MP3 langsung (Max 10MB).</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={Gift} title="Kado Digital" />
                            {data.engagement.gifts.map((gift, idx) => (
                                <div key={idx} className="relative p-4 bg-slate-50 rounded-xl border border-slate-100 mb-3 group hover:border-slate-300 transition-colors">
                                    <button onClick={() => onUpdate('engagement.gifts', data.engagement.gifts.filter((_, i) => i !== idx))} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 bg-white rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                                    <input className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium mb-2 focus:ring-2 focus:ring-pink-500/20 outline-none" value={gift.bank} onChange={(e) => { const n = [...data.engagement.gifts]; n[idx].bank = e.target.value; onUpdate('engagement.gifts', n) }} placeholder="Nama Bank" />
                                    <input className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium mb-2 focus:ring-2 focus:ring-pink-500/20 outline-none" value={gift.acc_number} onChange={(e) => { const n = [...data.engagement.gifts]; n[idx].acc_number = e.target.value; onUpdate('engagement.gifts', n) }} placeholder="No. Rekening" />
                                    <input className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-pink-500/20 outline-none" value={gift.holder} onChange={(e) => { const n = [...data.engagement.gifts]; n[idx].holder = e.target.value; onUpdate('engagement.gifts', n) }} placeholder="Atas Nama" />
                                </div>
                            ))}
                            <button onClick={() => onUpdate('engagement.gifts', [...data.engagement.gifts, { bank: '', acc_number: '', holder: '' }])} className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all"><Plus size={16} /> Tambah Rekening</button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={Quote} title="Kutipan / Ayat" />
                            <div className="space-y-1">
                                <Input label="Isi Kutipan / Ayat" value={getValue('content.quote.content')} onChange={(v) => onUpdate('content.quote.content', v)} />
                                <Input label="Sumber (Surah/Kitab)" value={getValue('content.quote.source')} onChange={(v) => onUpdate('content.quote.source', v)} />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <SectionHeader icon={MessageSquare} title="Konfigurasi RSVP" />
                            <div className="flex items-center justify-between mb-4 p-3 bg-pink-50 rounded-xl">
                                <span className="text-xs font-bold text-pink-900">Aktifkan Fitur RSVP</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.engagement.rsvp}
                                        onChange={(e) => onUpdate('engagement.rsvp', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                                </label>
                            </div>
                            {data.engagement.rsvp && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <Input label="Nomor WhatsApp (628...)" value={getValue('engagement.rsvp_settings.whatsapp_number')} onChange={(v) => onUpdate('engagement.rsvp_settings.whatsapp_number', v)} placeholder="628123456789" />
                                    <div className="mb-4">
                                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Template Pesan</label>
                                        <textarea
                                            value={getValue('engagement.rsvp_settings.message_template')}
                                            onChange={(e) => onUpdate('engagement.rsvp_settings.message_template', e.target.value)}
                                            placeholder="Halo, saya [Nama]..."
                                            rows={3}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all resize-none shadow-sm"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium">Gunakan text [Nama] dan [Jumlah] sebagai placeholder.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Settings} title="Pengaturan Umum" />

                        <div className="mb-8 bg-gradient-to-br from-pink-50 to-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Globe size={14} className="text-pink-500" />
                                <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest">LINK UNDANGAN (SLUG)</p>
                            </div>
                            <Input label="" value={getValue('metadata.slug')} onChange={(v) => onUpdate('metadata.slug', v.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="contoh: romeo-juliet" />
                            <p className="text-[10px] text-pink-400/70 mt-1 font-medium italic">Hanya huruf kecil, angka, dan strip (-).</p>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Kustomisasi Label Teks</h4>
                            <div className="space-y-1">
                                <Input label="Tombol Buka" value={getValue('content.texts.open_button') || 'Buka Undangan'} onChange={(v) => onUpdate('content.texts.open_button', v)} />
                                <Input label="Judul Hero (The Wedding Of)" value={getValue('content.texts.hero_title') || 'The Wedding Of'} onChange={(v) => onUpdate('content.texts.hero_title', v)} />
                                <Input label="Sub-Judul Hero" value={getValue('content.texts.hero_subtitle') || 'We Are Getting Married'} onChange={(v) => onUpdate('content.texts.hero_subtitle', v)} />
                                <Input label="Judul Bagian Pasangan" value={getValue('content.texts.couple_title') || 'The Couple'} onChange={(v) => onUpdate('content.texts.couple_title', v)} />
                                <Input label="Judul Bagian Acara" value={getValue('content.texts.events_title') || 'Save The Date'} onChange={(v) => onUpdate('content.texts.events_title', v)} />
                                <Input label="Judul Akad" value={getValue('content.texts.akad_title') || 'Akad Nikah'} onChange={(v) => onUpdate('content.texts.akad_title', v)} />
                                <Input label="Judul Resepsi" value={getValue('content.texts.resepsi_title') || 'Resepsi'} onChange={(v) => onUpdate('content.texts.resepsi_title', v)} />
                                <Input label="Judul Galeri" value={getValue('content.texts.gallery_title') || 'Our Memories'} onChange={(v) => onUpdate('content.texts.gallery_title', v)} />
                                <Input label="Judul Kado/Gift" value={getValue('content.texts.gift_title') || 'Wedding Gift'} onChange={(v) => onUpdate('content.texts.gift_title', v)} />
                                <Input label="Teks Kado/Gift" value={getValue('content.texts.gift_text') || ''} onChange={(v) => onUpdate('content.texts.gift_text', v)} />
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
