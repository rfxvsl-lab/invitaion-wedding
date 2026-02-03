import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getAllFAQs, deleteFAQ } from '../../lib/database';
import { FAQ } from '../../types/database';
import AdminLayout from '@/components/AdminLayout';

const AdminFAQsPage = () => {
    const router = useRouter();
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [newFAQ, setNewFAQ] = useState({
        question: '',
        answer: '',
        display_order: 0
    });

    useEffect(() => {
        checkAuth();
        fetchFAQs();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.email !== 'mhmmadridho64@gmail.com') {
            router.push('/login');
        }
    };

    const fetchFAQs = async () => {
        setLoading(true);
        const data = await getAllFAQs();
        setFaqs(data);
        setLoading(false);
    };

    const handleAddFAQ = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('faqs').insert([newFAQ]);
            if (error) throw error;

            alert('FAQ berhasil ditambahkan');
            setIsAdding(false);
            setNewFAQ({ question: '', answer: '', display_order: 0 });
            fetchFAQs();
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus FAQ ini?')) return;
        const success = await deleteFAQ(id);
        if (success) fetchFAQs();
    };

    return (
        <AdminLayout title="Kelola FAQs - Admin">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Kelola FAQs</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                >
                    <Plus size={20} /> Tambah FAQ
                </button>
            </div>

            {/* Add Form */}
            {isAdding && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h3 className="text-xl font-bold mb-4">Tambah Pertanyaan Baru</h3>
                    <form onSubmit={handleAddFAQ} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Pertanyaan</label>
                            <input
                                type="text" required
                                value={newFAQ.question}
                                onChange={e => setNewFAQ({ ...newFAQ, question: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Contoh: Apakah bisa custom domain?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Jawaban</label>
                            <textarea
                                required rows={4}
                                value={newFAQ.answer}
                                onChange={e => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Jelaskan detail jawaban..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Urutan Tampil</label>
                            <input
                                type="number"
                                value={newFAQ.display_order}
                                onChange={e => setNewFAQ({ ...newFAQ, display_order: parseInt(e.target.value) })}
                                className="w-full border rounded px-3 py-2 w-24"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button" onClick={() => setIsAdding(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="space-y-4">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-6 rounded-lg shadow flex justify-between items-start gap-4">
                        <div>
                            <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                            <span className="text-xs text-gray-400 mt-2 block">Order: {faq.display_order}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(faq.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded transition flex-shrink-0"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {faqs.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">Belum ada FAQ.</div>
            )}
        </AdminLayout>
    );
};

export default AdminFAQsPage;
