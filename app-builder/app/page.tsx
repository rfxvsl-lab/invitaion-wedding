"use client";
import { useState, useEffect } from 'react';

// Daftar Template (Sesuaikan dengan nama file HTML Anda tanpa .html)
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
  // State untuk data form
  const [formData, setFormData] = useState({
    theme: 'theme-luxury-dark', // Default theme
    cover: { img: 'https://placehold.co/600x800?text=Cover' },
    groom: { nick: 'Nicola', full: 'Nicola Valentino', parents: 'Bpk. Misno & Ibu Atik', img: 'https://placehold.co/400x600?text=Groom' },
    bride: { nick: 'Salsa', full: 'Salsabillah Putri', parents: 'Bpk. Rofiek & Ibu Sri', img: 'https://placehold.co/400x600?text=Bride' },
    event: { date: '2025-10-09', time: '10:00 WIB', loc: 'Malang, Jawa Timur', map: 'https://maps.google.com' },
    gift: { bank: 'BCA', num: '1234567890', name: 'Nicola Valentino' }
  });

  const [previewHtml, setPreviewHtml] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi fetch preview dari API yang baru kita buat
  const fetchPreview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const html = await res.text();
      setPreviewHtml(html);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh preview setiap kali user berhenti mengetik selama 1 detik (Debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPreview();
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Handler untuk update state yang bersarang
  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev] as any, [field]: value }
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-100">
      
      {/* --- PANEL KIRI: FORM EDITOR --- */}
      <div className="w-1/3 h-full overflow-y-auto bg-white border-r shadow-xl p-6 z-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">RFX Builder</h1>
        
        {/* Pilih Template */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Pilih Tema</label>
          <select 
            className="w-full p-2 border rounded"
            value={formData.theme}
            onChange={(e) => setFormData({...formData, theme: e.target.value})}
          >
            {TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Form Group: Mempelai Pria */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Mempelai Pria</h3>
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Panggilan" value={formData.groom.nick} onChange={e => handleChange('groom', 'nick', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Lengkap" value={formData.groom.full} onChange={e => handleChange('groom', 'full', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Orang Tua" value={formData.groom.parents} onChange={e => handleChange('groom', 'parents', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="URL Foto Pria" value={formData.groom.img} onChange={e => handleChange('groom', 'img', e.target.value)} />
        </div>

        {/* Form Group: Mempelai Wanita */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Mempelai Wanita</h3>
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Panggilan" value={formData.bride.nick} onChange={e => handleChange('bride', 'nick', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Lengkap" value={formData.bride.full} onChange={e => handleChange('bride', 'full', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Nama Orang Tua" value={formData.bride.parents} onChange={e => handleChange('bride', 'parents', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="URL Foto Wanita" value={formData.bride.img} onChange={e => handleChange('bride', 'img', e.target.value)} />
        </div>

        {/* Form Group: Acara */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-gray-500 mb-3 uppercase text-sm">Detail Acara</h3>
          <input type="date" className="w-full mb-2 p-2 border rounded text-sm" value={formData.event.date} onChange={e => handleChange('event', 'date', e.target.value)} />
          <input className="w-full mb-2 p-2 border rounded text-sm" placeholder="Waktu (e.g. 10:00 WIB)" value={formData.event.time} onChange={e => handleChange('event', 'time', e.target.value)} />
          <textarea className="w-full mb-2 p-2 border rounded text-sm" placeholder="Alamat Lokasi" rows={2} value={formData.event.loc} onChange={e => handleChange('event', 'loc', e.target.value)} />
        </div>

        <button 
          onClick={() => alert("Fitur Save/Render Final akan kita buat setelah ini!")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
        >
          Finalize & Render (1x)
        </button>
      </div>

      {/* --- PANEL KANAN: LIVE PREVIEW --- */}
      <div className="w-2/3 h-full bg-gray-200 flex items-center justify-center relative">
        {loading && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow animate-pulse text-blue-600">
            Updating Preview...
          </div>
        )}
        
        {/* IFRAME: Menampilkan HTML hasil render */}
        <div className="mockup-phone border-4 border-gray-800 rounded-[30px] overflow-hidden shadow-2xl h-[85vh] w-[400px] bg-white">
          <iframe 
            srcDoc={previewHtml} 
            className="w-full h-full"
            title="Preview Undangan"
            sandbox="allow-scripts allow-same-origin" // Penting agar JS di template jalan
          />
        </div>
      </div>

    </div>
  );
}