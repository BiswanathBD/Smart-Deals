import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import productImage from "../assets/product.webp";
import profile from "../assets/profile.png";
import { server } from "../server";
import Loader from "../Components/Loader";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${server}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 md:px-10 py-10 text-gray-100">
      {/* Back link */}
      <Link
        to="/allProducts"
        className="text-[#b084ff] hover:underline font-medium mb-5 inline-block transition-all"
      >
        ← Back To Products
      </Link>

      {/* Main Card */}
      <div className="relative rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(155,85,255,0.2)] overflow-hidden grid md:grid-cols-2 gap-10 p-8">
        {/* Left: Product Image and Description */}
        <div>
          <img
            src={product.image || productImage}
            alt={product.title}
            className="w-full aspect-5/3 object-cover rounded-lg mb-6 border border-purple-500/20"
          />

          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Product Description
            </h3>

            {/* Condition & Usage Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  product.condition === "Brand New"
                    ? "bg-green-400/20 text-green-300 border-green-400/30"
                    : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                }`}
              >
                Condition: {product.condition}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-400/20 text-blue-300 border-blue-400/30">
                Usage: {product.usage || "New"}
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {product.title}
            </h2>

            <span className="inline-block bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-medium px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              {product.category}
            </span>

            <p className="text-green-400 text-2xl font-semibold mb-1">
              ৳{product.price_min} - {product.price_max}
            </p>
            <p className="text-gray-500 text-sm mb-6">Price range</p>

            {/* Product details */}
            <div className="bg-white/5 relative group bg-linear-to-r from-[#6c28d927] to-[#ec489910] border border-purple-500/30 p-4 rounded-xl mb-6 transition-all duration-500 hover:scale-101">
              <h4 className="text-xl font-semibold mb-3">Product Details</h4>
              <p className="text-purple-500">
                <span className="font-semibold text-gray-200">Product ID:</span>{" "}
                {product._id}
              </p>
              <p className="text-purple-500">
                <span className="font-semibold text-gray-200">Posted:</span>{" "}
                {new Date(product.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Seller Info Card */}
            <div
              className="relative group bg-linear-to-r from-[#6c28d927] to-[#ec489910]
              border border-purple-500/30 p-5 rounded-2xl backdrop-blur-xl transition-all duration-500 hover:scale-101"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-purple-600/10 to-pink-500/10 rounded-2xl blur-xl opacity-60"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-semibold mb-3">
                  Seller Information
                </h4>

                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={product.seller_image || profile}
                    alt={product.seller_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/40 shadow-[0_0_15px_rgba(172,70,255,0.3)]"
                  />
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {product.seller_name}
                    </p>
                    <p className="text-xs text-pink-300/50">{product.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                    <FaMapMarkerAlt className="text-purple-500" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                    <FaPhoneAlt className="text-purple-500" />
                    <span>{product.seller_contact}</span>
                  </div>
                  <p className="text-sm mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        product.status === "pending"
                          ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/30"
                          : "bg-green-400/20 text-green-300 border-green-400/30"
                      }`}
                    >
                      Status: {product.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fancy Gradient Button */}
          <button
            className="w-full py-3 rounded-lg text-white font-semibold 
                       bg-linear-to-r from-purple-600 to-pink-500
                       hover:opacity-95 transition-all shadow-[0_0_25px_rgba(155,85,255,0.5)]
                       hover:shadow-[0_0_40px_rgba(255,85,255,0.6)] mt-6"
          >
            I Want Buy This Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
