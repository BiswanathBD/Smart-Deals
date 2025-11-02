import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { server } from "../server";
import ProductCard from "./ProductCard";
import Container from "./Container";
import { Link } from "react-router";
import { IoIosArrowDropright } from "react-icons/io";
import Loader from "./Loader";

const RecentProducts = () => {
  const [productsRecent, setProductsRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${server}/recentProducts?limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setProductsRecent(data);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <Container>
      <div className="my-10">
        <h3 className="text-3xl md:text-5xl font-bold text-center mt-8 md:mt-20 mb-8">
          Recent <span className="text-purple-500">Products</span>
        </h3>

        {loading ? (
          <Loader></Loader>
        ) : (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {productsRecent.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
        <div className="w-full flex justify-end">
          <Link to={"/allProducts"}>
            <button className="mt-8 border border-purple-500 px-6 py-2 text-transparent bg-linear-to-r from-purple-500 to-pink-300 bg-clip-text hover:bg-clip-border hover:text-white font-semibold rounded-lg flex gap-3 items-center justify-end group">
              <span>View All Products</span>{" "}
              <IoIosArrowDropright
                size={28}
                className="group-hover:text-white text-pink-300"
              ></IoIosArrowDropright>
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default RecentProducts;
