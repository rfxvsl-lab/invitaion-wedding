import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useRef, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { InvitationData } from '../../types/invitation';
import { InstagramStoryTemplate } from '../../components/InstagramStoryTemplate';

interface InstagramPageProps {
    data: InvitationData | null;
    error?: string;
}

export default function InstagramPage({ data, error }: InstagramPageProps) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                // Determine scale based on window height/width vs 1080x1920
                // We want it to fit in the screen with some padding
                const padding = 40;
                const availableHeight = window.innerHeight - padding;
                const availableWidth = window.innerWidth - padding;

                const scaleHeight = availableHeight / 1920;
                const scaleWidth = availableWidth / 1080;

                // Use the smaller scale to fit entirely
                setScale(Math.min(scaleHeight, scaleWidth, 1)); // Max scale 1
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-sans">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p>{error || 'Undangan tidak ditemukan.'}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{data.content.hero.nicknames} | IG Story Preview</title>
                <meta name="description" content={`Instagram Story Preview for ${data.content.hero.nicknames}`} />
            </Head>
            <div className="bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden relative">
                <div className="absolute top-4 left-0 w-full text-center z-50 pointer-events-none">
                    <p className="text-gray-400 text-xs uppercase tracking-widest bg-black/50 inline-block px-3 py-1 rounded-full">Preview Mode (1080x1920)</p>
                </div>

                {/* Container for centering and scaling */}
                <div ref={containerRef} className="relative flex items-center justify-center">
                    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}>
                        <div className="shadow-2xl border-4 border-gray-800">
                            <InstagramStoryTemplate
                                data={data}
                                guestName="Nama Tamu"
                                wish="Selamat menempuh hidup baru, semoga bahagia selalu bersama pasangan."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as { slug: string };

    const { data: invitation, error } = await supabase
        .from('invitations')
        .select('data')
        .eq('slug', slug)
        .single();

    if (error || !invitation) {
        return {
            props: { error: 'Undangan tidak ditemukan' }
        };
    }

    return {
        props: {
            data: invitation.data
        }
    };
};
