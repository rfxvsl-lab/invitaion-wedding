import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/AdminLayout';
import { Save, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function MyInvitationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [invitation, setInvitation] = useState<any>(null);
    const [themes, setThemes] = useState<any[]>([]);

    // Form States
    const [newSlug, setNewSlug] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');
    const [message, setMessage] = useState('');

    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        fetchData();
        if (router.query.first) setShowWelcome(true);
    }, [router.query]);

    const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }

        // 1. Fetch Profile
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(prof);

        // 2. Fetch Invitation
        const { data: inv } = await supabase.from('invitations').select('*').eq('user_id', user.id).single();
        if (inv) {
            setInvitation(inv);
            setNewSlug(inv.slug);
            setSelectedTheme(inv.metadata?.theme_id || '');
        }

        // 3. Fetch Themes
        const { data: thm } = await supabase.from('themes').select('*');
        if (thm) setThemes(thm);

        setLoading(false);
    };

    const handleUpdateSlug = async () => {
        if (!profile || !invitation) return;
        if (newSlug === invitation.slug) return;

        // TOKEN CHECK
        if (profile.tokens < 1) {
            setMessage('Error: Token tidak cukup! Sisa token Anda 0.');
            return;
        }

        const confirm = window.confirm(`Ubah link akan memotong 1 Token. Lanjutkan?\nSisa Token: ${profile.tokens}`);
        if (!confirm) return;

        setLoading(true);
        try {
            // 1. Update Invitation
            const { error } = await supabase.from('invitations').update({ slug: newSlug }).eq('id', invitation.id);
            if (error) throw error;

            // 2. Deduct Token
            const { error: profError } = await supabase.from('profiles').update({ tokens: profile.tokens - 1 }).eq('id', profile.id);
            if (profError) throw profError;

            // Success
            alert('Link berhasil diubah! Token -1');
            fetchData();
        } catch (err: any) {
            setMessage('Gagal update: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTheme = async () => {
        if (!profile || !invitation) return;
        if (selectedTheme === invitation.metadata?.theme_id) return;

        // TOKEN CHECK
        if (profile.tokens < 1) {
            setMessage('Error: Token tidak cukup! Sisa token Anda 0.');
            return;
        }

        const confirm = window.confirm(`Ganti tema akan memotong 1 Token. Lanjutkan?\nSisa Token: ${profile.tokens}`);
        if (!confirm) return;

        setLoading(true);
        try {
            // 1. Update Invitation Metadata
            const newMeta = { ...invitation.metadata, theme_id: selectedTheme };
            const { error } = await supabase.from('invitations').update({ metadata: newMeta }).eq('id', invitation.id);
            if (error) throw error;

            // 2. Deduct Token
            const { error: profError } = await supabase.from('profiles').update({ tokens: profile.tokens - 1 }).eq('id', profile.id);
            if (profError) throw profError;

            alert('Tema berhasil diganti! Token -1');
            fetchData();
        } catch (err: any) {
            setMessage('Gagal update: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <AdminLayout title="Undangan Saya">Checking data...</AdminLayout>;

    return (
        <AdminLayout title="Undangan Saya">
            {showWelcome && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl scale-100 animate-jump-in">
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🎁</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang!</h2>
                        <p className="text-slate-600 mb-6">
                            Sebagai pengguna baru, Anda mendapatkan <strong className="text-pink-600">5 Token Gratis</strong>.
                            <br /><br />
                            Gunakan token ini untuk mencoba-coba Tema dan Link sebelum memutuskan membayar.
                        </p>
                        <button
                            onClick={() => setShowWelcome(false)}
                            className="bg-pink-600 text-white w-full py-3 rounded-xl font-bold hover:bg-pink-700 transition"
                        >
                            Klaim & Mulai
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-extrabold text-slate-900">Kelola Undangan</h1>
                    <p className="text-slate-500">Atur link dan tampilan undangan Anda disini.</p>
                </header>

                {/* STATUS BAR */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase">Sisa Token</p>
                        <p className="text-3xl font-black text-slate-900">{profile?.tokens || 0} <span className="text-lg font-normal text-slate-500">Token</span></p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase">Paket Aktif</p>
                        <p className="text-2xl font-bold text-pink-600 capitalize">{profile?.tier || 'Free'}</p>
                    </div>
                </div>

                {message && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
                        <AlertCircle size={20} /> {message}
                    </div>
                )}

                {/* EDITOR SECTION */}
                {!invitation ? (
                    <div className="bg-yellow-50 p-8 rounded-2xl text-center border border-yellow-200">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Belum ada Undangan Aktif</h3>
                        <p className="text-yellow-700 mb-4">Silakan lakukan pemesanan/pembayaran terlebih dahulu.</p>
                        <Link href="/pricing" className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold">Buat Sekarang</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* SLUG EDITOR */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Link Undangan (Slug)</h3>
                            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                                <span className="text-slate-400 select-none">undangankita.com/</span>
                                <input
                                    type="text"
                                    value={newSlug}
                                    onChange={(e) => setNewSlug(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                                    className="bg-transparent font-bold text-slate-900 outline-none flex-1"
                                />
                            </div>
                            <button
                                onClick={handleUpdateSlug}
                                disabled={newSlug === invitation.slug}
                                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 transition"
                            >
                                <Save size={18} className="inline mr-2" /> Simpan Perubahan (-1 Token)
                            </button>
                            <a href={`/${invitation.slug}`} target="_blank" className="block text-center mt-4 text-pink-600 font-bold text-sm hover:underline">
                                <ExternalLink size={14} className="inline mr-1" /> Lihat Undangan Live
                            </a>
                        </div>

                        {/* THEME EDITOR */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Ganti Tema</h3>
                            <div className="grid grid-cols-2 gap-3 mb-6 max-h-60 overflow-y-auto">
                                {themes.map(thm => (
                                    <div
                                        key={thm.id}
                                        onClick={() => setSelectedTheme(thm.slug)}
                                        className={`cursor-pointer p-2 rounded-lg border-2 transition ${selectedTheme === thm.slug ? 'border-pink-500 bg-pink-50' : 'border-transparent hover:bg-slate-50'}`}
                                    >
                                        <div className="h-20 bg-slate-200 rounded-md mb-2 overflow-hidden">
                                            {thm.thumbnail_url && <img src={thm.thumbnail_url} className="w-full h-full object-cover" />}
                                        </div>
                                        <p className="text-xs font-bold text-center">{thm.name}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleUpdateTheme}
                                disabled={selectedTheme === invitation.metadata?.theme_id}
                                className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 disabled:opacity-50 transition shadow-lg shadow-pink-200"
                            >
                                <CheckCircle size={18} className="inline mr-2" /> Terapkan Tema (-1 Token)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
