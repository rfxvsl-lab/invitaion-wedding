import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import Head from 'next/head';
import { Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { useDebounce } from 'use-debounce';

export default function Onboarding() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        slug: '',
        email: ''
    });

    // Slug check state
    const [debouncedSlug] = useDebounce(formData.slug, 800);
    const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
    const [slugChecking, setSlugChecking] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
        } else {
            // Pre-fill email
            setFormData(prev => ({ ...prev, email: user.email || '' }));
            checkProfile();
        }
    }, [user, authLoading]);

    // Update slug availability check
    useEffect(() => {
        const checkSlug = async () => {
            if (!debouncedSlug || debouncedSlug.length < 3) {
                setSlugAvailable(null);
                return;
            }
            setSlugChecking(true);
            const { data } = await supabase.from('invitations').select('id').eq('slug', debouncedSlug).maybeSingle();
            setSlugAvailable(!data);
            setSlugChecking(false);
        };
        checkSlug();
    }, [debouncedSlug]);

    const checkProfile = async () => {
        if (!user) return;
        const { data } = await supabase.from('profiles').select('full_name, phone_number, contact_email').eq('id', user.id).maybeSingle();
        if (data && data.full_name && data.phone_number) {
            // Also check if slug exists, if not, stay here (for legacy users)
            // For now, assume if profile exists, they might need to update/create slug if missing?
            // Simplified: If profile exists, redirect.
            router.push('/admin');
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (slugAvailable === false) {
            alert('Link undangan sudah dipakai orang lain. Ganti yang lain ya!');
            return;
        }
        setSaving(true);

        try {
            // 1. Update Profile
            const { error: profileError } = await supabase.from('profiles').upsert({
                id: user.id,
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                contact_email: formData.email, // Save contact email
                updated_at: new Date().toISOString(),
                tier: 'free',
                tokens: 5,
                slug_slots: 1,      // Default Free
                max_slug_changes: 0 // Free cannot edit
            });

            if (profileError) throw profileError;

            // 2. Create Initial Invitation
            // Default content
            const defaultContent = {
                hero: { title: "The Wedding Of", nicknames: formData.full_name.split(' ')[0] },
                couple: {
                    groom: { name: "Nama Pria", father: "Bapak Pria", mother: "Ibu Pria" },
                    bride: { name: "Nama Wanita", father: "Bapak Wanita", mother: "Ibu Wanita" }
                }
            };

            const { error: invError } = await supabase.from('invitations').insert({
                user_id: user.id,
                slug: formData.slug,
                metadata: {
                    theme_id: 'floral-rustic', // Default Theme
                    tier: 'free',
                    created_at: new Date().toISOString()
                },
                content: defaultContent
            });

            if (invError) throw invError;

            // Redirect ke Home dengan Welcome Flag
            router.push('/?welcome=true');
        } catch (error: any) {
            // Check if error is duplicate key for slug
            if (error.message?.includes('duplicate key') || error.code === '23505') {
                alert('Yah, Link undangan sudah diambil orang lain saat kamu mengetik. Coba ganti ya!');
            } else {
                alert('Error: ' + error.message);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 py-12">
            <Head>
                <title>Lengkapi Profil - UndanganKita</title>
            </Head>
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-fade-up">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Selamat Datang!</h1>
                    <p className="text-gray-500">Amankan link undangan spesialmu sekarang sebelum diambil orang lain!</p>
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email (Untuk Notifikasi)</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition bg-gray-50"
                            placeholder="email@kamu.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    </div>

                    {/* SLUG INPUT */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Link Undangan (Permanen untuk Akun Free)</label>
                        <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 transition-all ${slugAvailable === false ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                            <span className="px-4 py-3 text-gray-500 border-r border-gray-300 text-sm flex items-center gap-1">
                                <LinkIcon size={14} /> web.id/
                            </span>
                            <input
                                type="text"
                                required
                                className="flex-1 px-4 py-3 outline-none bg-white font-bold text-gray-800 lowercase"
                                placeholder="rizky-lesti"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.replace(/[^a-z0-9-]/g, '') })}
                            />
                            <div className="pr-4">
                                {slugChecking && <span className="animate-spin block w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full"></span>}
                                {!slugChecking && slugAvailable === true && <CheckCircle className="text-green-500" size={20} />}
                                {!slugChecking && slugAvailable === false && <AlertCircle className="text-red-500" size={20} />}
                            </div>
                        </div>
                        {slugAvailable === false && <p className="text-xs text-red-500 mt-1 font-bold">Yah, link ini sudah dipakai. Coba ganti angka atau nama lain!</p>}
                        <p className="text-xs text-gray-500 mt-2">Gunakan huruf kecil dan tanda strip (-). Contoh: romeo-juliet</p>
                    </div>

                    <button
                        type="submit"
                        disabled={saving || slugAvailable === false}
                        className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition transform hover:-translate-y-1 shadow-lg shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Menyimpan...' : 'Simpan & Klaim Link'}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan kami.
                    </p>
                </form>
            </div>
        </div>
    );
}
