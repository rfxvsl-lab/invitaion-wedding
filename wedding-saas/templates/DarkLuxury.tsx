import React, { useState, useRef, useEffect } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, Music, ArrowDown, Star, Image as ImageIcon
} from 'lucide-react';
import { mapToTemplateData } from '../utils/templateMapper';
import { InvitationData } from '../types/invitation';

/**
 * TEMPLATE: DARK LUXURY
 * Style: Cinematic, High-Fashion, Gold on Black
 * Palette: Black (#121212), Gold (#BF953F), Dark Grey
 */

const DarkLuxuryTemplate = ({ data }: { data: InvitationData }) => {
    // --- STATE & REFS ---
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // --- MAPPED DATA ---
    const invitation = mapToTemplateData(data);
    if (!invitation) return null;

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    // --- CUSTOM HELPERS ---

    // Metallic Gold Gradient Text Component
    const GoldText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] ${className}`}>
            {children}
        </span>
    );

    // Gold Divider
    const GoldDivider = () => (
        <div className="flex items-center justify-center gap-4 py-12 opacity-80">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#BF953F]"></div>
            <div className="rotate-45 w-2 h-2 border border-[#BF953F] bg-[#121212]"></div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#BF953F]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#121212] text-[#E2E8F0] font-sans selection:bg-[#BF953F] selection:text-black overflow-x-hidden">
            {/* FONTS */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .font-luxury { font-family: 'Playfair Display SC', serif; }
        .font-body { font-family: 'Source Sans Pro', sans-serif; }
        
        /* Gold Glow Animation */
        @keyframes gold-pulse {
            0% { box-shadow: 0 0 0 0 rgba(191, 149, 63, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(191, 149, 63, 0); }
            100% { box-shadow: 0 0 0 0 rgba(191, 149, 63, 0); }
        }
        .animate-gold-pulse {
            animation: gold-pulse 2s infinite;
        }
        
        /* Smooth Reveal */
        .reveal-up {
            animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        @keyframes revealUp {
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <audio ref={audioRef} src={invitation.metadata.music_url} loop />

            {/* === LOCK SCREEN (COVER) === */}
            <div className={`fixed inset-0 z-50 bg-[#050505] transition-transform duration-[1.5s] ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col items-center justify-center p-6 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
                {/* Background with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src={invitation.hero.main_image_url} className="w-full h-full object-cover opacity-40 grayscale" alt="Cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center w-full max-w-lg border border-[#333] p-8 md:p-12 backdrop-blur-sm bg-black/30">
                    <p className="font-body tracking-[0.4em] text-[#888] text-xs uppercase mb-6">The Wedding Celebration</p>

                    <h1 className="font-luxury text-5xl md:text-7xl mb-4 leading-tight">
                        <GoldText>{invitation.hero.groom_nickname}</GoldText>
                        <span className="block text-2xl my-2 text-[#666] font-thin">&</span>
                        <GoldText>{invitation.hero.bride_nickname}</GoldText>
                    </h1>

                    <div className="w-[1px] h-16 bg-gradient-to-b from-[#BF953F] to-transparent mx-auto my-8"></div>

                    <button
                        onClick={handleOpen}
                        className="group relative px-8 py-3 border border-[#BF953F] text-[#BF953F] font-body text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#BF953F] hover:text-black overflow-hidden"
                    >
                        <span className="relative z-10">Unlock Invitation</span>
                        <div className="absolute inset-0 bg-[#BF953F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={contentRef} className={`relative z-10 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

                {/* 1. HERO HEADER */}
                <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src={invitation.hero.main_image_url} className="w-full h-full object-cover opacity-30" alt="Hero" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]"></div>
                    </div>

                    <div className="relative z-10 reveal-up" style={{ animationDelay: '0.5s' }}>
                        <p className="font-luxury text-2xl md:text-3xl text-[#E2E8F0] mb-2 tracking-widest">
                            {invitation.hero.groom_nickname} <span className="text-[#BF953F]">&</span> {invitation.hero.bride_nickname}
                        </p>
                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-[1px] w-12 bg-[#BF953F]"></div>
                            <p className="font-body text-xs tracking-[0.3em] uppercase text-[#BF953F]">Save The Date</p>
                            <div className="h-[1px] w-12 bg-[#BF953F]"></div>
                        </div>
                        <p className="font-luxury text-xl text-[#888]">
                            {formatDate(invitation.hero.wedding_date_time)}
                        </p>
                    </div>

                    <div className="absolute bottom-10 animate-bounce text-[#BF953F] opacity-50">
                        <ArrowDown size={20} />
                    </div>
                </header>

                {/* 2. QUOTE */}
                <section className="py-20 px-8 text-center max-w-3xl mx-auto relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-[#333]"></div>

                    <h3 className="font-luxury text-3xl mb-6 text-[#BF953F]">{invitation.quotes.title}</h3>
                    <blockquote className="font-luxury text-xl md:text-2xl italic leading-relaxed text-[#CCC] border-l-2 border-[#BF953F] pl-6 md:pl-10 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-10">
                        "{invitation.quotes.content}"
                    </blockquote>
                    <p className="font-body text-xs font-bold mt-8 uppercase tracking-widest text-[#666]">
                        — {invitation.quotes.source}
                    </p>
                </section>

                <GoldDivider />

                {/* 3. COUPLE PROFILES */}
                <section className="py-10 px-6">
                    <h2 className="text-center font-luxury text-4xl mb-16"><GoldText>The Couple</GoldText></h2>

                    <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                        {/* Groom */}
                        <div className="text-center group">
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                {/* Glowing Ring */}
                                <div className="absolute inset-0 rounded-full border border-[#BF953F] shadow-[0_0_15px_rgba(191,149,63,0.3)] group-hover:shadow-[0_0_30px_rgba(191,149,63,0.6)] transition-all duration-700"></div>
                                <div className="absolute inset-2 rounded-full overflow-hidden">
                                    <img src={invitation.couple.groom.photo_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Groom" />
                                </div>
                            </div>
                            <h3 className="font-luxury text-3xl mb-2 text-[#E2E8F0]">{invitation.couple.groom.full_name}</h3>
                            <p className="font-body text-xs text-[#666] uppercase tracking-widest mb-1">Son of</p>
                            <p className="font-luxury italic text-[#BF953F]">{invitation.couple.groom.parent_names}</p>

                            <a href={`https://instagram.com/${invitation.couple.groom.instagram_handle}`} className="inline-block mt-4 text-xs font-body text-[#666] hover:text-[#BF953F] transition-colors border-b border-transparent hover:border-[#BF953F]">
                                INSTAGRAM
                            </a>
                        </div>

                        {/* Bride */}
                        <div className="text-center group">
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                {/* Glowing Ring */}
                                <div className="absolute inset-0 rounded-full border border-[#BF953F] shadow-[0_0_15px_rgba(191,149,63,0.3)] group-hover:shadow-[0_0_30px_rgba(191,149,63,0.6)] transition-all duration-700"></div>
                                <div className="absolute inset-2 rounded-full overflow-hidden">
                                    <img src={invitation.couple.bride.photo_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Bride" />
                                </div>
                            </div>
                            <h3 className="font-luxury text-3xl mb-2 text-[#E2E8F0]">{invitation.couple.bride.full_name}</h3>
                            <p className="font-body text-xs text-[#666] uppercase tracking-widest mb-1">Daughter of</p>
                            <p className="font-luxury italic text-[#BF953F]">{invitation.couple.bride.parent_names}</p>

                            <a href={`https://instagram.com/${invitation.couple.bride.instagram_handle}`} className="inline-block mt-4 text-xs font-body text-[#666] hover:text-[#BF953F] transition-colors border-b border-transparent hover:border-[#BF953F]">
                                INSTAGRAM
                            </a>
                        </div>
                    </div>
                </section>

                <GoldDivider />

                {/* 4. EVENTS (Dark Cards) */}
                <section className="py-10 px-6">
                    <h2 className="text-center font-luxury text-4xl mb-4">The Events</h2>
                    <p className="text-center font-body text-xs text-[#666] tracking-[0.3em] uppercase mb-16">Please join us</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Akad Card */}
                        <div className="bg-[#1A1A1A] border border-[#333] p-10 text-center relative overflow-hidden group hover:border-[#BF953F] transition-colors duration-500">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#BF953F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <h3 className="font-luxury text-2xl text-[#BF953F] mb-6 uppercase tracking-wider">The Ceremony</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-3 text-[#E2E8F0]">
                                    <Calendar size={16} className="text-[#BF953F]" />
                                    <span className="font-body text-sm tracking-wide">{invitation.events.akad.date}</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-[#E2E8F0]">
                                    <Clock size={16} className="text-[#BF953F]" />
                                    <span className="font-body text-sm tracking-wide">{invitation.events.akad.time}</span>
                                </div>
                            </div>
                            <div className="my-8 w-12 h-[1px] bg-[#333] mx-auto"></div>
                            <h4 className="font-luxury text-xl mb-2">{invitation.events.akad.location_name}</h4>
                            <p className="font-body text-xs text-[#888] mb-8">{invitation.events.akad.address}</p>

                            <a href={invitation.events.akad.map_url} target="_blank" className="inline-block border border-[#BF953F] text-[#BF953F] px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#BF953F] hover:text-black transition-all">
                                View Location
                            </a>
                        </div>

                        {/* Resepsi Card */}
                        <div className="bg-[#1A1A1A] border border-[#333] p-10 text-center relative overflow-hidden group hover:border-[#BF953F] transition-colors duration-500">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#BF953F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <h3 className="font-luxury text-2xl text-[#BF953F] mb-6 uppercase tracking-wider">The Reception</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-3 text-[#E2E8F0]">
                                    <Calendar size={16} className="text-[#BF953F]" />
                                    <span className="font-body text-sm tracking-wide">{invitation.events.resepsi.date}</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-[#E2E8F0]">
                                    <Clock size={16} className="text-[#BF953F]" />
                                    <span className="font-body text-sm tracking-wide">{invitation.events.resepsi.time}</span>
                                </div>
                            </div>
                            <div className="my-8 w-12 h-[1px] bg-[#333] mx-auto"></div>
                            <h4 className="font-luxury text-xl mb-2">{invitation.events.resepsi.location_name}</h4>
                            <p className="font-body text-xs text-[#888] mb-8">{invitation.events.resepsi.address}</p>

                            <a href={invitation.events.resepsi.map_url} target="_blank" className="inline-block border border-[#BF953F] text-[#BF953F] px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#BF953F] hover:text-black transition-all">
                                View Location
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. GALLERY (High Contrast) */}
                {invitation.gallery.images.length > 0 && (
                    <section className="py-20 px-4 bg-[#0A0A0A]">
                        <h2 className="text-center font-luxury text-3xl mb-12 tracking-widest">
                            <GoldText>CAPTURED MOMENTS</GoldText>
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-w-6xl mx-auto">
                            {invitation.gallery.images.map((img, idx) => (
                                <div key={idx} className="relative group overflow-hidden aspect-[3/4]">
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                        alt="Gallery"
                                    />
                                    <div className="absolute inset-0 border-[0px] group-hover:border-[4px] border-[#BF953F] transition-all duration-300 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 6. GIFTS (Black Card Style) */}
                <section className="py-20 px-6">
                    <div className="max-w-xl mx-auto text-center">
                        <Star className="w-8 h-8 text-[#BF953F] mx-auto mb-6 animate-pulse" />
                        <h2 className="font-luxury text-3xl mb-4">Wedding Gift</h2>
                        <p className="font-body text-xs text-[#888] mb-10 leading-relaxed">
                            Your presence is the greatest gift. Should you wish to honor us with a token of love, a digital transfer would be appreciated.
                        </p>

                        <div className="space-y-6">
                            {invitation.gifts.bank_accounts.map((bank, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-[#222] to-[#111] p-6 rounded-xl border border-[#333] shadow-lg relative group overflow-hidden">
                                    {/* Shine Effect */}
                                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />

                                    <div className="flex justify-between items-start mb-8">
                                        <div className="font-luxury text-[#BF953F] tracking-widest text-sm uppercase">{bank.bank_name}</div>
                                        <div className="text-[10px] text-[#555] font-mono">PLATINUM</div>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-mono text-xl tracking-widest text-[#E2E8F0] mb-2">{bank.account_number}</p>
                                        <p className="font-body text-xs text-[#888] uppercase">{bank.holder_name}</p>
                                    </div>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(bank.account_number); alert("Number Copied") }}
                                        className="absolute bottom-6 right-6 text-[#BF953F] hover:text-white transition-colors"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-black py-16 text-center border-t border-[#222]">
                    <h2 className="font-luxury text-4xl mb-4 text-[#333]">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</h2>
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#BF953F]">The Beginning of Forever</p>
                </footer>

                <div className="h-24"></div> {/* Spacer */}
            </div>

            {/* === FLOATING NAV (Dark Glass) === */}
            {isOpen && (
                <div className="fixed bottom-6 w-full z-40 px-6 flex justify-center">
                    <div className="bg-[#000000]/80 backdrop-blur-md border border-[#333] rounded-full px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-8">
                        <button onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[#666] hover:text-[#BF953F] transition-colors"><Heart size={20} /></button>
                        <button className="text-[#666] hover:text-[#BF953F] transition-colors"><Calendar size={20} /></button>
                        <div className="w-[1px] h-6 bg-[#333]"></div>
                        <button onClick={toggleMusic} className="text-[#BF953F] animate-gold-pulse rounded-full">
                            {isPlaying ? <Music size={20} /> : <Play size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* Tailwind Custom Animation for Shine */}
            <style>{`
        @keyframes shine {
            100% { left: 125%; }
        }
        .animate-shine {
            animation: shine 1s;
        }
      `}</style>
        </div>
    );
};

export default DarkLuxuryTemplate;