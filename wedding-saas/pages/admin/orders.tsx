import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { updateOrderStatus } from '../../lib/database';
import { Order } from '../../types/database';
import AdminLayout from '@/components/AdminLayout';

const AdminOrdersPage = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 10;
    const [hasMore, setHasMore] = useState(true);

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || (user.email !== 'mhmmadridho64@gmail.com' && user.email !== 'undangankita.co.id@gmail.com')) {
            router.push('/login');
        }
    };

    const fetchOrders = async () => {
        setLoading(true);

        const from = page * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error } = await supabase
            .from('orders')
            .select('*', { count: 'exact' })
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Error fetching orders:', error);
            alert('Gagal mengambil data order.');
        } else {
            setOrders(data || []);
            setHasMore(data && data.length === PAGE_SIZE);
        }
        setLoading(false);
    };

    const handleAccept = async (orderId: string) => {
        if (!confirm('Terima pembayaran ini?')) return;

        setProcessing(true);
        const success = await updateOrderStatus(orderId, 'paid');

        if (success) {
            alert('Pembayaran diterima! Status diperbarui.');
            fetchOrders();
            setSelectedOrder(null);
        } else {
            alert('Gagal update status');
        }
        setProcessing(false);
    };

    const handleReject = async (orderId: string) => {
        if (!confirm('Tolak pembayaran ini?')) return;

        setProcessing(true);
        const success = await updateOrderStatus(orderId, 'rejected');

        if (success) {
            alert('Pembayaran ditolak.');
            fetchOrders();
            setSelectedOrder(null);
        } else {
            alert('Gagal update status');
        }
        setProcessing(false);
    };

    return (
        <AdminLayout title="Kelola Order - Admin">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Antrian Pembayaran</h2>

            {loading ? (
                <div className="p-12 text-center text-slate-400">Loading data...</div>
            ) : orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center text-slate-500">
                    <p className="text-lg font-medium">Tidak ada pembayaran yang perlu diverifikasi.</p>
                    <p className="text-sm mt-2">Semua order aman terkendali.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{order.customer_name}</h3>
                                    <p className="text-slate-500 text-sm mt-1">{order.customer_email} • {order.customer_phone}</p>
                                </div>
                                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {order.tier_selected}
                                </span>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition text-sm"
                                >
                                    <Eye size={16} />
                                    Lihat Bukti
                                </button>
                                <button
                                    onClick={() => handleAccept(order.id)}
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-600 transition text-sm disabled:opacity-50"
                                >
                                    <CheckCircle size={16} />
                                    Terima
                                </button>
                                <button
                                    onClick={() => handleReject(order.id)}
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200 transition text-sm disabled:opacity-50"
                                >
                                    <XCircle size={16} />
                                    Tolak
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-xl border border-slate-100">
                        <button
                            disabled={page === 0 || loading}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg disabled:opacity-50 hover:bg-slate-200 transition"
                        >
                            ← Previous
                        </button>
                        <span className="font-bold text-slate-700">Halaman {page + 1}</span>
                        <button
                            disabled={!hasMore || loading}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg disabled:opacity-50 hover:bg-slate-800 transition"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Proof */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl scale-100 animate-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold mb-6 text-slate-900">Bukti Transfer</h3>
                        <div className="mb-6 bg-slate-50 p-4 rounded-xl text-sm">
                            <p className="mb-1"><strong className="text-slate-700">Nama:</strong> {selectedOrder.customer_name}</p>
                            <p className="mb-1"><strong className="text-slate-700">Email:</strong> {selectedOrder.customer_email}</p>
                            <p><strong className="text-slate-700">Metode:</strong> {selectedOrder.payment_method}</p>
                        </div>
                        <div className="bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200">
                            <img src={selectedOrder.proof_url} alt="Bukti Transfer" className="w-full max-h-[400px] object-contain" />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleAccept(selectedOrder.id)}
                                className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
                            >
                                Terima Pembayaran
                            </button>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminOrdersPage;
