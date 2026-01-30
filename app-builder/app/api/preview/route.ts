import { NextRequest, NextResponse } from 'next/server';
import { generateHTML, FormData } from '@/lib/generator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { formData, theme } = body;

        // Generate HTML on server-side (synchronous with static imports)
        const html = generateHTML(formData as FormData, theme);

        return NextResponse.json({ html });
    } catch (error) {
        console.error('Preview generation error:', error);
        return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 });
    }
}
