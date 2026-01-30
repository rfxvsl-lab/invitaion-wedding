import { NextResponse } from 'next/server';
import { generateHTML, InvitationData } from '@/lib/generator';

// The main API route handler
export async function POST(req: Request) {
  try {
    const body = await req.json() as InvitationData;

    // PENTING: Tambahkan 'await' karena generateHTML sekarang async
    const htmlContent = await generateHTML(body);

    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error: any) {
    console.error('Error in preview API:', error);
    
    // Kirim pesan error yang lebih informatif ke client
    return new Response(`<h1>Error Generating Preview</h1><p>${error.message}</p>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
