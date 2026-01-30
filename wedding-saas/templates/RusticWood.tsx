import React, { useState, useRef, useEffect } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, Music, Gift, Leaf, Image as ImageIcon
} from 'lucide-react';
import { mapToTemplateData } from '../utils/templateMapper';
import { InvitationData } from '../types/invitation';

/**
 * TEMPLATE: RUSTIC WOOD & GREENERY
 * Style: Vintage, Natural, Warm, Hand-crafted feel
 * Palette: Wood Brown (#8D6E63), Sage Green (#8FBC8F), Paper Cream (#FFFDF5)
 */

const RusticTemplate = ({ data }: { data: InvitationData }) => {
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
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // --- CUSTOM COMPONENTS ---

    // Button styled like a wooden plank
    const WoodButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
        <button
            onClick={onClick}
            className={`relative px-8 py-3 bg-[#8D6E63] text-[#FFFDF5] font-hand rounded shadow-[0_4px_0_#5D4037] active:shadow-none active:translate-y-[4px] transition-all border-2 border-[#5D4037] overflow-hidden group ${className}`}
        >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
            <span className="relative z-10 text-xl tracking-wider font-bold flex items-center gap-2 justify-center">
                {children}
            </span>
        </button>
    );

    // Card styled like recycled paper
    const PaperCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <div className={`bg-[#FFFDF5] p-6 shadow-md relative ${className}`}>
            {/* Paper texture noise */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            {/* Tape effect top center */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#E0E0E0]/60 rotate-1 backdrop-blur-sm shadow-sm"></div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );

    // Divider with leaves
    const LeafDivider = () => (
        <div className="flex items-center justify-center gap-2 py-12 opacity-80">
            <div className="h-[2px] w-16 bg-[#8FBC8F] rounded-full"></div>
            <Leaf className="text-[#8FBC8F] rotate-45" size={20} fill="currentColor" />
            <Leaf className="text-[#8D6E63] -rotate-45" size={20} fill="currentColor" />
            <div className="h-[2px] w-16 bg-[#8FBC8F] rounded-full"></div>
        </div>
    );

    return (
        <div className="min-h-screen font-serif text-[#4E342E] overflow-x-hidden selection:bg-[#8FBC8F] selection:text-white relative">
            {/* FONTS & GLOBAL STYLES */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        
        .font-hand { font-family: 'Amatic SC', cursive; }
        .font-serif { font-family: 'Merriweather', serif; }
        
        /* Wood Texture Background via CSS Gradient */
        .bg-wood {
            background-color: #D7CCC8;
            background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 4px),
                              linear-gradient(90deg, #EFEBE9, #D7CCC8);
        }
      `}</style>

            <audio ref={audioRef} src={invitation.metadata.music_url} loop />

            {/* === COVER SECTION === */}
            <div className={`fixed inset-0 z-50 bg-wood flex flex-col items-center justify-center p-6 transition-transform duration-1000 ease-in-out ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>

                <div className="border-4 border-dashed border-[#8D6E63]/30 p-2 w-full max-w-md h-full max-h-[80vh] flex items-center justify-center relative bg-[#FFFDF5] shadow-2xl rotate-1">
                    {/* Corner tape effects */}
                    <div className="absolute -top-4 -left-4 w-16 h-8 bg-[#E0E0E0]/80 -rotate-45 shadow-sm"></div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-8 bg-[#E0E0E0]/80 -rotate-45 shadow-sm"></div>

                    <div className="text-center w-full">
                        <div className="mb-8">
                            <Leaf className="inline-block text-[#8FBC8F] mb-2" size={32} />
                            <p className="font-serif text-xs uppercase tracking-widest text-[#8D6E63]">The Wedding Of</p>
                        </div>

                        <div className="relative mb-8">
                            <h1 className="font-hand text-7xl font-bold text-[#5D4037] leading-none">
                                {invitation.hero.groom_nickname} <br />
                                <span className="text-4xl text-[#8FBC8F]">&</span> <br />
                                {invitation.hero.bride_nickname}
                            </h1>
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-10 font-serif italic text-sm text-[#8D6E63]">
                            <span className="border-y border-[#8FBC8F] py-1 px-4">
                                {formatDate(invitation.hero.wedding_date_time)}
                            </span>
                        </div>

                        <WoodButton onClick={handleOpen}>
                            Open Invitation
                        </WoodButton>
                    </div>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={contentRef} className="bg-wood relative shadow-xl min-h-screen">

                {/* 1. HERO HEADER */}
                <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={invitation.hero.main_image_url} className="w-full h-full object-cover" alt="Hero" />
                        <div className="absolute inset-0 bg-black/20"></div>
                        {/* Torn paper effect bottom */}
                        <div className="absolute bottom-0 w-full h-12 bg-wood" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}></div>
                        {/* Simple SVG wave/torn effect override */}
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-wood" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1200 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")', maskSize: 'cover', background: '#D7CCC8' }}></div>
                    </div>

                    <div className="relative z-10 text-center text-white drop-shadow-md px-4">
                        <p className="font-serif italic text-sm mb-2">We are getting married!</p>
                        <h2 className="font-hand text-6xl md:text-8xl font-bold mb-4">
                            {invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}
                        </h2>
                        <p className="font-hand text-2xl tracking-widest bg-white/20 backdrop-blur-sm inline-block px-4 py-1 rounded">
                            {formatDate(invitation.hero.wedding_date_time)}
                        </p>
                    </div>
                </header>

                {/* 2. QUOTE */}
                <section className="py-16 px-6 max-w-2xl mx-auto text-center">
                    <Leaf className="mx-auto text-[#8FBC8F] mb-4" size={32} />
                    <PaperCard className="rotate-1">
                        <h3 className="font-hand text-3xl font-bold text-[#8FBC8F] mb-4">"{invitation.quotes.title}"</h3>
                        <p className="font-serif italic text-[#5D4037] leading-relaxed">
                            {invitation.quotes.content}
                        </p>
                        <p className="text-xs font-bold mt-4 uppercase text-[#8D6E63]">- {invitation.quotes.source} -</p>
                    </PaperCard>
                </section>

                <LeafDivider />

                {/* 3. COUPLE */}
                <section className="py-10 px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-hand text-5xl font-bold text-[#5D4037]">The Happy Couple</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {/* Groom */}
                        <div className="flex flex-col items-center">
                            <div className="p-3 bg-white shadow-lg rotate-2 mb-6 w-64 h-72">
                                <img src={invitation.couple.groom.photo_url} className="w-full h-full object-cover border border-slate-200" alt="Groom" />
                            </div>
                            <h3 className="font-hand text-4xl font-bold">{invitation.couple.groom.full_name}</h3>
                            <p className="font-serif text-xs italic text-[#8D6E63] mb-2">{invitation.couple.groom.parent_names}</p>
                            <a href={`https://instagram.com/${invitation.couple.groom.instagram_handle}`} className="flex items-center gap-1 text-[#8FBC8F] font-bold text-sm hover:text-[#5D4037]">
                                <Instagram size={14} /> @{invitation.couple.groom.instagram_handle}
                            </a>
                        </div>

                        {/* Bride */}
                        <div className="flex flex-col items-center">
                            <div className="p-3 bg-white shadow-lg -rotate-2 mb-6 w-64 h-72">
                                <img src={invitation.couple.bride.photo_url} className="w-full h-full object-cover border border-slate-200" alt="Bride" />
                            </div>
                            <h3 className="font-hand text-4xl font-bold">{invitation.couple.bride.full_name}</h3>
                            <p className="font-serif text-xs italic text-[#8D6E63] mb-2">{invitation.couple.bride.parent_names}</p>
                            <a href={`https://instagram.com/${invitation.couple.bride.instagram_handle}`} className="flex items-center gap-1 text-[#8FBC8F] font-bold text-sm hover:text-[#5D4037]">
                                <Instagram size={14} /> @{invitation.couple.bride.instagram_handle}
                            </a>
                        </div>
                    </div>
                </section>

                <LeafDivider />

                {/* 4. EVENTS */}
                <section className="py-10 px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-hand text-5xl font-bold text-[#5D4037]">Save The Date</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Akad */}
                        <PaperCard className="-rotate-1">
                            <div className="border-2 border-dashed border-[#8FBC8F] p-6 text-center h-full flex flex-col items-center">
                                <Leaf className="text-[#8FBC8F] mb-2" size={24} />
                                <h3 className="font-hand text-4xl font-bold mb-4 text-[#5D4037]">The Ceremony</h3>
                                <div className="w-full h-[1px] bg-[#8D6E63] opacity-20 my-2"></div>
                                <p className="font-serif font-bold text-lg">{invitation.events.akad.date}</p>
                                <p className="font-serif text-sm italic mb-4">{invitation.events.akad.time}</p>
                                <p className="font-bold text-[#5D4037] text-xl mb-2">{invitation.events.akad.location_name}</p>
                                <p className="text-sm text-[#8D6E63] mb-6">{invitation.events.akad.address}</p>
                                <a href={invitation.events.akad.map_url} target="_blank" className="mt-auto px-4 py-2 border-2 border-[#5D4037] rounded font-bold text-xs uppercase hover:bg-[#5D4037] hover:text-[#FFFDF5] transition-colors">
                                    View Map
                                </a>
                            </div>
                        </PaperCard>

                        {/* Resepsi */}
                        <PaperCard className="rotate-1">
                            <div className="border-2 border-dashed border-[#8FBC8F] p-6 text-center h-full flex flex-col items-center">
                                <Gift className="text-[#8FBC8F] mb-2" size={24} />
                                <h3 className="font-hand text-4xl font-bold mb-4 text-[#5D4037]">The Reception</h3>
                                <div className="w-full h-[1px] bg-[#8D6E63] opacity-20 my-2"></div>
                                <p className="font-serif font-bold text-lg">{invitation.events.resepsi.date}</p>
                                <p className="font-serif text-sm italic mb-4">{invitation.events.resepsi.time}</p>
                                <p className="font-bold text-[#5D4037] text-xl mb-2">{invitation.events.resepsi.location_name}</p>
                                <p className="text-sm text-[#8D6E63] mb-6">{invitation.events.resepsi.address}</p>
                                <a href={invitation.events.resepsi.map_url} target="_blank" className="mt-auto px-4 py-2 border-2 border-[#5D4037] rounded font-bold text-xs uppercase hover:bg-[#5D4037] hover:text-[#FFFDF5] transition-colors">
                                    View Map
                                </a>
                            </div>
                        </PaperCard>
                    </div>
                </section>

                {/* 5. GALLERY */}
                {invitation.gallery.images.length > 0 && (
                    <section className="py-16 px-4">
                        <div className="bg-[#FFFDF5] p-8 max-w-6xl mx-auto shadow-inner rounded-sm">
                            <h2 className="font-hand text-5xl font-bold text-[#5D4037] text-center mb-8">Our Memories</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {invitation.gallery.images.map((img, i) => (
                                    <div key={i} className={`bg-white p-2 shadow-md transform hover:scale-105 transition-transform duration-300 ${i % 2 === 0 ? 'rotate-2' : '-rotate-1'}`}>
                                        <div className="relative aspect-[3/4]">
                                            <img src={img} className="w-full h-full object-cover sepia-[0.3]" alt="Gallery" />
                                            {/* Pin graphic */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-800 shadow-sm border border-white"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 6. GIFTS */}
                <section className="py-16 px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="font-hand text-5xl font-bold text-[#5D4037] mb-6">Wedding Gift</h2>
                        <p className="font-serif italic text-[#8D6E63] mb-8">
                            If you'd like to send a gift to help us start our new life together, we've set up these funds:
                        </p>

                        <div className="space-y-4">
                            {invitation.gifts.bank_accounts.map((bank, i) => (
                                <PaperCard key={i} className={i % 2 === 0 ? "-rotate-1" : "rotate-1"}>
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="text-left">
                                            <span className="font-bold text-[#8FBC8F] uppercase text-xs tracking-widest">{bank.bank_name}</span>
                                            <p className="font-hand text-3xl font-bold text-[#5D4037]">{bank.account_number}</p>
                                            <p className="text-xs text-[#8D6E63]">a.n {bank.holder_name}</p>
                                        </div>
                                        <button
                                            onClick={() => { navigator.clipboard.writeText(bank.account_number); alert("Copied!"); }}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#8FBC8F] text-white rounded font-bold text-xs hover:bg-[#7EA97E]"
                                        >
                                            <Copy size={16} /> Copy
                                        </button>
                                    </div>
                                </PaperCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-[#5D4037] text-[#FFFDF5] py-12 text-center relative mt-12">
                    {/* Jagged edge top */}
                    <div className="absolute top-0 left-0 w-full h-4 bg-[#5D4037]" style={{ top: '-10px', clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>

                    <h2 className="font-hand text-4xl mb-4">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</h2>
                    <p className="font-serif italic text-xs opacity-70">Thank you for being part of our story.</p>
                </footer>

            </div>

            {/* === FLOATING CONTROLS (Rustic Style) === */}
            {isOpen && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
                    <div className="bg-[#FFFDF5] px-6 py-2 rounded-full border-2 border-[#5D4037] shadow-lg flex gap-6 items-center">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Heart size={20} className="text-[#8FBC8F]" /></button>
                        <div className="w-[1px] h-4 bg-[#5D4037]/20"></div>
                        <button><Calendar size={20} className="text-[#8D6E63]" /></button>
                        <div className="w-[1px] h-4 bg-[#5D4037]/20"></div>
                        <button
                            onClick={toggleMusic}
                            className="text-[#5D4037]"
                        >
                            {isPlaying ? <Music size={20} className="animate-bounce" /> : <Play size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RusticTemplate;