import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-6 group cursor-pointer">
                    <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-rose-900/50">SCC</div>
                    <span className="font-script text-2xl group-hover:text-rose-400 transition-colors">Undangan Kita</span>
                </div>

                <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Platform pembuatan undangan pernikahan digital #1 di Indonesia. Hemat, Praktis, dan Elegan.
                </p>

                <div className="flex justify-center gap-6 mb-8">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-rose-600 hover:text-white transition-all duration-300">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-rose-600 hover:text-white transition-all duration-300">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-rose-600 hover:text-white transition-all duration-300">
                        <Twitter size={20} />
                    </a>
                </div>

                <div className="flex justify-center gap-6 text-sm text-gray-500 mb-8 font-medium">
                    <Link href="#" className="hover:text-rose-400 transition-colors">Syarat & Ketentuan</Link>
                    <Link href="#" className="hover:text-rose-400 transition-colors">Kebijakan Privasi</Link>
                    <Link href="#" className="hover:text-rose-400 transition-colors">Bantuan</Link>
                </div>

                <div className="text-gray-600 text-sm border-t border-gray-800 pt-8">
                    &copy; {new Date().getFullYear()} Undangan Kita SCC. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
