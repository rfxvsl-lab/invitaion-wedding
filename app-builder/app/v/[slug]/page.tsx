import { supabase } from '@/lib/supabase';
import { generateHTML, InvitationData } from '@/lib/generator'; // Menggunakan generator yang sudah diperbaiki
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

// Pastikan halaman ini selalu mengambil data terbaru dari server
export const revalidate = 0;

// Fungsi untuk mengambil data undangan dari Supabase
async function getInvitationData(slug: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select('theme, data_json') // Pilih kolom theme dan data_json
    .eq('slug', slug)
    .single(); // Ambil satu baris data

  // Jika ada error atau tidak ada data, log dan return null
  if (error || !data) {
    console.error(`Error fetching invitation for slug [${slug}]:`, error);
    return null;
  }
  
  return data as { theme: string; data_json: InvitationData };
}

// Komponen Halaman Undangan Dinamis
export default async function InvitationPage({ params }: PageProps) {
  const { slug } = params;
  const invitation = await getInvitationData(slug);

  // Jika undangan tidak ditemukan, tampilkan pesan yang jelas
  if (!invitation) {
    return (
        <div style={{ fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#4A5568', backgroundColor: '#F7FAFC' }}>
            <h1>Undangan tidak ditemukan atau belum dipublikasikan.</h1>
        </div>
    );
  }

  // Gabungkan data dari database untuk dikirim ke generator
  const fullData: InvitationData = {
    ...invitation.data_json,
    theme: invitation.theme,
  };

  try {
    // Hasilkan HTML menggunakan fungsi generateHTML yang sudah diperbarui
    const htmlContent = generateHTML(fullData);

    // Render HTML ke dalam div
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );

  } catch (error: any) {
    // Tangkap error jika generateHTML gagal (misal, template tetap tidak ditemukan)
    console.error('Error generating live page HTML:', error);
    return (
        <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#C53030', backgroundColor: '#FFF5F5' }}>
            <h1>Error 500: Gagal Membuat Halaman Undangan</h1>
            <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', background: '#FED7D7', padding: '1rem', borderRadius: '8px' }}>
                {error.message}
            </pre>
        </div>
    );
  }
}