import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { DownloadControls } from '../components/DownloadControls';
import { supabase } from '../lib/supabase';
import { InvitationData } from '../types/invitation';

// Templates
import ModernArch from '../templates/ModernArch';
import ClassicSerif from '../templates/ClassicSerif';
import BotanicalLine from '../templates/BotanicalLine';
import RusticWood from '../templates/RusticWood';
import DarkLuxury from '../templates/DarkLuxury';
import PremiumPeppy from '../templates/PremiumPeppy';
import GamerQuest from '../templates/GamerQuest';

import ElegantVanilla from '../templates/ElegantVanilla';
import RoyalGlass from '../templates/RoyalGlass';
import NetflixLuxury from '../templates/NetflixLuxury';
import GrandBallroom from '../templates/GrandBallroom';
import RoyalArabian from '../templates/RoyalArabian';
import LuxuryPink from '../templates/LuxuryPink';
import SpotiLove from '../templates/SpotiLove';

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
        switch (data.metadata.theme_id) {
            case 'classic-serif': return <ClassicSerif data={data} guestName={guestName} />;
            case 'botanical-line': return <BotanicalLine data={data} guestName={guestName} />;
            case 'rustic-wood': return <RusticWood data={data} guestName={guestName} />;
            case 'dark-luxury': return <DarkLuxury data={data} guestName={guestName} />;
            case 'premium-peppy': return <PremiumPeppy data={data} guestName={guestName} />;
            case 'gamer-quest': return <GamerQuest data={data} guestName={guestName} />;

            case 'elegant-vanilla': return <ElegantVanilla data={data} guestName={guestName} />;
            case 'royal-glass': return <RoyalGlass data={data} guestName={guestName} />;
            case 'netflix-luxury': return <NetflixLuxury data={data} guestName={guestName} />;
            case 'grand-ballroom': return <GrandBallroom data={data} guestName={guestName} />;
            case 'royal-arabian': return <RoyalArabian data={data} guestName={guestName} />;
            case 'luxury-pink': return <LuxuryPink data={data} guestName={guestName} />;
            case 'spotilove': return <SpotiLove data={data} guestName={guestName} />;
            case 'modern-arch': default: return <ModernArch data={data} guestName={guestName} />;
        }
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
