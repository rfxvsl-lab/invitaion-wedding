import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import Head from 'next/head';

export default function Onboarding() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({ full_name: '', phone_number: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        if (!user) return;

        try {
            const { error: upsertError } = await supabase.from('profiles').upsert({
                id: user.id || '',
                full_name: form.full_name,
                phone_number: form.phone_number,
                updated_at: new Date().toISOString(),
            });

            if (upsertError) throw upsertError;

            // Success, redirect to home
            // Set flag to show welcome modal
            localStorage.setItem(`welcome_shown_${user.email}`, ''); // Reset to ensure modal shows? Or logic in Index handles it.
            // Actually index logic says "if !localStorage(key) -> show".
            // So if I don't set it here, it will be empty, and index will show it. Correct.

            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Head>
                <title>Lengkapi Profil - UndanganKita</title>
            </Head>
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-user-pen text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Selamat Bergabung!</h2>
                    <p className="text-gray-500 mt-2 text-sm">Silakan lengkapi data diri Anda sebelum mulai membuat undangan.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
                            placeholder="Contoh: Romeo Montague"
                            value={form.full_name}
                            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+62</span>
                            <input
                                type="tel"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
                                placeholder="812 3456 7890"
                                value={form.phone_number}
                                onChange={(e) => setForm({ ...form, phone_number: e.target.value.replace(/[^0-9]/g, '') })}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Kami akan mengirimkan notifikasi penting ke nomor ini.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition shadow-lg shadow-pink-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {submitting ? 'Menyimpan...' : 'Simpan & Lanjutkan'} <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}
