import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat,
    Calendar, MapPin, Clock,
    Disc, Mic2, LayoutList, Gift, CheckCircle, MoreHorizontal
} from 'lucide-react';
import { TemplateProps } from '../lib/templates';
import { InvitationData } from '../types/invitation';

/**
 * --- GLOBAL STYLES & ANIMATIONS ---
 */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

    :root {
      --spoti-green: #1DB954;
      --spoti-black: #121212;
      --spoti-dark: #181818;
      --spoti-light: #282828;
      --text-main: #FFFFFF;
      --text-sub: #B3B3B3;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background-color: var(--spoti-black);
      color: var(--text-main);
      overflow-x: hidden;
    }

    .animate-spin-slow { animation: spin 8s linear infinite; }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes equalizer {
      0% { height: 3px; }
      50% { height: 15px; }
      100% { height: 3px; }
    }
    .animate-eq { animation: equalizer 1s infinite ease-in-out; }

    /* Page Transition */
    .page-enter {
      animation: fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    @keyframes fadeUp {
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--spoti-black); }
    ::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #888; }
  `}</style>
);

/**
 * --- BACKGROUND SYSTEM (CANVAS) ---
 */
const CanvasBackground = ({ customBg }: { customBg?: string }) => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {customBg ? (
            <>
                {/* Custom Background Image */}
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${customBg}")` }}></div>
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/60"></div>
            </>
        ) : (
            <>
                {/* Animated Gradients (Default) */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 animate-[spin_20s_linear_infinite]"
                    style={{
                        background: 'conic-gradient(from 0deg, #1DB954, transparent, #121212, transparent, #1DB954)',
                        filter: 'blur(100px)'
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#121212]/80"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>
            </>
        )}
    </div>
);

/**
 * --- COMPONENTS ---
 */

// 1. OPENING SEQUENCE
interface OpeningSequenceProps {
    onOpen: () => void;
    onComplete: () => void;
    cover: string;
    coupleName: string;
}

const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onOpen, onComplete, cover, coupleName }) => {
    const [step, setStep] = useState<'idle' | 'playing' | 'sliding'>('idle');

    const handleStart = () => {
        onOpen(); // Start Music
        setStep('playing');

        // Play GIF for 3 seconds then slide up
        setTimeout(() => {
            setStep('sliding');
            // Wait for slide animation to finish (1s)
            setTimeout(onComplete, 1000);
        }, 3000);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out ${step === 'sliding' ? '-translate-y-full' : 'translate-y-0'}`}
        >
            {step === 'idle' ? (
                <div className="relative z-10 p-8 flex flex-col items-center animate-fade-in-up w-full h-full justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 relative group">
                        <img src={cover} className="w-full h-full object-cover rounded shadow-2xl" alt="Cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tighter text-white">{coupleName}</h1>
                    <p className="text-[#1DB954] font-bold text-sm tracking-widest uppercase mb-10">Exclusive Release</p>

                    <button
                        onClick={handleStart}
                        className="bg-[#1DB954] text-black font-bold rounded-full px-10 py-4 hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(29,185,84,0.5)]"
                    >
                        <Play size={20} fill="black" /> LISTEN NOW
                    </button>

                    <p className="absolute bottom-10 text-[10px] text-[#555] font-mono">POWERED BY SPOTILOVE</p>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                    {/* The GIF Asset */}
                    <img
                        src="/assets/spotilove_animation.gif"
                        className="w-full h-full object-cover"
                        alt="Opening Animation"
                    />
                </div>
            )}
        </div>
    );
};

// 2. SIDEBAR (DESKTOP)
const Sidebar = ({ activeTab, setTab }: { activeTab: string, setTab: (t: string) => void }) => {
    const items = [
        { id: 'home', icon: HomeIcon, label: 'Home' },
        { id: 'event', icon: Calendar, label: 'Tour Dates' },
        { id: 'couple', icon: Mic2, label: 'Artist' },
        { id: 'gallery', icon: LayoutList, label: 'Discography' },
        { id: 'gift', icon: Gift, label: 'Merch' },
        { id: 'rsvp', icon: CheckCircle, label: 'Fan Club' },
    ];

    function HomeIcon(props: any) { return <div className="p-0"><svg width="24" height="24" viewBox="0 0 24 24" fill={props.fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div> }

    return (
        <div className="hidden md:flex w-64 bg-black flex-col h-full fixed left-0 top-0 z-40 p-6">
            <div className="flex items-center gap-2 mb-8 text-white">
                <Disc size={32} className="text-[#1DB954] animate-spin-slow" />
                <span className="font-bold text-xl">SpotiLove</span>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={`flex items-center gap-4 w-full text-sm font-bold transition-colors ${activeTab === item.id ? 'text-white' : 'text-[#B3B3B3] hover:text-white'}`}
                    >
                        <item.icon size={24} fill={activeTab === item.id ? "currentColor" : "none"} />
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-6 border-t border-[#282828]">
                <div className="flex items-center gap-3 bg-[#282828] p-3 rounded-lg cursor-pointer hover:bg-[#3E3E3E] transition">
                    <div className="w-10 h-10 rounded bg-[#1DB954] flex items-center justify-center">
                        <Heart fill="white" size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Liked Songs</p>
                        <p className="text-xs text-[#B3B3B3]">248 songs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. PLAYER BAR (BOTTOM NAV & CONTROLS)
interface PlayerBarProps {
    activeTab: string;
    setTab: (t: string) => void;
    isPlaying: boolean;
    togglePlay: () => void;
    cover: string;
    title: string;
    artist: string;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ activeTab, setTab, isPlaying, togglePlay, cover, title, artist }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.5)), 500);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-[#181818] border-t border-[#282828] z-50 flex items-center justify-between px-4">
            <div className="flex items-center gap-3 w-[30%] min-w-[120px]">
                <img src={cover} className="h-14 w-14 rounded shadow hidden sm:block animate-spin-slow" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate hover:underline cursor-pointer">{title}</p>
                    <p className="text-xs text-[#B3B3B3] truncate hover:underline cursor-pointer hover:text-white">{artist}</p>
                </div>
                <Heart size={16} className="text-[#1DB954] ml-2 hidden sm:block" fill="#1DB954" />
            </div>

            <div className="flex flex-col items-center max-w-[40%] w-full">
                <div className="flex items-center gap-4 mb-1">
                    <Shuffle size={16} className="text-[#B3B3B3] hover:text-white hidden sm:block cursor-pointer" />
                    <SkipBack size={20} className="text-[#B3B3B3] hover:text-white cursor-pointer" fill="currentColor" />
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition"
                    >
                        {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
                    </button>
                    <SkipForward size={20} className="text-[#B3B3B3] hover:text-white cursor-pointer" fill="currentColor" />
                    <Repeat size={16} className="text-[#B3B3B3] hover:text-white hidden sm:block cursor-pointer" />
                </div>
                <div className="w-full flex items-center gap-2 text-[10px] text-[#B3B3B3] font-mono">
                    <span>1:24</span>
                    <div className="h-1 bg-[#4D4D4D] rounded-full flex-1 relative group cursor-pointer">
                        <div className="absolute h-full bg-white rounded-full group-hover:bg-[#1DB954]" style={{ width: `${progress}%` }}></div>
                        <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 shadow opacity-0 group-hover:opacity-100" style={{ left: `${progress}%` }}></div>
                    </div>
                    <span>3:45</span>
                </div>
            </div>

            <div className="w-[30%] flex justify-end items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                    <Mic2 size={16} className="text-[#B3B3B3] hover:text-white" />
                    <div className="w-20 h-1 bg-[#4D4D4D] rounded-full">
                        <div className="w-3/4 h-full bg-white group-hover:bg-[#1DB954] rounded-full"></div>
                    </div>
                </div>

                <div className="sm:hidden relative group">
                    <LayoutList className="text-[#B3B3B3]" />
                    <div className="absolute bottom-10 right-0 bg-[#282828] rounded-lg p-2 shadow-2xl w-40 hidden group-hover:block">
                        {['home', 'event', 'gallery', 'rsvp'].map(t => (
                            <button key={t} onClick={() => setTab(t)} className="block w-full text-left p-2 text-sm text-white hover:bg-[#3E3E3E] rounded capitalize">
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * --- PAGES ---
 */
const HomePage = ({ DATA }: { DATA: any }) => (
    <div className="page-enter pb-24">
        <div className="relative h-[400px] flex items-end p-6 md:p-8 bg-gradient-to-b from-[#535353] to-[#121212]">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-end gap-6 w-full">
                <div className="w-40 h-40 md:w-52 md:h-52 shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                    <img src={DATA.cover} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                        <span className="w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center text-black text-[10px]">✓</span> Verified Couple
                    </p>
                    <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter">{DATA.couple.groom} & {DATA.couple.bride}</h1>
                    <p className="text-[#FFFFFF]/70 text-sm md:text-base font-medium max-w-xl">
                        The Wedding Celebration • {DATA.date} • 2,492,103 Monthly Wishes
                    </p>
                </div>
            </div>
        </div>

        <div className="px-6 md:px-8 py-6 flex items-center gap-6">
            <button className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg text-black">
                <Play size={28} fill="black" className="ml-1" />
            </button>
            <button className="text-[#1DB954]"><Heart size={32} fill="#1DB954" /></button>
            <button className="text-[#B3B3B3] hover:text-white"><MoreHorizontal size={32} /></button>
        </div>

        <div className="px-6 md:px-8">
            <h2 className="text-2xl font-bold mb-4">Popular</h2>
            <div className="flex flex-col gap-2">
                <div className="group flex items-center p-2 rounded hover:bg-[#ffffff]/10 transition cursor-pointer">
                    <span className="w-8 text-center text-[#B3B3B3] group-hover:hidden">1</span>
                    <span className="w-8 text-center hidden group-hover:flex justify-center"><Play size={14} fill="white" /></span>
                    <img src={DATA.cover} className="w-10 h-10 mr-4 rounded" />
                    <div className="flex-1">
                        <p className="text-white font-medium">The Proposal</p>
                        <p className="text-xs text-[#B3B3B3]">{DATA.couple.groom} • {DATA.couple.bride}</p>
                    </div>
                    <p className="text-sm text-[#B3B3B3]">Jan 2023</p>
                    <span className="ml-8 text-sm text-[#B3B3B3]">3:45</span>
                </div>
                <div className="group flex items-center p-2 rounded hover:bg-[#ffffff]/10 transition cursor-pointer">
                    <span className="w-8 text-center text-[#B3B3B3] group-hover:hidden">2</span>
                    <span className="w-8 text-center hidden group-hover:flex justify-center"><Play size={14} fill="white" /></span>
                    <img src={DATA.cover} className="w-10 h-10 mr-4 rounded" />
                    <div className="flex-1">
                        <p className="text-white font-medium text-[#1DB954]">The Wedding Day</p>
                        <p className="text-xs text-[#B3B3B3]">{DATA.couple.groom} • {DATA.couple.bride}</p>
                    </div>
                    <p className="text-sm text-[#B3B3B3]">Aug 2024</p>
                    <div className="ml-8 flex gap-1 h-3 items-end">
                        <div className="w-1 bg-[#1DB954] animate-eq"></div>
                        <div className="w-1 bg-[#1DB954] animate-eq" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 bg-[#1DB954] animate-eq" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const EventPage = ({ events }: { events: InvitationData['content']['events'] }) => (
    <div className="page-enter p-6 md:p-8 pb-24 pt-20">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">On Tour (Events)</h2>
            <span className="text-xs font-bold text-[#B3B3B3] uppercase tracking-widest border border-[#B3B3B3] px-3 py-1 rounded-full">Live Dates</span>
        </div>

        <div className="space-y-4">
            {events.akad?.enabled !== false && (
                <div className="flex flex-col md:flex-row gap-4 bg-[#181818] p-6 rounded-lg hover:bg-[#282828] transition group">
                    <div className="flex flex-col items-center justify-center bg-[#121212] w-20 h-20 rounded border border-[#333] text-center shrink-0">
                        <span className="text-xs text-[#1DB954] font-bold uppercase">AKAD</span>
                        <span className="text-lg font-bold">NIKAH</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-[#1DB954] transition">Akad Nikah</h3>
                        <div className="flex items-center gap-4 text-sm text-[#B3B3B3]">
                            <span className="flex items-center gap-1"><Clock size={14} /> {events.akad.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {events.akad.venue}</span>
                        </div>
                        <p className="text-xs text-[#B3B3B3] mt-2">{events.akad.address}</p>
                    </div>
                    {events.akad.map_url && (
                        <a href={events.akad.map_url} target="_blank" rel="noopener noreferrer" className="h-10 px-6 rounded-full border border-[#B3B3B3] text-white font-bold text-sm hover:border-white hover:scale-105 transition self-center flex items-center justify-center">
                            MAPS
                        </a>
                    )}
                </div>
            )}

            {events.resepsi?.enabled !== false && (
                <div className="flex flex-col md:flex-row gap-4 bg-[#181818] p-6 rounded-lg hover:bg-[#282828] transition group">
                    <div className="flex flex-col items-center justify-center bg-[#121212] w-20 h-20 rounded border border-[#333] text-center shrink-0">
                        <span className="text-xs text-[#1DB954] font-bold uppercase">RESEPSI</span>
                        <span className="text-lg font-bold">PARTY</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-[#1DB954] transition">Grand Reception</h3>
                        <div className="flex items-center gap-4 text-sm text-[#B3B3B3]">
                            <span className="flex items-center gap-1"><Clock size={14} /> {events.resepsi.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {events.resepsi.venue}</span>
                        </div>
                        <p className="text-xs text-[#B3B3B3] mt-2">{events.resepsi.address}</p>
                    </div>
                    {events.resepsi.map_url && (
                        <a href={events.resepsi.map_url} target="_blank" rel="noopener noreferrer" className="h-10 px-6 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition self-center flex items-center justify-center">
                            MAPS
                        </a>
                    )}
                </div>
            )}
        </div>
    </div>
);

const CouplePage = ({ couple, cover }: { couple: InvitationData['content']['couples'], cover: string }) => (
    <div className="page-enter pb-24">
        <div className="h-[300px] bg-cover bg-center relative" style={{ backgroundImage: `url(${cover})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:left-8">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#0D72EA] text-white p-1 rounded-full"><CheckCircle size={12} fill="white" className="text-[#0D72EA]" /></span>
                    <span className="text-sm font-bold text-white">Verified Artist</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-4">The Couple</h1>
                <p className="text-[#B3B3B3] text-sm">2,492,103 monthly listeners</p>
            </div>
        </div>

        <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <div className="bg-[#181818] rounded-lg p-6 relative overflow-hidden group cursor-pointer hover:bg-[#282828] transition">
                <p className="text-white relative z-10 max-w-2xl leading-relaxed">
                    We met at a coffee shop in Jakarta back in 2018. It started with a shared playlist, and now we are sharing our lives together. Join us as we embark on our greatest tour yet: Marriage.
                </p>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1DB954] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
                        <img src={couple.pria.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold">{couple.pria.name}</h3>
                        <p className="text-sm text-[#B3B3B3]">{couple.pria.parents}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
                        <img src={couple.wanita.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold">{couple.wanita.name}</h3>
                        <p className="text-sm text-[#B3B3B3]">{couple.wanita.parents}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const GiftPage = ({ gifts }: { gifts: InvitationData['engagement']['gifts'] }) => (
    <div className="page-enter p-6 md:p-8 pb-24 pt-20">
        <h2 className="text-2xl font-bold mb-6">Merch (Wedding Gift)</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, idx) => (
                <div key={idx} className="bg-[#181818] p-4 rounded-lg group hover:bg-[#282828] transition">
                    <div className="aspect-video bg-[#222] rounded mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-600 opacity-80"></div>
                        <p className="relative z-10 font-bold text-2xl tracking-widest">{gift.bank}</p>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{gift.bank} Transfer</h3>
                    <p className="text-[#B3B3B3] text-sm mb-4">Transfer to {gift.holder}</p>
                    <div className="flex items-center justify-between bg-[#121212] p-3 rounded">
                        <span className="font-mono text-[#1DB954]">{gift.acc_number}</span>
                        <button className="text-xs font-bold hover:text-white text-[#B3B3B3]" onClick={() => {
                            navigator.clipboard.writeText(gift.acc_number);
                            alert('Copied!');
                        }}>COPY</button>
                    </div>
                </div>
            ))}

            <div className="bg-[#181818] p-4 rounded-lg group hover:bg-[#282828] transition">
                <div className="aspect-video bg-[#222] rounded mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-90"></div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Commons_QR_code.png/150px-Commons_QR_code.png" className="relative z-10 w-24 h-24 mix-blend-multiply" />
                </div>
                <h3 className="font-bold text-lg mb-1">QRIS / E-Wallet</h3>
                <p className="text-[#B3B3B3] text-sm mb-4">Scan for instant gift</p>
                <button className="w-full py-2 border border-[#B3B3B3] rounded-full text-sm font-bold hover:border-white hover:scale-105 transition">DOWNLOAD QR</button>
            </div>
        </div>
    </div>
);

const GalleryPage = ({ images }: { images: string[] }) => (
    <div className="page-enter p-6 md:p-8 pb-24 pt-20">
        <h2 className="text-2xl font-bold mb-6">Discography</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, i) => (
                <div key={i} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition group cursor-pointer">
                    <div className="aspect-square bg-[#333] mb-4 rounded shadow-lg overflow-hidden relative">
                        <img src={img || `https://source.unsplash.com/random/400x400?wedding,love&sig=${i}`} className="w-full h-full object-cover" />
                        <div className="absolute right-2 bottom-2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
                            <Play fill="black" className="ml-1 text-black" />
                        </div>
                    </div>
                    <h3 className="font-bold text-sm truncate">Our Moment #{i + 1}</h3>
                    <p className="text-xs text-[#B3B3B3]">2024 • Photo</p>
                </div>
            ))}
        </div>
    </div>
);

const RSVPPage = ({ rsvp }: { rsvp: boolean }) => (
    <div className="page-enter p-6 md:p-8 pb-24 pt-20 flex justify-center">
        <div className="w-full max-w-lg bg-[#181818] p-8 rounded-xl shadow-2xl border border-white/5">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Join The Fan Club</h2>
                <p className="text-[#B3B3B3] text-sm">RSVP to get exclusive access to our wedding event.</p>
            </div>

            {rsvp ? (
                <form className="space-y-4" onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                    const attend = (form.elements.namedItem('attend') as HTMLSelectElement).value;
                    const wishes = (form.elements.namedItem('wishes') as HTMLTextAreaElement).value;
                    const msg = `Halo, saya ${name}. ${attend}. Doa saya: ${wishes}`;
                    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(msg)}`, '_blank');
                }}>
                    <div>
                        <label className="block text-xs font-bold mb-2">FULL NAME</label>
                        <input name="name" type="text" className="w-full bg-[#121212] border border-[#333] rounded p-3 text-white focus:border-[#1DB954] focus:outline-none transition" placeholder="Your Name" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2">ATTENDANCE</label>
                        <select name="attend" className="w-full bg-[#121212] border border-[#333] rounded p-3 text-white focus:border-[#1DB954] focus:outline-none transition">
                            <option value="Saya akan hadir">Will Attend</option>
                            <option value="Maaf tidak bisa hadir">Cannot Attend</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2">WISHES</label>
                        <textarea name="wishes" className="w-full bg-[#121212] border border-[#333] rounded p-3 text-white focus:border-[#1DB954] focus:outline-none transition h-24 resize-none" placeholder="Write a message..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#1DB954] text-black font-bold py-3.5 rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(29,185,84,0.3)]">
                        CONFIRM ATTENDANCE
                    </button>
                </form>
            ) : (
                <p className="text-center text-gray-400">RSVP is currently closed.</p>
            )}
        </div>
    </div>
);

/**
 * --- MAIN APP ORCHESTRATOR ---
 */
const SpotiLove: React.FC<TemplateProps> = ({ data }) => {
    const [showOpening, setShowOpening] = useState(true);
    const [activeTab, setActiveTab] = useState('home');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Derived Data
    const DATA = {
        couple: {
            groom: data.content.couples.pria.name || "Groom",
            bride: data.content.couples.wanita.name || "Bride",
            fullname: `${data.content.couples.pria.name} & ${data.content.couples.wanita.name}`,
            desc: "Two souls, one playlist. Join us as we start our greatest track yet."
        },
        date: data.content.hero.date || "Save The Date",
        cover: data.content.hero.main_image || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
        musicUrl: data.metadata.music_url || ""
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleStartApp = () => {
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
        }
    };

    // When opening sequence (animations) are completely finished
    const handleOpeningComplete = () => {
        setShowOpening(false);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <GlobalStyles />
            <audio ref={audioRef} loop src={DATA.musicUrl} />
            <CanvasBackground customBg={data.metadata.custom_bg_url} />

            {/* OPENING SEQUENCE (Z-INDEX HIGH) */}
            {showOpening && (
                <OpeningSequence
                    cover={DATA.cover}
                    coupleName={DATA.couple.fullname}
                    onOpen={handleStartApp}
                    onComplete={handleOpeningComplete}
                />
            )}

            {/* MAIN APP (Always Rendered Behind) */}
            <div className="flex h-screen overflow-hidden animate-fade-in-up">
                {/* Sidebar (Desktop) */}
                <Sidebar activeTab={activeTab} setTab={setActiveTab} />

                {/* Content Area */}
                <div className="flex-1 md:ml-64 relative z-10 h-full overflow-y-auto bg-[#121212]/50">
                    {activeTab === 'home' && <HomePage DATA={DATA} />}
                    {activeTab === 'event' && <EventPage events={data.content.events} />}
                    {activeTab === 'couple' && <CouplePage couple={data.content.couples} cover={DATA.cover} />}
                    {activeTab === 'gallery' && <GalleryPage images={data.content.gallery.images} />}
                    {activeTab === 'gift' && <GiftPage gifts={data.engagement.gifts} />}
                    {activeTab === 'rsvp' && <RSVPPage rsvp={data.engagement.rsvp} />}
                </div>

                {/* Player Bar (Sticky) */}
                <PlayerBar
                    activeTab={activeTab}
                    setTab={setActiveTab}
                    isPlaying={isPlaying}
                    togglePlay={toggleMusic}
                    cover={DATA.cover}
                    title="Perfect Two"
                    artist={`${DATA.couple.groom} & ${DATA.couple.bride}`}
                />
            </div>
        </div>
    );
};

export default SpotiLove;