import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Clock, Heart, Users,
    Music, Gift, BookOpen, ChevronRight, Volume2, VolumeX,
    Home, Image, MessageSquare, CreditCard
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: ADAT BONE (VVIP)
 * Inspired by KitaBerdua "Adat Bone" theme
 * - Maroon & Gold color scheme
 * - Decorative floral corners
 * - Multi-section navigation
 * - Premium aesthetic
 */

const AdatBone: React.FC<{ data: InvitationData }> = ({ data }) => {
    const [view, setView] = useState<'COVER' | 'OPENING' | 'CONTENT'>('COVER');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('mempelai');
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

    // --- NAVIGATION HANDLERS ---
    const changeView = (nextView: 'COVER' | 'OPENING' | 'CONTENT', sectionId?: string) => {
        if (view === nextView && sectionId) {
            const el = document.getElementById(sectionId);
            el?.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            return;
        }

        setIsTransitioning(true);
        setTimeout(() => {
            setView(nextView);
            setIsTransitioning(false);
            if (nextView === 'CONTENT') {
                setTimeout(() => {
                    if (sectionId) {
                        const el = document.getElementById(sectionId);
                        el?.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(sectionId);
                    } else {
                        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 100);
            }
        }, 600);
    };

    // Format date from resepsi
    const eventDate = new Date(content.events.resepsi.date);
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
    const year = eventDate.getFullYear().toString().slice(-2);

    // Extract names from nicknames (e.g., "Romeo & Juliet" -> ["Romeo", "Juliet"])
    const names = content.hero.nicknames.split(/\s*[&]\s*/);
    const brideName = content.couples.wanita.name;
    const groomName = content.couples.pria.name;

    return (
        <div className="fixed inset-0 bg-[#4a1c1c] font-serif overflow-hidden selection:bg-[#D4AF37] selection:text-[#4a1c1c]">
            {/* --- STYLES & ANIMATIONS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Playfair+Display:wght@400;500;600&display=swap');
                
                .font-script { font-family: 'Great Vibes', cursive; }
                .font-display { font-family: 'Playfair Display', serif; }
                .font-body { font-family: 'Cormorant Garamond', serif; }

                /* BACKGROUND PATTERN */
                .bg-pattern {
                    background-image: url('/assets/adat-bone/bg.webp');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                /* ANIMATIONS */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                @keyframes pulse-gold {
                    0%, 100% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
                    50% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.6); }
                }

                .anim-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
                .anim-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
                .anim-fade-right { animation: fadeInRight 0.8s ease-out forwards; }
                .anim-scale { animation: scaleIn 0.8s ease-out forwards; }
                .anim-float { animation: float 4s ease-in-out infinite; }
                .anim-shimmer {
                    background: linear-gradient(90deg, #D4AF37, #f0d78c, #D4AF37);
                    background-size: 200% auto;
                    animation: shimmer 3s linear infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .anim-pulse-gold { animation: pulse-gold 2s ease-in-out infinite; }

                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }

                /* GRADIENT TEXT */
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #f0d78c 50%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* SCROLLBAR */
                .custom-scroll::-webkit-scrollbar { width: 4px; }
                .custom-scroll::-webkit-scrollbar-track { background: rgba(74, 28, 28, 0.5); }
                .custom-scroll::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }

                /* NAV ACTIVE */
                .nav-item.active { color: #D4AF37; }
                .nav-item.active::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background: #D4AF37;
                    border-radius: 50%;
                }
            `}</style>

            {/* --- AUDIO --- */}
            <audio ref={audioRef} src={metadata.music_url || "/audio/romantic.mp3"} loop />

            {/* === DECORATIVE CORNERS === */}
            <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Top Left */}
                <div className="absolute -top-2 -left-2">
                    <img
                        src="/assets/adat-bone/left.webp"
                        className="w-36 md:w-56 opacity-95 anim-fade-left"
                        alt="decor"
                    />
                </div>

                {/* Top Right */}
                <div className="absolute -top-2 -right-2">
                    <img
                        src="/assets/adat-bone/right.webp"
                        className="w-36 md:w-56 opacity-95 anim-fade-right"
                        alt="decor"
                    />
                </div>

                {/* Bottom Left */}
                <div className="absolute -bottom-2 -left-2">
                    <img
                        src="/assets/adat-bone/bl.webp"
                        className="w-32 md:w-48 opacity-90 anim-fade-up delay-200"
                        alt="decor"
                    />
                </div>

                {/* Bottom Middle */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <img
                        src="/assets/adat-bone/bm.webp"
                        className="w-40 md:w-64 opacity-80 anim-fade-up delay-300"
                        alt="decor"
                    />
                </div>

                {/* Bottom Right */}
                <div className="absolute -bottom-2 -right-2">
                    <img
                        src="/assets/adat-bone/br.webp"
                        className="w-32 md:w-48 opacity-90 anim-fade-up delay-400"
                        alt="decor"
                    />
                </div>
            </div>

            {/* === TRANSITION OVERLAY === */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-[#4a1c1c] z-[60] animate-pulse"></div>
            )}

            {/* === MUSIC BUTTON (Always Visible) === */}
            {view !== 'COVER' && (
                <button
                    onClick={toggleMusic}
                    className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-[#4a1c1c]/80 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4a1c1c] transition-all anim-pulse-gold"
                >
                    {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
            )}

            {/* ============================================ */}
            {/* ================= COVER ==================== */}
            {/* ============================================ */}
            {view === 'COVER' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 bg-pattern">
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4a1c1c]/70 via-[#4a1c1c]/50 to-[#4a1c1c]/80"></div>

                    <div className="relative z-10 space-y-6">
                        {/* Title */}
                        <p className="text-[#D4AF37] tracking-[0.4em] text-xs uppercase font-display anim-fade-up">
                            THE WEDDING OF
                        </p>

                        {/* Initials */}
                        <div className="flex items-center justify-center gap-4 anim-scale delay-100">
                            <span className="text-6xl md:text-8xl font-script text-gradient-gold">
                                {brideName?.charAt(0) || 'B'}
                            </span>
                            <span className="text-4xl md:text-5xl font-script text-[#D4AF37]">&</span>
                            <span className="text-6xl md:text-8xl font-script text-gradient-gold">
                                {groomName?.charAt(0) || 'G'}
                            </span>
                        </div>

                        {/* Names */}
                        <h1 className="text-3xl md:text-5xl font-script text-gradient-gold anim-fade-up delay-200">
                            {content.hero.nicknames || 'Bride & Groom'}
                        </h1>

                        {/* Date */}
                        <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-display text-[#D4AF37] anim-fade-up delay-300">
                            <span>{day}</span>
                            <span className="text-lg">✦</span>
                            <span>{month}</span>
                            <span className="text-lg">✦</span>
                            <span>{year}</span>
                        </div>

                        {/* Guest Name */}
                        <div className="mt-8 space-y-2 anim-fade-up delay-400">
                            <p className="text-[#f0d78c]/80 text-sm font-body">Kepada Yth</p>
                            <p className="text-[#f0d78c]/80 text-sm font-body">Bapak/Ibu/Saudara/i</p>
                            <p className="text-xl md:text-2xl font-display text-[#D4AF37]">
                                Nama Tamu
                            </p>
                        </div>

                        {/* Open Button */}
                        <button
                            onClick={() => changeView('OPENING')}
                            className="mt-8 px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#f0d78c] text-[#4a1c1c] font-display font-semibold rounded-full hover:from-[#f0d78c] hover:to-[#D4AF37] transition-all transform hover:scale-105 anim-fade-up delay-500 anim-pulse-gold"
                        >
                            {content.texts.open_button || 'Buka Undangan'}
                        </button>
                    </div>
                </div>
            )}

            {/* ============================================ */}
            {/* ================ OPENING =================== */}
            {/* ============================================ */}
            {view === 'OPENING' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 bg-pattern">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4a1c1c]/80 via-[#4a1c1c]/60 to-[#4a1c1c]/80"></div>

                    <div className="relative z-10 space-y-8">
                        {/* Date Display */}
                        <div className="text-4xl md:text-6xl font-display text-[#D4AF37] tracking-widest anim-fade-up">
                            {day} . {month} . {year}
                        </div>

                        {/* Ornament */}
                        <div className="flex items-center justify-center gap-4 anim-scale delay-100">
                            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <span className="text-[#D4AF37]">✦</span>
                            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>

                        {/* Title */}
                        <p className="text-[#f0d78c]/80 text-lg font-body anim-fade-up delay-200">
                            {content.texts.hero_subtitle || 'The Wedding of'}
                        </p>

                        {/* Names */}
                        <h1 className="text-5xl md:text-7xl font-script anim-shimmer anim-fade-up delay-300">
                            {content.hero.nicknames || 'Bride & Groom'}
                        </h1>

                        {/* Continue Button */}
                        <button
                            onClick={() => changeView('CONTENT', 'mempelai')}
                            className="mt-12 flex items-center gap-2 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-display rounded-full hover:bg-[#D4AF37] hover:text-[#4a1c1c] transition-all anim-fade-up delay-400"
                        >
                            Lihat Undangan <ChevronRight size={18} />
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
                    className="relative z-20 h-full overflow-y-auto custom-scroll pb-24"
                >
                    {/* --- SECTION: MEMPELAI (Couple) --- */}
                    <section id="mempelai" className="min-h-screen flex flex-col items-center justify-center p-6 py-16 bg-pattern relative">
                        <div className="absolute inset-0 bg-[#4a1c1c]/85"></div>
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-8">
                            <h2 className="text-4xl font-script text-gradient-gold mb-8 anim-fade-up">
                                {content.texts.couple_title || 'Mempelai'}
                            </h2>

                            {/* Bride */}
                            <div className="space-y-4 anim-fade-up">
                                <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#D4AF37] overflow-hidden anim-pulse-gold">
                                    <img
                                        src={content.couples.wanita.photo || "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300"}
                                        alt="Bride"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-3xl font-script text-gradient-gold">
                                    {content.couples.wanita.name || 'Bride Name'}
                                </h3>
                                <p className="text-[#f0d78c]/80 font-body text-sm leading-relaxed">
                                    {content.couples.wanita.parents || 'Putri dari ...'}
                                </p>
                            </div>

                            {/* Separator */}
                            <div className="flex items-center justify-center gap-4 anim-scale delay-200">
                                <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                <Heart className="text-[#D4AF37] anim-float" size={24} fill="#D4AF37" />
                                <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                            </div>

                            {/* Groom */}
                            <div className="space-y-4 anim-fade-up delay-300">
                                <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#D4AF37] overflow-hidden anim-pulse-gold">
                                    <img
                                        src={content.couples.pria.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"}
                                        alt="Groom"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-3xl font-script text-gradient-gold">
                                    {content.couples.pria.name || 'Groom Name'}
                                </h3>
                                <p className="text-[#f0d78c]/80 font-body text-sm leading-relaxed">
                                    {content.couples.pria.parents || 'Putra dari ...'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: QUOTES --- */}
                    <section id="quotes" className="min-h-screen flex flex-col items-center justify-center p-6 py-16 bg-[#3a1515] relative">
                        <div className="relative z-10 max-w-lg mx-auto text-center space-y-6">
                            <p className="text-[#D4AF37] font-display text-lg anim-fade-up">
                                {content.quote.source || 'QS. Ar-Rum 21'}
                            </p>
                            <blockquote className="text-[#f0d78c]/90 font-body text-lg italic leading-relaxed anim-fade-up delay-100">
                                "{content.quote.content || 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.'}"
                            </blockquote>
                            <div className="flex items-center justify-center gap-4 anim-scale delay-200">
                                <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                                <span className="text-[#D4AF37]">✦</span>
                                <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: GALLERY --- */}
                    <section id="gallery" className="min-h-screen flex flex-col items-center p-6 py-16 bg-[#4a1c1c] relative">
                        <div className="absolute inset-0 bg-pattern opacity-20"></div>
                        <div className="relative z-10 max-w-md mx-auto text-center">
                            <h2 className="text-4xl font-script text-gradient-gold mb-8 anim-fade-up">
                                {content.texts.gallery_title || 'Galeri'}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {(content.gallery.images && content.gallery.images.length > 0 ? content.gallery.images : [
                                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
                                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
                                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
                                    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400"
                                ]).map((img: string, i: number) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-lg overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all anim-scale"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: ACARA (Event) --- */}
                    <section id="acara" className="min-h-screen flex flex-col items-center p-6 py-16 bg-[#3a1515] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-8">
                            <h2 className="text-4xl font-script text-gradient-gold mb-4 anim-fade-up">
                                {content.texts.events_title || 'Acara'}
                            </h2>

                            {/* Akad */}
                            {content.events.akad.enabled !== false && (
                                <div className="bg-[#4a1c1c]/50 rounded-2xl p-6 border border-[#D4AF37]/30 anim-fade-up delay-100">
                                    <h3 className="text-2xl font-display text-[#D4AF37] mb-4">
                                        {content.texts.akad_title || 'Akad Nikah'}
                                    </h3>
                                    <div className="space-y-2 text-[#f0d78c]/80 font-body">
                                        <p className="flex items-center justify-center gap-2">
                                            <Calendar size={16} className="text-[#D4AF37]" />
                                            {new Date(content.events.akad.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                        <p className="flex items-center justify-center gap-2">
                                            <Clock size={16} className="text-[#D4AF37]" />
                                            {content.events.akad.time || '10:00'} WIB - Selesai
                                        </p>
                                        <p className="flex items-center justify-center gap-2">
                                            <MapPin size={16} className="text-[#D4AF37]" />
                                            {content.events.akad.venue || 'Lokasi Akad'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Resepsi */}
                            <div className="bg-[#4a1c1c]/50 rounded-2xl p-6 border border-[#D4AF37]/30 anim-fade-up delay-200">
                                <h3 className="text-2xl font-display text-[#D4AF37] mb-4">
                                    {content.texts.resepsi_title || 'Resepsi Pernikahan'}
                                </h3>
                                <div className="space-y-2 text-[#f0d78c]/80 font-body">
                                    <p className="flex items-center justify-center gap-2">
                                        <Calendar size={16} className="text-[#D4AF37]" />
                                        {new Date(content.events.resepsi.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <p className="flex items-center justify-center gap-2">
                                        <Clock size={16} className="text-[#D4AF37]" />
                                        {content.events.resepsi.time || '11:00'} WIB - Selesai
                                    </p>
                                    <p className="flex items-center justify-center gap-2 text-center">
                                        <MapPin size={16} className="text-[#D4AF37] flex-shrink-0" />
                                        {content.events.resepsi.venue || 'Lokasi Resepsi'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: MAPS --- */}
                    <section id="maps" className="min-h-[60vh] flex flex-col items-center p-6 py-16 bg-[#4a1c1c] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6 w-full">
                            <h2 className="text-4xl font-script text-gradient-gold mb-4 anim-fade-up">Lokasi</h2>
                            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 anim-fade-up delay-100">
                                <iframe
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(content.events.resepsi.venue || 'Jakarta')}&output=embed`}
                                    className="w-full h-64"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <a
                                href={content.events.resepsi.map_url || `https://maps.google.com/?q=${encodeURIComponent(content.events.resepsi.venue || 'Jakarta')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#f0d78c] text-[#4a1c1c] font-display font-semibold rounded-full hover:from-[#f0d78c] hover:to-[#D4AF37] transition-all anim-fade-up delay-200"
                            >
                                <MapPin size={18} /> Petunjuk Ke Lokasi
                            </a>
                        </div>
                    </section>

                    {/* --- SECTION: RSVP --- */}
                    <section id="rsvp" className="min-h-screen flex flex-col items-center p-6 py-16 bg-[#3a1515] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-8 w-full">
                            <h2 className="text-4xl font-script text-gradient-gold mb-4 anim-fade-up">Konfirmasi Kehadiran</h2>

                            {/* Countdown */}
                            <div className="grid grid-cols-4 gap-4 anim-fade-up delay-100">
                                {[
                                    { value: countdown.days, label: 'Hari' },
                                    { value: countdown.hours, label: 'Jam' },
                                    { value: countdown.minutes, label: 'Menit' },
                                    { value: countdown.seconds, label: 'Detik' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#4a1c1c]/50 rounded-xl p-3 border border-[#D4AF37]/30">
                                        <div className="text-2xl md:text-3xl font-display text-[#D4AF37]">
                                            {item.value.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-xs text-[#f0d78c]/60 font-body">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* RSVP Form */}
                            <div className="anim-fade-up delay-200">
                                <RsvpForm
                                    whatsappNumber={engagement.rsvp_settings.whatsapp_number}
                                    messageTemplate={engagement.rsvp_settings.message_template}
                                    themeColor="#D4AF37"
                                />
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION: GIFT --- */}
                    <section id="gift" className="min-h-[80vh] flex flex-col items-center p-6 py-16 bg-[#4a1c1c] relative">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
                            <h2 className="text-4xl font-script text-gradient-gold mb-4 anim-fade-up">
                                {content.texts.gift_title || 'Wedding Gift'}
                            </h2>
                            <p className="text-[#f0d78c]/80 font-body anim-fade-up delay-100">
                                {content.texts.gift_text || 'Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan kehadiran dan hadiah indah Anda.'}
                            </p>

                            {engagement.gifts?.map((account, i) => (
                                <div key={i} className="bg-[#3a1515] rounded-2xl p-6 border border-[#D4AF37]/30 space-y-4 anim-fade-up delay-200">
                                    <p className="text-[#D4AF37] font-display text-lg">{account.bank}</p>
                                    <p className="text-2xl font-display text-[#f0d78c]">{account.acc_number}</p>
                                    <p className="text-[#f0d78c]/60 font-body text-sm">a.n. {account.holder}</p>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(account.acc_number)}
                                        className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] font-body text-sm rounded-full hover:bg-[#D4AF37] hover:text-[#4a1c1c] transition-all"
                                    >
                                        Salin Nomor
                                    </button>
                                </div>
                            ))}

                            {(!engagement.gifts || engagement.gifts.length === 0) && (
                                <div className="bg-[#3a1515] rounded-2xl p-6 border border-[#D4AF37]/30 space-y-4 anim-fade-up delay-200">
                                    <p className="text-[#D4AF37] font-display text-lg">BANK BRI</p>
                                    <p className="text-2xl font-display text-[#f0d78c]">123456789</p>
                                    <p className="text-[#f0d78c]/60 font-body text-sm">a.n. Nama Rekening</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* --- SECTION: THANKS --- */}
                    <section id="thanks" className="min-h-screen flex flex-col items-center justify-center p-6 py-16 bg-[#3a1515] relative">
                        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
                            <p className="text-[#f0d78c]/80 font-body leading-relaxed anim-fade-up">
                                {content.texts.footer_text || 'Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do\'a restu kepada kedua mempelai.'}
                            </p>

                            <p className="text-[#f0d78c]/60 font-body anim-fade-up delay-100">
                                Hormat Kami Yang Mengundang
                            </p>

                            <h2 className="text-5xl font-script text-gradient-gold anim-fade-up delay-200">
                                {content.hero.nicknames || 'Bride & Groom'}
                            </h2>

                            <div className="flex items-center justify-center gap-4 pt-6 anim-scale delay-300">
                                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                                <Heart className="text-[#D4AF37] anim-float" size={20} fill="#D4AF37" />
                                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* === BOTTOM NAVIGATION === */}
            {view === 'CONTENT' && (
                <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#2a1010]/95 backdrop-blur-md border-t border-[#D4AF37]/20">
                    <div className="flex items-center justify-around py-2 px-1 max-w-md mx-auto overflow-x-auto">
                        {[
                            { id: 'mempelai', icon: Users, label: 'Mempelai' },
                            { id: 'quotes', icon: BookOpen, label: 'Quotes' },
                            { id: 'gallery', icon: Image, label: 'Gallery' },
                            { id: 'acara', icon: Calendar, label: 'Acara' },
                            { id: 'maps', icon: MapPin, label: 'Maps' },
                            { id: 'rsvp', icon: MessageSquare, label: 'RSVP' },
                            { id: 'gift', icon: Gift, label: 'Gift' },
                            { id: 'thanks', icon: Heart, label: 'Thanks' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => changeView('CONTENT', item.id)}
                                className={`nav-item relative flex flex-col items-center gap-1 px-2 py-1 text-[10px] transition-all ${activeSection === item.id ? 'active text-[#D4AF37]' : 'text-[#f0d78c]/50 hover:text-[#f0d78c]'}`}
                            >
                                <item.icon size={18} />
                                <span className="font-body">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </div>
    );
};

export default AdatBone;
