import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, MapPin, Calendar, Clock, Heart,
    Copy, Instagram, Music, Gift, Gamepad2, Trophy, Swords
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import RsvpForm from '../components/RsvpForm';

/**
 * TEMPLATE: GAMER'S QUEST (VVIP EDITION)
 * Style: Cyberpunk, Neon, HUD Interface, Interactive
 * Features: Glitch Intro, Character Select, Mini-Game
 */

const GamerQuest: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = "Tamu Undangan" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { content, metadata, engagement } = data;
    const getImg = (url: string) => url || "https://placehold.co/400x600?text=No+Image";

    // --- HANDLERS ---
    const handleOpen = () => {
        setIsOpen(true);
        setIsPlaying(true);
        if (audioRef.current) audioRef.current.play().catch(() => { });
        setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth' }), 800);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Efek spotlight background mengikuti mouse
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // --- MINI GAME COMPONENT (Simple Runner) ---
    const MiniGame = () => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [score, setScore] = useState(0);
        const [gameOver, setGameOver] = useState(false);

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let playerY = 150;
            let velocity = 0;
            let obstacles: { x: number, w: number, h: number }[] = [];
            let frame = 0;
            let gameRunning = true;

            const jump = () => { if (playerY === 150) velocity = -10; };

            // Touch/Click to jump
            const inputHandler = () => jump();
            canvas.addEventListener('touchstart', inputHandler);
            canvas.addEventListener('mousedown', inputHandler);

            const loop = () => {
                if (!gameRunning) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Background (Cyber Grid)
                ctx.strokeStyle = '#bc13fe';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i < canvas.width; i += 40) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
                ctx.stroke();

                // Player (Neon Cube)
                velocity += 0.6; // Gravity
                playerY += velocity;
                if (playerY > 150) { playerY = 150; velocity = 0; }

                ctx.fillStyle = '#00f3ff';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00f3ff';
                ctx.fillRect(50, playerY, 30, 30);
                ctx.shadowBlur = 0;

                // Obstacles
                if (frame % 100 === 0) {
                    obstacles.push({ x: canvas.width, w: 20, h: 40 });
                }
                obstacles.forEach((obs, i) => {
                    obs.x -= 4;
                    ctx.fillStyle = '#ff003c';
                    ctx.fillRect(obs.x, 190 - obs.h, obs.w, obs.h);

                    // Collision Detection
                    if (50 < obs.x + obs.w && 50 + 30 > obs.x && playerY < 190 && playerY + 30 > 190 - obs.h) {
                        gameRunning = false;
                        setGameOver(true);
                    }
                });

                // Ground
                ctx.fillStyle = '#121212';
                ctx.fillRect(0, 180, canvas.width, 20);
                ctx.fillStyle = '#bc13fe';
                ctx.fillRect(0, 180, canvas.width, 2);

                frame++;
                setScore(Math.floor(frame / 10));
                requestAnimationFrame(loop);
            };
            loop();

            return () => {
                canvas.removeEventListener('touchstart', inputHandler);
                canvas.removeEventListener('mousedown', inputHandler);
            };
        }, []);

        return (
            <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-xl">
                <div className="relative border-4 border-[#00f3ff] rounded-lg p-2 bg-[#121212] shadow-[0_0_50px_#00f3ff]">
                    <h3 className="absolute -top-10 left-0 text-[#00f3ff] font-orbitron text-xl">MISSION: LOVE RUN</h3>
                    <div className="absolute top-4 right-4 text-white font-mono text-lg">SCORE: {score}</div>
                    <canvas ref={canvasRef} width={320} height={200} className="bg-[#0a0a0a] rounded cursor-pointer" />
                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                            <h2 className="text-[#ff003c] text-4xl font-orbitron mb-4 animate-pulse">GAME OVER</h2>
                            <button onClick={() => setShowGame(false)} className="text-white border border-white px-6 py-2 hover:bg-white hover:text-black font-bold">EXIT MISSION</button>
                        </div>
                    )}
                </div>
                <p className="mt-4 text-[#bc13fe] animate-pulse text-sm">TAP SCREEN / CLICK TO JUMP</p>
                <button onClick={() => setShowGame(false)} className="absolute top-4 right-4 text-white hover:text-red-500"><Gamepad2 size={32} /></button>
            </div>
        );
    };

    return (
        <div
            className="relative min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#bc13fe] selection:text-white"
            style={
                data.metadata.custom_bg_url
                    ? { backgroundImage: `url(${data.metadata.custom_bg_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
                    : {
                        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #2d1b4e 50%, #1a1f3a 75%, #0a0e27 100%)'
                    }
            }
            onMouseMove={handleMouseMove}
        >
            {/* Overlay for custom background */}
            {data.metadata.custom_bg_url && (
                <div className="fixed inset-0 bg-gradient-to-b from-purple-900/80 to-black/90 z-0" />
            )}
            {/* --- ASSETS & STYLES --- */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;500;700&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        
        /* Neon Glows */
        .neon-text-blue { text-shadow: 0 0 10px #00f3ff, 0 0 20px #00f3ff; }
        .neon-text-purple { text-shadow: 0 0 10px #bc13fe, 0 0 20px #bc13fe; }
        .neon-box { box-shadow: 0 0 15px rgba(0, 243, 255, 0.3), inset 0 0 10px rgba(0, 243, 255, 0.1); }
        
        /* Glitch Effect */
        .glitch-wrapper { position: relative; }
        .glitch-wrapper::before, .glitch-wrapper::after {
            content: attr(data-text);
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        }
        .glitch-wrapper::before {
            left: 2px; text-shadow: -1px 0 #ff003c; clip: rect(24px, 550px, 90px, 0);
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .glitch-wrapper::after {
            left: -2px; text-shadow: -1px 0 #00f3ff; clip: rect(85px, 550px, 140px, 0);
            animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
            0% { clip: rect(10px, 9999px, 30px, 0); }
            20% { clip: rect(80px, 9999px, 100px, 0); }
            100% { clip: rect(10px, 9999px, 120px, 0); }
        }
      `}</style>

            {/* Dynamic Background Spotlight */}
            <div
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(188, 19, 254, 0.15), transparent 40%)`
                }}
            />
            <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

            {metadata.music_url && <audio ref={audioRef} src={metadata.music_url} loop />}
            {showGame && <MiniGame />}

            {/* === LOCK SCREEN (HUD INTERFACE) === */}
            <div className={`fixed inset-0 z-50 bg-[#020204] flex flex-col items-center justify-center p-6 transition-all duration-[800ms] ${isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                {/* Holographic Circle */}
                <div className="absolute w-[300px] h-[300px] border border-[#00f3ff]/30 rounded-full animate-spin-slow"></div>
                <div className="absolute w-[280px] h-[280px] border border-[#bc13fe]/30 rounded-full animate-spin-reverse"></div>

                <div className="relative z-10 text-center w-full max-w-md border border-[#333] bg-black/80 p-10 backdrop-blur-md clip-path-polygon">
                    <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-2">
                        <span className="text-[#00f3ff] text-xs font-mono">SYS.READY</span>
                        <div className="flex gap-1"><div className="w-2 h-2 bg-[#00f3ff]"></div><div className="w-2 h-2 bg-[#bc13fe]"></div></div>
                    </div>

                    <h1 className="font-orbitron text-4xl md:text-5xl mb-2 text-white glitch-wrapper" data-text={content.hero.nicknames}>
                        {content.hero.nicknames}
                    </h1>
                    <p className="font-rajdhani text-lg text-[#bc13fe] tracking-[0.3em] uppercase mb-6">Level 1: The Beginning</p>

                    {/* Guest Name */}
                    <div className="mb-8">
                        <p className="font-rajdhani text-xs text-[#666] italic tracking-wide mb-1">Kepada Yth,</p>
                        <p className="font-orbitron text-base text-[#00f3ff]">{guestName}</p>
                    </div>

                    <button
                        onClick={handleOpen}
                        className="relative group px-10 py-4 bg-transparent overflow-hidden border border-[#00f3ff] text-[#00f3ff] font-orbitron font-bold uppercase tracking-wider hover:text-black transition-colors"
                    >
                        <span className="absolute w-0 h-full bg-[#00f3ff] left-0 top-0 transition-all duration-300 group-hover:w-full -z-10"></span>
                        Start Game
                    </button>
                </div>
            </div>

            {/* === CONTENT === */}
            <div ref={contentRef} className="relative z-10 pb-24">

                {/* 1. HERO (Character Intro) */}
                <header className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00f3ff]/10 via-transparent to-[#050505] z-0"></div>
                    <img src={getImg(content.hero.main_image)} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />

                    <div className="relative z-10 border-y-2 border-[#bc13fe] py-6 bg-black/60 backdrop-blur-sm w-full">
                        <p className="font-rajdhani text-xl text-[#00f3ff] tracking-[5px] mb-2 animate-pulse">NEW PLAYER DETECTED</p>
                        <h2 className="font-orbitron text-6xl md:text-8xl text-white neon-text-blue">{content.hero.nicknames}</h2>
                        <p className="font-mono text-sm text-gray-400 mt-4">{content.hero.date} // MISSION START</p>
                    </div>
                </header>

                {/* 2. CHARACTER SELECT (Couples) */}
                <section className="py-20 px-4">
                    <div className="text-center mb-12">
                        <h3 className="font-orbitron text-3xl text-white border-l-4 border-[#00f3ff] pl-4 inline-block">SELECT CHARACTER</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Groom Card */}
                        <div className="group relative bg-[#111] border border-[#333] p-1 hover:border-[#00f3ff] transition-all duration-300">
                            <div className="relative h-80 overflow-hidden bg-gray-900">
                                <img src={getImg(content.couples.pria.photo)} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0" />
                                <div className="absolute bottom-0 left-0 bg-[#00f3ff] text-black px-4 py-1 font-bold font-orbitron text-xs">PLAYER 1</div>
                            </div>
                            <div className="p-6">
                                <h4 className="font-orbitron text-2xl text-white mb-1">{content.couples.pria.name}</h4>
                                <p className="font-mono text-xs text-[#00f3ff] mb-4">Class: Groom // STR: 99</p>
                                <div className="text-xs text-gray-400 font-rajdhani border-t border-[#333] pt-4">
                                    {content.couples.pria.parents}
                                </div>
                            </div>
                        </div>

                        {/* Bride Card */}
                        <div className="group relative bg-[#111] border border-[#333] p-1 hover:border-[#bc13fe] transition-all duration-300">
                            <div className="relative h-80 overflow-hidden bg-gray-900">
                                <img src={getImg(content.couples.wanita.photo)} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0" />
                                <div className="absolute bottom-0 left-0 bg-[#bc13fe] text-black px-4 py-1 font-bold font-orbitron text-xs">PLAYER 2</div>
                            </div>
                            <div className="p-6">
                                <h4 className="font-orbitron text-2xl text-white mb-1">{content.couples.wanita.name}</h4>
                                <p className="font-mono text-xs text-[#bc13fe] mb-4">Class: Bride // INT: 99</p>
                                <div className="text-xs text-gray-400 font-rajdhani border-t border-[#333] pt-4">
                                    {content.couples.wanita.parents}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. QUEST LOG (Events) */}
                <section className="py-20 px-6 bg-[#0a0a0a] relative overflow-hidden">
                    {/* HUD Lines */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#bc13fe] to-transparent opacity-50"></div>

                    <div className="max-w-4xl mx-auto">
                        <h3 className="font-orbitron text-3xl text-center mb-12 text-[#bc13fe] neon-text-purple">QUEST LOG</h3>

                        <div className="space-y-6">
                            {/* Akad Quest - Optional */}
                            {content.events.akad.enabled !== false && (
                                <div className="bg-[#111]/80 backdrop-blur border-l-4 border-[#00f3ff] p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-[#161616] transition-colors relative group">
                                    <div className="absolute top-2 right-2 text-[#00f3ff] opacity-0 group-hover:opacity-100 transition-opacity"><Swords size={20} /></div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-orbitron text-xl text-white mb-2">MAIN QUEST: AKAD</h4>
                                        <p className="font-mono text-xs text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                                            <Clock size={12} /> {content.events.akad.time} // {content.events.akad.date}
                                        </p>
                                        <p className="font-rajdhani text-sm text-[#00f3ff] mt-2">{content.events.akad.venue}</p>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        {content.events.akad.map_url && (
                                            <a href={content.events.akad.map_url} target="_blank" className="block w-full text-center border border-[#00f3ff] text-[#00f3ff] px-6 py-2 text-xs font-bold hover:bg-[#00f3ff] hover:text-black transition-all uppercase tracking-widest">
                                                Track Location
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Resepsi Quest - Optional */}
                            {content.events.resepsi.enabled !== false && (
                                <div className="bg-[#111]/80 backdrop-blur border-l-4 border-[#bc13fe] p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-[#161616] transition-colors relative group">
                                    <div className="absolute top-2 right-2 text-[#bc13fe] opacity-0 group-hover:opacity-100 transition-opacity"><Trophy size={20} /></div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-orbitron text-xl text-white mb-2">FINAL QUEST: PARTY</h4>
                                        <p className="font-mono text-xs text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                                            <Clock size={12} /> {content.events.resepsi.time} // {content.events.resepsi.date}
                                        </p>
                                        <p className="font-rajdhani text-sm text-[#bc13fe] mt-2">{content.events.resepsi.venue}</p>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        {content.events.resepsi.map_url && (
                                            <a href={content.events.resepsi.map_url} target="_blank" className="block w-full text-center border border-[#bc13fe] text-[#bc13fe] px-6 py-2 text-xs font-bold hover:bg-[#bc13fe] hover:text-black transition-all uppercase tracking-widest">
                                                Track Location
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* RSVP FORM SECTION (New Integration) */}
                {engagement.rsvp && (
                    <section className="py-20 px-6 bg-[#050505]">
                        <div className="max-w-md mx-auto relative">
                            {/* Cyber Border for RSVP */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] opacity-50 blur"></div>
                            <div className="relative bg-[#121212] p-6 border border-[#333]">
                                <h3 className="font-orbitron text-2xl text-white text-center mb-6">CONFIRM ATTENDANCE</h3>
                                <RsvpForm
                                    whatsappNumber={data.engagement.rsvp_settings.whatsapp_number}
                                    messageTemplate={data.engagement.rsvp_settings.message_template}
                                    themeColor="#00f3ff"
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* 4. LOOT BOX (Gifts) */}
                {engagement.gifts.length > 0 && (
                    <section className="py-20 px-6 text-center">
                        <Gift className="mx-auto text-[#00f3ff] mb-4 animate-bounce" size={40} />
                        <h3 className="font-orbitron text-2xl text-white mb-8">LOOT DROP (GIFT)</h3>

                        <div className="grid gap-4 max-w-md mx-auto">
                            {engagement.gifts.map((g, i) => (
                                <div key={i} className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] p-6 rounded border border-[#333] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[#00f3ff]/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="flex justify-between items-center relative z-10">
                                        <div className="text-left">
                                            <p className="font-mono text-xs text-[#00f3ff] mb-1">{g.bank}</p>
                                            <p className="font-orbitron text-xl text-white">{g.acc_number}</p>
                                            <p className="text-[10px] text-gray-500 uppercase">{g.holder}</p>
                                        </div>
                                        <button onClick={() => { navigator.clipboard.writeText(g.acc_number); alert("Copied!") }} className="p-2 bg-[#333] hover:bg-[#00f3ff] hover:text-black rounded transition-colors">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. MINI GAME SECTION */}
                <section className="py-24 px-6 text-center bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] border-t border-[#333]">
                    <Gamepad2 className="mx-auto text-[#bc13fe] mb-4 w-16 h-16 animate-pulse" />
                    <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-4">BONUS STAGE</h2>
                    <p className="font-rajdhani text-gray-400 mb-8 max-w-md mx-auto">Selesaikan misi lari tanpa akhir untuk merayakan cinta kami! Kumpulkan poin sebanyak mungkin.</p>

                    <button
                        onClick={() => setShowGame(true)}
                        className="neon-box bg-black border-2 border-[#00f3ff] text-[#00f3ff] px-12 py-4 rounded font-orbitron font-bold text-xl hover:bg-[#00f3ff] hover:text-black transition-all transform hover:scale-105"
                    >
                        PLAY NOW
                    </button>
                </section>

                {/* FOOTER */}
                <footer className="py-12 text-center border-t border-[#111]">
                    <p className="font-orbitron text-xl text-[#00f3ff] mb-2">GAME OVER</p>
                    <p className="font-mono text-[10px] text-gray-600">THANKS FOR PLAYING // {content.hero.nicknames}</p>
                </footer>
            </div>

            {/* === FLOATING HUD NAV === */}
            {isOpen && (
                <div className="fixed bottom-6 w-full z-40 px-6 flex justify-center pointer-events-none">
                    <div className="bg-black/90 backdrop-blur border border-[#333] rounded-full px-8 py-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center gap-8 pointer-events-auto">
                        <button onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-500 hover:text-[#00f3ff] transition-colors"><Heart size={20} /></button>
                        <button className="text-gray-500 hover:text-[#bc13fe] transition-colors"><Trophy size={20} /></button>
                        <div className="w-[1px] h-6 bg-[#333]"></div>
                        <button onClick={toggleMusic} className="text-white hover:text-[#00f3ff] animate-pulse">
                            {isPlaying ? <Music size={20} /> : <Play size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamerQuest;
