
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
    .select('theme, form_data')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching invitation:', error);
    return null;
  }
  return data as { theme: string; form_data: InvitationData };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = params;
  const invitation = await getInvitationData(slug);

  if (!invitation) {
    notFound();
  }

  // Combine theme from DB with the rest of the form_data for generator
  const fullData: InvitationData = {
    ...invitation.form_data,
    theme: invitation.theme,
  };

  const htmlContent = generateHTML(fullData);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
