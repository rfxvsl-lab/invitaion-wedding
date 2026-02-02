import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Heart, MapPin, Calendar, Clock, Music, Play, Pause,
    Home, User, Image as ImageIcon, MessageCircle,
    ChevronDown, BookOpen, Gift, Copy, Moon, Star
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/** * --- KONFIGURASI ASET ---
 */
const ASSETS = {
    // Musik: Middle Eastern / Oud / Atmospheric Cinematic
    bgm: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg", // Placeholder for premium Arabic sound
    // Texture: Gold Dust / Parchment
    texture: "https://www.transparenttextures.com/patterns/black-scales.png"
};

/**
 * --- GLOBAL CSS & ANIMATIONS ---
 */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel+Decorative:wght@400;700&family=Scheherazade+New:wght@400;700&family=Montserrat:wght@300;400;500&display=swap');

    /* Fonts */
    .font-arabic-title { font-family: 'Cinzel Decorative', serif; } /* Kesan Royal */
    .font-arabic-body { font-family: 'Amiri', serif; } /* Nuansa Timur Tengah */
    .font-quran { font-family: 'Scheherazade New', serif; }
    .font-modern { font-family: 'Montserrat', sans-serif; }

    /* --- ANIMATIONS --- */
    
    /* 1. Twinkling Stars */
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px #FFD700; }
    }

    /* 2. Floating Elements (Lanterns) */
    @keyframes sway {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }

    /* 3. Parallax Move */
    @keyframes sand-drift {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 0%; }
    }
    
    @keyframes pulse-gold {
      0%, 100% { filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5)); }
      50% { filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.9)); }
    }

    /* Envelope & Transitions */
    @keyframes openFlap {
      0% { transform: rotateX(0deg); z-index: 50; }
      100% { transform: rotateX(180deg); z-index: 1; }
    }
    
    @keyframes riseUp {
      0% { transform: translateY(0) scale(0.9); opacity: 0; }
      100% { transform: translateY(-150px) scale(1); opacity: 1; }
    }

    @keyframes slideInPage {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* CLASSES */
    .animate-twinkle { animation: twinkle 4s ease-in-out infinite; }
    .animate-sway { animation: sway 6s ease-in-out infinite; transform-origin: top; }
    .animate-pulse-gold { animation: pulse-gold 3s infinite; }
    
    .flap-open { animation: openFlap 1.5s forwards ease-in-out; transform-origin: top; }
    .paper-rise { animation: riseUp 1.2s 0.8s forwards cubic-bezier(0.34, 1.56, 0.64, 1); }
    .page-enter { animation: slideInPage 0.8s ease-out forwards; }
    
    /* UTILS */
    .glass-arabic {
      background: rgba(10, 20, 15, 0.75); /* Dark Emerald Tint */
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(212, 175, 55, 0.3); /* Gold Border */
      box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5);
    }
    
    .text-gold-gradient {
      background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .border-gold-gradient {
      border-image: linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728) 1;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
  `}</style>
);

/**
 * --- SVG ARCHITECTURE (KAABA & MOSQUE) ---
 */

// 1. KAABA (Kiri) - Perspective CSS
const KaabaSVG = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 200 200" className={className} style={style}>
        <defs>
            <linearGradient id="kaabaBlack" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="50%" stopColor="#000000" />
                <stop offset="100%" stopColor="#2a2a2a" />
            </linearGradient>
            <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF953F" />
                <stop offset="50%" stopColor="#FCF6BA" />
                <stop offset="100%" stopColor="#B38728" />
            </linearGradient>
        </defs>

        {/* Base Cube Shadow */}
        <path d="M20 160 L100 190 L180 160 L100 130 Z" fill="rgba(0,0,0,0.5)" filter="blur(5px)" />

        {/* Left Face */}
        <path d="M20 60 L100 90 L100 190 L20 160 Z" fill="url(#kaabaBlack)" />
        {/* Right Face */}
        <path d="M100 90 L180 60 L180 160 L100 190 Z" fill="#0d0d0d" />
        {/* Top Face */}
        <path d="M20 60 L100 30 L180 60 L100 90 Z" fill="#222" />

        {/* Kiswah (Gold Band) Left */}
        <path d="M20 75 L100 105 L100 115 L20 85 Z" fill="url(#goldTrim)" />
        {/* Kiswah Right */}
        <path d="M100 105 L180 75 L180 85 L100 115 Z" fill="url(#goldTrim)" opacity="0.8" />

        {/* Door (Multazam) */}
        <rect x="110" y="80" width="20" height="35" transform="skewY(-20)" fill="url(#goldTrim)" />
    </svg>
);

// 2. GRAND MOSQUE (Kanan) - Siluet Megah
const MosqueSVG = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 300 200" className={className} style={style}>
        <defs>
            <linearGradient id="mosqueGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#05100a" />
                <stop offset="100%" stopColor="#0f261f" />
            </linearGradient>
        </defs>

        {/* Main Dome */}
        <path d="M110 100 Q 150 40 190 100" fill="url(#mosqueGrad)" stroke="#D4AF37" strokeWidth="1" />

        {/* Spire with Crescent Moon (Fixing Cross Symbol) */}
        <line x1="150" y1="40" x2="150" y2="28" stroke="#D4AF37" strokeWidth="2" />
        <path d="M150 20 C 147 20 145 23 145 26 C 145 29 148 31 150 31 C 148 31 147 29 147 26 C 147 23 149 21 150 20 Z" fill="#D4AF37" />

        {/* Minaret Left */}
        <rect x="60" y="60" width="20" height="140" fill="url(#mosqueGrad)" />
        <path d="M55 60 L85 60 L70 30 Z" fill="url(#mosqueGrad)" stroke="#D4AF37" strokeWidth="1" />

        {/* Minaret Right */}
        <rect x="220" y="50" width="20" height="150" fill="url(#mosqueGrad)" />
        <path d="M215 50 L245 50 L230 20 Z" fill="url(#mosqueGrad)" stroke="#D4AF37" strokeWidth="1" />

        {/* Base Structure */}
        <rect x="80" y="100" width="140" height="100" fill="url(#mosqueGrad)" />

        {/* Windows */}
        <circle cx="150" cy="130" r="10" fill="#D4AF37" fillOpacity="0.5" className="animate-pulse-gold" />
        <path d="M130 160 Q 150 140 170 160 L 170 200 L 130 200 Z" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
    </svg>
);

// 3. Lantern (Gantung)
const LanternSVG = ({ className, delay }: { className: string, delay: string }) => (
    <svg viewBox="0 0 50 100" className={`absolute pointer-events-none animate-sway ${className}`} style={{ animationDelay: delay }}>
        <line x1="25" y1="0" x2="25" y2="20" stroke="#D4AF37" strokeWidth="1" />
        <path d="M15 20 L35 20 L40 40 L10 40 Z" fill="#0f261f" stroke="#D4AF37" strokeWidth="1" />
        <rect x="10" y="40" width="30" height="40" fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="25" cy="60" r="5" fill="#D4AF37" className="animate-pulse-gold" />
        <path d="M10 80 L25 95 L40 80" fill="none" stroke="#D4AF37" strokeWidth="1" />
    </svg>
);

/**
 * --- BACKGROUND SYSTEM (ARABIAN NIGHTS) ---
 */
const ArabianBackground = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
    // Generate Stars
    const stars = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60, // Only top half
        size: Math.random() * 3,
        delay: Math.random() * 5
    })), []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-[#020508] via-[#051410] to-[#0a1f18]">
            {/* 1. Stars Layer */}
            {stars.map(s => (
                <div
                    key={s.id}
                    className="absolute bg-white rounded-full animate-twinkle"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`
                    }}
                />
            ))}

            {/* 2. Moon Layer */}
            <div className="absolute top-10 right-10 w-24 h-24 opacity-80 animate-pulse-gold">
                <svg viewBox="0 0 100 100">
                    <path d="M50 10 Q 90 50 50 90 Q 70 50 50 10" fill="#FCF6BA" />
                </svg>
            </div>

            {/* 3. Parallax Architecture (Mosque & Kaaba) */}
            <div
                className="absolute inset-[-50px] transition-transform duration-300 ease-out will-change-transform"
                style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -0.5}px)` }}
            >
                {/* Kaaba (Left, Closer) */}
                <div className="absolute bottom-0 -left-20 w-[60vw] md:w-[30vw] h-auto z-10 opacity-90 drop-shadow-2xl">
                    <KaabaSVG className="w-full h-full" />
                </div>

                {/* Mosque (Right, Further) */}
                <div className="absolute bottom-10 -right-20 w-[90vw] md:w-[45vw] h-auto z-0 opacity-80">
                    <MosqueSVG className="w-full h-full" />
                </div>

                {/* Sand Dunes (Foreground) */}
                <div className="absolute bottom-[-50px] left-0 right-0 h-32 bg-gradient-to-t from-[#0a1f18] to-transparent z-20"></div>
            </div>

            {/* 4. Hanging Lanterns (Foreground) */}
            <LanternSVG className="w-16 h-32 top-0 left-10 z-40" delay="0s" />
            <LanternSVG className="w-12 h-24 top-0 right-20 z-40" delay="2s" />
            <LanternSVG className="w-20 h-40 top-0 left-1/3 z-40" delay="1s" />

            {/* 5. Texture Overlay */}
            <div
                className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-30"
                style={{ backgroundImage: `url(${ASSETS.texture})` }}
            ></div>
        </div>
    );
};

/**
 * --- COMPONENTS ---
 */

// Stage 1: Royal Envelope
interface RoyalEnvelopeProps {
    onOpen: () => void;
    data: InvitationData;
}
const RoyalEnvelope = ({ onOpen, data }: RoyalEnvelopeProps) => {
    const [opening, setOpening] = useState(false);

    const handleOpen = () => {
        setOpening(true);
        // Sound Simulation
        const audio = new Audio("https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");
        audio.volume = 0.3;
        audio.play().catch(() => { });
        setTimeout(onOpen, 2500);
    };

    const groomName = data.content.couples.pria.name.split(' ')[0];
    const brideName = data.content.couples.wanita.name.split(' ')[0];

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#05100a] transition-opacity duration-1000 ${opening ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
            <div className={`relative w-[340px] h-[240px] md:w-[500px] md:h-[350px] perspective-1000 transition-transform duration-1000 ${opening ? 'translate-y-[200px]' : ''}`}>

                {/* Surat Dalam */}
                <div className={`absolute top-2 left-2 right-2 bottom-4 bg-[#F5E6CA] flex flex-col items-center justify-center z-10 border border-[#D4AF37] ${opening ? 'paper-rise' : 'opacity-0'}`}>
                    <div className="w-full h-full border-double border-4 border-[#D4AF37] m-1 flex flex-col items-center justify-center">
                        <h2 className="font-arabic-title text-3xl text-[#0f261f] mb-1">WALIMATUL URS</h2>
                        <p className="font-arabic-body text-sm text-[#8B6E4E]">{groomName} & {brideName}</p>
                    </div>
                </div>

                {/* Amplop Belakang */}
                <div className="absolute inset-0 bg-[#0f261f] rounded-b-lg shadow-2xl z-20 overflow-hidden border-t border-[#D4AF37]">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${ASSETS.texture})` }}></div>
                </div>

                {/* Flap */}
                <div className={`absolute top-0 left-0 right-0 h-1/2 bg-[#14332a] z-30 origin-top flex items-center justify-center shadow-lg transition-all ${opening ? 'flap-open' : ''}`} style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
                    <button
                        onClick={handleOpen}
                        className={`w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full border-2 border-[#fff] shadow-[0_0_20px_#D4AF37] flex items-center justify-center group hover:scale-105 transition-transform ${opening ? 'opacity-0' : ''}`}
                    >
                        <Star fill="white" className="text-white" size={24} />
                    </button>
                </div>

                {/* Amplop Depan */}
                <div className="absolute inset-0 z-40 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[#0a1f18]" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }}></div>
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-[#0d2b21]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 45%)' }}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0d2b21]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 45%)' }}></div>
                </div>

                {!opening && (
                    <div className="absolute -bottom-20 w-full text-center">
                        <p className="text-[#D4AF37] font-arabic-title text-sm tracking-widest animate-pulse">BUKA UNDANGAN</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Navbar
const NavBar = ({ activeTab, setTab, data }: { activeTab: string, setTab: (t: string) => void, data: InvitationData }) => {
    const items = [
        { id: 'quote', icon: BookOpen, visible: !!data.content.quote?.content },
        { id: 'couple', icon: User, visible: true },
        { id: 'event', icon: Calendar, visible: (data.content.events.akad?.enabled !== false || data.content.events.resepsi?.enabled !== false) },
        { id: 'home', icon: Home, visible: true },
        { id: 'gallery', icon: ImageIcon, visible: true },
        { id: 'gift', icon: Gift, visible: (data.engagement.gifts && data.engagement.gifts.length > 0) },
        { id: 'rsvp', icon: MessageCircle, visible: !!data.engagement.rsvp },
    ].filter(item => item.visible);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="glass-arabic px-4 py-3 rounded-full flex justify-between md:justify-center md:gap-6 shadow-2xl relative overflow-hidden">
                {/* Gold Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50"></div>

                {items.map((item) => {
                    const active = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${active ? '-translate-y-2' : 'hover:-translate-y-1'}`}
                        >
                            <item.icon
                                size={active ? 22 : 18}
                                className={`transition-colors ${active ? 'text-[#FFD700] drop-shadow-[0_0_5px_#FFD700]' : 'text-[#8B6E4E]'}`}
                            />
                            {active && <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mt-1 animate-pulse"></div>}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

// --- PAGES ---

const HomePage = ({ onEnter, data }: { onEnter: () => void, data: InvitationData }) => {
    const groomName = data.content.couples.pria.name.split(' ')[0];
    const brideName = data.content.couples.wanita.name.split(' ')[0];
    const dateObj = new Date(data.content.hero.date);
    const dateStr = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getFullYear()}`;

    return (
        <div className="flex flex-col h-full relative page-enter items-center justify-center text-center p-6">
            {/* Ornamental Border */}
            <div className="absolute inset-4 border border-[#D4AF37] opacity-30 rounded-t-[100px] pointer-events-none"></div>
            <div className="absolute inset-6 border border-[#D4AF37] opacity-20 rounded-t-[90px] pointer-events-none"></div>

            <div className="relative z-10">
                <h3 className="font-arabic-title text-sm tracking-[0.3em] text-[#D4AF37] mb-6 animate-pulse">THE SACRED UNION OF</h3>

                <h1 className="font-arabic-title text-6xl md:text-8xl text-gold-gradient drop-shadow-lg mb-4 leading-tight">
                    {groomName} <br /> <span className="text-3xl text-white/50">&</span> <br /> {brideName}
                </h1>

                <div className="flex items-center justify-center gap-4 my-8">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                    <span className="font-arabic-body text-xl text-gray-300">{dateStr}</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                </div>

                <button onClick={onEnter} className="mt-4 px-8 py-3 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-[#0f261f] font-bold font-arabic-title tracking-widest rounded-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    BISMILLAH
                </button>
            </div>
        </div>
    );
};

const QuotePage = ({ data }: { data: InvitationData }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 page-enter relative">
        <div className="w-full h-full border-y border-[#D4AF37]/30 flex flex-col justify-center py-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Bismillah.svg" className="h-12 mb-8 opacity-80 invert" alt="Bismillah" />
            <p className="font-arabic-body text-xl md:text-2xl leading-loose text-[#F5E6CA] max-w-lg mx-auto mb-8">
                "{data.content.quote.content}"
            </p>
            <p className="font-arabic-title text-[#FFD700] text-lg tracking-widest border-b border-[#FFD700]/30 inline-block mx-auto pb-2">{data.content.quote.source}</p>
        </div>
    </div>
);

const CouplePage = ({ data }: { data: InvitationData }) => {
    const { pria, wanita } = data.content.couples;
    return (
        <div className="h-full overflow-y-auto hide-scrollbar p-6 pt-10 page-enter text-center">
            <h2 className="font-arabic-title text-3xl text-[#FFD700] mb-12 drop-shadow-md">Mempelai</h2>

            <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
                {/* Groom */}
                <div className="relative group">
                    <div className="w-48 h-64 rounded-t-[100px] border-2 border-[#D4AF37] p-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f261f] to-transparent z-10 opacity-60"></div>
                        <img src={pria.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"} className="w-full h-full object-cover rounded-t-[90px] grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="mt-4">
                        <h3 className="font-arabic-title text-2xl text-[#F5E6CA]">{pria.name}</h3>
                        {/* 
                  Using placeholder text for parents as current Type definition might not have father_name/mother_name.
                  In real app, update InvitationData type to include these fields.
               */}
                        <p className="font-arabic-body text-[#D4AF37] text-sm mt-1">Putra Mempelai Pria</p>
                    </div>
                </div>

                <div className="text-4xl font-arabic-title text-[#FFD700]">&</div>

                {/* Bride */}
                <div className="relative group">
                    <div className="w-48 h-64 rounded-t-[100px] border-2 border-[#D4AF37] p-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f261f] to-transparent z-10 opacity-60"></div>
                        <img src={wanita.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"} className="w-full h-full object-cover rounded-t-[90px] grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="mt-4">
                        <h3 className="font-arabic-title text-2xl text-[#F5E6CA]">{wanita.name}</h3>
                        <p className="font-arabic-body text-[#D4AF37] text-sm mt-1">Putri Mempelai Wanita</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventPage = ({ data }: { data: InvitationData }) => {
    const { akad, resepsi } = data.content.events;
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center page-enter overflow-y-auto hide-scrollbar">
            <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
                {/* Akad */}
                {akad.enabled !== false && (
                    <div className="glass-arabic p-8 rounded-t-full border-b-4 border-[#FFD700] relative overflow-hidden group hover:bg-[#0f261f]/80 transition-colors">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#FFD700]/20">
                            <Moon size={100} />
                        </div>
                        <h3 className="font-arabic-title text-2xl text-[#FFD700] mb-4 relative z-10">{data.content.texts.akad_title || 'Akad Nikah'}</h3>
                        <p className="font-arabic-body text-xl text-[#F5E6CA] mb-2 relative z-10">{akad.time}</p>
                        <p className="font-modern text-xs text-gray-400 relative z-10">{akad.venue}</p>
                    </div>
                )}

                {/* Resepsi */}
                {resepsi.enabled !== false && (
                    <div className="glass-arabic p-8 rounded-t-full border-b-4 border-[#FFD700] relative overflow-hidden group hover:bg-[#0f261f]/80 transition-colors">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#FFD700]/20">
                            <Star size={100} />
                        </div>
                        <h3 className="font-arabic-title text-2xl text-[#FFD700] mb-4 relative z-10">{data.content.texts.resepsi_title || 'Resepsi'}</h3>
                        <p className="font-arabic-body text-xl text-[#F5E6CA] mb-2 relative z-10">{resepsi.time}</p>
                        <p className="font-modern text-xs text-gray-400 relative z-10">{resepsi.venue}</p>
                    </div>
                )}
            </div>

            <a href={resepsi?.map_url || '#'} target="_blank" rel="noopener noreferrer" className="mt-12 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0f261f] transition-all font-arabic-title tracking-widest flex items-center gap-2 rounded-full cursor-pointer">
                <MapPin size={16} /> LOKASI (MAPS)
            </a>
        </div>
    );
};

const GalleryPage = ({ data }: { data: InvitationData }) => (
    <div className="h-full overflow-y-auto hide-scrollbar p-6 pt-10 page-enter">
        <h2 className="text-center font-arabic-title text-3xl text-[#FFD700] mb-8">Galeri</h2>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {[...(data.content.gallery?.images || []), ...Array(6)].slice(0, 6).map((img, i) => (
                <div key={i} className="break-inside-avoid relative group rounded-lg overflow-hidden border border-[#D4AF37]/30">
                    <img src={img || `https://source.unsplash.com/random/600x${i % 2 === 0 ? 800 : 600}?muslim,wedding&sig=${i}`} className="w-full object-cover transition-transform duration-1000 group-hover:scale-110 sepia-[0.3]" />
                    <div className="absolute inset-0 bg-[#0f261f]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Heart className="text-[#FFD700] fill-[#FFD700]" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const GiftPage = ({ data }: { data: InvitationData }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center page-enter">
        <div className="w-full max-w-sm glass-arabic p-8 rounded-lg border border-[#D4AF37] relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0f261f] border border-[#D4AF37] rounded-full flex items-center justify-center">
                <Gift className="text-[#FFD700]" size={20} />
            </div>
            <h2 className="font-arabic-title text-2xl text-[#F5E6CA] mt-4 mb-8">Wedding Gift</h2>

            <div className="mb-6 pb-6 border-b border-[#D4AF37]/30">
                {data.engagement.gifts && data.engagement.gifts.length > 0 ? (
                    data.engagement.gifts.map((gift, i) => (
                        <div key={i} className="mb-4">
                            <p className="font-mono text-xl tracking-widest text-[#FFD700] mb-2">{gift.acc_number}</p>
                            <p className="font-modern text-xs uppercase text-gray-400">{gift.bank} • {gift.holder}</p>
                            <button
                                className="mt-2 w-full py-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-[#0f261f] font-bold rounded hover:shadow-[0_0_15px_#FFD700] transition-shadow text-xs flex items-center justify-center gap-2"
                                onClick={(e) => {
                                    navigator.clipboard.writeText(gift.acc_number);
                                    const original = e.currentTarget.innerHTML;
                                    e.currentTarget.innerHTML = "Disalin!";
                                    setTimeout(() => e.currentTarget.innerHTML = original, 2000);
                                }}
                            >
                                <Copy size={16} /> Salin Nomor
                            </button>
                        </div>
                    ))
                ) : <p className="text-gray-400 text-sm">Belum ada informasi gift.</p>}
            </div>
        </div>
    </div>
);

const RSVPPage = ({ data }: { data: InvitationData }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 page-enter text-center">
        <h2 className="font-arabic-title text-3xl text-[#FFD700] mb-8">Konfirmasi Kehadiran</h2>
        <div className='w-full max-w-sm'>
            <RsvpForm
                whatsappNumber={data.engagement.rsvp_settings.whatsapp_number}
                messageTemplate={data.engagement.rsvp_settings.message_template}
                themeColor="#FFD700"
            />
        </div>
    </div>
);

/**
 * --- MAIN APP ---
 */
const RoyalArabian: React.FC<{ data: InvitationData }> = ({ data }) => {
    const [stage, setStage] = useState<'envelope' | 'hero' | 'content'>('envelope'); // envelope -> hero -> content
    const [activeTab, setActiveTab] = useState('home');
    const [music, setMusic] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const audioRef = useRef<HTMLAudioElement>(null);

    // Parallax Logic
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX - window.innerWidth / 2) * 0.03, // Subtle movement
                y: (e.clientY - window.innerHeight / 2) * 0.03
            });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (music) audioRef.current.pause();
        else audioRef.current.play();
        setMusic(!music);
    };

    const enterContent = () => {
        setStage('content');
        // Ensure music plays if allowed
        if (!music && audioRef.current) {
            setMusic(true);
            audioRef.current.play().catch(() => { });
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#020508] text-[#F5E6CA]">
            <GlobalStyles />
            <audio ref={audioRef} loop src={data.metadata.music_url || ASSETS.bgm} />

            {/* --- LAYER 0: ARABIAN NIGHTS BACKGROUND (FULL SCREEN) --- */}
            <ArabianBackground mousePos={mousePos} />

            {/* --- LAYER 1: ROYAL ENVELOPE --- */}
            {stage === 'envelope' && (
                <RoyalEnvelope onOpen={() => setStage('hero')} data={data} />
            )}

            {/* --- LAYER 2: HERO LANDING (BISMILLAH) --- */}
            <div className={`fixed inset-0 z-20 flex flex-col items-center justify-center transition-all duration-1000 ${stage === 'hero' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <div className="text-center p-8">
                    <h2 className="font-arabic-title text-2xl text-[#D4AF37] mb-8 animate-pulse">ASSALAMUALAIKUM</h2>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
                    <button
                        onClick={enterContent}
                        className="group relative px-12 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-arabic-title text-xl tracking-widest overflow-hidden transition-colors hover:text-[#0f261f]"
                    >
                        <span className="absolute inset-0 w-full h-full bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                        <span className="relative z-10">BUKA UNDANGAN</span>
                    </button>
                </div>
            </div>

            {/* --- LAYER 3: MAIN GLASS PALACE --- */}
            <div className={`fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8 transition-all duration-1000 delay-300 ${stage === 'content' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>

                {/* Main Card */}
                <div className="glass-arabic w-full max-w-5xl h-[85vh] rounded-[20px] md:rounded-[40px] flex shadow-2xl overflow-hidden relative border-t border-[#D4AF37]/50">

                    {/* Decorative Arch (Top) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-[#0f261f] rounded-b-full border-b border-[#D4AF37] z-20 flex items-center justify-center">
                        <span className="font-arabic-title text-[#FFD700] text-xs tracking-[0.3em]">WALIMATUL URS</span>
                    </div>

                    {/* Content Viewport */}
                    <div className="flex-1 relative z-10 pt-16 pb-20 md:pb-0">
                        {/* Content */}
                        <div className="w-full h-full overflow-hidden">
                            {activeTab === 'home' && <HomePage onEnter={() => setActiveTab('event')} data={data} />}
                            {activeTab === 'quote' && <QuotePage data={data} />}
                            {activeTab === 'couple' && <CouplePage data={data} />}
                            {activeTab === 'event' && <EventPage data={data} />}
                            {activeTab === 'gallery' && <GalleryPage data={data} />}
                            {activeTab === 'gift' && <GiftPage data={data} />}
                            {activeTab === 'rsvp' && <RSVPPage data={data} />}
                        </div>
                    </div>

                </div>

                {/* Floating Controls */}
                <NavBar activeTab={activeTab} setTab={setActiveTab} data={data} />

                {/* Music Control */}
                <button
                    onClick={toggleMusic}
                    className="fixed top-6 right-6 z-50 w-12 h-12 glass-arabic rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0f261f] transition-all"
                >
                    {music ? <Music className="animate-pulse" size={18} /> : <Play size={18} />}
                </button>

            </div>

        </div>
    );
}

export default RoyalArabian;
