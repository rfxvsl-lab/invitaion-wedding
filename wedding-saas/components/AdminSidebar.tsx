import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Home, Users, Palette, ShoppingCart, FileQuestion, Settings, Layout, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getPendingOrders } from '../lib/database';

export default function AdminSidebar() {
    const router = useRouter();
    const [pendingCount, setPendingCount] = useState(0);
    const [profile, setProfile] = useState<any>(null); // State for user profile

    useEffect(() => {
        const fetchStats = async () => {
            const orders = await getPendingOrders();
            setPendingCount(orders.length);

            // Fetch User Profile (Tokens & Tier)
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(data);
            }
        };
        fetchStats();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full z-10 transition-all duration-300">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <span className="font-bold text-lg">U</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
                </div>

                {/* User Profile Card */}
                {profile && (
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mb-2 animate-fade-in">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Tier Member</p>
                                <p className="text-sm font-bold text-white truncate capitalize">{profile.tier || 'Free'}</p>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-2 flex justify-between items-center px-3 border border-slate-700">
                            <span className="text-xs text-slate-400 font-bold">TOKENS</span>
                            <span className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                                {profile.tokens ?? 0} <span className="text-yellow-500/50">⚡</span>
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <nav className="space-y-1 flex-1">
                <NavItem href="/admin" icon={<Home size={20} />} label="Dashboard" />
                <NavItem href="/admin/my-invitation" icon={<Layout size={20} />} label="Undangan Saya" />

                {/* Admin Only Menus - Optional: Hide if not admin */}
                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Admin Zone</p>
                </div>
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
