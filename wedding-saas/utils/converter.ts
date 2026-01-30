// Path: /utils/converter.ts

export const convertToDirectLink = (url: string): string | null => {
    if (!url) return null;
    const regex = /(?:file\/d\/|id=)([-w]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url; // Return original if regex fails (assume direct link)
};

export const compressImage = async (file: File): Promise<File> => {
    console.log(`[Utils] Compressing ${file.name} (${(file.size / 1024).toFixed(2)} KB)...`);
    await new Promise(r => setTimeout(r, 800)); // Simulasi
    return file;
};
