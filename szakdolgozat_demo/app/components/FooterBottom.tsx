"use client";
import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

const FooterBottom = () => {

const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <footer className="w-full font-inter font-mono bg-white border-t border-gray-300 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600">
      
      {/* 🔹 Copyright és céginformáció */}
      <div className="flex flex-wrap justify-between items-center w-full">
  {/* 🔹 Bal oldal - Copyright és céginfó */}
  <div className="text-xs md:text-sm font-bold text-gray-600">
  <span className="text-orange-500 underline">© 2025</span>
  <span> LIVETHE-FIT Limited | All Rights Reserved | </span>
  <span className="text-orange-500">We Do LiftStyle.</span>
</div>


  {/* 🔹 Jobb oldal - Linkek */}
  <div className="flex space-x-3 text-xs md:text-sm text-gray-600">
    <a href="#" className="hover:underline"
      onClick={() => router.push("/terms-and-conditions")}
    >Terms & Conditions</a>
    <a href="#" className="hover:underline"
    onClick={() => router.push("terms-of-use")}>Terms of Use</a>
    <a href="#" className="hover:underline"
    onClick={() => router.push("cookie-policy")}>Cookie Policy</a>
  </div>
</div>


      {/* 🔹 Nyelv és országválasztó */}
      <div className="flex items-center space-x-2 mt-2 md:mt-0">
        {/* 🔹 Országválasztó */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-transparent text-gray-600 focus:outline-none cursor-pointer text-xs md:text-sm"
        >
          <option value="US">🇺🇸 US</option>
          <option value="UK">🇬🇧 UK</option>
          <option value="DE">🇩🇪 DE</option>
          <option value="FR">🇫🇷 FR</option>
          <option value="HU">🇭🇺 HU</option>
        </select>

        {/* 🔹 Nyelvválasztó */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-transparent text-gray-600 focus:outline-none cursor-pointer text-xs md:text-sm"
        >
          <option value="English">English</option>
          <option value="Deutsch">Deutsch</option>
          <option value="Français">Français</option>
          <option value="Magyar">Magyar</option>
        </select>
      </div>
    </footer>
  );
};

export default FooterBottom;
