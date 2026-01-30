import React, { forwardRef } from 'react';
import { InvitationData } from '../types/invitation';

interface StoryProps {
    data: InvitationData;
    guestName: string;
    wish: string;
}

export const InstagramStoryTemplate = forwardRef<HTMLDivElement, StoryProps>(({ data, guestName, wish }, ref) => {
    // Determine image source (fallback to placeholder if empty)
    const bgImage = data.content.hero.main_image || "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

    // Parse Date for pretty display
    const dateObj = new Date(data.content.hero.date);
    const dateFormatted = `${dateObj.getDate()} • ${dateObj.getMonth() + 1} • ${dateObj.getFullYear()}`;

    return (
        <div ref={ref} className="w-[1080px] h-[1920px] bg-white relative overflow-hidden flex flex-col font-serif text-center">
            {/* Top 2/3 - Main Photo */}
            <div className="absolute top-0 left-0 w-full h-[65%]">
                <img
                    src={bgImage}
                    alt="Couple"
                    className="w-full h-full object-cover grayscale-[0.1]"
                />
                {/* Gradient Overlay from bottom */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            </div>

            {/* Content Container - Overlapping the image */}
            <div className="relative z-10 mt-[1100px] flex flex-col items-center px-16">
                {/* Names */}
                <h1 className="text-8xl text-[#4A5D46] mb-6 font-medium" style={{ fontFamily: 'Cinzel, serif' }}>
                    {data.content.couples.wanita.name.split(' ')[0]} & {data.content.couples.pria.name.split(' ')[0]}
                </h1>

                {/* Date */}
                <p className="text-4xl text-[#6B705C] mb-8 tracking-[0.2em] font-medium opacity-80" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {dateFormatted}
                </p>

                <p className="text-2xl text-[#6B705C] italic mb-10 opacity-70">Wish</p>

                {/* Wish Card */}
                <div className="w-full bg-[#6B705C] text-[#F0F2E9] p-12 rounded-[3rem] shadow-xl text-center min-h-[300px] flex flex-col justify-center items-center">
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
            <div className="absolute bottom-12 left-0 w-full flex justify-center text-[#6B705C] text-xl font-medium tracking-widest opacity-60">
                <span>@rfx.builder</span>
            </div>

            {/* Styles for fonts to ensure they load in the captured image */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
            `}</style>
        </div>
    );
});

InstagramStoryTemplate.displayName = 'InstagramStoryTemplate';
