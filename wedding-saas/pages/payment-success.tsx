import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
                <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Pembayaran Berhasil Dikirim!</h1>
                <p className="text-gray-600 mb-8">
                    Terima kasih telah melakukan pembayaran. Tim kami akan segera memverifikasi pembayaran Anda dan mengirimkan konfirmasi melalui email.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
