import React, { ReactNode } from 'react';
import Head from 'next/head';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Admin Panel - UndanganKita' }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <Head>
                <title>{title}</title>
            </Head>

            <AdminSidebar />

            <main className="flex-1 ml-64 p-8 animate-in fade-in duration-500">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
