import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Home, Users, Palette, ShoppingCart, FileQuestion, Settings, Layout, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getPendingOrders } from '../lib/database';

export default function AdminSidebar() {
    const router = useRouter();
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            const orders = await getPendingOrders();
            setPendingCount(orders.length);
        };
        fetchStats();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full z-10 transition-all duration-300">
            <div className="mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <span className="font-bold text-lg">U</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
            </div>

            <nav className="space-y-1 flex-1">
                <NavItem href="/admin" icon={<Home size={20} />} label="Dashboard" />
                <NavItem href="/admin/orders" icon={<ShoppingCart size={20} />} label="Orders" badge={pendingCount > 0 ? pendingCount : undefined} />
                <NavItem href="/admin/themes" icon={<Palette size={20} />} label="Themes" />
                <NavItem href="/admin/cms" icon={<Layout size={20} />} label="Site Content" />
                <NavItem href="/admin/faqs" icon={<FileQuestion size={20} />} label="FAQs" />
                <NavItem href="/admin/users" icon={<Users size={20} />} label="Users" />
                <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
            </nav>

            <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition text-slate-400 hover:text-white mt-auto group">
                <LogOut size={20} className="group-hover:text-red-400 transition" />
                <span>Sign Out</span>
            </button>
        </aside>
    );
}

const NavItem = ({ href, icon, label, badge }: any) => {
    const router = useRouter();
    const active = router.pathname === href;

    return (
        <button
            onClick={() => router.push(href)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition font-medium text-sm ${active
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {badge && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    {badge}
                </span>
            )}
        </button>
    );
};
