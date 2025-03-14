"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer"; // 🔹 Footer importálása

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 text-white relative px-6">
      {/* 🔹 Vissza gomb a bal felső sarokban */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
      >
        ← Back
      </button>

      {/* 🔹 Fejléc és bejelentkezési/regisztrációs form */}
      <div className="max-w-4xl font-inter font-mono w-full flex flex-col md:flex-row justify-between items-center">
        {/* Bal oldal - Cím és leírás */}
        <div className="text-left w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-8xl font-bold uppercase leading-tight">Let's Sign In</h1>
          <p className="text-2xl mt-4">
            Welcome back! Enter your credentials to access your account and continue exploring.
          </p>
        </div>

        {/* Jobb oldal - Bejelentkezési/Regisztrációs űrlap */}
        <div className="w-full md:w-1/2">
          <form className="flex flex-col space-y-4">
            <label className="text-sm">Email *</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none"
              placeholder="Enter your email"
              required
            />

            <label className="text-sm">Password *</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none"
              placeholder="Enter your password"
              required
            />

            {/* 🔹 Ha regisztrációs mód van, jelenjen meg a "Confirm Password" mező */}
            {!isLogin && (
              <>
                <label className="text-sm">Confirm Password *</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </>
            )}

            {/* Gomb */}
            <button
              type="submit"
              className="w-full bg-white text-orange-500 font-bold py-3 uppercase hover:bg-gray-200 transition"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          {/* 🔹 Váltás a két nézet között */}
          <p
            className="mt-4 text-center text-sm cursor-pointer underline hover:opacity-80"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </p>
        </div>
      </div>

      {/* 🔹 Footer hozzáadása az oldal aljához */}
      <div className="mt-12 w-full">
        <Footer />
      </div>
    </div>
  );
}