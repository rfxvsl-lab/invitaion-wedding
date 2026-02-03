import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Clock, Heart, Users,
    Gift, ChevronRight, Volume2, VolumeX, Instagram,
    Image, MessageSquare, Home, Send
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import DIYOverlay from '../components/DIYOverlay';
import RsvpForm from '../components/RsvpForm';
import { mapToTemplateData } from '../utils/templateMapper';

/**
 * TEMPLATE: ELEGANT VANILLA (VVIP)
 * Inspired by KitaBerdua "Novianty" theme
 * - Pink/Purple & Cream color scheme
 * - Elegant typography with cursive headers
 * - Full-page vertical swipe sections
 * - Floating couple initials sidebar
 */

const ElegantVanilla: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = "Tamu Undangan" }) => {
    const invitation = mapToTemplateData(data);
    const [view, setView] = useState<'COVER' | 'CONTENT'>('COVER');
    const [currentSection, setCurrentSection] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;

    // --- COUNTDOWN ---
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const targetDate = new Date(content.events.resepsi.date).getTime();
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = targetDate - now;
            if (diff <= 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
            } else {
                setCountdown({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [content.events.resepsi.date]);

    // --- AUDIO HANDLING ---
    useEffect(() => {
        if (view !== 'COVER' && !isPlaying) {
            setIsPlaying(true);
            const playPromise = audioRef.current?.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => { /* Auto-play prevented */ });
            }
        }
    }, [view]);

    const toggleMusic = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    // --- NAVIGATION ---
    const openInvitation = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setView('CONTENT');
            setIsTransitioning(false);
        }, 600);
    };

    // Format date
    const eventDate = new Date(content.events.resepsi.date);
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
    const year = eventDate.getFullYear().toString().slice(-2);
    const monthName = eventDate.toLocaleDateString('id-ID', { month: 'long' }).toUpperCase();

    // Names
    const brideName = invitation ? invitation.hero.bride_nickname : content.couples.wanita.name.split(' ')[0];
    const groomName = invitation ? invitation.hero.groom_nickname : content.couples.pria.name.split(' ')[0];

    // Sections for navigation
    const sections = ['bride', 'groom', 'event', 'location', 'rsvp', 'gift', 'thanks'];

    return (
        <div
            className="min-h-screen font-serif text-gray-800 relative overflow-x-hidden selection:bg-amber-100"
            style={
                data.metadata.custom_bg_url
                    ? { backgroundImage: `url(${data.metadata.custom_bg_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
                    : { backgroundColor: '#FDFCF9' }
            }
        >
            {/* Soft overlay for custom background */}
            {data.metadata.custom_bg_url && (
                <div className="fixed inset-0 bg-gradient-to-b from-white/85 to-amber-50/85 z-0" />
            )}
            {/* --- STYLES & ANIMATIONS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Satisfy&family=Montserrat:wght@300;400;500&display=swap');
                
                .font-script { font-family: 'Satisfy', cursive; }
                .font-display { font-family: 'Cormorant Garamond', serif; }
                .font-body { font-family: 'Montserrat', sans-serif; }

                /* BACKGROUND */
                .bg-vanilla {
                    background: linear-gradient(180deg, #FDF8F5 0%, #F5EBE6 50%, #FDF8F5 100%);
                }
                
                .bg-pattern {
                    background-image: url('/assets/elegant-vanilla/bg.webp');
                    background-size: cover;
                    background-position: center;
                }

                /* ANIMATIONS */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }

                .anim-fade-up { animation: fadeInUp 1s ease-out forwards; }
                .anim-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
                .anim-fade-right { animation: fadeInRight 0.8s ease-out forwards; }
                .anim-scale { animation: scaleIn 0.8s ease-out forwards; }
                .anim-float { animation: float 4s ease-in-out infinite; }
                .anim-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }

                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }

                /* GRADIENT TEXT */
                .text-gradient-rose {
                    background: linear-gradient(135deg, #C9A9A6 0%, #E8B4B8 50%, #D4A5A5 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* SCROLLBAR */
                .custom-scroll::-webkit-scrollbar { width: 3px; }
                .custom-scroll::-webkit-scrollbar-track { background: rgba(200, 180, 175, 0.2); }
                .custom-scroll::-webkit-scrollbar-thumb { background: #C9A9A6; border-radius: 4px; }

                /* SIDE BADGE */
                .side-badge {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>

            {/* --- AUDIO --- */}
            <audio ref={audioRef} src={metadata.music_url || "/audio/romantic.mp3"} loop />

            {/* === DECORATIVE CORNERS === */}
            <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Top Left */}
                <div className="absolute -top-4 -left-4">
                    <img
                        src="/assets/elegant-vanilla/top-left.webp"
                        className="w-40 md:w-64 opacity-90 anim-fade-left"
                        alt="decor"
                    />
                </div>

                {/* Top Right */}
                <div className="absolute -top-4 -right-4">
                    <img
                        src="/assets/elegant-vanilla/top-right.webp"
                        className="w-40 md:w-64 opacity-90 anim-fade-right"
                        alt="decor"
                    />
                </div>

                {/* Bottom Left */}
                <div className="absolute -bottom-4 -left-4">
                    <img
                        src="/assets/elegant-vanilla/bottom-left.webp"
                        className="w-44 md:w-72 opacity-85 anim-fade-up delay-200"
                        alt="decor"
                    />
                </div>

                {/* Bottom Right */}
                <div className="absolute -bottom-4 -right-4">
                    <img
                        src="/assets/elegant-vanilla/bottom-right.webp"
                        className="w-44 md:w-72 opacity-85 anim-fade-up delay-300"
                        alt="decor"
                    />
                </div>
            </div>

            {/* === TRANSITION OVERLAY === */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-[#FDF8F5] z-[60] animate-pulse"></div>
            )}

            {/* === MUSIC BUTTON === */}
            {view !== 'COVER' && (
                <button
                    onClick={toggleMusic}
                    className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-[#C9A9A6]/30 flex items-center justify-center text-[#C9A9A6] hover:bg-[#C9A9A6] hover:text-white transition-all shadow-lg"
                >
                    {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
            )}

            {/* === FLOATING SIDE BADGE === */}
            {view === 'CONTENT' && (
                <div className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4">
                    <div className="side-badge text-[#C9A9A6] font-script text-2xl tracking-wider anim-fade-left">
                        {brideName}
                    </div>
                    <div className="w-px h-8 bg-[#C9A9A6]/30"></div>
                    <div className="side-badge text-[#C9A9A6] font-script text-2xl tracking-wider anim-fade-left delay-100">
                        {groomName}
                    </div>
                    <div className="w-px h-8 bg-[#C9A9A6]/30"></div>
                    <div className="side-badge text-[#C9A9A6]/60 font-body text-xs tracking-widest anim-fade-left delay-200">
                        {day}.{month}.{year}
                    </div>
                </div>
            )}

            {/* ============================================ */}
            {/* ================= COVER ==================== */}
            {/* ============================================ */}
            {view === 'COVER' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 bg-vanilla">
                    <div className="relative z-10 space-y-8">
                        {/* Hero Image - Added */}
                        <div className="w-32 h-44 md:w-48 md:h-64 mx-auto mb-6 rounded-t-full border-[3px] border-[#C9A9A6] p-1.5 anim-fade-up">
                            <div className="w-full h-full rounded-t-full overflow-hidden relative">
                                <img
                                    src={data.content.hero.main_image || "https://images.unsplash.com/photo-1595867865415-dc523beba457?w=500&q=80"}
                                    alt="Hero"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-[#C9A9A6]/10 mix-blend-multiply"></div>
                            </div>
                        </div>

                        {/* Names - Script Style */}
                        <div className="space-y-2 anim-fade-up">
                            <h1 className="text-5xl md:text-7xl font-script text-gradient-rose">
                                {brideName}
                            </h1>
                            <h1 className="text-5xl md:text-7xl font-script text-gradient-rose">
                                {groomName}
                            </h1>
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-body text-[#8B7355] tracking-[0.3em] anim-fade-up delay-200">
                            <span>{day}</span>
                            <span>.</span>
                            <span>{month}</span>
                            <span>.</span>
                            <span>{year}</span>
                        </div>

                        {/* Guest Greeting */}
                        <div className="mt-12 space-y-2 anim-fade-up delay-300">
                            <p className="text-[#8B7355]/70 text-sm font-body tracking-widest uppercase">
                                Kepada Yth.
                            </p>
                            <p className="text-xl md:text-2xl font-display text-[#8B7355] italic">
                                {guestName}
                            </p>
                        </div>

                        {/* Open Button */}
                        <button
                            onClick={openInvitation}
                            className="mt-8 px-10 py-4 bg-gradient-to-r from-[#C9A9A6] to-[#E8B4B8] text-white font-body text-sm tracking-widest uppercase rounded-full hover:from-[#E8B4B8] hover:to-[#C9A9A6] transition-all transform hover:scale-105 shadow-lg anim-fade-up delay-400"
                        >
                            Open Invitation
                        </button>
                    </div>
                </div>
            )}

            {/* ============================================ */}
            {/* ================ CONTENT =================== */}
            {/* ============================================ */}
            {view === 'CONTENT' && (
                <div
                    ref={containerRef}
                    className="relative z-20 h-full overflow-y-auto custom-scroll snap-y snap-mandatory"
                >
                    {/* --- SECTION: BRIDE --- */}
                    <section id="bride" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-vanilla relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
                            {/* Photo */}
                            <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full border-4 border-[#C9A9A6]/30 overflow-hidden shadow-xl anim-scale">
                                <img
                                    src={content.couples.wanita.photo || "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400"}
                                    alt="Bride"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h2 className="text-4xl md:text-5xl font-script text-gradient-rose anim-fade-up delay-100">
                                {content.couples.wanita.name || 'Bride Name'}
                            </h2>

                            {/* Parents */}
                            <p className="text-[#8B7355]/70 font-body text-sm leading-relaxed anim-fade-up delay-200">
                                {content.couples.wanita.parents || 'Putri dari Bapak ... & Ibu ...'}
                            </p>

                            {/* Instagram */}
                            {content.couples.wanita.ig && (
                                <a
                                    href={`https://instagram.com/${content.couples.wanita.ig.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#C9A9A6] font-body text-sm hover:text-[#E8B4B8] transition-colors anim-fade-up delay-300"
                                >
                                    <Instagram size={16} /> {content.couples.wanita.ig}
                                </a>
                            )}
                        </div>
                    </section>

                    {/* --- SECTION: GROOM --- */}
                    <section id="groom" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-[#F5EBE6] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
                            {/* Photo */}
                            <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full border-4 border-[#C9A9A6]/30 overflow-hidden shadow-xl anim-scale">
                                <img
                                    src={content.couples.pria.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"}
                                    alt="Groom"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h2 className="text-4xl md:text-5xl font-script text-gradient-rose anim-fade-up delay-100">
                                {content.couples.pria.name || 'Groom Name'}
                            </h2>

                            {/* Parents */}
                            <p className="text-[#8B7355]/70 font-body text-sm leading-relaxed anim-fade-up delay-200">
                                {content.couples.pria.parents || 'Putra dari Bapak ... & Ibu ...'}
                            </p>

                            {/* Instagram */}
                            {content.couples.pria.ig && (
                                <a
                                    href={`https://instagram.com/${content.couples.pria.ig.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#C9A9A6] font-body text-sm hover:text-[#E8B4B8] transition-colors anim-fade-up delay-300"
                                >
                                    <Instagram size={16} /> {content.couples.pria.ig}
                                </a>
                            )}
                        </div>
                    </section>

                    {/* --- SECTION: EVENT --- */}
                    <section id="event" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-vanilla relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-10">
                            {/* Akad */}
                            {content.events.akad.enabled !== false && (
                                <div className="space-y-4 anim-fade-up">
                                    <h3 className="text-2xl font-display text-[#8B7355] tracking-widest uppercase">
                                        {content.texts.akad_title || 'Akad Nikah'}
                                    </h3>
                                    <p className="text-[#8B7355]/70 font-body text-sm">
                                        {new Date(content.events.akad.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <p className="text-[#8B7355]/70 font-body text-sm">
                                        Pukul {content.events.akad.time || '08:30'} WIB
                                    </p>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="flex items-center justify-center gap-4 anim-scale delay-100">
                                <div className="w-16 h-px bg-[#C9A9A6]/40"></div>
                                <Heart className="text-[#C9A9A6] anim-float" size={20} fill="#C9A9A6" />
                                <div className="w-16 h-px bg-[#C9A9A6]/40"></div>
                            </div>

                            {/* Resepsi - Highlighted */}
                            <div className="space-y-4 anim-fade-up delay-200">
                                <h3 className="text-2xl font-display text-[#8B7355] tracking-widest uppercase">
                                    {content.texts.resepsi_title || 'Resepsi'}
                                </h3>

                                {/* Big Date Display */}
                                <div className="flex items-center justify-center gap-4 my-6">
                                    <div className="text-center">
                                        <p className="text-[#C9A9A6] font-body text-xs tracking-widest uppercase">
                                            {new Date(content.events.resepsi.date).toLocaleDateString('id-ID', { weekday: 'long' })}
                                        </p>
                                    </div>
                                    <div className="text-6xl md:text-7xl font-display text-[#C9A9A6] font-light">
                                        {eventDate.getDate()}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[#8B7355] font-body text-xs tracking-widest uppercase">
                                            {monthName}
                                        </p>
                                        <p className="text-[#8B7355] font-body text-xs tracking-widest">
                                            {eventDate.getFullYear()}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-[#8B7355]/70 font-body text-sm">
                                    Pukul {content.events.resepsi.time || '11:00'} WIB
                                </p>
                                <p className="text-[#8B7355] font-display text-lg italic">
                                    {content.events.resepsi.venue || 'Venue Name'}
                                </p>
                                <p className="text-[#8B7355]/60 font-body text-xs">
                                    {content.events.resepsi.address || 'Address'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: LOCATION --- */}
                    <section id="location" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-[#F5EBE6] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6 w-full">
                            <p className="text-[#8B7355] font-display text-lg italic anim-fade-up">
                                {content.events.resepsi.venue || 'Venue Name'}
                            </p>
                            <p className="text-[#8B7355]/60 font-body text-xs anim-fade-up delay-100">
                                {content.events.resepsi.address || 'Full Address'}
                            </p>

                            {/* Map */}
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#C9A9A6]/20 anim-fade-up delay-200">
                                <iframe
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(content.events.resepsi.venue || 'Jakarta')}&output=embed`}
                                    className="w-full h-56"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <a
                                href={content.events.resepsi.map_url || `https://maps.google.com/?q=${encodeURIComponent(content.events.resepsi.venue || 'Jakarta')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A9A6] text-white font-body text-sm tracking-widest uppercase rounded-full hover:bg-[#E8B4B8] transition-all shadow-md anim-fade-up delay-300"
                            >
                                <MapPin size={16} /> Gunakan Google Maps
                            </a>

                            <p className="text-[#8B7355]/50 font-body text-xs italic mt-4 anim-fade-up delay-400">
                                Demi kenyamanan mohon gunakan akses utama atau alternatif yang tersedia.
                            </p>
                        </div>
                    </section>

                    {/* --- SECTION: RSVP --- */}
                    <section id="rsvp" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-vanilla relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-8 w-full">
                            <h2 className="text-3xl font-script text-gradient-rose anim-fade-up">
                                Menuju Hari Spesial Kami
                            </h2>

                            {/* Countdown */}
                            <div className="grid grid-cols-4 gap-3 anim-fade-up delay-100">
                                {[
                                    { value: countdown.days, label: 'Hari' },
                                    { value: countdown.hours, label: 'Jam' },
                                    { value: countdown.minutes, label: 'Menit' },
                                    { value: countdown.seconds, label: 'Detik' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-[#C9A9A6]/20">
                                        <div className="text-3xl md:text-4xl font-display text-[#C9A9A6]">
                                            {item.value.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-[10px] text-[#8B7355]/60 font-body uppercase tracking-widest">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[#8B7355]/70 font-body text-sm anim-fade-up delay-200">
                                Tekan tombol dibawah ini untuk mengirim ucapan dan konfirmasi kehadiran
                            </p>

                            {/* RSVP Form */}
                            <div className="anim-fade-up delay-300">
                                <RsvpForm
                                    whatsappNumber={engagement.rsvp_settings.whatsapp_number}
                                    messageTemplate={engagement.rsvp_settings.message_template}
                                    themeColor="#C9A9A6"
                                />
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: GIFT --- */}
                    <section id="gift" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-[#F5EBE6] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
                            <h2 className="text-3xl font-script text-gradient-rose anim-fade-up">
                                {content.texts.gift_title || 'Tanda Kasih'}
                            </h2>
                            <p className="text-[#8B7355]/70 font-body text-sm anim-fade-up delay-100">
                                {content.texts.gift_text || 'Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan kehadiran dan hadiah indah Anda.'}
                            </p>

                            {engagement.gifts?.map((account, i) => (
                                <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-[#C9A9A6]/20 space-y-3 anim-fade-up delay-200">
                                    <p className="text-[#8B7355] font-body text-lg font-medium">{account.acc_number}</p>
                                    <p className="text-[#8B7355]/60 font-body text-sm">{account.bank} : {account.holder}</p>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(account.acc_number)}
                                        className="px-6 py-2 bg-[#C9A9A6] text-white font-body text-xs tracking-widest uppercase rounded-full hover:bg-[#E8B4B8] transition-all"
                                    >
                                        Salin
                                    </button>
                                </div>
                            ))}

                            {(!engagement.gifts || engagement.gifts.length === 0) && (
                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-[#C9A9A6]/20 space-y-3 anim-fade-up delay-200">
                                    <p className="text-[#8B7355] font-body text-lg font-medium">12345678</p>
                                    <p className="text-[#8B7355]/60 font-body text-sm">BCA : Atas Nama</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* --- SECTION: THANKS --- */}
                    <section id="thanks" className="min-h-screen snap-start flex flex-col items-center justify-center p-6 py-20 bg-vanilla relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
                            <p className="text-[#8B7355]/70 font-body text-sm leading-relaxed anim-fade-up">
                                {content.texts.footer_text || 'Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do\'a restu kepada kedua mempelai.'}
                            </p>

                            <p className="text-[#8B7355]/50 font-body text-xs tracking-widest uppercase anim-fade-up delay-100">
                                Turut Mengundang
                            </p>

                            {/* Names */}
                            <div className="space-y-2 anim-fade-up delay-200">
                                <h2 className="text-4xl md:text-5xl font-script text-gradient-rose">
                                    {brideName}
                                </h2>
                                <h2 className="text-4xl md:text-5xl font-script text-gradient-rose">
                                    {groomName}
                                </h2>
                            </div>

                            {/* Date */}
                            <div className="flex items-center justify-center gap-2 text-sm font-body text-[#8B7355]/60 tracking-[0.3em] anim-fade-up delay-300">
                                <span>{day}</span>
                                <span>.</span>
                                <span>{month}</span>
                                <span>.</span>
                                <span>{year}</span>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center justify-center gap-4 pt-8 anim-fade-up delay-400">
                                {content.couples.wanita.ig && (
                                    <a
                                        href={`https://instagram.com/${content.couples.wanita.ig.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#C9A9A6] hover:text-[#E8B4B8] transition-colors"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                )}
                                {content.couples.pria.ig && (
                                    <a
                                        href={`https://instagram.com/${content.couples.pria.ig.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#C9A9A6] hover:text-[#E8B4B8] transition-colors"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default ElegantVanilla;
