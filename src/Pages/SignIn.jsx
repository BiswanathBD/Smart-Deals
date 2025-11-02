import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../Context/AuthContext";
import Container from "../Components/Container";
import { Link } from "react-router";

const SignIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => console.log("Signed in as", result.user))
      .catch((e) => console.log(e.code));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Email Sign In", { email, password });
  };

  return (
    <Container>
      <div className="flex justify-center py-10">
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-[#ac46ff33] w-full max-w-md p-10 shadow-[0_0_80px_#ac46ff10]">
          <h2 className="text-4xl font-bold text-center text-white mb-8 glow-text">
            Welcome Back
          </h2>

          <form className="space-y-5" onSubmit={handleSignIn}>
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-white/70 mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-black ring-1 ring-purple-500/50 text-white placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-white/70 mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-lg  ring-1 ring-purple-500/50 placeholder-[#ffffff70] focus:outline-none focus:ring-2 focus:ring-[#ac46ff] transition duration-300 pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
              
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-[#ac46ff] text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="w-full btn-primary">
              Sign In
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

          <p className="text-white/50 text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-[#ac46ff] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Glow text effect */}
      <style>
        {`
          .glow-text {
            text-shadow: 0 0 5px #ac46ff, 0 0 10px #ac46ff, 0 0 20px #ffc0cb, 0 0 30px #ffc0cb;
          }
        `}
      </style>
    </Container>
  );
};

export default SignIn;
