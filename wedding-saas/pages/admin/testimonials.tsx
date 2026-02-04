import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus, Trash2, Star, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/AdminLayout';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar_url: string;
    display_order: number;
}

const AdminTestimonialsPage = () => {
    const router = useRouter();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        role: 'Pengantin',
        content: '',
        rating: 5,
        avatar_url: '',
        display_order: 0
    });

    useEffect(() => {
        checkAuth();
        fetchTestimonials();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || (user.email !== 'mhmmadridho64@gmail.com' && user.email !== 'undangankita.co.id@gmail.com')) {
            router.push('/login');
        }
    };

    const fetchTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
        if (data) setTestimonials(data);
        if (error) console.error(error);
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('testimonials').insert([newItem]);
            if (error) throw error;

            alert('Testimoni berhasil ditambahkan');
            setIsAdding(false);
            setNewItem({ name: '', role: 'Pengantin', content: '', rating: 5, avatar_url: '', display_order: 0 });
            fetchTestimonials();
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus testimoni ini?')) return;
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (!error) fetchTestimonials();
    };

    return (
        <AdminLayout title="Kelola Testimoni - Admin">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Kelola Testimoni</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                    <Plus size={20} /> Tambah Testimoni
                </button>
            </div>

            {/* Add Form */}
            {isAdding && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-slate-100 animate-fade-in">
                    <h3 className="text-xl font-bold mb-4">Tambah Testimoni Baru</h3>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Nama</label>
                                <input
                                    type="text" required
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 bg-slate-50"
                                    placeholder="Contoh: Romeo & Juliet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Role</label>
                                <input
                                    type="text" required
                                    value={newItem.role}
                                    onChange={e => setNewItem({ ...newItem, role: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 bg-slate-50"
                                    placeholder="Contoh: Pengantin"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Testimoni</label>
                            <textarea
                                required rows={3}
                                value={newItem.content}
                                onChange={e => setNewItem({ ...newItem, content: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 bg-slate-50"
                                placeholder="Apa kata mereka..."
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Rating (1-5)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number" min="1" max="5" required
                                        value={newItem.rating}
                                        onChange={e => setNewItem({ ...newItem, rating: parseInt(e.target.value) })}
                                        className="w-full border rounded-lg px-3 py-2 bg-slate-50"
                                    />
                                    <Star className="text-yellow-400" fill="currentColor" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Urutan</label>
                                <input
                                    type="number"
                                    value={newItem.display_order}
                                    onChange={e => setNewItem({ ...newItem, display_order: parseInt(e.target.value) })}
                                    className="w-full border rounded-lg px-3 py-2 bg-slate-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Avatar URL (Optional)</label>
                                <input
                                    type="text"
                                    value={newItem.avatar_url}
                                    onChange={e => setNewItem({ ...newItem, avatar_url: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 bg-slate-50"
                                    placeholder="https://"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button" onClick={() => setIsAdding(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-bold"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
                            >
                                <Save size={18} /> Simpan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                                    {item.avatar_url ? (
                                        <img src={item.avatar_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        item.name.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                                    <p className="text-xs text-slate-500">{item.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-slate-400 hover:text-red-500 p-2 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">"{item.content}"</p>
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex text-yellow-400 gap-0.5">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-slate-400 bg-slate-50 px-2 py-1 rounded">Order: {item.display_order}</span>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && !loading && (
                <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 font-bold">Belum ada testimoni.</p>
                    <p className="text-sm text-slate-400">Silakan tambahkan testimoni baru.</p>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminTestimonialsPage;
