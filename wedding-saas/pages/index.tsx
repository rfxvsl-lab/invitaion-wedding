import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';
import { Theme, FAQ } from '@/types/database';

interface HomeProps {
    initialContent: Record<string, string>;
    themes: Theme[];
    faqs: FAQ[];
}

export default function Home({ initialContent, reversedThemes, faqs }: HomeProps & { reversedThemes: Theme[] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(1);
    const [previewModal, setPreviewModal] = useState({
        open: false,
        title: '',
        category: '',
        image: ''
    });

    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openPreview = (title: string, category: string, image: string) => {
        setPreviewModal({ open: true, title, category, image });
    };

    const handleCreateInvitation = () => {
        if (user) router.push('/admin'); // Redirect to admin/dashboard for now as per previous logic
        else router.push('/login');
    };

    // Use themes from props, or fallback to static if empty (preserves protype feel)
    const displayThemes = reversedThemes && reversedThemes.length > 0 ? reversedThemes : [];

    return (
        <>
            <Head>
                <title>UndanganKita - Buat Undangan Digital Elegan</title>
                <meta name="description" content="Platform pembuatan undangan digital pernikahan, ulang tahun, dan acara lainnya dengan desain premium." />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
            </Head>

            <div className="font-sans text-slate-600 antialiased bg-slate-50 relative scroll-smooth">

                {/* Navbar */}
                <nav className={`fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            {/* Logo */}
                            <a href="#" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                                <i className="fa-solid fa-envelope-open-text text-3xl text-primary group-hover:scale-110 transition"></i>
                                <span className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Undangan<span className="text-primary">Kita</span></span>
                            </a>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex space-x-8 items-center">
                                <a href="#home" className="text-gray-600 hover:text-primary font-medium transition relative group">
                                    Beranda
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                                </a>
                                <a href="#fitur" className="text-gray-600 hover:text-primary font-medium transition relative group">
                                    Fitur
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                                </a>
                                <a href="#tema" className="text-gray-600 hover:text-primary font-medium transition relative group">
                                    Tema
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                                </a>
                                <a href="#harga" className="text-gray-600 hover:text-primary font-medium transition relative group">
                                    Harga
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                                </a>
                                <a href="#faq" className="text-gray-600 hover:text-primary font-medium transition relative group">
                                    FAQ
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                                </a>
                                {user ? (
                                    <a href="/admin" className="text-purple-600 font-bold hover:text-purple-800 transition">
                                        Dashboard
                                    </a>
                                ) : null}
                            </div>

                            {/* CTA Button Desktop */}
                            <div className="hidden md:flex items-center space-x-4">
                                {user ? (
                                    <button onClick={() => signOut()} className="text-gray-600 hover:text-primary font-medium">
                                        Keluar
                                    </button>
                                ) : (
                                    <button onClick={() => router.push('/login')} className="text-gray-600 hover:text-primary font-medium">
                                        Masuk
                                    </button>
                                )}
                                <a href="#tema" className="bg-primary hover:bg-pink-800 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5">
                                    Buat Undangan
                                </a>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-pink-600 focus:outline-none p-2">
                                    {!mobileMenuOpen ? (
                                        <i className="fa-solid fa-bars text-2xl"></i>
                                    ) : (
                                        <i className="fa-solid fa-xmark text-2xl"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Panel */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg z-50 animate-fadeIn">
                            <div className="px-4 pt-2 pb-6 space-y-2">
                                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Beranda</a>
                                <a href="#fitur" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Fitur</a>
                                <a href="#tema" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Tema</a>
                                <a href="#harga" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Harga</a>
                                <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-3">
                                    <button onClick={() => router.push('/login')} className="w-full text-center py-2 text-gray-600 font-medium">Masuk</button>
                                    <a href="#tema" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 bg-pink-600 text-white rounded-lg font-bold shadow-md hover:bg-pink-800">Buat Undangan Sekarang</a>
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
                                <div className="inline-block px-4 py-1.5 bg-pink-100 text-primary font-semibold rounded-full text-sm mb-4 border border-pink-200">
                                    🎉 Platform Undangan Digital #1
                                </div>
                                <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                    Bagikan Kebahagiaan <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Tanpa Batas</span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Buat undangan pernikahan, ulang tahun, atau acara syukuran dalam hitungan menit. Desain premium, fitur lengkap, dan mudah disebarkan via WhatsApp.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a href="#tema" className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-pink-500/20 hover:bg-pink-800 transition transform hover:-translate-y-1">
                                        Lihat Tema
                                    </a>
                                    <button onClick={() => openPreview('Floral Rustic Elegance', 'Floral, Modern', 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop')} className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 group">
                                        <i className="fa-regular fa-circle-play text-xl group-hover:text-primary transition"></i> Lihat Demo
                                    </button>
                                </div>
                                <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm">
                                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Proses Cepat</div>
                                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Aktif Selamanya</div>
                                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Revisi Mudah</div>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-xl">
                                <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border-4 border-gray-100 rotate-2 hover:rotate-0 transition duration-700 ease-in-out group cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1000&auto=format&fit=crop" alt="Contoh Undangan Digital" className="rounded-[2rem] w-full h-[500px] object-cover filter brightness-105 group-hover:brightness-110 transition" />

                                    {/* Floating Card */}
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce border border-gray-100">
                                        <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                                            <i className="fa-brands fa-whatsapp text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Auto Send</p>
                                            <p className="font-bold text-gray-800">WhatsApp</p>
                                        </div>
                                    </div>

                                    {/* Floating Card Right */}
                                    <div className="absolute top-10 -right-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse border border-gray-100">
                                        <div className="bg-pink-600/10 p-2.5 rounded-full text-pink-600">
                                            <i className="fa-solid fa-heart text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">Premium Design</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistik Section */}
                <section className="bg-white py-12 border-y border-slate-100 shadow-sm relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                            {[
                                { num: '500+', label: 'Tema Premium' },
                                { num: '10k+', label: 'Undangan Dibuat' },
                                { num: '99%', label: 'Kepuasan User' },
                                { num: '24/7', label: 'Support Tim' }
                            ].map((stat, idx) => (
                                <div key={idx} className="group">
                                    <h3 className="text-4xl font-bold text-gray-900 group-hover:text-primary transition">{stat.num}</h3>
                                    <p className="text-gray-500 mt-2 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fitur Section */}
                <section id="fitur" className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-primary font-bold tracking-wider uppercase text-xs bg-pink-100 px-3 py-1 rounded-full">Features</span>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-4">Fitur Lengkap untuk Momen Spesial</h2>
                            <p className="mt-4 text-gray-600 text-lg">Semua yang Anda butuhkan untuk membuat undangan digital yang informatif dan berkesan.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: 'music', color: 'pink', title: 'Musik Latar Otomatis', desc: 'Tambahkan lagu favorit Anda untuk mengiringi tamu saat membuka undangan.' },
                                { icon: 'map-location-dot', color: 'blue', title: 'Navigasi Peta', desc: 'Terintegrasi langsung dengan Google Maps untuk memandu tamu ke lokasi acara.' },
                                { icon: 'calendar-check', color: 'green', title: 'RSVP & Ucapan', desc: 'Terima konfirmasi kehadiran dan doa restu dari tamu undangan secara realtime.' },
                                { icon: 'gift', color: 'purple', title: 'Amplop Digital', desc: 'Memudahkan tamu memberikan hadiah cashless melalui e-wallet atau transfer bank.' },
                                { icon: 'images', color: 'yellow', title: 'Galeri Foto & Video', desc: 'Tampilkan foto pre-wedding atau video perjalanan cinta Anda dalam galeri interaktif.' },
                                { icon: 'wand-magic-sparkles', color: 'orange', title: 'Custom Nama Tamu', desc: 'Buat setiap tamu merasa spesial dengan nama yang tertulis otomatis di cover undangan.' },
                            ].map((feature, idx) => (
                                <div key={idx} className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group border border-slate-100 hover:border-${feature.color}-100`}>
                                    <div className={`w-14 h-14 bg-${feature.color}-50 rounded-xl flex items-center justify-center text-${feature.color}-600 text-2xl mb-6 group-hover:scale-110 transition duration-300 shadow-sm`}>
                                        <i className={`fa-solid fa-${feature.icon}`}></i>
                                    </div>
                                    <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-${feature.color}-600 transition`}>{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Portfolio/Tema Section */}
                <section id="tema" className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                            <div className="max-w-2xl">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Pilihan Tema Eksklusif</h2>
                                <p className="mt-4 text-gray-600">Beragam kategori tema mulai dari minimalis, floral, adat, hingga modern elegan.</p>
                            </div>
                            <button onClick={() => router.push('/themes')} className="text-primary font-semibold hover:text-pink-800 transition flex items-center gap-2 group">
                                Lihat Semua Tema <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-10">
                            {['Semua', 'Minimalis', 'Floral', 'Adat Indonesia', 'Luxury'].map((tag, idx) => (
                                <button key={idx} className={`px-6 py-2.5 rounded-full ${idx === 0 ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} text-sm font-medium transition`}>
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayThemes.slice(0, 3).map((theme) => (
                                <div key={theme.id} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                    <div className="relative overflow-hidden aspect-[4/5]">
                                        <img src={theme.thumbnail_url || 'https://via.placeholder.com/400x500'} alt={theme.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3">
                                            <button onClick={() => openPreview(theme.name, theme.tier || 'Modern', theme.thumbnail_url || '')} className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition transform hover:-translate-y-1 shadow-lg flex items-center gap-2">
                                                <i className="fa-solid fa-eye"></i> Preview
                                            </button>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm capitalize">
                                            {theme.tier}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition">{theme.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">Kategori: {theme.tier || 'General'}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => router.push(`/payment?tier=${theme.tier}`)} className="mt-4 w-full bg-slate-100 text-gray-800 py-2 rounded-lg font-bold hover:bg-primary hover:text-white transition">
                                            Pilih Tema Ini
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="harga" className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl mix-blend-multiply"></div>
                        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-pink-200 rounded-full blur-3xl mix-blend-multiply"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-primary font-bold tracking-wider uppercase text-xs bg-pink-100 px-3 py-1 rounded-full">Pricing</span>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-4">Harga Paket Simpel</h2>
                            <p className="mt-4 text-gray-600 text-lg">Pilih paket terbaik sesuai kebutuhan acara Anda. Tanpa biaya tersembunyi.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                            {/* Basic */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-pink-300 transition relative group hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-gray-900">Basic</h3>
                                <p className="text-sm text-gray-500 mt-2">Cocok untuk acara kecil.</p>
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">Rp 49rb</span>
                                    <span className="text-gray-500 text-sm">/acara</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-gray-600 text-sm">
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-green-500"></i> Masa aktif 3 Bulan</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-green-500"></i> Max 200 Tamu</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-green-500"></i> 3 Foto Galeri</li>
                                    <li className="flex items-center gap-3 opacity-50"><i className="fa-solid fa-xmark text-red-300 w-4"></i> <span className="line-through">Musik Latar</span></li>
                                </ul>
                                <button onClick={() => router.push('/payment?tier=basic')} className="block w-full py-3 px-4 bg-slate-100 text-gray-800 font-bold text-center rounded-xl hover:bg-slate-200 transition">Pilih Paket</button>
                            </div>

                            {/* Premium */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary relative transform scale-105 z-10">
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm">POPULAR</div>
                                <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                                <p className="text-sm text-gray-500 mt-2">Paling diminati pengantin.</p>
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gray-900 tracking-tight">Rp 99rb</span>
                                    <span className="text-gray-500 text-sm">/acara</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-gray-600 text-sm font-medium">
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-primary bg-pink-100 p-1 rounded-full text-xs"></i> Masa aktif 1 Tahun</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-primary bg-pink-100 p-1 rounded-full text-xs"></i> Unlimited Tamu</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-primary bg-pink-100 p-1 rounded-full text-xs"></i> 10 Foto Galeri</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-primary bg-pink-100 p-1 rounded-full text-xs"></i> Musik Latar</li>
                                </ul>
                                <button onClick={() => router.push('/payment?tier=premium')} className="block w-full py-4 px-6 bg-primary text-white font-bold text-center rounded-xl hover:bg-pink-800 transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-1">Pilih Paket Ini</button>
                            </div>

                            {/* Exclusive */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-pink-300 transition relative group hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-gray-900">Exclusive</h3>
                                <p className="text-sm text-gray-500 mt-2">Fitur lengkap tanpa batas.</p>
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">Rp 149rb</span>
                                    <span className="text-gray-500 text-sm">/acara</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-gray-600 text-sm">
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-green-500"></i> Masa aktif Selamanya</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-green-500"></i> Video Gallery</li>
                                    <li className="flex items-center gap-3"><i className="fa-solid fa-check text-green-500"></i> Custom Domain</li>
                                </ul>
                                <button onClick={() => router.push('/payment?tier=exclusive')} className="block w-full py-3 px-4 bg-slate-100 text-gray-800 font-bold text-center rounded-xl hover:bg-slate-200 transition">Pilih Paket</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-primary font-bold tracking-wider uppercase text-xs bg-pink-100 px-3 py-1 rounded-full">Help & Support</span>
                            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-4">Pertanyaan Umum (FAQ)</h2>
                            <p className="mt-4 text-gray-600">Jawaban untuk pertanyaan yang sering diajukan calon pengantin.</p>
                        </div>

                        <div className="space-y-4">
                            {(faqs && faqs.length > 0 ? faqs : [
                                { id: '1', question: 'Apakah undangan bisa diedit setelah disebar?', answer: 'Tentu saja! Anda bisa mengedit data kapan saja melalui dashboard.' },
                                { id: '2', question: 'Bagaimana cara menyebar undangan ke WhatsApp?', answer: 'Kami menyediakan fitur Generator Nama Tamu.' }
                            ]).map((faq: any, idx) => (
                                <div key={faq.id || idx} className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${activeFaq === (idx + 1) ? 'border-primary ring-1 ring-pink-600/20' : ''}`}>
                                    <button onClick={() => setActiveFaq(activeFaq === (idx + 1) ? null : (idx + 1))} className="flex justify-between items-center w-full px-6 py-4 bg-white hover:bg-gray-50 transition text-left">
                                        <span className="font-semibold text-gray-900">{faq.question}</span>
                                        <i className={`fa-solid fa-chevron-down transition-transform duration-300 text-gray-400 ${activeFaq === (idx + 1) ? 'rotate-180 text-primary' : ''}`}></i>
                                    </button>
                                    {activeFaq === (idx + 1) && (
                                        <div className="px-6 py-4 bg-white text-gray-600 border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-12 mb-16">
                            <div className="md:col-span-1">
                                <a href="#" className="flex items-center gap-2 mb-6 group">
                                    <i className="fa-solid fa-envelope-open-text text-2xl text-primary group-hover:scale-110 transition"></i>
                                    <span className="font-serif text-2xl font-bold">Undangan<span className="text-primary">Kita</span></span>
                                </a>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">Platform pembuatan undangan digital berbasis website yang praktis, elegan, dan ramah lingkungan.</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-lg mb-6 text-white">Menu</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li><a href="#home" className="hover:text-primary transition flex items-center gap-2">Beranda</a></li>
                                    <li><a href="#tema" className="hover:text-primary transition flex items-center gap-2">Katalog Tema</a></li>
                                    <li><a href="#harga" className="hover:text-primary transition flex items-center gap-2">Harga</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-slate-800 pt-8 text-slate-500 text-sm text-center">
                            &copy; 2024 UndanganKita. All rights reserved.
                        </div>
                    </div>
                </footer>

                {/* Preview Modal */}
                {previewModal.open && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
                            <button onClick={() => setPreviewModal({ ...previewModal, open: false })} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-gray-800 hover:bg-gray-100 flex items-center justify-center transition shadow-md">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                            <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
                                <img src={previewModal.image} alt={previewModal.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-primary text-xs font-bold tracking-wider uppercase mb-3">{previewModal.category}</span>
                                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{previewModal.title}</h3>
                                    <p className="text-gray-500 mt-4 leading-relaxed">Tema eksklusif dengan desain responsif, animasi halus, dan fitur lengkap untuk hari bahagia Anda.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => router.push('/payment?tier=premium')} className="w-full py-4 px-6 bg-primary text-white font-bold rounded-xl hover:bg-pink-800 transition shadow-lg shadow-pink-500/30">
                                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Gunakan Tema Ini
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

    // Fetch Themes
    const { data: themes } = await supabase.from('themes').select('*').order('tier', { ascending: true });

    // Fetch FAQs
    const { data: faqs } = await supabase.from('faqs').select('*').order('display_order', { ascending: true });

    return {
        props: {
            initialContent,
            reversedThemes: themes ? themes.reverse() : [], // Just to mix it up or keep specific order
            faqs: faqs || []
        },
    };
};
