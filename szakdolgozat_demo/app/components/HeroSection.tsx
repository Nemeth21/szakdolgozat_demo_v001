"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-banner.jpg')" }}
    >
      <h2 className="text-6xl font-extrabold text-white bg-black bg-opacity-50 px-6 py-3 tracking-wide">
        NEW DROP PREVIEW
      </h2>
    </section>
  );
};

export default HeroSection;
