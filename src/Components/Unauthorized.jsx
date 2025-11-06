import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-10 py-20 flex justify-center items-center text-white"
    >
      <div className="bg-black/5 border border-purple-500/20 shadow-[0_0_40px_rgba(155,85,255,0.2)] rounded-2xl p-10 max-w-md text-center backdrop-blur-xl">
        <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-500">
          401
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-purple-300">
          Unauthorized Access
        </h2>
        <p className="text-gray-400 mb-8">
          You don’t have permission to view this page.
          <br />
          Please sign in with an authorized account.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg bg-purple-500/20 border border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white transition-all"
          >
            Go Home
          </Link>

          <Link
            to={"/signin"}
            className="px-6 py-2 rounded-lg bg-pink-500/20 border border-pink-500 text-pink-300 hover:bg-pink-500 hover:text-white transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Unauthorized;
