"use client";
import { useState, useEffect } from 'react';

// Daftar Template
const TEMPLATES = [
  { id: 'theme-luxury-dark', name: 'Luxury Dark' },
  { id: 'theme-rustic-wood', name: 'Rustic Wood' },
  { id: 'theme-pixel-art', name: 'Pixel Art' },
  { id: 'theme-magic-love', name: 'Magic Love' },
  { id: 'theme-cartoon-cars', name: 'Cartoon Cars' },
  { id: 'theme-cartoon-spongebob', name: 'Cartoon Spongebob' },
  { id: 'theme-cartoon-avatar', name: 'Cartoon Avatar' },
  { id: 'theme-streaming-netflix', name: 'Streaming Netflix' },
  { id: 'theme-streaming-cinema', name: 'Streaming Cinema' },
  { id: 'theme-tradition-javanese', name: 'Adat Jawa (Javanese)' },
  { id: 'theme-tradition-minang', name: 'Adat Minang' },
  { id: 'theme-tradition-balinese', name: 'Adat Bali (Balinese)' },
  { id: 'theme-regular-invitation', name: 'Regular Invitation' },
];

export default function BuilderPage() {
  const [formData, setFormData] = useState({
    theme: 'theme-luxury-dark', // Tema default
    cover: { img: 'https://placehold.co/600x800?text=Cover' },
    groom: { nick: 'Nicola', full: 'Nicola Valentino', parents: 'Bpk. Misno & Ibu Atik', img: 'https://placehold.co/400x600?text=Groom' },
    bride: { nick: 'Salsa', full: 'Salsabillah Putri', parents: 'Bpk. Rofiek & Ibu Sri', img: 'https://placehold.co/400x600?text=Bride' },
    event: { date: '2025-10-09', time: '10:00 WIB', loc: 'Malang, Jawa Timur', map: 'https://maps.google.com' },
    gift: { bank: 'BCA', num: '1234567890', name: 'Nicola Valentino' }
  });

  const [slug, setSlug] = useState('budi-doremi');
  const [previewHtml, setPreviewHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false); // State untuk proses publikasi
  const [publishedUrl, setPublishedUrl] = useState('');
  const [publishError, setPublishError] = useState('');

  const fetchPreview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setPreviewHtml(text);
    } catch (err: any) {
      setPreviewHtml(`<div class="p-4 text-red-600 bg-red-100"><strong>Error Fetching Preview:</strong><pre class="whitespace-pre-wrap">${err.message}</pre></div>`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchPreview(), 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev] as any, [field]: value }
    }));
  };

  const handlePublish = async () => {
    if (!slug) {
      setPublishError('Nama URL (slug) tidak boleh kosong.');
      return;
    }
    
    setIsPublishing(true); // <--- TUGAS 4: Atur state ke true
    setPublishedUrl('');
    setPublishError('');

    try {
      const sanitizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: sanitizedSlug,
          theme: formData.theme,
          formData: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Menampilkan error dari API yang sudah kita perbaiki (Tugas 2)
        throw new Error(result.error || 'Gagal mempublikasikan undangan.');
      }

      setPublishedUrl(result.url);

    } catch (error: any) {
      setPublishError(error.message);
    } finally {
      setIsPublishing(false); // Atur kembali ke false setelah selesai
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-100">
      <div className="w-1/3 h-full overflow-y-auto bg-white border-r shadow-xl p-6 z-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">RFX Builder</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Pilih Tema</label>
          <select className="w-full p-2 border rounded" value={formData.theme} onChange={(e) => setFormData({...formData, theme: e.target.value})}>
            {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="slug" className="block text-sm font-bold mb-2">Nama URL (Slug)</label>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm p-2 bg-gray-100 border rounded-l">/v/</span>
            <input id="slug" type="text" className="w-full p-2 border-t border-b border-r rounded-r" placeholder="contoh: budi-doremi" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <p className="text-xs text-gray-500 mt-1">Gunakan huruf kecil, angka, dan tanda hubung (-).</p>
        </div>

        {/* Form Groups... */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Mempelai Pria</h3>
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Panggilan" value={formData.groom.nick} onChange={e => handleChange('groom', 'nick', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Lengkap" value={formData.groom.full} onChange={e => handleChange('groom', 'full', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Orang Tua" value={formData.groom.parents} onChange={e => handleChange('groom', 'parents', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="URL Foto Pria" value={formData.groom.img} onChange={e => handleChange('groom', 'img', e.target.value)} />
        </div>
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Mempelai Wanita</h3>
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Panggilan" value={formData.bride.nick} onChange={e => handleChange('bride', 'nick', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Lengkap" value={formData.bride.full} onChange={e => handleChange('bride', 'full', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Orang Tua" value={formData.bride.parents} onChange={e => handleChange('bride', 'parents', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="URL Foto Wanita" value={formData.bride.img} onChange={e => handleChange('bride', 'img', e.target.value)} />
        </div>
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Detail Acara</h3>
          <input type="date" className="w-full mb-2 p-2 border rounded text-sm" value={formData.event.date} onChange={e => handleChange('event', 'date', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Waktu (e.g. 10:00 WIB)" value={formData.event.time} onChange={e => handleChange('event', 'time', e.target.value)} />
          <textarea className="w-full mb-2 p-2 border rounded text-sm" placeholder="Alamat Lokasi" rows={2} value={formData.event.loc} onChange={e => handleChange('event', 'loc', e.target.value)} />
           <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Google Maps Link" value={formData.event.map} onChange={e => handleChange('event', 'map', e.target.value)} />
        </div>
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Hadiah</h3>
           <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Bank (e.g. BCA)" value={formData.gift.bank} onChange={e => handleChange('gift', 'bank', e.target.value)} />
           <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nomor Rekening" value={formData.gift.num} onChange={e => handleChange('gift', 'num', e.target.value)} />
           <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Atas Nama" value={formData.gift.name} onChange={e => handleChange('gift', 'name', e.target.value)} />
        </div>

        <button onClick={handlePublish} disabled={isPublishing || !slug} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition">
          {isPublishing ? 'Memproses...' : 'Publikasikan Undangan'} {/* <--- TUGAS 4: Teks dinamis */}
        </button>

        {publishedUrl && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
            <p className="font-bold">Publikasi Berhasil!</p>
            <p className="text-sm mt-1">Bagikan link ini:</p>
            <input type="text" readOnly value={publishedUrl} className="w-full bg-white p-2 mt-1 rounded border" onClick={(e) => (e.target as HTMLInputElement).select()} />
          </div>
        )}

        {publishError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded">
            <p className="font-bold">Error Publikasi</p>
            <p className="text-sm mt-1">{publishError}</p>
          </div>
        )}
      </div>

      <div className="w-2/3 h-full bg-gray-200 flex items-center justify-center relative">
        {loading && <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow animate-pulse text-blue-600">Updating Preview...</div>}
        <div className="mockup-browser border-4 border-gray-800 rounded-2xl overflow-hidden shadow-2xl h-[90vh] w-[95%] bg-white">
          <div className="mockup-browser-toolbar">
            <div className="input border border-gray-400 rounded-full px-4">{publishedUrl || `http://localhost:3000/v/${slug}`}</div>
          </div>
          <iframe srcDoc={previewHtml} className="w-full h-full" title="Preview Undangan" sandbox="allow-scripts allow-same-origin" />
        </div>
      </div>
    </div>
  );
}