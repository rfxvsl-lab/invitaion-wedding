// Path: /templates/ModernArch.tsx
import React from 'react';
import { InvitationData } from '../types/invitation';
import { MapPin, Calendar, Clock } from 'lucide-react';

const ModernArch: React.FC<{ data: InvitationData }> = ({ data }) => {
    const { content } = data;
    return (
        <div className="min-h-full bg-[#F8F9FA] text-[#2D2D2D] font-sans pb-20 overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@300;400;600&display=swap');
        .font-arch-serif { font-family: 'Cormorant Garamond', serif; }
        .font-arch-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>

            {/* Hero */}
            <div className="relative h-[550px] bg-white rounded-b-[50%] shadow-xl overflow-hidden">
                <img src={content.hero.main_image || "https://placehold.co/400x600"} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Main" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 text-center px-6">
                    <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[#A48874] font-bold font-arch-sans">The Wedding Of</p>
                    <h1 className="font-arch-serif text-5xl mb-4 text-[#2D2D2D] leading-tight">{content.hero.nicknames}</h1>
                    <div className="bg-[#A48874] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {content.hero.date}
                    </div>
                </div>
            </div>

            {/* Couple */}
            <div className="py-16 px-6">
                <div className="flex flex-col gap-10">
                    {['pria', 'wanita'].map((k) => (
                        <div key={k} className="flex flex-col items-center text-center">
                            <div className="w-40 h-52 rounded-t-[100px] border-4 border-white shadow-xl overflow-hidden mb-4 relative">
                                <img src={content.couples[k as 'pria' | 'wanita'].photo || "https://placehold.co/300x400"} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-arch-serif text-2xl font-bold">{content.couples[k as 'pria' | 'wanita'].name}</h3>
                            <p className="font-arch-sans text-[10px] text-gray-500 max-w-[200px]">{content.couples[k as 'pria' | 'wanita'].parents}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Events */}
            <div className="px-4 space-y-4">
                {['akad', 'resepsi'].map((k) => (
                    <div key={k} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
                        <h3 className="font-arch-serif text-2xl capitalize text-[#A48874] mb-4">{k}</h3>
                        <div className="flex justify-center gap-4 text-xs font-arch-sans text-gray-600 mb-4">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {content.events[k as 'akad' | 'resepsi'].date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {content.events[k as 'akad' | 'resepsi'].time}</span>
                        </div>
                        <p className="font-bold text-gray-800 mb-1">{content.events[k as 'akad' | 'resepsi'].venue}</p>
                        <p className="text-xs text-gray-500 px-4">{content.events[k as 'akad' | 'resepsi'].address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModernArch;
