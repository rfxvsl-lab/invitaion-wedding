import React from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

const PricingPage = () => {
    const tiers = [
        {
            name: 'FREE',
            price: 'Rp 0',
            color: 'from-gray-400 to-gray-600',
            features: [
                { text: '3 Template Tema', included: true },
                { text: 'Durasi Aktif: 7 Hari', included: true },
                { text: 'Maksimal 50 Tamu', included: true },
                { text: 'Galeri Foto: 6 Foto', included: true },
                { text: 'Musik Latar', included: true },
                { text: 'Google Maps', included: true },
                { text: 'Countdown Timer', included: true },
                { text: 'RSVP via WhatsApp', included: true },
                { text: 'Custom Background', included: false },
                { text: 'DIY Layout Editor', included: false },
                { text: 'Video Upload', included: false },
                { text: 'Edit Unlimited', included: false }
            ]
        },
        {
            name: 'BASIC',
            price: 'Rp 50.000',
            color: 'from-blue-400 to-blue-600',
            features: [
                { text: '6 Template Tema', included: true },
                { text: 'Durasi Aktif: 30 Hari', included: true },
                { text: 'Tamu Unlimited', included: true },
                { text: 'Galeri Foto: 12 Foto', included: true },
                { text: 'Musik Latar', included: true },
                { text: 'Google Maps', included: true },
                { text: 'Countdown Timer', included: true },
                { text: 'RSVP via WhatsApp', included: true },
                { text: 'Custom Background', included: true },
                { text: 'DIY Layout Editor', included: false },
                { text: 'Video Upload', included: false },
                { text: 'Edit Unlimited', included: false }
            ]
        },
        {
            name: 'PREMIUM',
            price: 'Rp 100.000',
            color: 'from-purple-400 to-purple-600',
            popular: true,
            features: [
                { text: '9 Template Tema Premium', included: true },
                { text: 'Durasi Aktif: 90 Hari', included: true },
                { text: 'Tamu Unlimited', included: true },
                { text: 'Galeri Foto: 20 Foto', included: true },
                { text: 'Musik Latar', included: true },
                { text: 'Google Maps', included: true },
                { text: 'Countdown Timer', included: true },
                { text: 'RSVP via WhatsApp', included: true },
                { text: 'Custom Background', included: true },
                { text: 'DIY Layout Editor', included: true },
                { text: 'Video Upload', included: true },
                { text: 'Edit Unlimited', included: true }
            ]
        },
        {
            name: 'EXCLUSIVE',
            price: 'Rp 150.000',
            color: 'from-amber-400 to-amber-600',
            features: [
                { text: '12 Template Tema Exclusive', included: true },
                { text: 'Durasi Aktif: SELAMANYA', included: true },
                { text: 'Tamu Unlimited', included: true },
                { text: 'Galeri Foto: Unlimited', included: true },
                { text: 'Musik Latar', included: true },
                { text: 'Google Maps', included: true },
                { text: 'Countdown Timer', included: true },
                { text: 'RSVP via WhatsApp', included: true },
                { text: 'Custom Background', included: true },
                { text: 'DIY Layout Editor', included: true },
                { text: 'Video Upload', included: true },
                { text: 'Edit Unlimited', included: true }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        WeddingSaaS
                    </Link>
                    <nav className="flex gap-6">
                        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
                        <Link href="/themes" className="hover:text-purple-600 transition">Tema</Link>
                        <Link href="/pricing" className="text-purple-600 font-semibold">Harga</Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Pilih Paket yang Sesuai
                </h1>
                <p className="text-gray-600 text-lg">
                    Semua paket sudah termasuk fitur dasar. Upgrade untuk akses template premium dan fitur tambahan!
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`relative bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform ${tier.popular ? 'ring-4 ring-purple-500' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                                    TERPOPULER
                                </div>
                            )}

                            <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-4xl font-extrabold">{tier.price}</p>
                            </div>

                            <div className="p-6">
                                <ul className="space-y-3 mb-6">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2">
                                            {feature.included ? (
                                                <Check className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                                            ) : (
                                                <X className="text-gray-300 flex-shrink-0 mt-0.5" size={18} />
                                            )}
                                            <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/payment?tier=${tier.name.toLowerCase()}`}
                                    className={`block w-full text-center py-3 rounded-lg font-bold text-white bg-gradient-to-r ${tier.color} hover:opacity-90 transition`}
                                >
                                    Pilih Paket Ini
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
