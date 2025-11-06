import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { server } from "../server";
import Container from "../Components/Container";
import { motion } from "motion/react";
import Loader from "../Components/Loader";
import productImage from "../assets/product.webp";
import Swal from "sweetalert2";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${server}/myProducts/${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          toast.error("Authorization Error!");
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#0f0f16",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${server}/products/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => {
            if (res.status === 401) {
              toast.error("Authorization Error!");
            }
            return res.json();
          })
          .then((data) => {
            if (data.acknowledged) {
              setProducts(products.filter((p) => p._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1200,
                background: "#0f0f16",
                color: "#fff",
              });
            }
          })
          .catch((error) => toast.error(error));
      }
    });
  };

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
          setProducts((prev) =>
            prev.map((p) => (p._id === id ? { ...p, status: "Sold" } : p))
          );
          Swal.fire({
            title: "Sold Out!",
            text: "Product marked as Sold.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            background: "#0f0f16",
            color: "#fff",
          });
        }
      })
      .catch((error) => toast.error(error));
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <div className="my-10">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
            My <span className="text-purple-500">Products</span>
          </h3>

          {/* Table for large screens */}
          <div className="hidden xl:block overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead className="bg-white/5 text-xl text-purple-500">
                <tr>
                  <th className="px-4 py-2 text-left">SL</th>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                        className={`px-4 py-2 border rounded-full text-sm font-light ${
                          product.status === "Pending"
                            ? "bg-green-500/30 border-green-500/50 animate-pulse text-white"
                            : "bg-yellow-500/30 border-yellow-500/50 text-white"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-3 justify-center">
                        <Link
                          to={`/editProducts/${product._id}`}
                          className={`border px-2 py-1 rounded-lg transition-all ${
                            product.status === "Sold"
                              ? "border-gray-700 text-gray-600 pointer-events-none"
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
                              ? "border-gray-700 text-gray-600 cursor-not-allowed"
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
          </div>

          {/* Card/List layout for small & medium screens */}
          <div className="xl:hidden grid lg:grid-cols-2 gap-4 mt-8 space-y-5 px-2">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-pink-300/10 bg-white/5 rounded-2xl p-4 shadow-lg m-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image || productImage}
                    alt={product.title}
                    className="w-20 aspect-4/3 object-cover rounded border border-purple-500/30"
                  />
                  <div>
                    <Link
                      to={`/products/${product._id}`}
                      className="text-lg font-semibold text-purple-400"
                    >
                      {product.title}
                    </Link>
                    <p className="text-gray-400 text-sm">{product.category}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center my-2">
                  <p className="text-pink-400 font-bold text-lg">
                    ৳{product.price_min} - ৳
                    {product.price_max || product.price_min + "+"}
                  </p>
                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${
                      product.status === "Pending"
                        ? "bg-green-500/30 border-green-500/50 animate-pulse text-white"
                        : "bg-yellow-500/30 border-yellow-500/50 text-white"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <div className="flex flex-wrap justify-end gap-2 pt-2">
                  <Link
                    to={`/editProducts/${product._id}`}
                    className={`border px-3 py-1 rounded-lg transition-all ${
                      product.status === "Sold"
                        ? "border-gray-700 text-gray-600 pointer-events-none"
                        : "border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500"
                    }`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="border border-red-500 text-red-500 px-3 py-1 rounded-lg hover:text-white hover:bg-red-500 transition-all"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleMakeSold(product._id)}
                    disabled={product.status === "Sold"}
                    className={`px-3 py-1 rounded-lg border transition-all ${
                      product.status === "Sold"
                        ? "border-gray-700 text-gray-600 cursor-not-allowed"
                        : "border-yellow-600 text-yellow-600 hover:text-white hover:bg-yellow-600"
                    }`}
                  >
                    Make Sold
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default MyProducts;
