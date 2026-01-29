import { NextRequest, NextResponse } from 'next/server';
import { generateHTML, InvitationData } from '../../../lib/generator';

export async function POST(req: NextRequest) {
  try {
    // 1. Terima data JSON dari Frontend
    const body = await req.json();
    const data: InvitationData = body;

    // 2. Jalankan mesin generator
    const htmlContent = generateHTML(data);

    // 3. Kirim balik HTML sebagai text/html
    return new NextResponse(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error: any) {
    console.error("Error generating preview:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}