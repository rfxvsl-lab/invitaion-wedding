import React, { useState, useRef } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, ArrowDown, Music, Gift
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { mapToTemplateData } from '../utils/templateMapper';
import RsvpForm from '../components/RsvpForm';

const PremiumFloralTemplate: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = "Tamu Undangan" }) => {
    // --- STATE & REFS ---
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const giftRef = useRef<HTMLElement>(null);

    const ASSETS = {
        bg: '/themes/premium-floral/bg-1.png',
        bouquet: '/themes/premium-floral/bouquet.png',
        cornerTop: '/themes/premium-floral/corner-top.png',
        cornerBottom: '/themes/premium-floral/corner-bottom.png',
        separator: '/themes/premium-floral/separator.png',
    };

    const getImg = (url: string) => url || "https://placehold.co/400x600?text=No+Image";
    const invitation = mapToTemplateData(data);

    if (!invitation) return null;

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Nomor rekening berhasil disalin.");
    };

    // --- RENDER HELPERS ---
    const SectionDivider = () => (
        <div className="flex items-center justify-center py-12 opacity-80">
            <img src={ASSETS.separator} alt="separator" className="h-8 md:h-12 w-auto object-contain" />
        </div>
    );

    const formatDate = (dateUnparsed: string | undefined) => {
        if (!dateUnparsed) return "";
        try {
            const date = new Date(dateUnparsed);
            if (isNaN(date.getTime())) return dateUnparsed;
            return date.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateUnparsed;
        }
    };

    return (
        <div
            className="min-h-screen bg-[#FFF0F5] text-[#4A4A4A] font-sans overflow-x-hidden selection:bg-[#FFB6C1] selection:text-white relative"
            style={{
                backgroundImage: `url(${ASSETS.bg})`,
                backgroundSize: '400px', // Pattern repeat size
                backgroundRepeat: 'repeat'
            }}
        >
            {/* INJECT FONTS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel+Decorative:wght@400;700&family=Lato:wght@300;400;700&display=swap');
                .font-vibes { font-family: 'Great Vibes', cursive; }
                .font-cinzel { font-family: 'Cinzel Decorative', serif; }
                .font-lato { font-family: 'Lato', sans-serif; }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1.5s ease-out forwards;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>

            {/* AUDIO */}
            {invitation.metadata.music_url && (
                <audio ref={audioRef} src={invitation.metadata.music_url} loop />
            )}

            {/* === COVER SECTION === */}
            <div
                className={`fixed inset-0 z-50 bg-[#FFF0F5] transition-transform duration-[1500ms] ease-in-out flex flex-col items-center justify-center ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
                style={{ backgroundImage: `url(${ASSETS.bg})` }}
            >
                {/* Decorative Corners */}
                <img src={ASSETS.cornerTop} className="absolute top-0 left-0 w-32 md:w-48 opacity-80 pointer-events-none" alt="" />
                <img src={ASSETS.cornerTop} className="absolute top-0 right-0 w-32 md:w-48 opacity-80 scale-x-[-1] pointer-events-none" alt="" />
                <img src={ASSETS.cornerBottom} className="absolute bottom-0 left-0 w-32 md:w-48 opacity-80 pointer-events-none" alt="" />
                <img src={ASSETS.cornerBottom} className="absolute bottom-0 right-0 w-32 md:w-48 opacity-80 scale-x-[-1] pointer-events-none" alt="" />

                <div className="relative z-10 text-center px-8 animate-fade-in-up w-full max-w-lg">
                    <img src={ASSETS.bouquet} alt="Bouquet" className="w-40 md:w-56 mx-auto mb-6 animate-float drop-shadow-xl" />

                    <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#8B4513] mb-4">{invitation.texts.hero_title}</p>
                    <h1 className="font-vibes text-6xl md:text-7xl text-[#D2691E] mb-6 leading-tight drop-shadow-sm">
                        {invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}
                    </h1>

                    <p className="font-lato italic text-lg mb-8 text-[#555]">
                        {formatDate(invitation.hero.wedding_date_time) || invitation.hero.wedding_date_time}
                    </p>

                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-[#D2691E]/30 shadow-lg mb-8 mx-4">
                        <p className="font-lato text-xs text-[#999] italic tracking-wide mb-1">Kepada Yth,</p>
                        <p className="font-cinzel text-xl font-bold text-[#D2691E]">{guestName}</p>
                    </div>

                    <button
                        onClick={handleOpen}
                        className="group relative px-10 py-3 bg-[#D2691E] text-white font-lato text-sm font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:bg-[#A0522D] transition-all hover:scale-105"
                    >
                        {invitation.texts.open_button}
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div ref={contentRef} className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

                {/* HEADER */}
                <header className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>

                    <img src={ASSETS.bouquet} alt="Bouquet" className="w-24 md:w-32 mx-auto mb-6 opacity-80" />
                    <p className="font-lato text-xs tracking-[0.3em] text-[#D2691E] mb-4 uppercase">{invitation.texts.hero_subtitle}</p>
                    <h2 className="font-vibes text-6xl md:text-8xl text-[#4A4A4A] mb-6">
                        {invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}
                    </h2>
                    <p className="font-cinzel text-lg text-[#666] mt-2">
                        {formatDate(invitation.hero.wedding_date_time)}
                    </p>
                </header>

                {/* QUOTE */}
                <section className="py-16 px-8 max-w-3xl mx-auto text-center relative">
                    <div className="text-[#D2691E] text-6xl font-serif absolute -top-4 left-4 opacity-20">“</div>
                    <p className="font-lato text-xl leading-relaxed italic text-[#555] mb-6 relative z-10">
                        "{invitation.quotes.content}"
                    </p>
                    <p className="font-cinzel text-sm font-bold text-[#D2691E]">
                        — {invitation.quotes.source} —
                    </p>
                    <div className="text-[#D2691E] text-6xl font-serif absolute -bottom-10 right-4 opacity-20">”</div>
                </section>

                <SectionDivider />

                {/* COUPLE */}
                <section className="py-10 px-6 max-w-5xl mx-auto">
                    <h3 className="font-cinzel text-4xl text-center mb-16 text-[#D2691E]">{invitation.texts.couple_title}</h3>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Groom */}
                        <div className="text-center group bg-white/50 p-8 rounded-full border border-[#D2691E]/20 shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#FFF] shadow-lg">
                                <img
                                    src={getImg(invitation.couple.groom.photo_url)}
                                    alt="Groom"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <h4 className="font-cinzel text-2xl font-bold mb-2 text-[#4A4A4A]">{invitation.couple.groom.full_name}</h4>
                            <p className="font-lato text-sm italic text-[#888] mb-1">Putra dari</p>
                            <p className="font-lato text-base mb-4">{invitation.couple.groom.parent_names}</p>
                            {invitation.couple.groom.instagram_handle && (
                                <a href={`https://instagram.com/${invitation.couple.groom.instagram_handle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#D2691E]">
                                    <Instagram size={18} /> @{invitation.couple.groom.instagram_handle}
                                </a>
                            )}
                        </div>

                        {/* Bride */}
                        <div className="text-center group bg-white/50 p-8 rounded-full border border-[#D2691E]/20 shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#FFF] shadow-lg">
                                <img
                                    src={getImg(invitation.couple.bride.photo_url)}
                                    alt="Bride"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <h4 className="font-cinzel text-2xl font-bold mb-2 text-[#4A4A4A]">{invitation.couple.bride.full_name}</h4>
                            <p className="font-lato text-sm italic text-[#888] mb-1">Putri dari</p>
                            <p className="font-lato text-base mb-4">{invitation.couple.bride.parent_names}</p>
                            {invitation.couple.bride.instagram_handle && (
                                <a href={`https://instagram.com/${invitation.couple.bride.instagram_handle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#D2691E]">
                                    <Instagram size={18} /> @{invitation.couple.bride.instagram_handle}
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* EVENTS */}
                <section className="py-16 px-6 max-w-4xl mx-auto">
                    <h3 className="font-cinzel text-4xl text-center mb-16 text-[#D2691E]">{invitation.texts.events_title}</h3>

                    <div className="space-y-8">
                        {/* Akad */}
                        {invitation.events.akad.enabled !== false && (
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-l-8 border-[#D2691E] relative overflow-hidden">
                                <img src={ASSETS.cornerTop} className="absolute -top-10 -right-10 w-40 opacity-10 rotate-180" alt="" />

                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="text-center md:text-left flex-1 z-10">
                                        <h4 className="font-vibes text-4xl md:text-5xl mb-4 text-[#D2691E]">{invitation.texts.akad_title}</h4>
                                        <div className="space-y-2 font-lato text-[#555]">
                                            <p className="flex items-center justify-center md:justify-start gap-2">
                                                <Calendar size={18} className="text-[#D2691E]" /> {invitation.events.akad.date}
                                            </p>
                                            <p className="flex items-center justify-center md:justify-start gap-2">
                                                <Clock size={18} className="text-[#D2691E]" /> {invitation.events.akad.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-right flex-1 z-10">
                                        <div className="inline-block p-4 bg-[#FFF0F5] rounded-xl mb-4">
                                            <MapPin size={32} className="text-[#D2691E]" />
                                        </div>
                                        <p className="font-bold text-lg mb-1">{invitation.events.akad.location_name}</p>
                                        <p className="text-sm opacity-70 mb-4">{invitation.events.akad.address}</p>
                                        {invitation.events.akad.map_url && (
                                            <a href={invitation.events.akad.map_url} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-[#4A4A4A] text-white text-xs font-bold rounded-full hover:bg-[#D2691E] transition-colors">
                                                VIEW MAP
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Resepsi */}
                        {invitation.events.resepsi.enabled !== false && (
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-r-8 border-[#D2691E] relative overflow-hidden">
                                <img src={ASSETS.cornerBottom} className="absolute -bottom-10 -left-10 w-40 opacity-10" alt="" />

                                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                                    <div className="text-center md:text-right flex-1 z-10">
                                        <h4 className="font-vibes text-4xl md:text-5xl mb-4 text-[#D2691E]">{invitation.texts.resepsi_title}</h4>
                                        <div className="space-y-2 font-lato text-[#555]">
                                            <p className="flex items-center justify-center md:justify-end gap-2">
                                                <Calendar size={18} className="text-[#D2691E]" /> {invitation.events.resepsi.date}
                                            </p>
                                            <p className="flex items-center justify-center md:justify-end gap-2">
                                                <Clock size={18} className="text-[#D2691E]" /> {invitation.events.resepsi.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left flex-1 z-10">
                                        <div className="inline-block p-4 bg-[#FFF0F5] rounded-xl mb-4">
                                            <Gift size={32} className="text-[#D2691E]" />
                                        </div>
                                        <p className="font-bold text-lg mb-1">{invitation.events.resepsi.location_name}</p>
                                        <p className="text-sm opacity-70 mb-4">{invitation.events.resepsi.address}</p>
                                        {invitation.events.resepsi.map_url && (
                                            <a href={invitation.events.resepsi.map_url} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-[#4A4A4A] text-white text-xs font-bold rounded-full hover:bg-[#D2691E] transition-colors">
                                                VIEW MAP
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <SectionDivider />

                {/* GALLERY */}
                {invitation.gallery.images && invitation.gallery.images.length > 0 && (
                    <section className="py-16 px-6">
                        <h3 className="font-cinzel text-4xl text-center mb-12 text-[#D2691E]">{invitation.texts.gallery_title}</h3>

                        {invitation.gallery.video_url && (
                            <div className="mb-16 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={`${invitation.gallery.video_url}${invitation.gallery.video_url.includes('?') ? '&' : '?'}controls=0&rel=0&modestbranding=1`}
                                        className="w-full h-full"
                                        allowFullScreen
                                        allow="autoplay; encrypted-media"
                                        title="Prewedding Video"
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                            {invitation.gallery.images.map((img, idx) => (
                                <div key={idx} className="relative overflow-hidden aspect-square rounded-lg shadow-md group">
                                    <img
                                        src={getImg(img)}
                                        alt="Gallery"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-[#D2691E]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* GIFTS */}
                {invitation.gifts.bank_accounts && invitation.gifts.bank_accounts.length > 0 && (
                    <section ref={giftRef} className="py-20 px-6 bg-white/60 relative">
                        <img src={ASSETS.cornerTop} className="absolute top-0 right-0 w-32 md:w-48 opacity-50 scale-x-[-1]" alt="" />
                        <div className="max-w-2xl mx-auto text-center relative z-10">
                            <h3 className="font-cinzel text-3xl mb-4 text-[#D2691E]">{invitation.texts.gift_title}</h3>
                            <p className="font-lato italic text-[#666] mb-10">{invitation.texts.gift_text}</p>

                            <div className="space-y-6">
                                {invitation.gifts.bank_accounts.map((bank, idx) => (
                                    <div key={idx} className="p-8 border-2 border-[#D2691E]/30 rounded-2xl bg-white shadow-lg">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gembok.svg/1200px-Gembok.svg.png" className="w-8 h-8 mx-auto mb-4 opacity-20 hidden" alt="" />
                                        <p className="font-lato font-bold uppercase tracking-widest text-[#D2691E] mb-2">{bank.bank_name}</p>
                                        <p className="font-vibes text-4xl mb-2 text-[#4A4A4A]">{bank.account_number}</p>
                                        <p className="font-lato text-sm text-[#666] mb-4">a.n {bank.holder_name}</p>
                                        <button
                                            onClick={() => copyToClipboard(bank.account_number)}
                                            className="inline-flex items-center gap-2 text-xs font-bold bg-[#D2691E] text-white px-6 py-2 rounded-full hover:bg-[#A0522D] transition-all"
                                        >
                                            <Copy size={12} /> SALIN NOMOR
                                        </button>
                                    </div>
                                ))}

                                {invitation.gifts.qris_url && (
                                    <div className="p-8 border-2 border-[#D2691E]/30 rounded-2xl bg-white shadow-lg">
                                        <p className="font-lato font-bold uppercase tracking-widest text-[#D2691E] mb-4">QRIS</p>
                                        <div className="w-48 h-48 mx-auto bg-white p-2 border border-[#eee] mb-4 rounded-lg">
                                            <img src={invitation.gifts.qris_url} alt="QRIS" className="w-full h-full object-contain" />
                                        </div>
                                        <a
                                            href={invitation.gifts.qris_url}
                                            download="qris-code.png"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold bg-[#4A4A4A] text-white px-6 py-2 rounded-full hover:bg-[#000] transition-all"
                                        >
                                            <ArrowDown size={12} /> UNDUH QRIS
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* RSVP */}
                {invitation.rsvp?.enabled && (
                    <section className="py-20 px-6">
                        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border-t-8 border-[#D2691E]">
                            <h3 className="font-cinzel text-3xl mb-8 text-center text-[#D2691E]">Konfirmasi Kehadiran</h3>
                            <RsvpForm
                                whatsappNumber={invitation.rsvp.whatsapp_number}
                                messageTemplate={invitation.rsvp.message_template}
                                themeColor="#D2691E"
                            />
                        </div>
                    </section>
                )}

                {/* FOOTER */}
                <footer className="py-12 text-center bg-[#4A4A4A] text-[#FFF0F5] relative overflow-hidden">
                    <img src={ASSETS.cornerBottom} className="absolute bottom-0 left-0 w-32 opacity-20" alt="" />
                    <img src={ASSETS.cornerBottom} className="absolute bottom-0 right-0 w-32 opacity-20 scale-x-[-1]" alt="" />

                    <p className="font-vibes text-3xl mb-2">{invitation.hero.groom_nickname} & {invitation.hero.bride_nickname}</p>
                    <p className="font-lato text-[10px] tracking-[0.3em] opacity-60 uppercase">{invitation.texts.footer_text}</p>
                </footer>

                <div className="h-24"></div>
            </div>

            {/* === CONTROLS === */}
            {isOpen && (
                <>
                    <button
                        onClick={toggleMusic}
                        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white border-2 border-[#D2691E] rounded-full flex items-center justify-center text-[#D2691E] shadow-lg hover:bg-[#D2691E] hover:text-white transition-all duration-300 animate-spin-slow"
                        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                    >
                        <Music size={18} />
                    </button>

                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md border border-[#D2691E]/30 rounded-full px-6 py-3 shadow-xl flex gap-8 text-[#4A4A4A]">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#D2691E] transition-colors"><Heart size={20} /></button>
                        <button onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })} className="hover:text-[#D2691E] transition-colors"><Calendar size={20} /></button>
                        <button onClick={() => giftRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D2691E] transition-colors"><Gift size={20} /></button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PremiumFloralTemplate;
