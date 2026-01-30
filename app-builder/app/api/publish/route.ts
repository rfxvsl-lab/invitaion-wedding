
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { slug, theme, formData } = await request.json();

    if (!slug || !theme || !formData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('invitations')
      .upsert({ slug, theme, data_json: formData })
      .select();

    // --- DEBUGGING: Mengirim detail error Supabase ke frontend ---
    if (error) {
      console.error('Supabase error:', error);
      // Mengembalikan pesan error yang lebih spesifik untuk debugging
      return NextResponse.json({ error: `Supabase error: ${error.message} (Code: ${error.code})` }, { status: 500 });
    }

    const publishedUrl = `https://weddinginvitation-18.vercel.app/v/${slug}`;
    
    return NextResponse.json({ message: 'Invitation published successfully!', url: publishedUrl, data });
  } catch (error: any) {
    console.error('Handler error:', error);
     // --- DEBUGGING: Mengirim detail error umum ke frontend ---
    return NextResponse.json({ error: `An unexpected handler error occurred: ${error.message}` }, { status: 500 });
  }
}
