// Path: /components/EditorSidebar.tsx
import React, { useState } from 'react';
import { Layout, Type, Users, Calendar, Gift, Palette, Plus, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { InvitationData } from '../types/invitation';

interface EditorSidebarProps {
    data: InvitationData;
    onUpdate: (path: string, value: any) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ data, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<'content' | 'events' | 'design'>('content');

    // Helper untuk resolve nested value (safe access)
    const getValue = (path: string) => {
        return path.split('.').reduce((o: any, i) => (o ? o[i] : ''), data);
    };

    const Input = ({ label, path, placeholder }: { label: string, path: string, placeholder?: string }) => (
        <div className="mb-4">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
            <input
                value={getValue(path)}
                onChange={(e) => onUpdate(path, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
        </div>
    );

    return (
        <aside className="w-[450px] flex flex-col bg-white border-r border-gray-200 h-full shadow-xl z-20">
            <div className="flex border-b border-gray-100 bg-gray-50/50">
                {['content', 'events', 'design'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600 bg-white' : 'text-gray-400 hover:text-gray-600'}`}>{tab}</button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6 custom-scrollbar">
                {activeTab === 'content' && (
                    <>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-2"><Layout size={14} className="text-indigo-500" /> HERO SECTION</h3>
                            <Input label="Judul / Nicknames" path="content.hero.nicknames" />
                            <Input label="Tanggal (Teks)" path="content.hero.date" placeholder="Contoh: 12 Desember 2024" />
                            <ImageUploader label="Foto Sampul Utama" currentUrl={data.content.hero.main_image} onUpdate={(url) => onUpdate('content.hero.main_image', url)} />
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={14} className="text-indigo-500" /> MEMPELAI</h3>
                            <Input label="Nama Pria" path="content.couples.pria.name" />
                            <Input label="Orang Tua Pria" path="content.couples.pria.parents" />
                            <ImageUploader label="Foto Pria" currentUrl={data.content.couples.pria.photo} onUpdate={(url) => onUpdate('content.couples.pria.photo', url)} />
                            <div className="my-6 border-t border-dashed border-gray-200"></div>
                            <Input label="Nama Wanita" path="content.couples.wanita.name" />
                            <Input label="Orang Tua Wanita" path="content.couples.wanita.parents" />
                            <ImageUploader label="Foto Wanita" currentUrl={data.content.couples.wanita.photo} onUpdate={(url) => onUpdate('content.couples.wanita.photo', url)} />
                        </div>
                    </>
                )}

                {activeTab === 'events' && (
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={14} className="text-indigo-500" /> DETAIL ACARA</h3>
                        <div className="p-3 bg-gray-50 rounded-lg mb-4">
                            <p className="text-[10px] font-bold text-gray-400 mb-2">AKAD NIKAH</p>
                            <Input label="Tanggal (YYYY-MM-DD)" path="content.events.akad.date" />
                            <Input label="Waktu" path="content.events.akad.time" />
                            <Input label="Lokasi" path="content.events.akad.venue" />
                            <Input label="Alamat" path="content.events.akad.address" />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-[10px] font-bold text-gray-400 mb-2">RESEPSI</p>
                            <Input label="Tanggal (YYYY-MM-DD)" path="content.events.resepsi.date" />
                            <Input label="Waktu" path="content.events.resepsi.time" />
                            <Input label="Lokasi" path="content.events.resepsi.venue" />
                            <Input label="Alamat" path="content.events.resepsi.address" />
                        </div>
                    </div>
                )}

                {activeTab === 'design' && (
                    <>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-2"><Palette size={14} className="text-indigo-500" /> TEMA & MUSIK</h3>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {['modern-arch', 'classic-serif', 'botanical-line', 'rustic-wood', 'dark-luxury'].map(theme => (
                                    <button key={theme} onClick={() => onUpdate('metadata.theme_id', theme)} className={`p-3 text-xs font-bold rounded-lg border text-left capitalize ${data.metadata.theme_id === theme ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                        {theme.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                            <Input label="Musik Latar (MP3 URL)" path="metadata.music_url" placeholder="https://..." />
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-2"><Gift size={14} className="text-indigo-500" /> KADO DIGITAL</h3>
                            {data.engagement.gifts.map((gift, idx) => (
                                <div key={idx} className="relative p-3 bg-gray-50 rounded-lg border border-gray-200 mb-3">
                                    <button onClick={() => onUpdate('engagement.gifts', data.engagement.gifts.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                    <input className="w-full bg-white border rounded p-2 text-xs mb-2" value={gift.bank} onChange={(e) => { const n = [...data.engagement.gifts]; n[idx].bank = e.target.value; onUpdate('engagement.gifts', n) }} placeholder="Nama Bank" />
                                    <input className="w-full bg-white border rounded p-2 text-xs mb-2" value={gift.acc_number} onChange={(e) => { const n = [...data.engagement.gifts]; n[idx].acc_number = e.target.value; onUpdate('engagement.gifts', n) }} placeholder="No. Rekening" />
                                    <input className="w-full bg-white border rounded p-2 text-xs" value={gift.holder} onChange={(e) => { const n = [...data.engagement.gifts]; n[idx].holder = e.target.value; onUpdate('engagement.gifts', n) }} placeholder="Atas Nama" />
                                </div>
                            ))}
                            <button onClick={() => onUpdate('engagement.gifts', [...data.engagement.gifts, { bank: '', acc_number: '', holder: '' }])} className="w-full py-2 border border-dashed border-indigo-300 text-indigo-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-50"><Plus size={14} /> Tambah Rekening</button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
};

export default EditorSidebar;
