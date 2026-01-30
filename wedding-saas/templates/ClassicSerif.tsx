// Path: /templates/ClassicSerif.tsx
import React from 'react';
import { InvitationData } from '../types/invitation';

const ClassicSerif: React.FC<{ data: InvitationData }> = ({ data }) => {
    const { content } = data;
    return (
        <div className="min-h-full bg-[#FFFAF4] p-6 font-serif text-[#3E3E3E]">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap');`}</style>
            <div className="border-4 double border-[#D4AF37] h-full min-h-[80vh] p-8 flex flex-col items-center text-center relative bg-white/50">
                <p className="uppercase tracking-[0.3em] text-[10px] mb-8 mt-10 text-[#666] font-sans">Save The Date</p>
                <h1 className="text-5xl md:text-6xl font-serif italic mb-4 leading-tight">{content.hero.nicknames}</h1>
                <div className="w-16 h-[1px] bg-[#D4AF37] my-6"></div>
                <p className="font-sans text-sm tracking-widest mb-12">{content.hero.date}</p>

                <div className="mt-8 space-y-12 w-full">
                    {['pria', 'wanita'].map(k => (
                        <div key={k}>
                            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border border-[#D4AF37] p-1">
                                <img src={content.couples[k as 'pria' | 'wanita'].photo || "https://placehold.co/300"} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all" />
                            </div>
                            <h3 className="text-xl font-serif">{content.couples[k as 'pria' | 'wanita'].name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassicSerif;
