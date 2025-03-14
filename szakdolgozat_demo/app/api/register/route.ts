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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "❌ Az email már foglalt!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save(); // 🔹 ADATBÁZISBA MENTÉS

    return NextResponse.json({ success: true, email }, { status: 201 });
  } catch (error) {
    console.error("🚨 API ERROR:", error); // 🔹 Logolja a hibát a konzolba
    return NextResponse.json({ error: "⚠️ Szerverhiba történt!" }, { status: 500 });
  }
}
