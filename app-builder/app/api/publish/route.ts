
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { slug, theme, formData } = await request.json();

    if (!slug || !theme || !formData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("invitations")
      .upsert({ slug, theme, form_data: formData })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to publish invitation." }, { status: 500 });
    }

    const publishedUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/v/${slug}`;
    
    return NextResponse.json({ message: "Invitation published successfully!", url: publishedUrl, data });
  } catch (error) {
    console.error("handler error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
