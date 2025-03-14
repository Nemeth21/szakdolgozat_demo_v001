"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer"; // 🔹 Footer importálása

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 Betöltési állapot
  const [errorMessage, setErrorMessage] = useState(""); // 🔹 Hibakezelés

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("⚠️ A jelszavak nem egyeznek!");
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? "/api/login" : "/api/register";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("userEmail", email); // 🔹 Email mentése LocalStorage-ba
      router.push("/dashboard"); // 🔹 Átirányítás a Dashboardra
    } else {
      setErrorMessage(data.error || "⚠️ Hiba történt!");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 text-white relative px-6">
      
      {/* 🔹 Vissza gomb */}
      <button
  onClick={() => {
    if (window.history.length > 1) {
      router.back(); // 🔹 Ha van előzmény, visszalépünk
    } else {
      router.push("/"); // 🔹 Ha nincs, akkor főoldalra megyünk
    }
  }}
  className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
>
  ← Back
</button>

      <div className="max-w-4xl font-inter font-mono w-full flex flex-col md:flex-row justify-between items-center">
        
        {/* 🔹 Bal oldal - Cím és leírás */}
        <div className="text-left w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-8xl font-bold uppercase leading-tight">
            {isLogin ? "Let's Sign In" : "Let's Register"}
          </h1>
          <p className="text-2xl mt-4">
            {isLogin ? "Welcome back! Enter your credentials." : "Create an account to get started!"}
          </p>
        </div>

        {/* 🔹 Jobb oldal - Bejelentkezési/Regisztrációs űrlap */}
        <div className="w-full md:w-1/2">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            
            <label className="text-sm">Email *</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-sm">Password *</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* 🔹 Csak regisztrációnál kérjük a jelszó megerősítést */}
            {!isLogin && (
              <>
                <label className="text-sm">Confirm Password *</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-transparent border border-white text-white placeholder-white focus:outline-none"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </>
            )}

            {/* 🔹 Hibaüzenet */}
            {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}

            {/* 🔹 Küldés gomb */}
            <button
              type="submit"
              className="w-full bg-white text-orange-500 font-bold py-3 uppercase hover:bg-gray-200 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
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

      {/* 🔹 Footer */}
      <div className="mt-12 w-full">
        <Footer />
      </div>
    </div>
  );
}
