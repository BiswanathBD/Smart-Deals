import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import productImage from "../assets/product.webp";
import profileImage from "../assets/profile.png";
import { server } from "../server";

const BidItem = ({ bid, index, product_id }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(bid);

  useEffect(() => {
    fetch(`${server}/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [product_id]);

  if (loading) {
    return;
  }

  return (
    <motion.tr
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.15,
            duration: 0.4,
            ease: "easeOut",
          },
        }),
      }}
      initial="hidden"
      animate="visible"
      custom={index}
      className={`transition-opacity duration-300 ${
        bid.status === "Sold" ? "opacity-50" : "opacity-100"
      }`}
    >
      <td className="px-4 py-6 text-xl text-pink-400">{index + 1}.</td>
      <td className="px-4 py-4">
        <div className="flex gap-4 items-center">
          <img
            src={product.image || productImage}
            alt={product.title}
            className="w-16 aspect-4/3 object-cover rounded border border-purple-500/20"
          />
          <div>
            <p>{product.title}</p>
            <p className="text-gray-400">
              <span className="text-purple-500 font-semibold">Price: </span>৳{" "}
              {product.price_min} -{" "}
              {product.price_max || product.price_min + "+"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-2 text-lg">
        <div className="flex gap-4 items-center">
          <img
            src={bid.seller_image || profileImage}
            alt={product.title}
            className="w-12 aspect-square object-cover rounded-full border-2 border-purple-500"
          />
          <div>
            <p>{bid.seller_name}</p>
            <p className="text-gray-400 text-[12px]">{bid.seller_email}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-2 text-center text-2xl">৳<span className="text-pink-400">{bid.bid_price}</span></td>

      <td className="px-4 py-2 text-center">
        <span
          className={`px-4 py-2 border rounded-full text-white text-sm font-light ${
            bid.status === "Pending"
              ? "bg-green-500/30 border-green-500/50 animate-pulse"
              : "bg-yellow-500/30 border-yellow-500/50"
          }`}
        >
          {bid.status}
        </span>
      </td>

      {/* actions buttons */}
      <td className="px-4 py-2 text-center">
        <button className="border border-orange-500 mx-auto px-4 py-2 rounded-lg text-orange-500 bg-orange-400/5 hover:text-white hover:bg-orange-500 transition-all">
          Remove
        </button>
      </td>
    </motion.tr>
  );
};

export default BidItem;
