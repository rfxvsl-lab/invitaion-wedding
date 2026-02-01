import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';

interface SiteContent {
    key: string;
    value: string;
}

interface HomeProps {
    initialContent: Record<string, string>;
}

export default function Home({ initialContent }: HomeProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [faqActive, setFaqActive] = useState<number | null>(1);
    const [previewModal, setPreviewModal] = useState({
        open: false,
        title: '',
        category: '',
        image: '',
    });
    const [showWelcome, setShowWelcome] = useState(false);

    // Use initialContent from Server
    const content = initialContent || {};

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

                if (!data && !error) {
                    router.push('/onboarding');
                    return;
                }

                if (error && error.code === 'PGRST116') {
                    router.push('/onboarding');
                    return;
                }

                const key = `welcome_shown_${user.email}`;
                if (!localStorage.getItem(key)) {
                    setShowWelcome(true);
                    localStorage.setItem(key, 'true');
                }
            };
            checkProfile();
        }
    }, [user, router]);

    const t = (key: string, fallback: string) => content[key] || fallback;

    const openPreview = (title: string, category: string, image: string) => {
        setPreviewModal({
            open: true,
            title,
            category,
            image,
        });
    };

    const closePreview = () => {
        setPreviewModal({ ...previewModal, open: false });
    };

    const handleCreateInvitation = () => {
        if (user) {
            router.push('/editor');
        } else {
            router.push('/login');
        }
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    }

    // Fallback loading UI removed as we use SSR


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
                                {['Beranda', 'Fitur', 'Tema', 'Harga', 'FAQ'].map((item) => (
                                    <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-pink-600 font-medium transition relative group">
                                        {item}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                                    </a>
                                ))}
                                {/* Admin Link (Only for specific user) */}
                                {user?.email === 'mhmmadridho64@gmail.com' && (
                                    <button onClick={() => router.push('/admin')} className="text-red-600 font-bold hover:text-red-800">
                                        Admin Panel
                                    </button>
                                )}
                            </div>

                            {/* CTA Button Desktop */}
                            <div className="hidden md:flex items-center space-x-4">
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                                        <button onClick={handleCreateInvitation} className="bg-pink-600 hover:bg-pink-800 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5">
                                            Dashboard
                                        </button>
                                        <button onClick={() => signOut()} className="text-gray-500 hover:text-red-600 font-medium text-sm">
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={handleLoginRedirect} className="text-gray-600 hover:text-pink-600 font-medium">
                                            Masuk
                                        </button>
                                        <button onClick={handleCreateInvitation} className="bg-pink-600 hover:bg-pink-800 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5">
                                            Buat Undangan
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-pink-600 focus:outline-none p-2">
                                    <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Panel */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg z-50">
                            <div className="px-4 pt-4 pb-6 space-y-2">
                                {/* Mobile User Info */}
                                {user && (
                                    <div className="mb-4 pb-4 border-b border-gray-100 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                )}

                                {[
                                    { label: 'Beranda', href: '#home' },
                                    { label: 'Fitur', href: '#fitur' },
                                    { label: 'Tema', href: '#tema' },
                                    { label: 'Harga', href: '#harga' },
                                ].map((link) => (
                                    <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">
                                        {link.label}
                                    </a>
                                ))}
                                {user?.email === 'mhmmadridho.64@gmail.com' && (
                                    <button onClick={() => { setMobileMenuOpen(false); router.push('/admin'); }} className="block w-full text-left px-3 py-3 text-base font-bold text-red-600 hover:bg-red-50 rounded-md">
                                        Admin Panel
                                    </button>
                                )}

                                <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-3">
                                    {user ? (
                                        <div className="flex flex-col gap-2">
                                            <button onClick={handleCreateInvitation} className="w-full text-center py-3 bg-pink-600 text-white rounded-lg font-bold shadow-md hover:bg-pink-800">
                                                Dashboard
                                            </button>
                                            <button onClick={() => signOut()} className="w-full text-center py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-bold border border-gray-200">
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button onClick={handleLoginRedirect} className="w-full text-center py-2 text-gray-600 font-medium">Masuk</button>
                                            <button onClick={handleCreateInvitation} className="w-full text-center py-3 bg-pink-600 text-white rounded-lg font-bold shadow-md hover:bg-pink-800">Buat Undangan</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-200 blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-200 blur-3xl opacity-30 animate-pulse"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left space-y-8 z-10">
                                <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 font-semibold rounded-full text-sm mb-4 border border-pink-200">
                                    {t('hero_badge', '🎉 Platform Undangan Digital #1')}
                                </div>
                                <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                    {t('hero_title', 'Bagikan Kebahagiaan')} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">{t('hero_highlight', 'Tanpa Batas')}</span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    {t('hero_description', 'Buat undangan pernikahan, ulang tahun, atau acara syukuran dalam hitungan menit. Desain premium, fitur lengkap, dan mudah disebarkan via WhatsApp.')}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a href="#tema" className="px-8 py-4 bg-pink-600 text-white rounded-full font-bold shadow-xl shadow-pink-500/20 hover:bg-pink-800 transition transform hover:-translate-y-1 text-center">
                                        {t('hero_btn_primary', 'Lihat Tema')}
                                    </a>
                                    <button onClick={() => openPreview('Floral Rustic Elegance', 'Floral, Modern', 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop')} className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 group">
                                        <i className="fa-regular fa-circle-play text-xl group-hover:text-pink-600 transition"></i> {t('hero_btn_secondary', 'Lihat Demo')}
                                    </button>
                                </div>
                                <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm">
                                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> {t('hero_feature_1', 'Proses Cepat')}</div>
                                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> {t('hero_feature_2', 'Aktif Selamanya')}</div>
                                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> {t('hero_feature_3', 'Revisi Mudah')}</div>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-xl">
                                <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border-4 border-gray-100 rotate-2 hover:rotate-0 transition duration-700 ease-in-out group cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1000&auto=format&fit=crop" alt="Contoh Undangan Digital" className="rounded-[2rem] w-full h-[500px] object-cover filter brightness-105 group-hover:brightness-110 transition" />
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce border border-gray-100">
                                        <div className="bg-green-100 p-2.5 rounded-full text-green-600"><i className="fa-brands fa-whatsapp text-2xl"></i></div>
                                        <div><p className="text-xs text-gray-500 font-medium">Auto Send</p><p className="font-bold text-gray-800">WhatsApp</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fitur Section */}
                <section id="fitur" className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-pink-600 font-bold tracking-wider uppercase text-xs bg-pink-100 px-3 py-1 rounded-full">{t('feature_badge', 'Features')}</span>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-4">{t('feature_title', 'Fitur Lengkap')}</h2>
                            <p className="mt-4 text-gray-600 text-lg">{t('feature_desc', 'Semua fitur untuk momen spesial.')}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div key={num} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group border border-slate-100 hover:border-pink-100">
                                    <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 text-2xl mb-6 group-hover:scale-110 transition duration-300 shadow-sm">
                                        <i className={`fa-solid ${num === 1 ? 'fa-music' : num === 2 ? 'fa-map-location-dot' : num === 3 ? 'fa-calendar-check' : num === 4 ? 'fa-gift' : num === 5 ? 'fa-images' : 'fa-wand-magic-sparkles'}`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition">{t(`feature_${num}_title`, 'Judul Fitur')}</h3>
                                    <p className="text-gray-600 leading-relaxed">{t(`feature_${num}_desc`, 'Deskripsi fitur...')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tema Section */}
                <section id="tema" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                            <div className="max-w-2xl">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Pilihan Tema Eksklusif</h2>
                                <p className="mt-4 text-gray-600">Beragam kategori tema mulai dari minimalis, floral, adat, hingga modern elegan.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Item 1 */}
                            <div className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <img src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Theme" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3">
                                        <button onClick={() => openPreview('Floral Rustic Elegance', 'Floral, Modern', 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop')} className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-pink-600 hover:text-white transition shadow-lg flex items-center gap-2"><i className="fa-solid fa-eye"></i> Preview</button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">Floral Rustic Elegance</h3>
                                </div>
                            </div>
                            {/* Item 2 */}
                            <div className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Theme" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3">
                                        <button onClick={() => openPreview('Clean White Minimalist', 'Minimalis', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop')} className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-pink-600 hover:text-white transition shadow-lg flex items-center gap-2"><i className="fa-solid fa-eye"></i> Preview</button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">Clean White Minimalist</h3>
                                </div>
                            </div>
                            {/* Item 3 */}
                            <div className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Theme" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3">
                                        <button onClick={() => openPreview('Golden Luxury Night', 'Elegan, Mewah', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop')} className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-pink-600 hover:text-white transition shadow-lg flex items-center gap-2"><i className="fa-solid fa-eye"></i> Preview</button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">Golden Luxury Night</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="harga" className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{t('pricing_title', 'Harga Paket Simpel')}</h2>
                            <p className="mt-4 text-gray-600">{t('pricing_desc', 'Pilih paket terbaik.')}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                            {/* Basic */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-pink-200 transition relative group hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-gray-900">{t('pricing_1_name', 'Basic')}</h3>
                                <p className="text-sm text-gray-500 mt-2">{t('pricing_1_desc', 'Cocok untuk acara kecil.')}</p>
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">{t('pricing_1_price', 'Rp 49.000')}</span>
                                </div>
                                <a href="#tema" className="block w-full py-3 px-4 bg-slate-100 text-gray-800 font-bold text-center rounded-xl hover:bg-slate-200 transition">Pilih Paket</a>
                            </div>
                            {/* Premium */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-pink-600 relative transform scale-105 z-10">
                                <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm">POPULAR</div>
                                <h3 className="text-2xl font-bold text-gray-900">{t('pricing_2_name', 'Premium')}</h3>
                                <p className="text-sm text-gray-500 mt-2">{t('pricing_2_desc', 'Paling diminati.')}</p>
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gray-900 tracking-tight">{t('pricing_2_price', 'Rp 99.000')}</span>
                                </div>
                                <a href="#tema" className="block w-full py-4 px-6 bg-pink-600 text-white font-bold text-center rounded-xl hover:bg-pink-800 transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-1">Pilih Paket Ini</a>
                            </div>
                            {/* Exclusive */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-pink-200 transition relative group hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-gray-900">{t('pricing_3_name', 'Exclusive')}</h3>
                                <p className="text-sm text-gray-500 mt-2">{t('pricing_3_desc', 'Fitur lengkap.')}</p>
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">{t('pricing_3_price', 'Rp 149.000')}</span>
                                </div>
                                <a href="#tema" className="block w-full py-3 px-4 bg-slate-100 text-gray-800 font-bold text-center rounded-xl hover:bg-slate-200 transition">Pilih Paket</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-4">{t('faq_title', 'FAQ')}</h2>
                            <p className="mt-4 text-gray-600">{t('faq_desc', 'Pertanyaan umum.')}</p>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${faqActive === num ? 'border-pink-600 ring-1 ring-pink-600/20' : ''}`}>
                                    <button onClick={() => setFaqActive(faqActive === num ? null : num)} className="flex justify-between items-center w-full px-6 py-4 bg-white hover:bg-gray-50 transition text-left">
                                        <span className="font-semibold text-gray-900">{t(`faq_${num}_q`, 'Pertanyaan...')}</span>
                                        <i className={`fa-solid fa-chevron-down transition-transform duration-300 text-gray-400 ${faqActive === num ? 'rotate-180 text-pink-600' : ''}`}></i>
                                    </button>
                                    {faqActive === num && (
                                        <div className="px-6 py-4 bg-white text-gray-600 border-t border-gray-100 animate-fadeIn">
                                            {t(`faq_${num}_a`, 'Jawaban...')}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                            {/* Brand Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-envelope-open-text text-2xl text-pink-600"></i>
                                    <span className="font-serif text-xl font-bold text-white tracking-tight">Undangan<span className="text-pink-600">Kita</span></span>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    {t('footer_desc', 'Platform pembuatan undangan digital berbasis website yang praktis, elegan, dan ramah lingkungan.')}
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300">
                                        <i className="fa-brands fa-tiktok"></i>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Menu Column */}
                            <div>
                                <h4 className="text-white font-bold text-lg mb-6">{t('footer_menu_title', 'Menu')}</h4>
                                <ul className="space-y-4 text-sm">
                                    <li><a href="#home" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Beranda</a></li>
                                    <li><a href="#tema" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Katalog Tema</a></li>
                                    <li><a href="#harga" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Harga</a></li>
                                    <li><a href="#" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Tentang Kami</a></li>
                                </ul>
                            </div>

                            {/* Legal Column */}
                            <div>
                                <h4 className="text-white font-bold text-lg mb-6">{t('footer_legal_title', 'Legal')}</h4>
                                <ul className="space-y-4 text-sm">
                                    <li><a href="#" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Syarat & Ketentuan</a></li>
                                    <li><a href="#" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Kebijakan Privasi</a></li>
                                    <li><a href="#" className="hover:text-pink-600 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-600"></i> Refund Policy</a></li>
                                </ul>
                            </div>

                            {/* Contact Column */}
                            <div>
                                <h4 className="text-white font-bold text-lg mb-6">{t('footer_contact_title', 'Hubungi Kami')}</h4>
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1"><i className="fa-brands fa-whatsapp text-green-500 text-xl"></i></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">WhatsApp</p>
                                            <p className="text-white font-medium hover:text-green-500 cursor-pointer transition">{t('contact_wa', '+62 812 3456 7890')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1"><i className="fa-regular fa-envelope text-pink-500 text-xl"></i></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Email</p>
                                            <p className="text-white font-medium hover:text-pink-500 cursor-pointer transition">{t('contact_email', 'hello@undangankita.com')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                            <p>{t('footer_copy', '© 2024 UndanganKita. All rights reserved.')}</p>
                            <p dangerouslySetInnerHTML={{ __html: t('footer_bottom_right', 'Made with <span class="text-red-500">❤</span> in Indonesia.') }}></p>
                        </div>
                    </div>
                </footer>

                {/* Preview Modal */}
                {previewModal.open && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        onClick={closePreview}>
                        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative" onClick={(e) => e.stopPropagation()}>
                            <button onClick={closePreview} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-gray-800 hover:bg-gray-100 flex items-center justify-center transition shadow-md">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                            <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
                                <img src={previewModal.image} alt={previewModal.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3">{previewModal.category}</span>
                                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{previewModal.title}</h3>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {user ? (
                                        <button onClick={handleCreateInvitation} className="w-full py-4 px-6 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-800 transition">Gunakan Tema Ini</button>
                                    ) : (
                                        <button onClick={handleLoginRedirect} className="w-full py-4 px-6 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-800 transition">Login untuk Gunakan</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Welcome Modal */}
                {showWelcome && user && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-300 relative">
                            <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🎉</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Selamat Datang!</h3>
                            <p className="text-gray-600 mb-6">Halo, <span className="font-semibold text-pink-600">{user.email?.split('@')[0]}</span>! Senang bertemu Anda kembali.</p>
                            <button onClick={() => setShowWelcome(false)} className="w-full py-2.5 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition">
                                Mulai Buat Undangan
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data, error } = await supabase.from('site_content').select('key, value');

        const initialContent: Record<string, string> = {};
        if (data) {
            data.forEach((item: any) => {
                initialContent[item.key] = item.value;
            });
        }

        return {
            props: {
                initialContent,
            },
        };
    } catch (err) {
        return {
            props: {
                initialContent: {},
            },
        };
    }
};
