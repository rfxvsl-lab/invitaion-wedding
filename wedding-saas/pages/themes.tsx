import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { getAllThemes } from '../lib/database';
import { Theme } from '../types/database'; // Import the shared Theme type
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, Star } from 'lucide-react';

export default function ThemesPage() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            let data = await getAllThemes();
            // Fallback content if empty
            if (!data || data.length === 0) {
                data = [
                    { id: '1', name: 'Pink Floral', thumbnail_url: 'https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?w=600&q=80', tier: 'premium', preview_url: '', slug: 'floral-rustic', created_at: new Date().toISOString() },
                    { id: '2', name: 'Modern Minimalist', thumbnail_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80', tier: 'basic', preview_url: '', slug: 'clean-white', created_at: new Date().toISOString() },
                    { id: '3', name: 'Luxury Gold', thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tier: 'exclusive', preview_url: '', slug: 'golden-luxury', created_at: new Date().toISOString() },
                    { id: '4', name: 'Javanese Heritage', thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tier: 'premium', preview_url: '', slug: 'javanese-heritage', created_at: new Date().toISOString() },
                    { id: '5', name: 'Rustic Wood', thumbnail_url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', tier: 'basic', preview_url: '', slug: 'rustic-wood', created_at: new Date().toISOString() },
                    { id: '6', name: 'Islamic Geometric', thumbnail_url: 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=600&q=80', tier: 'exclusive', preview_url: '', slug: 'islamic-geo', created_at: new Date().toISOString() }
                ];
            }
            setThemes(data);
            setLoading(false);
        };
        fetch();
    }, []);

    // Simple client-side filtering logic based on tier or name just to mimic categories for now
    // In a real app, you might have a dedicated category column
    const filteredThemes = filter === 'all'
        ? themes
        : themes.filter(t => t.tier === filter || t.name.toLowerCase().includes(filter));

    return (
        <div className="page-enter bg-white min-h-screen flex flex-col">
            <Head>
                <title>Katalog Tema - UndanganKita</title>
                <meta name="description" content="Pilih tema undangan pernikahan digital impianmu." />
            </Head>

            <Navbar />

            <main className="flex-1 pt-32 pb-20 container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-up">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Katalog Tema Premium</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">Pilih desain yang merepresentasikan cerita cinta Anda. Semua tema mendukung fitur lengkap.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up delay-100">
                    {['all', 'basic', 'premium', 'exclusive'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-bold capitalize transition-all ${filter === cat ? 'bg-rose-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {cat === 'all' ? 'Semua' : cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up delay-200">
                    {loading ? (
                        <p className="text-center col-span-3 text-gray-500">Memuat tema...</p>
                    ) : (
                        filteredThemes.map(theme => (
                            <div key={theme.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={theme.thumbnail_url || 'https://via.placeholder.com/400x500'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={theme.name} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <a
                                            href={theme.preview_url || `/preview/${theme.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100"
                                        >
                                            <Eye size={16} /> Preview
                                        </a>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{theme.tier}</div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded uppercase min-w-[60px] text-center">{theme.tier}</span>
                                        <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-gray-900">{theme.name}</h3>
                                    <button
                                        onClick={() => router.push(`/payment?tier=${theme.tier}`)}
                                        className="w-full py-2 border-2 border-rose-600 text-rose-600 font-bold rounded-lg hover:bg-rose-600 hover:text-white transition-colors"
                                    >
                                        Pilih Tema Ini
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
