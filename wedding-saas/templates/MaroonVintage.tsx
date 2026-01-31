import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Clock, Heart,
    Music, Gift, BookOpen
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: MAROON VINTAGE
 * Style: Classic, Typographic, Floral, No-Photo
 * Tier: Premium
 */

const MaroonVintage: React.FC<{ data: InvitationData }> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;

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

    // --- FLORAL DIVIDER COMPONENT ---
    const FloralDivider = () => (
        <div className="flex justify-center items-center my-6 opacity-70">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <div className="mx-2 text-[#D4AF37] text-xl">❦</div>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#722F37] text-[#FAEBD7] font-serif overflow-x-hidden relative selection:bg-[#D4AF37] selection:text-[#722F37]">
            {/* --- ASSETS & STYLES --- */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Great+Vibes&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-vibe { font-family: 'Great Vibes', cursive; }
        .font-lora { font-family: 'Lora', serif; }
        
        /* Custom Animations */
        .animate-zoom-out { animation: zoomOutSmooth 2s ease-out forwards; }
        .animate-wiggle { animation: wiggle 4s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 1.5s ease-out forwards; }
        .animate-fade-up { animation: fadeInUp 1.5s ease-out forwards; opacity: 0; }
        
        @keyframes zoomOutSmooth {
            0% { transform: scale(1.2); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes wiggle {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
        }
        @keyframes slideUp {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        /* Arch Shape */
        .arch-window {
            border-top-left-radius: 50% 100px;
            border-top-right-radius: 50% 100px;
        }
      `}</style>

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === LOCK SCREEN (OPENING) === */}
            <div className={`fixed inset-0 z-50 bg-[#722F37] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1000ms] ease-in-out ${isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>

                {/* Layer 1: Wiggling Flowers (Top) */}
                <div className="absolute top-0 left-0 w-full flex justify-between pointer-events-none z-20">
                    <img src="https://images.unsplash.com/photo-1588352655610-1849f57eb269?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="w-[40%] md:w-[25%] -ml-12 -mt-12 opacity-80 mix-blend-screen animate-wiggle" alt="Flower Left" style={{ transformOrigin: 'top left' }} />
                    <img src="https://images.unsplash.com/photo-1588352655610-1849f57eb269?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="w-[40%] md:w-[25%] -mr-12 -mt-12 opacity-80 mix-blend-screen animate-wiggle scale-x-[-1]" alt="Flower Right" style={{ transformOrigin: 'top right' }} />
                </div>

                {/* Layer 2: Main Content (Zoom Out Text) */}
                <div className="relative z-10 text-center p-8 bg-white/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full py-16 px-10 animate-zoom-out shadow-2xl arch-window">
                    <p className="font-cinzel text-xs tracking-[0.3em] text-[#D4AF37] mb-6">THE WEDDING OF</p>
                    <h1 className="font-vibe text-6xl md:text-7xl text-[#EFDBB2] mb-4 drop-shadow-md">{content.hero.nicknames}</h1>
                    <div className="flex justify-center my-6">
                        <div className="h-[1px] w-16 bg-[#D4AF37]"></div>
                    </div>
                    <p className="font-lora italic text-sm text-[#EFDBB2] opacity-90 mb-10">Kepada Yth.<br />Bapak/Ibu/Saudara/i</p>

                    <button
                        onClick={handleOpen}
                        className="px-8 py-3 bg-[#D4AF37] text-[#722F37] font-cinzel font-bold text-xs tracking-widest hover:bg-[#EFDBB2] transition-colors shadow-lg rounded-sm"
                    >
                        BUKA UNDANGAN
                    </button>
                </div>

                {/* Layer 3: Balcony/Railing (Bottom Slide Up) */}
                {/* Using a decorative border/image to simulate balcony railing */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-50 z-20 animate-slide-up border-t-4 border-[#D4AF37]">
                    {/* Simulation of balcony pillars */}
                    <div className="absolute top-0 left-0 w-full h-full flex justify-around items-end">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="w-4 h-[80%] bg-[#5a2128] border-x border-[#D4AF37]/50"></div>
                        ))}
                    </div>
                    <div className="absolute top-0 w-full h-4 bg-[#D4AF37] shadow-lg"></div>
                </div>

                {/* Extra Floral Bottom (Behind Balcony) */}
                <div className="absolute bottom-0 w-full pointer-events-none z-10 opacity-60 mix-blend-screen">
                    <img src="https://images.unsplash.com/photo-1596500954932-68c0753a473a?w=800&auto=format&fit=crop&q=60" className="w-full h-64 object-cover mask-image-b-transparent" />
                </div>

            </div>
            {/* === CONTENT === */}
            <div ref={contentRef} className="relative z-10 pb-24">

                {/* 1. HERO */}
                <header className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative">
                    <div className="border-y border-[#D4AF37]/50 py-12 w-full max-w-2xl content-center relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#722F37] px-4">
                            <Heart size={20} className="text-[#D4AF37]" fill="#D4AF37" />
                        </div>

                        <p className="font-cinzel text-sm text-[#D4AF37] tracking-[0.2em] mb-6">WE ARE GETTING MARRIED</p>
                        <h2 className="font-vibe text-7xl md:text-9xl text-[#EFDBB2] mb-6 drop-shadow-lg">{content.hero.nicknames}</h2>
                        <p className="font-lora text-lg italic tracking-widest">{content.hero.date}</p>

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#722F37] px-4">
                            <div className="text-[#D4AF37] text-2xl">❦</div>
                        </div>
                    </div>
                </header>

                {/* 2. COUPLES (Text Only) */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-16">
                        {/* Groom */}
                        <div className="relative fade-in-up">
                            <h3 className="font-cinzel text-3xl text-[#D4AF37] mb-2">{content.couples.pria.name}</h3>
                            <p className="font-lora italic text-sm opacity-70 max-w-md mx-auto">{content.couples.pria.parents}</p>
                            <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto mt-8"></div>
                        </div>

                        <div className="font-vibe text-5xl text-[#EFDBB2]">&</div>

                        {/* Bride */}
                        <div className="relative fade-in-up delay-200">
                            <div className="w-[1px] h-16 bg-gradient-to-t from-[#D4AF37] to-transparent mx-auto mb-8"></div>
                            <h3 className="font-cinzel text-3xl text-[#D4AF37] mb-2">{content.couples.wanita.name}</h3>
                            <p className="font-lora italic text-sm opacity-70 max-w-md mx-auto">{content.couples.wanita.parents}</p>
                        </div>
                    </div>
                </section>

                {/* 3. EVENT DETAILS (Classic Cards) */}
                <section className="py-20 px-6 bg-[#60232b]">
                    <div className="max-w-xl mx-auto space-y-12">
                        {/* Akad */}
                        {content.events.akad.enabled !== false && (
                            <div className="border border-[#D4AF37] p-10 text-center relative hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-shadow duration-500 bg-[#722F37]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#722F37] px-6 font-cinzel text-xl text-[#D4AF37] font-bold">AKAD NIKAH</div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-center text-[#D4AF37] mb-4"><BookOpen size={24} /></div>
                                    <p className="font-cinzel font-bold text-lg">{content.events.akad.date}</p>
                                    <p className="font-lora">{content.events.akad.time}</p>
                                    <FloralDivider />
                                    <p className="font-lora italic leading-relaxed px-4">{content.events.akad.venue}</p>
                                    <p className="text-xs opacity-60 mt-2">{content.events.akad.address}</p>

                                    {content.events.akad.map_url && (
                                        <a href={content.events.akad.map_url} target="_blank" className="inline-block mt-4 border-b border-[#D4AF37] pb-1 text-xs tracking-widest hover:text-[#D4AF37]">
                                            LIHAT LOKASI
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Resepsi */}
                        {content.events.resepsi.enabled !== false && (
                            <div className="border border-[#D4AF37] p-10 text-center relative hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-shadow duration-500 bg-[#722F37]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#722F37] px-6 font-cinzel text-xl text-[#D4AF37] font-bold">RESEPSI</div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-center text-[#D4AF37] mb-4"><Music size={24} /></div>
                                    <p className="font-cinzel font-bold text-lg">{content.events.resepsi.date}</p>
                                    <p className="font-lora">{content.events.resepsi.time}</p>
                                    <FloralDivider />
                                    <p className="font-lora italic leading-relaxed px-4">{content.events.resepsi.venue}</p>
                                    <p className="text-xs opacity-60 mt-2">{content.events.resepsi.address}</p>

                                    {content.events.resepsi.map_url && (
                                        <a href={content.events.resepsi.map_url} target="_blank" className="inline-block mt-4 border-b border-[#D4AF37] pb-1 text-xs tracking-widest hover:text-[#D4AF37]">
                                            LIHAT LOKASI
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. RSVP & WISHES */}
                {engagement.rsvp && (
                    <section className="py-20 px-6">
                        <div className="max-w-lg mx-auto bg-[#5a2128] p-8 md:p-12 shadow-2xl border-t-4 border-[#D4AF37]">
                            <h3 className="font-cinzel text-2xl text-center text-[#D4AF37] mb-8">RSVP</h3>
                            {/* Passing styling to RSVP Form to match theme context */}
                            {/* Since RSVP Form is generic, we wrap it in a styled container. 
                         Future improvement: Add 'theme' prop to RsvpForm for direct stying 
                     */}
                            <div className="[&_label]:text-[#EFDBB2] [&_input]:bg-[#722F37] [&_input]:border-[#D4AF37]/30 [&_input]:text-[#EFDBB2] [&_select]:bg-[#722F37] [&_select]:text-[#EFDBB2] [&_textarea]:bg-[#722F37] [&_textarea]:text-[#EFDBB2] [&_textarea]:border-[#D4AF37]/30">
                                <RsvpForm
                                    whatsappNumber={engagement.rsvp_settings.whatsapp_number}
                                    messageTemplate={engagement.rsvp_settings.message_template}
                                    themeColor="#D4AF37"
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* FOOTER */}
                <footer className="py-12 text-center opacity-60">
                    <div className="font-vibe text-3xl mb-2">{content.hero.nicknames}</div>
                    <p className="text-[10px] tracking-widest uppercase">Created with RFX Builder</p>
                </footer>
            </div>

            {/* === FLOATING NAV === */}
            {isOpen && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                    <button
                        onClick={toggleMusic}
                        className="w-12 h-12 bg-[#722F37] text-[#D4AF37] border border-[#D4AF37] rounded-full flex items-center justify-center shadow-lg animate-spin-slow hover:scale-110 transition-transform"
                    >
                        {isPlaying ? <Music size={18} /> : <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>}
                    </button>
                </div>
            )}

        </div>
    );
};

export default MaroonVintage;
