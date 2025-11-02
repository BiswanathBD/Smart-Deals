import React from "react";
import Banner from "../Components/Banner";
import RecentProducts from "../Components/RecentProducts";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Banner />
      <RecentProducts />
    </motion.div>
  );
};

export default HomePage;
