import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Loader2 } from 'lucide-react';
import AdminImageUploader from '@/components/AdminImageUploader';
import Head from 'next/head';
import AdminLayout from '@/components/AdminLayout';

export default function AdminCMSPage() {
    const router = useRouter();
    const [content, setContent] = useState<any[]>([]);
    const [originalContent, setOriginalContent] = useState<any[]>([]);
    const [stats, setStats] = useState({ pendingOrders: 0 }); // Placeholder for sidebar badge
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [newSection, setNewSection] = useState('hero');
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'loading' } | null>(null);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const AVAILABLE_TEMPLATES = [
        { id: 'classic-serif', name: 'Classic Serif' },
        { id: 'rustic-wood', name: 'Rustic Wood' },
        { id: 'dark-luxury', name: 'Dark Luxury' },
        { id: 'floral-rustic', name: 'Floral Rustic' },
        { id: 'modern-arch', name: 'Modern Arch' },
        { id: 'royal-arabian', name: 'Royal Arabian' },
        { id: 'elegant-vanilla', name: 'Elegant Vanilla' },
    ];

    useEffect(() => {
        const init = async () => {
            await checkAuth();
            await fetchContent();
            setLoading(false);
        };
        init();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || (user.email !== 'mhmmadridho64@gmail.com' && user.email !== 'undangankita.co.id@gmail.com')) {
            router.push('/login');
        }
    };

    const fetchContent = async () => {
        const { data } = await supabase.from('site_content').select('*').order('section', { ascending: true }).order('key', { ascending: true });
        if (data) {
            setContent(data);
            setOriginalContent(JSON.parse(JSON.stringify(data)));
        }
    };

    const showToast = (message: string, type: 'success' | 'error' | 'loading') => {
        setToast({ message, type });
        if (type !== 'loading') {
            setTimeout(() => setToast(null), 3000);
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
            showToast(`Gagal: ${error.message}`, 'error');
        } else {
            showToast('Tersimpan!', 'success');
            setOriginalContent(prev => prev.map(item => item.id === id ? { ...item, value } : item));
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Menambahkan...', 'loading');
        const { error } = await supabase.from('site_content').insert([{ key: newKey, value: newValue, section: newSection }]);
        if (error) {
            showToast(`Gagal: ${error.message}`, 'error');
        } else {
            showToast('Berhasil!', 'success');
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <AdminLayout title="CMS Editor - Admin Panel">
            {toast && (
                <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-white ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-slate-800'}`}>
                    {toast.message}
                </div>
            )}

            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Content Editor</h1>
                    <p className="text-slate-500 mt-2">Manage homepage text and assets.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Content Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-10">
                        <h2 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
                            <Plus size={18} className="text-primary" /> Tambah Konten
                        </h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Section</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium outline-none"
                                    value={newSection}
                                    onChange={(e) => setNewSection(e.target.value)}
                                >
                                    <option value="hero">Hero</option>
                                    <option value="features">Features</option>
                                    <option value="themes">Themes</option>
                                    <option value="pricing">Pricing</option>
                                    <option value="faq">FAQ</option>
                                    <option value="footer">Footer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key ID</label>
                                <input
                                    type="text"
                                    placeholder="hero_title"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium outline-none"
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Text / Value</label>
                                <textarea
                                    placeholder="Content..."
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium outline-none resize-none"
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    rows={3}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition">
                                Add Content
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
                                <div className="w-2 h-6 bg-primary rounded-full"></div>
                                <h2 className="text-lg font-bold text-slate-800 capitalize tracking-tight">{section}</h2>
                            </div>
                            <div className="p-2">
                                {items.map((item) => {
                                    const changed = hasChanges(item.id);
                                    const isSaving = savingId === item.id;
                                    const isImageKey = item.key.endsWith('_img');

                                    return (
                                        <div key={item.id} className={`p-4 rounded-xl border border-transparent transition-all ${changed ? 'bg-amber-50 border-amber-200' : 'hover:bg-slate-50'}`}>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">{item.key}</label>
                                                    {changed && (
                                                        <button
                                                            onClick={() => handleSave(item.id, item.value)}
                                                            disabled={isSaving}
                                                            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                                                        >
                                                            {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                                                            Save
                                                        </button>
                                                    )}
                                                </div>

                                                {isImageKey ? (
                                                    <AdminImageUploader
                                                        currentUrl={item.value}
                                                        onUploadComplete={(url) => {
                                                            handleLocalChange(item.id, url);
                                                        }}
                                                    />
                                                ) : (
                                                    <textarea
                                                        className={`w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-700 focus:ring-0 resize-none ${changed ? 'text-slate-900' : ''}`}
                                                        value={item.value}
                                                        onChange={(e) => handleLocalChange(item.id, e.target.value)}
                                                        rows={item.value.length > 80 ? 3 : 1}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

