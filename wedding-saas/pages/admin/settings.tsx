import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Home, Users, Palette, ShoppingCart, FileQuestion, Settings, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Home size={20} />
                        Dashboard
                    </a>
                    <a href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <ShoppingCart size={20} />
                        Orders
                    </a>
                    <a href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/20 font-semibold">
                        <Settings size={20} />
                        Settings
                    </a>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-6">Pengaturan Pembayaran (Dinamis)</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block font-semibold mb-2">Instruksi Transfer Bank (BCA/Mandiri/dll)</label>
                            <textarea
                                className="w-full border p-3 rounded h-32"
                                value={settings.payment_instructions_bank}
                                onChange={e => setSettings({ ...settings, payment_instructions_bank: e.target.value })}
                                placeholder="Contoh: Transfer ke BCA 123456 a.n PT UndanganKita..."
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Instruksi E-Wallet (ShopeePay/SeaBank)</label>
                            <textarea
                                className="w-full border p-3 rounded h-32"
                                value={settings.payment_instructions_ewallet}
                                onChange={e => setSettings({ ...settings, payment_instructions_ewallet: e.target.value })}
                                placeholder="Contoh: No HP 081234567890 a.n Admin..."
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Gambar QRIS</label>
                            <div className="flex gap-4 items-start">
                                {settings.payment_instructions_qris_url && (
                                    <img src={settings.payment_instructions_qris_url} alt="QRIS" className="w-32 h-32 object-contain border rounded" />
                                )}
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full border p-2 rounded mb-2"
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
                                    <p className="text-sm text-gray-500">Upload gambar QRIS baru untuk mengganti.</p>
                                    <button
                                        onClick={() => setSettings({ ...settings, payment_instructions_qris_url: '/qris_default.jpg' })}
                                        className="text-xs text-purple-600 hover:underline mt-1"
                                    >
                                        Gunakan Default (Uploaded via Chat)
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 flex items-center gap-2"
                        >
                            <Save size={20} /> Simpan Pengaturan
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminSettingsPage;
