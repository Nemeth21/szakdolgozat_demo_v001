"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

const TopNavbar = () => {

    const router = useRouter();
    
  return (
    <div className="w-full font-inter font-mono bg-black text-white text-center text-xs md:text-sm py-4 tracking-wide">
      FREE SHIPPING FOR ALL HUNGARY. ORDERS OVER  
      <span className="text-orange-500 text-lg font-bold mx-1">$75</span>
    </div>
  );
};

export default TopNavbar;
