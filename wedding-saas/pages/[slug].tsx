import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react'; // Make sure lucide-react is installed, user used it in other files
import { DownloadControls } from '../components/DownloadControls';
import { supabase } from '../lib/supabase';
import { InvitationData } from '../types/invitation';

// DYNAMIC IMPORTS
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <Loader2 className="animate-spin text-pink-600" size={40} />
    </div>
);

const TEMPLATES: any = {
    'modern-arch': dynamic(() => import('../templates/ModernArch'), { loading: () => <LoadingSpinner /> }),
    'classic-serif': dynamic(() => import('../templates/ClassicSerif'), { loading: () => <LoadingSpinner /> }),
    'botanical-line': dynamic(() => import('../templates/BotanicalLine'), { loading: () => <LoadingSpinner /> }),
    'rustic-wood': dynamic(() => import('../templates/RusticWood'), { loading: () => <LoadingSpinner /> }),
    'dark-luxury': dynamic(() => import('../templates/DarkLuxury'), { loading: () => <LoadingSpinner /> }),
    'premium-peppy': dynamic(() => import('../templates/PremiumPeppy'), { loading: () => <LoadingSpinner /> }),
    'gamer-quest': dynamic(() => import('../templates/GamerQuest'), { loading: () => <LoadingSpinner /> }),
    'elegant-vanilla': dynamic(() => import('../templates/ElegantVanilla'), { loading: () => <LoadingSpinner /> }),
    'royal-glass': dynamic(() => import('../templates/RoyalGlass'), { loading: () => <LoadingSpinner /> }),
    'netflix-luxury': dynamic(() => import('../templates/NetflixLuxury'), { loading: () => <LoadingSpinner /> }),
    'grand-ballroom': dynamic(() => import('../templates/GrandBallroom'), { loading: () => <LoadingSpinner /> }),
    'royal-arabian': dynamic(() => import('../templates/RoyalArabian'), { loading: () => <LoadingSpinner /> }),
    'luxury-pink': dynamic(() => import('../templates/LuxuryPink'), { loading: () => <LoadingSpinner /> }),
    'spotilove': dynamic(() => import('../templates/SpotiLove'), { loading: () => <LoadingSpinner /> }),
};

interface InvitationPageProps {
    data: InvitationData | null;
    guestName: string;
    error?: string;
}

export default function InvitationPage({ data, guestName, error }: InvitationPageProps) {
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

    // Check if invitation is expired
    if (data.metadata.expires_at) {
        const expiresAt = new Date(data.metadata.expires_at);
        const now = new Date();

        if (now > expiresAt) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
                    <div className="max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center border-4 border-red-200">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">⏰</span>
                        </div>
                        <h1 className="text-2xl font-bold text-red-600 mb-3">Undangan Sudah Kadaluarsa</h1>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Undangan ini sudah tidak aktif sejak <strong>{expiresAt.toLocaleDateString('id-ID')}</strong>.
                        </p>
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-amber-800 font-semibold">
                                💡 Upgrade ke <span className="text-amber-900 font-bold">Premium</span> atau <span className="text-amber-900 font-bold">Exclusive</span> untuk durasi lebih lama!
                            </p>
                        </div>
                        <a
                            href="/"
                            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
                        >
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            );
        }
    }

    const renderTemplate = () => {
        // Fallback to modern-arch if theme_id not found
        const ThemeComponent = TEMPLATES[data.metadata.theme_id] || TEMPLATES['modern-arch'];
        return <ThemeComponent data={data} guestName={guestName} />;
    };

    const contentRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <Head>
                <title>{data.content.hero.nicknames} | Wedding Invitation</title>
                <meta name="description" content={`Undangan pernikahan ${data.content.hero.nicknames}`} />
            </Head>
            <DownloadControls targetRef={contentRef} slug={data.metadata.slug} data={data} />
            <div ref={contentRef} className="bg-white min-h-screen">
                {renderTemplate()}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as { slug: string };
    const guestName = (context.query.to as string) || "Tamu Undangan";

    const { data: invitation, error } = await supabase
        .from('invitations')
        .select('content, metadata')
        .eq('slug', slug)
        .single();

    if (error || !invitation) {
        return {
            props: {
                error: 'Undangan tidak ditemukan',
                guestName: "Tamu Undangan",
                data: null
            }
        };
    }

    const invitationData: InvitationData = {
        content: invitation.content,
        metadata: invitation.metadata,
        engagement: invitation.content.engagement || {
            rsvp: true,
            rsvp_settings: { whatsapp_number: '', message_template: '' },
            wishes: [],
            gifts: []
        }
    };

    return {
        props: {
            data: invitationData,
            guestName: decodeURIComponent(guestName)
        }
    };
};
