"use client";

import React, { useState,useRef , useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { FaUser, FaSearch, FaShoppingBag, FaBars, FaTimes, FaGlobe  } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link"; 

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  let dropdownTimeout: NodeJS.Timeout;
  const [langDropdownOpen, setLangDropdownOpen] = useState(false); 
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const toggleLangDropdown = () => setLangDropdownOpen((prev) => !prev);
  const closeLangDropdown = () => setLangDropdownOpen(false);


  const menuItems = {
      "FOR HIM": {
    path: "/for-him",
    sections: [
      { 
        title: "PRODUCTS",
        items: [
          { name: "Tanks", path: "/for-him/tanks" },
          { name: "Shirts", path: "/for-him/shirts" },
          { name: "Long Sleeves", path: "/for-him/long-sleeves" },
          { name: "Shorts", path: "/for-him/shorts" },
          { name: "Pants/Jeans", path: "/for-him/pants-jeans" },
          { name: "Outerwear ❗", path: "/for-him/outerwear" },
          { name: "Joggers ❗", path: "/for-him/joggers" },
          { name: "Hats/Beanies", path: "/for-him/hats-beanies" },
          { name: "Accessories❗", path: "/for-him/accessories" },
          { name: "All Products", path: "/for-him/all-products" },
        ],
      },
      {
        title: "FEATURED",
        items: [
          { name: "Preview New Drop", path: "/for-him/preview-new-drop" },
          { name: "New Drop", path: "/for-him/new-drop" },
          { name: "Restock", path: "/for-him/restock" },
          { name: "Best Sellers", path: "/for-him/best-sellers" },
          { name: "SALE", path: "/for-him/sale" },
        ],
      },
    ],
  },

  "FOR HER": {
    path: "/for-her",
    sections: [
      {
        title: "PRODUCTS",
        items: [
          { name: "Tanks", path: "/for-her/tanks" },
          { name: "Shirts", path: "/for-her/shirts" },
          { name: "Long Sleeves", path: "/for-her/long-sleeves" },
          { name: "Shorts", path: "/for-her/shorts" },
          { name: "Pants/Jeans", path: "/for-her/pants-jeans" },
          { name: "Outerwear ❗", path: "/for-her/outerwear" },
          { name: "Joggers ❗", path: "/for-her/joggers" },
          { name: "Hats/Beanies", path: "/for-her/hats-beanies" },
          { name: "Accessories ❗", path: "/for-her/accessories" },
          { name: "All Products", path: "/for-her/all-products" },
        ],
      },
      {
        title: "FEATURED",
        items: [
          { name: "Preview New Drop", path: "/for-her/preview-new-drop" },
          { name: "New Drop", path: "/for-her/new-drop" },
          { name: "Restock", path: "/for-her/restock" },
          { name: "Best Sellers", path: "/for-her/best-sellers" },
          { name: "SALE", path: "/for-her/sale" },
        ],
      },
    ],
  },

  "NEW DROP": {
    path: "/new-drop",
    sections: [
      {
        title: "PRODUCTS",
        items: [
          { name: "Tanks", path: "/new-drop/tanks" },
          { name: "Shirts", path: "/new-drop/shirts" },
          { name: "Long Sleeves", path: "/new-drop/long-sleeves" },
          { name: "Shorts", path: "/new-drop/shorts" },
          { name: "Pants/Jeans", path: "/new-drop/pants-jeans" },
          { name: "Outerwear ❗ ", path: "/new-drop/outerwear" },
          { name: "Joggers ❗", path: "/new-drop/joggers" },
          { name: "Hats/Beanies", path: "/new-drop/hats-beanies" },
          { name: "Accessories ❗", path: "/new-drop/accessories" },
          { name: "All Products", path: "/new-drop/all-products" },
        ],
      },
      {
        title: "FEATURED",
        items: [
          { name: "Preview New Drop", path: "/new-drop/preview-new-drop" },
          { name: "New Drop", path: "/new-drop/new-drop" },
          { name: "Restock", path: "/new-drop/restock" },
          { name: "Best Sellers", path: "/new-drop/best-sellers" },
          { name: "SALE", path: "/new-drop/sale" },
        ],
      },
    ],
  },
};
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
   const closeSearch = () => {
    setSearchOpen(false);
  };
   const handleMouseEnter = (menu: string) => {
    clearTimeout(dropdownTimeout);
    setDropdownOpen(menu);
  };
  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setDropdownOpen(null);
    }, 
  };
  return (
    <>
      <nav className="w-full bg-white font-inter font-mono text-black flex justify-between items-center px-6 lg:px-16 py-4 border-b border-gray-200 relative">
<div className="hidden lg:flex space-x-6 text-xs md:text-sm font-semibold tracking-wider">
  {Object.keys(menuItems).map((category) => (
    <div
      key={category}
      className="relative group"
      onMouseEnter={() => handleMouseEnter(category)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={menuItems[category].path} className="hover:text-gray-700">
        {category} ▼
      </Link>

      {dropdownOpen === category && (
        <div className="absolute left-0 top-full mt-2 w-[900px] bg-white shadow-lg rounded-md p-6 z-50 border border-gray-200">
          <div className="grid grid-cols-3 gap-8">
            {menuItems[category].sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                {section.items.map(({ name, path }) => (
                <li key={name} className="hover:text-black transition">
                  <Link href={`${menuItems[category].path}${path.replace(/^\/[^/]+/, "")}`}>
                   {name}
                 </Link>
                </li>
        ))}

                </ul>
              </div>
            ))}
            <div className="text-center">
              <Image
                src={
                  category === "FOR HIM"
                    ? "/mens-drop.jpg"
                    : category === "FOR HER"
                    ? "/womens-drop.jpg"
                    : "/new-drop.jpg"
                }
                alt={category}
                width={250}
                height={250}
                className="rounded-md"
              />
              <p className="text-xs text-gray-600 mt-2 font-bold">
                {category === "FOR HIM"
                  ? "MEN'S NEW DROP"
                  : category === "FOR HER"
                  ? "HER'S NEW DROP"
                  : "NEW DROP"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  ))}
</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-widest">LIVETHE-FIT</h1>
        <div className="flex items-center space-x-6 text-xs md:text-sm">
          <div className="hidden lg:flex space-x-6">
            <p className="hidden md:block tracking-wide">QUESTIONS? (+36) 30 123 123</p>
            <FaUser
              className="text-lg md:text-xl cursor-pointer hover:text-gray-600"
              onClick={() => router.push("/auth")}
            />
              <FaSearch
              className={`text-lg md:text-xl cursor-pointer transition-transform duration-300 ${
                searchOpen ? "rotate-90 scale-110 text-gray-900" : "hover:text-gray-600"
              }`}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <FaShoppingBag className="text-lg md:text-xl cursor-pointer hover:text-gray-600"
            onClick={() => router.push("/cart")}
            />
          </div>
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-500 ease-in-out ${
          searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } flex items-center px-6 py-4 z-50`}
      >
        <FaSearch className="text-gray-600 text-2xl" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for products..."
          className="w-full text-lg px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black transition"
        />
        <FaTimes
          className="text-gray-600 text-2xl cursor-pointer hover:text-gray-900 transition-transform duration-300 transform hover:scale-110"
          onClick={closeSearch}
        />
      </div>
         <div className="relative">
            <button
              className="flex items-center space-x-1 cursor-pointer px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition"
              onClick={toggleLangDropdown}
            >
              <FaGlobe className="text-lg" />
              <span className="text-xs md:text-sm">US ▼</span>
            </button>
            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md p-2 z-50 transition-opacity duration-200 opacity-100"
                onMouseLeave={closeLangDropdown} 
              >
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  English (US)
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                   Magyar
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                   Română
                </Link>
                <hr className="my-2 border-gray-200" />
                <Link href="/auth" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  - Profilom
                </Link>
                <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  - Kapcsolat
                </Link>
                <Link href="/terms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  - Szerzői jogok
                </Link>
                <Link href="/cookies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  - Süti kezelés
                </Link>
              </div>
            )}
          </div>
          <button className="lg:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes className="animate-spin" /> : <FaBars className="animate-pulse" />}
          </button>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 font-inter font-mono w-full h-full bg-black z-50 p-6 shadow-lg transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0 opacity-100 scale-100" : "-translate-x-full opacity-0 scale-95"
        } lg:hidden`}
      >
        <button
          className="absolute top-6 right-6 text-2xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaTimes className="animate-spin" />
        </button>

        <div className="flex flex-col items-center space-y-6 mt-16 text-xl font-semibold">
          {["FOR HIM", "FOR HER", "NEW DROP"].map((item) => (
            <div key={item} className="relative w-full text-center">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === item ? null : item)}
                className="block w-full py-2 hover:text-gray-700"
              >
                {item} ▼
              </button>
              {dropdownOpen === item && (
                <div className="w-full bg-gray-100 py-2 rounded-md transition-all duration-300">
                  <ul className="text-sm text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="#">TOPS</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="#">BOTTOMS</a>
                    </li>
                    <li className="px-4 py-2 font-bold hover:bg-gray-200">
                      <a href="#">ACCESSORIES</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="#">SHOES</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
          <a href="#" className="hover:text-gray-700">QUESTIONS? (+36) 30 123 123</a>
          <div className="flex space-x-6">
            <FaUser className="text-2xl cursor-pointer hover:text-gray-600" />
            <FaSearch className="text-2xl cursor-pointer hover:text-gray-600" />
            <FaShoppingBag className="text-2xl cursor-pointer hover:text-gray-600" />
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="/icons/logo.webp" alt="US Flag" className="w-6 h-6" />
            <span>US ▼</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
