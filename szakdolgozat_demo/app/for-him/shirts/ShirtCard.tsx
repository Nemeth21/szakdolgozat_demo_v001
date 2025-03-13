"use client";
import Image from "next/image";

interface ShirtProps {
  title: string;
  fit: string;
  color: string;
  price: number;
  size: string[];
  image: string;
  rating: number;
  new?: boolean;
}

const ShirtCard = ({ title, fit, color, price, image, rating, new: isNew }: ShirtProps) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg">
      <div className="relative">
        <Image src={image} alt={title} width={300} height={350} className="rounded-md" />
        {isNew && <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs">NEW</span>}
      </div>
      <h2 className="mt-2 text-lg font-semibold">{title}</h2>
      <p className="text-gray-500 text-sm">{fit}</p>
      <p className="text-gray-500 text-sm">{color}</p>
      <p className="font-bold text-black mt-1">${price}</p>
      <p className="text-yellow-500 mt-1">⭐ {rating}</p>
    </div>
  );
};

export default ShirtCard;
