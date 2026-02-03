import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { Menu, X } from 'lucide-react';

export const SCCLogo = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
    <div className={`scc-logo-container relative ${className}`} style={{ width: size, height: size }}>
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

    const isActive = (path: string) => router.pathname === path;

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/themes', label: 'Tema Undangan' },
        { href: '/pricing', label: 'Harga' },
        // Add more links if needed
    ];

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                    <SCCLogo size={45} />
                    <span className="font-script text-3xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors">Undangan Kita</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-bold transition-colors ${isActive(link.href) ? 'text-rose-600' : 'text-gray-600 hover:text-rose-600'}`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {user ? (
                        <>
                            <Link
                                href="/admin"
                                className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <button onClick={() => signOut()} className="text-sm font-bold text-gray-500 hover:text-rose-600 transition-colors">
                                Keluar
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-rose-600 transition-colors">
                            Masuk
                        </Link>
                    )}

                    <Link href="/pricing" className="bg-rose-600 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-700 transition-transform hover:scale-105 shadow-lg shadow-rose-200">
                        Buat Undangan
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-xl animate-fade-in absolute w-full left-0 top-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-left font-semibold py-2 border-b border-gray-100 ${isActive(link.href) ? 'text-rose-600' : 'text-gray-600'}`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {user ? (
                        <>
                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-left font-semibold py-2 border-b border-gray-100 text-purple-600">
                                Dashboard
                            </Link>
                            <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-left font-semibold py-2 border-b border-gray-100 text-gray-500">
                                Keluar
                            </button>
                        </>
                    ) : (
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-left font-semibold py-2 border-b border-gray-100 text-gray-600">
                            Masuk
                        </Link>
                    )}

                    <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="bg-rose-600 text-white w-full py-3 rounded-lg font-bold text-center hover:bg-rose-700">
                        Buat Undangan
                    </Link>
                </div>
            )}
        </nav>
    );
}
