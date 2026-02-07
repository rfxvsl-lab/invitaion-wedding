import * as tus from 'tus-js-client';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const uploadResumable = (file: File, bucketName: string, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Buat nama file unik
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}-${Date.now()}.${fileExt}`;
        const fullPath = `${folder}/${fileName}`; // folder/namafile.mp4

        // Setup Upload TUS (Resumable)
        const upload = new tus.Upload(file, {
            endpoint: `${SUPABASE_URL}/storage/v1/upload/resumable`, // Endpoint TUS Supabase
            retryDelays: [0, 3000, 5000, 10000, 20000], // Coba lagi otomatis kalau gagal (Anti Aborted)
            headers: {
                authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'x-client-info': 'supabase-js/2.0.0',
            },
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: true, // Hapus cache kalau sukses
            metadata: {
                bucketName: bucketName,
                objectName: fullPath,
                contentType: file.type,
                cacheControl: '3600',
            },
            chunkSize: 6 * 1024 * 1024, // Upload per 6MB (Biar ringan & tidak timeout)
            onError: function (error) {
                console.error("Failed because: " + error);
                reject(error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                console.log(bytesUploaded, bytesTotal, percentage + "%");
            },
            onSuccess: function () {
                // Construct Public URL Manual
                const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${fullPath}`;
                console.log("Download %s from %s", file.name, publicUrl);
                resolve(publicUrl);
            },
        });

        // Cek apakah ada upload yang nyangkut sebelumnya
        upload.findPreviousUploads().then(function (previousUploads) {
            // Jika ada, resume (lanjutkan). Jika tidak, mulai baru.
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0]);
            }
            upload.start();
        });
    });
};
