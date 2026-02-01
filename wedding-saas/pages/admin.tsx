import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import Head from 'next/head';
import { Save, Check, AlertCircle, Loader2, Plus, ArrowLeft } from 'lucide-react';

// Simple Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'loading', onClose: () => void }) => (
    <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${type === 'success' ? 'bg-emerald-500 text-white' : type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`}>
        {type === 'loading' && <Loader2 size={18} className="animate-spin" />}
        {type === 'success' && <Check size={18} />}
        {type === 'error' && <AlertCircle size={18} />}
        <span className="font-medium text-sm">{message}</span>
    </div>
);

export default function Admin() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [content, setContent] = useState<any[]>([]);
    const [originalContent, setOriginalContent] = useState<any[]>([]); // To detect changes
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [newSection, setNewSection] = useState('hero');
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'loading' } | null>(null);
    const [savingId, setSavingId] = useState<string | null>(null);

    useEffect(() => {
        if (!loading) {
            // Check email without dot as per recent fix
            if (!user || (user.email !== 'mhmmadridho64@gmail.com' && user.email !== 'mhmmadridho.64@gmail.com')) {
                router.push('/');
            } else {
                fetchContent();
            }
        }
    }, [user, loading, router]);

    const showToast = (message: string, type: 'success' | 'error' | 'loading') => {
        setToast({ message, type });
        if (type !== 'loading') {
            setTimeout(() => setToast(null), 3000);
        }
    };

    const fetchContent = async () => {
        const { data, error } = await supabase.from('site_content').select('*').order('section', { ascending: true });
        if (data) {
            setContent(data);
            setOriginalContent(JSON.parse(JSON.stringify(data)));
        }
    };

    const handleLocalChange = (id: string, value: string) => {
        setContent(prev => prev.map(item => item.id === id ? { ...item, value } : item));
    };

    const handleSave = async (id: string, value: string) => {
        setSavingId(id);
        const { error } = await supabase.from('site_content').update({ value }).eq('id', id);
        setSavingId(null);

        if (error) {
            showToast(`Gagal menyimpan: ${error.message}`, 'error');
        } else {
            showToast('Perubahan berhasil disimpan!', 'success');
            // Update original content to match new state
            setOriginalContent(prev => prev.map(item => item.id === id ? { ...item, value } : item));
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Menambahkan konten...', 'loading');
        const { error } = await supabase.from('site_content').insert([{ key: newKey, value: newValue, section: newSection }]);

        if (error) {
            showToast(`Gagal menambahkan: ${error.message}`, 'error');
        } else {
            showToast('Konten berhasil ditambahkan!', 'success');
            setNewKey('');
            setNewValue('');
            fetchContent();
        }
    };

    const hasChanges = (id: string) => {
        const current = content.find(c => c.id === id);
        const original = originalContent.find(c => c.id === id);
        return current && original && current.value !== original.value;
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-pink-500" size={32} /></div>;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans">
            <Head>
                <title>Admin Dashboard - UndanganKita</title>
            </Head>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Admin Dashboard ⚡</h1>
                        <p className="text-slate-500 mt-1">Kelola semua konten teks website dari sini.</p>
                    </div>
                    <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-500 hover:text-pink-600 transition font-bold text-sm bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md">
                        <ArrowLeft size={16} /> Kembali ke Home
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add New Content Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-10">
                            <h2 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
                                <Plus size={18} className="text-pink-500" /> Tambah Konten
                            </h2>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Section</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                                        value={newSection}
                                        onChange={(e) => setNewSection(e.target.value)}
                                    >
                                        <option value="hero">Hero</option>
                                        <option value="features">Features</option>
                                        <option value="pricing">Pricing</option>
                                        <option value="faq">FAQ</option>
                                        <option value="footer">Footer</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key ID</label>
                                    <input
                                        type="text"
                                        placeholder="hero_title"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition"
                                        value={newKey}
                                        onChange={(e) => setNewKey(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Konten Teks</label>
                                    <textarea
                                        placeholder="Isi teks..."
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition resize-none"
                                        value={newValue}
                                        onChange={(e) => setNewValue(e.target.value)}
                                        rows={3}
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition shadow-lg hover:shadow-xl translate-y-0 active:translate-y-0.5 transform duration-200">
                                    Tambah Konten Baru
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="lg:col-span-2 space-y-6">
                        {(Object.entries(content.reduce((acc, item) => {
                            (acc[item.section || 'Uncategorized'] = acc[item.section || 'Uncategorized'] || []).push(item);
                            return acc;
                        }, {} as Record<string, any[]>)) as [string, any[]][]).map(([section, items]) => (
                            <div key={section} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                                    <div className="w-2 h-6 bg-pink-500 rounded-full"></div>
                                    <h2 className="text-lg font-bold text-slate-800 capitalize tracking-tight">{section} Section</h2>
                                </div>
                                <div className="p-2">
                                    {items.map((item) => {
                                        const changed = hasChanges(item.id);
                                        const isSaving = savingId === item.id;
                                        return (
                                            <div key={item.id} className={`p-4 rounded-xl border border-transparent transition-all ${changed ? 'bg-amber-50 border-amber-200' : 'hover:bg-slate-50'}`}>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">{item.key}</label>
                                                        {changed && (
                                                            <button
                                                                onClick={() => handleSave(item.id, item.value)}
                                                                disabled={isSaving}
                                                                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm animate-in zoom-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                                                                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                                            </button>
                                                        )}
                                                    </div>
                                                    <textarea
                                                        className={`w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-700 focus:ring-0 resize-none ${changed ? 'text-slate-900' : ''}`}
                                                        value={item.value}
                                                        onChange={(e) => handleLocalChange(item.id, e.target.value)}
                                                        rows={item.value.length > 80 ? 3 : 1}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {content.length === 0 && (
                            <div className="text-center p-10 bg-white rounded-2xl border border-slate-100 border-dashed">
                                <p className="text-slate-500 font-medium">Belum ada konten. Silakan tambahkan konten baru.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
