import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Clock, Heart,
    Music, Gift, BookOpen, ChevronRight, Volume2, VolumeX, Pause, Play
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: MAROON VINTAGE (VISUAL POLISH)
 * - Giant Floral Background (Wiggle)
 * - Swing Animation (Wind Effect)
 * - Image Uploader Support
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
    // User can override via Builder (ImageUploader)
    const bgImage = metadata.custom_bg_url || "https://images.unsplash.com/photo-1519225421980-692551ec44e7?q=80&w=1000&auto=format&fit=crop";

    return (
        <div className="fixed inset-0 bg-[#2c1215] font-serif overflow-hidden selection:bg-[#D4AF37] selection:text-[#722F37]">
            {/* --- STYLES & ANIMATIONS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&family=Great+Vibes&family=Mrs+Saint+Delafield&display=swap');
                
                .font-signature { font-family: 'Mrs Saint Delafield', cursive; }
                .font-vibe { font-family: 'Great Vibes', cursive; }
                .font-body { font-family: 'Work Sans', sans-serif; }

                /* ANIMATIONS */
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-3deg) scale(1.5); }
                    50% { transform: rotate(3deg) scale(1.55); }
                }
                
                /* SWING (Wind Effect) */
                @keyframes swing {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(4deg); }
                    50% { transform: rotate(0deg); }
                    75% { transform: rotate(-2deg); }
                    100% { transform: rotate(0deg); }
                }
                
                .animate-wiggle-giant { animation: wiggle 10s ease-in-out infinite; }
                .animate-swing { animation: swing 6s ease-in-out infinite transform-origin-top; }
                .animate-swing-delayed { animation: swing 7s ease-in-out infinite 1s transform-origin-top; }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }

                /* Entry Animations */
                @keyframes slideInLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .anim-enter-left { animation: slideInLeft 0.8s ease-out forwards; }
                .anim-enter-right { animation: slideInRight 0.8s ease-out forwards; }
                .anim-enter-up { animation: slideUp 0.8s ease-out forwards; }
                .anim-enter-zoom { animation: zoomIn 0.8s ease-out forwards; }
                .anim-enter-fade { animation: fadeIn 1s ease-out forwards; }
                
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
            `}</style>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}

            {/* === 1. GLOBAL BACKGROUND (FIXED) === */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-1000"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                ></div>
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c1215]/80 via-[#2c1215]/50 to-[#2c1215]/90 mix-blend-multiply"></div>

                {/* GIANT FLORAL BACKGROUND (User Request) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 mix-blend-screen pointer-events-none">
                    <img
                        src="/assets/maroon-vintage/kiri.png"
                        className="w-[120%] h-auto max-w-none animate-wiggle-giant blur-[1px]"
                    />
                </div>
            </div>

            {/* === 2. DECORATIVE LAYERS (Swing Wind Effect) === */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Top Left - KIRI.PNG - Swing */}
                <div className="absolute -top-10 -left-10 origin-top-left animate-swing z-20">
                    <img src="/assets/maroon-vintage/kiri.png" className="w-48 md:w-80 opacity-90 anim-enter-left shadow-lg drop-shadow-2xl" />
                </div>

                {/* Top Right - KANAN.PNG - Swing Delayed */}
                <div className="absolute -top-10 -right-10 origin-top-right animate-swing-delayed z-20">
                    <img src="/assets/maroon-vintage/kanan.png" className="w-48 md:w-80 opacity-90 anim-enter-right drop-shadow-2xl" />
                </div>

                {/* Bottom Left - BUNGA BAWAH KIRI */}
                <div className="absolute -bottom-10 -left-10 z-20">
                    <img src="/assets/maroon-vintage/bunga-bawah-kiri.png" className="w-40 md:w-64 opacity-90 anim-enter-up delay-200 animate-float" />
                </div>

                {/* Bottom Right - BUNGA BAWAH KANAN */}
                <div className="absolute -bottom-10 -right-10 z-20" style={{ animationDelay: '1s' }}>
                    <img src="/assets/maroon-vintage/bunga-bawah-kanan.png" className="w-40 md:w-64 opacity-90 anim-enter-up delay-200 animate-float" />
                </div>
            </div>

            {/* === 3. TRANSITION OVERLAY === */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-[#2c1215] z-[60] animate-pulse"></div>
            )}

            {/* === 4. VIEWS === */}

            {/* --- VIEW: COVER --- */}
            {view === 'COVER' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 pb-20">
                    <p className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase mb-4 anim-enter-up font-bold drop-shadow-md">The Wedding Of</p>

                    <div className="relative mb-8 transform hover:scale-105 transition-transform duration-700">
                        <h1 className="font-signature text-7xl md:text-8xl text-[#EFDBB2] drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] anim-enter-left">{content.hero.nicknames.split('&')[0]}</h1>
                        <div className="font-vibe text-5xl text-[#D4AF37] my-[-10px] anim-enter-zoom delay-100 drop-shadow-md">&</div>
                        <h1 className="font-signature text-7xl md:text-8xl text-[#EFDBB2] drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] anim-enter-right delay-100">{content.hero.nicknames.split('&')[1] || 'Partner'}</h1>
                    </div>

                    <div className="w-full max-w-xs bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl p-6 anim-enter-up delay-200 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                        <p className="text-[#EFDBB2] text-xs mb-3 tracking-widest font-light">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                        <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-5 opacity-70"></div>
                        <div className="bg-[#FAEBD7] text-[#722F37] px-4 py-3 rounded-lg font-bold text-sm mb-6 shadow-inner border border-[#D4AF37]">
                            Tamu Undangan
                        </div>
                        <button
                            onClick={() => changeView('QUOTES')}
                            className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B08D26] text-[#2c1215] font-bold tracking-[0.25em] text-xs rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 border border-[#FFF8DC]/20"
                        >
                            BUKA UNDANGAN
                        </button>
                    </div>
                </div>
            )}

            {/* --- VIEW: QUOTES --- */}
            {view === 'QUOTES' && (
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-8 pb-32">
                    <div className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-[50px] border border-[#D4AF37]/30 shadow-2xl max-w-lg w-full anim-enter-up">
                        <img src="/assets/maroon-vintage/kiri.png" className="w-16 mx-auto mb-4 opacity-50 rotate-90" />
                        <h2 className="text-[#D4AF37] text-3xl mb-6 font-serif select-none drop-shadow-md" style={{ fontFamily: 'serif' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
                        <p className="text-[#EFDBB2] text-lg font-vibe leading-loose mb-6 anim-enter-fade delay-200">
                            "{content.quote.content}"
                        </p>
                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] anim-enter-fade delay-300 font-bold">
                            — {content.quote.source}
                        </p>
                        <button
                            onClick={() => changeView('CONTENT')}
                            className="mt-12 group flex flex-col items-center gap-2 cursor-pointer"
                        >
                            <span className="text-[#D4AF37] text-[9px] tracking-[0.4em] group-hover:tracking-[0.6em] transition-all duration-500">LANJUT</span>
                            <ChevronRight className="rotate-90 text-white/50 animate-bounce group-hover:text-white" />
                        </button>
                    </div>
                </div>
            )}

            {/* --- VIEW: CONTENT (MAIN) --- */}
            {view === 'CONTENT' && (
                <div ref={containerRef} className="relative z-20 h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth pb-32">
                    <div className="min-h-screen py-8 px-4 md:px-0 flex flex-col items-center">

                        {/* MAIN CARD */}
                        <div className="w-full max-w-xl bg-[#F5F5DC] shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-[40px] overflow-hidden relative min-h-screen anim-enter-up ring-1 ring-white/10">

                            {/* Gold Frame Layers */}
                            <div className="absolute inset-2 border-[1px] border-[#D4AF37] rounded-[38px] pointer-events-none z-50 opacity-30"></div>
                            <div className="absolute inset-4 border-[2px] border-[#D4AF37] rounded-[34px] pointer-events-none z-50 mix-blend-multiply opacity-50"></div>

                            {/* Corner Decorations */}
                            <img src="/assets/maroon-vintage/kiri.png" className="absolute -top-4 -left-4 w-32 opacity-10 pointer-events-none z-0" />
                            <img src="/assets/maroon-vintage/kanan.png" className="absolute -top-4 -right-4 w-32 opacity-10 pointer-events-none z-0" />

                            {/* HEADER */}
                            <header className="pt-24 pb-16 px-8 text-center relative z-10">
                                <div className="inline-block p-1.5 border rounded-full border-[#D4AF37]/50 mb-8 shadow-sm">
                                    <img src={content.hero.main_image} className="w-36 h-36 rounded-full object-cover border-4 border-[#F5F5DC] shadow-lg" />
                                </div>
                                <h2 className="font-signature text-6xl text-[#722F37] mb-3 drop-shadow-sm">{content.hero.nicknames}</h2>
                                <div className="flex justify-center items-center gap-4 text-[#8B4513] opacity-70 mb-2">
                                    <div className="h-px w-8 bg-[#8B4513]"></div>
                                    <p className="font-body text-xs tracking-[0.3em] uppercase">{content.hero.date}</p>
                                    <div className="h-px w-8 bg-[#8B4513]"></div>
                                </div>
                            </header>

                            {/* COUPLES */}
                            <section id="couple" className="py-16 bg-[#F9F6EE] relative">
                                <div className="text-center space-y-16 px-8 relative z-10">
                                    {/* Groom */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-[#D4AF37] rotate-3 rounded-[80px_80px_0_0] opacity-10 group-hover:rotate-6 transition-transform"></div>
                                            <img src={content.couples.pria.photo} className="relative w-44 h-60 object-cover rounded-[80px_80px_0_0] border-b-4 border-[#D4AF37] shadow-xl" />
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="font-signature text-5xl text-[#722F37] mb-2">{content.couples.pria.name}</h3>
                                            <p className="text-[10px] text-[#8B4513] uppercase tracking-wider font-bold">Putra Bapak & Ibu</p>
                                            <p className="text-xs text-[#555] mt-1 leading-relaxed max-w-[250px] mx-auto italic">{content.couples.pria.parents}</p>
                                        </div>
                                    </div>

                                    <div className="font-vibe text-6xl text-[#D4AF37]/50">&</div>

                                    {/* Bride */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-[#D4AF37] -rotate-3 rounded-[80px_80px_0_0] opacity-10 group-hover:-rotate-6 transition-transform"></div>
                                            <img src={content.couples.wanita.photo} className="relative w-44 h-60 object-cover rounded-[80px_80px_0_0] border-b-4 border-[#D4AF37] shadow-xl" />
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="font-signature text-5xl text-[#722F37] mb-2">{content.couples.wanita.name}</h3>
                                            <p className="text-[10px] text-[#8B4513] uppercase tracking-wider font-bold">Putri Bapak & Ibu</p>
                                            <p className="text-xs text-[#555] mt-1 leading-relaxed max-w-[250px] mx-auto italic">{content.couples.wanita.parents}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* EVENTS */}
                            <section className="py-24 px-8 bg-[#722F37] text-[#FAEBD7] text-center relative overflow-hidden">
                                {/* Back Elements */}
                                <img src="/assets/maroon-vintage/kiri.png" className="absolute -top-10 -left-10 w-56 opacity-5 grayscale invert pointer-events-none" />
                                <img src="/assets/maroon-vintage/kanan.png" className="absolute -bottom-10 -right-10 w-56 opacity-5 grayscale invert pointer-events-none" />

                                <div className="space-y-12 relative z-10">
                                    <div className="p-8 border border-[#D4AF37]/30 rounded-xl backdrop-blur-sm bg-black/10 hover:bg-black/20 transition-colors shadow-lg">
                                        <h3 className="font-body font-bold text-[#D4AF37] text-lg uppercase tracking-[0.2em] mb-4 border-b border-[#D4AF37]/20 pb-2 inline-block">Akad Nikah</h3>
                                        <p className="text-4xl font-vibe mb-2">{content.events.akad.time}</p>
                                        <p className="text-xs opacity-80 leading-relaxed mb-6 font-light max-w-[250px] mx-auto">{content.events.akad.venue}</p>
                                        <a href={content.events.akad.map_url} target="_blank" className="px-6 py-2 bg-[#D4AF37] text-[#722F37] text-[10px] font-bold rounded-full hover:bg-white hover:text-[#722F37] transition-colors shadow-sm">
                                            GOOGLE MAPS
                                        </a>
                                    </div>

                                    <div className="p-8 border border-[#D4AF37]/30 rounded-xl backdrop-blur-sm bg-black/10 hover:bg-black/20 transition-colors shadow-lg">
                                        <h3 className="font-body font-bold text-[#D4AF37] text-lg uppercase tracking-[0.2em] mb-4 border-b border-[#D4AF37]/20 pb-2 inline-block">Resepsi</h3>
                                        <p className="text-4xl font-vibe mb-2">{content.events.resepsi.time}</p>
                                        <p className="text-xs opacity-80 leading-relaxed mb-6 font-light max-w-[250px] mx-auto">{content.events.resepsi.venue}</p>
                                        <a href={content.events.resepsi.map_url} target="_blank" className="px-6 py-2 bg-[#D4AF37] text-[#722F37] text-[10px] font-bold rounded-full hover:bg-white hover:text-[#722F37] transition-colors shadow-sm">
                                            GOOGLE MAPS
                                        </a>
                                    </div>
                                </div>
                            </section>

                            {/* RSVP */}
                            {engagement.rsvp && (
                                <section className="py-20 px-6 bg-[#F5F5DC] relative">
                                    <div className="text-center mb-10">
                                        <BookOpen className="w-8 h-8 text-[#722F37]/50 mx-auto mb-3" />
                                        <h3 className="text-[#722F37] font-bold tracking-[0.2em] uppercase text-lg">Send Your Love</h3>
                                        <p className="text-[10px] text-[#8B4513] mt-2">Konfirmasi kehadiran Anda</p>
                                    </div>
                                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#D4AF37]/10 relative z-10">
                                        <RsvpForm
                                            whatsappNumber={engagement.rsvp_settings.whatsapp_number}
                                            messageTemplate={engagement.rsvp_settings.message_template}
                                            themeColor="#722F37"
                                        />
                                    </div>
                                </section>
                            )}

                            <footer className="py-12 text-center text-[#8B4513] text-[10px] bg-[#F9F6EE] border-t border-[#D4AF37]/10">
                                <p className="mb-3 font-serif italic text-lg opacity-60">Maturnuwun</p>
                                <p className="uppercase tracking-widest opacity-40">Created with Love</p>
                            </footer>
                        </div>
                    </div>
                </div>
            )}

            {/* === 5. FLOATING CONTROLS === */}
            {view !== 'COVER' && (
                <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-3 anim-enter-right">
                    <button className="w-11 h-11 bg-gradient-to-br from-[#D4AF37] to-[#B08D26] rounded-full flex items-center justify-center text-[#722F37] shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform border border-[#FFF8DC]/20">
                        <Gift size={20} />
                    </button>
                    <button onClick={toggleMusic} className="w-11 h-11 bg-gradient-to-br from-[#D4AF37] to-[#B08D26] rounded-full flex items-center justify-center text-[#722F37] shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform border border-[#FFF8DC]/20">
                        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                    <button className="w-11 h-11 bg-gradient-to-br from-[#D4AF37] to-[#B08D26] rounded-full flex items-center justify-center text-[#722F37] shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform border border-[#FFF8DC]/20">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                </div>
            )}

            {/* === 6. BOTTOM NAVIGATION === */}
            {view !== 'COVER' && (
                <div className="fixed bottom-0 inset-x-0 h-20 bg-[#2c1215]/90 backdrop-blur-xl border-t border-[#D4AF37]/30 z-50 flex justify-evenly items-center px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] anim-enter-up pb-2">
                    {[
                        { id: 'QUOTES', icon: BookOpen, label: 'Quotes', action: () => changeView('QUOTES') },
                        { id: 'Couple', icon: Heart, label: 'Couple', action: () => changeView('CONTENT', 'couple') },
                        { id: 'CONTENT', icon: Calendar, label: 'Event', action: () => changeView('CONTENT') },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.action}
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${view === item.id ? 'text-[#D4AF37] bg-white/5' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={22} className={view === item.id ? 'fill-[#D4AF37]' : ''} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default MaroonVintage;
