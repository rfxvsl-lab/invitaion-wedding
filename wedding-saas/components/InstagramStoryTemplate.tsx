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
