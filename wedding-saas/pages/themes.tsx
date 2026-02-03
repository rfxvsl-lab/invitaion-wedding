import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllThemes } from '../lib/database';
import { Theme } from '../types/database';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ThemesPage = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetch = async () => {
            let data = await getAllThemes();

            // Fallback for demo/prototype if DB is empty
            if (!data || data.length === 0) {
                data = [
                    { id: '1', name: 'Floral Rustic Elegance', thumbnail_url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f', tier: 'premium', preview_url: '', slug: 'floral-rustic', created_at: new Date().toISOString() },
                    { id: '2', name: 'Clean White Minimalist', thumbnail_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8', tier: 'basic', preview_url: '', slug: 'clean-white', created_at: new Date().toISOString() },
                    { id: '3', name: 'Golden Luxury Night', thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552', tier: 'exclusive', preview_url: '', slug: 'golden-luxury', created_at: new Date().toISOString() },
                ];
            }

            setThemes(data);
            setLoading(false);
        };
        fetch();
    }, []);

    const filteredThemes = filter === 'all' ? themes : themes.filter(t => t.tier === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Pilihan Tema Eksklusif</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Temukan desain undangan pernikahan impian Anda. Dari gaya klasik, modern, hingga adat tradisional.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {['all', 'free', 'basic', 'premium', 'exclusive'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-full capitalize font-medium transition ${filter === f
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-purple-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="min-h-[400px] flex items-center justify-center">Loading...</div>
                ) : filteredThemes.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">Belum ada tema untuk kategori ini.</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredThemes.map(theme => (
                            <div key={theme.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                                <div className="h-64 overflow-hidden relative">
                                    {theme.thumbnail_url ? (
                                        <img src={theme.thumbnail_url} alt={theme.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Preview</div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-600">
                                        {theme.tier}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        {theme.preview_url && (
                                            <a href={theme.preview_url} target="_blank" className="text-gray-500 text-sm hover:text-purple-600 flex items-center gap-1">
                                                Live Preview
                                            </a>
                                        )}
                                        <Link
                                            href={`/pricing?tier=${theme.tier}`}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition"
                                        >
                                            Pilih Tema
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ThemesPage;
