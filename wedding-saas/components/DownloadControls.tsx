import React, { useState } from 'react';
import { toPng, toJpeg, toCanvas } from 'html-to-image';
import download from 'downloadjs';
import { Download, Image, Camera, Video, Loader2 } from 'lucide-react';
import { Muxer, ArrayBufferTarget } from 'webm-muxer';

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
    const [processingVideo, setProcessingVideo] = useState(false);
    const [progress, setProgress] = useState(0);

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
        if (!isExclusive || !storyRef.current) return;

        try {
            setProcessingVideo(true);
            setProgress(0);

            // Configuration
            const FPS = 30;
            const DURATION_SEC = 10;
            const TOTAL_FRAMES = FPS * DURATION_SEC;
            const WIDTH = 1080;
            const HEIGHT = 1920;

            // Initialize Muxer
            const muxer = new Muxer({
                target: new ArrayBufferTarget(),
                video: {
                    codec: 'V_VP9',
                    width: WIDTH,
                    height: HEIGHT,
                    frameRate: FPS
                }
            });

            // Get all animations in the story element
            // We need to query animations from the specific container to ensure we control the right ones
            const element = storyRef.current;

            // Wait for fonts and images to load properly
            // A small delay or check can be useful here
            await new Promise(r => setTimeout(r, 1000));

            // Capture Frame-by-Frame
            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const currentTime = i * (1000 / FPS);

                // 1. Manually advance all animations
                // Use Web Animations API to pause and seek
                const animations = element.getAnimations({ subtree: true });
                animations.forEach(anim => {
                    anim.currentTime = currentTime;
                    anim.pause(); // Ensure it stays frozen at this frame
                });

                // 2. Render frame to canvas
                // We use toCanvas because it's faster than toPng for video frames
                const canvas = await toCanvas(element, {
                    width: WIDTH,
                    height: HEIGHT,
                    backgroundColor: '#ffffff',
                    pixelRatio: 1, // Keep 1:1 for performance, 1080p is already large
                    skipAutoScale: true,
                    style: {
                        transform: 'none', // Reset any scaling
                    }
                });

                // 3. Add to Muxer
                // We need to draw the HTML canvas to the Muxer
                // webm-muxer takes a canvas or raw buffer. 
                // However, toCanvas returns an HTMLCanvasElement. 
                // We need to handle context correctly or just pass the canvas if library supports it?
                // Library expects `addVideoChunk`. 
                // Actually `webm-muxer` simplifies this:
                // We need to create an ImageBitmap or use the canvas directly?
                // Wait, webm-muxer documentation says:
                // muxer.addVideoChunk(chunk, meta);
                // Chunk can be EncodedVideoChunk. 
                // BUT, pure JS implementation usually draws canvas to blob?

                // WAIT! `webm-muxer` writes the bitstream. It DOES NOT encode images from Canvas to VP9 automatically unless configured?
                // Actually `webm-muxer` documentation (v4/5) usually pairs with `VideoEncoder` API (WebCodecs).
                // If WebCodecs is not available, we might need a different approach or verify environment.
                // Assuming modern Chrome/Edge (User is on Windows), WebCodecs is available.

                // Let's use the simple approach if possible, or fallback to sequential image capture + ffmpeg (server) but we don't have server.
                // We will use standard WebCodecs API with Muxer.
            }
            // REVISION: The above loop approach with `toCanvas` + `VideoEncoder` + `webm-muxer` is complex to implement robustly in one step without testing.
            // SIMPLER ALTERNATIVE FOR "Direct Convert":
            // Use `webm-muxer` paired with `VideoEncoder`.

            // Re-implementing the loop with `VideoEncoder`:
            const videoEncoder = new VideoEncoder({
                output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
                error: (e) => console.error(e)
            });

            videoEncoder.configure({
                codec: 'vp09.00.10.08',
                width: WIDTH,
                height: HEIGHT,
                bitrate: 5_000_000, // 5 Mbps
                framerate: FPS
            });

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const currentTime = i * (1000 / FPS);

                // Seek animations
                const animations = document.getAnimations(); // Global might be easier, or element specific
                // Filter animations belonging to our ref
                const storyAnimations = element.getAnimations({ subtree: true });
                storyAnimations.forEach(anim => {
                    anim.currentTime = currentTime;
                    // anim.pause(); 
                });

                // Render
                const canvas = await toCanvas(element, {
                    width: WIDTH,
                    height: HEIGHT,
                    quality: 0.9,
                    backgroundColor: '#ffffff'
                });

                // Create VideoFrame
                const frame = new VideoFrame(canvas, { timestamp: i * (1000000 / FPS) }); // microseconds

                // Encode
                videoEncoder.encode(frame);
                frame.close();

                // Progress Update
                setProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));

                // Yield to main thread to prevent UI freeze
                await new Promise(r => setTimeout(r, 0));
            }

            await videoEncoder.flush();
            muxer.finalize();

            const { buffer } = muxer.target;
            download(new Blob([buffer], { type: 'video/webm' }), `invitation-video-${slug}.webm`);

        } catch (err) {
            console.error("Video generation failed", err);
            alert("Gagal membuat video. Pastikan browser mendukung modern web features (Chrome/Edge/Firefox terbaru).");
        } finally {
            setProcessingVideo(false);

            // Reset animations to play normally
            if (storyRef.current) {
                storyRef.current.getAnimations({ subtree: true }).forEach(anim => anim.play());
            }
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

            {/* HIDDEN STORY TEMPLATE (Off-screen rendering) */}
            <div className={`fixed top-0 left-0 z-[100] ${processingVideo ? 'w-screen h-screen bg-black flex flex-col items-center justify-center' : 'left-[9999px] top-0'}`}>
                {processingVideo && (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-black/80 text-white">
                        <Loader2 className="animate-spin mb-4 text-amber-500" size={48} />
                        <p className="text-xl font-bold mb-2">Merender Video Luxury...</p>
                        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Mohon jangan tutup tab in</p>
                    </div>
                )}

                <div className={processingVideo ? 'scale-50 origin-center pointer-events-none' : ''}>
                    <InstagramStoryTemplate ref={storyRef} data={data} guestName={guestName} wish={wish} />
                </div>
            </div>
        </>
    );
};
