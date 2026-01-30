
import { supabase } from '@/lib/supabase';
import { generateHTML, InvitationData } from '@/lib/generator';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 0; // Force dynamic rendering

async function getInvitationData(slug: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select('theme, data_json')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching invitation:', error);
    return null;
  }
  return data as { theme: string; data_json: InvitationData };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = params;
  const invitation = await getInvitationData(slug);

  if (!invitation) {
    return <div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-700">Undangan tidak ditemukan.</div>;
  }

  // Combine theme from DB with the rest of the form_data for generator
  const fullData: InvitationData = {
    ...invitation.data_json,
    theme: invitation.theme,
  };

  const htmlContent = generateHTML(fullData);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

