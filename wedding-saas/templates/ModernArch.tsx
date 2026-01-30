import React, { useState, useRef, useEffect } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, ChevronDown, Music, Gift, Share2
} from 'lucide-react';

/**
 * TEMPLATE: MODERN ARCH
 * Style: Trendy, Geometric (Arch), Warm Earth Tones
 * Compatibility: InvitationDataStandard Interface
 */

import { mapToTemplateData } from '../utils/templateMapper';
import { InvitationData } from '../types/invitation';

const ModernArchTemplate = ({ data }: { data: InvitationData }) => {
    // --- STATE & REFS ---
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- MAPPED DATA ---
    // Transform existing data structure to match new template expectations
    const invitation = mapToTemplateData(data);

    // Safety check if mapping failed
    if (!invitation) return <div>Loading...</div>;

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
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
        // If invalid date (e.g. custom text "Minggu Kliwon"), return as is
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    // --- ANIMATION COMPONENT ---
    const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
        const [isVisible, setIsVisible] = useState(false);
        const domRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => setIsVisible(entry.isIntersecting));
            });
            const currentElement = domRef.current;
            if (currentElement) observer.observe(currentElement);
            return () => {
                if (currentElement) observer.unobserve(currentElement);
            };
        }, []);

        return (
            <div
                ref={domRef}
                className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#2D2D2D] font-sans overflow-x-hidden relative">
            {/* FONTS INJECTION */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Open+Sans:wght@300;400;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-opensans { font-family: 'Open Sans', sans-serif; }
        
        /* Arch Utilities */
        .arch-full { border-radius: 10rem 10rem 0 0; }
        .arch-pill { border-radius: 9999px; }
        .arch-window { border-radius: 10rem 10rem 1rem 1rem; }
      `}</style>

            <audio ref={audioRef} src={invitation.metadata.music_url} loop />

            {/* === COVER SECTION (Updated) === */}
            {/* Menggunakan absolute + h-[120vh] untuk memastikan cover menutup area scroll, dan z-[60] untuk di atas elemen lain */}
            <div className={`absolute inset-0 h-[120vh] z-[60] bg-[#F8F9FA] flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out origin-top ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
                {/* Decorative Background Arch - Added pointer-events-none */}
                <div className="absolute top-0 w-full h-1/2 bg-[#E9ECEF] rounded-b-[50%] scale-150 opacity-50 z-0 pointer-events-none"></div>

                <div className="relative z-10 text-center px-6 max-w-md w-full pb-20">
                    <div className="w-56 h-72 mx-auto mb-6 relative">
                        <div className="absolute inset-0 border border-[#A48874] arch-full translate-x-2 translate-y-2"></div>
                        <img
                            src={invitation.hero.main_image_url}
                            className="w-full h-full object-cover arch-full shadow-lg relative z-10"
                            alt="Cover"
                        />
                    </div>

                    <p className="font-opensans text-xs tracking-[0.3em] text-[#A48874] uppercase mb-2">The Wedding Of</p>
                    <h1 className="font-cormorant text-5xl text-[#2D2D2D] mb-4">
                        {invitation.hero.groom_nickname} <span className="text-[#A48874]">&</span> {invitation.hero.bride_nickname}
                    </h1>
                    <p className="font-opensans text-sm text-[#666] mb-8">
                        {formatDate(invitation.hero.wedding_date_time)}
                    </p>

                    <button
                        onClick={handleOpen}
                        className="relative z-50 bg-[#A48874] text-white px-8 py-3 rounded-full font-opensans text-xs font-bold uppercase tracking-widest hover:bg-[#8B7362] transition-colors shadow-lg flex items-center gap-2 mx-auto animate-pulse cursor-pointer"
                    >
                        Buka Undangan
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={scrollRef}>

                {/* 1. HERO (Side by Side Arches) */}
                <section className="min-h-screen pt-12 pb-20 px-6 flex flex-col justify-center items-center bg-[#F8F9FA]">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <p className="font-opensans text-xs uppercase tracking-widest text-[#666] mb-2">We Are Getting Married</p>
                            <h2 className="font-cormorant text-6xl text-[#2D2D2D]">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</h2>
                        </div>
                    </FadeIn>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-4xl mx-auto">
                        <FadeIn delay={200}>
                            <div className="relative group">
                                <div className="w-full md:w-80 h-96 mx-auto relative overflow-hidden arch-window shadow-xl">
                                    <img src={invitation.couple.groom.photo_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Groom" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white text-center">
                                        <h3 className="font-cormorant text-2xl">{invitation.couple.groom.full_name}</h3>
                                        <a href={`https://instagram.com/${invitation.couple.groom.instagram_handle}`} className="text-xs font-opensans opacity-80 underline">@{invitation.couple.groom.instagram_handle}</a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <div className="hidden md:flex items-center justify-center">
                            <div className="h-full w-[1px] bg-[#A48874] opacity-30"></div>
                        </div>

                        <FadeIn delay={400}>
                            <div className="relative group">
                                <div className="w-full md:w-80 h-96 mx-auto relative overflow-hidden arch-window shadow-xl">
                                    <img src={invitation.couple.bride.photo_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Bride" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white text-center">
                                        <h3 className="font-cormorant text-2xl">{invitation.couple.bride.full_name}</h3>
                                        <a href={`https://instagram.com/${invitation.couple.bride.instagram_handle}`} className="text-xs font-opensans opacity-80 underline">@{invitation.couple.bride.instagram_handle}</a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* 2. QUOTES (Warm Beige) */}
                <section className="py-24 px-8 bg-[#EAE2D8] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#F8F9FA] rounded-b-[100%]"></div>

                    <FadeIn>
                        <div className="max-w-2xl mx-auto mt-8">
                            <div className="mb-6">
                                <Heart fill="#A48874" className="text-[#A48874] mx-auto w-8 h-8" />
                            </div>
                            <h3 className="font-cormorant text-3xl md:text-4xl italic text-[#2D2D2D] leading-relaxed mb-6">
                                "{invitation.quotes.content}"
                            </h3>
                            <p className="font-opensans text-xs font-bold uppercase tracking-widest text-[#A48874]">
                                — {invitation.quotes.source} —
                            </p>
                        </div>
                    </FadeIn>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#F8F9FA] rounded-t-[100%]"></div>
                </section>

                {/* 3. EVENTS (Modern Cards) */}
                <section className="py-20 px-6 bg-[#F8F9FA]">
                    <FadeIn>
                        <h2 className="text-center font-cormorant text-4xl mb-16 text-[#2D2D2D]">Save The Date</h2>
                    </FadeIn>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                        {/* Akad */}
                        <FadeIn delay={200}>
                            <div className="bg-white p-8 rounded-[3rem] rounded-tl-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#E9ECEF] flex flex-col items-center text-center h-full hover:border-[#A48874] transition-colors">
                                <span className="bg-[#E9ECEF] text-[#A48874] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">The Ceremony</span>
                                <h3 className="font-cormorant text-3xl mb-2">Akad Nikah</h3>
                                <div className="w-12 h-[1px] bg-[#A48874] my-4"></div>
                                <p className="font-opensans font-bold text-lg mb-1">{invitation.events.akad.date}</p>
                                <p className="font-opensans text-sm text-[#666] mb-6">{invitation.events.akad.time}</p>
                                <p className="font-cormorant text-xl italic mb-2">{invitation.events.akad.location_name}</p>
                                <p className="font-opensans text-xs text-[#888] mb-8 px-4">{invitation.events.akad.address}</p>
                                <a href={invitation.events.akad.map_url} target="_blank" className="mt-auto inline-flex items-center gap-2 bg-[#2D2D2D] text-white px-6 py-2 rounded-full text-xs hover:bg-[#A48874] transition-colors">
                                    <MapPin size={14} /> Google Maps
                                </a>
                            </div>
                        </FadeIn>

                        {/* Resepsi */}
                        <FadeIn delay={400}>
                            <div className="bg-white p-8 rounded-[3rem] rounded-br-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#E9ECEF] flex flex-col items-center text-center h-full hover:border-[#A48874] transition-colors">
                                <span className="bg-[#E9ECEF] text-[#A48874] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">The Celebration</span>
                                <h3 className="font-cormorant text-3xl mb-2">Wedding Reception</h3>
                                <div className="w-12 h-[1px] bg-[#A48874] my-4"></div>
                                <p className="font-opensans font-bold text-lg mb-1">{invitation.events.resepsi.date}</p>
                                <p className="font-opensans text-sm text-[#666] mb-6">{invitation.events.resepsi.time}</p>
                                <p className="font-cormorant text-xl italic mb-2">{invitation.events.resepsi.location_name}</p>
                                <p className="font-opensans text-xs text-[#888] mb-8 px-4">{invitation.events.resepsi.address}</p>
                                <a href={invitation.events.resepsi.map_url} target="_blank" className="mt-auto inline-flex items-center gap-2 bg-[#2D2D2D] text-white px-6 py-2 rounded-full text-xs hover:bg-[#A48874] transition-colors">
                                    <MapPin size={14} /> Google Maps
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* 4. GALLERY (Mixed Shapes) */}
                {invitation.gallery.images.length > 0 && (
                    <section className="py-20 px-4 bg-[#FFFFFF]">
                        <div className="text-center mb-12">
                            <h2 className="font-cormorant text-4xl">Our Moments</h2>
                        </div>
                        <div className="columns-2 md:columns-3 gap-4 max-w-6xl mx-auto space-y-4">
                            {invitation.gallery.images.map((img, idx) => (
                                <FadeIn key={idx} delay={idx * 100}>
                                    <div className={`break-inside-avoid overflow-hidden shadow-md group ${idx % 2 === 0 ? 'rounded-t-[5rem] rounded-b-xl' : 'rounded-xl'
                                        }`}>
                                        <img
                                            src={img}
                                            alt={`Gallery ${idx}`}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. GIFTS & RSVP */}
                <section className="py-20 px-6 bg-[#F8F9FA] border-t border-[#E9ECEF]">
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <div className="bg-[#A48874] text-white p-10 rounded-[2rem] text-center shadow-2xl relative overflow-hidden">
                                {/* Pattern Overlay */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                <div className="relative z-10">
                                    <Gift className="mx-auto w-10 h-10 mb-6" />
                                    <h2 className="font-cormorant text-3xl mb-2">Wedding Gift</h2>
                                    <p className="font-opensans text-xs opacity-80 mb-8 max-w-md mx-auto leading-relaxed">
                                        Your presence is more than enough. However, if you wish to give a gift, you can send it via:
                                    </p>

                                    <div className="grid gap-4">
                                        {invitation.gifts.bank_accounts.map((bank, idx) => (
                                            <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex items-center justify-between">
                                                <div className="text-left">
                                                    <p className="font-bold text-xs uppercase tracking-wider opacity-70">{bank.bank_name}</p>
                                                    <p className="font-mono text-lg">{bank.account_number}</p>
                                                    <p className="text-xs opacity-70">a.n {bank.holder_name}</p>
                                                </div>
                                                <button
                                                    onClick={() => { navigator.clipboard.writeText(bank.account_number); alert("Copied!") }}
                                                    className="p-2 bg-white text-[#A48874] rounded-lg hover:bg-[#E9ECEF] transition-colors"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-[#2D2D2D] text-[#E9ECEF] py-12 text-center">
                    <h2 className="font-cormorant text-3xl mb-2">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</h2>
                    <p className="font-opensans text-[10px] tracking-[0.2em] uppercase opacity-50">Thank you for celebrating with us</p>
                </footer>

                <div className="h-24 md:h-0"></div> {/* Spacer for mobile nav */}
            </div>

            {/* === FLOATING CONTROLS === */}
            {isOpen && (
                <>
                    {/* Music Player */}
                    <button
                        onClick={toggleMusic}
                        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#2D2D2D] text-[#A48874] rounded-full flex items-center justify-center shadow-2xl border border-[#A48874]/50 hover:scale-110 transition-transform"
                    >
                        {isPlaying ? <Music size={20} className="animate-pulse" /> : <Play size={20} />}
                    </button>

                    {/* Simple Mobile Nav */}
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur shadow-xl rounded-full px-8 py-4 flex gap-8 md:hidden border border-[#E9ECEF]">
                        <button onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}><Heart size={20} className="text-[#A48874]" /></button>
                        <button><Calendar size={20} className="text-[#666]" /></button>
                        <button><Share2 size={20} className="text-[#666]" /></button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModernArchTemplate;