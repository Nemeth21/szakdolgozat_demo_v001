"use client";

import React from "react";

const products = [
  "/products/product1.jpg?v=2",
  "/products/product2.jpg?v=2",
  "/products/product3.jpg?v=2",
  "/products/product4.jpg?v=2",
];

const products_second = [
  "/products/product5.jpg?v=2",
  "/products/product6.jpg?v=2",
  "/products/product7.jpg?v=2",
  "/products/product8.jpg?v=2",
];

const ProductGrid = () => {
  return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          {products.map((src, index) => (
              <div
                  key={index}
                  className="p-2 bg-white shadow-md transition-all duration-500 transform hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-white hover:opacity-90 hover:translate-y-[-41px]"
              >
                <img
                    src={src}
                    alt="Product"
                    className="w-full h-auto transition-transform duration-500 ease-in-out"
                />
              </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          {products_second.map((src, index) => (
              <div
                  key={index}
                  className="p-2 bg-white shadow-md transition-all duration-500 transform hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-white hover:opacity-90 hover:translate-y-[-41px]"
              >
                <img
                    src={src}
                    alt="Product"
                    className="w-full h-auto transition-transform duration-500 ease-in-out"
                />
              </div>
          ))}
        </div>
      </div>
  );
};

export default ProductGrid;
