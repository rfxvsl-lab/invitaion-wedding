import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllThemes } from '../lib/database';
import { Theme } from '../types/database';

const ThemesPage = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetch = async () => {
            const data = await getAllThemes();
            setThemes(data);
            setLoading(false);
        };
        fetch();
    }, []);

    const filteredThemes = filter === 'all' ? themes : themes.filter(t => t.tier === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        WeddingSaaS
                    </Link>
                    <nav className="flex gap-6">
                        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
                        <Link href="/themes" className="text-purple-600 font-semibold transition">Tema</Link>
                        <Link href="/pricing" className="hover:text-purple-600 transition">Harga</Link>
                    </nav>
                </div>
            </header>

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
        </div>
    );
};

export default ThemesPage;
