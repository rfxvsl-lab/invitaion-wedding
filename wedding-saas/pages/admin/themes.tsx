import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus, Trash2, Upload, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getAllThemes, deleteTheme } from '../../lib/database';
import { Theme } from '../../types/database';
import AdminLayout from '@/components/AdminLayout';

const AdminThemesPage = () => {
    const router = useRouter();
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [newTheme, setNewTheme] = useState({
        name: '',
        slug: '',
        tier: 'free',
        preview_url: ''
    });
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    useEffect(() => {
        checkAuth();
        fetchThemes();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.email !== 'mhmmadridho64@gmail.com') {
            router.push('/login');
        }
    };

    const fetchThemes = async () => {
        setLoading(true);
        const data = await getAllThemes();
        setThemes(data);
        setLoading(false);
    };

    const handleAddTheme = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let thumbnailUrl = '';

            // 1. Upload Thumbnail if exists
            if (thumbnailFile) {
                const fileExt = thumbnailFile.name.split('.').pop();
                const fileName = `themes/${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('invitations') // Reusing invitations bucket for now
                    .upload(fileName, thumbnailFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('invitations').getPublicUrl(fileName);
                thumbnailUrl = data.publicUrl;
            }

            // 2. Insert Theme
            const { error: insertError } = await supabase.from('themes').insert([{
                ...newTheme,
                thumbnail_url: thumbnailUrl
            }]);

            if (insertError) throw insertError;

            alert('Tema berhasil ditambahkan!');
            setIsAdding(false);
            setNewTheme({ name: '', slug: '', tier: 'free', preview_url: '' });
            setThumbnailFile(null);
            fetchThemes();

        } catch (error: any) {
            alert('Gagal menambah tema: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus tema ini?')) return;
        const success = await deleteTheme(id);
        if (success) fetchThemes();
        else alert('Gagal menghapus tema');
    };

    return (
        <AdminLayout title="Kelola Tema - Admin">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900">Kelola Tema</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-pink-700 transition flex items-center gap-2 font-bold shadow-lg shadow-pink-500/30"
                >
                    <Plus size={20} /> Tambah Tema
                </button>
            </div>

            {/* Add Theme Form */}
            {isAdding && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-10 animate-fade-in-down">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Tambah Tema Baru</h3>
                    <form onSubmit={handleAddTheme} className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Tema</label>
                            <input
                                type="text" required
                                value={newTheme.name}
                                onChange={e => setNewTheme({ ...newTheme, name: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Slug (ID Unik)</label>
                            <input
                                type="text" required
                                value={newTheme.slug}
                                onChange={e => setNewTheme({ ...newTheme, slug: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                                placeholder="contoh: royal-arabian"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tier</label>
                            <select
                                value={newTheme.tier}
                                onChange={e => setNewTheme({ ...newTheme, tier: e.target.value as any })}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                            >
                                <option value="free">Free</option>
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="exclusive">Exclusive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Preview URL (Video/Link)</label>
                            <input
                                type="text"
                                value={newTheme.preview_url}
                                onChange={e => setNewTheme({ ...newTheme, preview_url: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Thumbnail Image</label>
                            <div className="border-2 border-dashed border-slate-200 p-8 rounded-xl text-center hover:bg-slate-50 transition cursor-pointer group">
                                <input
                                    type="file" accept="image/*"
                                    onChange={e => setThumbnailFile(e.target.files?.[0] || null)}
                                    className="hidden" id="thumb-upload"
                                />
                                <label htmlFor="thumb-upload" className="cursor-pointer flex flex-col items-center gap-3">
                                    <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition">
                                        <Upload className="text-slate-500" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600">
                                        {thumbnailFile ? <span className="text-pink-600 font-bold">{thumbnailFile.name}</span> : "Klik untuk upload thumbnail"}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button" onClick={() => setIsAdding(false)}
                                className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition"
                            >
                                Batal
                            </button>
                            <button
                                type="submit" disabled={uploading}
                                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 transition"
                            >
                                {uploading && <Loader className="animate-spin" size={16} />}
                                Simpan Tema
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Theme List */}
            <div className="grid md:grid-cols-3 gap-8">
                {themes.map(theme => (
                    <div key={theme.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 group hover:shadow-lg transition-all duration-300">
                        <div className="h-56 bg-slate-100 relative overflow-hidden">
                            {theme.thumbnail_url ? (
                                <img src={theme.thumbnail_url} alt={theme.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400 font-medium">No Image</div>
                            )}
                            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                                {theme.tier}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl text-slate-900 mb-1">{theme.name}</h3>
                            <p className="text-xs text-slate-500 mb-6 font-mono bg-slate-50 inline-block px-2 py-1 rounded">{theme.slug}</p>
                            <div className="flex justify-between items-center">
                                <a href={`/preview/${theme.slug}`} target="_blank" className="text-pink-600 font-bold text-sm hover:text-pink-800 transition">Preview User</a>
                                <button
                                    onClick={() => handleDelete(theme.id)}
                                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {themes.length === 0 && !loading && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">Belum ada tema. Silakan tambah tema baru.</p>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminThemesPage;
