"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.replace("/auth");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    localStorage.setItem("lastPage", "/dashboard"); 
    router.replace("/auth"); 
  };
  if (!email) {
    return <div className="flex items-center justify-center min-h-screen bg-green-500 text-white">Betöltés...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500 text-white p-6">
      <h1 className="text-4xl font-bold">Üdvözlünk, {email}!</h1>
      <p className="mt-4 text-lg">Sikeresen bejelentkeztél a dashboard-ra.</p>
      <button 
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-white text-green-500 font-bold uppercase rounded-md hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </div>
  );
}
