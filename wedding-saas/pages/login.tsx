import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    if (user) {
        router.push('/');
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            router.push('/');
        } catch (error: any) {
            // Fallback to Magic Link if password fails or user prefers
            if (error.message.includes('Invalid login credentials')) {
                setMessage('Login gagal. Coba cek email/password atau gunakan Magic Link.');
            } else {
                setMessage(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleMagicLink = async () => {
        setLoading(true);
        setMessage('');
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : 'https://weddinginvitation-18.vercel.app',
                }
            });
            if (error) throw error;
            setMessage('Link login telah dikirim ke email Anda!');
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : 'https://weddinginvitation-18.vercel.app',
                }
            });

            if (error) throw error;
            setMessage('Silakan cek email Anda untuk konfirmasi pendaftaran.');
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setMessage('');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : 'https://weddinginvitation-18.vercel.app',
                }
            });
            if (error) throw error;
        } catch (error: any) {
            setMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <div>
                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold py-3 px-4 rounded-xl transition shadow-sm mb-6"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        Masuk dengan Google
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-medium">ATAU GUNAKAN EMAIL</span>
                        </div>
                    </div>

                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        {isSignUp ? 'Daftar Akun Baru' : 'Masuk ke Akun Anda'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Atau{' '}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="font-medium text-pink-600 hover:text-pink-500"
                        >
                            {isSignUp ? 'sudah punya akun? Masuk' : 'daftar akun baru gratis'}
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                placeholder="Alamat Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`text-sm text-center ${message.includes('terkirim') || message.includes('konfirmasi') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                        >
                            {loading ? 'Memproses...' : (isSignUp ? 'Daftar' : 'Masuk')}
                        </button>
                    </div>

                    {!isSignUp && (
                        <div className="text-center mt-2">
                            <span className="text-xs text-gray-500">Lupa password? </span>
                            <button type="button" onClick={handleMagicLink} className="text-xs text-pink-600 hover:underline disabled:opacity-50" disabled={!email || loading}>
                                Kirim Magic Link Login
                            </button>
                        </div>
                    )}
                </form>

                <div className="text-center mt-4">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                        &larr; Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
