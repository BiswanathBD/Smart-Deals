import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import productImg from "../assets/product.webp";

const ProductCard = ({ product }) => {
  const { _id, image, title, price_min, price_max, condition, location } =
    product;

  return (
    <div className="bg-black/5 backdrop-blur-sm rounded-xl overflow-hidden group transition-all duration-300 transform hover:scale-102 flex flex-col border border-purple-500/30 hover:shadow-[0_0_30px_rgba(172,70,255,0.2)]">
      {/* Product Image */}
      <div className="w-full aspect-5/3 relative overflow-hidden">
        <img
          src={image || productImg}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {/* Condition Badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded-sm text-xs font-semibold border
          ${
            condition === "Brand New"
              ? "bg-blue-500/60 border-blue-500/80 text-white"
              : "bg-pink-500/60 border-pink-500/80 text-white"
          }`}
        >
          {condition.toUpperCase()}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white line-clamp-2">{title}</h3>
        <p className="text-purple-400 font-semibold">
          ৳{price_min.toLocaleString()} - ৳
          {price_max.toLocaleString() || price_min.toLocaleString() + "+"}
        </p>
        <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
          <FaMapMarkerAlt className="text-purple-500" />
          <span>{location}</span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/products/${_id}`}
          className="mt-auto inline-block text-center btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
