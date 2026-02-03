import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import Head from 'next/head';

export default function Onboarding() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            // Cek apakah user sudah punya profile lengkap, jika ya, tendang ke dashboard
            checkProfile();
        }
    }, [user]);

    const checkProfile = async () => {
        if (!user) return;
        const { data } = await supabase.from('profiles').select('full_name, phone_number').eq('id', user.id).single();
        if (data && data.full_name && data.phone_number) {
            router.push('/admin'); // Sudah lengkap
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                updated_at: new Date().toISOString(),
                // Set default values for new users
                tier: 'free',
                tokens: 5,
                email: user.email // Simpan email juga untuk referensi admin
            });

            if (error) throw error;

            // Redirect ke Home dengan Welcome Flag
            router.push('/?welcome=true');
        } catch (error: any) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
            <Head>
                <title>Lengkapi Profil - UndanganKita</title>
            </Head>
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-fade-up">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Selamat Datang!</h1>
                    <p className="text-gray-500">Silakan lengkapi data diri Anda untuk melanjutkan ke Dashboard dan klaim 5 Token Gratis.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
                            placeholder="Contoh: Rizky Billar"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
                            placeholder="Contoh: 081234567890"
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                        <p className="text-xs text-gray-400 mt-1">Nomor ini akan digunakan untuk notifikasi pesanan.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition transform hover:-translate-y-1 shadow-lg shadow-rose-200"
                    >
                        {loading ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
                    </button>
                </form>
            </div>
        </div>
    );
}
