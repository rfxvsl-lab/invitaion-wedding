// Path: /templates/DarkLuxury.tsx
import React from 'react';
import { InvitationData } from '../types/invitation';

const DarkLuxury: React.FC<{ data: InvitationData }> = ({ data }) => {
    const { content } = data;
    return (
        <div className="min-h-full bg-[#121212] text-[#E2E8F0] pb-20 font-serif">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700&family=Source+Sans+Pro:wght@300;400&display=swap');
        .text-gold { color: transparent; background-clip: text; background-image: linear-gradient(to right, #BF953F, #FCF6BA, #B38728); }
        .border-gold { border-image: linear-gradient(to right, #BF953F, #FCF6BA, #B38728) 1; }
      `}</style>

            <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-black via-[#1a1a1a] to-black">
                <p className="font-source text-[10px] tracking-[0.4em] text-[#888] mb-6 uppercase">Exclusive Invitation</p>
                <h1 className="font-playfair text-5xl md:text-6xl mb-6 leading-tight text-gold">{content.hero.nicknames}</h1>
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#BF953F] to-transparent mx-auto mb-6"></div>
                <p className="font-source text-sm tracking-wider text-gray-400">{content.hero.date}</p>
            </div>

            <div className="px-6 py-12">
                <div className="border border-[#333] p-8 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] px-4 text-gold font-playfair text-xl">Events</div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-gold text-lg mb-1">Akad Nikah</h3>
                            <p className="text-xs text-gray-400">{content.events.akad.venue}</p>
                        </div>
                        <div>
                            <h3 className="text-gold text-lg mb-1">Reception</h3>
                            <p className="text-xs text-gray-400">{content.events.resepsi.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DarkLuxury;