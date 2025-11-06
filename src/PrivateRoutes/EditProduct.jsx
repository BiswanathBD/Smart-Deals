import React, { use, useEffect, useState } from "react";
import Container from "../Components/Container";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { server } from "../server";
import Loader from "../Components/Loader";
import productImage from "../assets/product.webp";

const EditProduct = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${server}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setCondition(data.condition);
      })
      .catch((error) => toast.error(error));
  }, [id]);

  if (loading) return <Loader></Loader>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const editedProduct = {
      title: form.title.value,
      category: form.category.value,
      price_min: form.price_min.value,
      price_max: form.price_max.value,
      condition,
      usage: condition === "Brand New" ? "" : form.usage.value,
      image: form.image.value,
      description: form.description.value,
    };

    if (
      editedProduct.price_max &&
      Number(editedProduct.price_max) < Number(editedProduct.price_min)
    ) {
      toast.error("Invalid price range.");
      return;
    }
    fetch(`${server}/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => {
        if (res.status === 401) {
          toast.error("Authorization Error!");
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product updated successfully!");
          navigate("/myProducts");
        }
      })
      .catch(() => {
        toast.error("Failed to update product.");
      });
  };

  return (
    <div>
      <Container>
        <div className="container mx-auto px-4 md:px-10 py-10 text-gray-100">
          {/* Back link */}
          <Link
            to="/myProducts"
            className="text-[#9d7eff] hover:underline font-medium mb-5 inline-block"
          >
            ← Back To Your Products
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
              {/* left side image */}
              <img
                className="border border-purple-500/20 rounded-xl h-full object-cover overflow-hidden"
                src={product.image || productImage}
                alt={product.title}
              />
              <div>
                {/* Title */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={product.title}
                    required
                    className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm mb-2 mt-4 text-gray-300">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={product.category}
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

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* Prices */}
                  <div>
                    <label className="block text-sm mb-2 text-gray-300">
                      Min Price (৳)
                    </label>
                    <input
                      name="price_min"
                      type="number"
                      defaultValue={product.price_min}
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
                      defaultValue={product.price_max}
                      className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                {/* Product Image */}
                <div>
                  <label className="w-full block text-sm mb-2 text-gray-300 mt-4">
                    Product Image URL
                  </label>
                  <input
                    name="image"
                    defaultValue={product.image}
                    className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div>
              {/* Condition */}
              <div>
                <label className="block text-sm mb-2 text-gray-300 mt-4">
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
                <label className="block text-sm mb-2 text-gray-300 mt-4">
                  Product Usage Time
                </label>
                <input
                  type="text"
                  name="usage"
                  disabled={condition === "Brand New"}
                  defaultValue={product.usage}
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
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm mb-2 text-gray-300">
                Product Description
              </label>
              <textarea
                name="description"
                rows="4"
                defaultValue={product.description}
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
      </Container>
    </div>
  );
};

export default EditProduct;
