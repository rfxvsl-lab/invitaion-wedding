import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/AdminLayout';
import { isAdmin } from '../../lib/admin';

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

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 20;

    useEffect(() => {
        if (loading) return; // Prevent double fetch on strict mode mount if handled inside
        // But to keep simple: just standard effect
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!isAdmin(user?.email)) {
            router.push('/login');
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                console.error("No access token found");
                setLoading(false);
                return;
            }

            // Fetch with Pagination Params
            const response = await fetch(`/api/admin/users?page=${page}&limit=${LIMIT}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP Error ${response.status}`);
            }

            const { data: profiles, count } = await response.json();

            const mappedUsers = profiles?.map((p: any) => ({
                id: p.id,
                email: p.email || '-',
                name: p.full_name || 'No Name',
                phone: p.phone_number || '-',
                tier: p.tier || 'free',
                joined_at: p.created_at || new Date().toISOString()
            })) || [];

            setUsers(mappedUsers);
            setTotalPages(Math.ceil((count || 0) / LIMIT));
            setLoading(false);
        } catch (error: any) {
            console.error("Fetch error:", error);
            alert("Gagal load data: " + error.message);
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Daftar Users - Admin">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900">Daftar Pengguna / Klien</h2>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{users.length} Users Total</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kontak</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Paket Terakhir</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Bergabung</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={4} className="p-12 text-center text-slate-400">Loading data...</td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan={4} className="p-12 text-center text-slate-500">Belum ada user yang terdaftar. (Cek RLS Policy jika data ada di DB)</td></tr>
                            ) : (
                                users.map((user: any, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-slate-900">{user.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-600">{user.email}</div>
                                            <div className="text-sm text-slate-400 font-mono mt-0.5">{user.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 uppercase font-bold tracking-wide">
                                                {user.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                                            {new Date(user.joined_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUsersPage;
