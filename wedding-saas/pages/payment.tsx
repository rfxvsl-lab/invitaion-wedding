import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Upload, Loader } from 'lucide-react';
import { createOrder, uploadPaymentProof } from '../lib/database';
import { supabase } from '../lib/supabase';

const PaymentPage = () => {
    const router = useRouter();
    const { tier } = router.query;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        paymentMethod: ''
    });
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [instructions, setInstructions] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchInstructions = async () => {
            const { data } = await supabase.from('site_content').select('key, value');
            if (data) {
                const instructionsMap: Record<string, string> = {};
                data.forEach((item: any) => {
                    instructionsMap[item.key] = item.value;
                });
                setInstructions(instructionsMap);
            }
        };
        fetchInstructions();
    }, []);

    const tierDisplay = tier ? String(tier).toUpperCase() : 'PAKET';

    const paymentMethods = [
        { value: 'qris', label: 'QRIS' },
        { value: 'shopeepay', label: 'ShopeePay' },
        { value: 'seabank', label: 'SeaBank' },
        { value: 'bank_transfer', label: 'Transfer Bank (BCA/Mandiri/Lainnya)' }
    ];

    const getInstructionText = () => {
        if (!formData.paymentMethod) return null;
        if (formData.paymentMethod === 'qris') return instructions['payment_instructions_qris'] || 'Scan QRIS yang tersedia.';
        if (formData.paymentMethod === 'bank_transfer') return instructions['payment_instructions_bank'] || 'Silakan hubungi admin untuk info rekening.';
        if (['shopeepay', 'seabank'].includes(formData.paymentMethod)) return instructions['payment_instructions_ewallet'] || 'Silakan hubungi admin untuk info e-wallet.';
        return null;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProofFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
        if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
        if (!formData.phone.trim()) newErrors.phone = 'No. Telepon wajib diisi';
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Pilih metode pembayaran';
        if (!proofFile) newErrors.proof = 'Upload bukti transfer';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            alert('Mohon lengkapi semua field yang wajib diisi!');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload proof
            const uploadResult = await uploadPaymentProof(proofFile!);
            if (!uploadResult.success) {
                throw new Error(uploadResult.error || 'Gagal upload bukti');
            }

            // 2. Create order
            const orderResult = await createOrder({
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                tier_selected: String(tier),
                payment_method: formData.paymentMethod,
                proof_url: uploadResult.url!
            });

            if (!orderResult.success) {
                throw new Error(orderResult.error || 'Gagal membuat order');
            }

            // 3. Success - redirect
            router.push('/payment-success');
        } catch (err: any) {
            console.error('Payment error:', err);
            alert(`Gagal memproses pembayaran: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        WeddingSaaS
                    </Link>
                </div>
            </header>

            {/* Form */}
            <section className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold mb-2 text-center">Form Pembayaran</h1>
                    <p className="text-center text-gray-600 mb-8">
                        Paket Dipilih: <span className="font-bold text-purple-600">{tierDisplay}</span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Masukkan nama lengkap"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="email@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">No. Telepon <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="08xxxxxxxxxx"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Metode Pembayaran <span className="text-red-500">*</span></label>
                            <select
                                value={formData.paymentMethod}
                                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Pilih metode pembayaran</option>
                                {paymentMethods.map((method) => (
                                    <option key={method.value} value={method.value}>{method.label}</option>
                                ))}
                            </select>
                            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}

                            {/* Dynamic Payment Instruction Display */}
                            {formData.paymentMethod && (
                                <div className="mt-4 p-4 bg-gray-50 border rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                                    <p className="font-bold mb-2">Instruksi Pembayaran:</p>
                                    {formData.paymentMethod === 'qris' && instructions['payment_instructions_qris_url'] ? (
                                        <div className="text-center">
                                            <img src={instructions['payment_instructions_qris_url']} alt="QRIS" className="max-w-[200px] mx-auto mb-2" />
                                            <p>{instructions['payment_instructions_qris'] || 'Scan QRIS di atas.'}</p>
                                        </div>
                                    ) : (
                                        <p>{getInstructionText()}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Upload Proof */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Upload Bukti Transfer <span className="text-red-500">*</span></label>
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition ${errors.proof ? 'border-red-500' : 'border-gray-300'}`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="proof-upload"
                                />
                                <label htmlFor="proof-upload" className="cursor-pointer">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-2" />
                                    ) : (
                                        <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                                    )}
                                    <p className="text-sm text-gray-600">{proofFile ? proofFile.name : 'Klik untuk upload'}</p>
                                </label>
                            </div>
                            {errors.proof && <p className="text-red-500 text-sm mt-1">{errors.proof}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    Memproses...
                                </>
                            ) : (
                                'Submit Pembayaran'
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default PaymentPage;
