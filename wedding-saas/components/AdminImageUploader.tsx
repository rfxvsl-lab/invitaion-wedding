
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminImageUploaderProps {
    currentUrl?: string; // Can be empty
    onUploadComplete: (url: string) => void;
    bucketName?: string;
}

const AdminImageUploader: React.FC<AdminImageUploaderProps> = ({ currentUrl, onUploadComplete, bucketName = 'theme-thumbnails' }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [localPreview, setLocalPreview] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/')) {
            setError('Mohon upload file gambar (JPG/PNG).');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError('Ukuran file maksimal 2MB.');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            // Local preview
            const objectUrl = URL.createObjectURL(file);
            setLocalPreview(objectUrl);

            // Upload to Supabase
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadErr } = await supabase.storage.from(bucketName).upload(filePath, file);

            if (uploadErr) throw uploadErr;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);

            onUploadComplete(publicUrl);
        } catch (err: any) {
            console.error('Upload failed:', err);
            setError(err.message || 'Gagal mengupload gambar.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-start gap-4">
                {/* Preview Box */}
                <div className="w-24 h-24 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden flex-shrink-0 relative group">
                    {(localPreview || currentUrl) ? (
                        <img
                            src={localPreview || currentUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <UploadCloud size={24} />
                        </div>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="animate-spin text-white" size={20} />
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex-1">
                    <label className="block w-full cursor-pointer group">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-pink-300 hover:text-pink-600 transition-all shadow-sm">
                            <UploadCloud size={16} />
                            <span>{uploading ? 'Mengupload...' : 'Pilih Gambar'}</span>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-2">
                        Maksimal 2MB. Format JPG/PNG.
                        {error && <span className="block text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {error}</span>}
                        {!error && !uploading && (localPreview || currentUrl) && <span className="block text-emerald-500 mt-1 flex items-center gap-1"><CheckCircle size={10} /> Siap disimpan</span>}
                    </p>
                </div>
            </div>
            {/* Hidden Input purely for Admin Form State if needed, but we used onUploadComplete */}
        </div>
    );
};

export default AdminImageUploader;
