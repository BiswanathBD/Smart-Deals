import React, { use, useEffect, useState } from "react";
import Container from "../Components/Container";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "motion/react";
import { server } from "../server";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import BidItem from "../Components/BidItem";

const MyBid = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${server}/bids/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <div className="my-10">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
            My <span className="text-purple-500">Bids</span>
          </h3>

          {loading ? (
            <Loader />
          ) : bids.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              You haven't placed any bids yet.
            </p>
          ) : (
            <>
              {/* Table layout for large screens */}
              <div className="hidden xl:block overflow-x-auto rounded-lg border border-purple-500/20">
                <table className="w-full">
                  <thead className="bg-white/5 text-xl text-purple-500">
                    <tr>
                      <th className="px-4 py-2 text-left">SL No</th>
                      <th className="px-4 py-2 text-left">Product</th>
                      <th className="px-4 py-2 text-left">Seller</th>
                      <th className="px-4 py-2 text-left">Bid Price</th>
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
                        setBids={setBids}
                        bids={bids}
                        layout="table"
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout for mobile & tablet */}
              <div className="grid lg:grid-cols-2 gap-6 xl:hidden">
                {bids.map((bid, index) => (
                  <BidItem
                    key={bid._id}
                    bid={bid}
                    index={index}
                    product_id={bid.product_id}
                    setBids={setBids}
                    bids={bids}
                    layout="card"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </motion.div>
  );
};

export default MyBid;