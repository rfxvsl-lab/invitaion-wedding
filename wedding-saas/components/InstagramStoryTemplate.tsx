import React, { forwardRef } from 'react';
import { InvitationData } from '../types/invitation';

interface StoryProps {
    data: InvitationData;
    guestName: string;
    wish: string;
}

// Theme Configuration Map
const THEME_STYLES: Record<string, { fontTitle: string; fontBody: string; colorPrimary: string; colorSecondary: string; bg: string }> = {
    'modern-arch': { fontTitle: 'Cormorant Garamond, serif', fontBody: 'Open Sans, sans-serif', colorPrimary: '#A48874', colorSecondary: '#2D2D2D', bg: '#F8F9FA' },
    'classic-serif': { fontTitle: 'Playfair Display, serif', fontBody: 'Lato, sans-serif', colorPrimary: '#2C3E50', colorSecondary: '#34495E', bg: '#FFFFFF' },
    'botanical-line': { fontTitle: 'Cinzel, serif', fontBody: 'Montserrat, sans-serif', colorPrimary: '#4A5D46', colorSecondary: '#6B705C', bg: '#F0F2E9' },
    'rustic-wood': { fontTitle: 'Merriweather, serif', fontBody: 'Roboto, sans-serif', colorPrimary: '#8B4513', colorSecondary: '#5D4037', bg: '#FFF8E1' },
    'dark-luxury': { fontTitle: 'Great Vibes, cursive', fontBody: 'Raleway, sans-serif', colorPrimary: '#FFD700', colorSecondary: '#E0E0E0', bg: '#1A1A1A' },
};

export const InstagramStoryTemplate = forwardRef<HTMLDivElement, StoryProps>(({ data, guestName, wish }, ref) => {
    // Determine image source (fallback to placeholder if empty)
    const bgImage = data.content.hero.main_image || "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

    // Get Theme Styles (Default to modern-arch if not found)
    const themeId = data.metadata.theme_id || 'modern-arch';
    const theme = THEME_STYLES[themeId] || THEME_STYLES['modern-arch'];

    // Parse Date for pretty display
    const dateObj = new Date(data.content.hero.date);
    const dateFormatted = `${dateObj.getDate()} • ${dateObj.getMonth() + 1} • ${dateObj.getFullYear()}`;

    return (
        <div ref={ref} className="w-[1080px] h-[1920px] relative overflow-hidden flex flex-col text-center" style={{ backgroundColor: theme.bg, fontFamily: theme.fontBody }}>
            {/* SPECIAL DESIGN FOR PREMIUM-PEPPY */}
            {themeId === 'premium-peppy' ? (
                <div className="w-full h-full relative" style={{ backgroundColor: '#FFF8F0' }}>
                    {/* Blob Background */}
                    <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-[#E07A5F] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#81B29A] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#F2CC8F] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                    {/* Image Frame */}
                    <div className="mt-32 mx-auto w-[600px] h-[800px] rounded-[100px] border-8 border-white shadow-2xl overflow-hidden transform rotate-2">
                        <img src={bgImage} alt="Couple" className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="mt-24 text-center px-12">
                        <p className="text-2xl font-bold tracking-[0.2em] uppercase text-[#E07A5F] mb-4">The Wedding Of</p>
                        <h1 className="text-8xl mb-8 text-[#3D405B]" style={{ fontFamily: 'Grand Hotel, cursive' }}>{data.content.hero.nicknames}</h1>

                        {/* Wish Card */}
                        {wish && (
                            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-12 rounded-[3rem] shadow-lg max-w-3xl mx-auto">
                                <p className="text-3xl italic mb-6 text-[#3D405B]">"{wish}"</p>
                                <div className="w-full h-[1px] bg-[#3D405B]/20 my-6"></div>
                                <p className="text-2xl font-bold text-[#E07A5F] uppercase tracking-widest">{guestName}</p>
                            </div>
                        )}

                        <div className="mt-24">
                            <p className="text-3xl font-bold text-[#3D405B]">{dateFormatted}</p>
                        </div>
                    </div>
                </div>
            ) : themeId === 'gamer-quest' ? (
                /* SPECIAL DESIGN FOR GAMER-QUEST (VIP) */
                <div className="w-full h-full relative bg-black text-[#00f3ff]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {/* Cyber Grid Background */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(#bc13fe 1px, transparent 1px), linear-gradient(90deg, #bc13fe 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

                    {/* Neon HUD Borders */}
                    <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-[#00f3ff] rounded-3xl" style={{ boxShadow: '0 0 20px #00f3ff, inset 0 0 20px #00f3ff' }}></div>

                    {/* Hero Image in Hexagon Clip or Glitch Frame */}
                    <div className="mt-32 mx-auto w-[700px] h-[700px] relative">
                        <div className="absolute inset-0 border-4 border-[#bc13fe] transform rotate-3 shadow-[0_0_30px_#bc13fe]"></div>
                        <div className="absolute inset-0 border-4 border-[#00f3ff] transform -rotate-2"></div>
                        <img src={bgImage} alt="Player" className="w-full h-full object-cover grayscale contrast-125" />
                        {/* Overlay Glitch Text */}
                        <div className="absolute bottom-4 left-0 bg-black/80 px-4 py-2 border border-[#00f3ff]">
                            <p className="text-xl font-bold tracking-widest">PLAYER 1 & 2 JOINED</p>
                        </div>
                    </div>

                    <div className="mt-20 text-center px-12 relative z-10">
                        <p className="text-4xl font-bold text-[#bc13fe] mb-4 tracking-[0.3em] font-sans">MISSION START</p>
                        <h1 className="text-9xl mb-8 text-white uppercase" style={{ textShadow: '4px 4px 0px #bc13fe' }}>{data.content.hero.nicknames}</h1>
                        <p className="text-4xl text-gray-400 font-mono mb-12">{dateFormatted}</p>

                        {/* Wish Content (Cyber Box) */}
                        {wish && (
                            <div className="bg-[#111] border-l-8 border-[#00f3ff] p-10 max-w-3xl mx-auto shadow-2xl relative">
                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#bc13fe]"></div>
                                <p className="text-3xl text-white font-mono leading-relaxed blink-caret">"{wish}"</p>
                                <p className="text-2xl text-[#00f3ff] font-bold mt-6 uppercase text-right">__{guestName}</p>
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-20 w-full text-center">
                        <p className="text-2xl text-[#bc13fe] animate-pulse">PRESS START TO CONTINUE</p>
                    </div>
                </div>
            ) : themeId === 'maroon-vintage' ? (
                /* SPECIAL DESIGN FOR MAROON VINTAGE (No-Photo) */
                <div className="w-full h-full relative" style={{ backgroundColor: '#722F37', color: '#D4AF37' }}>
                    {/* Texture */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

                    {/* Ornamental Border */}
                    <div className="absolute top-12 left-12 right-12 bottom-12 border-4 border-[#D4AF37] flex items-center justify-center p-8">
                        <div className="border border-[#D4AF37] w-full h-full flex flex-col justify-between py-24 px-12 relative text-center">
                            {/* Corners */}
                            <div className="absolute top-4 left-4 text-6xl">╔</div>
                            <div className="absolute top-4 right-4 text-6xl">╗</div>
                            <div className="absolute bottom-4 left-4 text-6xl">╚</div>
                            <div className="absolute bottom-4 right-4 text-6xl">╝</div>

                            <div className="space-y-8">
                                <p className="text-3xl font-serif tracking-[0.4em] uppercase mb-12">The Wedding Of</p>
                                <h1 className="text-8xl mb-8 leading-tight" style={{ fontFamily: 'Great Vibes, cursive', color: '#EFDBB2' }}>{data.content.hero.nicknames}</h1>

                                <div className="flex justify-center items-center my-12 opacity-80">
                                    <div className="h-[2px] w-24 bg-[#D4AF37]"></div>
                                    <div className="mx-4 text-[#D4AF37] text-4xl">❦</div>
                                    <div className="h-[2px] w-24 bg-[#D4AF37]"></div>
                                </div>

                                <p className="text-5xl font-serif">{dateFormatted}</p>
                            </div>

                            {wish && (
                                <div className="bg-[#60232b] p-12 border border-[#D4AF37]/50 relative mt-12">
                                    <p className="text-4xl italic font-serif leading-relaxed text-[#EFDBB2]">"{wish}"</p>
                                    <p className="text-2xl font-bold mt-8 uppercase tracking-widest text-[#D4AF37]">- {guestName} -</p>
                                </div>
                            )}

                            <div className="mt-auto">
                                <p className="text-2xl opacity-60 font-serif">@rfx.builder</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* GENERIC / STANDARD DESIGN */
                <>
                    {/* Top 2/3 - Main Photo */}
                    <div className="absolute top-0 left-0 w-full h-[65%]">
                        <img
                            src={bgImage}
                            alt="Couple"
                            className="w-full h-full object-cover grayscale-[0.1]"
                        />
                        {/* Gradient Overlay from bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-64" style={{ background: `linear-gradient(to top, ${theme.bg}, transparent)` }}></div>
                    </div>

                    {/* Content Container - Overlapping the image */}
                    <div className="relative z-10 mt-[1100px] flex flex-col items-center px-16">
                        {/* Names */}
                        <h1 className="text-8xl mb-6 font-medium" style={{ fontFamily: theme.fontTitle, color: theme.colorPrimary }}>
                            {data.content.couples.wanita.name.split(' ')[0]} & {data.content.couples.pria.name.split(' ')[0]}
                        </h1>

                        {/* Date */}
                        <p className="text-4xl mb-8 tracking-[0.2em] font-medium opacity-80" style={{ color: theme.colorSecondary }}>
                            {dateFormatted}
                        </p>

                        <p className="text-2xl italic mb-10 opacity-70" style={{ color: theme.colorSecondary }}>Wish</p>

                        {/* Wish Card */}
                        <div className="w-full p-12 rounded-[3rem] shadow-xl text-center min-h-[300px] flex flex-col justify-center items-center" style={{ backgroundColor: theme.colorPrimary, color: '#fff' }}>
                            {wish ? (
                                <>
                                    <p className="text-4xl italic mb-6 leading-relaxed font-light">"{wish}"</p>
                                    <p className="text-2xl font-bold uppercase tracking-widest opacity-80">- {guestName || 'Guest'} -</p>
                                </>
                            ) : (
                                <p className="text-3xl italic opacity-50">Menunggu ucapan...</p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-12 left-0 w-full flex justify-center text-xl font-medium tracking-widest opacity-60" style={{ color: theme.colorSecondary }}>
                        <span>@rfx.builder</span>
                    </div>
                </>
            )}

            {/* Styles for fonts to ensure they load in the captured image */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:wght@400;600&family=Great+Vibes&family=Merriweather:wght@300;700&family=Montserrat:wght@300;500&family=Open+Sans:wght@300;600&family=Lato:wght@300;400&family=Raleway:wght@300;500&family=Roboto:wght@300;500&family=Outfit:wght@300;500;700&family=Grand+Hotel&display=swap');
            `}</style>
        </div>
    );
});

InstagramStoryTemplate.displayName = 'InstagramStoryTemplate';
