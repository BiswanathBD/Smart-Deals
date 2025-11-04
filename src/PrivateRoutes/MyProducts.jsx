import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { server } from "../server";
import Container from "../Components/Container";
import { motion } from "motion/react";
import Loader from "../Components/Loader";
import productImage from "../assets/product.webp";
import Swal from "sweetalert2";
import EditProductModal from "../Components/EditProduct";
import { Link } from "react-router";

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${server}/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            const remainingProducts = products.filter((p) => p._id !== id);
            setProducts(remainingProducts);

            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <Container>
      <div className="my-10">
        <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
          My <span className="text-purple-500">Products</span>
        </h3>

        {loading ? (
          <Loader></Loader>
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
                  <th className="px-4 py-2 text-left">Sl No</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-center">Category</th>
                  <th className="px-4 py-2 text-center">Price</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-pink-300/10">
                {products.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.3,
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      }),
                    }}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <td className="px-4 py-6">{index + 1}.</td>
                    <td className="px-4 py-4">
                      <img
                        src={product.image || productImage}
                        alt={product.title}
                        className="w-12 aspect-4/3 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{product.title}</td>
                    <td className="px-4 py-2 text-center">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 text-center">
                      ৳{product.price_min.toLocaleString()} - ৳
                      {product.price_max?.toLocaleString() ||
                        product.price_min.toLocaleString() + "+"}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-4 py-2 border rounded-full text-white text-sm font-light ${
                          product.status !== "Pending"
                            ? "bg-yellow-500/30 border-yellow-500/50"
                            : "bg-green-500/30 border-green-500/50 animate-pulse"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* actions buttons */}
                    <td className="px-4 py-2">
                      <div className="flex gap-3 justify-center">
                        <Link
                          to={`/editProducts/${product._id}`}
                          className="border border-purple-500 px-2 py-1 rounded-lg text-purple-500 hover:text-white hover:bg-purple-500 transition-all"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="border border-red-500 px-2 py-1 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-all"
                        >
                          Delete
                        </button>
                        <button className="border border-yellow-600 px-2 py-1 rounded-lg text-yellow-600 hover:text-white hover:bg-yellow-600 transition-all">
                          Make Sold
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default MyProducts;
