// Path: /templates/RusticWood.tsx
import React from 'react';
import { InvitationData } from '../types/invitation';
import { MapPin, Calendar } from 'lucide-react';

const RusticWood: React.FC<{ data: InvitationData }> = ({ data }) => {
    const { content } = data;
    return (
        <div className="min-h-full bg-[#F5F1E8] text-[#4A3621] pb-20 font-serif">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Satisfy&family=Merriweather:wght@300;400;700&display=swap');
                .font-script { font-family: 'Satisfy', cursive; }
                .font-rustic { font-family: 'Merriweather', serif; }
                .wood-texture { 
                    background-image: 
                        repeating-linear-gradient(90deg, rgba(139, 90, 43, 0.05) 0px, transparent 2px, transparent 10px),
                        repeating-linear-gradient(0deg, rgba(139, 90, 43, 0.05) 0px, transparent 2px, transparent 10px);
                }
            `}</style>

            {/* Hero Section */}
            <div className="relative h-[500px] wood-texture">
                <img src={content.hero.main_image || "https://placehold.co/400x600"} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Couple" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#4A3621]/30 via-transparent to-[#F5F1E8]"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 text-center px-6">
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl border-4 border-[#8B5A2B]/20">
                        <p className="font-rustic text-[10px] tracking-[0.3em] uppercase mb-3 text-[#8B5A2B]">Join Us</p>
                        <h1 className="font-script text-5xl mb-3 text-[#4A3621] leading-tight">{content.hero.nicknames}</h1>
                        <div className="flex items-center gap-2 justify-center text-xs text-gray-600 font-rustic">
                            <Calendar size={12} />
                            <span>{content.hero.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Couples Section */}
            <div className="py-12 px-6 space-y-8">
                {['pria', 'wanita'].map((k) => (
                    <div key={k} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#8B5A2B]/10 text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#8B5A2B]/30 shadow-md">
                            <img src={content.couples[k as 'pria' | 'wanita'].photo || "https://placehold.co/300"} className="w-full h-full object-cover" alt={k} />
                        </div>
                        <h3 className="font-rustic text-xl font-bold text-[#4A3621] mb-1">{content.couples[k as 'pria' | 'wanita'].name}</h3>
                        <p className="text-xs text-gray-500 font-rustic">{content.couples[k as 'pria' | 'wanita'].parents}</p>
                    </div>
                ))}
            </div>

            {/* Events */}
            <div className="px-4 pb-12 space-y-4">
                {['akad', 'resepsi'].map((k) => (
                    <div key={k} className="bg-[#8B5A2B]/5 p-6 rounded-xl border border-[#8B5A2B]/20 wood-texture">
                        <h3 className="font-script text-3xl text-[#8B5A2B] mb-3 text-center capitalize">{k}</h3>
                        <div className="space-y-2 text-center font-rustic text-sm">
                            <div className="flex items-center justify-center gap-2">
                                <Calendar size={14} className="text-[#8B5A2B]" />
                                <span>{content.events[k as 'akad' | 'resepsi'].date} • {content.events[k as 'akad' | 'resepsi'].time}</span>
                            </div>
                            <p className="font-bold text-[#4A3621]">{content.events[k as 'akad' | 'resepsi'].venue}</p>
                            <div className="flex items-start justify-center gap-2">
                                <MapPin size={14} className="text-[#8B5A2B] mt-0.5" />
                                <p className="text-xs text-gray-600 max-w-[250px]">{content.events[k as 'akad' | 'resepsi'].address}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RusticWood;
