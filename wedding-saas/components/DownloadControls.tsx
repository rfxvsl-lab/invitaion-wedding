import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { Download, Image, Camera } from 'lucide-react';

interface DownloadProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
    slug: string;
}

export const DownloadControls: React.FC<DownloadProps> = ({ targetRef, slug }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (type: 'full' | 'story') => {
        if (!targetRef.current) return;
        setIsDownloading(true);

        try {
            // Filter out control buttons from capture
            const filter = (node: HTMLElement) => {
                return !node.className?.includes?.('exclude-from-capture');
            };

            const dataUrl = await toJpeg(targetRef.current, {
                quality: 0.95,
                filter: filter,
                backgroundColor: '#ffffff' // Ensure white background
            });

            download(dataUrl, `invitation-${slug}-${type}.jpg`);
        } catch (error) {
            console.error('Download failed', error);
            alert('Gagal mengunduh gambar. Silakan coba lagi atau gunakan screenshot manual.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed top-6 left-6 z-50 flex flex-col gap-2 exclude-from-capture">
            <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl p-2 border border-gray-200">
                <p className="text-[10px] font-bold text-gray-400 uppercase text-center mb-2">Simpan Desain</p>
                <button
                    onClick={() => handleDownload('full')}
                    disabled={isDownloading}
                    className="w-full flex items-center gap-2 text-xs font-bold text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors mb-1"
                >
                    <Image size={14} /> Desain Utuh
                </button>
                <button
                    onClick={() => handleDownload('story')}
                    disabled={isDownloading}
                    className="w-full flex items-center gap-2 text-xs font-bold text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                    <Camera size={14} /> Story IG
                </button>
                {isDownloading && <p className="text-[8px] text-center text-indigo-500 mt-1 animate-pulse">Memproses...</p>}
            </div>
        </div>
    );
};
