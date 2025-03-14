import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "❌ Hiányzó adatok!" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "❌ Hibás email vagy jelszó!" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "❌ Hibás email vagy jelszó!" }, { status: 400 });
    }

    return NextResponse.json({ success: true, email }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "⚠️ Hiba történt!" }, { status: 500 });
  }
}
