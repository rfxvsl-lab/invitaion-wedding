import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    MapPin, Calendar, Music, Play, Pause,
    Home, User, Image as ImageIcon, MessageCircle,
    Copy, Gift
} from 'lucide-react';
import { InvitationData } from '../types/invitation';

/**
 * --- ASSETS & CONFIG ---
 */
const ASSETS = {
    gunungan: '/assets/luxury-javanese/gunungan.png',
    ornamentTop: '/assets/luxury-javanese/ornament-top.png',
    ornamentCorner: '/assets/luxury-javanese/ornament-corner.png',
    dividerLeaves: '/assets/luxury-javanese/divider-leaves.png',
    flowerHeader: '/assets/luxury-javanese/flower-header.png',
    batikPattern: "https://www.transparenttextures.com/patterns/batik-embossed.png",
    noiseTexture: "https://www.transparenttextures.com/patterns/stardust.png",
    bgm: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
};

/**
 * --- UTILS ---
 */
const mapToTemplateData = (data: InvitationData) => {
    if (!data || !data.content) return null;

    // Polyfill for groom/bride nicknames if missing
    const hero = { ...data.content.hero };
    if (!hero.groom_nickname || !hero.bride_nickname) {
        // Fallback: Try splitting 'nicknames' string
        const parts = (hero.nicknames || "").split(/&|and|dan/i);
        hero.groom_nickname = hero.groom_nickname || parts[0]?.trim() || "Groom";
        hero.bride_nickname = hero.bride_nickname || parts[1]?.trim() || "Bride";
    }

    return {
        hero,
        couples: data.content.couples,
        events: data.content.events,
        texts: data.content.texts,
        gallery: data.content.gallery
    };
};

/**
 * --- DEFAULT DATA (FALLBACK) ---
 */
const DEFAULT_DATA: InvitationData = {
    metadata: {
        slug: 'demo-luxury-javanese',
        theme_id: 'luxury-javanese',
        is_active: true,
        music_url: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
        custom_bg_url: ""
    },
    content: {
        hero: {
            nicknames: "Rizky & Anisa",
            groom_nickname: "Rizky",
            bride_nickname: "Anisa",
            date: "Sabtu, 24 Agustus 2025",
            main_image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80"
        },
        couples: {
            pria: { name: "Rizky Pratama", parents: "Ahmad & Siti", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", ig: "rizky" },
            wanita: { name: "Anisa Wijaya", parents: "Budi & Rina", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80", ig: "anisa" }
        },
        events: {
            akad: { enabled: true, date: "Sabtu, 24 Agustus 2025", time: "08:00 WIB", venue: "Masjid Agung", address: "Jl. Masjid Raya No. 1", map_url: "#" },
            resepsi: { enabled: true, date: "Sabtu, 24 Agustus 2025", time: "11:00 WIB", venue: "Grand Ballroom", address: "Jl. Sudirman No. 1", map_url: "#" }
        },
        texts: {
            open_button: "Buka Undangan",
            hero_title: "The Wedding Of",
            hero_subtitle: "We Are Getting Married",
            couple_title: "Mempelai",
            events_title: "Rangkaian Acara",
            akad_title: "Akad Nikah",
            resepsi_title: "Resepsi Pernikahan",
            gallery_title: "Galeri Foto",
            gift_title: "Wedding Gift",
            gift_text: "Tanpa mengurangi rasa hormat...",
            footer_text: "Thank you"
        },
        gallery: {
            images: [
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
                "https://images.unsplash.com/photo-1511285560982-1356c11d4606?w=600&q=80"
            ],
            video_url: ""
        },
        quote: { content: "", source: "" }
    },
    engagement: {
        gifts: [
            { bank: "BCA", acc_number: "1234567890", holder: "Rizky Pratama" }
        ],
        rsvp_settings: {
            whatsapp_number: "628123456789",
            message_template: "Halo, saya {name} akan {attendance}. {message}"
        },
        rsvp: true,
        wishes: []
    }
};

/**
 * --- GLOBAL STYLES ---
 */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400&display=swap');

    .font-javanese-display { font-family: 'Cinzel Decorative', cursive; }
    .font-royal-serif { font-family: 'Playfair Display', serif; }
    .font-modern-sans { font-family: 'Lato', sans-serif; }

    :root {
        --royal-brown: #1a120b;
        --deep-wood: #2a1f16;
        --gold-light: #fcf6ba;
        --gold-main: #d4af37;
        --gold-dark: #aa771c;
    }

    .text-gold-luxury {
        background: linear-gradient(to bottom, #fcf6ba 0%, #d4af37 40%, #aa771c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }

    .border-gold-luxury {
        border-image: linear-gradient(to bottom, #fcf6ba, #d4af37, #aa771c) 1;
    }

    .glass-javanese {
        background: rgba(30, 20, 10, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(212, 175, 55, 0.2);
        box-shadow: 
            0 20px 50px rgba(0,0,0,0.5),
            inset 0 0 20px rgba(0,0,0,0.5);
    }

    @keyframes float-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
    }
    @keyframes shine {
        0% { background-position: -200%; }
        100% { background-position: 200%; }
    }
    @keyframes pulse-glow {
        0%, 100% { filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.3)); transform: scale(1); }
        50% { filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.6)); transform: scale(1.02); }
    }
    @keyframes reveal-up {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .animate-float { animation: float-slow 8s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-reveal { animation: reveal-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    .animate-spin-mandala { animation: spin-slow 30s linear infinite; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .gold-shimmer {
        background: linear-gradient(to right, #aa771c 0%, #fcf6ba 50%, #aa771c 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 5s linear infinite;
    }
    `}</style>
);

/**
 * --- BACKGROUND COMPONENT ---
 */
const GoldDustBackground = ({ customBg }: { customBg?: string }) => {
    const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
    })), []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#120c08]">
            {customBg ? (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${customBg})` }}>
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            ) : (
                <>
                    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${ASSETS.batikPattern})` }}></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80"></div>
                </>
            )}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-[#D4AF37] opacity-60 blur-[1px]"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animation: `float-slow ${p.duration}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

/**
 * --- INTERNAL COMPONENT: RSVP FORM ---
 */
const RsvpForm = ({ whatsappNumber, messageTemplate, themeColor }: { whatsappNumber: string, messageTemplate: string, themeColor: string }) => {
    const [name, setName] = useState('');
    const [attendance, setAttendance] = useState('Hadir');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = messageTemplate
            .replace('{name}', name)
            .replace('{attendance}', attendance)
            .replace('{message}', message);

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <div className="flex flex-col text-left">
                <label className="text-xs font-bold mb-1 opacity-70" style={{ color: themeColor }}>NAMA</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-b border-opacity-50 p-2 outline-none focus:border-opacity-100 transition-colors"
                    style={{ borderColor: themeColor, color: '#F5E6CA' }}
                    placeholder="Nama Lengkap"
                    required
                />
            </div>

            <div className="flex flex-col text-left">
                <label className="text-xs font-bold mb-1 opacity-70" style={{ color: themeColor }}>KEHADIRAN</label>
                <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="bg-transparent border-b border-opacity-50 p-2 outline-none focus:border-opacity-100 transition-colors"
                    style={{ borderColor: themeColor, color: '#F5E6CA' }}
                >
                    <option value="Hadir" className="text-black">Hadir</option>
                    <option value="Tidak Hadir" className="text-black">Tidak Hadir</option>
                    <option value="Ragu-ragu" className="text-black">Ragu-ragu</option>
                </select>
            </div>

            <div className="flex flex-col text-left">
                <label className="text-xs font-bold mb-1 opacity-70" style={{ color: themeColor }}>UCAPAN</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-transparent border-b border-opacity-50 p-2 outline-none focus:border-opacity-100 transition-colors resize-none h-24"
                    style={{ borderColor: themeColor, color: '#F5E6CA' }}
                    placeholder="Tulis ucapan..."
                />
            </div>

            <button
                type="submit"
                className="mt-4 px-6 py-3 font-bold tracking-widest text-xs rounded transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: themeColor, color: '#1a120b' }}
            >
                KIRIM KONFIRMASI (WA)
            </button>
        </form>
    );
};

/**
 * --- OPENING GUARD ---
 */
const OpeningGuard = ({ onOpen, data }: { onOpen: () => void, data: InvitationData }) => {
    const [isOpening, setIsOpening] = useState(false);
    const invitation = mapToTemplateData(data);

    // Safety check inside component
    if (!invitation) return null;

    const handleEnter = () => {
        setIsOpening(true);
        setTimeout(onOpen, 1500);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1a120b] transition-all duration-1000 ease-in-out ${isOpening ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${ASSETS.batikPattern})` }}></div>

            <div className="relative z-10 flex flex-col items-center p-8 text-center max-w-md w-full">
                <div className="relative w-64 h-auto mb-10 cursor-pointer group" onClick={handleEnter}>
                    <div className="absolute inset-0 bg-[#D4AF37] blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full animate-pulse-glow"></div>
                    <img
                        src={ASSETS.gunungan}
                        alt="Gunungan"
                        className="relative z-10 w-full h-full drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <button className="absolute bottom-10 px-8 py-2 bg-gradient-to-r from-[#8B6E4E] to-[#D4AF37] text-[#1a120b] font-royal-serif font-bold tracking-[0.2em] text-xs rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform pointer-events-auto">
                            BUKA UNDANGAN
                        </button>
                    </div>
                </div>

                <div className={`transition-all duration-1000 ${isOpening ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <h3 className="font-javanese-display text-2xl text-[#D4AF37] mb-2 tracking-wide">Pawiwahan Ageng</h3>
                    <h1 className="font-royal-serif text-4xl text-[#F5E6CA] mb-6 leading-tight">
                        {invitation.hero.groom_nickname} <span className="text-[#D4AF37] font-javanese-display">&</span> {invitation.hero.bride_nickname}
                    </h1>

                    <div className="border-t border-b border-[#D4AF37]/30 py-3 w-full">
                        <p className="font-modern-sans text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-1">Kepada Yth.</p>
                        <p className="font-royal-serif text-white text-lg">Tamu Undangan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * --- PAGE COMPONENTS ---
 */

const HomePage = ({ onEnter, data }: { onEnter: () => void, data: InvitationData }) => {
    const invitation = mapToTemplateData(data);
    if (!invitation) return null;

    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 relative animate-reveal overflow-y-auto">
            <img src={ASSETS.ornamentTop} className="w-48 md:w-64 opacity-80 mb-4 md:mb-6 drop-shadow-lg" />

            <div className="relative mb-8 group cursor-pointer" onClick={onEnter}>
                <div className="absolute inset-0 border-[1px] border-[#D4AF37]/30 rounded-full scale-125 animate-spin-mandala border-dashed"></div>
                <div className="absolute inset-0 border-[1px] border-[#D4AF37]/50 rounded-full scale-110"></div>

                <div className="w-56 h-56 rounded-full border-4 border-[#1a120b] outline outline-2 outline-[#D4AF37] overflow-hidden relative z-10 shadow-2xl">
                    <img src={data.content.hero.main_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 sepia-[0.3]" />
                </div>
            </div>

            <h1 className="font-javanese-display text-4xl md:text-6xl text-gold-luxury mb-4 leading-normal p-2">
                {invitation.hero.groom_nickname} <span className="font-serif italic text-2xl md:text-4xl text-[#D4AF37]">&</span> {invitation.hero.bride_nickname}
            </h1>

            <div className="flex items-center gap-4 mb-10 opacity-90">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                <p className="font-modern-sans text-[#F5E6CA] text-xs tracking-[0.3em] uppercase">{data.content.hero.date}</p>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>

            <div className="animate-bounce">
                <p className="font-modern-sans text-[#D4AF37]/60 text-[10px] tracking-widest uppercase">Scroll ke Bawah</p>
            </div>
        </div>
    );
};

const CouplePage = ({ data }: { data: InvitationData }) => {
    const { pria, wanita } = data.content.couples;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CoupleCard = ({ info, role, align }: { info: any, role: string, align: 'left' | 'right' }) => (
        <div className={`flex flex-col ${align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 mb-12 w-full`}>
            <div className="relative shrink-0">
                <div className="w-40 h-56 rounded-[100px] border border-[#D4AF37] p-2 relative">
                    <div className="absolute inset-0 bg-[#D4AF37] opacity-10 rounded-[100px] blur-md"></div>
                    <img src={info.photo} className="w-full h-full object-cover rounded-[90px] grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <img src={ASSETS.flowerHeader} className={`absolute -bottom-4 ${align === 'left' ? '-right-4' : '-left-4'} w-24 drop-shadow-lg`} />
            </div>

            <div className={`text-center ${align === 'left' ? 'md:text-left' : 'md:text-right'} flex-1`}>
                <h3 className="font-javanese-display text-4xl text-gold-luxury mb-2">{info.name}</h3>
                <p className="font-royal-serif text-[#F5E6CA] text-sm mb-4">Putra/i {role} dari Bpk. {info.parents}</p>
                <a
                    href={`https://instagram.com/${info.ig}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#D4AF37] border-b border-[#D4AF37] pb-1 hover:text-white transition-colors"
                >
                    @{info.ig}
                </a>
            </div>
        </div>
    );

    return (
        <div className="min-h-full p-6 pt-10 pb-24 animate-reveal">
            <div className="text-center mb-12">
                <h2 className="font-javanese-display text-3xl text-[#F5E6CA]">Mempelai</h2>
                <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-2 rounded-full"></div>
            </div>

            <CoupleCard info={pria} role="Pertama" align="left" />
            <div className="text-center font-javanese-display text-4xl text-[#D4AF37]/50 my-4">&</div>
            <CoupleCard info={wanita} role="Kedua" align="right" />
        </div>
    );
};

const EventPage = ({ data }: { data: InvitationData }) => {
    const { akad, resepsi } = data.content.events;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const EventCard = ({ title, date, time, venue, address, mapUrl }: any) => (
        <div className="relative bg-[#1a120b]/80 border border-[#D4AF37]/30 p-8 rounded-xl text-center overflow-hidden group hover:border-[#D4AF37]/60 transition-all duration-500">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${ASSETS.batikPattern})` }}></div>

            <img src={ASSETS.ornamentCorner} className="absolute top-0 left-0 w-16 opacity-40 group-hover:opacity-80 transition-opacity" />
            <img src={ASSETS.ornamentCorner} className="absolute top-0 right-0 w-16 opacity-40 transform scale-x-[-1] group-hover:opacity-80 transition-opacity" />

            <h3 className="font-javanese-display text-3xl gold-shimmer mb-4 relative z-10">{title}</h3>

            <div className="font-royal-serif text-white text-lg mb-2 relative z-10">{date}</div>
            <div className="font-modern-sans text-[#D4AF37] text-sm tracking-widest mb-6 relative z-10">{time}</div>

            <div className="space-y-2 mb-8 relative z-10">
                <div className="flex items-center justify-center gap-2 text-[#F5E6CA]">
                    <MapPin size={16} className="text-[#D4AF37]" />
                    <span className="font-bold text-sm">{venue}</span>
                </div>
                <p className="text-xs text-[#F5E6CA]/70 px-4 leading-relaxed">{address}</p>
            </div>

            <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-block px-8 py-3 bg-[#D4AF37] text-[#1a120b] font-bold text-xs tracking-widest rounded-sm hover:bg-white transition-colors shadow-lg"
            >
                LIHAT LOKASI
            </a>
        </div>
    );

    return (
        <div className="min-h-full p-6 pt-10 pb-24 animate-reveal">
            <div className="text-center mb-10">
                <h2 className="font-royal-serif text-2xl text-[#F5E6CA] italic">Rangkaian Acara</h2>
                <p className="text-[#D4AF37] text-xs mt-2 uppercase tracking-widest">Insya Allah akan diselenggarakan pada:</p>
            </div>

            <div className="space-y-8">
                {akad.enabled !== false && (
                    <EventCard
                        title={data.content.texts.akad_title || "Akad Nikah"}
                        {...akad}
                    />
                )}
                {resepsi.enabled !== false && (
                    <EventCard
                        title={data.content.texts.resepsi_title || "Resepsi"}
                        {...resepsi}
                    />
                )}
            </div>
        </div>
    );
};

const GalleryPage = ({ data }: { data: InvitationData }) => (
    <div className="min-h-full p-6 pt-10 pb-24 animate-reveal">
        <h2 className="text-center font-javanese-display text-4xl text-gold-luxury mb-8">Galeri</h2>

        <div className="columns-2 gap-4 space-y-4">
            {(data.content.gallery?.images || []).map((img, i) => (
                <div key={i} className="break-inside-avoid relative group rounded-lg overflow-hidden border border-[#D4AF37]/20">
                    <img
                        src={img}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 sepia-[0.1]"
                        alt={`Gallery ${i}`}
                    />
                    <div className="absolute inset-0 bg-[#1a120b]/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>

        {data.content.gallery.video_url && (
            <div className="mt-10 p-2 border border-[#D4AF37]/40 rounded-xl bg-[#1a120b]/50">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                    <iframe src={`${data.content.gallery.video_url}${data.content.gallery.video_url.includes('?') ? '&' : '?'}controls=0&rel=0&modestbranding=1`} className="w-full h-full" allowFullScreen></iframe>
                </div>
            </div>
        )}
    </div>
);

const GiftPage = ({ data }: { data: InvitationData }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Nomor rekening berhasil disalin!');
    };

    return (
        <div className="h-full flex flex-col justify-center p-6 pt-10 pb-24 text-center animate-reveal">
            <Gift className="mx-auto text-[#D4AF37] mb-4" size={40} strokeWidth={1} />
            <h2 className="font-javanese-display text-3xl text-[#F5E6CA] mb-4">Tanda Kasih</h2>
            <p className="font-body text-xs text-[#F5E6CA]/70 mb-8 leading-relaxed px-4">
                Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:
            </p>

            <div className="space-y-6">
                {(data.engagement.gifts || []).map((gift: any, idx: number) => (
                    <div key={idx} className="bg-[#1a120b]/80 border border-[#D4AF37]/40 p-6 rounded-lg relative overflow-hidden group hover:bg-[#2a1f16] transition-colors">
                        <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-xl group-hover:bg-[#D4AF37]/20 transition-all"></div>

                        <h3 className="font-royal-serif text-xl text-white mb-1 uppercase tracking-widest">{gift.bank}</h3>
                        <p className="font-mono text-[#D4AF37] text-lg mb-2">{gift.acc_number}</p>
                        <p className="font-modern-sans text-xs text-gray-400 mb-4">a.n {gift.holder}</p>

                        <button
                            onClick={() => handleCopy(gift.acc_number)}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#F5E6CA] border border-[#F5E6CA]/30 px-4 py-2 rounded hover:bg-[#F5E6CA] hover:text-[#1a120b] transition-all"
                        >
                            <Copy size={12} /> SALIN NO. REKENING
                        </button>
                    </div>
                ))}
            </div>

            {data.engagement.qris_url && (
                <div className="mt-8 bg-[#1a120b]/80 border border-[#D4AF37]/40 p-6 rounded-lg relative overflow-hidden group hover:bg-[#2a1f16] transition-colors max-w-xs mx-auto">
                    <h3 className="font-royal-serif text-xl text-white mb-4 uppercase tracking-widest">QRIS</h3>
                    <div className="w-40 h-40 mx-auto bg-white p-2 mb-4 rounded">
                        <img src={data.engagement.qris_url} alt="QRIS" className="w-full h-full object-contain" />
                    </div>
                    <a
                        href={data.engagement.qris_url}
                        download="qris-javanese.png"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#F5E6CA] border border-[#F5E6CA]/30 px-6 py-2 rounded hover:bg-[#F5E6CA] hover:text-[#1a120b] transition-all"
                    >
                        <Gift size={12} /> UNDUH QR
                    </a>
                </div>
            )}
        </div>
    );
};

// --- NAVIGATION BAR ---
const NavBar = ({ activeTab, setTab, rsvpEnabled }: { activeTab: string, setTab: (t: string) => void, rsvpEnabled: boolean }) => {
    const items = [
        { id: 'home', icon: Home, label: 'Beranda' },
        { id: 'couple', icon: User, label: 'Mempelai' },
        { id: 'event', icon: Calendar, label: 'Acara' },
        { id: 'gallery', icon: ImageIcon, label: 'Galeri' },
        { id: 'gift', icon: Gift, label: 'Gift' },
        { id: 'rsvp', icon: MessageCircle, label: 'Ucapan' },
    ].filter(item => item.id !== 'rsvp' || rsvpEnabled);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <div className="glass-javanese rounded-full px-2 py-3 flex justify-around items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-[#D4AF37]/40">
                {items.map(item => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${isActive ? '-translate-y-4' : 'hover:bg-[#D4AF37]/10'}`}
                        >
                            <div className={`p-2 rounded-full transition-all ${isActive ? 'bg-[#D4AF37] text-[#1a120b] shadow-[0_0_15px_#D4AF37]' : 'text-[#8B6E4E]'}`}>
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                            </div>
                            {isActive && <span className="absolute -bottom-4 text-[9px] font-bold text-[#D4AF37] tracking-widest">{item.label}</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

/**
 * --- MAIN COMPONENT ---
 */
const LuxuryJavanese: React.FC<{ data?: InvitationData }> = ({ data }) => {
    const [stage, setStage] = useState<'opening' | 'main'>('opening');
    const [activeTab, setActiveTab] = useState('home');
    const [musicPlaying, setMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Merge provided data with default data to avoid undefined errors
    const safeData = data || DEFAULT_DATA;

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (musicPlaying) audioRef.current.pause();
        else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setMusicPlaying(!musicPlaying);
    };

    const handleEnter = () => {
        setStage('main');
        if (audioRef.current) {
            audioRef.current.play().catch(() => { });
            setMusicPlaying(true);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#1a120b] text-[#F5E6CA]">
            <GlobalStyles />
            <GoldDustBackground customBg={safeData.metadata.custom_bg_url} />
            <audio ref={audioRef} loop src={safeData.metadata.music_url || ASSETS.bgm} />

            {/* STAGE 1: OPENING */}
            {stage === 'opening' && (
                <OpeningGuard onOpen={handleEnter} data={safeData} />
            )}

            {/* STAGE 2: MAIN CONTENT */}
            <div className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-1000 ${stage === 'main' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

                {/* DESKTOP/MOBILE CONTAINER STABILIZATION */}
                <div className="relative w-full h-full md:max-w-[420px] md:h-[90vh] md:max-h-[850px] bg-[#1a120b]/90 md:rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border-[1px] border-[#D4AF37]/30 flex flex-col">

                    {/* Inner Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url(${ASSETS.batikPattern})` }}></div>

                    {/* Top Decoration */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#1a120b] to-transparent z-20 pointer-events-none">
                        <img src={ASSETS.ornamentTop} className="w-full opacity-40 mix-blend-screen" />
                    </div>

                    {/* CONTENT SCROLL AREA */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar relative z-10 pb-28">
                        {activeTab === 'home' && <HomePage onEnter={() => setActiveTab('couple')} data={safeData} />}
                        {activeTab === 'couple' && <CouplePage data={safeData} />}
                        {activeTab === 'event' && <EventPage data={safeData} />}
                        {activeTab === 'gallery' && <GalleryPage data={safeData} />}
                        {activeTab === 'gift' && <GiftPage data={safeData} />}
                        {activeTab === 'rsvp' && safeData.engagement.rsvp !== false && (
                            <div className="min-h-full p-6 pt-10 pb-24 animate-reveal">
                                <h2 className="text-center font-javanese-display text-3xl text-gold-luxury mb-8">Ucapan & Doa</h2>
                                <RsvpForm whatsappNumber={safeData.engagement.rsvp_settings.whatsapp_number} messageTemplate={safeData.engagement.rsvp_settings.message_template} themeColor="#D4AF37" />
                            </div>
                        )}
                    </div>

                    {/* BOTTOM GRADIENT FOR NAVBAR VISIBILITY */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/80 to-transparent z-20 pointer-events-none"></div>

                </div>

                {/* CONTROLS */}
                {stage === 'main' && (
                    <>
                        <NavBar activeTab={activeTab} setTab={setActiveTab} rsvpEnabled={safeData.engagement.rsvp !== false} />

                        {/* Music Floating Button */}
                        <button
                            onClick={toggleMusic}
                            className="fixed top-6 right-6 md:right-[calc(50%-230px)] z-50 w-10 h-10 glass-javanese rounded-full flex items-center justify-center text-[#D4AF37] hover:scale-110 transition-transform animate-pulse-glow"
                        >
                            {musicPlaying ? <Music size={16} /> : <Pause size={16} />}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LuxuryJavanese;