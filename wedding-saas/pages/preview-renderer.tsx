import { useState, useEffect } from 'react';
import { TEMPLATES } from '@/lib/templates';
import { InvitationData } from '@/types/invitation';
import Head from 'next/head';

export default function PreviewRenderer() {
    const [data, setData] = useState<InvitationData | null>(null);

    useEffect(() => {
        // Listen for messages from parent (Editor)
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'UPDATE_DATA') {
                setData(event.data.payload);
            }
        };

        window.addEventListener('message', handleMessage);

        // Notify parent we are ready (Handshake)
        if (window.parent) {
            window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
        }

        return () => window.removeEventListener('message', handleMessage);
    }, []);

    if (!data) return <div className="flex items-center justify-center h-screen text-slate-400 text-sm">Loading Preview...</div>;

    const ActiveTemplate = TEMPLATES.find(t => t.id === data.metadata.theme_id)?.component || (() => <div>Template Not Found</div>);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <ActiveTemplate data={data} guestName="Tamu Undangan" />
        </>
    );
}
