import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Clock, Heart,
    Music, Gift, BookOpen, ChevronRight, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: MAROON VINTAGE (BLUEPRINT VERSION)
 * Style: Multi-View, Parallax, Card-Based, Floral Animation
 */

const MaroonVintage: React.FC<{ data: InvitationData }> = ({ data }) => {
    const [view, setView] = useState<'COVER' | 'QUOTES' | 'CONTENT'>('COVER');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;

    // --- AUDIO HANDLING ---
    useEffect(() => {
        if (view !== 'COVER' && !isPlaying) {
            setIsPlaying(true);
            audioRef.current?.play().catch(() => { });
        }
    }, [view]);

    const toggleMusic = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    // --- NAVIGATION HANDLERS ---
    const changeView = (nextView: 'COVER' | 'QUOTES' | 'CONTENT') => {
        setIsTransitioning(true);
        setTimeout(() => {
            setView(nextView);
            setIsTransitioning(false);
            if (nextView === 'CONTENT') {
                setTimeout(() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }
        }, 500); // 500ms fade out duration
    };

    // --- FLORAL DIVIDER ---
    const FloralDivider = () => (
        <div className="flex justify-center items-center my-6 opacity-70">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <div className="mx-2 text-[#D4AF37] text-xl">❦</div>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-[#F5F5DC] font-serif overflow-hidden selection:bg-[#D4AF37] selection:text-[#722F37]">
            {/* --- STYLES --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&family=Great+Vibes&family=Mrs+Saint+Delafield&display=swap');
                
                .font-signature { font-family: 'Mrs Saint Delafield', cursive; }
                .font-vibe { font-family: 'Great Vibes', cursive; }
                .font-body { font-family: 'Work Sans', sans-serif; }

                /* ANIMATIONS */
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(2deg); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }

                @keyframes slideInLeft { from { transform: translateX(-100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes growWidth { from { width: 0; } to { width: 100%; } }
                @keyframes drawStroke { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }

                .anim-slide-left { animation: slideInLeft 1s ease-out forwards; }
                .anim-slide-right { animation: slideInRight 1s ease-out forwards; }
                .anim-slide-up { animation: slideUp 1s ease-out forwards; }
                .anim-slide-down { animation: slideDown 1s ease-out forwards; }
                .anim-zoom { animation: zoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .anim-fade { animation: fadeIn 1.5s ease-out forwards; }
                .anim-grow { animation: growWidth 1s ease-out forwards; }

                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-800 { animation-delay: 800ms; }
                .delay-1000 { animation-delay: 1000ms; }
            `}</style>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === 1. GLOBAL BACKGROUND (FIXED) === */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base Image with Blur */}
                <div className="absolute inset-0 bg-[#2c1215]"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536510233921-8e5043bfcefe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-sm scale-110 animate-pulse"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#722F37]/40 via-transparent to-[#2c1215]/80"></div>
            </div>

            {/* === 2. DECORATIVE LAYERS (FIXED PARALLAX) === */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Top Left Tree */}
                <img src="/assets/maroon-vintage/kiri.png" className="absolute -top-10 -left-10 w-64 md:w-96 opacity-90 anim-slide-left animate-float" />

                {/* Top Right Tree (Mirror) */}
                <img src="/assets/maroon-vintage/kanan.png" className="absolute -top-10 -right-10 w-64 md:w-96 opacity-90 anim-slide-right animate-float-delayed scale-x-[-1]" />

                {/* Bottom Left Fern */}
                <img src="/assets/maroon-vintage/kiri.png" className="absolute -bottom-20 -left-10 w-48 opacity-60 anim-slide-up delay-500 rotate-180" />

                {/* Bottom Right Fern */}
                <img src="/assets/maroon-vintage/kanan.png" className="absolute -bottom-20 -right-10 w-48 opacity-60 anim-slide-up delay-500 scale-x-[-1] rotate-180" />
            </div>

            {/* === 3. TRANSITION OVERLAY === */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-[#F5F5DC] z-[60] animate-pulse"></div>
            )}

            {/* === 4. VIEWS === */}

            {/* --- VIEW: COVER --- */}
            {view === 'COVER' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 pb-20">
                    <p className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase mb-6 anim-slide-down delay-300">The Wedding Of</p>

                    <div className="relative mb-8">
                        <h1 className="font-signature text-7xl md:text-8xl text-[#EFDBB2] drop-shadow-md anim-slide-left delay-500">{content.hero.nicknames.split('&')[0]}</h1>
                        <div className="font-vibe text-4xl text-[#D4AF37] my-[-10px] anim-zoom delay-800">&</div>
                        <h1 className="font-signature text-7xl md:text-8xl text-[#EFDBB2] drop-shadow-md anim-slide-right delay-1000">{content.hero.nicknames.split('&')[1] || 'Partner'}</h1>
                    </div>

                    <div className="w-full max-w-xs bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-6 anim-slide-up delay-1000 shadow-2xl">
                        <p className="text-white/80 text-xs mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                        <div className="h-px w-0 bg-[#D4AF37] mx-auto mb-4 anim-grow delay-1000"></div>
                        <div className="bg-white/90 text-[#722F37] px-4 py-2 rounded-lg font-bold text-sm mb-4 shadow-inner">
                            Tamu Undangan
                        </div>
                        <button
                            onClick={() => changeView('QUOTES')}
                            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B08D26] text-[#2c1215] font-bold tracking-widest text-xs rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            BUKA UNDANGAN
                        </button>
                    </div>
                </div>
            )}

            {/* --- VIEW: QUOTES --- */}
            {view === 'QUOTES' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-8 pb-32">
                    <div className="bg-[#2c1215]/80 backdrop-blur-md p-8 md:p-12 rounded-[50px_50px_0_0] border-b-[6px] border-[#D4AF37] shadow-2xl max-w-lg w-full anim-slide-up">
                        <h2 className="text-[#D4AF37] text-3xl mb-6 font-serif select-none" style={{ fontFamily: 'serif' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
                        <p className="text-[#EFDBB2] text-lg font-vibe leading-loose mb-6 anim-fade delay-300">
                            {content.quote.content}
                        </p>
                        <p className="text-[#D4AF37] text-xs uppercase tracking-widest anim-fade delay-500">
                            {content.quote.source}
                        </p>
                        <button
                            onClick={() => changeView('CONTENT')}
                            className="mt-12 text-white/50 hover:text-[#D4AF37] transition-colors flex flex-col items-center gap-2 text-xs tracking-widest animate-bounce"
                        >
                            SCROLL DOWN <ChevronRight className="rotate-90" />
                        </button>
                    </div>
                </div>
            )}

            {/* --- VIEW: CONTENT (MAIN) --- */}
            {view === 'CONTENT' && (
                <div ref={containerRef} className="relative z-20 h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth pb-32">
                    <div className="min-h-screen py-12 px-4 md:px-0 flex flex-col items-center">

                        {/* MAIN CARD CONTAINER */}
                        <div className="w-full max-w-xl bg-[#F5F5DC] shadow-[0_10px_60px_rgba(0,0,0,0.5)] rounded-t-[40px] overflow-hidden relative min-h-screen anim-slide-up">

                            {/* Gold Border Frame Inside */}
                            <div className="absolute inset-4 border-[3px] border-[#D4AF37] rounded-[30px] pointer-events-none z-50 mix-blend-multiply opacity-50"></div>

                            {/* 1. HERO HEADER */}
                            <header className="pt-24 pb-20 px-8 text-center bg-[#722F37] text-[#FAEBD7] relative curve-bottom">
                                <img src={content.hero.main_image} className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-[#D4AF37] shadow-xl" />
                                <h2 className="font-signature text-6xl mb-4 text-[#D4AF37]">{content.hero.nicknames}</h2>
                                <p className="font-body text-sm tracking-widest uppercase">{content.hero.date}</p>
                            </header>

                            {/* 2. COUPLE */}
                            <section className="py-20 px-8 text-center space-y-16">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#D4AF37] rotate-3 rounded-xl opacity-20"></div>
                                        <img src={content.couples.pria.photo} className="relative w-48 h-64 object-cover rounded-xl mx-auto shadow-lg border-2 border-[#D4AF37]" />
                                    </div>
                                    <h3 className="font-signature text-5xl text-[#722F37]">{content.couples.pria.name}</h3>
                                    <p className="text-xs text-[#555] uppercase tracking-wider">Putra dari {content.couples.pria.parents}</p>
                                </div>
                                <div className="font-vibe text-6xl text-[#D4AF37]">&</div>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#D4AF37] -rotate-3 rounded-xl opacity-20"></div>
                                        <img src={content.couples.wanita.photo} className="relative w-48 h-64 object-cover rounded-xl mx-auto shadow-lg border-2 border-[#D4AF37]" />
                                    </div>
                                    <h3 className="font-signature text-5xl text-[#722F37]">{content.couples.wanita.name}</h3>
                                    <p className="text-xs text-[#555] uppercase tracking-wider">Putri dari {content.couples.wanita.parents}</p>
                                </div>
                            </section>

                            {/* 3. EVENTS */}
                            <section className="py-20 bg-[#f0e6d2] px-8 relative">
                                <img src="/assets/maroon-vintage/kiri.png" className="absolute top-0 right-0 w-32 opacity-20 -scale-x-100 mix-blend-multiply" />

                                <div className="space-y-12 relative z-10">
                                    {/* AKAD */}
                                    <div className="text-center space-y-4">
                                        <h3 className="font-body font-bold text-[#722F37] text-2xl uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-2 inline-block">Akad Nikah</h3>
                                        <p className="font-bold text-xl text-[#333]">{content.events.akad.date} • {content.events.akad.time}</p>
                                        <p className="text-sm text-[#555] px-4 leading-relaxed">{content.events.akad.venue}</p>
                                        <a href={content.events.akad.map_url} target="_blank" className="inline-block mt-2 px-6 py-2 bg-[#722F37] text-[#D4AF37] text-xs font-bold rounded-full">GOOGLE MAPS</a>
                                    </div>

                                    {/* RESEPSI */}
                                    <div className="text-center space-y-4">
                                        <h3 className="font-body font-bold text-[#722F37] text-2xl uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-2 inline-block">Resepsi</h3>
                                        <p className="font-bold text-xl text-[#333]">{content.events.resepsi.date} • {content.events.resepsi.time}</p>
                                        <p className="text-sm text-[#555] px-4 leading-relaxed">{content.events.resepsi.venue}</p>
                                        <a href={content.events.resepsi.map_url} target="_blank" className="inline-block mt-2 px-6 py-2 bg-[#722F37] text-[#D4AF37] text-xs font-bold rounded-full">GOOGLE MAPS</a>
                                    </div>
                                </div>
                            </section>

                            {/* 4. RSVP */}
                            {engagement.rsvp && (
                                <section className="py-20 px-8 bg-[#722F37]">
                                    <h3 className="text-[#D4AF37] text-center font-body text-xl font-bold tracking-widest mb-8">RSVP</h3>
                                    <div className="bg-[#F5F5DC] p-6 rounded-xl shadow-2xl">
                                        <RsvpForm
                                            whatsappNumber={engagement.rsvp_settings.whatsapp_number}
                                            messageTemplate={engagement.rsvp_settings.message_template}
                                            themeColor="#722F37"
                                        />
                                    </div>
                                </section>
                            )}

                            <footer className="py-12 text-center text-[#722F37] opacity-60 text-[10px] tracking-widest uppercase">
                                Created with RFX Builder
                            </footer>
                        </div>
                    </div>
                </div>
            )}

            {/* === 5. FLOATING CONTROLS (RIGHT) === */}
            {view !== 'COVER' && (
                <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-3 anim-slide-left delay-1000">
                    <button className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#722F37] shadow-lg hover:scale-110 transition-transform">
                        <Gift size={18} />
                    </button>
                    <button onClick={toggleMusic} className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#722F37] shadow-lg hover:scale-110 transition-transform">
                        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                </div>
            )}

            {/* === 6. BOTTOM NAVIGATION === */}
            {view !== 'COVER' && (
                <div className="fixed bottom-0 inset-x-0 h-16 bg-white/80 backdrop-blur-lg border-t border-[#D4AF37]/30 z-50 flex justify-around items-center px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] anim-slide-up">
                    {[
                        { id: 'QUOTES', icon: BookOpen, label: 'Quotes' },
                        { id: 'Couple', icon: Heart, label: 'Couple' },
                        { id: 'CONTENT', icon: Calendar, label: 'Event' },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (item.id === 'QUOTES' || item.id === 'CONTENT') changeView(item.id as any);
                            }}
                            className={`flex flex-col items-center gap-1 ${view === item.id ? 'text-[#722F37]' : 'text-gray-400'}`}
                        >
                            <item.icon size={20} className={view === item.id ? 'fill-[#722F37]' : ''} />
                            <span className="text-[10px] font-bold uppercase">{item.label}</span>
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default MaroonVintage;
