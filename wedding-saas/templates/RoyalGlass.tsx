import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Heart, MapPin, Calendar, Music, Play,
    Home, User, Image as ImageIcon, MessageCircle,
    ChevronDown, BookOpen, Gift, Copy
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { mapToTemplateData } from '../utils/templateMapper';
import RsvpForm from '../components/RsvpForm';

/** * --- KONFIGURASI ASET ---
 */
const ASSETS = {
    texture: "https://www.transparenttextures.com/patterns/cream-paper.png"
};

/**
 * --- GLOBAL CSS & KEYFRAMES ---
 */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Pinyon+Script&family=Montserrat:wght@200;300;400;500&display=swap');

    /* Fonts */
    .font-cinzel { font-family: 'Cinzel Decorative', cursive; }
    .font-royal { font-family: 'Cormorant Garamond', serif; }
    .font-script { font-family: 'Pinyon Script', cursive; }
    .font-modern { font-family: 'Montserrat', sans-serif; }

    /* --- ANIMATIONS --- */
    
    /* 1. Falling Petals */
    @keyframes falling-leaf {
      0% { transform: translate(0, -10vh) rotate(0deg) scale(0.8); opacity: 0; }
      10% { opacity: 0.8; }
      100% { transform: translate(100px, 110vh) rotate(360deg) scale(1); opacity: 0; }
    }

    /* 2. Shape Morphing (Blobs) */
    @keyframes morph-float {
      0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0, 0) rotate(0deg); }
      33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; transform: translate(30px, -50px) rotate(10deg); }
      66% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; transform: translate(-20px, 20px) rotate(-10deg); }
    }
    
    /* 3. Wiggle for Florals */
    @keyframes sway-slow {
      0%, 100% { transform: rotate(-5deg); }
      50% { transform: rotate(5deg); }
    }

    /* 4. Envelope & Transitions */
    @keyframes openFlap {
      0% { transform: rotateX(0deg); z-index: 50; }
      100% { transform: rotateX(180deg); z-index: 1; }
    }
    
    @keyframes riseUp {
      0% { transform: translateY(0) scale(0.9); opacity: 0; }
      100% { transform: translateY(-150px) scale(1); opacity: 1; }
    }

    @keyframes slideInPage {
      from { transform: translateX(40px); opacity: 0; filter: blur(4px); }
      to { transform: translateX(0); opacity: 1; filter: blur(0); }
    }

    /* CLASSES */
    .animate-falling { animation: falling-leaf linear infinite; }
    .animate-morph { animation: morph-float 15s ease-in-out infinite alternate; }
    .animate-sway { animation: sway-slow 8s ease-in-out infinite; }
    
    .flap-open { animation: openFlap 1.5s forwards ease-in-out; transform-origin: top; }
    .paper-rise { animation: riseUp 1.2s 0.8s forwards cubic-bezier(0.34, 1.56, 0.64, 1); }
    .page-enter { animation: slideInPage 0.6s ease-out forwards; }

    /* UTILS */
    .glass-strong {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    }
    
    .text-gold-gradient {
      background: linear-gradient(135deg, #8B6E4E 0%, #D4AF37 50%, #8B6E4E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
  `}</style>
);

/**
 * --- SVG ASSETS ---
 */
const HugeFloral = ({ className, color = "#D4A5A5", style }: any) => (
    <svg viewBox="0 0 200 200" className={`absolute pointer-events-none opacity-40 ${className}`} style={style}>
        <path d="M100 0 C 130 50, 180 50, 200 100 C 180 150, 130 180, 100 200 C 70 150, 20 150, 0 100 C 20 50, 70 20, 100 0" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M100 0 Q 100 100 0 100" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <path d="M100 0 Q 100 100 200 100" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <path d="M100 200 Q 100 100 0 100" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <path d="M100 200 Q 100 100 200 100" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <circle cx="100" cy="100" r="10" fill={color} fillOpacity="0.2" />
    </svg>
);

const Leaf = ({ className, style }: any) => (
    <svg viewBox="0 0 50 50" className={`absolute pointer-events-none ${className}`} style={style}>
        <path d="M25 0 Q 50 25 25 50 Q 0 25 25 0" fill="#D4A5A5" fillOpacity="0.4" />
    </svg>
);

/**
 * --- BACKGROUND SYSTEM (PARALLAX & PARTICLES) ---
 */
const LivingBackground = ({ mousePos }: any) => {
    // Generate random petals for falling animation
    const petals = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 10,
        scale: 0.5 + Math.random() * 0.5
    })), []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#F9F7F2]">
            {/* 1. Base Texture */}
            <div
                className="absolute inset-0 opacity-50 mix-blend-multiply"
                style={{ backgroundImage: `url(${ASSETS.texture})` }}
            />

            {/* 2. Parallax Container */}
            <div
                className="absolute inset-[-50px] transition-transform duration-200 ease-out will-change-transform"
                style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}
            >
                {/* Animated Blobs (Shapes) */}
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-rose-200/40 mix-blend-multiply filter blur-[80px] animate-morph"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-amber-200/40 mix-blend-multiply filter blur-[90px] animate-morph" style={{ animationDelay: '-5s' }}></div>
                <div className="absolute top-[40%] left-[60%] w-[25vw] h-[25vw] bg-pink-200/30 mix-blend-multiply filter blur-[60px] animate-morph" style={{ animationDelay: '-10s' }}></div>

                {/* Big Florals (Static but Parallaxed) */}
                <HugeFloral className="w-[500px] h-[500px] -top-20 -left-20 text-[#B8860B]" style={{ transform: 'rotate(15deg)' }} />
                <HugeFloral className="w-[600px] h-[600px] -bottom-40 -right-20 text-rose-300" color="#D4A5A5" style={{ transform: 'rotate(-15deg)' }} />
            </div>

            {/* 3. Falling Leaves Overlay (No Parallax for depth perception) */}
            <div className="absolute inset-0">
                {petals.map(p => (
                    <Leaf
                        key={p.id}
                        className="w-6 h-6 animate-falling"
                        style={{
                            left: `${p.left}%`,
                            animationDelay: `-${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                            transform: `scale(${p.scale})`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/**
 * --- COMPONENTS ---
 */

const Envelope = ({ onOpen, invitation }: { onOpen: () => void, invitation: any }) => {
    const [opening, setOpening] = useState(false);

    const handleOpen = () => {
        setOpening(true);
        // Simulate Sound Effect
        const audio = new Audio("https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");
        audio.volume = 0.2;
        audio.play().catch(() => { });

        setTimeout(onOpen, 2500);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/95 transition-opacity duration-1000 ${opening ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
            <div className={`relative w-[320px] h-[220px] md:w-[500px] md:h-[350px] perspective-1000 transition-transform duration-1000 ${opening ? 'translate-y-[200px]' : ''}`}>

                {/* Surat */}
                <div className={`absolute top-2 left-2 right-2 bottom-4 bg-[#F9F7F2] shadow-md flex flex-col items-center justify-center z-10 border border-gray-200 ${opening ? 'paper-rise' : 'opacity-0'}`}>
                    <h2 className="font-script text-4xl text-[#B8860B] mb-2">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</h2>
                    <p className="font-modern text-[10px] tracking-[0.3em] text-gray-400 uppercase">{invitation.texts.hero_title}</p>
                    <div className="absolute bottom-6 w-12 h-12 border border-[#B8860B] rounded-full flex items-center justify-center opacity-30">
                        <Heart size={16} fill="#B8860B" />
                    </div>
                </div>

                {/* Amplop Belakang */}
                <div className="absolute inset-0 bg-[#8B6E4E] rounded-b-lg shadow-2xl z-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                </div>

                {/* Flap */}
                <div className={`absolute top-0 left-0 right-0 h-1/2 bg-[#9C7C5B] z-30 origin-top flex items-center justify-center shadow-lg transition-all ${opening ? 'flap-open' : ''}`} style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
                    <button
                        onClick={handleOpen}
                        className={`w-14 h-14 md:w-16 md:h-16 bg-[#591C21] rounded-full border-[3px] border-[#8B3A3A] shadow-xl flex items-center justify-center group hover:scale-105 transition-transform ${opening ? 'opacity-0' : ''}`}
                    >
                        <span className="font-cinzel text-[#D4AF37] font-bold text-xl md:text-2xl group-hover:text-white transition-colors">
                            {invitation.hero.groom_nickname[0]}{invitation.hero.bride_nickname[0]}
                        </span>
                    </button>
                </div>

                {/* Amplop Depan */}
                <div className="absolute inset-0 z-40 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[#A68460]" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }}></div>
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-[#947452]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 45%)' }}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#8F6F4E]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 45%)' }}></div>
                </div>

                {!opening && (
                    <div className="absolute -bottom-20 w-full text-center">
                        <p className="text-[#D4AF37] font-modern text-xs tracking-widest animate-pulse">KETUK SEGEL UNTUK MEMBUKA</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Navbar
const NavBar = ({ activeTab, setTab }: any) => {
    const items = [
        { id: 'quote', icon: BookOpen },
        { id: 'couple', icon: User },
        { id: 'event', icon: Calendar },
        { id: 'home', icon: Home },
        { id: 'gallery', icon: ImageIcon },
        { id: 'gift', icon: Gift },
        { id: 'rsvp', icon: MessageCircle },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass-strong px-4 py-3 rounded-full flex gap-3 md:gap-6 shadow-2xl">
                {items.map((item) => {
                    const active = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={`relative p-2 rounded-full transition-all duration-300 ${active ? '-translate-y-2' : 'hover:-translate-y-1'}`}
                        >
                            {active && <span className="absolute inset-0 bg-[#B8860B]/20 blur-md rounded-full"></span>}
                            <item.icon
                                size={active ? 22 : 18}
                                className={`relative z-10 transition-colors ${active ? 'text-[#B8860B] stroke-[2.5px]' : 'text-gray-500'}`}
                            />
                            {active && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#B8860B] rounded-full"></div>}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

// --- PAGES ---
const HomePage = ({ invitation }: any) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 relative page-enter">
        <h3 className="font-modern text-xs tracking-[0.5em] text-[#B8860B] mb-8 animate-pulse">{invitation.texts.hero_title}</h3>
        <h1 className="font-script text-7xl md:text-9xl text-gold-gradient drop-shadow-sm mb-6 leading-tight">
            {invitation.hero.groom_nickname} <br /> <span className="text-4xl md:text-5xl text-gray-400">&</span> <br /> {invitation.hero.bride_nickname}
        </h1>
        <div className="w-24 h-[1px] bg-gray-300 my-8"></div>
        <p className="font-royal text-xl md:text-2xl text-gray-600 italic">{// Format date 
            new Date(invitation.hero.wedding_date_time).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
);

const QuotePage = ({ invitation }: any) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 page-enter relative">
        <HugeFloral className="w-64 h-64 -top-10 -left-10 opacity-20" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Bismillah.svg" className="h-10 mb-8 opacity-70" alt="Bismillah" />
        <p className="font-royal text-xl md:text-2xl italic leading-relaxed text-gray-700 max-w-lg mb-8">
            "{invitation.quotes.content}"
        </p>
        <p className="font-modern text-xs font-bold text-[#B8860B] tracking-widest">({invitation.quotes.source})</p>
    </div>
);

const CouplePage = ({ invitation }: any) => (
    <div className="h-full overflow-y-auto hide-scrollbar p-6 pt-10 page-enter">
        <h2 className="text-center font-cinzel text-3xl text-[#B8860B] mb-12">{invitation.texts.couple_title}</h2>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            <div className="text-center group">
                <div className="relative w-48 h-64 mx-auto mb-4 overflow-hidden rounded-t-full border-b-4 border-[#B8860B]">
                    <img src={invitation.couple.groom.photo_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                </div>
                <h3 className="font-script text-4xl">{invitation.couple.groom.full_name}</h3>
                <p className="font-modern text-[10px] tracking-widest text-gray-500 mt-2 uppercase">Putra {invitation.couple.groom.parents}</p>
            </div>
            <span className="font-script text-4xl text-[#D4AF37]">&</span>
            <div className="text-center group">
                <div className="relative w-48 h-64 mx-auto mb-4 overflow-hidden rounded-t-full border-b-4 border-[#B8860B]">
                    <img src={invitation.couple.bride.photo_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                </div>
                <h3 className="font-script text-4xl">{invitation.couple.bride.full_name}</h3>
                <p className="font-modern text-[10px] tracking-widest text-gray-500 mt-2 uppercase">Putri {invitation.couple.bride.parents}</p>
            </div>
        </div>
    </div>
);

const EventPage = ({ invitation }: any) => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center page-enter">
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
            {invitation.events.akad.enabled && (
                <div className="bg-white/40 p-6 border border-[#B8860B]/30 rounded-lg hover:bg-white/60 transition-colors">
                    <h3 className="font-cinzel text-lg text-[#B8860B] mb-2">{invitation.texts.akad_title}</h3>
                    <p className="font-royal text-lg text-gray-700">{invitation.events.akad.time}</p>
                    <p className="font-modern text-xs text-gray-500 mt-2">{invitation.events.akad.location_name}</p>
                </div>
            )}
            {invitation.events.resepsi.enabled && (
                <div className="bg-white/40 p-6 border border-[#B8860B]/30 rounded-lg hover:bg-white/60 transition-colors">
                    <h3 className="font-cinzel text-lg text-[#B8860B] mb-2">{invitation.texts.resepsi_title}</h3>
                    <p className="font-royal text-lg text-gray-700">{invitation.events.resepsi.time}</p>
                    <p className="font-modern text-xs text-gray-500 mt-2">{invitation.events.resepsi.location_name}</p>
                </div>
            )}
        </div>
        <a href={invitation.events.akad.map_url || invitation.events.resepsi.map_url} target="_blank" className="mt-8 px-6 py-2 border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-colors font-modern text-xs tracking-widest uppercase flex items-center gap-2">
            <MapPin size={14} /> Google Maps
        </a>
    </div>
);

const GalleryPage = ({ invitation }: any) => (
    <div className="h-full overflow-y-auto hide-scrollbar p-6 pt-10 page-enter">
        <h2 className="text-center font-cinzel text-3xl text-[#B8860B] mb-8">{invitation.texts.gallery_title}</h2>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {invitation.gallery.images.map((img: string, i: number) => (
                <div key={i} className="break-inside-avoid relative group rounded-lg overflow-hidden">
                    <img src={img} className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[#B8860B]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>
    </div>
);

const GiftPage = ({ invitation }: any) => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center page-enter">
        <h2 className="font-cinzel text-3xl text-[#B8860B] mb-4">{invitation.texts.gift_title}</h2>
        <p className="font-royal text-lg text-gray-600 mb-8 max-w-xs">{invitation.texts.gift_text}</p>

        <div className="flex flex-col gap-4 w-full max-w-xs h-[50vh] overflow-y-auto hide-scrollbar">
            {invitation.gifts.bank_accounts.map((gift: any, idx: number) => (
                <div key={idx} className="bg-white/50 border border-[#B8860B]/30 p-8 rounded-xl shadow-sm">
                    <p className="font-mono text-2xl tracking-wider text-gray-800 mb-2">{gift.account_number}</p>
                    <p className="font-modern text-xs uppercase text-gray-500 mb-6">{gift.bank_name} a.n {gift.holder_name}</p>
                    <button
                        className="w-full py-3 bg-[#B8860B] text-white hover:bg-[#8B6E4E] transition-colors font-modern text-xs font-bold uppercase flex items-center justify-center gap-2 rounded"
                        onClick={(e) => {
                            navigator.clipboard.writeText(gift.account_number);
                            const original = e.currentTarget.innerHTML;
                            e.currentTarget.innerHTML = "Berhasil Disalin";
                            setTimeout(() => e.currentTarget.innerHTML = original, 2000);
                        }}
                    >
                        <Copy size={14} /> Salin No. Rekening
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const RSVPPage = ({ invitation }: any) => (
    <div className="flex flex-col items-center justify-center h-full p-6 page-enter">
        <h2 className="font-cinzel text-3xl text-[#B8860B] mb-8">RSVP</h2>
        <div className="w-full max-w-sm">
            <RsvpForm
                whatsappNumber={invitation.rsvp.whatsapp_number}
                messageTemplate={invitation.rsvp.message_template}
                themeColor="#B8860B"
            />
        </div>
    </div>
);

/**
 * --- MAIN APP ---
 */
export default function RoyalGlass({ data }: { data: InvitationData }) {
    const [stage, setStage] = useState('envelope'); // envelope -> hero -> content
    const [activeTab, setActiveTab] = useState('home');
    const [music, setMusic] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const audioRef = useRef<HTMLAudioElement>(null);

    const invitation = mapToTemplateData(data);

    // Parallax Logic
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX - window.innerWidth / 2) * 0.05,
                y: (e.clientY - window.innerHeight / 2) * 0.05
            });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    // Music Toggle
    const toggleMusic = () => {
        if (audioRef.current) {
            if (music) audioRef.current.pause();
            else audioRef.current.play();
            setMusic(!music);
        }
    };

    // Scroll Jacking (Hero -> Content)
    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (stage === 'hero' && e.deltaY > 50) setStage('content');
        };
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [stage]);

    if (!invitation) return <div>Loading...</div>;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#F9F7F2] text-[#2C2C2C]">
            <GlobalStyles />
            <audio ref={audioRef} loop src={invitation.metadata.music_url} />

            {/* --- LAYER 0: LIVING BACKGROUND (FULL SCREEN) --- */}
            <LivingBackground mousePos={mousePos} />

            {/* --- LAYER 1: ENVELOPE MODAL --- */}
            {stage === 'envelope' && (
                <Envelope
                    invitation={invitation}
                    onOpen={() => {
                        setStage('hero');
                        setMusic(true);
                        if (audioRef.current) audioRef.current.play().catch(() => { });
                    }}
                />
            )}

            {/* --- LAYER 2: HERO LANDING --- */}
            <div className={`fixed inset-0 z-20 flex flex-col items-center justify-center transition-all duration-1000 ${stage === 'hero' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <h1 className="font-script text-[10rem] text-gold-gradient drop-shadow-lg opacity-80 animate-pulse">
                    {invitation.hero.groom_nickname[0]}&{invitation.hero.bride_nickname[0]}
                </h1>
                <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
                    <span className="font-modern text-[10px] tracking-[0.3em] uppercase text-gray-500">Scroll to Explore</span>
                    <ChevronDown className="text-[#B8860B]" />
                </div>
            </div>

            {/* --- LAYER 3: MAIN GLASS CARD --- */}
            <div className={`fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8 transition-all duration-1000 delay-300 ${stage === 'content' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>

                <div className="glass-strong w-full max-w-5xl h-[85vh] rounded-[30px] flex shadow-2xl overflow-hidden relative">

                    {/* Left Decor (Desktop) */}
                    <div className="hidden md:block w-1/3 relative border-r border-white/50 overflow-hidden bg-[#E8DCCF]">
                        <img src={invitation.hero.main_image_url} className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay hover:scale-105 transition-transform duration-[20s]" />
                        <div className="absolute top-10 left-10 right-10 bottom-10 border border-[#B8860B]/50 rounded-full"></div>
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <span className="font-cinzel text-3xl text-[#B8860B] block">{new Date(invitation.hero.wedding_date_time).getDate()}</span>
                            <span className="font-modern text-xs tracking-[0.5em] uppercase text-gray-600">{new Date(invitation.hero.wedding_date_time).toLocaleString('default', { month: 'long' })}</span>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 relative bg-[#FDFBF9]/40">
                        {/* Note: bg opacity low to show shapes behind */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <HugeFloral className="w-40 h-40 -top-10 -right-10 opacity-30 animate-sway" />
                            <HugeFloral className="w-40 h-40 -bottom-10 -left-10 opacity-30 animate-sway" style={{ animationDelay: '-4s' }} />
                        </div>

                        {/* Tab Content */}
                        <div className="w-full h-full relative z-10">
                            {activeTab === 'home' && <HomePage invitation={invitation} />}
                            {activeTab === 'quote' && <QuotePage invitation={invitation} />}
                            {activeTab === 'couple' && <CouplePage invitation={invitation} />}
                            {activeTab === 'event' && <EventPage invitation={invitation} />}
                            {activeTab === 'gallery' && <GalleryPage invitation={invitation} />}
                            {activeTab === 'gift' && <GiftPage invitation={invitation} />}
                            {activeTab === 'rsvp' && <RSVPPage invitation={invitation} />}
                        </div>
                    </div>

                </div>

                {/* Floating Controls */}
                <NavBar activeTab={activeTab} setTab={setActiveTab} />
                <button
                    onClick={toggleMusic}
                    className="fixed top-6 right-6 z-50 w-10 h-10 glass-strong rounded-full flex items-center justify-center text-[#B8860B] hover:scale-110 transition-transform"
                >
                    {music ? <Music className="animate-spin-slow" size={16} /> : <Play size={16} />}
                </button>

            </div>

        </div>
    );
}
