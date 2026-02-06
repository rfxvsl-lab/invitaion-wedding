import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import { Users, Palette, ShoppingCart } from 'lucide-react';
import { getPendingOrders } from '../../lib/database';
import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        pendingOrders: 0,
        totalUsers: 0,
        totalThemes: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        fetchStats();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }

        // Strict Admin Check
        if (user.email !== 'mhmmadridho64@gmail.com') {
            router.push('/editor');
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        // Fetch Pending Orders
        const { count: pendingCount } = await getPendingOrders(0, 50);

        // Fetch Total Users
        const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

        // Fetch Total Themes
        const { count: themeCount } = await supabase.from('themes').select('*', { count: 'exact', head: true });

        setStats({
            pendingOrders: pendingCount || 0,
            totalUsers: userCount || 0,
            totalThemes: themeCount || 0
        });
        setLoading(false);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <AdminLayout title="Admin Panel - UndanganKita">
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Selamat datang kembali, Admin.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={<ShoppingCart className="text-orange-600" size={24} />}
                    bg="bg-orange-50"
                    border="border-orange-100"
                    link="/admin/orders"
                />
                <StatCard
                    title="Total Themes"
                    value={stats.totalThemes}
                    icon={<Palette className="text-purple-600" size={24} />}
                    bg="bg-purple-50"
                    border="border-purple-100"
                    link="/admin/themes"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<Users className="text-blue-600" size={24} />}
                    bg="bg-blue-50"
                    border="border-blue-100"
                    link="/admin/users"
                />
            </div>

            {/* Recent Activity / Quick Actions could go here */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <button onClick={() => router.push('/admin/themes')} className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition">
                        + Add New Theme
                    </button>
                    <button onClick={() => router.push('/admin/cms')} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                        Edit Homepage Text
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

const StatCard = ({ title, value, icon, bg, border, link }: any) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(link)} className={`cursor-pointer p-6 rounded-2xl border ${bg} ${border} transition hover:-translate-y-1`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    {icon}
                </div>
                {/* Arrow icon maybe? */}
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{value}</h3>
            <p className="text-slate-500 font-medium text-sm">{title}</p>
        </div>
    );
};
