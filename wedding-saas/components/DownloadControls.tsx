import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { Download, Image, Camera, Video } from 'lucide-react';

import { InstagramStoryTemplate } from './InstagramStoryTemplate';
import { TEMPLATES } from '../lib/templates';
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
    const [recording, setRecording] = useState(false);

    // Get Tier
    const tier = TEMPLATES.find(t => t.id === data.metadata.theme_id)?.tier || 'free';
    const isExclusive = tier === 'exclusive';

    /* Full download removed
    const handleDownload = async (type: 'full') => {
        if (!targetRef.current) return;
        setIsDownloading(true);
        try {
            const dataUrl = await toPng(targetRef.current, { cacheBust: true, });
            download(dataUrl, `invitation-${slug}-${type}.png`);
        } catch (error) {
            console.error('Download failed', error);
        } finally {
            setIsDownloading(false);
        }
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

    const handleVideoDownload = async () => {
        if (!isExclusive) return;

        try {
            setRecording(true);
            alert("Untuk hasil terbaik (100% animasi), silakan pilih Tab ini ('Chrome Tab' -> 'Current Tab') ketika diminta, dan biarkan rekaman berjalan selama 10-15 detik.");

            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface: "browser",
                },
                audio: false
            });

            const mimeType = 'video/webm; codecs=vp9';
            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                download(blob, `story-video-${slug}.webm`);

                stream.getTracks().forEach(track => track.stop()); // Stop sharing
                setRecording(false);
            };

            mediaRecorder.start();

            // Auto stop after 15 seconds
            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                }
            }, 15000);

        } catch (err) {
            console.error("Recording failed", err);
            setRecording(false);
            alert("Gagal memulai rekaman layar. Pastikan izin diberikan.");
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 exclude-from-capture">
                {/* Floating Action Button */}
                <div className={`bg-white/90 backdrop-blur shadow-lg rounded-full p-2 border border-gray-200 cursor-pointer group relative transition-all duration-300 opacity-40 hover:opacity-100 hover:scale-105 ${isDownloading ? 'opacity-100' : ''}`}>
                    <button
                        onClick={() => setShowModal(true)}
                        disabled={isDownloading}
                        className="flex items-center justify-center text-gray-700 hover:text-indigo-600 transition-colors p-1"
                        title="Unduh Template Story"
                    >
                        <Download size={20} />
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
                                {isDownloading ? 'Memproses...' : 'Unduh Gambar (PNG)'}
                            </button>

                            {/* EXCLUSIVE VIDEO DOWNLOAD */}
                            {isExclusive && (
                                <button
                                    onClick={handleVideoDownload}
                                    disabled={!guestName || !wish || isDownloading || recording}
                                    className="flex-1 py-2 bg-amber-500 text-white font-bold text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {recording ? 'Merekam (15s)...' : 'Unduh Video (MP4/WebM)'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* HIDDEN STORY TEMPLATE (Off-screen rendering) */}
            <div className={`fixed top-0 left-0 z-[100] ${recording ? 'w-screen h-screen bg-black flex items-center justify-center' : 'left-[9999px] top-0'}`}>
                {recording && <p className="absolute top-4 text-white font-bold z-50 animate-pulse">🔴 Merekam... Tunggu 15 detik</p>}

                <div className={recording ? 'scale-50 origin-center' : ''}>
                    <InstagramStoryTemplate ref={storyRef} data={data} guestName={guestName} wish={wish} />
                </div>
            </div>
        </>
    );
};
