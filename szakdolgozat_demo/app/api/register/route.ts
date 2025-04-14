import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
// új user regisztráció
export async function POST(req: Request) {
  try {
    await connectToDatabase(); // csatlakozás DB-hez
    const { email, password } = await req.json(); // adatok frontendről
    if (!email || !password) {
      return NextResponse.json({ error: "hiányzó adatok!" }, { status: 400 }); // basic check
    }
    const existingUser = await User.findOne({ email }); // van már ilyen user?
    if (existingUser) {
      return NextResponse.json({ error: "az email már foglalt " }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // jelszó titkosítás
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save(); // mentés adatbázisba
    return NextResponse.json({ success: true, email }, { status: 201 }); // siker
  } catch (error) {
    console.error("api error", error); 
    return NextResponse.json({ error: "szerverhiba történt!" }, { status: 500 });
  }
}
