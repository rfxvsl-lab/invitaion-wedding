'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Gift, Link2, Eye, Code, ArrowRight } from 'lucide-react';
import { generateHTML } from '@/app-builder/lib/generator';
import { TEMPLATES_COLLECTION } from '@/app-builder/lib/templates-data';

const tabs = [
  { id: 'mempelai', label: 'Mempelai', icon: User },
  { id: 'acara', label: 'Acara', icon: Calendar },
  { id: 'kado', label: 'Kado', icon: Gift },
  { id: 'url', label: 'Custom URL', icon: Link2 },
];

const themeThumbnails = {
    "1": "/theme1-thumb.png",
    "2": "/theme2-thumb.png",
    "3": "/theme3-thumb.png",
    "4": "/theme4-thumb.png",
    "5": "/theme5-thumb.png",
    "6": "/theme6-thumb.png",
    "7": "/theme7-thumb.png",
    "8": "/theme8-thumb.png",
    "9": "/theme9-thumb.png",
    "10": "/theme10-thumb.png",
    "11": "/theme11-thumb.png",
    "12": "/theme12-thumb.png",
    "13": "/theme13-thumb.png",
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [formData, setFormData] = useState({
    GROOM_NAME: 'Aditya',
    BRIDE_NAME: 'Sarah',
    EVENT_DATE: 'Sabtu, 28 Desember 2024',
    EVENT_TIME: '10:00 WIB',
    EVENT_LOCATION: 'Grand Ballroom Hotel Indonesia, Jakarta',
    GIFT_BANK_NAME: 'BCA',
    GIFT_BANK_ACCOUNT: '1234567890',
    CUSTOM_URL: 'aditya-sarah-wedding'
  });
  const [selectedTheme, setSelectedTheme] = useState('1');
  const [liveHtml, setLiveHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generated = generateHTML(formData, selectedTheme);
    setLiveHtml(generated || '');
  }, [formData, selectedTheme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    setIsLoading(true);
    // Logika untuk menyimpan ke Supabase akan ada di sini
    console.log("Publishing...");
    console.log({ slug: formData.CUSTOM_URL, themeId: selectedTheme, data_json: formData });
    
    // Simulasikan network request
    setTimeout(() => {
      setIsLoading(false);
      console.log("Published!");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-white flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-7xl h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Panel: Controls */}
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Digital Invitation Builder</h1>
          <p className="text-gray-600 mb-6">Buat undangan pernikahan digital Anda dalam hitungan menit.</p>

          <div className="border-b border-gray-200/80 mb-6">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  } relative whitespace-nowrap py-4 px-1 text-sm font-medium`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon size={18} />
                    {tab.label}
                  </div>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-grow"
            >
              {activeTab === 'mempelai' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informasi Mempelai</h3>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama Mempelai Pria</label>
                    <input type="text" name="GROOM_NAME" value={formData.GROOM_NAME} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama Mempelai Wanita</label>
                    <input type="text" name="BRIDE_NAME" value={formData.BRIDE_NAME} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                  </div>
                </div>
              )}
               {activeTab === 'acara' && (
                <div className="space-y-4">
                   <h3 className="font-semibold text-lg">Detail Acara</h3>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tanggal</label>
                    <input type="text" name="EVENT_DATE" value={formData.EVENT_DATE} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Waktu</label>
                    <input type="text" name="EVENT_TIME" value={formData.EVENT_TIME} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                  </div>
                   <div>
                    <label className="text-sm font-medium text-gray-700">Lokasi</label>
                    <input type="text" name="EVENT_LOCATION" value={formData.EVENT_LOCATION} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                  </div>
                </div>
              )}
              {activeTab === 'kado' && (
                 <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Hadiah Digital</h3>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nama Bank</label>
                        <input type="text" name="GIFT_BANK_NAME" value={formData.GIFT_BANK_NAME} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nomor Rekening</label>
                        <input type="text" name="GIFT_BANK_ACCOUNT" value={formData.GIFT_BANK_ACCOUNT} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md shadow-sm" />
                    </div>
                </div>
              )}
              {activeTab === 'url' && (
                <div>
                    <h3 className="font-semibold text-lg">Custom URL</h3>
                    <label className="text-sm font-medium text-gray-700">Slug URL</label>
                    <div className="flex items-center mt-1">
                        <span className="text-gray-500 bg-gray-200 p-2 rounded-l-md">https://yourdomain.com/v/</span>
                        <input type="text" name="CUSTOM_URL" value={formData.CUSTOM_URL} onChange={handleInputChange} className="w-full p-2 border rounded-r-md shadow-sm" />
                    </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-6">
            <h3 className="font-semibold text-lg mb-3">Pilih Tema</h3>
             <div className="grid grid-cols-4 gap-4 mb-6">
                {Object.keys(TEMPLATES_COLLECTION).map(themeId => (
                    <div key={themeId} onClick={() => setSelectedTheme(themeId)} className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${selectedTheme === themeId ? 'border-blue-500' : 'border-transparent'}`}>
                        <img src={`https://via.placeholder.com/150/EEEEEE/808080?text=Tema+${themeId}`} alt={`Tema ${themeId}`} className="w-full h-auto aspect-video object-cover"/>
                         {selectedTheme === themeId && (
                            <div className="absolute inset-0 bg-blue-500/50 flex items-center justify-center">
                                <Eye className="text-white" size={24} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button 
              onClick={handlePublish} 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-400">
              {isLoading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <Code size={20} />
                </motion.div>
              ) : (
                <>
                  Publikasikan <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="hidden lg:flex items-center justify-center">
            <div className="w-[375px] h-[750px] bg-gray-800 rounded-[40px] p-4 shadow-2xl ring-4 ring-gray-700">
                <div className="w-full h-full bg-white rounded-[20px] overflow-hidden">
                     <iframe 
                        srcDoc={liveHtml} 
                        title="Live Preview" 
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                     />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
