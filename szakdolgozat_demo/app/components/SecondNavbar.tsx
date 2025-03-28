"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SecondNavbar = () => {

    const router = useRouter();
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  // 🔹 Ref-ek a dropdownokhoz
  const countryRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // 🔹 Bezárás külső kattintásra
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-gray-200 text-gray-700 text-[10px] border-b border-gray-300 hidden md:flex justify-end px-6 py-2">
      <div className="flex space-x-4 items-center">
        {/* 🔹 Accessibility */}
        <Link href="/accessibility" className="hover:text-black px-2 border-r border-gray-300">
          Accessibility Statement
        </Link>

        {/* 🔹 Help */}
        <Link href="/support-hub" className="hover:text-black px-2 border-r border-gray-300">
          Help
        </Link>

        {/* 🔹 Email Sign Up */}
        <Link href="/newsletter" className="hover:text-black px-2 border-r border-gray-300">
          Email Sign Up
        </Link>

        {/* 🔹 Ide baszom neked jános a contact us dolgot */}
        <Link href="/contact" className="hover:text-black px-2 border-r border-gray-300">
          Contact Us
        </Link>

        {/* 🔹 Blog */}
        <Link href="/cookie-policy" className="hover:text-black px-2 border-r border-gray-300">
          Privacy
        </Link>

        {/* 🔹 Országválasztó Dropdown */}
        <div 
          className="relative px-2 border-r border-gray-300" 
          ref={countryRef}
          onMouseEnter={() => setCountryDropdownOpen(true)}
          onMouseLeave={() => setCountryDropdownOpen(false)}
        >
          <button className="flex items-center space-x-1 hover:text-black">
            <span>US ▼</span>
          </button>

          {countryDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 shadow-md rounded-md p-1 z-50">
              <Link href="#" className="block px-3 py-1 text-[10px] hover:bg-gray-100">United States</Link>
              <Link href="#" className="block px-3 py-1 text-[10px] hover:bg-gray-100">Hungary</Link>
              <Link href="#" className="block px-3 py-1 text-[10px] hover:bg-gray-100">Romania</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SecondNavbar;
