import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { server } from "../server";
import Container from "../Components/Container";
import { motion } from "motion/react";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductCard";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${server}/myProducts/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [user.email]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 1, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
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
            {products.map((product) => (
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

export default MyProducts;
