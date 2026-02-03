import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Home, Users, Palette, ShoppingCart, FileQuestion, LogOut, CheckCircle, XCircle, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getPendingOrders, updateOrderStatus } from '../../lib/database';
import { Order } from '../../types/database';

const AdminOrdersPage = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        checkAuth();
        fetchOrders();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.email !== 'mhmmadridho64@gmail.com') {
            router.push('/login');
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        const data = await getPendingOrders();
        setOrders(data);
        setLoading(false);
    };

    const handleAccept = async (orderId: string) => {
        if (!confirm('Terima pembayaran ini?')) return;

        setProcessing(true);
        const success = await updateOrderStatus(orderId, 'paid');

        if (success) {
            // Send Email Notification
            const order = orders.find(o => o.id === orderId);
            if (order) {
                try {
                    await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            to: order.customer_email,
                            subject: 'Pembayaran Diterima - WeddingSaaS',
                            html: `
                                <h1>Pembayaran Berhasil!</h1>
                                <p>Halo ${order.customer_name},</p>
                                <p>Terima kasih telah melakukan pembayaran untuk paket <strong>${order.tier_selected.toUpperCase()}</strong>.</p>
                                <p>Akun Anda kini sudah aktif. Silakan login ke dashboard untuk mulai membuat undangan pernikahan impian Anda.</p>
                                <br/>
                                <a href="${typeof window !== 'undefined' ? window.location.origin : ''}/login" style="background: purple; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Masuk ke Dashboard</a>
                            `
                        })
                    });
                    alert('Pembayaran diterima! Email konfirmasi terkirim.');
                } catch (emailError) {
                    console.error(emailError);
                    alert('Pembayaran diterima, tapi GAGAL mengirim email (Cek konfigurasi SMTP).');
                }
            }
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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Home size={20} />
                        Dashboard
                    </a>
                    <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Users size={20} />
                        Users
                    </a>
                    <a href="/admin/themes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
                        <Palette size={20} />
                        Themes
                    </a>
                    <a href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/20 font-semibold">
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
                    <h2 className="text-3xl font-bold mb-8">Antrian Pembayaran</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : orders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
                            Tidak ada pembayaran yang perlu diverifikasi.
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{order.customer_name}</h3>
                                            <p className="text-gray-600">{order.customer_email} • {order.customer_phone}</p>
                                        </div>
                                        <div>
                                            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                {order.tier_selected.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            <Eye size={18} />
                                            Lihat Bukti
                                        </button>
                                        <button
                                            onClick={() => handleAccept(order.id)}
                                            disabled={processing}
                                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                                        >
                                            <CheckCircle size={18} />
                                            Terima
                                        </button>
                                        <button
                                            onClick={() => handleReject(order.id)}
                                            disabled={processing}
                                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                        >
                                            <XCircle size={18} />
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal for Proof */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold mb-4">Bukti Transfer</h3>
                        <div className="mb-4">
                            <p><strong>Nama:</strong> {selectedOrder.customer_name}</p>
                            <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                            <p><strong>Metode:</strong> {selectedOrder.payment_method}</p>
                        </div>
                        <img src={selectedOrder.proof_url} alt="Bukti Transfer" className="w-full rounded-lg mb-4" />
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleAccept(selectedOrder.id)}
                                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                            >
                                Terima Pembayaran
                            </button>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
