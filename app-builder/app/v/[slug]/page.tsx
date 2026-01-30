import { supabase } from '@/app-builder/lib/supabase';
import { generateHTML } from '@/app-builder/lib/generator';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default async function InvitationPage({ params }: Props) {
  const { slug } = params;

  const { data, error } = await supabase
    .from('invitations')
    .select('data_json, theme_id')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  const { data_json: formData, theme_id: themeId } = data;

  if (!formData || !themeId) {
    return <div className="w-full h-screen flex items-center justify-center bg-gray-100"><p className="text-red-500">Error: Data undangan tidak lengkap.</p></div>;
  }

  const finalHtml = generateHTML(formData, themeId);

  if (!finalHtml) {
      return <div className="w-full h-screen flex items-center justify-center bg-gray-100"><p className="text-red-500">Error: Template tidak ditemukan.</p></div>;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
  );
}

// Optional: Prerender pages at build time if you have a list of popular slugs
export async function generateStaticParams() {
  // Example: Fetch top 10 most visited slugs
  const { data: invitations } = await supabase.from('invitations').select('slug').limit(10);
 
  return invitations?.map(({ slug }) => ({ slug })) || [];
}