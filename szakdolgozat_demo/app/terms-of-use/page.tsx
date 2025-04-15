"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TermsOfUse = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="absolute top-6 right-6 md:hidden">
        <button
          className="text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200 w-48 z-50">
            <ul className="text-black text-sm">
              <li>
                <a href="/terms-and-conditions" className="block px-4 py-2 hover:bg-gray-100">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="block px-4 py-2 hover:bg-gray-100">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="absolute top-6 left-6 group hidden md:block">
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
                <a href="/cookie-policy" className="block px-4 py-2 hover:bg-gray-100">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-black text-center mt-12 fade-in-section" id="title">
        TERMS OF USE
      </h1>
      <p className="text-orange-500 flex items-center text-sm mt-2 fade-in-section" id="update-date">
        ⏳ Last updated: {getCurrentDate()}
      </p>

      <div className="w-full flex justify-end">
        <div 
          className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
          style={{ backgroundImage: "url('/terms-use1.jpg')" }}
        ></div>
      </div>

      <div className="max-w-4xl text-gray-800 mt-8 space-y-6 text-justify leading-relaxed">
        <p className="fade-in-section">
          Welcome to LIVETHEFIT. These Terms of Use govern your access to and use of our website, mobile applications, and related services. 
          By continuing to use our platform, you agree to these terms in full.
        </p>

        <p className="fade-in-section">
          If you do not agree with any of these terms, please refrain from using our services. We reserve the right to modify these Terms of Use at any time.
        </p>

        <div className="w-full flex justify-start">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            style={{ backgroundImage: "url('/terms-use2.jpg')" }}
          ></div>
        </div>

        <h2 className="text-xl font-bold mt-6 fade-in-section">1. ACCEPTANCE OF TERMS</h2>
        <p className="fade-in-section">
          You agree that by accessing and using LIVETHEFIT, you accept and agree to comply with these Terms of Use. We provide our services solely for personal, non-commercial use.
        </p>

        <p className="fade-in-section">
          Failure to adhere to these terms may result in the termination of your account or restricted access to our platform.
        </p>

        <div className="w-full flex justify-end">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            style={{ backgroundImage: "url('/terms-use3.jpg')" }}
          ></div>
        </div>

        <h2 className="text-xl font-bold mt-6 fade-in-section">2. USER ACCOUNTS & RESPONSIBILITIES</h2>
        <p className="fade-in-section">
          When you create an account with LIVETHEFIT, you are responsible for maintaining the confidentiality of your login credentials.
          Any unauthorized use of your account must be reported immediately.
        </p>

        <p className="fade-in-section">
          LIVETHEFIT reserves the right to disable or remove accounts that violate our terms, engage in fraudulent activity, or compromise security.
        </p>

        <div className="w-full flex justify-start">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            style={{ backgroundImage: "url('/terms-use4.jpg')" }}
          ></div>
        </div>

        <h2 className="text-xl font-bold mt-6 fade-in-section">3. INTELLECTUAL PROPERTY RIGHTS</h2>
        <p className="fade-in-section">
          All content on LIVETHEFIT, including images, graphics, logos, and text, is the exclusive property of LIVETHEFIT and is protected under copyright laws.
        </p>

        <p className="fade-in-section">
          Unauthorized reproduction, distribution, or modification of any content is strictly prohibited.
        </p>

        <footer className="w-full mt-12 border-t border-gray-300 pt-6 pb-4 text-center text-gray-600 text-sm">
          <p>
            © 2025 | LIVETHEFIT Limited | All Rights Reserved | {" "}
            <span className="text-orange-500 font-bold">Train Hard, Live Fit</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfUse;
