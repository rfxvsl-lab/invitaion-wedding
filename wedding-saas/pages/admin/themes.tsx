import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Home, Users, Palette, ShoppingCart, FileQuestion, Plus, Trash2, Upload, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getAllThemes, deleteTheme } from '../../lib/database';
import { Theme } from '../../types/database';

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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Home size={20} />
                        Dashboard
                    </a>
                    <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Users size={20} />
                        Users
                    </a>
                    <a href="/admin/themes" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/20 font-semibold">
                        <Palette size={20} />
                        Themes
                    </a>
                    <a href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <ShoppingCart size={20} />
                        Orders
                    </a>
                    <a href="/admin/faqs" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <FileQuestion size={20} />
                        FAQs
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Kelola Tema</h2>
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                        >
                            <Plus size={20} /> Tambah Tema
                        </button>
                    </div>

                    {/* Add Theme Form */}
                    {isAdding && (
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 animate-fade-in-down">
                            <h3 className="text-xl font-bold mb-4">Tambah Tema Baru</h3>
                            <form onSubmit={handleAddTheme} className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Nama Tema</label>
                                    <input
                                        type="text" required
                                        value={newTheme.name}
                                        onChange={e => setNewTheme({ ...newTheme, name: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Slug (ID Unik)</label>
                                    <input
                                        type="text" required
                                        value={newTheme.slug}
                                        onChange={e => setNewTheme({ ...newTheme, slug: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="contoh: royal-arabian"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Tier</label>
                                    <select
                                        value={newTheme.tier}
                                        onChange={e => setNewTheme({ ...newTheme, tier: e.target.value as any })}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="free">Free</option>
                                        <option value="basic">Basic</option>
                                        <option value="premium">Premium</option>
                                        <option value="exclusive">Exclusive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Preview URL (Video/Link)</label>
                                    <input
                                        type="text"
                                        value={newTheme.preview_url}
                                        onChange={e => setNewTheme({ ...newTheme, preview_url: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2">Thumbnail Image</label>
                                    <div className="border-2 border-dashed p-4 rounded text-center">
                                        <input
                                            type="file" accept="image/*"
                                            onChange={e => setThumbnailFile(e.target.files?.[0] || null)}
                                            className="hidden" id="thumb-upload"
                                        />
                                        <label htmlFor="thumb-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                            <Upload className="text-gray-400" />
                                            <span className="text-sm text-gray-500">
                                                {thumbnailFile ? thumbnailFile.name : "Klik untuk upload thumbnail"}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-3">
                                    <button
                                        type="button" onClick={() => setIsAdding(false)}
                                        className="px-4 py-2 border rounded hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit" disabled={uploading}
                                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
                                    >
                                        {uploading && <Loader className="animate-spin" size={16} />}
                                        Simpan Tema
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Theme List */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {themes.map(theme => (
                            <div key={theme.id} className="bg-white rounded-lg shadow overflow-hidden group">
                                <div className="h-48 bg-gray-200 relative">
                                    {theme.thumbnail_url ? (
                                        <img src={theme.thumbnail_url} alt={theme.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded capitalize">
                                        {theme.tier}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1">{theme.name}</h3>
                                    <p className="text-xs text-gray-500 mb-4 font-mono">{theme.slug}</p>
                                    <div className="flex justify-between items-center">
                                        <a href={`/preview/${theme.slug}`} target="_blank" className="text-purple-600 text-sm hover:underline">Preview</a>
                                        <button
                                            onClick={() => handleDelete(theme.id)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {themes.length === 0 && !loading && (
                        <div className="text-center py-12 text-gray-500">Belum ada tema. Silakan tambah tema baru.</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminThemesPage;
