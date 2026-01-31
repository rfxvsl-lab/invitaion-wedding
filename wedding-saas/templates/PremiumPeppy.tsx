import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, Music, Gift, ChevronDown
} from 'lucide-react';
import { InvitationData } from '../types/invitation';

/**
 * TEMPLATE: PREMIUM PEPPY
 * Style: Organic, Floral Wiggle Animations, Tabbed Events
 * Tier: Premium
 */

const PremiumPeppy: React.FC<{ data: InvitationData }> = ({ data }) => {
    // --- STATE ---
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeEvent, setActiveEvent] = useState<'akad' | 'resepsi'>('akad');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isVisible, setIsVisible] = useState(false); // For intersection observer

    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;
    const getImg = (url: string) => url || "https://placehold.co/400x600?text=No+Image";

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) audioRef.current.play().catch(() => { });

        // Delay scroll to allow animation to start
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
            setIsVisible(true);
        }, 800);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Nomor disalin!");
    };

    // --- COUNTDOWN LOGIC ---
    useEffect(() => {
        const target = new Date(content.hero.date).getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const dist = target - now;
            if (dist < 0) { clearInterval(timer); return; }
            setTimeLeft({
                days: Math.floor(dist / (1000 * 60 * 60 * 24)),
                hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((dist % (1000 * 60)) / 1000),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [content.hero.date]);

    // --- DECORATION COMPONENTS (Floral SVG) ---
    const FloralWiggle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
        <div
            className={`absolute pointer-events-none z-0 ${className}`}
            style={{ animation: `wiggle 6s ease-in-out infinite ${delay}s` }}
        >
            {/* SVG Bunga Abstrak */}
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                <path d="M50 50 C50 50 20 20 20 50 C20 80 50 80 50 50 Z" fill="#DFA67B" />
                <path d="M50 50 C50 50 80 20 80 50 C80 80 50 80 50 50 Z" fill="#E8C39E" />
                <path d="M50 50 C50 50 20 80 50 100 C80 80 50 50 50 50 Z" fill="#F4E1D2" />
                <path d="M50 50 C50 50 50 0 50 20 C50 0 50 50 50 50 Z" stroke="#81B29A" strokeWidth="2" />
                <circle cx="50" cy="50" r="5" fill="#3D405B" />
            </svg>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#3D405B] font-sans overflow-x-hidden relative selection:bg-[#DFA67B] selection:text-white">
            {/* --- CSS INJECTION FOR ANIMATIONS --- */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        .font-peppy-serif { font-family: 'Playfair Display', serif; }
        .font-peppy-sans { font-family: 'DM Sans', sans-serif; }

        /* Wiggle Animation (Goyang Bunga) */
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-5px); }
        }

        /* Slide Up Reveal (Buka Undangan) */
        @keyframes curtain-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; display: none; }
        }

        /* Fade In Up Content */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-enter { animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        
        /* Spin Slow (Vinyl Music) */
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === 1. COVER / LOCK SCREEN === */}
            <div
                className={`fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col items-center justify-center p-6 transition-all duration-1000 ease-in-out origin-top ${isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
            >
                <FloralWiggle className="top-0 left-0 w-32 h-32 transform -scale-x-100" />
                <FloralWiggle className="bottom-0 right-0 w-40 h-40" delay={1} />

                <div className="relative z-10 text-center w-full max-w-sm bg-white p-8 rounded-[3rem] shadow-xl border-4 border-[#FFF] outline outline-1 outline-[#E5E5E5]">
                    <div className="w-40 h-56 mx-auto rounded-[100px] overflow-hidden mb-6 border-4 border-[#FAF9F6] shadow-inner relative">
                        <img src={getImg(content.hero.main_image)} className="w-full h-full object-cover" alt="Cover" />
                    </div>

                    <p className="font-peppy-sans text-xs tracking-[0.2em] uppercase text-[#DFA67B] mb-3 font-bold">The Wedding Of</p>
                    <h1 className="font-peppy-serif text-5xl mb-6 leading-tight text-[#3D405B]">{content.hero.nicknames}</h1>

                    <div className="w-16 h-1 bg-[#DFA67B] mx-auto rounded-full mb-6"></div>

                    <p className="font-peppy-sans text-sm mb-2 text-gray-500">Kepada Yth:</p>
                    <div className="font-peppy-sans font-bold text-lg mb-8 bg-[#FAF9F6] py-2 rounded-lg text-[#3D405B]">Tamu Undangan</div>

                    <button
                        onClick={handleOpen}
                        className="bg-[#3D405B] text-white px-8 py-3 rounded-full font-peppy-sans font-bold text-sm tracking-widest uppercase hover:bg-[#DFA67B] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
                    >
                        <ChevronDown size={16} className="animate-bounce" /> Buka Undangan
                    </button>
                </div>
            </div>

            {/* === 2. MAIN CONTENT SCROLL === */}
            <div ref={contentRef} className="relative z-10 pb-32">

                {/* HERO HEADER */}
                <header className="pt-24 pb-12 px-6 text-center relative overflow-hidden">
                    <FloralWiggle className="top-10 right-[-20px]" delay={0.5} />

                    <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="font-peppy-sans text-xs font-bold uppercase tracking-widest text-[#DFA67B] mb-2">We Are Getting Married</p>
                        <h2 className="font-peppy-serif text-6xl text-[#3D405B] mb-6">{content.hero.nicknames}</h2>
                        <p className="font-peppy-sans text-sm font-medium mb-8 bg-white inline-block px-6 py-2 rounded-full shadow-sm">{content.hero.date}</p>

                        {/* Countdown */}
                        <div className="flex justify-center gap-3 mb-10">
                            {Object.entries(timeLeft).map(([unit, val]) => (
                                <div key={unit} className="bg-white rounded-2xl p-3 shadow-md w-16 h-20 flex flex-col justify-center items-center border-b-4 border-[#DFA67B]">
                                    <span className="font-bold text-xl text-[#3D405B]">{val}</span>
                                    <span className="text-[9px] uppercase tracking-wider text-gray-400">{unit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="w-full h-80 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                            <img src={getImg(content.hero.main_image)} className="w-full h-full object-cover" alt="Hero" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] to-transparent opacity-20"></div>
                        </div>
                    </div>
                </header>

                {/* COUPLE SECTION */}
                <section className="py-12 px-6">
                    <div className="flex flex-col gap-16">
                        {/* Groom */}
                        <div className="flex flex-col items-center animate-enter">
                            <div className="relative">
                                <div className="w-48 h-64 rounded-[100px] overflow-hidden border-4 border-white shadow-xl relative z-10">
                                    <img src={getImg(content.couples.pria.photo)} className="w-full h-full object-cover" alt="Groom" />
                                </div>
                                {/* Background Blob Decoration */}
                                <div className="absolute top-4 -right-4 w-48 h-64 rounded-[100px] bg-[#DFA67B] opacity-20 -z-0 transform rotate-6"></div>
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="font-peppy-serif text-3xl font-bold">{content.couples.pria.name}</h3>
                                <p className="font-peppy-sans text-xs text-[#DFA67B] font-bold mt-1 uppercase tracking-widest">The Groom</p>
                                <p className="font-peppy-sans text-sm text-gray-500 mt-2 max-w-xs mx-auto">{content.couples.pria.parents}</p>
                            </div>
                        </div>

                        {/* Bride */}
                        <div className="flex flex-col items-center animate-enter" style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                <div className="w-48 h-64 rounded-[100px] overflow-hidden border-4 border-white shadow-xl relative z-10">
                                    <img src={getImg(content.couples.wanita.photo)} className="w-full h-full object-cover" alt="Bride" />
                                </div>
                                <div className="absolute top-4 -left-4 w-48 h-64 rounded-[100px] bg-[#81B29A] opacity-20 -z-0 transform -rotate-6"></div>
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="font-peppy-serif text-3xl font-bold">{content.couples.wanita.name}</h3>
                                <p className="font-peppy-sans text-xs text-[#81B29A] font-bold mt-1 uppercase tracking-widest">The Bride</p>
                                <p className="font-peppy-sans text-sm text-gray-500 mt-2 max-w-xs mx-auto">{content.couples.wanita.parents}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EVENTS TABS (Interactive) */}
                <section className="py-12 px-6">
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100">
                        <div className="text-center mb-8">
                            <h2 className="font-peppy-serif text-4xl mb-4 text-[#DFA67B]">Wedding Event</h2>

                            {/* Tabs */}
                            <div className="flex bg-[#FAF9F6] p-1.5 rounded-full relative">
                                <div
                                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#3D405B] rounded-full transition-all duration-300 shadow-md ${activeEvent === 'resepsi' ? 'translate-x-[100%] ml-1.5' : 'left-1.5'}`}
                                />
                                <button
                                    onClick={() => setActiveEvent('akad')}
                                    className={`flex-1 py-3 rounded-full text-xs font-bold relative z-10 transition-colors ${activeEvent === 'akad' ? 'text-white' : 'text-gray-400'}`}
                                >
                                    AKAD NIKAH
                                </button>
                                <button
                                    onClick={() => setActiveEvent('resepsi')}
                                    className={`flex-1 py-3 rounded-full text-xs font-bold relative z-10 transition-colors ${activeEvent === 'resepsi' ? 'text-white' : 'text-gray-400'}`}
                                >
                                    RESEPSI
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Content */}
                        <div className="text-center animate-enter space-y-4">
                            <div className="w-16 h-16 bg-[#FDF0E6] rounded-full flex items-center justify-center mx-auto text-[#DFA67B] mb-2">
                                {activeEvent === 'akad' ? <Heart fill="currentColor" /> : <Gift />}
                            </div>

                            <div>
                                <h3 className="font-peppy-serif text-2xl font-bold capitalize">{activeEvent === 'akad' ? 'Akad Nikah' : 'Resepsi'}</h3>
                                <p className="font-peppy-sans text-xs text-gray-400 mt-1 uppercase tracking-wide">Acara Spesial</p>
                            </div>

                            <div className="py-4 border-y border-dashed border-gray-200">
                                <p className="font-peppy-sans font-bold text-lg">{content.events[activeEvent].time}</p>
                                <p className="font-peppy-serif text-gray-600 text-sm mt-1">{content.events[activeEvent].date}</p>
                            </div>

                            <div>
                                <p className="font-peppy-sans font-bold text-md mb-1">{content.events[activeEvent].venue}</p>
                                <p className="font-peppy-sans text-xs text-gray-500 px-4">{content.events[activeEvent].address}</p>
                            </div>

                            {content.events[activeEvent].map_url && (
                                <a href={content.events[activeEvent].map_url} target="_blank" className="block w-full bg-[#DFA67B] text-white py-3 rounded-xl font-bold text-xs uppercase hover:bg-[#c98e65] transition-colors mt-6">
                                    Buka Peta Lokasi
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* GALLERY (Horizontal Scroll) */}
                {content.gallery.images.length > 0 && (
                    <section className="py-12 pl-6">
                        <h3 className="font-peppy-serif text-3xl mb-6 pl-2">Moment Bahagia</h3>
                        <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar pr-6">
                            {content.gallery.images.map((img, idx) => (
                                <div key={idx} className="min-w-[220px] h-[300px] rounded-3xl overflow-hidden shadow-md flex-shrink-0 relative group snap-center">
                                    <img src={getImg(img)} className="w-full h-full object-cover" alt="Gallery" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* GIFTS */}
                {engagement.gifts.length > 0 && (
                    <section className="py-12 px-6">
                        <div className="bg-[#3D405B] rounded-[3rem] p-8 text-white text-center relative overflow-hidden">
                            <FloralWiggle className="top-[-20px] left-[-20px] w-24 h-24 opacity-10" />

                            <Gift className="mx-auto mb-4 text-[#DFA67B]" size={32} />
                            <h3 className="font-peppy-serif text-2xl mb-2">Wedding Gift</h3>
                            <p className="font-peppy-sans text-xs opacity-70 mb-8 px-2">Kehadiran Anda adalah hadiah terindah. Namun jika ingin berbagi kasih, Anda dapat mengirimkannya melalui:</p>

                            <div className="space-y-4">
                                {engagement.gifts.map((g, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex items-center justify-between">
                                        <div className="text-left">
                                            <p className="font-bold text-xs text-[#DFA67B] uppercase tracking-wider">{g.bank}</p>
                                            <p className="font-mono text-lg tracking-wide">{g.acc_number}</p>
                                            <p className="text-[10px] opacity-70">a.n {g.holder}</p>
                                        </div>
                                        <button onClick={() => copyToClipboard(g.acc_number)} className="bg-white text-[#3D405B] p-2 rounded-lg hover:bg-[#DFA67B] hover:text-white transition-colors">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FOOTER */}
                <footer className="pt-8 pb-32 text-center px-6">
                    <h2 className="font-peppy-serif text-3xl text-[#3D405B] mb-2">{content.hero.nicknames}</h2>
                    <p className="font-peppy-sans text-xs text-gray-400">Terima kasih atas doa & restu Anda</p>
                </footer>

            </div>

            {/* === 3. FLOATING ACTION CONTROLS === */}
            {isOpen && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 w-full justify-center px-6">
                    {/* Nav Menu Pill */}
                    <div className="bg-white/80 backdrop-blur-lg border border-white shadow-xl rounded-full px-6 py-3 flex gap-8 text-gray-400">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#DFA67B] hover:scale-110 transition-all"><Heart size={20} fill={isPlaying ? "#DFA67B" : "none"} className={isPlaying ? "text-[#DFA67B]" : ""} /></button>
                        <button className="hover:text-[#DFA67B] hover:scale-110 transition-all"><Calendar size={20} /></button>
                        <button className="hover:text-[#DFA67B] hover:scale-110 transition-all"><MapPin size={20} /></button>
                    </div>

                    {/* Music Toggle Floating */}
                    <button
                        onClick={toggleMusic}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-white transition-all transform hover:scale-110 ${isPlaying ? 'bg-[#3D405B] text-white animate-spin-slow' : 'bg-white text-[#3D405B]'}`}
                    >
                        <Music size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PremiumPeppy;
