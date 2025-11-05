import React, { use, useEffect, useState } from "react";
import Container from "../Components/Container";
import { Link, useNavigate, useParams } from "react-router";
import { server } from "../server";
import toast from "react-hot-toast";
import productImage from "../assets/product.webp";
import Loader from "../Components/Loader";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const CreateBid = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [bid, setBid] = useState("");

  useEffect(() => {
    fetch(`${server}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error));
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }

  const handleCreateBid = () => {
    if (product.price_min > bid) {
      toast.error("Invalid Bid Amount");
      return;
    }
    if (product.price_max) {
      if (product.price_max < bid) {
        toast.error("Invalid Bid Amount");
        return;
      }
    }
    const newBid = {
      product_id: product._id,
      buyer_email: user?.email,
      seller_image: product.seller_image,
      seller_name: product.seller_name,
      seller_contact: product.seller_contact,
      seller_email: product.email,
      bid_price: bid,
      status: product.status,
      created_at: new Date(),
    };
    fetch(`${server}/bids`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Bid Submitted!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myBids");
      });
  };

  return (
    <div>
      <Container>
        <div className="container mx-auto px-4 md:px-10 py-10 text-gray-100">
          {/* Back link */}
          <Link
            to={`/products/${product._id}`}
            className="text-[#9d7eff] hover:underline font-medium mb-5 inline-block"
          >
            ← Back To Your Products
          </Link>

          <h2 className="text-4xl font-bold text-center mb-10">
            Create <span className="text-purple-400">A Product</span>
          </h2>

          <div
            className="bg-black/40 backdrop-blur-xl border border-purple-500/20 
                   shadow-[0_0_30px_rgba(155,85,255,0.2)] rounded-2xl p-8 max-w-11/12 
                    mx-auto"
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
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-500">
                  {product.title}
                </h3>

                <div className="mt-4 mb-8">
                  {/* Price range */}
                  <h5 className="text-center text-xl font-bold">Price Range</h5>
                  <div className="flex gap-4 justify-center items-center mt-4">
                    <button
                      onClick={() => setBid(product.price_min)}
                      className="btn-primary text-xl"
                    >
                      {product.price_min}
                    </button>
                    <p>to</p>
                    <button
                      onClick={() =>
                        setBid(product.price_max || product.price_min)
                      }
                      className="btn-primary text-xl"
                    >
                      {product.price_max || product.price_min + "+"}
                    </button>
                  </div>
                </div>

                <hr className="text-purple-500/20" />

                {/* Product Image */}
                <div>
                  <h3 className="text-3xl font-semibold text-purple-500 text-center mt-6 mb-4">
                    Bid Amount
                  </h3>
                  <input
                    type="number"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    className="w-full bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-8 py-6 text-3xl md:text-4xl lg:text-5xl font-bold text-center text-purple-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                {/* Submit Button */}
                <button
                  onClick={handleCreateBid}
                  className="w-full mt-12 btn-primary"
                >
                  Submit Your Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateBid;
