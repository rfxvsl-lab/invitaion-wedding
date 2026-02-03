import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/AdminLayout';

const AdminSettingsPage = () => {
    const router = useRouter();
    const [settings, setSettings] = useState({
        payment_instructions_bank: '',
        payment_instructions_ewallet: '',
        payment_instructions_qris_url: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('site_content').select('key, value');
            if (data) {
                const newSettings: any = { ...settings };
                data.forEach((item: any) => {
                    if (item.key in newSettings) newSettings[item.key] = item.value;
                });
                setSettings(newSettings);
            }
            setLoading(false);
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        try {
            const updates = Object.entries(settings).map(([key, value]) => ({ key, value }));
            const { error } = await supabase.from('site_content').upsert(updates, { onConflict: 'key' });

            if (error) throw error;
            alert('Settings saved!');
        } catch (err: any) {
            alert('Error saving settings: ' + err.message);
        }
    };

    return (
        <AdminLayout title="Pengaturan - Admin">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Pengaturan Pembayaran (Dinamis)</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block font-bold text-slate-700 mb-2">Instruksi Transfer Bank (BCA/Mandiri/dll)</label>
                        <textarea
                            className="w-full border border-slate-200 p-4 rounded-xl h-32 text-slate-700 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                            value={settings.payment_instructions_bank}
                            onChange={e => setSettings({ ...settings, payment_instructions_bank: e.target.value })}
                            placeholder="Contoh: Transfer ke BCA 123456 a.n PT UndanganKita..."
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-2">Instruksi E-Wallet (ShopeePay/SeaBank)</label>
                        <textarea
                            className="w-full border border-slate-200 p-4 rounded-xl h-32 text-slate-700 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                            value={settings.payment_instructions_ewallet}
                            onChange={e => setSettings({ ...settings, payment_instructions_ewallet: e.target.value })}
                            placeholder="Contoh: No HP 081234567890 a.n Admin..."
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-2">Gambar QRIS</label>
                        <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-slate-200">
                            {settings.payment_instructions_qris_url && (
                                <img src={settings.payment_instructions_qris_url} alt="QRIS" className="w-32 h-32 object-contain border border-slate-200 rounded-lg bg-white" />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border border-slate-200 p-2 rounded-lg mb-2 bg-white"
                                    onChange={async (e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setLoading(true);
                                            const { uploadSiteAsset } = await import('../../lib/database');
                                            const res = await uploadSiteAsset(e.target.files[0]);
                                            if (res.success && res.url) {
                                                setSettings({ ...settings, payment_instructions_qris_url: res.url });
                                            } else {
                                                alert('Upload failed: ' + (res.error || 'Unknown error'));
                                            }
                                            setLoading(false);
                                        }
                                    }}
                                />
                                <p className="text-sm text-slate-500">Upload gambar QRIS baru untuk mengganti.</p>
                                <button
                                    onClick={() => setSettings({ ...settings, payment_instructions_qris_url: '/qris_default.jpg' })}
                                    className="text-xs text-pink-600 hover:text-pink-800 font-bold mt-2"
                                >
                                    Gunakan Default (Uploaded via Chat)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button
                            onClick={handleSave}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5"
                        >
                            <Save size={20} /> Simpan Pengaturan
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;
