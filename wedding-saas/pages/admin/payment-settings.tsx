import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { Save, CreditCard, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import AdminImageUploader from '@/components/AdminImageUploader';

export default function AdminPaymentSettings() {
    const router = useRouter();
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        checkAuth();
        fetchSettings();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || (user.email !== 'mhmmadridho64@gmail.com' && user.email !== 'undangankita.co.id@gmail.com')) {
            router.push('/login');
        }
    };

    const fetchSettings = async () => {
        const { data } = await supabase.from('site_content')
            .select('*')
            .eq('section', 'payment')
            .order('key', { ascending: true });

        if (data) {
            setSettings(data);
        }
        setLoading(false);
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => prev.map(item => item.key === key ? { ...item, value } : item));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = settings.map(item =>
                supabase.from('site_content').update({ value: item.value }).eq('id', item.id)
            );
            await Promise.all(updates);
            setToast({ message: 'Pengaturan berhasil disimpan!', type: 'success' });
        } catch (error: any) {
            setToast({ message: `Gagal menyimpan: ${error.message}`, type: 'error' });
        } finally {
            setSaving(false);
            setTimeout(() => setToast(null), 3000);
        }
    };

    const getVal = (key: string) => settings.find(s => s.key === key)?.value || '';

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <AdminLayout title="Payment Settings - Admin Panel">
            {toast && (
                <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-white ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Payment Configuration</h1>
                    <p className="text-slate-500 mt-2">Atur harga, metode pembayaran, dan instruksi.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan Perubahan
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* PRICING SETTINGS */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <CreditCard className="text-rose-600" /> Harga Paket
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">Harga Basic</label>
                            <input
                                type="text"
                                value={getVal('payment_price_basic')}
                                onChange={(e) => handleChange('payment_price_basic', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">Harga Premium</label>
                            <input
                                type="text"
                                value={getVal('payment_price_premium')}
                                onChange={(e) => handleChange('payment_price_premium', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">Harga Exclusive</label>
                            <input
                                type="text"
                                value={getVal('payment_price_exclusive')}
                                onChange={(e) => handleChange('payment_price_exclusive', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                    </div>
                </div>

                {/* QRIS SETTINGS */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <CreditCard className="text-rose-600" /> QRIS Image
                    </h2>
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-600 mb-1">Upload Gambar QRIS</label>
                        <AdminImageUploader
                            currentUrl={getVal('payment_qris_image')}
                            onUploadComplete={(url) => handleChange('payment_qris_image', url)}
                        />
                        <p className="text-xs text-slate-400 mt-2">Pastikan gambar QRIS jelas dan dapat dipindai.</p>
                    </div>
                </div>

                {/* BANK ACCOUNTS */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <CreditCard className="text-rose-600" /> Rekening Bank (Virtual Account)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">BCA</label>
                            <input
                                type="text"
                                value={getVal('payment_bank_bca')}
                                onChange={(e) => handleChange('payment_bank_bca', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">Mandiri</label>
                            <input
                                type="text"
                                value={getVal('payment_bank_mandiri')}
                                onChange={(e) => handleChange('payment_bank_mandiri', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">BNI</label>
                            <input
                                type="text"
                                value={getVal('payment_bank_bni')}
                                onChange={(e) => handleChange('payment_bank_bni', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1">BRI</label>
                            <input
                                type="text"
                                value={getVal('payment_bank_bri')}
                                onChange={(e) => handleChange('payment_bank_bri', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
