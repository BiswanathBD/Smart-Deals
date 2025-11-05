import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { server } from "../server";
import Container from "../Components/Container";
import { motion } from "motion/react";
import Loader from "../Components/Loader";
import productImage from "../assets/product.webp";
import Swal from "sweetalert2";
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

  // Delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup:
          "rounded-2xl bg-[#0f0f16] text-gray-200 border border-purple-500/20",
        title: "text-lg font-semibold text-purple-400",
        confirmButton: "btn-primary px-4 py-2 rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${server}/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            const remaining = products.filter((p) => p._id !== id);
            setProducts(remaining);

            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1200,
              background: "#0f0f16",
              color: "#fff",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  // Make Sold — instant update
  const handleMakeSold = (id) => {
    const newStatus = { status: "Sold" };

    fetch(`${server}/products/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const updatedProducts = products.map((p) =>
            p._id === id ? { ...p, status: "Sold" } : p
          );
          setProducts(updatedProducts);

          Swal.fire({
            title: "Sold Out!",
            text: "Product marked as Sold.",
            icon: "success",
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <div className="my-10">
        <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
          My <span className="text-purple-500">Products</span>
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
                      product.status === "Sold" ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <td className="px-4 py-6">{index + 1}.</td>
                    <td className="px-4 py-4">
                      <img
                        src={product.image || productImage}
                        alt={product.title}
                        className="w-12 aspect-4/3 object-cover rounded"
                      />
                    </td>

                    <td className="px-4 py-2 text-lg">
                      <Link
                        to={`/products/${product._id}`}
                        className="hover:text-pink-400 text-xl"
                      >
                        {product.title}
                      </Link>
                    </td>

                    <td className="px-4 py-2 text-center">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 text-center">
                      ৳{product.price_min} - ৳
                      {product.price_max || product.price_min + "+"}
                    </td>

                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-4 py-2 border rounded-full text-white text-sm font-light ${
                          product.status === "Pending"
                            ? "bg-green-500/30 border-green-500/50 animate-pulse"
                            : "bg-yellow-500/30 border-yellow-500/50"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* actions buttons */}
                    <td className="px-4 py-2">
                      <div className="flex gap-3 justify-center opacity-100">
                        <Link
                          to={`/editProducts/${product._id}`}
                          className={`border px-2 py-1 rounded-lg transition-all ${
                            product.status === "Sold"
                              ? "border-gray-700 text-gray-600 cursor-not-allowed! pointer-events-none"
                              : "border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500"
                          }`}
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="border border-red-500 px-2 py-1 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-all"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handleMakeSold(product._id)}
                          disabled={product.status === "Sold"}
                          className={`px-2 py-1 rounded-lg border transition-all ${
                            product.status === "Sold"
                              ? "border-gray-700 text-gray-600 cursor-not-allowed!"
                              : "border-yellow-600 text-yellow-600 hover:text-white hover:bg-yellow-600"
                          }`}
                        >
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
