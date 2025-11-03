import React from "react";
import Container from "./Container";
import { Link } from "react-router";
import { MdLocalPhone, MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-black/50">
      <Container>
        <div className="space-y-8 pt-10! lg:pt-20! md:flex flex-wrap gap-10 justify-around xl:justify-between px-10">
          {/* logo and tag */}
          <div>
            <Link to={"/"} className="text-3xl font-bold">
              Smart<span className="text-purple-500">Deals</span>
            </Link>
            <p className="max-w-[320px] mt-4 text-gray-500">
              Your trusted marketplace for authentic local products. Discover
              the best deals from across Bangladesh.
            </p>
          </div>
          {/*Contact & Support */}
          <div>
            <p className="font-semibold text-lg text-purple-500">
              Contact & Support
            </p>
            <div className="flex flex-col gap-3 mt-4 text-gray-500 footer-nav w-fit">
              <p className="flex items-center gap-2">
                <MdOutlineMarkEmailUnread
                  size={24}
                  color="pink"
                ></MdOutlineMarkEmailUnread>{" "}
                <span>biswanath.sarker.bd@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MdLocalPhone size={24} color="pink"></MdLocalPhone>{" "}
                <span>+88016 2828 4848</span>
              </p>
              <p className="flex items-center gap-2">
                <IoLocationOutline size={24} color="pink"></IoLocationOutline>{" "}
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>
          {/* quick links */}
          <div>
            <p className="font-semibold text-lg text-purple-500">Quick Links</p>
            <div className="flex flex-col gap-3 mt-4 text-gray-500 footer-nav w-fit">
              <Link to={"/allProducts"}>All Products</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link to={"/login"}>Login</Link>
              <Link to={"/Register"}>Register</Link>
            </div>
          </div>
          {/* categories */}
          <div>
            <p className="font-semibold text-lg text-purple-500">Categories</p>
            <div className="flex flex-col gap-3 mt-4 text-gray-500 footer-nav w-fit">
              <Link to={"/electronics"}>Electronics</Link>
              <Link to={"/fashion"}>Fashion</Link>
              <Link to={"/home_Living"}>Home & Living</Link>
              <Link to={"/groceries"}>Groceries</Link>
            </div>
          </div>
          {/* categories */}
          <div className="w-fit">
            <p className="font-semibold text-center text-lg text-purple-500">
              Social Links
            </p>
            <div className="flex gap-6 mt-4 footer-nav text-2xl">
              <FaLinkedin></FaLinkedin>
              <FaFacebookSquare></FaFacebookSquare>
              <FaSquareXTwitter></FaSquareXTwitter>
            </div>
          </div>
        </div>
        <p className="text-center py-4 border-t border-white/10 text-purple-500/40 mt-8">
          © 2025 SmartDeals. All rights reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
