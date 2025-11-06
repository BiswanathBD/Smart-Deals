import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../Components/Loader";
import { server } from "../server";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const [condition, setCondition] = useState("Brand New");
  const navigate = useNavigate();

  if (!user) {
    return <Loader></Loader>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      title: form.title.value,
      category: form.category.value,
      price_min: form.price_min.value,
      price_max: form.price_max.value,
      condition,
      usage: condition === "Brand New" ? "" : form.usage.value,
      image: form.image.value,
      description: form.description.value,
      seller_name: user.displayName,
      email: user.email,
      seller_image: user.photoURL,
      seller_contact: user.phoneNumber,
      location: user.address,
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    if (
      newProduct.price_max &&
      Number(newProduct.price_max) < Number(newProduct.price_min)
    ) {
      toast.error("Invalid price range.");
      return;
    }

    fetch(`${server}/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Product added");
        navigate("/myProducts");
      })
      .catch((error) => toast.error(error));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-10 py-10 text-gray-100">
        {/* Back link */}
        <Link
          to="/allProducts"
          className="text-[#9d7eff] hover:underline font-medium mb-5 inline-block"
        >
          ← Back To Products
        </Link>

        <h2 className="text-4xl font-bold text-center mb-10">
          Create <span className="text-purple-400">A Product</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/20 
                   shadow-[0_0_30px_rgba(155,85,255,0.2)] rounded-2xl p-8 
                   max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">Title</label>
              <input
                name="title"
                placeholder="e.g. Samsung Galaxy S22"
                required
                className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full bg-black/70 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              >
                <option value="">Select a Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Groceries">Groceries</option>
              </select>
            </div>

            {/* Prices */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Min Price (৳)
              </label>
              <input
                name="price_min"
                type="number"
                placeholder="e.g. 45000"
                required
                className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Max Price (৳)
              </label>
              <input
                name="price_max"
                type="number"
                placeholder="Optional"
                className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Product Condition
              </label>
              <div className="flex gap-3">
                {["Brand New", "Used"].map((type) => (
                  <label
                    key={type}
                    className={`px-4 py-2 rounded-full text-xs cursor-pointer border transition-all ${
                      condition === type
                        ? "bg-purple-600/40 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(155,85,255,0.4)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-400/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={type}
                      checked={condition === type}
                      onChange={(e) => setCondition(e.target.value)}
                      className="hidden"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Product Usage Time
              </label>
              <input
                type="text"
                name="usage"
                disabled={condition === "Brand New"}
                placeholder="e.g. 2 months, 1 year, etc."
                required={condition === "Used"}
                className={`w-full px-4 py-2 rounded-md 
                  ${
                    condition === "Used"
                      ? "bg-white/5 border border-white/10"
                      : "bg-gray-800/60 border-gray-700"
                  }
                   text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all`}
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Product Image URL
              </label>
              <input
                name="image"
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Seller Image URL - Disabled */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Seller Image URL
              </label>
              <input
                value={user.photoURL}
                disabled
                className="w-full bg-gray-800/60 border-gray-700 text-gray-500 cursor-not-allowed rounded-lg px-4 py-2"
              />
            </div>

            {/* Seller Name */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Seller Name
              </label>
              <input
                value={user.displayName}
                disabled
                className="w-full bg-gray-800/60 border-gray-700 text-gray-500 cursor-not-allowed rounded-lg px-4 py-2"
              />
            </div>

            {/* Seller Email */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Seller Email
              </label>
              <input
                value={user.email}
                disabled
                className="w-full bg-gray-800/60 border-gray-700 text-gray-500 cursor-not-allowed rounded-lg px-4 py-2"
              />
            </div>

            {/* Seller Contact */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Seller Contact
              </label>
              <input
                value={user.phoneNumber}
                disabled
                className="w-full bg-gray-800/60 border-gray-700 text-gray-500 cursor-not-allowed rounded-lg px-4 py-2"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Location
              </label>
              <input
                value={user.address}
                disabled
                className="w-full bg-gray-800/60 border-gray-700 text-gray-500 cursor-not-allowed rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm mb-2 text-gray-300">
              Product Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="e.g. Excellent condition phone, used for 2 months..."
              required
              className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full mt-8 btn-primary">
            Create A Product
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateProduct;
