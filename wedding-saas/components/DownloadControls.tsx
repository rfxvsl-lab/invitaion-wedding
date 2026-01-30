import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { Download, Image, Camera } from 'lucide-react';

import { InstagramStoryTemplate } from './InstagramStoryTemplate';
import { InvitationData } from '../types/invitation';

interface DownloadProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
    slug: string;
    data: InvitationData;
}

export const DownloadControls: React.FC<DownloadProps> = ({ targetRef, slug, data }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [wish, setWish] = useState('');
    const storyRef = React.useRef<HTMLDivElement>(null);

    /* Full download removed as requested
    const handleDownload = async (type: 'full') => {
        ...
    };
    */

    const handleStoryDownload = async () => {
        if (!storyRef.current) return;
        setIsDownloading(true);
        try {
            const dataUrl = await toJpeg(storyRef.current, {
                quality: 0.95,
                backgroundColor: '#ffffff'
            });
            download(dataUrl, `story-${slug}-${guestName.replace(/\s+/g, '-') || 'guest'}.jpg`);
            setShowModal(false);
        } catch (error) {
            console.error('Story download failed', error);
            alert('Gagal membuat story. Coba lagi.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            <div className="fixed top-6 left-6 z-50 flex flex-col gap-2 exclude-from-capture">
                <div className="bg-white/90 backdrop-blur shadow-lg rounded-full p-2 border border-gray-200 hover:scale-105 transition-transform cursor-pointer group relative">
                    <button
                        onClick={() => setShowModal(true)}
                        disabled={isDownloading}
                        className="flex items-center justify-center text-gray-700 hover:text-indigo-600 transition-colors p-1"
                        title="Unduh Template Story"
                    >
                        <Download size={24} />
                    </button>
                    {isDownloading && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                    )}
                </div>
            </div>

            {/* INPUT MODAL FOR STORY */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm exclude-from-capture p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in slide-in-from-bottom-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Buat Story Instagram</h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Anda (Tamu)</label>
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Contoh: Budi & Keluarga"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ucapan & Doa</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    placeholder="Selamat menempuh hidup baru..."
                                    value={wish}
                                    onChange={(e) => setWish(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-gray-500 font-medium text-sm hover:bg-gray-100 rounded-lg">Batal</button>
                            <button
                                onClick={handleStoryDownload}
                                disabled={!guestName || !wish || isDownloading}
                                className="flex-1 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isDownloading ? 'Memproses...' : 'Unduh Story'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* HIDDEN STORY TEMPLATE (Off-screen rendering) */}
            <div className="fixed left-[9999px] top-0">
                <InstagramStoryTemplate ref={storyRef} data={data} guestName={guestName} wish={wish} />
            </div>
        </>
    );
};
