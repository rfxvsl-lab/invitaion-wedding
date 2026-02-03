import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Col 1 */}
                    <div className="md:col-span-1">
                        <a href="/" className="flex items-center gap-2 mb-6 group">
                            <i className="fa-solid fa-envelope-open-text text-2xl text-primary group-hover:scale-110 transition"></i>
                            <span className="font-serif text-2xl font-bold">Undangan<span className="text-primary">Kita</span></span>
                        </a>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">Platform pembuatan undangan digital berbasis website yang praktis, elegan, dan ramah lingkungan.</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-slate-400 hover:text-white transition duration-300"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-slate-400 hover:text-white transition duration-300"><i className="fa-brands fa-tiktok"></i></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-slate-400 hover:text-white transition duration-300"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Menu</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="/" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Beranda</a></li>
                            <li><a href="/themes" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Katalog Tema</a></li>
                            <li><a href="/pricing" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Harga</a></li>
                            <li><a href="#" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Tentang Kami</a></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-primary transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-xs text-slate-700"></i> Refund Policy</a></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <i className="fa-brands fa-whatsapp text-lg text-green-500 mt-1"></i>
                                <div>
                                    <span className="block text-slate-500 text-xs">WhatsApp</span>
                                    <span className="font-medium text-white">+62 812 3456 7890</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fa-regular fa-envelope text-lg text-primary mt-1"></i>
                                <div>
                                    <span className="block text-slate-500 text-xs">Email</span>
                                    <span className="font-medium text-white">hello@undangankita.com</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <div>&copy; 2024 UndanganKita. All rights reserved.</div>
                    <div>Made with <i className="fa-solid fa-heart text-red-500 animate-pulse"></i> in Indonesia.</div>
                </div>
            </div>
        </footer>
    );
}
