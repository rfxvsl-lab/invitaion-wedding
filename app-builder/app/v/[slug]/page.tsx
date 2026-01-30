import { supabase } from '@/lib/supabase';
import { generateHTML, FormData } from '@/lib/generator';
import { notFound } from 'next/navigation';

// Force dynamic rendering - prevent static generation at build time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. Ambil Data dari Supabase (Server-side)
async function getInvitationData(slug: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

// 2. Render Halaman
export default async function InvitationPage({ params }: PageProps) {
  const record = await getInvitationData(params.slug);

  if (!record) {
    notFound(); // Tampilkan 404 jika slug tidak ditemukan
  }

  // Generate HTML final berdasarkan data dari DB (synchronous with static imports)
  const htmlContent = generateHTML(record.data_json as FormData, record.theme);

  return (
    <div
      className="w-full h-screen overflow-hidden bg-black"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

// Temporarily disabled to prevent build-time errors
// Metadata can be added after deployment succeeds
/*
export async function generateMetadata({ params }: PageProps) {
  const record = await getInvitationData(params.slug);
  
  if (!record) return { title: 'Undangan Tidak Ditemukan' };

  const data = record.data_json as FormData;
  return {
    title: `The Wedding of ${data.groomName} & ${data.brideName}`,
    description: `Kami mengundang Anda ke acara pernikahan kami pada ${data.eventDate}`,
  };
}
*/