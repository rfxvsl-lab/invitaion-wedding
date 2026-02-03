import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Home, Users, Palette, ShoppingCart, FileQuestion, Mail, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface UserProfile {
    id: string;
    email: string;
    role: string;
    last_sign_in_at: string;
}

const AdminUsersPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        fetchUsers();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.email !== 'mhmmadridho64@gmail.com') {
            router.push('/login');
        }
    };

    const fetchUsers = async () => {
        // Fetching users from auth schema usually requires Service Role Key in backend.
        // For security, client-side cannot list all users unless we use a supabase edge function or custom RPC.
        // HOWEVER, since we don't have that set up, we will fetch from a public 'profiles' table if it exists, 
        // OR we'll just mock it with the current user for now as a placeholder since we didn't set up a public profiles table sync trigger.
        // Wait, earlier the user asked to see "who logged in/registered with complete data".

        // Strategy: Query 'orders' table to get customer data as a proxy for 'active users' 
        // OR assuming we have a profiles table. If not, I'll display orders customers here as "Clients".

        setLoading(true);
        // Using 'orders' as a source of truth for clients for now since we haven't set up the Auth Sync to Table trigger.
        const { data: orders } = await supabase.from('orders').select('customer_name, customer_email, tier_selected, created_at, customer_phone');

        // Remove duplicates emails
        const uniqueUsers = Array.from(new Set(orders?.map(o => o.customer_email)))
            .map(email => {
                const order = orders?.find(o => o.customer_email === email);
                return {
                    id: email, // use email as id
                    email: email,
                    name: order?.customer_name,
                    phone: order?.customer_phone,
                    tier: order?.tier_selected,
                    joined_at: order?.created_at
                };
            });

        setUsers(uniqueUsers as any);
        setLoading(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Home size={20} />
                        Dashboard
                    </a>
                    <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/20 font-semibold">
                        <Users size={20} />
                        Users
                    </a>
                    <a href="/admin/themes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Palette size={20} />
                        Themes
                    </a>
                    <a href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <ShoppingCart size={20} />
                        Orders
                    </a>
                    <a href="/admin/faqs" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <FileQuestion size={20} />
                        FAQs
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Daftar Pengguna / Klien</h2>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kontak</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paket Terakhir</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bergabung</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan={4} className="p-6 text-center">Loading...</td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td colSpan={4} className="p-6 text-center text-gray-500">Belum ada user.</td></tr>
                                ) : (
                                    users.map((user: any, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                                <div className="text-sm text-gray-400">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 uppercase font-semibold">
                                                    {user.tier}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.joined_at).toLocaleDateString('id-ID')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminUsersPage;
