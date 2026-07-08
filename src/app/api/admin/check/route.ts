import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!email || !adminEmail) {
      return NextResponse.json({ isAdmin: false });
    }

    const cleanInput = email.trim().toLowerCase();
    const cleanAdmin = adminEmail.trim().toLowerCase();

    return NextResponse.json({ isAdmin: cleanInput === cleanAdmin });
  } catch (err) {
    console.error("[admin-check-api]", err);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
