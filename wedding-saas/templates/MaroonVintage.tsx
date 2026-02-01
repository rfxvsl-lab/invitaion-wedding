import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Clock, Heart,
    Music, Gift, BookOpen, ChevronRight, Volume2, VolumeX, Pause, Play
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: MAROON VINTAGE (REFINED)
 * - Strict Assets: Kiri (Left), Kanan (Right)
 * - Auto-Sync Animations
 * - Wiggle Effect
 * - Unsplash Background + Transparency
 * - Fixed Navbar
 */

const MaroonVintage: React.FC<{ data: InvitationData }> = ({ data }) => {
    const [view, setView] = useState<'COVER' | 'QUOTES' | 'CONTENT'>('COVER');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;

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
    const changeView = (nextView: 'COVER' | 'QUOTES' | 'CONTENT', sectionId?: string) => {
        if (view === nextView && sectionId) {
            // Already there, just scroll
            const el = document.getElementById(sectionId);
            el?.scrollIntoView({ behavior: 'smooth' });
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
                    } else {
                        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 100);
            }
        }, 500);
    };

    // --- BACKGROUND IMAGE ---
    // Default: Unsplash Wedding Decor (Transparent/Darkened via overlay)
    const bgImage = metadata.custom_bg_url || "https://images.unsplash.com/photo-1519225421980-692551ec44e7?q=80&w=1000&auto=format&fit=crop";

    return (
        <div className="fixed inset-0 bg-[#2c1215] font-serif overflow-hidden selection:bg-[#D4AF37] selection:text-[#722F37]">
            {/* --- STYLES --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&family=Great+Vibes&family=Mrs+Saint+Delafield&display=swap');
                
                .font-signature { font-family: 'Mrs Saint Delafield', cursive; }
                .font-vibe { font-family: 'Great Vibes', cursive; }
                .font-body { font-family: 'Work Sans', sans-serif; }

                /* ANIMATIONS */
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-2deg); }
                    50% { transform: rotate(2deg); }
                }
                .animate-wiggle { animation: wiggle 4s ease-in-out infinite; }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }

                /* Entry Animations - SERENTAK (Synced) */
                @keyframes slideInLeft { from { transform: translateX(-50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideInRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes slideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .anim-enter-left { animation: slideInLeft 0.8s ease-out forwards; }
                .anim-enter-right { animation: slideInRight 0.8s ease-out forwards; }
                .anim-enter-up { animation: slideUp 0.8s ease-out forwards; }
                .anim-enter-down { animation: slideDown 0.8s ease-out forwards; }
                .anim-enter-zoom { animation: zoomIn 0.8s ease-out forwards; }
                .anim-enter-fade { animation: fadeIn 1s ease-out forwards; }
                
                /* Minimize Stagger for "Serentak" feel */
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
            `}</style>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === 1. GLOBAL BACKGROUND (FIXED) === */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 animate-pulse"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                ></div>
                {/* Dark Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c1215]/60 via-[#2c1215]/40 to-[#2c1215]/80 mix-blend-multiply"></div>
            </div>

            {/* === 2. DECORATIVE LAYERS (Strict Placement + Wiggle) === */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Top Left - KIRI.PNG */}
                <img src="/assets/maroon-vintage/kiri.png" className="absolute -top-10 -left-10 w-48 md:w-80 opacity-90 anim-enter-left animate-wiggle" />

                {/* Top Right - KANAN.PNG */}
                <img src="/assets/maroon-vintage/kanan.png" className="absolute -top-10 -right-10 w-48 md:w-80 opacity-90 anim-enter-right animate-wiggle" style={{ animationDelay: '0.5s' }} />

                {/* Bottom Left - KIRI.PNG (Rotated) */}
                <img src="/assets/maroon-vintage/kiri.png" className="absolute -bottom-20 -left-10 w-32 md:w-48 opacity-70 anim-enter-up delay-200 animate-float rotate-180" />

                {/* Bottom Right - KANAN.PNG (Rotated) */}
                <img src="/assets/maroon-vintage/kanan.png" className="absolute -bottom-20 -right-10 w-32 md:w-48 opacity-70 anim-enter-up delay-200 animate-float rotate-180" style={{ animationDelay: '1s' }} />
            </div>

            {/* === 3. TRANSITION OVERLAY === */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-[#2c1215] z-[60] animate-pulse"></div>
            )}

            {/* === 4. VIEWS === */}

            {/* --- VIEW: COVER --- */}
            {view === 'COVER' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 pb-20">
                    <p className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase mb-4 anim-enter-down">The Wedding Of</p>

                    <div className="relative mb-8">
                        {/* Names enter almost simultaneously */}
                        <h1 className="font-signature text-7xl md:text-8xl text-[#EFDBB2] drop-shadow-lg anim-enter-left">{content.hero.nicknames.split('&')[0]}</h1>
                        <div className="font-vibe text-4xl text-[#D4AF37] my-[-10px] anim-enter-zoom delay-100">&</div>
                        <h1 className="font-signature text-7xl md:text-8xl text-[#EFDBB2] drop-shadow-lg anim-enter-right delay-100">{content.hero.nicknames.split('&')[1] || 'Partner'}</h1>
                    </div>

                    <div className="w-full max-w-xs bg-black/20 backdrop-blur-sm border border-[#D4AF37]/50 rounded-xl p-6 anim-enter-up delay-200 shadow-2xl">
                        <p className="text-[#EFDBB2] text-xs mb-2 tracking-wider">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4 opacity-50"></div>
                        <div className="bg-white/90 text-[#722F37] px-4 py-3 rounded-lg font-bold text-sm mb-5 shadow-inner border border-[#D4AF37]">
                            Tamu Undangan
                        </div>
                        <button
                            onClick={() => changeView('QUOTES')}
                            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B08D26] text-[#2c1215] font-bold tracking-[0.2em] text-xs rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform"
                        >
                            BUKA UNDANGAN
                        </button>
                    </div>
                </div>
            )}

            {/* --- VIEW: QUOTES --- */}
            {view === 'QUOTES' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-8 pb-32">
                    <div className="bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-[50px] border border-[#D4AF37]/30 shadow-2xl max-w-lg w-full anim-enter-up">
                        <img src="/assets/maroon-vintage/kiri.png" className="w-16 mx-auto mb-4 opacity-50 rotate-90" />
                        <h2 className="text-[#D4AF37] text-3xl mb-6 font-serif select-none" style={{ fontFamily: 'serif' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
                        <p className="text-[#EFDBB2] text-lg font-vibe leading-loose mb-6 anim-enter-fade delay-200">
                            "{content.quote.content}"
                        </p>
                        <p className="text-[#D4AF37] text-xs uppercase tracking-widest anim-enter-fade delay-300">
                            — {content.quote.source}
                        </p>
                        <button
                            onClick={() => changeView('CONTENT')}
                            className="mt-12 group flex flex-col items-center gap-2"
                        >
                            <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] group-hover:tracking-[0.5em] transition-all">LANJUT</span>
                            <ChevronRight className="rotate-90 text-white/50 animate-bounce" />
                        </button>
                    </div>
                </div>
            )}

            {/* --- VIEW: CONTENT (MAIN) --- */}
            {view === 'CONTENT' && (
                <div ref={containerRef} className="relative z-20 h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth pb-32">
                    <div className="min-h-screen py-8 px-4 md:px-0 flex flex-col items-center">

                        {/* MAIN CARD */}
                        <div className="w-full max-w-xl bg-[#F5F5DC] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[40px] overflow-hidden relative min-h-screen anim-enter-up">

                            {/* Gold Frame */}
                            <div className="absolute inset-3 border-2 border-[#D4AF37] rounded-[35px] pointer-events-none z-50 mix-blend-multiply opacity-40"></div>
                            <div className="absolute inset-5 border border-[#D4AF37] rounded-[30px] pointer-events-none z-50 mix-blend-multiply opacity-20"></div>

                            {/* Decorative Corner Art */}
                            <img src="/assets/maroon-vintage/kiri.png" className="absolute top-0 left-0 w-24 opacity-10 pointer-events-none" />
                            <img src="/assets/maroon-vintage/kanan.png" className="absolute top-0 right-0 w-24 opacity-10 pointer-events-none" />

                            {/* HEADER */}
                            <header className="pt-20 pb-16 px-8 text-center relative z-10">
                                <div className="inline-block p-1 border rounded-full border-[#D4AF37] mb-6">
                                    <img src={content.hero.main_image} className="w-32 h-32 rounded-full object-cover border-4 border-[#F5F5DC] shadow-md" />
                                </div>
                                <h2 className="font-signature text-5xl text-[#722F37] mb-2">{content.hero.nicknames}</h2>
                                <p className="font-body text-xs tracking-[0.2em] text-[#8B4513] uppercase">{content.hero.date}</p>
                            </header>

                            {/* COUPLES */}
                            <section id="couple" className="py-12 bg-[#F9F6EE] relative">
                                <div className="text-center space-y-12 px-6">
                                    {/* Groom */}
                                    <div className="flex flex-col items-center gap-4">
                                        <img src={content.couples.pria.photo} className="w-40 h-56 object-cover rounded-[100px_100px_0_0] border-b-4 border-[#D4AF37] shadow-lg" />
                                        <div>
                                            <h3 className="font-signature text-4xl text-[#722F37]">{content.couples.pria.name}</h3>
                                            <p className="text-[10px] text-[#8B4513] uppercase mt-2 max-w-[200px] mx-auto leading-relaxed">Putra dari {content.couples.pria.parents}</p>
                                        </div>
                                    </div>

                                    <div className="text-[#D4AF37] text-2xl font-serif italic">&</div>

                                    {/* Bride */}
                                    <div className="flex flex-col items-center gap-4">
                                        <img src={content.couples.wanita.photo} className="w-40 h-56 object-cover rounded-[100px_100px_0_0] border-b-4 border-[#D4AF37] shadow-lg" />
                                        <div>
                                            <h3 className="font-signature text-4xl text-[#722F37]">{content.couples.wanita.name}</h3>
                                            <p className="text-[10px] text-[#8B4513] uppercase mt-2 max-w-[200px] mx-auto leading-relaxed">Putri dari {content.couples.wanita.parents}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* EVENTS */}
                            <section className="py-20 px-8 bg-[#722F37] text-[#FAEBD7] text-center relative overflow-hidden">
                                <img src="/assets/maroon-vintage/kiri.png" className="absolute top-0 right-0 w-40 opacity-10 grayscale invert" />
                                <img src="/assets/maroon-vintage/kanan.png" className="absolute bottom-0 left-0 w-40 opacity-10 grayscale invert" />

                                <div className="space-y-12 relative z-10">
                                    <div className="p-6 border border-[#D4AF37]/30 rounded-lg backdrop-blur-sm bg-black/10">
                                        <h3 className="font-body font-bold text-[#D4AF37] text-lg uppercase tracking-widest mb-2">Akad Nikah</h3>
                                        <p className="text-2xl font-serif mb-2">{content.events.akad.time}</p>
                                        <p className="text-xs opacity-80 leading-relaxed mb-4">{content.events.akad.venue}</p>
                                        <a href={content.events.akad.map_url} target="_blank" className="text-[10px] font-bold border-b border-[#D4AF37] pb-0.5 hover:text-[#D4AF37]">VIEW MAP</a>
                                    </div>

                                    <div className="p-6 border border-[#D4AF37]/30 rounded-lg backdrop-blur-sm bg-black/10">
                                        <h3 className="font-body font-bold text-[#D4AF37] text-lg uppercase tracking-widest mb-2">Resepsi</h3>
                                        <p className="text-2xl font-serif mb-2">{content.events.resepsi.time}</p>
                                        <p className="text-xs opacity-80 leading-relaxed mb-4">{content.events.resepsi.venue}</p>
                                        <a href={content.events.resepsi.map_url} target="_blank" className="text-[10px] font-bold border-b border-[#D4AF37] pb-0.5 hover:text-[#D4AF37]">VIEW MAP</a>
                                    </div>
                                </div>
                            </section>

                            {/* RSVP */}
                            {engagement.rsvp && (
                                <section className="py-16 px-6 bg-[#F5F5DC]">
                                    <div className="text-center mb-8">
                                        <BookOpen className="w-6 h-6 text-[#722F37] mx-auto mb-2" />
                                        <h3 className="text-[#722F37] font-bold tracking-widest">RSVP</h3>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-[#D4AF37]/20">
                                        <RsvpForm
                                            whatsappNumber={engagement.rsvp_settings.whatsapp_number}
                                            messageTemplate={engagement.rsvp_settings.message_template}
                                            themeColor="#722F37"
                                        />
                                    </div>
                                </section>
                            )}

                            <footer className="py-10 text-center text-[#8B4513] text-[10px] bg-[#F9F6EE]">
                                <p className="mb-2">We can't wait to celebrate with you!</p>
                                <div className="w-3 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
                            </footer>
                        </div>
                    </div>
                </div>
            )}

            {/* === 5. FLOATING CONTROLS (RIGHT) === */}
            {view !== 'COVER' && (
                <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-3 anim-enter-right">
                    <button className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#722F37] shadow-lg hover:bg-white transition-colors">
                        <Gift size={18} />
                    </button>
                    <button onClick={toggleMusic} className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#722F37] shadow-lg hover:bg-white transition-colors">
                        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                    <button className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#722F37] shadow-lg hover:bg-white transition-colors">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                </div>
            )}

            {/* === 6. BOTTOM NAVIGATION === */}
            {view !== 'COVER' && (
                <div className="fixed bottom-0 inset-x-0 h-16 bg-[#2c1215]/95 backdrop-blur-md border-t border-[#D4AF37]/30 z-50 flex justify-around items-center px-6 shadow-2xl anim-enter-up">
                    {[
                        { id: 'QUOTES', icon: BookOpen, label: 'Quotes', action: () => changeView('QUOTES') },
                        { id: 'Couple', icon: Heart, label: 'Couple', action: () => changeView('CONTENT', 'couple') },
                        { id: 'CONTENT', icon: Calendar, label: 'Event', action: () => changeView('CONTENT') },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.action}
                            className={`flex flex-col items-center gap-1 transition-colors ${view === item.id ? 'text-[#D4AF37]' : 'text-white/50 hover:text-white'}`}
                        >
                            <item.icon size={20} className={view === item.id ? 'fill-[#D4AF37]' : ''} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default MaroonVintage;
