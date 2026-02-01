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
            if (!user || user.email !== 'mhmmadridho64@gmail.com') {
                router.push('/');
            } else {
                fetchContent();
            }
        }
    }, [user, loading, router]);

    const fetchContent = async () => {
        const { data, error } = await supabase.from('site_content').select('*').order('section', { ascending: true });
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

    if (loading || !user || user.email !== 'mhmmadridho64@gmail.com') {
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

                {/* List Content Grouped by Section */}
                <div className="space-y-8">
                    {(Object.entries(content.reduce((acc, item) => {
                        (acc[item.section] = acc[item.section] || []).push(item);
                        return acc;
                    }, {} as Record<string, any[]>)) as [string, any[]][]).map(([section, items]) => (
                        <div key={section} className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-bold mb-4 capitalize border-b pb-2">{section} Section</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-gray-50 pb-4 last:border-0 hover:bg-gray-50 p-2 rounded transition">
                                        <div className="md:col-span-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{item.key}</label>
                                            <p className="text-xs text-gray-400 font-mono truncate">{item.id}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <textarea
                                                className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent transition text-sm"
                                                defaultValue={item.value}
                                                rows={item.value.length > 50 ? 3 : 1}
                                                onBlur={(e) => handleUpdate(item.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {content.length === 0 && <div className="text-center p-10 bg-white rounded-xl text-gray-500">No content found. Please run the seed SQL.</div>}
                </div>
            </div>
        </div>
    );
}
