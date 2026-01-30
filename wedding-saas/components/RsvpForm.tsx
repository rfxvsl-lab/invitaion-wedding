import React, { useState } from 'react';
import { MessageSquare, Send, User, Users } from 'lucide-react';

interface RsvpProps {
    whatsappNumber: string;
    messageTemplate: string;
    themeColor?: string; // Hex color for button/accents
}

const RsvpForm: React.FC<RsvpProps> = ({ whatsappNumber, messageTemplate, themeColor = "#4F46E5" }) => {
    const [name, setName] = useState('');
    const [attendance, setAttendance] = useState('Hadir');
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Replace placeholders in template
        let finalMessage = messageTemplate
            .replace('[Nama]', name)
            .replace('[Jumlah]', guests.toString())
            .replace('[Pesan]', message);

        // Add attendance status if not in template (optional, but good practice to append)
        if (!finalMessage.includes('konfirmasi')) {
            finalMessage += `\n\nKehadiran: ${attendance}`;
        }

        // Append custom message if not in template holder
        if (!messageTemplate.includes('[Pesan]') && message) {
            finalMessage += `\nPesan: ${message}`;
        }

        const encodedMessage = encodeURIComponent(finalMessage);
        // Ensure clean number format (remove +, -, spaces)
        const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

        window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-center mb-6" style={{ color: themeColor }}>Konfirmasi Kehadiran</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Tamu</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama Lengkap"
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
                            // style={{ '--tw-ring-color': themeColor } as React.CSSProperties} // Optional if needed
                            style={{ borderColor: themeColor }} // Or just borderColor if preferred, or remove style entirely and rely on classes
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kehadiran</label>
                        <select
                            value={attendance}
                            onChange={(e) => setAttendance(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none"
                        >
                            <option value="Hadir">Hadir</option>
                            <option value="Maaf, Belum Bisa">Tidak Hadir</option>
                            <option value="Masih Ragu">Masih Ragu</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jumlah Tamu</label>
                        <div className="relative">
                            <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pesan / Ucapan</label>
                    <div className="relative">
                        <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis ucapan atau pesan khusus..."
                            rows={3}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none resize-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-white font-bold shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: themeColor }}
                >
                    <Send size={16} /> Kirim Konfirmasi WhatsApp
                </button>
            </form>
        </div>
    );
};

export default RsvpForm;
