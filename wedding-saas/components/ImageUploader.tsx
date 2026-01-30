// Path: /components/ImageUploader.tsx
import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { convertToDirectLink, compressImage } from '../utils/converter';

interface ImageUploaderProps {
    label: string;
    currentUrl: string;
    onUpdate: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, currentUrl, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<'upload' | 'gdrive'>('upload');
    const [status, setStatus] = useState('idle');
    const [gdriveInput, setGdriveInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setStatus('compressing');
            await compressImage(file); // Mock compression
            setStatus('uploading');
            // Mock upload delay
            await new Promise(r => setTimeout(r, 1000));
            const mockUrl = URL.createObjectURL(file);
            onUpdate(mockUrl);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleGDriveSubmit = () => {
        const directLink = convertToDirectLink(gdriveInput);
        if (directLink) {
            onUpdate(directLink);
            setStatus('success');
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex border-b border-gray-100">
                    <button onClick={() => setActiveTab('upload')} className={`flex-1 py-2 text-[10px] font-bold uppercase ${activeTab === 'upload' ? 'bg-gray-50 text-indigo-600' : 'text-gray-400'}`}>Upload</button>
                    <button onClick={() => setActiveTab('gdrive')} className={`flex-1 py-2 text-[10px] font-bold uppercase ${activeTab === 'gdrive' ? 'bg-gray-50 text-indigo-600' : 'text-gray-400'}`}>GDrive</button>
                </div>
                <div className="p-3">
                    {activeTab === 'upload' ? (
                        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                            <div className="flex flex-col items-center gap-2">
                                {status === 'uploading' || status === 'compressing' ? <Loader2 size={20} className="animate-spin text-indigo-500" /> : <UploadCloud size={20} className="text-gray-400" />}
                                <span className="text-xs text-gray-500">{status === 'idle' ? 'Klik untuk upload' : status}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <input value={gdriveInput} onChange={(e) => setGdriveInput(e.target.value)} placeholder="Link GDrive..." className="flex-1 text-xs border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500" />
                            <button onClick={handleGDriveSubmit} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold"><LinkIcon size={14} /></button>
                        </div>
                    )}
                    {currentUrl && (
                        <div className="mt-3 flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <img src={currentUrl} className="w-10 h-10 rounded-md object-cover" alt="Preview" />
                            <span className="text-[10px] text-gray-400 truncate flex-1">{currentUrl}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;