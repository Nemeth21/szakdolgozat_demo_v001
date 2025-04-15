"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShirtCard from "./ShirtCard";
import { shirtCategories, sizes, colors, sortOptions } from "./data";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function ShirtsPage() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Relevancy");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const router = useRouter(); 

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("Relevancy");
  };

  const filteredShirts = shirtCategories
    .filter((shirt) =>
      selectedSizes.length > 0 ? selectedSizes.some((size) => shirt.size.includes(size)) : true
    )
    .filter((shirt) =>
      selectedColors.length > 0 ? selectedColors.includes(shirt.color) : true
    )
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Newest") return b.new === true ? -1 : 1;
      return 0;
    });

  return (
    <div className="min-h-screen font-inter font-mono text-black bg-white px-6 lg:px-16 py-8">
      <div className="text-center text-white text-xs md:text-sm bg-black py-2 font-semibold tracking-wide">
      <span className="text-orange-500 text-lg font-bold mx-1"> REFER </span>
       A FRIEND TO EARN $10 OFF YOUR NEXT PURCHASE OF 
        <span className="text-orange-500 text-lg font-bold mx-1"> $50+ !</span>
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between mt-4">
        <button
          onClick={() => router.back()}
          className="bg-black text-white bg-orange px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          ← Back
        </button>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center space-x-2 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md shadow-sm"
        >
          <FaFilter />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-8 max-w-6xl mx-auto mt-6">
        <div
          className={`fixed md:relative top-0 left-0 w-full md:w-1/4 h-full md:h-auto bg-white z-50 md:z-auto shadow-lg md:shadow-none p-6 transform ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="text-gray-700 text-xl">
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold hidden md:block">FILTER & SORT</h2>
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:underline">
              Clear All
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-sm mb-2">SORT BY</h3>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSizes.includes(size)
                        ? "bg-black text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">COLOR</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedColors.includes(color)
                        ? "bg-black text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="hidden md:block text-3xl font-bold">T-SHIRTS & TOPS</h1>
          <p className="text-gray-600 text-sm mt-2">{filteredShirts.length} Products</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredShirts.map((shirt) => (
              <ShirtCard key={shirt.id} {...shirt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
