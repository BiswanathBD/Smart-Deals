import React, { useEffect, useState, useContext } from "react";
import { motion } from "motion/react";
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

  if (loading) return <Loader />;

  const handleReject = (id) => {
    fetch(`${server}/bids/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => setBids(bids.filter((b) => b._id !== id)))
      .catch((error) => toast.error(error));
  };

  return (
    <div className="w-full">
      <h3 className="px-4 text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-500 w-fit drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
        Bids For This Product
      </h3>

      {/* Table view for lg screens */}
      <div className="hidden lg:block mt-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="bg-white/5 text-lg text-purple-400">
            <tr>
              <th className="px-4 py-2 text-left">SL</th>
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
                    transition: { delay: i * 0.1 },
                  }),
                }}
                initial="hidden"
                animate="visible"
                custom={index}
                className={`transition-opacity duration-300 ${
                  bid.status === "Sold" ? "opacity-60" : ""
                }`}
              >
                <td className="px-4 py-4 text-lg">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={product.image || productImage}
                      alt={product.title}
                      className="w-16 aspect-[4/3] object-cover rounded border border-purple-500/20"
                    />
                    <div>
                      <p>{product.title}</p>
                      <p className="text-gray-400 text-sm">
                        <span className="text-purple-500 font-semibold">
                          Price:
                        </span>{" "}
                        ৳ {product.price_min} - {product.price_max || product.price_min + "+"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={bid.seller_image || profileImage}
                      alt={bid.seller_name}
                      className="w-12 h-12 object-cover rounded-full border-2 border-purple-500"
                    />
                    <div>
                      <p>{bid.seller_name}</p>
                      <p className="text-pink-400/50 text-xs">{bid.seller_email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-xl text-pink-400 font-bold">
                  ৳ {bid.bid_price}
                </td>
                <td className="px-4 py-4 text-center">
                  {user?.email === bid.seller_email ? (
                    <div className="flex gap-2 justify-center">
                      <button className="border px-2 py-1 rounded-lg border-green-500 text-green-500 hover:bg-green-500/40 transition-all">
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(bid._id)}
                        className="border px-2 py-1 rounded-lg border-red-500 text-red-500 hover:bg-red-500/40 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <a
                      href={`tel:${bid.seller_contact}`}
                      className="border border-blue-500 text-blue-400 px-2 py-1 rounded-lg hover:bg-blue-500/40 transition-all"
                    >
                      Contact
                    </a>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card/List view for small & medium screens */}
      <div className="lg:hidden mt-6 space-y-4 px-2">
        {bids.map((bid, index) => (
          <motion.div
            key={bid._id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.1 },
              }),
            }}
            initial="hidden"
            animate="visible"
            custom={index}
            className="border border-pink-300/10 bg-white/5 rounded-2xl p-4 flex flex-col gap-3 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={bid.seller_image || profileImage}
                alt={bid.seller_name}
                className="w-12 h-12 object-cover rounded-full border-2 border-purple-500"
              />
              <div>
                <p className="font-semibold">{bid.seller_name}</p>
                <p className="text-xs text-pink-400/70">{bid.seller_email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="font-semibold text-xl text-purple-400">{product.title}</p>
                <p className="text-sm text-gray-400">
                  ৳ {product.price_min} - {product.price_max || product.price_min + "+"}
                </p>
              </div>
              <p className="text-xl text-pink-400 font-bold">
                ৳ {bid.bid_price}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {user?.email === bid.seller_email ? (
                <>
                  <button className="border px-3 py-1 rounded-lg border-green-500 text-green-500 hover:bg-green-500/40 transition-all">
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(bid._id)}
                    className="border px-3 py-1 rounded-lg border-red-500 text-red-500 hover:bg-red-500/40 transition-all"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <a
                  href={`tel:${bid.seller_contact}`}
                  className="border border-blue-500 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500/40 transition-all"
                >
                  Contact
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductBids;