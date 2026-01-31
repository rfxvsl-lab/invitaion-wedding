import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, Music, Gift, ChevronDown, CheckCircle
} from 'lucide-react';
import { InvitationData } from '../types/invitation';

/**
 * TEMPLATE: PREMIUM PEPPY
 * Style: Modern Organic, Terracotta Palette, Interactive Tabs
 * Tier: Paid / Premium
 */

const PremiumPeppy: React.FC<{ data: InvitationData }> = ({ data }) => {
    // --- STATE ---
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeEventTab, setActiveEventTab] = useState<'akad' | 'resepsi'>('akad');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;

    // Asset Fallback
    const getImg = (url: string) => url || "https://placehold.co/400x600?text=No+Image";

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) audioRef.current.play().catch(() => { });
        setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth' }), 800);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Nomor rekening berhasil disalin!");
    };

    // --- COUNTDOWN LOGIC ---
    useEffect(() => {
        const targetDate = new Date(content.hero.date).getTime(); // Pastikan format date YYYY-MM-DD valid
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [content.hero.date]);

    // --- SUB-COMPONENTS (Styles) ---
    const BlobBackground = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-[#E07A5F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-[20%] left-[-10%] w-[250px] h-[250px] bg-[#81B29A] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-[#F2CC8F] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFF8F0] text-[#3D405B] font-sans overflow-x-hidden relative">
            {/* FONTS & ANIMATIONS */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&family=Grand+Hotel&display=swap');
        .font-main { font-family: 'Outfit', sans-serif; }
        .font-accent { font-family: 'Grand Hotel', cursive; }
        
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slide-up-reveal {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; display: none; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === COVER (LOCK SCREEN) === */}
            <div
                className={`fixed inset-0 z-50 bg-[#FFF8F0] flex flex-col items-center justify-center p-6 transition-all duration-1000 ease-in-out ${isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
            >
                <BlobBackground />
                <div className="text-center relative z-10 w-full max-w-sm border-2 border-[#3D405B] p-8 rounded-t-full rounded-b-[100px] bg-white/50 backdrop-blur-sm shadow-xl">
                    <div className="w-40 h-56 mx-auto rounded-t-full rounded-b-[100px] overflow-hidden mb-6 border-4 border-white shadow-lg">
                        <img src={getImg(content.hero.main_image)} className="w-full h-full object-cover" alt="Cover" />
                    </div>
                    <p className="font-main text-xs font-bold tracking-[0.2em] uppercase text-[#E07A5F] mb-2">The Wedding Of</p>
                    <h1 className="font-accent text-5xl mb-4 leading-tight">{content.hero.nicknames}</h1>
                    <div className="w-full h-[1px] bg-[#3D405B]/20 my-6"></div>
                    <p className="font-main font-medium mb-8">Kepada Yth. <br /> Tamu Undangan</p>
                    <button
                        onClick={handleOpen}
                        className="bg-[#3D405B] text-white px-8 py-3 rounded-full font-main font-bold text-sm tracking-widest uppercase hover:bg-[#E07A5F] hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        Buka Undangan
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={contentRef} className="relative z-10 pb-24">
                <BlobBackground />

                {/* 1. HERO & COUNTDOWN */}
                <header className="pt-16 pb-12 px-6 text-center">
                    <p className="font-main text-xs font-bold uppercase tracking-widest text-[#E07A5F] mb-2">We Are Getting Married</p>
                    <h2 className="font-accent text-6xl md:text-7xl mb-6 text-[#3D405B]">{content.hero.nicknames}</h2>
                    <p className="font-main text-sm font-medium opacity-70 mb-8">{content.hero.date}</p>

                    {/* Countdown Box */}
                    <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-10">
                        {['Hari', 'Jam', 'Menit', 'Detik'].map((unit, i) => {
                            const vals = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
                            return (
                                <div key={unit} className="bg-white/60 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-white">
                                    <span className="block font-main font-bold text-xl text-[#E07A5F]">{vals[i]}</span>
                                    <span className="block font-main text-[8px] uppercase tracking-wider">{unit}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="w-full h-64 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform -rotate-2">
                        <img src={getImg(content.hero.main_image)} className="w-full h-full object-cover" alt="Hero" />
                    </div>
                </header>

                {/* 2. COUPLES (Asymmetrical Layout) */}
                <section className="py-12 px-6">
                    <div className="space-y-12">
                        {/* Groom */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#E07A5F] shadow-lg relative z-10">
                                    <img src={getImg(content.couples.pria.photo)} className="w-full h-full object-cover" alt="Groom" />
                                </div>
                                <div className="absolute top-0 -left-4 w-48 h-48 rounded-full bg-[#F2CC8F] -z-0"></div>
                            </div>
                            <div className="mt-6 text-center bg-white/80 p-6 rounded-3xl shadow-sm backdrop-blur-sm w-full">
                                <h3 className="font-accent text-4xl text-[#3D405B]">{content.couples.pria.name}</h3>
                                <p className="font-main text-xs text-[#E07A5F] font-bold mt-1 mb-2">Putra Tercinta</p>
                                <p className="font-main text-xs opacity-70 px-4">{content.couples.pria.parents}</p>
                                <a href={`https://instagram.com/${content.couples.pria.ig.replace('@', '')}`} className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#3D405B] border-b border-[#3D405B]">
                                    <Instagram size={12} /> {content.couples.pria.ig}
                                </a>
                            </div>
                        </div>

                        {/* Bride */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#81B29A] shadow-lg relative z-10">
                                    <img src={getImg(content.couples.wanita.photo)} className="w-full h-full object-cover" alt="Bride" />
                                </div>
                                <div className="absolute bottom-0 -right-4 w-48 h-48 rounded-full bg-[#E07A5F]/30 -z-0"></div>
                            </div>
                            <div className="mt-6 text-center bg-white/80 p-6 rounded-3xl shadow-sm backdrop-blur-sm w-full">
                                <h3 className="font-accent text-4xl text-[#3D405B]">{content.couples.wanita.name}</h3>
                                <p className="font-main text-xs text-[#81B29A] font-bold mt-1 mb-2">Putri Tercinta</p>
                                <p className="font-main text-xs opacity-70 px-4">{content.couples.wanita.parents}</p>
                                <a href={`https://instagram.com/${content.couples.wanita.ig.replace('@', '')}`} className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#3D405B] border-b border-[#3D405B]">
                                    <Instagram size={12} /> {content.couples.wanita.ig}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. EVENTS (Premium Interactive Tabs) */}
                <section className="py-12 px-6">
                    <div className="text-center mb-8">
                        <h2 className="font-accent text-5xl mb-2 text-[#E07A5F]">Save The Date</h2>
                        <p className="font-main text-xs opacity-60">Kami menantikan kehadiran Anda</p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#F2CC8F] mb-6">
                        <button
                            onClick={() => setActiveEventTab('akad')}
                            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${activeEventTab === 'akad' ? 'bg-[#E07A5F] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            AKAD NIKAH
                        </button>
                        <button
                            onClick={() => setActiveEventTab('resepsi')}
                            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${activeEventTab === 'resepsi' ? 'bg-[#E07A5F] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            RESEPSI
                        </button>
                    </div>

                    {/* Event Card (Dynamic) */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#FFF8F0] relative overflow-hidden transition-all duration-500">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F]"></div>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-14 h-14 bg-[#FFF8F0] rounded-full flex items-center justify-center text-[#E07A5F] mb-2">
                                {activeEventTab === 'akad' ? <Heart size={24} fill="currentColor" /> : <Gift size={24} />}
                            </div>

                            <h3 className="font-accent text-4xl capitalize">
                                {activeEventTab === 'akad' ? 'Akad Nikah' : 'Resepsi'}
                            </h3>

                            <div className="w-full h-[1px] bg-gray-100"></div>

                            <div className="grid gap-4 w-full">
                                <div className="flex items-center gap-3 bg-[#FAFAFA] p-3 rounded-xl">
                                    <Calendar className="text-[#81B29A]" size={20} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Tanggal</p>
                                        <p className="font-main text-sm font-bold">{content.events[activeEventTab].date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-[#FAFAFA] p-3 rounded-xl">
                                    <Clock className="text-[#81B29A]" size={20} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Waktu</p>
                                        <p className="font-main text-sm font-bold">{content.events[activeEventTab].time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-[#FAFAFA] p-3 rounded-xl">
                                    <MapPin className="text-[#81B29A]" size={20} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Lokasi</p>
                                        <p className="font-main text-sm font-bold leading-tight">{content.events[activeEventTab].venue}</p>
                                        <p className="text-[10px] opacity-60 mt-1">{content.events[activeEventTab].address}</p>
                                    </div>
                                </div>
                            </div>

                            {content.events[activeEventTab].map_url && (
                                <a href={content.events[activeEventTab].map_url} target="_blank" className="w-full bg-[#3D405B] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#2A2D3E] transition-colors flex items-center justify-center gap-2">
                                    <MapPin size={14} /> Buka Google Maps
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* 4. GALLERY (Horizontal Scroll) */}
                {content.gallery.images.length > 0 && (
                    <section className="py-12 pl-6">
                        <h3 className="font-accent text-4xl mb-6 text-[#E07A5F]">Our Moments</h3>
                        {/* Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar pr-6">
                            {content.gallery.images.map((img, idx) => (
                                <div key={idx} className="min-w-[200px] h-[280px] rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative group">
                                    <img src={getImg(img)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. GIFTS (Modern Card) */}
                {engagement.gifts.length > 0 && (
                    <section className="py-12 px-6">
                        <div className="bg-[#3D405B] rounded-[2.5rem] p-8 text-center text-white relative overflow-hidden">
                            <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

                            <Gift className="mx-auto mb-4 text-[#F2CC8F]" size={32} />
                            <h3 className="font-accent text-3xl mb-2">Wedding Gift</h3>
                            <p className="font-main text-xs opacity-70 mb-8 px-4">Doa restu Anda adalah kado terbaik. Namun jika ingin berbagi kasih, silakan melalui:</p>

                            <div className="space-y-4">
                                {engagement.gifts.map((g, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex items-center justify-between">
                                        <div className="text-left">
                                            <p className="font-bold text-xs text-[#F2CC8F] uppercase tracking-wider">{g.bank}</p>
                                            <p className="font-mono text-lg">{g.acc_number}</p>
                                            <p className="text-[10px] opacity-70">a.n {g.holder}</p>
                                        </div>
                                        <button onClick={() => copyToClipboard(g.acc_number)} className="bg-white text-[#3D405B] p-2 rounded-lg hover:bg-[#E07A5F] hover:text-white transition-colors">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FOOTER */}
                <footer className="pt-8 pb-32 text-center">
                    <h2 className="font-accent text-3xl text-[#E07A5F]">{content.hero.nicknames}</h2>
                    <p className="font-main text-[10px] font-bold tracking-widest uppercase mt-2 opacity-50">Terima Kasih</p>
                </footer>
            </div>

            {/* === FLOATING NAV (Premium Pill) === */}
            {isOpen && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
                    {/* Nav Menu */}
                    <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-xl rounded-full px-6 py-3 flex gap-6 text-[#3D405B]">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Heart size={20} className="hover:text-[#E07A5F] transition-colors" /></button>
                        <button><Calendar size={20} className="hover:text-[#E07A5F] transition-colors" /></button>
                        <button><MapPin size={20} className="hover:text-[#E07A5F] transition-colors" /></button>
                    </div>

                    {/* Music Toggle */}
                    <button
                        onClick={toggleMusic}
                        className="w-12 h-12 bg-[#3D405B] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white/20 hover:scale-110 transition-transform"
                    >
                        {isPlaying ? <Music size={18} className="animate-spin-slow" /> : <Play size={18} />}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PremiumPeppy;
