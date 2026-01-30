// Path: /templates/BotanicalLine.tsx
import React from 'react';
import { InvitationData } from '../types/invitation';

const BotanicalLine: React.FC<{ data: InvitationData }> = ({ data }) => {
    const { content } = data;
    return (
        <div className="min-h-full bg-white relative p-8">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Raleway:wght@300;400;600&display=swap');`}</style>

            {/* Ornaments */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" stroke="#8FBC8F" strokeWidth="0.5"><path d="M0 100 Q 50 50 100 0 M 20 100 Q 60 60 80 0" /></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-40 h-40 opacity-20 pointer-events-none rotate-180">
                <svg viewBox="0 0 100 100" fill="none" stroke="#8FBC8F" strokeWidth="0.5"><path d="M0 100 Q 50 50 100 0 M 20 100 Q 60 60 80 0" /></svg>
            </div>

            <div className="h-[80vh] flex flex-col items-center justify-center text-center z-10 relative">
                <p className="font-raleway text-[10px] tracking-[0.3em] uppercase mb-4 text-gray-400">The Wedding</p>
                <h1 className="font-pinyon text-6xl text-gray-700 mb-6">{content.hero.nicknames}</h1>
                <p className="font-raleway text-xs font-bold text-[#8FBC8F] uppercase tracking-widest border-y border-[#8FBC8F]/30 py-2 px-6">
                    {content.hero.date}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="aspect-[3/4] bg-gray-50 rounded-tl-[50px] overflow-hidden"><img src={content.couples.pria.photo} className="w-full h-full object-cover" /></div>
                <div className="aspect-[3/4] bg-gray-50 rounded-br-[50px] overflow-hidden"><img src={content.couples.wanita.photo} className="w-full h-full object-cover" /></div>
            </div>
        </div>
    );
};

export default BotanicalLine;