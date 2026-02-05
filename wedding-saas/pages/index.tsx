import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';
import { Theme, FAQ } from '@/types/database';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, Smartphone, Music, CreditCard, Layout, ArrowRight, Quote, Eye } from 'lucide-react';


interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar_url: string;
}

interface HomeProps {
    initialContent: Record<string, string>;
    themes: Theme[];
    faqs: FAQ[];
    testimonials: Testimonial[];
}

export default function Home({ initialContent, reversedThemes, faqs, testimonials }: HomeProps & { reversedThemes: Theme[] }) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const { user, profile } = useAuth();
    const router = useRouter();

    const displayThemes = reversedThemes && reversedThemes.length > 0 ? reversedThemes : [];
    const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : [
        { id: '1', name: 'Pengguna 1', role: 'Pengantin', content: 'Sangat puas dengan layanannya! Desainnya elegan dan proses pembuatannya sangat cepat. Fitur RSVP sangat membantu kami mendata tamu.', rating: 5, avatar_url: '' },
        { id: '2', name: 'Pengguna 2', role: 'Pengantin', content: 'Sangat puas dengan layanannya! Desainnya elegan dan proses pembuatannya sangat cepat. Fitur RSVP sangat membantu kami mendata tamu.', rating: 5, avatar_url: '' },
        { id: '3', name: 'Pengguna 3', role: 'Pengantin', content: 'Sangat puas dengan layanannya! Desainnya elegan dan proses pembuatannya sangat cepat. Fitur RSVP sangat membantu kami mendata tamu.', rating: 5, avatar_url: '' },
    ];

    const [showWelcome, setShowWelcome] = useState(false);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        if (router.query.welcome) setShowWelcome(true);
    }, [router.query]);

    useEffect(() => {
        if (user && profile?.full_name) {
            const createdAt = new Date(user.created_at || '').getTime();
            const lastSignIn = new Date(user.last_sign_in_at || '').getTime();
            // If last sign in is significantly later (e.g., > 10 mins) than creation, assume returning user
            const isReturning = (lastSignIn - createdAt) > 600000;

            setGreeting(isReturning ? `Selamat Datang Kembali, ${profile.full_name}` : `Hi, ${profile.full_name}`);
        }
    }, [user, profile]);

    const handleCreateInvitation = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        router.push('/editor');
    };

    return (
        <div className="page-enter bg-white">
            <Head>
                <title>Buat Undangan Pernikahan Digital Online - Undangkan Kita</title>
                <meta name="description" content="Platform pembuatan undangan pernikahan digital website. Murah, cepat, dan fitur lengkap dengan RSVP, Galeri, dan Amplop Digital." />
                <meta name="keywords" content="undangan digital, undangan website, wedding invitation, undangan online murah" />

                {/* Open Graph untuk thumbnail di WA/IG */}
                <meta property="og:title" content="Undangkan Kita - Buat Undangan Digital Cepat" />
                <meta property="og:description" content="Tersedia berbagai tema premium untuk pernikahan impian Anda." />
                <meta property="og:image" content="https://undangkankita.web.id/og-image.jpg" />
            </Head>

            {/* WELCOME MODAL */}
            {showWelcome && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl scale-100 animate-jump-in">
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🎁</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang!</h2>
                        <p className="text-slate-600 mb-6">
                            Selamat Bergabung di UndanganKita! <br />
                            Anda mendapatkan <strong className="text-pink-600">5 Token Gratis</strong>.
                        </p>
                        <button
                            onClick={() => {
                                setShowWelcome(false);
                                router.push('/editor');
                            }}
                            className="bg-pink-600 text-white w-full py-3 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200"
                        >
                            Mulai Buat Undangan
                        </button>
                    </div>
                </div>
            )}

            <Navbar />

            {/* HERO SECTION */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50 rounded-bl-[100px] -z-10"></div>
                <div className="absolute top-20 left-10 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left animate-fade-up">
                        {greeting && (
                            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 animate-bounce-in">
                                {greeting} 👋
                            </div>
                        )}
                        {!greeting && (
                            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                <Star size={14} fill="currentColor" /> {initialContent['hero_badge'] || '#1 Platform Undangan Digital'}
                            </div>
                        )}
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                            {initialContent['hero_title'] || 'Bagikan Momen Bahagiamu dengan Elegan.'}
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                            {initialContent['hero_subtitle'] || 'Buat undangan pernikahan digital yang memukau dalam hitungan menit. Fitur lengkap, desain premium, dan integrasi pembayaran hadiah cashless.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button onClick={handleCreateInvitation} className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 flex items-center justify-center gap-2">
                                {initialContent['hero_cta_primary'] || 'Buat Undangan Sekarang'} <ArrowRight size={20} />
                            </button>
                            <a href="/themes" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <Layout size={20} className="text-rose-600" /> {initialContent['hero_cta_secondary'] || 'Lihat Tema'}
                            </a>
                        </div>
                    </div>

                    <div className="relative animate-fade-up delay-200">
                        <div className="relative z-10 animate-float">
                            <img src={initialContent['hero_image'] || "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80"} className="rounded-[2.5rem] shadow-2xl border-2 border-white mx-auto w-64 md:w-80 rotate-[-5deg] hover:rotate-0 transition-transform duration-500" alt="Mobile Preview" />
                            {/* Small Logo Badge */}
                            <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                                <div className="px-2 py-2 bg-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">Trusted!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* FEATURES SNIPPET */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-rose-600 font-bold tracking-widest uppercase text-sm">{initialContent['features_badge'] || 'Kenapa Kami?'}</span>
                    <h2 className="text-4xl font-bold mt-2 mb-12">{initialContent['features_title'] || 'Fitur Terlengkap'}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-rose-50 rounded-xl">
                            <Smartphone className="mx-auto text-rose-600 mb-4" size={32} />
                            <h3 className="font-bold mb-2">{initialContent['feature_1_title'] || 'Responsive'}</h3>
                            <p className="text-sm text-gray-600">{initialContent['feature_1_desc'] || 'Tampilan sempurna di semua layar HP & Desktop.'}</p>
                        </div>
                        <div className="p-6 bg-rose-50 rounded-xl">
                            <Music className="mx-auto text-rose-600 mb-4" size={32} />
                            <h3 className="font-bold mb-2">{initialContent['feature_2_title'] || 'Audio Latar'}</h3>
                            <p className="text-sm text-gray-600">{initialContent['feature_2_desc'] || 'Musik romantis mengiringi undangan Anda.'}</p>
                        </div>
                        <div className="p-6 bg-rose-50 rounded-xl">
                            <CreditCard className="mx-auto text-rose-600 mb-4" size={32} />
                            <h3 className="font-bold mb-2">{initialContent['feature_3_title'] || 'Digital Gift'}</h3>
                            <p className="text-sm text-gray-600">{initialContent['feature_3_desc'] || 'Terima angpao cashless dengan mudah.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEMA PREVIEW SECTION */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-rose-600 font-bold tracking-widest uppercase text-sm">Desain Premium</span>
                        <h2 className="text-4xl font-bold mt-2">Pilihan Tema Populer</h2>
                        <p className="text-gray-500 mt-4">Lebih dari 500+ desain siap pakai untuk hari spesial Anda.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {displayThemes.slice(0, 3).map((theme) => (
                            <div key={theme.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={theme.thumbnail_url || 'https://via.placeholder.com/400x500'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={theme.name} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <a
                                            href={(theme.preview_url && theme.preview_url !== '#') ? theme.preview_url : `/preview/${theme.slug}`}
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
                                    <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 capitalize">{theme.tier || 'Modern'}</p>
                                    <a href={`/payment?tier=${theme.tier || 'premium'}`} className="block w-full text-center py-2 border-2 border-rose-600 text-rose-600 font-bold rounded-lg hover:bg-rose-600 hover:text-white transition-colors">
                                        Pilih Tema Ini
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="/themes" className="inline-block border-b-2 border-rose-600 text-rose-600 font-bold pb-1 hover:text-rose-800 transition">Lihat Semua Tema</a>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-rose-600 font-bold uppercase tracking-widest text-sm">Cerita Mereka</span>
                        <h2 className="text-4xl font-bold mt-2">Apa Kata Pengantin?</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Pengalaman nyata dari pasangan yang telah menggunakan UndanganKita.
                        </p>
                        {/* Write Review Button */}
                        {user && (
                            <button
                                onClick={() => router.push('/testimoni')}
                                className="mt-6 px-6 py-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-full font-bold hover:bg-rose-100 transition inline-flex items-center gap-2"
                            >
                                <Quote size={18} /> Tulis Ulasan
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {displayTestimonials.map((item, idx) => (
                            <div key={item.id || idx} className="bg-slate-50 p-8 rounded-2xl relative border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-200 flex items-center justify-center text-rose-600 font-bold overflow-hidden shrink-0">
                                        {item.avatar_url ? <img src={item.avatar_url} alt={item.name} className="w-full h-full object-cover" /> : (item.name ? item.name.charAt(0) : 'U')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">{item.role || 'Pengantin'}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex text-yellow-400 gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < (item.rating || 5) ? "currentColor" : "none"} className={i < (item.rating || 5) ? "" : "text-slate-300"} />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-600 leading-relaxed text-sm italic mb-6 flex-grow">"{item.content}"</p>

                                {/* Screenshot & Template Badge */}
                                <div className="mt-auto space-y-3 pt-4 border-t border-slate-200/50">
                                    {/* Template Badge */}
                                    {(item as any).template_name && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                                            <Layout size={12} className="text-rose-500" />
                                            Tema: {(item as any).template_name}
                                        </div>
                                    )}

                                    {/* Screenshot Thumbnail (Clickable) */}
                                    {(item as any).image_base64 && (
                                        <div
                                            className="relative h-32 w-full rounded-xl overflow-hidden cursor-pointer group border border-slate-200"
                                            onClick={() => window.open((item as any).image_base64, '_blank')}
                                        >
                                            <img
                                                src={(item as any).image_base64}
                                                alt="Bukti Undangan"
                                                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                                                <Eye className="text-white opacity-0 group-hover:opacity-100 transition transform scale-75 group-hover:scale-100" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            {faqs && faqs.length > 0 && (
                <section className="py-20 bg-rose-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <span className="text-rose-600 font-bold uppercase tracking-widest text-sm">Ada Pertanyaan?</span>
                            <h2 className="text-4xl font-bold mt-2">Tanya Jawab (FAQ)</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                        className="w-full px-6 py-4 flex items-center justify-between font-bold text-left text-gray-800 hover:bg-rose-50/50 transition"
                                    >
                                        {faq.question}
                                        <span className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>▼</span>
                                    </button>
                                    <div className={`px-6 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === index ? 'max-h-96 py-4 border-t border-gray-100' : 'max-h-0'}`}>
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch Site Content
    const { data: contentData } = await supabase.from('site_content').select('key, value');
    const initialContent: Record<string, string> = {};
    if (contentData) {
        contentData.forEach((item: any) => initialContent[item.key] = item.value);
    }

    // Fetch Themes
    const { data: themes } = await supabase.from('themes').select('*').order('tier', { ascending: true });

    // Fetch FAQs
    const { data: faqs } = await supabase.from('faqs').select('*').order('display_order', { ascending: true });

    // Fetch Testimonials
    const { data: testimonials } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });

    // Fallback themes if DB is empty
    const fallbackThemes: Theme[] = [
        { id: '1', name: 'Pink Floral', thumbnail_url: 'https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?w=600&q=80', tier: 'premium', preview_url: '', slug: 'floral-rustic', created_at: new Date().toISOString() },
        { id: '2', name: 'Modern Minimalist', thumbnail_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80', tier: 'basic', preview_url: '', slug: 'clean-white', created_at: new Date().toISOString() },
        { id: '3', name: 'Luxury Gold', thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tier: 'exclusive', preview_url: '', slug: 'golden-luxury', created_at: new Date().toISOString() },
    ];

    const displayThemes = (themes && themes.length > 0) ? themes : fallbackThemes;

    return {
        props: {
            initialContent,
            reversedThemes: displayThemes.reverse(),
            faqs: faqs || [],
            testimonials: testimonials || []
        },
    };
};
