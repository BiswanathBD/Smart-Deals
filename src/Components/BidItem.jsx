import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import productImage from "../assets/product.webp";
import profileImage from "../assets/profile.png";
import { server } from "../server";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BidItem = ({ bid, index, product_id, setBids }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${server}/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [product_id]);

  const handleBidRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This bid will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      background: "#0f0f16",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${server}/bids/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (data.deletedCount === 1 || data.success) {
          setBids((prev) => prev.filter((b) => b._id !== id));

          Swal.fire({
            title: "Removed!",
            text: "The bid has been removed successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
            background: "#0f0f16",
            color: "#fff",
          });
        } else {
          toast.error("Bid could not be removed.");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  if (loading) return;

  return (
    <>
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
        className="hidden xl:table-row transition-opacity duration-300"
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
              <p className="font-medium">{product.title}</p>
              <p className="text-gray-400 text-sm">
                <span className="text-purple-500 font-semibold">Price:</span> ৳
                {product.price_min} - ৳
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

        <td className="px-4 py-2 text-center text-2xl">
          ৳ <span className="text-pink-400 font-semibold">{bid.bid_price}</span>
        </td>

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

        <td className="px-4 py-2 text-center">
          <button
            onClick={() => handleBidRemove(bid._id)}
            className="border border-orange-500 mx-auto px-4 py-2 rounded-lg text-orange-500 bg-orange-400/5 hover:text-white hover:bg-orange-500 transition-all"
          >
            Remove
          </button>
        </td>
      </motion.tr>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        initial="hidden"
        animate="visible"
        className="xl:hidden border border-pink-300/10 bg-white/5 rounded-2xl p-4 shadow-md flex flex-col gap-4"
      >
        <div className="flex items-center gap-4">
          <img
            src={product.image || productImage}
            alt={product.title}
            className="w-20 aspect-4/3 object-cover rounded border border-purple-500/30"
          />
          <div>
            <p className="text-lg font-semibold text-purple-400">
              {product.title}
            </p>
            <p className="text-gray-400 text-sm">
              ৳{product.price_min} - ৳
              {product.price_max || product.price_min + "+"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-purple-500/10 pt-2">
          <img
            src={bid.seller_image || profileImage}
            alt={bid.seller_name}
            className="w-10 h-10 object-cover rounded-full border-2 border-purple-500"
          />
          <div>
            <p className="text-white text-sm">{bid.seller_name}</p>
            <p className="text-gray-400 text-[12px]">{bid.seller_email}</p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-purple-500/10 pt-2">
          <p className="text-xl font-semibold text-pink-400">
            ৳{bid.bid_price}
          </p>
          <span
            className={`px-3 py-1 border rounded-full text-white text-xs font-light ${
              bid.status === "Pending"
                ? "bg-green-500/30 border-green-500/50 animate-pulse"
                : "bg-yellow-500/30 border-yellow-500/50"
            }`}
          >
            {bid.status}
          </span>
        </div>

        <button
          onClick={() => handleBidRemove(bid._id)}
          className="w-full mt-2 border border-orange-500 px-4 py-2 rounded-lg text-orange-500 bg-orange-400/5 hover:text-white hover:bg-orange-500 transition-all"
        >
          Remove
        </button>
      </motion.div>
    </>
  );
};

export default BidItem;
