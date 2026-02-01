import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import Head from 'next/head';

export default function Admin() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [content, setContent] = useState<any[]>([]);
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading) {
            if (!user || user.email !== 'mhmmadridho.64@gmail.com') {
                router.push('/');
            } else {
                fetchContent();
            }
        }
    }, [user, loading, router]);

    const fetchContent = async () => {
        const { data, error } = await supabase.from('site_content').select('*').order('created_at', { ascending: false });
        if (data) setContent(data);
    };

    const handleUpdate = async (id: string, value: string) => {
        setMessage('Updating...');
        const { error } = await supabase.from('site_content').update({ value }).eq('id', id);
        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Updated successfully');
            fetchContent();
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('site_content').insert([{ key: newKey, value: newValue }]);
        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Added successfully');
            setNewKey('');
            setNewValue('');
            fetchContent();
        }
    };

    if (loading || !user || user.email !== 'mhmmadridho.64@gmail.com') {
        return <div className="p-10 text-center">Loading Admin Panel...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head>
                <title>Admin God Mode - UndanganKita</title>
            </Head>

            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin God Mode ⚡</h1>
                    <button onClick={() => router.push('/')} className="text-gray-600 hover:text-gray-900">Back to Home</button>
                </div>

                {/* Add New Content */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">Add New Content Key</h2>
                    <form onSubmit={handleAdd} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Key (e.g. hero_title)"
                            className="border p-2 rounded flex-1"
                            value={newKey}
                            onChange={(e) => setNewKey(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Value (e.g. Bagikan Kebahagiaan)"
                            className="border p-2 rounded flex-2 w-full"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Add</button>
                    </form>
                </div>

                {/* List Content */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Manage Site Content</h2>
                    {message && <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">{message}</div>}

                    <div className="space-y-4">
                        {content.map((item) => (
                            <div key={item.id} className="border-b pb-4">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{item.key}</label>
                                <div className="flex gap-4">
                                    <textarea
                                        className="w-full border p-2 rounded"
                                        defaultValue={item.value}
                                        onBlur={(e) => handleUpdate(item.id, e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Click outside to save.</p>
                            </div>
                        ))}
                        {content.length === 0 && <p className="text-gray-500">No content found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
