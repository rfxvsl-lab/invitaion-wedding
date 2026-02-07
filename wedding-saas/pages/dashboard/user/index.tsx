import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { Crown, Clock, Edit2, Play, Plus, Save, User as UserIcon, Calendar, Link as LinkIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useDebounce } from 'use-debounce';

export default function UserDashboard() {
    const { user, profile } = useAuth();
    const router = useRouter();
    const [invitations, setInvitations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [profileForm, setProfileForm] = useState({
        full_name: '',
        phone_number: ''
    });

    // Slug Creation State
    const [newSlug, setNewSlug] = useState('');
    const [debouncedSlug] = useDebounce(newSlug, 800);
    const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
    const [checkingSlug, setCheckingSlug] = useState(false);
    const [creatingSlug, setCreatingSlug] = useState(false);

    // Check Slug Availability
    useEffect(() => {
        const checkSlug = async () => {
            if (!debouncedSlug || debouncedSlug.length < 3) {
                setSlugAvailable(null);
                return;
            }
            setCheckingSlug(true);
            const { data } = await supabase.from('invitations').select('id').eq('slug', debouncedSlug).maybeSingle();
            setSlugAvailable(!data);
            setCheckingSlug(false);
        };
        checkSlug();
    }, [debouncedSlug]);

    const handleCreateInvitation = async () => {
        if (!user || !newSlug || slugAvailable === false) return;
        setCreatingSlug(true);

        try {
            // Default content
            const defaultContent = {
                hero: { title: "The Wedding Of", nicknames: (profile?.full_name?.split(' ')[0] || "Nama") + " & Pasangan" },
                couple: {
                    groom: { name: "Nama Pria", father: "Bapak Pria", mother: "Ibu Pria" },
                    bride: { name: "Nama Wanita", father: "Bapak Wanita", mother: "Ibu Wanita" }
                }
            };

            const { error: invError } = await supabase.from('invitations').insert({
                user_id: user.id,
                slug: newSlug,
                metadata: {
                    theme_id: 'floral-rustic', // Default Theme
                    tier: profile?.tier || 'free',
                    created_at: new Date().toISOString()
                },
                content: defaultContent
            });

            if (invError) throw invError;

            // Success
            setNewSlug('');
            fetchInvitations();
        } catch (error: any) {
            alert("Gagal membuat undangan: " + error.message);
        } finally {
            setCreatingSlug(false);
        }
    };

    useEffect(() => {
        if (user) {
            setProfileForm({
                full_name: profile?.full_name || '',
                phone_number: profile?.phone_number || ''
            });
            fetchInvitations();
        }
    }, [user, profile]);

    const fetchInvitations = async () => {
        if (!user) return;

        // Optimize: Select specific columns only
        const { data, error } = await supabase
            .from('invitations')
            .select(`
                id, 
                slug, 
                metadata, 
                created_at,
                content
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) setInvitations(data);
        setLoading(false);
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        const { error } = await supabase.from('profiles').update({
            full_name: profileForm.full_name,
            phone_number: profileForm.phone_number,
            updated_at: new Date().toISOString()
        }).eq('id', user.id);

        if (!error) {
            setEditMode(false);
            window.location.reload(); // Refresh to update context
        } else {
            alert('Gagal update profil');
        }
    };

    // Helper: Calculate Active Period
    const getActivePeriod = () => {
        if (!profile?.tier) return 'Gratis (1 Bulan)';

        // This is simplified. In real app, you might store 'expires_at' in profile or subscription table.
        // Assuming we calculate from 'created_at' or 'updated_at' of tier? 
        // For now, let's just show the Tier Rules.
        // Or if we have `invitations` with `expires_at`, we show that.

        const map = {
            'free': '1 Bulan (Gratis)',
            'basic': '3 Bulan (Basic)',
            'premium': '6 Bulan (Premium)',
            'exclusive': '1 Tahun (Exclusive)'
        };
        return map[profile.tier as keyof typeof map] || 'Gratis';
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'exclusive': return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white';
            case 'premium': return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white';
            case 'basic': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const handleAddSlug = () => {
        const slug = prompt("Masukkan Link Undangan Baru (Slug):");
        if (slug) {
            // Logic to add new inv link (Only for Exclusive)
            // For now just redirect to editor with new slug intent? 
            // Or create here.
            createExtraInvitation(slug);
        }
    }

    const createExtraInvitation = async (slug: string) => {
        try {
            const { error: invError } = await supabase.from('invitations').insert({
                user_id: user?.id,
                slug: slug,
                metadata: {
                    theme_id: 'floral-rustic',
                    tier: profile?.tier,
                    created_at: new Date().toISOString()
                },
                content: {
                    hero: { title: "The Wedding Of", nicknames: "Nama & Nama" },
                    couple: {
                        groom: { name: "Nama Pria", father: "Bapak", mother: "Ibu" },
                        bride: { name: "Nama Wanita", father: "Bapak", mother: "Ibu" }
                    }
                }
            });
            if (invError) throw invError;
            fetchInvitations();
        } catch (e: any) {
            alert(e.message);
        }
    }

    if (!user) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Head>
                <title>Dashboard User - UndanganKita</title>
            </Head>
            <Navbar />

            <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Halo, <span className="text-rose-600">{profile?.full_name?.split(' ')[0] || 'Kak'}!</span> 👋
                        </h1>
                        <p className="text-gray-500">Kelola undangan pernikahanmu dalam satu tempat.</p>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 animate-fade-up">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getTierColor(profile?.tier || 'free')}`}>
                            <Crown size={32} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Status Member</p>
                            <h3 className="text-xl font-bold capitalize mb-1">{profile?.tier || 'Free'} Plan</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock size={16} />
                                <span>Masa Aktif: {getActivePeriod()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: My Designs */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Desain Undangan Saya</h2>
                            {profile?.tier === 'exclusive' && (
                                <button onClick={handleAddSlug} className="flex items-center gap-2 text-sm font-bold text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors border border-rose-200">
                                    <Plus size={18} /> Tambah Undangan
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2].map(i => <div key={i} className="h-40 bg-gray-200 rounded-2xl animate-pulse"></div>)}
                            </div>
                        ) : invitations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {invitations.map((inv) => (
                                    <div key={inv.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group relative">
                                        {/* Preview Thumbnail (Mock for now, or use inv.metadata.custom_bg_url) */}
                                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                                            {inv.content?.hero?.main_image ? (
                                                <img src={inv.content.hero.main_image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Calendar size={48} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                <button onClick={() => window.open(`/${inv.slug}`, '_blank')} className="bg-white/20 backdrop-blur text-white p-3 rounded-full hover:bg-white/40 transition">
                                                    <Play size={24} className="fill-current" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                                                        {inv.content?.hero?.nicknames || 'Undangan Tanpa Judul'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-mono text-rose-500">
                                                        undangkankita.id/{inv.slug}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${inv.metadata?.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {inv.metadata?.is_active ? 'Active' : 'Draft'}
                                                </span>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => router.push(`/editor?slug=${inv.slug}`)}
                                                    className="flex-1 bg-rose-600 text-white font-bold py-2 rounded-lg hover:bg-rose-700 transition flex items-center justify-center gap-2"
                                                >
                                                    <Edit2 size={16} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => window.open(`/${inv.slug}`, '_blank')}
                                                    className="flex-1 border border-gray-200 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition"
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-fade-up">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Plus size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Buat Undangan Digital</h2>
                                    <p className="text-gray-500">Mulai buat undangan pernikahan impianmu dengan menentukan link unik.</p>
                                </div>

                                <div className="max-w-md mx-auto">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Link Undangan (Slug)</label>
                                    <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 transition-all ${slugAvailable === false ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                                        <span className="px-4 py-3 text-gray-500 border-r border-gray-300 text-sm flex items-center gap-1">
                                            <LinkIcon size={14} /> web.id/
                                        </span>
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-3 outline-none bg-transparent font-bold text-gray-800 lowercase"
                                            placeholder="romeo-juliet"
                                            value={newSlug}
                                            onChange={(e) => setNewSlug(e.target.value.replace(/[^a-z0-9-]/g, ''))}
                                        />
                                        <div className="pr-4">
                                            {checkingSlug && <span className="animate-spin block w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full"></span>}
                                            {!checkingSlug && slugAvailable === true && <CheckCircle className="text-green-500" size={20} />}
                                            {!checkingSlug && slugAvailable === false && <AlertCircle className="text-red-500" size={20} />}
                                        </div>
                                    </div>
                                    {slugAvailable === false && <p className="text-xs text-red-500 mt-1 font-bold">Link sudah dipakai. Coba variasi lain!</p>}
                                    <p className="text-xs text-gray-500 mt-2 mb-6">Gunakan huruf kecil dan tanda strip (-).</p>

                                    <button
                                        onClick={handleCreateInvitation}
                                        disabled={creatingSlug || !newSlug || slugAvailable === false || newSlug.length < 3}
                                        className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {creatingSlug ? 'Sedang Membuat...' : 'Buat Undangan Sekarang'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Profile */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Profil Saya</h2>
                                <button
                                    onClick={() => !editMode ? setEditMode(true) : handleUpdateProfile()}
                                    className={`text-sm font-bold flex items-center gap-2 ${editMode ? 'text-green-600 bg-green-50 px-3 py-1 rounded-lg' : 'text-gray-500 hover:text-rose-600'}`}
                                >
                                    {editMode ? <><Save size={16} /> Simpan</> : <><Edit2 size={16} /> Edit</>}
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nama Lengkap</label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="w-full border-b-2 border-rose-200 py-1 font-bold text-gray-900 focus:outline-none focus:border-rose-600 bg-transparent"
                                            value={profileForm.full_name}
                                            onChange={e => setProfileForm({ ...profileForm, full_name: e.target.value })}
                                        />
                                    ) : (
                                        <p className="font-bold text-gray-900 text-lg">{profile?.full_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                                    <p className="font-medium text-gray-600">{user?.email}</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">WhatsApp</label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="w-full border-b-2 border-rose-200 py-1 font-bold text-gray-900 focus:outline-none focus:border-rose-600 bg-transparent"
                                            value={profileForm.phone_number}
                                            onChange={e => setProfileForm({ ...profileForm, phone_number: e.target.value })}
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-600">{profile?.phone_number || '-'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
