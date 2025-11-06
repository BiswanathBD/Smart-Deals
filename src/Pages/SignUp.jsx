import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../Context/AuthContext";
import Container from "../Components/Container";
import { Link } from "react-router";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const SignUp = () => {
  const { googleSignIn } = useContext(AuthContext);

  // form states
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {})
      .catch((e) => toast.error(e.code));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("Please agree to the Terms and Conditions.");
      return;
    }

    toast("Sign Up not ready, use Google Sign-In", {
      icon: "⚠️",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <div className="flex justify-center py-10">
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-[#ac46ff33] w-full max-w-lg p-10 shadow-[0_0_80px_#ac46ff10]">
            <h2 className="text-4xl font-bold text-center text-white mb-8 glow-text">
              Create Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-white/70 mb-1 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg bg-black ring-1 ring-purple-500/50 text-white placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white/70 mb-1 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg bg-black ring-1 ring-purple-500/50 text-white placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-white/70 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-black ring-1 ring-purple-500/50 text-white placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-white/70 mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+8801XXXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-black ring-1 ring-purple-500/50 text-white placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-white/70 mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Your address"
                  value={form.address}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-black ring-1 ring-purple-500/50 text-white placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                  required
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="flex flex-col relative">
                <label className="text-white/70 mb-1 font-medium">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg ring-1 ring-purple-500/50 placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 translate-y-1/2 text-pink-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              <div className="flex flex-col">
                <label className="text-white/70 mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg ring-1 ring-purple-500/50 placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="accent-[#ac46ff] cursor-pointer"
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <span className="text-[#ac46ff] hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full btn-primary">
                Sign Up
              </button>
            </form>

            <div className="flex items-center my-5 text-white/50">
              <hr className="flex-1 border-white/20" />
              <span className="px-3">or</span>
              <hr className="flex-1 border-white/20" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2 rounded-lg bg-linear-to-r from-[#ac46ff33] to-[#ffc0cb33] text-white font-semibold flex items-center justify-center gap-3"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>

            {/* Already have account */}
            <p className="text-white/50 text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-[#ac46ff] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Glow text style */}
        <style>
          {`
          .glow-text {
            text-shadow: 0 0 5px #ac46ff, 0 0 10px #ac46ff, 0 0 20px #ffc0cb, 0 0 30px #ffc0cb;
          }
        `}
        </style>
      </Container>
    </motion.div>
  );
};

export default SignUp;
