"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AccessibilityStatement() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen font-mono bg-cover bg-center" style={{ backgroundImage: "url('/terms1.jpg')" }}>
      {/* 🔹 Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute  top-6 left-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition z-50"
      >
        ← Back
      </button>

      {/* 🔹 Main Content Section */}
      
      <div className="absolute inset-0 bg-black opacity-50 z-40"></div>

      <div className="relative z-50 max-w-4xl mx-auto p-8">
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-xl p-12 rounded-xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
            OUR COMMITMENT TO ACCESSIBILITY
          </h1>

          <p className="mb-6 text-lg text-gray-200">
            We are committed to making our website as accessible as possible to everyone. 
            If you are having difficulty viewing or navigating the content, notice any functionality that you believe 
            is not fully accessible to people with disabilities, or have any suggestions on how we might improve 
            our website’s accessibility, please contact us{" "}
            <a href="mailto:accessibility@example.com" className="text-white underline font-semibold">
              here
            </a>.
          </p>

          <p className="mb-6 text-lg text-gray-200">
            Our mission is to be a place where everyone belongs. We're an equal opportunities employer, and for us 
            that means we always strive to be as inclusive as possible in all aspects of employment, right from your 
            application.
          </p>

          <p className="mb-6 text-lg text-gray-200">
            As a proud Disability Confident Committed employer, anyone who is considered disabled (under the Equality Act 2010)
            is given the opportunity for a guaranteed interview* to show their skills, talents, and abilities, 
            as long as they meet the minimum criteria for the role.
          </p>

          <p className="mb-6 text-lg text-gray-200">
            We're committed to finding <strong>reasonable adjustments*</strong> for candidates with specific needs or 
            disabilities during our recruitment process, and all applicants will be considered fairly and equally. 
            We do not tolerate discrimination of any kind.
          </p>

          <p className="mb-6 text-lg text-gray-200">
            We take your feedback seriously and will consider it as we continue to work to improve our website 
            to make it as accessible as possible.
          </p>

          <p className="mt-10 text-md text-black font-semibold">
            *If you'd like to request a reasonable adjustment, please email{" "}
            <a href="mailto:talent@example.com" className="underline text-black">
              talent@example.com
            </a>, and you can request interview through the Disability Confident option on the application form.
          </p>
        </div>
      </div>
    </div>
  );
}
