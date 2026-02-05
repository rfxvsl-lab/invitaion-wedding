
import React, { useState, useEffect, useRef } from 'react';
import {
    Heart, Calendar, MapPin, Music, Play, Pause,
    Home, User, Image as ImageIcon, Gift, MessageCircle,
    Copy, Check, ChevronDown, CreditCard, Send, Clock
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { mapToTemplateData } from '../utils/templateMapper';
import RsvpForm from '../components/RsvpForm';

const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Nunito+Sans:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

    /* Variables */
    :root {
      --primary: #be185d; /* Pink Rose 700 */
      --secondary: #fbcfe8; /* Pink 200 */
      --bg-cream: #fff1f2; /* Rose 50 */
      --gold: #d4af37;
    }

    body {
      font-family: 'Nunito Sans', sans-serif;
      background-color: var(--bg-cream);
      color: #4a4a4a;
      overflow-x: hidden;
    }

    h1, h2, h3 { font-family: 'Playfair Display', serif; }
    .font-script { font-family: 'Great Vibes', cursive; }

    /* --- ENVELOPE ANIMATIONS (PURE CSS) --- */
    .envelope-wrapper {
      perspective: 1000px;
    }
    
    .envelope {
      transform-style: preserve-3d;
      transition: transform 1s ease-in-out;
    }

    /* Flap Animation */
    .flap {
      transform-origin: top;
      transition: transform 0.8s 0.2s ease-in-out, z-index 0.8s 0.2s;
    }
    
    .envelope.open .flap {
      transform: rotateX(180deg);
      z-index: 0;
    }

    /* Card Slide Up */
    .invitation-card {
      transition: transform 1s 1s ease-in-out;
    }
    
    .envelope.open .invitation-card {
      transform: translateY(-150px);
      z-index: 50;
    }

    /* Container Fade Out */
    .envelope-container.fade-out {
      opacity: 0;
      pointer-events: none;
      transform: translateY(100vh);
      transition: all 1s 2s ease-in-out;
    }

    /* --- PAGE TRANSITIONS --- */
    .page-enter {
      animation: fadeIn 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Floating Hearts Background */
    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      50% { opacity: 0.6; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }

    .heart-bg {
      position: fixed;
      bottom: -10vh;
      color: #fbcfe8;
      animation: float 15s linear infinite;
      z-index: -1;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 10px 30px rgba(190, 24, 93, 0.1);
    }
  `}</style>
);


interface EnvelopeProps {
    onOpen: () => void;
    groomName: string;
    brideName: string;
}

const EnvelopeOverlay: React.FC<EnvelopeProps> = ({ onOpen, groomName, brideName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(onOpen, 3500); // Wait for full animation sequence
    };

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#ffe4e6] envelope-container ${isOpen ? 'fade-out' : ''}`}>
            <div className="relative w-[320px] h-[220px] envelope-wrapper">
                <div className={`relative w-full h-full envelope ${isOpen ? 'open' : ''}`}>

                    {/* Back of Envelope */}
                    <div className="absolute inset-0 bg-rose-700 rounded-b-xl shadow-2xl"></div>

                    {/* Invitation Card Inside */}
                    <div className="absolute top-2 left-2 right-2 h-[90%] bg-white rounded flex flex-col items-center justify-center p-4 shadow-md invitation-card z-10">
                        <h2 className="font-script text-3xl text-rose-600">Undangan Kita</h2>
                        <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">Wedding Invitation</p>
                        <Heart size={16} className="mt-4 text-rose-400 fill-rose-100" />
                    </div>

                    {/* Front Pockets (Left & Right) */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-rose-600 rounded-bl-xl" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-rose-500 rounded-br-xl" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}></div>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-rose-600 rounded-b-xl" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>
                    </div>

                    {/* Flap (Top) */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-800 z-30 flap flex items-center justify-center rounded-t-xl origin-top" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
                        {/* Logo SCC SVG */}
                        {!isOpen && (
                            <button onClick={handleOpen} className="absolute top-8 z-50 group">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-rose-200 group-hover:scale-110 transition-transform">
                                    {/* Simple SCC Logo (Heart in Envelope) */}
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                        <path d="M12 13 L12 16" />
                                        <path d="M12 17 A 1 1 0 0 1 12 17" fill="#be185d" />
                                    </svg>
                                </div>
                                <span className="block text-center text-white text-xs font-bold mt-2 animate-pulse">BUKA</span>
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {!isOpen && (
                <div className="absolute bottom-20 text-center">
                    <h1 className="font-script text-4xl text-rose-600 mb-2">{groomName} & {brideName}</h1>
                    <p className="text-rose-800 text-sm tracking-widest">SPECIAL INVITATION</p>
                </div>
            )}
        </div>
    );
};

// 2. Navigation Bar
interface NavbarProps {
    activeTab: string;
    setTab: (tab: string) => void;
    data: InvitationData;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setTab, data }) => {
    const items = [
        { id: 'home', icon: Home, label: 'Home', visible: true },
        { id: 'couple', icon: User, label: 'Couple', visible: true },
        { id: 'event', icon: Calendar, label: 'Event', visible: (data.content.events.akad?.enabled !== false || data.content.events.resepsi?.enabled !== false) },
        { id: 'gallery', icon: ImageIcon, label: 'Gallery', visible: true },
        { id: 'gift', icon: Gift, label: 'Gift', visible: (data.engagement.gifts && data.engagement.gifts.length > 0) },
        { id: 'rsvp', icon: MessageCircle, label: 'RSVP', visible: !!data.engagement.rsvp },
    ].filter(item => item.visible);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-rose-100 z-40 px-2 py-3 pb-6 md:pb-3 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="max-w-md mx-auto flex justify-between items-center px-4">
                {items.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setTab(tab.id)}
                        className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 rounded-lg ${activeTab === tab.id ? 'text-rose-600 -translate-y-2' : 'text-gray-400 hover:text-rose-400'}`}
                    >
                        <tab.icon size={activeTab === tab.id ? 24 : 20} className={activeTab === tab.id ? 'fill-rose-100' : ''} />
                        <span className="text-[10px] font-semibold">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- HALAMAN KONTEN ---

const Countdown = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(targetDate);
        const timer = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();
            if (diff <= 0) return clearInterval(timer);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const Box = ({ val, label }: { val: number, label: string }) => (
        <div className="bg-rose-600 text-white rounded-lg p-3 w-16 text-center shadow-lg">
            <div className="text-xl font-bold">{val}</div>
            <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
        </div>
    );

    return (
        <div className="flex gap-3 justify-center my-8">
            <Box val={timeLeft.days} label="Hari" />
            <Box val={timeLeft.hours} label="Jam" />
            <Box val={timeLeft.minutes} label="Menit" />
            <Box val={timeLeft.seconds} label="Detik" />
        </div>
    );
};

const HomePage = ({ data, guestName }: { data: InvitationData, guestName: string }) => {
    const invitation = mapToTemplateData(data);
    if (!invitation) return null;
    const dateObj = new Date(data.content.hero.date);
    const dateStr = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="text-center pt-10 pb-24 px-6 page-enter">
            <div className="mb-6 animate-bounce text-rose-500"><ChevronDown className="mx-auto" /></div>
            <h3 className="text-rose-800 tracking-[0.2em] text-sm uppercase mb-4">The Wedding Of</h3>
            <h1 className="font-script text-7xl text-rose-600 mb-2 leading-tight">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</h1>
            <p className="text-gray-500 italic mb-8">{dateStr}</p>

            <div className="my-10">
                <div className="w-48 h-64 mx-auto rounded-t-full border-4 border-rose-200 p-2 overflow-hidden shadow-xl bg-white">
                    <img src={invitation.hero.main_image_url || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80"} alt="Couple" className="w-full h-full object-cover rounded-t-full hover:scale-110 transition-transform duration-700" />
                </div>
            </div>

            <Countdown targetDate={data.content.hero.date} />

            <div className="text-center mt-8">
                <p className="font-body text-xs uppercase tracking-widest text-[#888] mb-2">Kepada Yth,</p>
                <div className="inline-block bg-rose-50 px-6 py-2 rounded-full border border-rose-100">
                    <p className="font-bold text-rose-700 text-lg">{guestName}</p>
                </div>
            </div>

            {data.content.quote?.content && (
                <div className="glass-panel p-8 rounded-2xl mx-auto max-w-sm mt-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-rose-500 to-rose-200"></div>
                    <p className="font-serif text-lg leading-relaxed text-gray-700 italic">
                        "{data.content.quote.content}"
                    </p>
                    <p className="mt-4 text-xs font-bold text-rose-600 uppercase tracking-widest">{data.content.quote.source}</p>
                </div>
            )}
        </div>
    );
};

const CouplePage = ({ data }: { data: InvitationData }) => {
    const { pria, wanita } = data.content.couples;
    return (
        <div className="pt-10 pb-24 px-6 text-center page-enter">
            <h2 className="font-script text-5xl text-rose-600 mb-12">Mempelai</h2>

            {/* Groom */}
            <div className="glass-panel p-6 rounded-2xl mb-8 transform hover:scale-[1.02] transition-transform">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-rose-100 overflow-hidden mb-4 shadow-md">
                    <img src={pria.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{pria.name}</h3>
                <p className="text-rose-600 text-sm font-semibold mt-1">Putra dari {pria.parents}</p>
            </div>

            <div className="font-script text-4xl text-rose-400 my-8">&</div>

            {/* Bride */}
            <div className="glass-panel p-6 rounded-2xl transform hover:scale-[1.02] transition-transform">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-rose-100 overflow-hidden mb-4 shadow-md">
                    <img src={wanita.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{wanita.name}</h3>
                <p className="text-rose-600 text-sm font-semibold mt-1">Putri dari {wanita.parents}</p>
            </div>
        </div>
    );
};

const EventPage = ({ data }: { data: InvitationData }) => {
    const { akad, resepsi } = data.content.events;
    return (
        <div className="pt-10 pb-24 px-6 text-center page-enter">
            <h2 className="font-script text-5xl text-rose-600 mb-12">Rangkaian Acara</h2>

            <div className="relative border-l-2 border-rose-200 ml-4 md:ml-auto md:mr-auto md:w-full md:max-w-md space-y-12">

                {/* Akad */}
                {akad.enabled !== false && (
                    <div className="relative pl-8 text-left">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-rose-600 rounded-full border-4 border-white shadow"></div>
                        <h3 className="text-2xl font-serif text-gray-800 mb-2">{data.content.texts.akad_title || 'Akad Nikah'}</h3>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-50">
                            <div className="flex items-center gap-3 text-gray-600 mb-2">
                                <Calendar size={18} className="text-rose-500" /> <span>{akad.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 mb-2">
                                <Clock size={18} className="text-rose-500" /> <span>{akad.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 border-t pt-4 font-bold">{akad.venue}</p>
                            {akad.map_url && <a href={akad.map_url} target="_blank" className="text-xs text-rose-600 mt-2 block hover:underline">Lihat Lokasi</a>}
                        </div>
                    </div>
                )}

                {/* Resepsi */}
                {resepsi.enabled !== false && (
                    <div className="relative pl-8 text-left">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-rose-600 rounded-full border-4 border-white shadow"></div>
                        <h3 className="text-2xl font-serif text-gray-800 mb-2">{data.content.texts.resepsi_title || 'Resepsi'}</h3>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-50">
                            <div className="flex items-center gap-3 text-gray-600 mb-2">
                                <Calendar size={18} className="text-rose-500" /> <span>{resepsi.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 mb-2">
                                <Clock size={18} className="text-rose-500" /> <span>{resepsi.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 border-t pt-4 font-bold">{resepsi.venue}</p>
                            {resepsi.map_url && <a href={resepsi.map_url} target="_blank" className="text-xs text-rose-600 mt-2 block hover:underline">Lihat Lokasi</a>}
                        </div>
                    </div>
                )}
            </div>

            <a href={resepsi.map_url || '#'} target="_blank" className="mt-12 bg-rose-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-rose-600/30 hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 mx-auto w-full max-w-xs">
                <MapPin size={18} /> Lihat Lokasi (Maps)
            </a>
        </div>
    );
};

const GalleryPage = ({ data }: { data: InvitationData }) => (
    <div className="pt-10 pb-24 px-4 page-enter">
        <h2 className="font-script text-5xl text-rose-600 mb-8 text-center">Galeri Foto</h2>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {[...(data.content.gallery?.images || []), ...Array(6)].slice(0, 6).map((img, i) => (
                <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-md group relative">
                    <img
                        src={img || `https://source.unsplash.com/random/600x${i % 2 === 0 ? '800' : '600'}?wedding,love&sig=${i}`}
                        alt="Gallery"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>
    </div>
);

const GiftPage = ({ data }: { data: InvitationData }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="pt-10 pb-24 px-6 page-enter max-w-lg mx-auto">
            <h2 className="font-script text-5xl text-rose-600 mb-4 text-center">{data.content.texts.gift_title || 'Wedding Gift'}</h2>
            <p className="text-center text-gray-500 mb-8 text-sm">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.</p>

            <div className="space-y-6">
                {data.engagement.gifts?.map((gift, i) => (
                    <div key={i} className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><CreditCard size={64} /></div>
                        <div className="flex justify-between items-start mb-8">
                            <span className="font-bold tracking-widest">DEBIT CARD</span>
                            <span className="font-bold italic uppercase">{gift.bank}</span>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-400 mb-1">Nomor Rekening</p>
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xl md:text-2xl tracking-wider">{gift.acc_number}</span>
                                <button onClick={() => handleCopy(gift.acc_number)} className="text-rose-400 hover:text-white">
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-gray-400">CARD HOLDER</p>
                                <p className="text-sm font-bold tracking-wider uppercase">{gift.holder}</p>
                            </div>
                            <div className="w-10 h-6 bg-yellow-500/80 rounded flex gap-1 items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-300/50"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!data.engagement.gifts || data.engagement.gifts.length === 0) && <p className="text-center text-gray-400 italic">Tidak ada informasi rekening.</p>}
        </div>
    );
};

const RSVPPage = ({ data }: { data: InvitationData }) => (
    <div className="pt-10 pb-24 px-6 page-enter max-w-lg mx-auto text-center">
        <h2 className="font-script text-5xl text-rose-600 mb-8">R.S.V.P</h2>
        <div className="glass-panel p-8 rounded-2xl shadow-lg border-t-4 border-rose-500">
            <p className="text-gray-600 mb-6 text-sm">Mohon konfirmasi kehadiran Anda.</p>
            <RsvpForm
                whatsappNumber={data.engagement.rsvp_settings.whatsapp_number}
                messageTemplate={data.engagement.rsvp_settings.message_template}
                themeColor="#be185d"
            />
        </div>
    </div>
);

/**
 * --- MAIN APP ---
 */
const LuxuryPink: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = "Tamu Undangan" }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Background Hearts
    const hearts = Array.from({ length: 15 }).map((_, i) => (
        <div
            key={i}
            className="heart-bg"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
            }}
        >
            <Heart fill="currentColor" />
        </div>
    ));

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const startExperience = () => {
        setIsOpened(true);
        setIsPlaying(true);
        if (audioRef.current) audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    };

    const invitation = mapToTemplateData(data);
    if (!invitation) return null;

    return (
        <div className="min-h-screen relative">
            <GlobalStyles />

            {/* Background Music */}
            <audio ref={audioRef} loop src={data.metadata.music_url || "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"} />

            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {hearts}
            </div>

            {/* Amplop Pembuka */}
            {!isOpened && (
                <EnvelopeOverlay
                    onOpen={startExperience}
                    groomName={invitation.hero.groom_nickname}
                    brideName={invitation.hero.bride_nickname}
                />
            )}

            {/* Main Content Area */}
            {isOpened && (
                <>
                    <main className="w-full max-w-2xl mx-auto min-h-screen relative z-10">
                        {activeTab === 'home' && <HomePage data={data} guestName={guestName} />}
                        {activeTab === 'couple' && <CouplePage data={data} />}
                        {activeTab === 'event' && <EventPage data={data} />}
                        {activeTab === 'gallery' && <GalleryPage data={data} />}
                        {activeTab === 'gift' && <GiftPage data={data} />}
                        {activeTab === 'rsvp' && <RSVPPage data={data} />}
                    </main>

                    {/* Floating Controls */}
                    <Navbar activeTab={activeTab} setTab={setActiveTab} data={data} />

                    <button
                        onClick={toggleMusic}
                        className="fixed top-4 right-4 z-50 bg-rose-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-[spin_4s_linear_infinite]"
                        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                    >
                        {isPlaying ? <Music size={20} /> : <Pause size={20} />}
                    </button>
                </>
            )}
        </div>
    );
}

export default LuxuryPink;
