import React, { useState, useEffect, useRef } from 'react';
import {
    Heart, MapPin, Calendar, Play, Music,
    Home, User, Image as ImageIcon,
    ChevronDown, Info, Gift, Check, Search, Bell
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { mapToTemplateData } from '../utils/templateMapper';
import DIYOverlay from '../components/DIYOverlay';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: NETFLIX LUXURY (EXCLUSIVE)
 * - Cinematic Intro
 * - Dark Mode & Red Accents
 * - Horizontal/SPA Navigation
 */

// --- ASSETS DEFAULT ---
const DEFAULT_ASSETS = {
    bgm: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
    tudumSfx: "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
    noiseTexture: "https://www.transparenttextures.com/patterns/stardust.png",
    defaultCover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
};

/**
 * --- GLOBAL STYLES ---
 */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Martel+Sans:wght@200;300;400;600;700;800&family=Montserrat:wght@400;500;600&display=swap');

    .font-netflix { font-family: 'Bebas Neue', cursive; }
    .font-body { font-family: 'Martel Sans', sans-serif; }
    
    /* ANIMATIONS */
    @keyframes spotlight-move {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      50% { transform: translate(20px, -20px) scale(1.2); opacity: 0.5; }
    }

    @keyframes openFlap {
      0% { transform: rotateX(0deg); z-index: 50; }
      100% { transform: rotateX(180deg); z-index: 1; }
    }
    
    @keyframes riseUp {
      0% { transform: translateY(0) scale(0.9); opacity: 0; }
      100% { transform: translateY(-150px) scale(1); opacity: 1; }
    }

    @keyframes slideInPage {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .animate-spotlight { animation: spotlight-move 10s ease-in-out infinite alternate; }
    .flap-open { animation: openFlap 1.5s forwards ease-in-out; transform-origin: top; }
    .paper-rise { animation: riseUp 1.2s 0.8s forwards cubic-bezier(0.34, 1.56, 0.64, 1); }
    .page-enter { animation: slideInPage 0.5s ease-out forwards; }
    
    .glass-netflix {
      background: rgba(20, 20, 20, 0.90);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 50px rgba(0,0,0,0.8);
    }

    .netflix-btn {
      background: #E50914;
      color: white;
      transition: all 0.3s;
    }
    .netflix-btn:hover { background: #b20710; }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transition: all 0.3s;
    }
    .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    
    .film-grain {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: url(${DEFAULT_ASSETS.noiseTexture});
      opacity: 0.05;
      pointer-events: none;
      z-index: 5;
    }

    .animate-spin-slow {
        animation: spin 3s linear infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
  `}</style>
);

/**
 * --- COMPONENTS ---
 */

interface EnvelopeProps {
    onOpen: () => void;
    brideName: string;
    groomName: string;
    guestName: string;
}

const NetflixEnvelope = ({ onOpen, brideName, groomName, guestName }: EnvelopeProps) => {
    const [opening, setOpening] = useState(false);

    const handleOpen = () => {
        setOpening(true);
        const audio = new Audio(DEFAULT_ASSETS.tudumSfx);
        audio.volume = 0.5;
        audio.play().catch(() => { });

        setTimeout(onOpen, 2500);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${opening ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
            <div className={`relative w-[320px] h-[220px] md:w-[500px] md:h-[350px] perspective-1000 transition-transform duration-1000 ${opening ? 'translate-y-[200px]' : ''}`}>

                {/* Kartu/Undangan di Dalam */}
                <div className={`absolute top-2 left-2 right-2 bottom-4 bg-[#141414] shadow-md flex flex-col items-center justify-center z-10 border border-gray-800 ${opening ? 'paper-rise' : 'opacity-0'}`}>
                    <h2 className="font-netflix text-4xl md:text-5xl text-[#E50914] tracking-widest mb-1 text-center leading-none">
                        {groomName} & {brideName}
                    </h2>
                    <p className="font-body text-[8px] tracking-[0.3em] text-gray-400 uppercase mt-2">A Wedding Series Premiere</p>

                    {/* Guest Name */}
                    <div className="mt-6">
                        <p className="font-body text-[9px] text-gray-500 italic mb-1">Kepada Yth,</p>
                        <p className="font-body text-base text-white">{guestName}</p>
                    </div>

                    <div className="mt-4 flex gap-1 h-4 opacity-50">
                        {[...Array(20)].map((_, i) => <div key={i} className="w-1 bg-gray-500 h-full"></div>)}
                    </div>
                </div>

                {/* Amplop Belakang */}
                <div className="absolute inset-0 bg-[#b81d24] rounded-b-lg shadow-2xl z-20 overflow-hidden border-t border-[#8e161b]"></div>

                {/* Flap */}
                <div className={`absolute top-0 left-0 right-0 h-1/2 bg-[#d6232b] z-30 origin-top flex items-center justify-center shadow-lg transition-all ${opening ? 'flap-open' : ''}`} style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
                    <button
                        onClick={handleOpen}
                        className={`w-14 h-14 bg-black rounded-full border-[2px] border-[#E50914] shadow-xl flex items-center justify-center group hover:scale-110 transition-transform ${opening ? 'opacity-0' : ''}`}
                    >
                        <span className="font-netflix text-[#E50914] text-2xl mt-1">N</span>
                    </button>
                </div>

                {/* Amplop Depan */}
                <div className="absolute inset-0 z-40 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[#E50914]" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }}></div>
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-[#bf1319]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 45%)' }}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#b01016]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 45%)' }}></div>
                </div>

                {!opening && (
                    <div className="absolute -bottom-20 w-full text-center">
                        <p className="text-gray-400 font-body text-xs tracking-widest animate-pulse">TAP N LOGO TO OPEN</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const NavBar = ({ activeTab, setTab, data }: { activeTab: string, setTab: (t: string) => void, data: InvitationData }) => {
    const items = [
        { id: 'home', icon: Home, visible: true },
        { id: 'quote', icon: Info, visible: !!data.content.quote?.content },
        { id: 'couple', icon: User, visible: true },
        { id: 'event', icon: Calendar, visible: (data.content.events.akad?.enabled !== false || data.content.events.resepsi?.enabled !== false) },
        { id: 'gallery', icon: ImageIcon, visible: true },
        { id: 'gift', icon: Gift, visible: (data.engagement.gifts && data.engagement.gifts.length > 0) },
        { id: 'rsvp', icon: Check, visible: !!data.engagement.rsvp },
    ].filter(item => item.visible);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="glass-netflix px-4 py-3 rounded-full flex justify-between items-center shadow-2xl border-t border-gray-700">
                {items.map((item) => {
                    const active = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <item.icon size={active ? 20 : 18} />
                            {active && <div className="w-1 h-1 bg-[#E50914] rounded-full mt-1"></div>}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

// --- PAGES ---

const HomePage = ({ onPlay, data }: { onPlay: () => void, data: InvitationData }) => {
    const { hero, couples } = data.content;
    const groomName = couples.pria.name.split(' ')[0];
    const brideName = couples.wanita.name.split(' ')[0];

    return (
        <div className="flex flex-col h-full relative page-enter overflow-hidden">
            <div className="absolute inset-0">
                <img src={hero.main_image || DEFAULT_ASSETS.defaultCover} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-end h-full p-8 pb-32 md:pb-12 md:justify-center md:items-start md:pl-16">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#E50914] text-white text-[10px] font-bold px-1 py-0.5 rounded-sm">N</span>
                    <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">Series</span>
                </div>

                <h1 className="font-netflix text-7xl md:text-9xl text-white leading-[0.85] mb-4 drop-shadow-lg">
                    {groomName} <br /> <span className="text-[#E50914]">&</span> {brideName}
                </h1>

                <div className="flex items-center gap-3 text-sm text-gray-300 font-body mb-6">
                    <span className="text-[#46d369] font-bold">99% Match</span>
                    <span>{new Date().getFullYear()}</span>
                    <span className="border border-gray-500 px-1 text-xs">SU</span>
                    <span>1 Season</span>
                    <span className="border border-gray-500 px-1 text-xs">HD</span>
                </div>

                <p className="font-body text-sm md:text-base text-gray-300 max-w-md mb-8 leading-relaxed shadow-black drop-shadow-md">
                    {data.content.texts.hero_subtitle || "Join us for the premiere of our greatest adventure yet. A story of love, laughter, and happily ever after."}
                </p>

                <div className="flex gap-4">
                    <button onClick={onPlay} className="netflix-btn flex items-center gap-2 px-6 py-2 rounded font-bold text-black bg-white hover:bg-gray-200">
                        <Play size={20} fill="black" /> Play
                    </button>
                    <button className="btn-secondary flex items-center gap-2 px-6 py-2 rounded font-bold">
                        <Info size={20} /> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

const QuotePage = ({ data }: { data: InvitationData }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 page-enter relative bg-[#141414]">
        <div className="w-16 h-1 bg-[#E50914] mb-8"></div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Bismillah.svg" className="h-10 mb-8 opacity-70 invert" alt="Bismillah" />
        <p className="font-body text-lg md:text-xl leading-relaxed text-gray-300 max-w-lg mb-8 italic">
            "{data.content.quote.content}"
        </p>
        <p className="font-netflix text-2xl text-[#E50914] tracking-widest">{data.content.quote.source}</p>
    </div>
);

const CouplePage = ({ data }: { data: InvitationData }) => (
    <div className="h-full overflow-y-auto custom-scroll p-6 pt-10 pb-24 page-enter">
        <h2 className="text-white font-body font-bold text-2xl mb-6">Cast & Crew</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {/* Groom Card */}
            <div className="group relative h-80 rounded-md overflow-hidden cursor-pointer">
                <img src={data.content.couples.pria.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-netflix text-4xl text-white">{data.content.couples.pria.name}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase">The Groom</p>
                    <p className="text-gray-500 text-[10px] mt-1">{data.content.couples.pria.parents}</p>
                </div>
            </div>

            {/* Bride Card */}
            <div className="group relative h-80 rounded-md overflow-hidden cursor-pointer">
                <img src={data.content.couples.wanita.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-netflix text-4xl text-white">{data.content.couples.wanita.name}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase">The Bride</p>
                    <p className="text-gray-500 text-[10px] mt-1">{data.content.couples.wanita.parents}</p>
                </div>
            </div>
        </div>
    </div>
);

const EventPage = ({ data }: { data: InvitationData }) => {
    const { events } = data.content;

    return (
        <div className="h-full p-6 pt-10 pb-24 page-enter overflow-y-auto custom-scroll">
            <h2 className="text-white font-body font-bold text-2xl mb-6">Episodes</h2>
            <div className="flex flex-col gap-4">

                {/* Akad */}
                {events.akad.enabled !== false && (
                    <div className="flex gap-4 p-4 hover:bg-[#202020] rounded transition-colors cursor-pointer group border-b border-gray-800">
                        <div className="relative w-32 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center text-[#E50914] font-netflix text-3xl z-10">01</div>
                            <img src={events.akad.map_url ? "https://source.unsplash.com/random/300x200?mosque" : "https://images.unsplash.com/photo-1587271407850-8d4389181169?w=300"} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-white font-bold text-sm md:text-base">{data.content.texts.akad_title || 'Akad Nikah'}</h3>
                                <span className="text-gray-400 text-xs">{events.akad.time}</span>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">{events.akad.venue}</p>
                            <p className="text-gray-500 text-[10px] mt-0.5">{events.akad.date}</p>
                        </div>
                    </div>
                )}

                {/* Resepsi */}
                {events.resepsi.enabled !== false && (
                    <div className="flex gap-4 p-4 hover:bg-[#202020] rounded transition-colors cursor-pointer group border-b border-gray-800">
                        <div className="relative w-32 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center text-[#E50914] font-netflix text-3xl z-10">02</div>
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-white font-bold text-sm md:text-base">{data.content.texts.resepsi_title || 'Resepsi'}</h3>
                                <span className="text-gray-400 text-xs">{events.resepsi.time}</span>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">{events.resepsi.venue}</p>
                            <p className="text-gray-500 text-[10px] mt-0.5">{events.resepsi.date}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 px-4">
                <a
                    href={events.resepsi.map_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#333] text-white text-sm font-bold rounded hover:bg-[#444] flex items-center justify-center gap-2"
                >
                    <MapPin size={16} /> View Locations Map
                </a>
            </div>
        </div>
    );
};

const GalleryPage = ({ data }: { data: InvitationData }) => (
    <div className="h-full overflow-y-auto custom-scroll p-6 pt-10 pb-24 page-enter">
        <h2 className="text-white font-body font-bold text-2xl mb-2">Trailers & More</h2>

        {/* Video Prewedding */}
        {data.content.gallery.video_url && (
            <div className="mb-6 relative aspect-video group bg-gray-900 rounded-lg overflow-hidden cursor-pointer border border-gray-800 shadow-2xl">
                <iframe
                    src={`${data.content.gallery.video_url}${data.content.gallery.video_url.includes('?') ? '&' : '?'}controls=0&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                    title="Official Trailer"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-bold text-lg"><Play fill="white" className="inline mr-2" /> Play Trailer</p>
                </div>
            </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[...(data.content.gallery?.images || []), ...Array(6)].slice(0, 6).map((img, i) => (
                <div key={i} className="relative aspect-video group bg-gray-900 rounded overflow-hidden cursor-pointer">
                    <img src={img || `https://source.unsplash.com/random/600x400?wedding,love&sig=${i}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-black/50">
                            <Play fill="white" size={16} className="text-white ml-0.5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const GiftPage = ({ data }: { data: InvitationData }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center page-enter bg-[#141414]">
        <h2 className="text-white font-bold mb-6">{data.content.texts.gift_title}</h2>
        <div className="w-full max-w-sm space-y-4 pb-20 overflow-y-auto custom-scroll">
            {data.engagement.gifts?.map((gift, i) => (
                <div key={i} className="bg-[#1f1f1f] rounded-lg p-6 border border-gray-800 shadow-xl text-left relative overflow-hidden">
                    {/* Visa Logo Effect */}
                    <div className="absolute top-6 right-6 text-[#E50914] font-netflix text-xl opacity-80">CARD</div>

                    <p className="text-gray-400 text-xs uppercase mb-1">Bank</p>
                    <p className="text-white font-bold text-lg mb-4">{gift.bank}</p>

                    <p className="text-gray-400 text-xs uppercase mb-1">Number</p>
                    <p className="text-white font-mono text-xl tracking-widest mb-4">{gift.acc_number}</p>

                    <p className="text-gray-400 text-xs uppercase mb-1">Holder</p>
                    <p className="text-white text-sm">{gift.holder}</p>

                    <button
                        className="mt-4 w-full py-2 netflix-btn rounded font-bold text-xs flex items-center justify-center gap-2"
                        onClick={(e) => {
                            navigator.clipboard.writeText(gift.acc_number);
                            const original = e.currentTarget.innerHTML;
                            e.currentTarget.innerHTML = "Copied!";
                            setTimeout(() => e.currentTarget.innerHTML = original, 2000);
                        }}
                    >
                        <Gift size={12} /> Copy Number
                    </button>
                </div>
            ))}

            {data.engagement.gifts && data.engagement.gifts.length > 0 && data.engagement.qris_url && (
                <div className="bg-[#1f1f1f] rounded-lg p-6 border border-gray-800 shadow-xl text-center relative overflow-hidden group">
                    {/* Visa Logo Effect */}
                    <div className="absolute top-6 right-6 text-[#E50914] font-netflix text-xl opacity-80">QRIS</div>

                    <div className="w-48 h-48 mx-auto bg-white p-2 mb-4 rounded relative z-10">
                        <img src={data.engagement.qris_url} alt="QRIS" className="w-full h-full object-contain" />
                    </div>

                    <a
                        href={data.engagement.qris_url}
                        download="qris-netflix.png"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 w-full py-2 netflix-btn rounded font-bold text-xs flex items-center justify-center gap-2 relative z-10"
                    >
                        <Gift size={12} /> Download Code
                    </a>
                </div>
            )}

            {/* If no gifts but QRIS exists (edge case) */}
            {(!data.engagement.gifts || data.engagement.gifts.length === 0) && data.engagement.qris_url && (
                <div className="bg-[#1f1f1f] rounded-lg p-6 border border-gray-800 shadow-xl text-center relative overflow-hidden group">
                    <div className="absolute top-6 right-6 text-[#E50914] font-netflix text-xl opacity-80">QRIS</div>
                    <div className="w-48 h-48 mx-auto bg-white p-2 mb-4 rounded relative z-10">
                        <img src={data.engagement.qris_url} alt="QRIS" className="w-full h-full object-contain" />
                    </div>
                    <a
                        href={data.engagement.qris_url}
                        download="qris-netflix.png"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 w-full py-2 netflix-btn rounded font-bold text-xs flex items-center justify-center gap-2 relative z-10"
                    >
                        <Gift size={12} /> Download Code
                    </a>
                </div>
            )}
        </div>
        <p className="text-gray-500 text-xs mt-4 max-w-xs">{data.content.texts.gift_text}</p>
    </div>
);

const RSVPPage = ({ data }: { data: InvitationData }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 page-enter pb-24">
        <h2 className="text-white font-body font-bold text-2xl mb-8">Add to My List (RSVP)</h2>
        <div className="w-full max-w-sm">
            <RsvpForm
                whatsappNumber={data.engagement.rsvp_settings.whatsapp_number}
                messageTemplate={data.engagement.rsvp_settings.message_template}
                themeColor="#E50914"
            />
        </div>
    </div>
);

/**
 * --- MAIN APP ---
 */
const NetflixLuxury: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = "Tamu Undangan" }) => {
    const invitation = mapToTemplateData(data);
    const [stage, setStage] = useState<'envelope' | 'hero' | 'content'>('envelope');
    const [activeTab, setActiveTab] = useState('home');
    const [music, setMusic] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto play music when stage changes to content
    useEffect(() => {
        if (stage === 'content' && audioRef.current) {
            setMusic(true);
            audioRef.current.play().catch(() => console.log("Autoplay blocked"));
        }
    }, [stage]);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (music) audioRef.current.pause();
        else audioRef.current.play();
        setMusic(!music);
    };

    const handleProfileSelect = () => {
        setStage('content');
    };

    return (
        <div
            className="relative w-full h-screen overflow-hidden text-white font-sans"
            style={
                data.metadata.custom_bg_url
                    ? { backgroundImage: `url(${data.metadata.custom_bg_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
                    : { backgroundColor: '#141414' }
            }
        >
            {/* Dark cinematic overlay for custom background */}
            {data.metadata.custom_bg_url && (
                <div className="fixed inset-0 bg-black/85 z-0" />
            )}
            <GlobalStyles />
            <audio ref={audioRef} loop src={data.metadata.music_url || DEFAULT_ASSETS.bgm} />

            {/* --- LAYER 0: CINEMATIC BACKGROUND --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#141414]">
                <div className="film-grain"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000000_100%)] opacity-80"></div>
                {/* Static minimal spots if mouse parallax is heavy */}
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#E50914] rounded-full blur-[150px] opacity-10 animate-spotlight"></div>
            </div>

            {/* --- LAYER 1: ENVELOPE --- */}
            {stage === 'envelope' && (
                <NetflixEnvelope
                    onOpen={() => setStage('hero')}
                    brideName={invitation ? invitation.hero.bride_nickname : data.content.couples.wanita.name.split(' ')[0]}
                    groomName={invitation ? invitation.hero.groom_nickname : data.content.couples.pria.name.split(' ')[0]}
                    guestName={guestName}
                />
            )}

            {/* --- LAYER 2: WHO'S WATCHING (HERO SELECT) --- */}
            <div className={`fixed inset-0 z-20 flex flex-col items-center justify-center transition-all duration-1000 bg-[#141414] ${stage === 'hero' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <h1 className="font-body text-3xl md:text-5xl text-white mb-12 font-light">Who's watching?</h1>

                <div className="flex gap-4 md:gap-8">
                    {/* Items */}
                    <div className="group flex flex-col items-center gap-2 cursor-pointer" onClick={handleProfileSelect}>
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-[#E50914] flex items-center justify-center border-2 border-transparent group-hover:border-white overflow-hidden relative">
                            {/* Smiley Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-4 bg-black rounded-b-full"></div>
                                <div className="absolute top-8 left-6 w-3 h-3 bg-black rounded-full"></div>
                                <div className="absolute top-8 right-6 w-3 h-3 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-white text-sm md:text-lg font-bold group-hover:text-white text-gray-400">
                            {/* Try to get guest name from URL if possible, otherwise Guest */}
                            {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('to') || 'Guest'}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- LAYER 3: CONTENT --- */}
            <div className={`fixed inset-0 z-30 flex items-center justify-center p-0 md:p-8 transition-all duration-1000 delay-300 ${stage === 'content' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>

                <div className="glass-netflix w-full max-w-6xl h-full md:h-[85vh] rounded-none md:rounded-[10px] flex shadow-2xl overflow-hidden relative border-t-0 md:border md:border-gray-800">

                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-40 flex items-center justify-between px-6 pointer-events-none">
                        <div className="text-[#E50914] font-netflix text-4xl mt-2 tracking-widest">NETFLIX</div>
                        <div className="flex gap-4 text-white">
                            <Search size={20} />
                            <Bell size={20} />
                        </div>
                    </div>

                    {/* Viewport */}
                    <div className="flex-1 relative bg-[#141414] w-full">
                        <div className="w-full h-full relative z-10">
                            {activeTab === 'home' && <HomePage onPlay={() => setActiveTab('event')} data={data} />}
                            {activeTab === 'quote' && <QuotePage data={data} />}
                            {activeTab === 'couple' && <CouplePage data={data} />}
                            {activeTab === 'event' && <EventPage data={data} />}
                            {activeTab === 'gallery' && <GalleryPage data={data} />}
                            {activeTab === 'gift' && <GiftPage data={data} />}
                            {activeTab === 'rsvp' && <RSVPPage data={data} />}
                        </div>
                    </div>
                </div>

                <NavBar activeTab={activeTab} setTab={setActiveTab} data={data} />

                {/* Music Toggle */}
                <button
                    onClick={toggleMusic}
                    className="fixed top-20 right-6 md:top-10 md:right-10 z-[60] w-10 h-10 bg-black/50 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                    {music ? <Music className="animate-spin-slow" size={16} /> : <Play size={16} />}
                </button>
            </div>

            {/* DIY Overlay */}
            <DIYOverlay layout={data.metadata.diy_layout} />

        </div>
    );
};

export default NetflixLuxury;
