import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-pink-400/80 mt-4"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-purple-400 mt-3 max-w-md"
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back to safety.
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 border border-purple-500 text-purple-400 rounded-xl hover:bg-purple-600/30 hover:text-white transition-all shadow-[0_0_12px_rgba(168,85,247,0.4)]"
        >
          ⬅ Go Back Home
        </Link>
      </motion.div>

      {/* Decorative gradient glow */}
      <div className="absolute inset-0 -z-10 bg-radial from-pink-500/10 to-transparent blur-3xl" />
    </div>
  );
};

export default NotFound;
