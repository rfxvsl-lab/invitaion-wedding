import React, { useState } from 'react';
import { User, X, Copy, Check } from 'lucide-react';

interface GuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    guestCount: number;
    maxGuests: number;
    baseUrl: string;
    onAddGuest: (name: string) => void;
    onRemoveGuest: (index: number) => void;
    guests: string[];
}

export default function GuestModal({ isOpen, onClose, guestCount, maxGuests, baseUrl, onAddGuest, onRemoveGuest, guests }: GuestModalProps) {
    const [newGuestName, setNewGuestName] = useState('');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    if (!isOpen) return null;

    const handleAddGuest = () => {
        if (!newGuestName.trim()) return;
        if (guestCount >= maxGuests) {
            alert(`❌ Maksimal ${maxGuests} tamu untuk tier Anda!`);
            return;
        }
        onAddGuest(newGuestName.trim());
        setNewGuestName('');
    };

    const copyLink = (guestName: string, index: number) => {
        const link = `${baseUrl}?to=${encodeURIComponent(guestName)}`;
        navigator.clipboard.writeText(link);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <User size={24} />
                        <div>
                            <h3 className="text-lg font-bold">Guest Link Generator</h3>
                            <p className="text-xs text-violet-100">
                                {guestCount} / {maxGuests === Infinity ? '∞' : maxGuests} tamu
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                    {/* Add Guest Form */}
                    <div className="mb-6 p-4 bg-violet-50 border-2 border-violet-200 rounded-xl">
                        <label className="block text-xs font-bold text-violet-700 uppercase mb-2">Tambah Tamu Baru</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Nama tamu (contoh: Bpk. Andi)"
                                value={newGuestName}
                                onChange={(e) => setNewGuestName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddGuest()}
                                className="flex-1 px-4 py-2 border border-violet-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                            />
                            <button
                                onClick={handleAddGuest}
                                disabled={guestCount >= maxGuests}
                                className="px-6 py-2 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Tambah
                            </button>
                        </div>
                    </div>

                    {/* Guest List */}
                    {guests.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <User size={48} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">Belum ada tamu</p>
                            <p className="text-sm">Tambahkan tamu untuk generate link personal</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {guests.map((guest, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-violet-300 transition group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center font-bold text-sm">
                                                {idx + 1}
                                            </div>
                                            <span className="font-bold text-slate-700">{guest}</span>
                                        </div>
                                        <button
                                            onClick={() => onRemoveGuest(idx)}
                                            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={`${baseUrl}?to=${encodeURIComponent(guest)}`}
                                            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600"
                                        />
                                        <button
                                            onClick={() => copyLink(guest, idx)}
                                            className="px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition flex items-center gap-1"
                                        >
                                            {copiedIndex === idx ? (
                                                <>
                                                    <Check size={14} />
                                                    <span className="text-xs font-bold">OK</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} />
                                                    <span className="text-xs font-bold">Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
