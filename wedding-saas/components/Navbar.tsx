import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
        // If we are not on home page, push to home with hash
        if (router.pathname !== '/') {
            // Let Link handle the navigation if it's a simple href, but we want smooth scroll
            // Actually, just let standard behavior work if we use <Link href="/#id">
            return;
        }

        // If we are on home page, smooth scroll
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                        <i className="fa-solid fa-envelope-open-text text-3xl text-primary group-hover:scale-110 transition"></i>
                        <span className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Undangan<span className="text-primary">Kita</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-gray-600 hover:text-primary font-medium transition relative group">
                            Beranda
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                        </Link>
                        <Link href="/#fitur" className="text-gray-600 hover:text-primary font-medium transition relative group">
                            Fitur
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                        </Link>
                        <Link href="/themes" className="text-gray-600 hover:text-primary font-medium transition relative group">
                            Tema
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                        </Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-primary font-medium transition relative group">
                            Harga
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                        </Link>
                        <Link href="/#faq" className="text-gray-600 hover:text-primary font-medium transition relative group">
                            FAQ
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                        </Link>
                        {user ? (
                            <Link href="/admin" className="text-purple-600 font-bold hover:text-purple-800 transition">
                                Dashboard
                            </Link>
                        ) : null}
                    </div>

                    {/* CTA Button Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <button onClick={() => signOut()} className="text-gray-600 hover:text-primary font-medium">
                                Keluar
                            </button>
                        ) : (
                            <button onClick={() => router.push('/login')} className="text-gray-600 hover:text-primary font-medium">
                                Masuk
                            </button>
                        )}
                        <Link href="/themes" className="bg-primary hover:bg-pink-800 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5">
                            Buat Undangan
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-pink-600 focus:outline-none p-2">
                            {!mobileMenuOpen ? (
                                <i className="fa-solid fa-bars text-2xl"></i>
                            ) : (
                                <i className="fa-solid fa-xmark text-2xl"></i>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg z-50 animate-fadeIn">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Beranda</Link>
                        <Link href="/#fitur" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Fitur</Link>
                        <Link href="/themes" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Tema</Link>
                        <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md">Harga</Link>

                        <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <Link href="/admin" className="w-full text-center py-2 text-purple-600 font-bold">Dashboard</Link>
                                    <button onClick={() => signOut()} className="w-full text-center py-2 text-gray-600 font-medium">Keluar</button>
                                </>
                            ) : (
                                <button onClick={() => router.push('/login')} className="w-full text-center py-2 text-gray-600 font-medium">Masuk</button>
                            )}
                            <Link href="/themes" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 bg-pink-600 text-white rounded-lg font-bold shadow-md hover:bg-pink-800">Buat Undangan Sekarang</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
