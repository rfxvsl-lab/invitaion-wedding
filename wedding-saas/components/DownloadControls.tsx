import React, { useState } from 'react';
import { toPng, toJpeg, toCanvas } from 'html-to-image';
import download from 'downloadjs';
import { Download, Image, Camera, Video, Loader2 } from 'lucide-react';
import { Muxer, ArrayBufferTarget } from 'webm-muxer';

import { InstagramStoryTemplate } from './InstagramStoryTemplate';
import { TEMPLATES } from '../lib/templates';
import { InvitationData } from '../types/invitation';
import { useRoyalGlassRender } from '../hooks/useRoyalGlassRender';

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
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [processingVideo, setProcessingVideo] = useState(false);
    const [progress, setProgress] = useState(0);

    // Canvas Renderer Hook 
    // We keep isActive true if processingVideo is true to run the animation loops
    useRoyalGlassRender({
        canvasRef,
        data,
        guestName,
        wish,
        isActive: true // Always run animation loop so it's ready? Or maybe only when "preparing"
        // Actually, to save resources, let's keep it controlled. 
        // But if we want instant recording, we need it ready.
        // Let's rely on the setProcessingVideo trigger to start animations.
        // Updated: we pass `processingVideo` but we ensure the canvas is mounted.
    });

    // Get Tier
    const tier = TEMPLATES.find(t => t.id === data.metadata.theme_id)?.tier || 'free';
    const isExclusive = tier === 'exclusive';

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

    // TRIGGER RECORDING EFFECT
    React.useEffect(() => {
        if (processingVideo && canvasRef.current) {
            const startRecording = async () => {
                try {
                    // Slight delay to ensure animation frame has started drawing
                    await new Promise(r => setTimeout(r, 100));

                    const canvas = canvasRef.current;
                    if (!canvas) return;

                    const stream = canvas.captureStream(30); // 30 FPS

                    // Detect supported MIME Type
                    const mimeTypes = [
                        'video/webm; codecs=vp9',
                        'video/webm; codecs=vp8',
                        'video/webm; codecs=h264',
                        'video/webm',
                        'video/mp4'
                    ];

                    let mimeType = '';
                    for (const type of mimeTypes) {
                        if (MediaRecorder.isTypeSupported(type)) {
                            mimeType = type;
                            break;
                        }
                    }

                    if (!mimeType) {
                        throw new Error("Browser tidak mendukung format video yang tersedia.");
                    }

                    const recorder = new MediaRecorder(stream, {
                        mimeType,
                        videoBitsPerSecond: 5000000 // 5 Mbps
                    });

                    const chunks: Blob[] = [];
                    recorder.ondataavailable = (e) => {
                        if (e.data.size > 0) chunks.push(e.data);
                    };

                    recorder.onstop = () => {
                        // Extension depends on mimeType
                        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
                        const blob = new Blob(chunks, { type: mimeType });
                        download(blob, `story-video-${slug}.${ext}`);
                        setProcessingVideo(false);
                    };

                    recorder.start();

                    // Record for 10 seconds
                    let seconds = 0;
                    const duration = 10;
                    const interval = setInterval(() => {
                        seconds++;
                        setProgress(Math.round((seconds / duration) * 100));
                        if (seconds >= duration) {
                            clearInterval(interval);
                            recorder.stop();
                        }
                    }, 1000);
                } catch (err) {
                    console.error("Video recording error", err);
                    alert("Gagal merekam video. Browser mungkin tidak mendukung Canvas Recording.");
                    setProcessingVideo(false);
                }
            };

            startRecording();
        }
    }, [processingVideo, slug]);

    const handleVideoDownload = () => {
        if (!isExclusive) return;
        setProcessingVideo(true);
        // The Effect will pick this up
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

                            {isExclusive && (
                                <button
                                    onClick={handleVideoDownload}
                                    disabled={!guestName || !wish || isDownloading || processingVideo}
                                    className="flex-1 py-2 bg-amber-500 text-white font-bold text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processingVideo ? (
                                        <>
                                            <Loader2 className="animate-spin" size={16} />
                                            <span>{progress}%</span>
                                        </>
                                    ) : (
                                        <>
                                            <Video size={16} />
                                            <span>Unduh Video</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* HIDDEN STORY TEMPLATE (Still needed for JPEG generation) */}
            <div className="fixed left-[9999px] top-0">
                <InstagramStoryTemplate ref={storyRef} data={data} guestName={guestName} wish={wish} />
            </div>

            {/* ALWAYS MOUNTED CANVAS (Hidden when not processing) */}
            {/* We mount it always but hide it with CSS so ref is available immediately. 
                However, to save performance, we might want to check if logic is sound.
                Actually, keeping it mounted is fine, just ensure useRoyalGlassRender pauses loop if !isActive.
            */}
            <div className={`fixed top-0 left-0 w-screen h-screen z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-300 ${processingVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="relative">
                    {/* Canvas needs to be present for Ref */}
                    <canvas
                        ref={canvasRef}
                        width={1080}
                        height={1920}
                        className="bg-white shadow-2xl scale-[0.35] origin-center"
                    />

                    {/* Overlay Loader */}
                    {processingVideo && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                            <div className="bg-black/70 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-white">
                                <Loader2 className="animate-spin mb-3 text-amber-500" size={48} />
                                <p className="font-bold text-lg mb-1">Merekam Video...</p>
                                <p className="text-sm opacity-70 mb-3 text-center w-64">Menggunakan teknologi Canvas Recording yang lebih ringan.</p>
                                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full transition-all duration-1000 linear" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="text-xs mt-2">{progress}%</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
