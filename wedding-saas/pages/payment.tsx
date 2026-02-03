import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    ArrowLeft, ArrowRight, Check, CreditCard, Lock, ShieldCheck,
    Smartphone, User, Mail, Link as LinkIcon, ChevronRight,
    QrCode, Copy, AlertCircle, Upload, Loader
} from 'lucide-react';
import { createOrder, uploadPaymentProof } from '../lib/database';
import { supabase } from '../lib/supabase';

/**
 * --- GLOBAL STYLES ---
 */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap');

    :root {
      --primary: #be185d; /* Pink 700 */
      --primary-light: #fbcfe8; /* Pink 200 */
      --bg-cream: #fff1f2; /* Rose 50 */
    }

    body {
      font-family: 'Nunito Sans', sans-serif;
      background-color: #f9fafb;
      color: #1f2937;
    }

    h1, h2, h3 { font-family: 'Playfair Display', serif; }
    .font-script { font-family: 'Great Vibes', cursive; }

    /* SCC Logo Animation */
    .scc-logo-container:hover .scc-envelope { transform: translateY(4px); }
    .scc-logo-container:hover .scc-flap { transform: rotateX(180deg); }
    .scc-logo-container:hover .scc-heart { opacity: 1; transform: scale(1) translateY(-10px); }
    
    .scc-envelope { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .scc-flap { transform-origin: top; transition: transform 0.5s ease-in-out; }
    .scc-heart { 
      transform-origin: center; 
      transition: transform 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s; 
      opacity: 0; transform: scale(0); 
    }

    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

/**
 * --- COMPONENT: LOGO ---
 */
const SCCLogo = ({ size = 40 }) => (
    <div className="scc-logo-container relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path d="M50 40 C60 30 75 30 80 40 C85 50 75 65 50 80 C25 65 15 50 20 40 C25 30 40 30 50 40 Z" fill="#be185d" className="scc-heart" />
            <g className="scc-envelope">
                <rect x="10" y="30" width="80" height="50" rx="5" fill="#be185d" />
                <path d="M10 30 L50 60 L90 30" fill="#9d174d" />
                <path d="M10 80 L50 55 L90 80" fill="#db2777" opacity="0.5" />
                <text x="50" y="65" fontSize="16" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="Nunito Sans">SCC</text>
                <path d="M10 30 L50 60 L90 30 L90 25 L10 25 Z" fill="#fbcfe8" className="scc-flap" />
            </g>
        </svg>
    </div>
);

/**
 * --- MAIN PAYMENT PAGE ---
 */
export default function PaymentPage() {
    const router = useRouter();
    const { tier } = router.query;
    const tierName = tier ? String(tier).toUpperCase() : 'PREMIUM';

    // State
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);

    // Data State
    const [formData, setFormData] = useState({
        maleName: '',
        femaleName: '',
        email: '',
        slug: '',
        whatsapp: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [orderIdDisplay, setOrderIdDisplay] = useState('');

    // Derived state for display
    const prices: Record<string, string> = {
        'free': 'Rp 0',
        'basic': 'Rp 50.000',
        'premium': 'Rp 100.000',
        'exclusive': 'Rp 150.000'
    };
    const priceDisplay = prices[String(tier)] || 'Rp 100.000';

    const selectedPlan = {
        name: `${tierName} Plan`,
        price: priceDisplay,
        features: ["Undangan Digital", "Masa Aktif Sesuai Paket", "Fitur Premium (Sesuai Tier)", "Support Prioritas"],
        originalPrice: "Rp 299.000",
        discount: "Hemat!"
    };

    const handleNext = () => {
        // Validate Step 1
        if (step === 1) {
            if (!formData.maleName || !formData.femaleName || !formData.email || !formData.slug || !formData.whatsapp) {
                alert('Mohon lengkapi semua data diri!');
                return;
            }
            setStep(2);
            window.scrollTo(0, 0);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProofFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmitPayment = async () => {
        if (!paymentMethod) {
            alert('Pilih metode pembayaran!');
            return;
        }
        if (!proofFile) {
            alert('Mohon upload bukti transfer!');
            return;
        }

        setLoading(true);

        try {
            // 1. Upload proof
            const uploadResult = await uploadPaymentProof(proofFile);
            if (!uploadResult.success) throw new Error(uploadResult.error || 'Gagal upload bukti');

            // 2. Create order
            // Combine names for customer_name
            const customerName = `${formData.maleName} & ${formData.femaleName}`;

            const orderResult = await createOrder({
                customer_name: customerName,
                customer_email: formData.email,
                customer_phone: formData.whatsapp,
                tier_selected: String(tier || 'premium'),
                payment_method: paymentMethod,
                proof_url: uploadResult.url!,
                slug: formData.slug
            });

            if (!orderResult.success) throw new Error(orderResult.error || 'Gagal membuat order');

            setOrderIdDisplay(orderResult.orderId ? `#TRX-${orderResult.orderId.substring(0, 8).toUpperCase()}` : '#TRX-NEW');
            setStep(3);
            window.scrollTo(0, 0);

        } catch (err: any) {
            console.error('Payment error:', err);
            alert(`Gagal memproses pembayaran: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <GlobalStyles />

            {/* HEADER KHUSUS CHECKOUT (Minimalist) */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <SCCLogo size={35} />
                            <span className="font-script text-2xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors">Undangan Kita</span>
                        </Link>
                        <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>
                        <span className="text-gray-500 font-bold text-sm hidden md:block">Secure Checkout</span>
                    </div>

                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100">
                        <ShieldCheck size={14} />
                        <span>Enkripsi SSL 256-bit</span>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 md:py-12 w-full">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: STEPS & FORMS */}
                    <div className="lg:col-span-8">

                        {/* Progress Indicator */}
                        <div className="flex items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-rose-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 1 ? 'border-rose-600 bg-rose-50' : 'border-gray-300'}`}>1</div>
                                <span className="font-bold text-sm hidden sm:inline">Data Diri</span>
                            </div>
                            <div className={`flex-1 h-[2px] mx-4 ${step >= 2 ? 'bg-rose-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-rose-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 2 ? 'border-rose-600 bg-rose-50' : 'border-gray-300'}`}>2</div>
                                <span className="font-bold text-sm hidden sm:inline">Pembayaran</span>
                            </div>
                            <div className={`flex-1 h-[2px] mx-4 ${step >= 3 ? 'bg-rose-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-rose-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 3 ? 'border-rose-600 bg-rose-50' : 'border-gray-300'}`}>3</div>
                                <span className="font-bold text-sm hidden sm:inline">Selesai</span>
                            </div>
                        </div>

                        {/* STEP 1: FORM DATA */}
                        {step === 1 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden fade-in">
                                <div className="p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <User className="text-rose-600" /> Informasi Akun
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Panggilan Pria</label>
                                            <input
                                                type="text"
                                                value={formData.maleName}
                                                onChange={(e) => setFormData({ ...formData, maleName: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                                placeholder="Contoh: Rizky"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Panggilan Wanita</label>
                                            <input
                                                type="text"
                                                value={formData.femaleName}
                                                onChange={(e) => setFormData({ ...formData, femaleName: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                                placeholder="Contoh: Anisa"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email (Untuk Login)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-12 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                                placeholder="kamu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Link Undangan (Slug)</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 transition-all bg-gray-50">
                                            <span className="px-4 py-3 text-gray-500 border-r border-gray-300 text-sm md:text-base flex items-center gap-1">
                                                <LinkIcon size={14} /> undangankita.com/
                                            </span>
                                            <input
                                                type="text"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="flex-1 px-4 py-3 outline-none bg-white font-bold text-gray-800"
                                                placeholder="rizky-anisa"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12} /> Link ini tidak dapat diubah setelah pembayaran.</p>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                            <input
                                                type="tel"
                                                value={formData.whatsapp}
                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                className="w-full pl-12 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                                placeholder="081234567890"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleNext}
                                            disabled={loading}
                                            className="bg-rose-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-200 flex items-center gap-2"
                                        >
                                            {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> : <>Lanjut <ArrowRight size={20} /></>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: PAYMENT METHOD */}
                        {step === 2 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden fade-in">
                                <div className="p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <CreditCard className="text-rose-600" /> Metode Pembayaran
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        {/* QRIS */}
                                        <div
                                            onClick={() => setPaymentMethod('qris')}
                                            className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-rose-600 bg-rose-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qris' ? 'border-rose-600' : 'border-gray-300'}`}>
                                                        {paymentMethod === 'qris' && <div className="w-3 h-3 bg-rose-600 rounded-full"></div>}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">QRIS Instant</p>
                                                        <p className="text-sm text-gray-500">GoPay, OVO, Dana, ShopeePay, BCA Mobile</p>
                                                    </div>
                                                </div>
                                                <QrCode className="text-gray-400" />
                                            </div>

                                            {paymentMethod === 'qris' && (
                                                <div className="mt-4 pl-10 fade-in">
                                                    <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block shadow-sm">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Commons_QR_code.png/150px-Commons_QR_code.png" alt="QRIS" className="w-32 h-32 opacity-80 mix-blend-multiply" />
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">Scan kode QR di atas untuk pembayaran otomatis.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Transfer Bank */}
                                        <div
                                            onClick={() => setPaymentMethod('bank_transfer')}
                                            className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${paymentMethod === 'bank_transfer' ? 'border-rose-600 bg-rose-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-rose-600' : 'border-gray-300'}`}>
                                                        {paymentMethod === 'bank_transfer' && <div className="w-3 h-3 bg-rose-600 rounded-full"></div>}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">Virtual Account Bank</p>
                                                        <p className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</p>
                                                    </div>
                                                </div>
                                                <CreditCard className="text-gray-400" />
                                            </div>

                                            {paymentMethod === 'bank_transfer' && (
                                                <div className="mt-4 pl-10 grid grid-cols-2 md:grid-cols-4 gap-3 fade-in">
                                                    <button className="border rounded p-2 text-sm font-bold text-blue-800 hover:bg-blue-50 transition-colors">BCA</button>
                                                    <button className="border rounded p-2 text-sm font-bold text-yellow-600 hover:bg-yellow-50 transition-colors">Mandiri</button>
                                                    <button className="border rounded p-2 text-sm font-bold text-green-600 hover:bg-green-50 transition-colors">BNI</button>
                                                    <button className="border rounded p-2 text-sm font-bold text-blue-500 hover:bg-blue-50 transition-colors">BRI</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* PROOF UPLOAD */}
                                    <div className="mb-8 border-t border-gray-100 pt-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Upload Bukti Transfer / Pembayaran</label>
                                        <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-rose-500 transition border-gray-300`}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                id="proof-upload"
                                            />
                                            <label htmlFor="proof-upload" className="cursor-pointer w-full block">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-2 shadow-sm" />
                                                ) : (
                                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                                )}
                                                <p className="text-sm text-gray-600 font-medium">{proofFile ? proofFile.name : 'Klik untuk upload bukti pembayaran'}</p>
                                                <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG. Max 5MB</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <div className="hidden md:block">
                                            <p className="text-sm text-gray-500">Total Tagihan</p>
                                            <p className="text-2xl font-bold text-rose-600">{priceDisplay}</p>
                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            <button onClick={() => setStep(1)} disabled={loading} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors w-1/3 md:w-auto">Kembali</button>
                                            <button
                                                onClick={handleSubmitPayment}
                                                disabled={loading}
                                                className="flex-1 md:flex-none bg-rose-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-rose-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                                                        Memproses...
                                                    </>
                                                ) : "Bayar Sekarang"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: SUCCESS */}
                        {step === 3 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden fade-in text-center p-12">
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                    <Check size={48} className="text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Pembayaran Berhasil Dijadwalkan!</h2>
                                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                                    Terima kasih! Pesanan Anda sedang diverifikasi oleh admin. Kami juga telah mengirimkan detail pesanan ke email Anda.
                                </p>

                                <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto mb-8 border border-gray-200 text-left">
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                                        <span className="text-gray-500 text-sm">ID Transaksi</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-bold text-gray-800">{orderIdDisplay}</span>
                                            <Copy size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">Paket</span>
                                        <span className="font-bold text-gray-800">{selectedPlan.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">Metode</span>
                                        <span className="font-bold text-gray-800 uppercase">{paymentMethod}</span>
                                    </div>
                                </div>

                                <Link href="/admin" className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl inline-block">
                                    Masuk ke Dashboard
                                </Link>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-6 text-lg">Ringkasan Pesanan</h3>

                            <div className="flex gap-4 mb-6">
                                <div className="w-16 h-16 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                                    <Smartphone size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{selectedPlan.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 text-sm line-through">{selectedPlan.originalPrice}</span>
                                        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded">{selectedPlan.discount}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                {selectedPlan.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-green-600" />
                                        </div>
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{selectedPlan.price}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Biaya Admin</span>
                                    <span>Gratis</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                                    <span>Total Bayar</span>
                                    <span className="text-rose-600">{selectedPlan.price}</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-gray-50 p-3 rounded-lg text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                                <Lock size={12} /> Pembayaran aman & terenkripsi
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* FOOTER SIMPLE */}
            <footer className="bg-white border-t border-gray-100 py-8 text-center text-sm text-gray-500">
                <p>&copy; 2024 Undangan Kita SCC. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/terms" className="hover:text-rose-600">Syarat & Ketentuan</Link>
                    <span>•</span>
                    <Link href="/privacy" className="hover:text-rose-600">Kebijakan Privasi</Link>
                    <span>•</span>
                    <a href="#" className="hover:text-rose-600">Bantuan</a>
                </div>
            </footer>
        </div>
    );
}
