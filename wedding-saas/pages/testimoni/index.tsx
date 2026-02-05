import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/components/AuthProvider';
import { Star, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TestimonialSubmission() {
    const { user, profile } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: 'Pengantin',
        content: '',
        rating: 5,
        template_name: '',
        image_base64: ''
    });

    useEffect(() => {
        if (!user && !loading) {
            router.push('/login?redirect=/testimoni');
            return;
        }

        if (user && profile) {
            setFormData(prev => ({ ...prev, name: profile.full_name || '' }));
            fetchOrders();
        }
    }, [user, profile]);

    const fetchOrders = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) throw new Error("No session");

            const res = await fetch('/api/my-themes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Failed to fetch themes");

            const data = await res.json();
            const uniqueThemes = data.themes || [];

            setOrders(uniqueThemes);
            if (uniqueThemes.length > 0) {
                setFormData(prev => ({ ...prev, template_name: uniqueThemes[0] }));
            }
        } catch (err) {
            console.error("Error fetching themes:", err);
            // Fallback empty, user can still type manually or see empty state
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Auto Compress Logic
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Resize if too big (max 800px width)
                const MAX_WIDTH = 800;
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                // Compress Quality (0.7)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

                // Check size (Base64 length * 0.75 ~= bytes)
                // If still > 500KB, warn or truncate? 
                // 500KB = 500000 bytes. Base64 len ~ 666666

                setFormData(prev => ({ ...prev, image_base64: compressedBase64 }));
            };
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        try {
            const { error } = await supabase.from('testimonials').insert({
                user_id: user.id,
                name: formData.name,
                role: formData.role,
                content: formData.content,
                rating: formData.rating,
                template_name: formData.template_name,
                image_base64: formData.image_base64,
                avatar_url: profile?.avatar_url || `https://ui-avatars.com/api/?name=${formData.name}&background=random`
            });

            if (error) throw error;

            router.push('/?review_success=true');
        } catch (err: any) {
            alert('Gagal mengirim testimoni: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-rose-500" /></div>;

    return (
        <div className="min-h-screen bg-rose-50 font-sans">
            <Head><title>Tulis Ulasan - UndanganKita</title></Head>
            <Navbar />

            <main className="max-w-2xl mx-auto pt-24 pb-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-up">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold text-slate-900">Bagikan Pengalamanmu</h1>
                        <p className="text-slate-500 mt-2">Cerita bahagiamu menginspirasi pasangan lain.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating */}
                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className={`transition transform hover:scale-110 ${formData.rating >= star ? 'text-yellow-400' : 'text-slate-200'}`}
                                >
                                    <Star size={40} fill="currentColor" />
                                </button>
                            ))}
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Kamu (Tampil di Web)</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                            />
                        </div>

                        {/* Template Selection */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tema Undangan</label>
                            {orders.length > 0 ? (
                                <select
                                    value={formData.template_name}
                                    onChange={e => setFormData({ ...formData, template_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                                >
                                    {orders.map((t, idx) => (
                                        <option key={idx} value={t}>{t}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm">
                                    Kamu belum membuat undangan, tapi tetap boleh mengisi review umum.
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Ulasan / Cerita</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Ceritakan pengalamanmu menggunakan UndanganKita..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Screenshot Undangan (Opsional)</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {formData.image_base64 ? (
                                    <div className="relative h-48 w-full">
                                        <img src={formData.image_base64} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                            Auto-Compressed
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-slate-400">
                                        <ImageIcon className="mx-auto mb-2 text-slate-300" size={32} />
                                        <p className="text-sm">Klik untuk upload foto</p>
                                        <p className="text-xs mt-1">Maks 2MB (Akan dikompres otomatis)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-200 flex justify-center items-center gap-2"
                        >
                            {submitting ? <Loader2 className="animate-spin" /> : 'Kirim Ulasan'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
