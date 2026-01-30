import React, { useState, useRef } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, ArrowDown, Music, Gift
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { mapToTemplateData } from '../utils/templateMapper';

/**
 * TEMPLATE: THE CLASSIC SERIF
 * Style: Ultra-Minimalist, Typography-Focused, Luxury
 * Compatibility: InvitationDataStandard Interface
 */

const ClassicSerifTemplate: React.FC<{ data: InvitationData }> = ({ data }) => {
    // --- STATE & REFS ---
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Helper untuk fallback gambar jika kosong
    const getImg = (url: string) => url || "https://placehold.co/400x600?text=No+Image";

    // --- MAPPED DATA ---
    const invitation = mapToTemplateData(data);

    // Safety check if mapping failed
    if (!invitation) return null;

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
        // Smooth scroll to content after a slight delay
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Nomor rekening berhasil disalin.");
    };

    // --- RENDER HELPERS ---
    const SectionDivider = () => (
        <div className="flex items-center justify-center py-12 opacity-40">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <div className="mx-4 text-[#D4AF37] rotate-45">♦</div>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
        </div>
    );

    // Format date helper
    const formatDate = (dateUnparsed: string | undefined) => {
        if (!dateUnparsed) return "";
        try {
            const date = new Date(dateUnparsed);
            if (isNaN(date.getTime())) return dateUnparsed;
            return date.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateUnparsed;
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFAF4] text-[#3E3E3E] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-white relative">
            {/* INJECT FONTS */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-cinzel { font-family: 'Cinzel Decorative', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 1.5s ease-out forwards;
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}</style>

            {/* AUDIO ELEMENT */}
            {invitation.metadata.music_url && (
                <audio ref={audioRef} src={invitation.metadata.music_url} loop />
            )}

            {/* === COVER SECTION (Full Screen) === */}
            <div
                className={`fixed inset-0 z-50 bg-[#FFFAF4] transition-transform duration-[1500ms] ease-in-out flex flex-col items-center justify-center ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
            >
                {/* Background Image with Heavy Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImg(invitation.hero.main_image_url)}
                        alt="Cover"
                        className="w-full h-full object-cover grayscale opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFAF4] via-[#FFFAF4]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-8 animate-fade-in-up w-full max-w-lg">
                    <p className="font-lato text-sm tracking-[0.4em] uppercase text-[#666] mb-6">The Wedding Celebration of</p>
                    <h1 className="font-cinzel text-4xl md:text-6xl text-[#2D2D2D] mb-4 leading-tight">
                        {invitation.hero.groom_nickname} <span className="text-[#A48874]">&</span> {invitation.hero.bride_nickname}
                    </h1>

                    <div className="w-[1px] h-16 bg-[#D4AF37] mx-auto my-8"></div>

                    <p className="font-playfair italic text-lg mb-10">
                        {formatDate(invitation.hero.wedding_date_time) || invitation.hero.wedding_date_time}
                    </p>

                    <button
                        onClick={handleOpen}
                        className="group relative px-8 py-3 bg-transparent border border-[#3E3E3E] text-[#3E3E3E] font-lato text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#3E3E3E] hover:text-[#FFFAF4]"
                    >
                        Open Invitation
                        <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#D4AF37]">
                            <ArrowDown size={20} className="animate-bounce" />
                        </span>
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={contentRef} className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

                {/* HERO HEADER */}
                <header className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-10">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

                    <p className="font-lato text-xs tracking-[0.3em] text-[#D4AF37] mb-6 uppercase">Save The Date</p>
                    <h2 className="font-playfair text-5xl md:text-7xl text-[#2D2D2D] mb-4 leading-tight">
                        {invitation.hero.groom_nickname} <span className="text-[#A48874]">&</span> {invitation.hero.bride_nickname}
                    </h2>
                    <p className="font-lato text-sm text-[#666] mt-4 tracking-widest uppercase">
                        {formatDate(invitation.hero.wedding_date_time) || invitation.hero.wedding_date_time}
                    </p>
                </header>

                {/* QUOTE SECTION */}
                <section className="py-20 px-8 max-w-2xl mx-auto text-center">
                    <div className="text-[#D4AF37] text-4xl font-serif mb-4">“</div>
                    <p className="font-playfair text-xl md:text-2xl leading-relaxed italic text-[#3E3E3E] mb-6">
                        "{invitation.quotes.content}"
                    </p>
                    <p className="font-lato text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
                        — {invitation.quotes.source} —
                    </p>
                </section>

                <SectionDivider />

                {/* COUPLE PROFILE */}
                <section className="py-10 px-6 max-w-5xl mx-auto">
                    <h3 className="font-cinzel text-3xl text-center mb-16">The Happy Couple</h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
                        {/* Groom */}
                        <div className="text-center group">
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                <div className="absolute inset-0 border border-[#D4AF37] rounded-full scale-105 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                                <img
                                    src={getImg(invitation.couple.groom.photo_url)}
                                    alt="Groom"
                                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl"
                                />
                            </div>
                            <h4 className="font-playfair text-2xl font-bold mb-2">{invitation.couple.groom.full_name}</h4>
                            <p className="font-lato text-xs text-[#666] mb-1">Son of</p>
                            <p className="font-lato text-sm italic mb-4">{invitation.couple.groom.parent_names}</p>
                            {invitation.couple.groom.instagram_handle && (
                                <a href={`https://instagram.com/${invitation.couple.groom.instagram_handle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#3E3E3E] transition-colors">
                                    <Instagram size={16} /> <span className="font-lato text-xs tracking-wide">{invitation.couple.groom.instagram_handle}</span>
                                </a>
                            )}
                        </div>

                        {/* Bride */}
                        <div className="text-center group">
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                <div className="absolute inset-0 border border-[#D4AF37] rounded-full scale-105 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                                <img
                                    src={getImg(invitation.couple.bride.photo_url)}
                                    alt="Bride"
                                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl"
                                />
                            </div>
                            <h4 className="font-playfair text-2xl font-bold mb-2">{invitation.couple.bride.full_name}</h4>
                            <p className="font-lato text-xs text-[#666] mb-1">Daughter of</p>
                            <p className="font-lato text-sm italic mb-4">{invitation.couple.bride.parent_names}</p>
                            {invitation.couple.bride.instagram_handle && (
                                <a href={`https://instagram.com/${invitation.couple.bride.instagram_handle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#3E3E3E] transition-colors">
                                    <Instagram size={16} /> <span className="font-lato text-xs tracking-wide">{invitation.couple.bride.instagram_handle}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* EVENTS SECTION */}
                <section className="py-10 px-6 max-w-4xl mx-auto">
                    <h3 className="font-cinzel text-3xl text-center mb-16">Wedding Events</h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Akad Card */}
                        <div className="bg-white p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-t-4 border-[#D4AF37] hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-12 h-12 mx-auto bg-[#FFFAF4] rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                                <Heart size={20} />
                            </div>
                            <h4 className="font-playfair text-2xl mb-6">Akad Nikah</h4>
                            <div className="space-y-3 font-lato text-sm text-[#555]">
                                <p className="flex items-center justify-center gap-2">
                                    <Calendar size={14} className="text-[#D4AF37]" /> {invitation.events.akad.date}
                                </p>
                                <p className="flex items-center justify-center gap-2">
                                    <Clock size={14} className="text-[#D4AF37]" /> {invitation.events.akad.time}
                                </p>
                                <p className="font-bold text-[#3E3E3E] mt-4 text-lg">{invitation.events.akad.location_name}</p>
                                <p className="px-4 leading-relaxed opacity-70">{invitation.events.akad.address}</p>
                            </div>
                            {invitation.events.akad.map_url && (
                                <a href={invitation.events.akad.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-block border-b border-[#3E3E3E] pb-1 text-xs font-bold tracking-widest uppercase hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                                    View Location
                                </a>
                            )}
                        </div>

                        {/* Resepsi Card */}
                        <div className="bg-white p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-t-4 border-[#D4AF37] hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-12 h-12 mx-auto bg-[#FFFAF4] rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                                <Gift size={20} />
                            </div>
                            <h4 className="font-playfair text-2xl mb-6">Wedding Reception</h4>
                            <div className="space-y-3 font-lato text-sm text-[#555]">
                                <p className="flex items-center justify-center gap-2">
                                    <Calendar size={14} className="text-[#D4AF37]" /> {invitation.events.resepsi.date}
                                </p>
                                <p className="flex items-center justify-center gap-2">
                                    <Clock size={14} className="text-[#D4AF37]" /> {invitation.events.resepsi.time}
                                </p>
                                <p className="font-bold text-[#3E3E3E] mt-4 text-lg">{invitation.events.resepsi.location_name}</p>
                                <p className="px-4 leading-relaxed opacity-70">{invitation.events.resepsi.address}</p>
                            </div>
                            {invitation.events.resepsi.map_url && (
                                <a href={invitation.events.resepsi.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-block border-b border-[#3E3E3E] pb-1 text-xs font-bold tracking-widest uppercase hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                                    View Location
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* GALLERY (Simple Grid) */}
                {invitation.gallery.images && invitation.gallery.images.length > 0 && (
                    <section className="py-20 px-6">
                        <h3 className="font-cinzel text-3xl text-center mb-12">Captured Moments</h3>
                        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
                            {invitation.gallery.images.map((img, idx) => (
                                <div key={idx} className="relative overflow-hidden aspect-[3/4]">
                                    <img
                                        src={getImg(img)}
                                        alt="Gallery"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* GIFTS SECTION */}
                {invitation.gifts.bank_accounts && invitation.gifts.bank_accounts.length > 0 && (
                    <section className="py-20 px-6 bg-white border-y border-[#EAEAEA]">
                        <div className="max-w-xl mx-auto text-center">
                            <h3 className="font-cinzel text-3xl mb-4">Wedding Gift</h3>
                            <p className="font-playfair italic text-[#666] mb-10">Your presence is the greatest gift of all. However, should you wish to honor us with a gift, a contribution can be made to:</p>

                            <div className="space-y-6">
                                {invitation.gifts.bank_accounts.map((bank, idx) => (
                                    <div key={idx} className="p-6 border border-[#EAEAEA] rounded bg-[#FFFAF4]">
                                        <p className="font-lato font-bold uppercase tracking-widest text-[#D4AF37] text-xs mb-2">{bank.bank_name}</p>
                                        <p className="font-playfair text-2xl mb-1">{bank.account_number}</p>
                                        <p className="font-lato text-xs text-[#666] mb-4">a.n {bank.holder_name}</p>
                                        <button
                                            onClick={() => copyToClipboard(bank.account_number)}
                                            className="inline-flex items-center gap-2 text-xs font-bold border border-[#3E3E3E] px-4 py-2 hover:bg-[#3E3E3E] hover:text-white transition-all"
                                        >
                                            <Copy size={12} /> Copy Number
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FOOTER */}
                <footer className="py-12 text-center bg-[#2D2D2D] text-[#FFFAF4]">
                    <p className="font-cinzel text-xl md:text-2xl mb-2">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</p>
                    <p className="font-lato text-[10px] tracking-[0.3em] opacity-60 uppercase">Forever & Always</p>
                </footer>

                {/* BOTTOM PADDING for Floating Nav */}
                <div className="h-24"></div>
            </div>

            {/* === FLOATING CONTROLS === */}
            {isOpen && (
                <>
                    {/* Music Control (Bottom Right) */}
                    <button
                        onClick={toggleMusic}
                        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#FFFAF4] border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300 animate-spin-slow"
                        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                    >
                        <Music size={18} />
                    </button>

                    {/* Bottom Navigation (Center) */}
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md border border-[#EAEAEA] rounded-full px-6 py-3 shadow-xl flex gap-8 text-[#3E3E3E]">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors"><Heart size={18} /></button>
                        <button onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors"><Calendar size={18} /></button>
                        <button onClick={() => window.scrollTo({ top: 2000, behavior: 'smooth' })} className="hover:text-[#D4AF37] transition-colors"><MapPin size={18} /></button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClassicSerifTemplate;