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
        <div className="min-h-screen bg-[#722F37] font-serif overflow-x-hidden relative selection:bg-[#D4AF37] selection:text-[#722F37]">
            {/* --- ASSETS & STYLES --- */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&family=Great+Vibes&family=Mrs+Saint+Delafield&display=swap');
        
        /* Typography Mapping */
        .font-signature { font-family: 'Mrs Saint Delafield', cursive; }
        .font-vibe { font-family: 'Great Vibes', cursive; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        
        /* --- ANIMATIONS --- */
        .wave-left {
            animation: wave-left 5s ease-in-out infinite alternate;
            transform-origin: top left;
        }
        .wave-right {
            animation: wave-right 5s ease-in-out infinite alternate;
            transform-origin: top right;
        }

        @keyframes wave-left { 
            0% { transform: rotate(-10deg); }
            100% { transform: rotate(4deg); }
        }

        @keyframes wave-right { 
            0% { transform: rotate(10deg); }
            100% { transform: rotate(-4deg); }
        }

        .animate-zoom-out { animation: zoomOutSmooth 2s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1.5s ease-out forwards; }
        .animate-fade-up { animation: fadeInUp 1.5s ease-out forwards; opacity: 0; }
        
        @keyframes zoomOutSmooth {
            0% { transform: scale(1.2); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .arch-window {
            border-top-left-radius: 50% 100px;
            border-top-right-radius: 50% 100px;
        }
      `}</style>

            {/* Background Texture (Global Layer) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[#2c1215] opacity-50"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536510233921-8e5043bfcefe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#722F37]/80 via-[#722F37]/90 to-[#2c1215]"></div>
            </div>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === LOCK SCREEN (OPENING) === */}
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-[1000ms] ease-in-out ${isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>

                {/* Background for Lock Screen */}
                <div className="absolute inset-0 bg-[#722F37] z-0">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                </div>

                {/* Layer 1: Waving Flowers (Top Corners) - Back Layer */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden mx-auto left-0 right-0">
                    <img src="/assets/maroon-vintage/leaf-1.png"
                        className="absolute -top-10 -left-10 w-[60%] md:w-[30%] opacity-90 mix-blend-screen wave-left"
                        alt="Floral TL" />
                    <img src="/assets/maroon-vintage/leaf-2.png"
                        className="absolute -top-10 -right-10 w-[60%] md:w-[30%] opacity-90 mix-blend-screen wave-right scale-x-[-1]"
                        alt="Floral TR" />
                </div>

                {/* Layer 2: Balcony/Railing (Blocking View - Z-Index 5) 
                    MOVED BEFORE CONTENT so it is behind the button if overlapping, 
                    OR user wants it 'paling belakang' (furthest back) relative to opening?
                    User said: "balconnya pada buka undangan taruh layer paling belakang karena buka undangan tertutup oleh bagian tsb"
                    So Balcony < Content.
                    We set Balcony z-index to 5. Content z-index to 20.
                 */}
                <div className="absolute bottom-0 w-full h-40 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-100 z-5 animate-slide-up border-t-[6px] border-[#D4AF37] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] bg-[#2c1215]">
                    {/* Balcony Pillars */}
                    <div className="absolute top-0 left-0 w-full h-full flex justify-around items-end px-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-8 h-[70%] bg-gradient-to-r from-[#5a2128] to-[#3d1216] border-x-2 border-[#D4AF37] shadow-lg relative rounded-t-sm">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D4AF37] rounded-full shadow-inner"></div>
                            </div>
                        ))}
                    </div>
                    {/* Handrail Shadow */}
                    <div className="absolute top-0 w-full h-6 bg-gradient-to-b from-[#D4AF37] to-[#8a6e2f]"></div>
                </div>

                {/* Layer 3: Main Content with Photo Frame (Z-Index 20 - Top) */}
                <div className="relative z-20 text-center flex flex-col items-center w-full max-w-[320px] pb-32">
                    <p className="font-body tracking-[0.3em] text-[#D4AF37] mb-4 text-xs uppercase animate-fade-up">The Wedding Of</p>

                    {/* Cover Photo Frame */}
                    <div className="relative w-48 h-64 mb-6 border-[6px] border-[#D4AF37] shadow-2xl animate-zoom-out bg-gray-800 overflow-hidden rounded-sm outline outline-2 outline-[#722F37] outline-offset-[-8px]">
                        <img
                            src={content.couples.wanita.photo || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=60"}
                            className="w-full h-full object-cover opacity-90 sepia-[0.3]"
                            alt="Cover Couple"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <h1 className="font-signature text-6xl text-[#EFDBB2] mb-2 drop-shadow-md leading-relaxed pr-2 animate-fade-up delay-100">{content.hero.nicknames}</h1>

                    <div className="p-6 bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg shadow-lg mt-4 animate-fade-up delay-200 w-full">
                        <p className="font-body italic text-sm text-[#EFDBB2] opacity-90 mb-6 font-light">Kepada Yth.<br />Bapak/Ibu/Saudara/i</p>
                        <button
                            onClick={handleOpen}
                            className="px-6 py-2 bg-[#D4AF37] text-[#722F37] font-body font-semibold text-xs tracking-widest hover:bg-[#EFDBB2] transition-colors shadow-lg rounded-sm border border-[#722F37]"
                        >
                            BUKA UNDANGAN
                        </button>
                    </div>
                </div>

                {/* Extra Floral Bottom (In front of Balcony for depth but behind content?) - z-6 */}
                <div className="absolute bottom-0 w-full pointer-events-none z-6 opacity-100">
                    <img src="https://images.unsplash.com/photo-1596500954932-68c0753a473a?w=800&auto=format&fit=crop&q=60"
                        className="w-full h-48 object-cover mask-image-b-transparent brightness-75"
                        style={{ maskImage: 'linear-gradient(to top, black 40%, transparent)' }}
                        alt="Bottom Floral" />
                </div>

            </div>

            {/* === CONTENT === */}
            <div ref={contentRef} className="relative z-10 pb-24 text-[#FAEBD7] w-full md:max-w-xl md:mx-auto md:shadow-2xl md:bg-[#722F37]/80">

                {/* Inner Background Pinned */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#722F37] opacity-90"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20"></div>
                </div>

                {/* 1. HERO (Inner) */}
                <header className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative z-10 w-full animate-fade-up">
                    {/* Waving Florals Inner */}
                    <div className="absolute top-0 left-0 w-full h-auto pointer-events-none z-0">
                        <img src="/assets/maroon-vintage/leaf-1.png" className="absolute -top-12 -left-12 w-48 opacity-60 wave-left" />
                        <img src="/assets/maroon-vintage/leaf-2.png" className="absolute -top-12 -right-12 w-48 opacity-60 wave-right scale-x-[-1]" />
                    </div>

                    <div className="border-[3px] border-[#D4AF37] p-2 rounded-full mb-8">
                        <div className="border border-[#D4AF37] p-1 rounded-full">
                            <img
                                src={content.couples.wanita.photo || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8"}
                                className="w-48 h-48 object-cover rounded-full sepia-[0.2]"
                            />
                        </div>
                    </div>

                    <p className="font-body text-xs text-[#D4AF37] tracking-[0.2em] mb-4 uppercase">The Wedding Of</p>
                    <h2 className="font-signature text-7xl text-[#EFDBB2] mb-4 drop-shadow-lg pr-4">{content.hero.nicknames}</h2>
                    <p className="font-body text-lg tracking-widest font-light border-y border-[#D4AF37] py-2 px-8">{content.hero.date}</p>
                </header>

                {/* 2. COUPLES (With Golden Frames) */}
                <section className="py-24 px-6 relative z-10 w-full">
                    <div className="max-w-4xl mx-auto text-center space-y-24">
                        {/* Groom */}
                        <div className="relative fade-in-up">
                            {/* Golden Frame for Groom */}
                            <div className="relative w-56 h-72 mx-auto mb-8 bg-[#2c1215] border-[8px] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)] outline outline-2 outline-[#722F37] outline-offset-4">
                                <img
                                    src={content.couples.pria.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"}
                                    className="w-full h-full object-cover"
                                    alt="Groom"
                                />
                                <div className="absolute -bottom-4 -right-4 bg-[#D4AF37] text-[#722F37] p-2 rounded-full shadow-lg">
                                    <Heart size={20} fill="#722F37" />
                                </div>
                            </div>

                            <h3 className="font-signature text-5xl text-[#D4AF37] mb-4 pr-2">{content.couples.pria.name}</h3>
                            <p className="font-body text-sm opacity-70 max-w-xs mx-auto leading-relaxed">{content.couples.pria.parents}</p>

                            <div className="flex justify-center gap-4 mt-6">
                                <a href={content.couples.pria.ig} target="_blank" className="p-2 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-[#722F37] transition-colors"><div className="w-4 h-4 bg-current rounded-sm" /></a>
                            </div>
                        </div>

                        <div className="font-vibe text-5xl text-[#EFDBB2]">&</div>

                        {/* Bride */}
                        <div className="relative fade-in-up delay-200">
                            {/* Golden Frame for Bride */}
                            <div className="relative w-56 h-72 mx-auto mb-8 bg-[#2c1215] border-[8px] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)] outline outline-2 outline-[#722F37] outline-offset-4">
                                <img
                                    src={content.couples.wanita.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60"}
                                    className="w-full h-full object-cover"
                                    alt="Bride"
                                />
                                <div className="absolute -bottom-4 -left-4 bg-[#D4AF37] text-[#722F37] p-2 rounded-full shadow-lg">
                                    <Heart size={20} fill="#722F37" />
                                </div>
                            </div>

                            <h3 className="font-signature text-5xl text-[#D4AF37] mb-4 pr-2">{content.couples.wanita.name}</h3>
                            <p className="font-body text-sm opacity-70 max-w-xs mx-auto leading-relaxed">{content.couples.wanita.parents}</p>

                            <div className="flex justify-center gap-4 mt-6">
                                <a href={content.couples.wanita.ig} target="_blank" className="p-2 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-[#722F37] transition-colors"><div className="w-4 h-4 bg-current rounded-sm" /></a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. EVENT DETAILS (Classic Cards) */}
                <section className="py-20 px-6 bg-[#60232b] relative z-20">
                    <div className="max-w-xl mx-auto space-y-12">
                        {/* Akad */}
                        {content.events.akad.enabled !== false && (
                            <div className="border border-[#D4AF37] p-8 text-center relative hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-shadow duration-500 bg-[#722F37]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#722F37] px-6 font-body text-sm tracking-[0.2em] text-[#D4AF37] font-bold uppercase">Akad Nikah</div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-center text-[#D4AF37] mb-4"><BookOpen size={24} /></div>
                                    <p className="font-body font-bold text-lg">{content.events.akad.date}</p>
                                    <p className="font-body">{content.events.akad.time}</p>
                                    <FloralDivider />
                                    <p className="font-body leading-relaxed px-4 text-sm">{content.events.akad.venue}</p>
                                    <p className="text-xs opacity-60 mt-2 font-light">{content.events.akad.address}</p>

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
                            <div className="border border-[#D4AF37] p-8 text-center relative hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-shadow duration-500 bg-[#722F37]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#722F37] px-6 font-body text-sm tracking-[0.2em] text-[#D4AF37] font-bold uppercase">Resepsi</div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-center text-[#D4AF37] mb-4"><Music size={24} /></div>
                                    <p className="font-body font-bold text-lg">{content.events.resepsi.date}</p>
                                    <p className="font-body">{content.events.resepsi.time}</p>
                                    <FloralDivider />
                                    <p className="font-body leading-relaxed px-4 text-sm">{content.events.resepsi.venue}</p>
                                    <p className="text-xs opacity-60 mt-2 font-light">{content.events.resepsi.address}</p>

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
                    <section className="py-20 px-6 relative z-10">
                        <div className="max-w-lg mx-auto bg-[#5a2128] p-8 md:p-12 shadow-2xl border-t-4 border-[#D4AF37]">
                            <h3 className="font-body tracking-[0.2em] text-center text-[#D4AF37] mb-8 text-xl">RSVP</h3>
                            {/* Passing styling to RSVP Form to match theme context */}
                            {/* Since RSVP Form is generic, we wrap it in a styled container. 
                         Future improvement: Add 'theme' prop to RsvpForm for direct stying 
                     */}
                            <div className="[&_label]:text-[#EFDBB2] [&_label]:font-body [&_input]:bg-[#722F37] [&_input]:border-[#D4AF37]/30 [&_input]:text-[#EFDBB2] [&_select]:bg-[#722F37] [&_select]:text-[#EFDBB2] [&_textarea]:bg-[#722F37] [&_textarea]:text-[#EFDBB2] [&_textarea]:border-[#D4AF37]/30 font-body">
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
                <footer className="py-12 text-center opacity-60 relative z-10">
                    <div className="font-signature text-4xl mb-4 text-[#D4AF37]">{content.hero.nicknames}</div>
                    <p className="text-[10px] tracking-widest uppercase font-body">Created with RFX Builder</p>
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
