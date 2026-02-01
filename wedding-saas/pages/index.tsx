import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [faqActive, setFaqActive] = useState<number | null>(1);
    const [previewModal, setPreviewModal] = useState({
        open: false,
        title: '',
        category: '',
        image: '',
    });

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <>
            <Head>
                <title>UndanganKita - Buat Undangan Digital Elegan</title>
                <meta name="description" content="Platform pembuatan undangan digital pernikahan, ulang tahun, dan acara lainnya dengan desain premium." />
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
                                {user?.email === 'mhmmadridho.64@gmail.com' && (
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
                                            Dashboard / Editor
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
                            <div className="px-4 pt-2 pb-6 space-y-2">
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
                                        <button onClick={handleCreateInvitation} className="w-full text-center py-3 bg-pink-600 text-white rounded-lg font-bold shadow-md hover:bg-pink-800">
                                            Dashboard
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={handleLoginRedirect} className="w-full text-center py-2 text-gray-600 font-medium">Masuk</button>
                                            <button onClick={handleCreateInvitation} className="w-full text-center py-3 bg-pink-600 text-white rounded-lg font-bold shadow-md hover:bg-pink-800">Buat Undangan Sekarang</button>
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
                                    🎉 Platform Undangan Digital #1
                                </div>
                                <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                    Bagikan Kebahagiaan <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Tanpa Batas</span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Buat undangan pernikahan, ulang tahun, atau acara syukuran dalam hitungan menit. Desain premium, fitur lengkap, dan mudah disebarkan via WhatsApp.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a href="#tema" className="px-8 py-4 bg-pink-600 text-white rounded-full font-bold shadow-xl shadow-pink-500/20 hover:bg-pink-800 transition transform hover:-translate-y-1 text-center">
                                        Lihat Tema
                                    </a>
                                    <button onClick={() => openPreview('Floral Rustic Elegance', 'Floral, Modern', 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop')} className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 group">
                                        <i className="fa-regular fa-circle-play text-xl group-hover:text-pink-600 transition"></i> Lihat Demo
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
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce border border-gray-100">
                                        <div className="bg-green-100 p-2.5 rounded-full text-green-600"><i className="fa-brands fa-whatsapp text-2xl"></i></div>
                                        <div><p className="text-xs text-gray-500 font-medium">Auto Send</p><p className="font-bold text-gray-800">WhatsApp</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features, Stats, Pricing placeholders (Simplified for React Port) */}
                {/* ... Include other sections as components or direct JSX here. For brevity, implementing essential interactive parts ... */}

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
                            </div>
                            {/* Item 2 */}
                            <div className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Theme" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3">
                                        <button onClick={() => openPreview('Clean White Minimalist', 'Minimalis', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop')} className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-pink-600 hover:text-white transition shadow-lg flex items-center gap-2"><i className="fa-solid fa-eye"></i> Preview</button>
                                    </div>
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
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-slate-500 text-sm">&copy; 2024 UndanganKita. All rights reserved.</p>
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
            </div>
        </>
    );
}
