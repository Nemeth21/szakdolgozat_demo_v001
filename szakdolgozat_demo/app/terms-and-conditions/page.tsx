"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const TermsPage = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  
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
                <a href="/terms-of-use" className="block px-4 py-2 hover:bg-gray-100">
                  Terms of Use
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
        TERMS & CONDITIONS
      </h1>
      <p className="text-orange-500 flex items-center text-sm mt-2 fade-in-section" id="update-date">
        ⏳ Last updated: {getCurrentDate()}
      </p>
      <div className="w-full flex justify-end">
        <div 
          className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
          id="bg-section1"
          style={{ backgroundImage: "url('/terms1.jpg')" }}
        ></div>
      </div>
      <div className="max-w-4xl text-gray-800 mt-8 space-y-6 text-justify leading-relaxed">
        <p className="fade-in-section">
          Welcome to LIVETHEFIT. These Terms and Conditions outline the rules and regulations for the use of our website and services.
          Our mission is to ensure fairness, transparency, and the highest level of satisfaction for our users.
        </p>
        <div className="w-full flex justify-start">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            id="bg-section2"
            style={{ backgroundImage: "url('/terms2.jpg')" }}
          ></div>
        </div>
        <p className="fade-in-section">
          By accessing or using our website, you agree to comply with these terms. If you do not agree with any part of these terms, please do not use our services. 
          Our commitment is to provide a safe, fair, and accessible platform for all our users. We value trust, and we strive to create an experience that aligns with our core values.
        </p>

        <div className="w-full flex justify-end">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            id="bg-section3"
            style={{ backgroundImage: "url('/terms3.jpg')" }}
          ></div>
        </div>
        <h2 className="text-xl font-bold mt-6 fade-in-section">1. WHO WE ARE AND HOW TO CONTACT US</h2>
        <p className="fade-in-section">
          <strong>1.1 Who we are.</strong> LIVETHEFIT . is a company incorporated and registered in Delaware. Our registered office is at Budapest 1.
        </p>
        <p className="fade-in-section">
          <strong>1.2 How to contact us.</strong> If you have any questions, concerns, or feedback, we are always here to help.
          You can reach us via email at support@livethefit.com or through our online help center.
        </p>

        <div className="w-full flex justify-start">
          <div 
            className="w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg mt-8 fade-in-section"
            id="bg-section4"
            style={{ backgroundImage: "url('/terms4.jpg')" }}
          ></div>
        </div>

        <p className="fade-in-section">
          <strong>1.3 Transparency and Security.</strong> We take security and privacy very seriously. 
          Your data is encrypted, and we never share personal information without consent.
        </p>

        <p className="fade-in-section">
          <strong>1.4 Ethical Responsibility.</strong> As a company, we believe in ethical business practices. 
          This means that we support fair wages, sustainable sourcing, and a responsible supply chain.
        </p>

        <p className="fade-in-section">
          <strong>1.5 Future Updates.</strong> These terms may change over time to adapt to legal requirements and to improve user experience. 
          Please revisit this page regularly to stay informed.
        </p>
        <footer className="w-full mt-12 border-t border-gray-300 pt-6 pb-4 text-center text-gray-600 text-sm">
          <p>
          <span className="text-orange-500 font-bold">© 2025</span>.
             | LIVETHEFIT Limited | All Rights Reserved |{" "}
            <span className="text-orange-500 font-bold">United We Sweat</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage;
