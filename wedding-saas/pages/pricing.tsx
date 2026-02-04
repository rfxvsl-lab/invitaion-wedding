import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { supabase } from '@/lib/supabase';

interface PricingProps {
    content: Record<string, string>;
}

export default function PricingPage({ content }: PricingProps) {
    const router = useRouter();

    const packages = [
        {
            title: content['pricing_1_name'] || "Basic",
            price: content['pricing_1_price'] || "Rp 50.000",
            feats: (content['pricing_1_desc'] || '100 Tamu, 3 Pilihan Tema, Music Auto Play, Masa Aktif 3 Bulan').split(', '),
            fullPrice: content['pricing_1_full'] || 'Rp 99.000',
            tier: 'basic'
        },
        {
            title: content['pricing_2_name'] || "Premium",
            price: content['pricing_2_price'] || "Rp 100.000",
            feats: (content['pricing_2_desc'] || 'Tamu Tak Terbatas, Semua Tema Premium, Digital Envelope, Masa Aktif Selamanya').split(', '),
            pop: true,
            fullPrice: content['pricing_2_full'] || 'Rp 149.000',
            tier: 'premium'
        },
        {
            title: content['pricing_3_name'] || "Exclusive",
            price: content['pricing_3_price'] || "Rp 150.000",
            feats: (content['pricing_3_desc'] || 'Custom Domain (.com), Prioritas Support, Hapus Watermark, Video Invitation').split(', '),
            fullPrice: content['pricing_3_full'] || 'Rp 299.000',
            tier: 'exclusive'
        }
    ];

    return (
        <div className="page-enter bg-rose-50/50 min-h-screen flex flex-col">
            <Head>
                <title>Harga Paket - UndanganKita</title>
                <meta name="description" content="Pilih paket undangan pernikahan digital terbaik." />
            </Head>

            <Navbar />

            <main className="flex-1 pt-32 pb-20 container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">{content['pricing_title'] || 'Pilihan Paket Hemat'}</h1>
                    <p className="text-gray-500">{content['pricing_desc'] || 'Tanpa biaya bulanan. Bayar sekali, aktif selamanya.'}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-up delay-100">
                    {packages.map((pkg, idx) => (
                        <div key={idx} className={`relative bg-white rounded-3xl p-8 border-2 transition-transform hover:-translate-y-2 ${pkg.pop ? 'border-rose-500 shadow-2xl scale-105 z-10' : 'border-gray-100 shadow-lg'}`}>
                            {pkg.pop && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-bold">Paling Laris</div>}
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                            <div className="flex items-end gap-1 mb-6">
                                <span className={`text-4xl font-bold ${pkg.pop ? 'text-rose-600' : 'text-gray-900'}`}>{pkg.price}</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {pkg.feats.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-600">
                                        <div className="bg-green-100 text-green-600 rounded-full p-1"><Check size={12} /></div>
                                        <span className="text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => router.push(`/payment?tier=${pkg.tier}`)}
                                className={`w-full py-3 rounded-xl font-bold transition-colors ${pkg.pop ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
                            >
                                Pilih Paket
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch Site Content
    const { data: contentData } = await supabase.from('site_content').select('key, value');
    const content: Record<string, string> = {};
    if (contentData) {
        contentData.forEach((item: any) => content[item.key] = item.value);
    }

    return {
        props: {
            content
        },
    };
};
