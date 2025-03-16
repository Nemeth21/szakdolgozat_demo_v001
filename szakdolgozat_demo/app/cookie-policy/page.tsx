"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 📌 Dinamikusan generált dátum
const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const CookiePolicy = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  // 📌 Ellenőrzi, hogy melyik szakasz látható görgetés közben
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".fade-in-section");
      const newVisibleSections: { [key: string]: boolean } = {};

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          newVisibleSections[section.id] = true;
        }
      });

      setVisibleSections((prev) => ({ ...prev, ...newVisibleSections }));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-inter font-mono flex flex-col items-center bg-gray-50 px-6 py-12 relative">
      
      {/* 🔹 Bal felső sarok: Vissza gomb + Dropdown */}
      <div className="absolute top-6 left-6 group">
        <button
          onClick={() => router.push("/")}
          className="bg-white text-black px-4 py-2 rounded-md shadow-md border border-gray-300 hover:bg-gray-200 transition flex items-center"
          onMouseEnter={() => setDropdownOpen(true)}
        >
          ← Back ▼
        </button>

        {dropdownOpen && (
          <div
            className="absolute mt-2 left-0 bg-white shadow-lg rounded-md border border-gray-200 w-48 z-50"
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <ul className="text-black text-sm">
              <li>
                <a href="/terms-and-conditions" className="block px-4 py-2 hover:bg-gray-100">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/terms-of-use" className="block px-4 py-2 hover:bg-gray-100">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 🔹 Fő cím */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-black text-center mt-12 fade-in-section" id="title">
        COOKIE POLICY 🍪
      </h1>

      {/* 🔹 Frissítés dátuma */}
      <p className="text-orange-500 flex items-center text-sm mt-2 fade-in-section" id="update-date">
        ⏳ Last updated: {getCurrentDate()}
      </p>

      {/* 🔹 Háttérképek - Váltakozva bal és jobb oldalon */}
      <div className="w-full flex justify-end">
        <div 
          className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
          style={{ backgroundImage: "url('/cookies1.jpg')" }}
        ></div>
      </div>

      {/* 🔹 Szöveg blokk */}
      <div className="max-w-4xl text-gray-800 mt-8 space-y-6 text-justify leading-relaxed">
        <p className="fade-in-section">
          Welcome to LIVETHEFIT’s Cookie Policy. This document explains how we use cookies and similar tracking technologies 
          on our website to enhance your experience, personalize content, and improve security.
        </p>

        <p className="fade-in-section">
          Cookies are small text files that help us understand user behavior, track performance, and provide targeted ads.
          By continuing to browse our site, you agree to our cookie usage.
        </p>

        <div className="w-full flex justify-start">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            style={{ backgroundImage: "url('/cookies2.jpg')" }}
          ></div>
        </div>

        {/* 📌 1. What Are Cookies? */}
        <h2 className="text-xl font-bold mt-6 fade-in-section">1. WHAT ARE COOKIES? 🍪</h2>
        <p className="fade-in-section">
          Cookies are small files stored on your device that allow websites to remember information about you. These can include your preferences, 
          login details, and browsing history to provide a personalized experience.
        </p>

        <p className="fade-in-section">
          There are different types of cookies, including session cookies (which expire after you close your browser) and persistent cookies (which stay 
          on your device for a defined period).
        </p>

        <div className="w-full flex justify-end">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            style={{ backgroundImage: "url('/cookies3.jpg')" }}
          ></div>
        </div>

        {/* 📌 2. Why We Use Cookies */}
        <h2 className="text-xl font-bold mt-6 fade-in-section">2. WHY WE USE COOKIES? 🎯</h2>
        <p className="fade-in-section">
          We use cookies to enhance the user experience in several ways:
        </p>
        <ul className="fade-in-section list-disc pl-6">
          <li>- Remember your login details for seamless access.</li>
          <li>- Analyze website traffic to improve performance.</li>
          <li>- Personalize content based on your interests.</li>
          <li>- Deliver targeted advertisements that match your preferences.</li>
        </ul>

        <div className="w-full flex justify-start">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            style={{ backgroundImage: "url('/cookies4.jpg')" }}
          ></div>
        </div>

        {/* 📌 3. Managing Your Cookie Preferences */}
        <h2 className="text-xl font-bold mt-6 fade-in-section">3. MANAGING YOUR COOKIE PREFERENCES ⚙️</h2>
        <p className="fade-in-section">
          You have the right to manage and control cookie usage on our website. Here’s how:
        </p>
        <ul className="fade-in-section list-disc pl-6">
          <li>- Adjust your browser settings to block or delete cookies.</li>
          <li>- Use our Cookie Settings panel to opt-in or out of specific cookies.</li>
          <li>- Review third-party cookie policies when using external services.</li>
        </ul>

        {/* 📌 Footer */}
        <footer className="w-full mt-12 border-t border-gray-300 pt-6 pb-4 text-center text-gray-600 text-sm">
          <p>
            © 2025 | LIVETHEFIT Limited | All Rights Reserved |{" "}
            <span className="text-orange-500 font-bold">Eat Clean, Train Mean</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CookiePolicy;
