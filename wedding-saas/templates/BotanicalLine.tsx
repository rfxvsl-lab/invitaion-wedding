import React, { useState, useRef, useEffect } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, Music, Gift, Image as ImageIcon
} from 'lucide-react';
import { mapToTemplateData } from '../utils/templateMapper';
import RsvpForm from '../components/RsvpForm';
import { InvitationData } from '../types/invitation';

/**
 * TEMPLATE: BOTANICAL LINE ART
 * Style: Ethereal, Clean, Hand-drawn Illustrations
 * Palette: White, Dusty Rose (#BCAAA4), Dark Grey (#555555)
 */

const BotanicalTemplate = ({ data }: { data: InvitationData }) => {
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
        }, 600);
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

    // --- ORNAMENTS (Inline SVG for Line Art Style) ---
    const FloralCorner = ({ className }: { className?: string }) => (
        <svg viewBox="0 0 100 100" className={`w-32 h-32 md:w-48 md:h-48 opacity-60 pointer-events-none ${className}`} fill="none" stroke="#BCAAA4" strokeWidth="0.8">
            <path d="M0 100 Q 10 50 50 50 T 100 0" />
            <path d="M50 50 Q 60 70 80 70" />
            <path d="M50 50 Q 30 40 20 20" />
            <ellipse cx="80" cy="70" rx="5" ry="8" transform="rotate(-30 80 70)" />
            <ellipse cx="20" cy="20" rx="5" ry="8" transform="rotate(30 20 20)" />
            <ellipse cx="90" cy="10" rx="3" ry="5" />
            <path d="M20 90 Q 40 80 50 50" strokeOpacity="0.5" />
        </svg>
    );

    const FloralDivider = () => (
        <div className="flex justify-center items-center py-12">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="#BCAAA4" strokeWidth="1">
                <path d="M0 10 Q 15 0 30 10 Q 45 20 60 10" />
                <path d="M25 10 L 22 5" />
                <path d="M35 10 L 38 15" />
            </svg>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-[#555555] font-sans selection:bg-[#BCAAA4] selection:text-white overflow-x-hidden">
            {/* FONTS */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .font-script { font-family: 'Pinyon Script', cursive; }
        .font-sans { font-family: 'Raleway', sans-serif; }
        
        .fade-in-up {
           animation: fadeInUp 1.2s ease-out forwards;
        }
        @keyframes fadeInUp {
           from { opacity: 0; transform: translateY(20px); }
           to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <audio ref={audioRef} src={invitation.metadata.music_url} loop />

            {/* === COVER SECTION === */}
            <div className={`fixed inset-0 z-50 bg-white transition-all duration-1000 ease-in-out flex flex-col items-center justify-center p-6 ${isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                {/* Corner Ornaments */}
                <FloralCorner className="absolute top-0 left-0" />
                <FloralCorner className="absolute bottom-0 right-0 rotate-180" />

                <div className="relative z-10 text-center max-w-lg">
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#BCAAA4] mb-4">{invitation.texts.hero_title}</p>
                    <h1 className="font-script text-6xl md:text-8xl text-[#555] leading-tight mb-6">
                        {invitation.hero.groom_nickname} <span className="text-[#BCAAA4] text-4xl">&</span> {invitation.hero.bride_nickname}
                    </h1>

                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-[#BCAAA4] p-1 mb-8">
                        <img src={invitation.hero.main_image_url} className="w-full h-full object-cover rounded-full opacity-80" alt="Cover" />
                    </div>

                    <p className="font-sans text-sm mb-10 tracking-widest border-y border-[#BCAAA4]/30 py-2 inline-block px-8">
                        {formatDate(invitation.hero.wedding_date_time)}
                    </p>

                    <button
                        onClick={handleOpen}
                        className="bg-white text-[#555] border border-[#BCAAA4] px-8 py-3 rounded-full font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#BCAAA4] hover:text-white transition-all duration-500 shadow-sm"
                    >
                        {invitation.texts.open_button}
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={contentRef} className="relative bg-white pb-32">

                {/* 1. HERO HEADER */}
                <header className="pt-24 pb-12 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20"><FloralCorner /></div>

                    <div className="fade-in-up">
                        <p className="font-sans text-xs uppercase tracking-widest text-[#999] mb-4">{invitation.texts.hero_subtitle}</p>
                        <h2 className="font-script text-6xl md:text-7xl mb-6">{invitation.hero.groom_nickname} <span className="text-[#BCAAA4]">&</span> {invitation.hero.bride_nickname}</h2>
                        <p className="font-sans italic text-sm text-[#777] max-w-md mx-auto">
                            Requests the honor of your presence at our wedding ceremony
                        </p>
                    </div>
                </header>

                <FloralDivider />

                {/* 2. QUOTE */}
                <section className="px-8 text-center max-w-2xl mx-auto">
                    <h3 className="font-script text-4xl text-[#BCAAA4] mb-4">"</h3>
                    <p className="font-sans text-sm leading-loose text-[#666] italic">
                        {invitation.quotes.content}
                    </p>
                    <p className="font-sans text-[10px] font-bold mt-4 uppercase tracking-widest text-[#BCAAA4]">{invitation.quotes.source}</p>
                </section>

                <FloralDivider />

                {/* 3. COUPLE */}
                <section className="px-6">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 text-center">
                        {/* Groom */}
                        <div className="flex flex-col items-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#BCAAA4]/20 p-2 mb-6 relative">
                                <div className="absolute inset-0 border border-[#BCAAA4] rounded-full scale-95 opacity-50 group-hover:scale-100 transition-transform duration-700"></div>
                                <img src={invitation.couple.groom.photo_url} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" alt="Groom" />
                            </div>
                            <h3 className="font-script text-4xl mb-2">{invitation.couple.groom.full_name}</h3>
                            <p className="font-sans text-xs text-[#888] mb-1">The Son of</p>
                            <p className="font-sans text-sm italic">{invitation.couple.groom.parent_names}</p>
                            <a href={`https://instagram.com/${invitation.couple.groom.instagram_handle}`} className="mt-3 text-[#BCAAA4] hover:text-[#555] transition-colors"><Instagram size={16} /></a>
                        </div>

                        {/* Bride */}
                        <div className="flex flex-col items-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#BCAAA4]/20 p-2 mb-6 relative">
                                <div className="absolute inset-0 border border-[#BCAAA4] rounded-full scale-95 opacity-50 group-hover:scale-100 transition-transform duration-700"></div>
                                <img src={invitation.couple.bride.photo_url} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" alt="Bride" />
                            </div>
                            <h3 className="font-script text-4xl mb-2">{invitation.couple.bride.full_name}</h3>
                            <p className="font-sans text-xs text-[#888] mb-1">The Daughter of</p>
                            <p className="font-sans text-sm italic">{invitation.couple.bride.parent_names}</p>
                            <a href={`https://instagram.com/${invitation.couple.bride.instagram_handle}`} className="mt-3 text-[#BCAAA4] hover:text-[#555] transition-colors"><Instagram size={16} /></a>
                        </div>
                    </div>
                </section>

                <FloralDivider />

                {/* 4. EVENTS */}
                <section className="px-6 bg-[#FAFAFA] py-16 relative">
                    <FloralCorner className="absolute top-0 right-0 opacity-30" />
                    <div className="text-center mb-12">
                        <h2 className="font-script text-5xl mb-2">{invitation.texts.events_title}</h2>
                        <p className="font-sans text-xs tracking-widest uppercase">{new Date(invitation.events.akad.date).toLocaleDateString()}</p>
                    </div>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                        {/* Akad Card */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#EAEAEA] text-center hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#BCAAA4]"></div>
                            <h3 className="font-script text-3xl mb-4">{invitation.texts.akad_title}</h3>
                            <div className="font-sans text-sm space-y-2 text-[#666]">
                                <p className="font-bold flex items-center justify-center gap-2"><Clock size={14} className="text-[#BCAAA4]" /> {invitation.events.akad.time}</p>
                                <p className="font-bold text-lg text-[#333] mt-4">{invitation.events.akad.location_name}</p>
                                <p className="px-4 leading-relaxed opacity-80">{invitation.events.akad.address}</p>
                            </div>
                            <a href={invitation.events.akad.map_url} target="_blank" className="mt-6 inline-block text-[10px] font-bold border border-[#BCAAA4] text-[#BCAAA4] px-4 py-2 rounded-full uppercase tracking-widest group-hover:bg-[#BCAAA4] group-hover:text-white transition-all">View Map</a>
                        </div>

                        {/* Resepsi Card */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#EAEAEA] text-center hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#BCAAA4]"></div>
                            <h3 className="font-script text-3xl mb-4">{invitation.texts.resepsi_title}</h3>
                            <div className="font-sans text-sm space-y-2 text-[#666]">
                                <p className="font-bold flex items-center justify-center gap-2"><Clock size={14} className="text-[#BCAAA4]" /> {invitation.events.resepsi.time}</p>
                                <p className="font-bold text-lg text-[#333] mt-4">{invitation.events.resepsi.location_name}</p>
                                <p className="px-4 leading-relaxed opacity-80">{invitation.events.resepsi.address}</p>
                            </div>
                            <a href={invitation.events.resepsi.map_url} target="_blank" className="mt-6 inline-block text-[10px] font-bold border border-[#BCAAA4] text-[#BCAAA4] px-4 py-2 rounded-full uppercase tracking-widest group-hover:bg-[#BCAAA4] group-hover:text-white transition-all">View Map</a>
                        </div>
                    </div>
                </section>

                {/* 5. GALLERY */}
                {invitation.gallery.images.length > 0 && (
                    <section className="py-16 px-4">
                        <FloralDivider />
                        <h2 className="text-center font-script text-4xl mb-8">{invitation.texts.gallery_title}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-5xl mx-auto">
                            {invitation.gallery.images.map((img, i) => (
                                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-[#F5F5F5] group">
                                    <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Gallery" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 6. GIFTS */}
                <section className="py-16 px-6 bg-[#FAFAFA]">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#BCAAA4] shadow-sm">
                            <Gift size={20} />
                        </div>
                        <h2 className="font-script text-4xl mb-4">{invitation.texts.gift_title}</h2>
                        <p className="font-sans text-xs text-[#888] mb-8 leading-relaxed">
                            {invitation.texts.gift_text}
                        </p>

                        <div className="grid gap-4">
                            {invitation.gifts.bank_accounts.map((bank, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg border border-[#EAEAEA] flex items-center justify-between shadow-sm">
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#BCAAA4]">{bank.bank_name}</span>
                                        <p className="font-sans text-xl font-medium text-[#444] my-1">{bank.account_number}</p>
                                        <p className="text-xs text-[#888]">a.n {bank.holder_name}</p>
                                    </div>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(bank.account_number); alert("Copied!"); }}
                                        className="text-[#BCAAA4] hover:text-[#8D6E63] p-2"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RSVP SECTION */}
                {invitation.rsvp?.enabled && (
                    <section className="py-20 px-6 max-w-2xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-script text-4xl text-[#BCAAA4] mb-2">Rsvp</h3>
                        </div>
                        <RsvpForm
                            whatsappNumber={invitation.rsvp.whatsapp_number}
                            messageTemplate={invitation.rsvp.message_template}
                            themeColor="#BCAAA4"
                        />
                    </section>
                )}

                {/* FOOTER */}
                <footer className="bg-white py-12 text-center border-t border-[#F0F0F0]">
                    <FloralCorner className="w-16 h-16 mx-auto rotate-90 mb-4 opacity-40" />
                    <p className="font-script text-2xl">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</p>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[#BCAAA4] mt-2">{invitation.texts.footer_text}</p>
                </footer>

            </div>

            {/* === STICKY CONTROLS === */}
            {isOpen && (
                <div className="fixed bottom-0 left-0 w-full z-40 px-6 pb-6 pt-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none">
                    <div className="flex justify-between items-end pointer-events-auto max-w-md mx-auto">
                        {/* Nav */}
                        <div className="flex bg-white shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-[#F0F0F0] rounded-full px-6 py-3 gap-6">
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Heart size={18} className="text-[#BCAAA4]" /></button>
                            <button><Calendar size={18} className="text-[#CCC] hover:text-[#BCAAA4] transition-colors" /></button>
                            <button><ImageIcon size={18} className="text-[#CCC] hover:text-[#BCAAA4] transition-colors" /></button>
                        </div>

                        {/* Music */}
                        <button
                            onClick={toggleMusic}
                            className="w-12 h-12 rounded-full bg-white shadow-lg border border-[#BCAAA4] flex items-center justify-center text-[#BCAAA4] animate-spin-slow"
                            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                        >
                            <Music size={18} />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
         @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
         .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
         }
      `}</style>
        </div>
    );
};

export default BotanicalTemplate;