'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Settings, Palette, Calendar, Users, Globe, Send, 
  Copy, Check, Smartphone, ExternalLink, Sparkles, LayoutTemplate, 
  CreditCard, Monitor, Eye
} from 'lucide-react';
import { generateHTML, FormData } from '../lib/generator';
import { supabase } from '../lib/supabase';

const THEMES = [
  { id: 'regular-invitation', name: 'Regular Elegant', category: 'Standard', color: 'bg-stone-200' },
  { id: 'luxury-dark', name: 'Luxury Dark', category: 'Modern', color: 'bg-stone-900' },
  { id: 'rustic-wood', name: 'Rustic Wood', category: 'Nature', color: 'bg-amber-100' },
  { id: 'pixel-art', name: 'Pixel Art', category: 'Game', color: 'bg-purple-900' },
  { id: 'magic-love', name: 'Magic Love', category: 'Fantasy', color: 'bg-indigo-950' },
  { id: 'cartoon-cars', name: 'Cartoon Cars', category: 'Kids', color: 'bg-red-600' },
  { id: 'cartoon-spongebob', name: 'Bikini Bottom', category: 'Kids', color: 'bg-blue-400' },
  { id: 'cartoon-avatar', name: 'Avatar Elements', category: 'Fantasy', color: 'bg-orange-100' },
  { id: 'streaming-netflix', name: 'Netflix Style', category: 'Modern', color: 'bg-black' },
  { id: 'streaming-cinema', name: 'Cinema Classic', category: 'Classic', color: 'bg-red-900' },
  { id: 'tradition-javanese', name: 'Adat Jawa', category: 'Tradition', color: 'bg-amber-50' },
  { id: 'tradition-minang', name: 'Adat Minang', category: 'Tradition', color: 'bg-red-800' },
  { id: 'tradition-balinese', name: 'Adat Bali', category: 'Tradition', color: 'bg-yellow-50' },
];

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState('couple');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    slug: 'wedding-nicola-salsa',
    theme: 'regular-invitation',
    groomName: 'Nicola Valentino',
    brideName: 'Salsabillah Putri',
    eventDate: 'Kamis, 09 Oktober 2025',
    eventLocation: 'Bocek Karangploso, Malang',
    accountNumber: '8163069596',
  });

  const previewHtml = useMemo(() => {
    return generateHTML(formData, formData.theme);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    const { error } = await supabase
      .from('invitations')
      .upsert({ 
        slug: formData.slug, 
        theme: formData.theme, 
        data_json: formData 
      }, { onConflict: 'slug' });

    if (error) {
      console.error('Error publishing:', error);
      alert('Gagal mempublikasikan. Slug mungkin sudah digunakan.');
    } else {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      setPublishUrl(`${baseUrl}/v/${formData.slug}`);
    }
    
    setIsPublishing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 font-sans flex flex-col overflow-hidden">
      <header className="h-16 border-b border-white/40 bg-white/60 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
            <Heart size={18} fill="currentColor" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">WeddingBuilder</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Premium Edition</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-500 font-mono">
            invitation.site/v/{formData.slug}
          </div>
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPublishing ? (
              <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Saving...</span>
            ) : (
              <><Send size={14} /> Publikasikan</>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="w-full lg:w-[480px] bg-white/40 border-r border-white/50 flex flex-col h-full z-20 backdrop-blur-md">
          <div className="flex border-b border-white/50 bg-white/50">
            {[
              { id: 'couple', icon: Users, label: 'Mempelai' },
              { id: 'event', icon: Calendar, label: 'Acara' },
              { id: 'theme', icon: Palette, label: 'Tema' },
              { id: 'gift', icon: CreditCard, label: 'Kado' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all relative ${activeTab === tab.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <tab.icon size={18} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
                {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500" />}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'couple' && (
                <motion.div key="couple" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mempelai Pria</label>
                    <input name="groomName" value={formData.groomName} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="Nama Lengkap Pria" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mempelai Wanita</label>
                    <input name="brideName" value={formData.brideName} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm" placeholder="Nama Lengkap Wanita" />
                  </div>
                  <div className="space-y-1 pt-4 border-t border-dashed border-slate-200">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom URL (Slug)</label>
                    <div className="flex items-center">
                      <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl px-3 py-3 text-xs text-slate-500 font-mono">/v/</span>
                      <input name="slug" value={formData.slug} onChange={handleInputChange} className="flex-1 bg-white border border-slate-200 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-mono" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'event' && (
                <motion.div key="event" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal Acara</label>
                    <input name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="Contoh: Minggu, 10 Agustus 2025" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lokasi Lengkap</label>
                    <textarea name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm min-h-[100px] resize-none" placeholder="Alamat Gedung / Rumah..." />
                  </div>
                </motion.div>
              )}

              {activeTab === 'theme' && (
                <motion.div key="theme" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setFormData(prev => ({ ...prev, theme: theme.id }))}
                        className={`relative p-3 rounded-xl border text-left transition-all group overflow-hidden ${formData.theme === theme.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'}`}
                      >
                        <div className={`h-12 w-full ${theme.color} rounded-lg mb-3 shadow-inner opacity-80 group-hover:opacity-100 transition-opacity`} />
                        <p className="text-xs font-bold text-slate-700 truncate">{theme.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">{theme.category}</p>
                        {formData.theme === theme.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gift' && (
                <motion.div key="gift" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 flex items-start gap-3">
                    <Sparkles className="text-blue-500 mt-0.5" size={16} />
                    <p className="text-xs text-blue-700 leading-relaxed">Fitur ini memungkinkan tamu menyalin nomor rekening Anda untuk memberikan hadiah pernikahan.</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nomor Rekening</label>
                    <input name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="Contoh: 1234567890" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 bg-slate-100/50 relative flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="hidden lg:flex items-center gap-2 mb-6 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm z-10">
            <Eye size={14} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live Preview</span>
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-[340px] md:w-[360px] h-[640px] md:h-[700px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-[8px] border-slate-800 ring-1 ring-black/5 z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />
            <div className="w-full h-full rounded-[35px] overflow-hidden bg-white relative">
              <iframe 
                srcDoc={previewHtml}
                title="Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts"
              />
            </div>
          </motion.div>

          <p className="mt-8 text-[10px] text-slate-400 font-medium uppercase tracking-widest flex items-center gap-2">
            <LayoutTemplate size={12} />
            {THEMES.find(t => t.id === formData.theme)?.name} Theme Selected
          </p>
        </div>
      </main>

      <AnimatePresence>
        {publishUrl && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Check size={32} strokeWidth={3} />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Undangan Siap!</h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">Undangan digital Anda dengan tema <span className="text-white font-bold">{THEMES.find(t => t.id === formData.theme)?.name}</span> telah berhasil dipublikasikan.</p>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl mb-6">
                <div className="flex-1 text-xs text-slate-600 font-mono truncate px-2 text-left">
                  {publishUrl}
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(publishUrl)}
                  className="p-2 hover:bg-white rounded-lg text-slate-500 hover:text-blue-600 hover:shadow-sm transition-all"
                  title="Salin Link"
                >
                  <Copy size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPublishUrl('')}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Tutup
                </button>
                <a 
                  href={publishUrl} 
                  target="_blank"
                  rel="noreferrer" 
                  className="py-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  Buka Link <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}