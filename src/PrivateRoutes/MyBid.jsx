import React, { use, useEffect, useState } from "react";
import Container from "../Components/Container";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "motion/react";
import { server } from "../server";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { Link } from "react-router";
import BidItem from "../Components/BidItem";

const MyBid = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 1, ease: "easeOut" },
    },
  };

  useEffect(() => {
    fetch(`${server}/bids/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBids(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error));
  }, [user]);

  return (
    <Container>
      <div className="my-10">
        <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
          My <span className="text-purple-500">bids</span>
        </h3>

        {loading ? (
          <Loader />
        ) : (
          <motion.div
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <table className="w-full">
              <thead className="bg-white/5 text-xl text-purple-500">
                <tr>
                  <th className="px-4 py-2 text-left">SL No</th>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Seller</th>
                  <th className="px-4 py-2 text-center">Bid Price</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-pink-300/10">
                {bids.map((bid, index) => (
                  <BidItem
                    key={bid._id}
                    bid={bid}
                    index={index}
                    product_id={bid.product_id}
                  ></BidItem>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default MyBid;
