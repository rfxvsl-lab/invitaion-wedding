import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex flex-col items-center justify-center p-6 text-center font-sans">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
                <Heart size={32} fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Wedding SaaS</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                Platform pembuatan undangan pernikahan digital yang modern, cepat, dan elegan.
            </p>

            <Link
                href="/editor"
                className="group bg-gray-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                Masuk ke Editor <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
