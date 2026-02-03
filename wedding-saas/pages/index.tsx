import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';
import { getAllThemes, getAllFAQs } from '@/lib/database';
import { Theme, FAQ } from '@/types/database';

interface HomeProps {
    initialContent: Record<string, string>;
    themes: Theme[];
    faqs: FAQ[];
}

export default function Home({ initialContent, themes, faqs }: HomeProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [faqActive, setFaqActive] = useState<string | null>(null);
    const [showWelcome, setShowWelcome] = useState(false);

    // Use initialContent from Server
    const content = initialContent || {};
    const t = (key: string, fallback: string) => content[key] || fallback;

    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Welcome Modal & Onboarding Check Logic - Client Side Only
    useEffect(() => {
        if (user && user.email) {
            const checkProfile = async () => {
                const { data, error } = await supabase.from('profiles').select('id').eq('id', user.id).single();
                if (!data && !error) router.push('/onboarding');
                if (error && error.code === 'PGRST116') router.push('/onboarding');

                const key = `welcome_shown_${user.email}`;
                if (!localStorage.getItem(key)) {
                    setShowWelcome(true);
                    localStorage.setItem(key, 'true');
                }
            };
            checkProfile();
        }
    }, [user, router]);

    const handleCreateInvitation = () => {
        if (user) router.push('/editor');
        else router.push('/login');
    };

    return (
        <>
            <Head>
                <title>{t('meta_title', 'UndanganKita - Buat Undangan Digital Elegan')}</title>
                <meta name="description" content={t('meta_description', 'Platform pembuatan undangan digital pernikahan, ulang tahun, dan acara lainnya dengan desain premium.')} />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </Head>

            <div className="font-sans text-slate-600 antialiased bg-slate-50 relative scroll-smooth">

                {/* Navbar */}
                <nav className={`fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            {/* Logo */}
                            <a href="#" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                                <i className="fa-solid fa-envelope-open-text text-3xl text-pink-600 group-hover:scale-110 transition"></i>
                                <span className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Undangan<span className="text-pink-600">Kita</span></span>
                            </a>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex space-x-8 items-center">
                                <a href="/" className="text-gray-600 hover:text-pink-600 font-medium transition">Beranda</a>
                                <a href="/themes" className="text-gray-600 hover:text-pink-600 font-medium transition">Tema</a>
                                <a href="/pricing" className="text-gray-600 hover:text-pink-600 font-medium transition">Harga</a>
                                {/* Admin Link */}
                                {user?.email === 'mhmmadridho64@gmail.com' || user?.email === 'undangankita.co.id@gmail.com' ? (
                                    <button onClick={() => router.push('/admin')} className="text-red-600 font-bold hover:text-red-800">
                                        Admin Panel
                                    </button>
                                ) : null}
                            </div>

                            {/* CTA Button Desktop */}
                            <div className="hidden md:flex items-center space-x-4">
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        <button onClick={handleCreateInvitation} className="bg-pink-600 hover:bg-pink-800 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5">
                                            Dashboard
                                        </button>
                                        <button onClick={() => signOut()} className="text-gray-500 hover:text-red-600 font-medium text-sm">
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={() => router.push('/login')} className="text-gray-600 hover:text-pink-600 font-medium">Masuk</button>
                                        <button onClick={handleCreateInvitation} className="bg-pink-600 hover:bg-pink-800 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5">
                                            Buat Undangan
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-200 blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-200 blur-3xl opacity-30 animate-pulse"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left space-y-8 z-10">
                                <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                    {t('hero_title', 'Bagikan Kebahagiaan')} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">{t('hero_highlight', 'Tanpa Batas')}</span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    {t('hero_description', 'Buat undangan pernikahan, ulang tahun, atau acara syukuran dalam hitungan menit. Desain premium, fitur lengkap, dan mudah disebarkan via WhatsApp.')}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a href="/themes" className="px-8 py-4 bg-pink-600 text-white rounded-full font-bold shadow-xl shadow-pink-500/20 hover:bg-pink-800 transition transform hover:-translate-y-1 text-center">
                                        Lihat Tema
                                    </a>
                                    <a href="/pricing" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 group">
                                        Lihat Harga
                                    </a>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-xl">
                                <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border-4 border-gray-100 rotate-2 hover:rotate-0 transition duration-700 ease-in-out group cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1000&auto=format&fit=crop" alt="Contoh Undangan Digital" className="rounded-[2rem] w-full h-[500px] object-cover filter brightness-105 group-hover:brightness-110 transition" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tema Section */}
                <section id="tema" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                            <div className="max-w-2xl">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Pilihan Tema Eksklusif</h2>
                                <p className="mt-4 text-gray-600">Tema terbaru yang dapat Anda pilih via Admin Panel.</p>
                            </div>
                            <a href="/themes" className="text-pink-600 font-bold hover:text-pink-800 flex items-center gap-2">
                                Lihat Semua Tema <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {themes.slice(0, 3).map((theme) => (
                                <div key={theme.id} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                    <div className="relative overflow-hidden aspect-[4/5]">
                                        <img src={theme.thumbnail_url || 'https://via.placeholder.com/400x500?text=No+Image'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={theme.name} />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-pink-600">
                                            {theme.tier}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">{theme.name}</h3>
                                        <div className="mt-4 flex gap-2">
                                            {theme.preview_url && (
                                                <a href={theme.preview_url} target="_blank" className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-center text-sm font-bold hover:bg-gray-200">
                                                    Preview
                                                </a>
                                            )}
                                            <a href={`/payment?tier=${theme.tier}`} className="flex-1 bg-pink-600 text-white py-2 rounded-lg text-center text-sm font-bold hover:bg-pink-700">
                                                Pilih
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section - Quick View */}
                <section id="harga" className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{t('pricing_title', 'Harga Paket')}</h2>
                            <p className="mt-4 text-gray-600">Pilih paket sesuai kebutuhan Anda.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                            {/* Simple Cards directing to Payment */}
                            {['basic', 'premium', 'exclusive'].map((tier) => (
                                <div key={tier} className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition relative group hover:-translate-y-1 duration-300 ${tier === 'premium' ? 'border-2 border-pink-600 shadow-xl scale-105 z-10' : ''}`}>
                                    <h3 className="text-xl font-bold text-gray-900 capitalize">{tier}</h3>
                                    <div className="my-6">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {tier === 'basic' ? 'Rp 49rb' : tier === 'premium' ? 'Rp 99rb' : 'Rp 149rb'}
                                        </span>
                                    </div>
                                    <button onClick={() => router.push(`/payment?tier=${tier}`)} className={`block w-full py-3 px-4 font-bold text-center rounded-xl transition ${tier === 'premium' ? 'bg-pink-600 text-white hover:bg-pink-800' : 'bg-slate-100 text-gray-800 hover:bg-slate-200'}`}>
                                        Pilih Paket Ini
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <a href="/pricing" className="text-pink-600 font-bold hover:underline">Lihat Perbandingan Lengkap &rarr;</a>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-4">Pertanyaan Umum</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${faqActive === faq.id ? 'border-pink-600 ring-1 ring-pink-600/20' : ''}`}>
                                    <button onClick={() => setFaqActive(faqActive === faq.id ? null : faq.id)} className="flex justify-between items-center w-full px-6 py-4 bg-white hover:bg-gray-50 transition text-left">
                                        <span className="font-semibold text-gray-900">{faq.question}</span>
                                        <i className={`fa-solid fa-chevron-down transition-transform duration-300 text-gray-400 ${faqActive === faq.id ? 'rotate-180 text-pink-600' : ''}`}></i>
                                    </button>
                                    {faqActive === faq.id && (
                                        <div className="px-6 py-4 bg-white text-gray-600 border-t border-gray-100 animate-fadeIn whitespace-pre-line">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                            <p>© 2024 UndanganKita. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch Site Content
    const { data: contentData } = await supabase.from('site_content').select('key, value');
    const initialContent: Record<string, string> = {};
    if (contentData) {
        contentData.forEach((item: any) => initialContent[item.key] = item.value);
    }

    // Fetch Themes (Client side helper works here because we use same supabase client, as long as ENV vars are present in Node)
    // To be safe, let's just use the supabase client directly here for SSR
    const { data: themes } = await supabase.from('themes').select('*').order('tier', { ascending: true });

    // Fetch FAQs
    const { data: faqs } = await supabase.from('faqs').select('*').order('display_order', { ascending: true });

    return {
        props: {
            initialContent,
            themes: themes || [],
            faqs: faqs || []
        },
    };
};
