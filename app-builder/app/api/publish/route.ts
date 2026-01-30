import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Pastikan path ini benar
import { generateHTML, InvitationData } from '@/lib/generator';

// Handler untuk metode POST
export async function POST(request: Request) {
  // 1. Validasi Input
  if (!process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json(
      {
        error: 'Konfigurasi Error: SUPABASE_SERVICE_KEY tidak ditemukan atau tidak valid di server. Pastikan Anda sudah mengaturnya di Environment Variables.',
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { slug, theme, formData } = body;

  if (!slug || !theme || !formData) {
    return NextResponse.json({ error: 'Slug, theme, and formData are required' }, { status: 400 });
  }

  // 2. Logging Payload
  console.log("Payload yang dikirim ke Supabase:", { slug, theme, data_json: formData });

  try {
    // 3. Gunakan .upsert() untuk menyimpan data ke Supabase
    const { data, error } = await supabase
      .from('invitations')
      .upsert(
        {
          slug: slug,
          theme: theme,
          data_json: formData, // Simpan seluruh objek form
        },
        {
          onConflict: 'slug', // Jika ada slug yang sama, update datanya
        }
      )
      .select() // select() untuk mendapatkan data yang di-upsert
      .single(); // Asumsikan hanya satu baris yang terpengaruh

    // 4. Penanganan Error Supabase
    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        {
          error: error.message, // Pesan error utama
          details: error.details, // Detail tambahan dari Supabase
        },
        { status: 500 }
      );
    }
    
    // 5. Konstruksi URL Berhasil
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const url = `${protocol}://${host}/v/${slug}`;

    // 6. Respons Sukses
    return NextResponse.json({ success: true, url: url, data: data });

  } catch (err: any) {
    // Penanganan error tak terduga lainnya
    console.error('Internal Server Error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred' }, { status: 500 });
  }
}