import React, { useEffect, useState, useContext } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { server } from "../server";
import toast from "react-hot-toast";
import productImage from "../assets/product.webp";
import profileImage from "../assets/profile.png";
import Loader from "./Loader";
import { AuthContext } from "../Context/AuthContext";

const ProductBids = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${server}/bids/product/${product._id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error));
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="px-4 text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-500 w-fit drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
        Bids For This Product
      </h3>

      <table className="w-full mt-6">
        <thead className="bg-white/5 text-xl text-purple-500">
          <tr>
            <th className="px-4 py-2 text-left">SL No</th>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Seller</th>
            <th className="px-4 py-2 text-left">Bid Price</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-pink-300/10">
          {bids.map((bid, index) => (
            <motion.tr
              key={bid._id}
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
              <td className="px-4 py-6 text-2xl">{index + 1}.</td>

              {/* product details */}
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
                      <span className="text-purple-500 font-semibold">
                        Price:
                      </span>{" "}
                      ৳ {product.price_min} -{" "}
                      {product.price_max || product.price_min + "+"}
                    </p>
                  </div>
                </div>
              </td>

              {/* seller details */}
              <td className="px-4 py-2 text-lg">
                <div className="flex gap-4 items-center">
                  <img
                    src={bid.seller_image || profileImage}
                    alt={product.title}
                    className="w-12 aspect-square object-cover rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <p>{bid.seller_name}</p>
                    <p className="text-pink-400/50 text-xs">
                      {bid.seller_email}
                    </p>
                  </div>
                </div>
              </td>

              {/* bid price */}
              <td className="px-4 py-2 text-2xl">
                ৳{" "}
                <span className="text-pink-400 font-bold">{bid.bid_price}</span>
              </td>

              {/* actions */}
              <td className="px-4 py-2">
                <div className="flex gap-3 justify-center opacity-100">
                  {user?.email === bid.seller_email ? (
                    <>
                      <button className="border px-2 py-1 rounded-lg transition-all border-green-500 text-green-500 hover:text-white hover:bg-green-500/50">
                        Accept Offer
                      </button>

                      <button
                        onClick={() =>
                          setBids(bids.filter((b) => b._id !== bid._id))
                        }
                        className="border border-red-500 px-2 py-1 rounded-lg text-red-500 hover:text-white hover:bg-red-500/50 transition-all"
                      >
                        Reject Offer
                      </button>
                    </>
                  ) : (
                    <a
                      href={`tel:${bid.seller_contact}`}
                      className="border border-blue-500 text-blue-400 px-2 py-1 rounded-lg hover:text-white hover:bg-blue-500/50 transition-all"
                    >
                      Contact Seller
                    </a>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductBids;
