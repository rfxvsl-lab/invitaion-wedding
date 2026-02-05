import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { Menu, X, User, LogOut } from 'lucide-react';

import { BrandLogo } from './Logo';

export default function Navbar() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, profile, signOut } = useAuth();
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
    ];

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                    <BrandLogo size={45} />
                    <span className="font-script text-3xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors">Undangkan Kita</span>
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

                    {/* Admin Dashboard Link (Only for Admin) */}
                    {user && (user.email === 'mhmmadridho64@gmail.com' || user.email === 'undangankita.co.id@gmail.com') && (
                        <Link
                            href="/admin"
                            className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors"
                        >
                            Admin
                        </Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Buat Undangan (Shifted Left) */}
                            <Link href="/editor" className="bg-rose-600 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-700 transition-transform hover:scale-105 shadow-lg shadow-rose-200">
                                Buat Undangan
                            </Link>

                            {/* Hamburger Profile Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                                >
                                    <Menu size={24} className="text-gray-700" />
                                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold border border-rose-200">
                                        {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                </button>

                                {/* Dropdown */}
                                {profileOpen && (
                                    <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in origin-top-right overflow-hidden">
                                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-sm font-bold text-gray-800 truncate">{profile?.full_name || 'User'}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>

                                        <Link
                                            href="/dashboard/user"
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                        >
                                            <User size={18} />
                                            Profil User
                                        </Link>

                                        <button
                                            onClick={() => { signOut(); setProfileOpen(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                                        >
                                            <LogOut size={18} />
                                            Keluar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-rose-600 transition-colors">
                                Masuk
                            </Link>
                            <Link href="/editor" className="bg-rose-600 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-700 transition-transform hover:scale-105 shadow-lg shadow-rose-200">
                                Buat Undangan
                            </Link>
                        </div>
                    )}
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

                    {user && (user.email === 'mhmmadridho64@gmail.com' || user.email === 'undangankita.co.id@gmail.com') && (
                        <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-left font-semibold py-2 border-b border-gray-100 text-purple-600">
                            Dashboard Admin
                        </Link>
                    )}

                    {user ? (
                        <>
                            <Link href="/dashboard/user" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-left font-semibold py-2 border-b border-gray-100 text-rose-600">
                                <User size={18} /> Profil User
                            </Link>
                            <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-left font-semibold py-2 border-b border-gray-100 text-red-500">
                                <LogOut size={18} /> Keluar
                            </button>
                        </>
                    ) : (
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-left font-semibold py-2 border-b border-gray-100 text-gray-600">
                            Masuk
                        </Link>
                    )}

                    <Link href="/editor" onClick={() => setMobileMenuOpen(false)} className="bg-rose-600 text-white w-full py-3 rounded-lg font-bold text-center hover:bg-rose-700">
                        Buat Undangan
                    </Link>
                </div>
            )}
        </nav>
    );
}
