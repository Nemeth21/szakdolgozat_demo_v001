"use client";
import React from "react";

const products = [
  "/products/product1.jpg",
  "/products/product2.jpg",
  "/products/product3.jpg",
  "/products/product4.jpg",
];

const products_second = [
  "/products/product5.jpg",
  "/products/product6.jpg",
  "/products/product7.jpg",
  "/products/product8.jpg",
];

const ProductGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {products.map((src, index) => (
        <div key={index} className="p-2 bg-white shadow-md">
          <img src={src} alt="Product" className="w-full h-auto" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {products_second.map((src, index) => (
        <div key={index} className="p-2 bg-white shadow-md">
          <img src={src} alt="Product" className="w-full h-auto" />
        </div>
      ))}
    </div>

    </div>
    
    
  );
};

export default ProductGrid;
