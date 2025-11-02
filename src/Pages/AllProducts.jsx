import React, { useEffect, useState } from "react";
import { server } from "../server";
import Container from "../Components/Container";
import { motion } from "framer-motion";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";


const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${server}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
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
        <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
          All <span className="text-purple-500">Products</span>
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
            {allProducts.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default AllProducts;
