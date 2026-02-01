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
import MaroonVintage from '../templates/MaroonVintage';
import AdatBone from '../templates/AdatBone';
import ElegantVanilla from '../templates/ElegantVanilla';

interface InvitationPageProps {
    data: InvitationData | null;
    error?: string;
}

export default function InvitationPage({ data, error }: InvitationPageProps) {
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

    const renderTemplate = () => {
        switch (data.metadata.theme_id) {
            case 'classic-serif': return <ClassicSerif data={data} />;
            case 'botanical-line': return <BotanicalLine data={data} />;
            case 'rustic-wood': return <RusticWood data={data} />;
            case 'dark-luxury': return <DarkLuxury data={data} />;
            case 'premium-peppy': return <PremiumPeppy data={data} />;
            case 'gamer-quest': return <GamerQuest data={data} />;
            case 'maroon-vintage': return <MaroonVintage data={data} />;
            case 'adat-bone': return <AdatBone data={data} />;
            case 'elegant-vanilla': return <ElegantVanilla data={data} />;
            case 'modern-arch': default: return <ModernArch data={data} />;
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
