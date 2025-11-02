import React from "react";
import { CiSearch } from "react-icons/ci";
import Container from "./Container";
import heroBg from "../assets/hero.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="bg-white/5 relative">
      <Container>
        <div className="p-4 md:p-10 lg:p-20 text-center mx-auto">
          {/* bg left */}
          <img
            className="hidden sm:block absolute top-0 left-0 rotate-180 h-full"
            src={heroBg}
            alt=""
          />
          {/* bg right */}
          <img
            className="hidden sm:block absolute top-0 right-0 h-full"
            src={heroBg}
            alt=""
          />

          {/* content */}
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl lg:text-6xl lg:leading-20 font-bold">
              Deal your <span className="text-purple-500">Products</span> <br />{" "}
              in a <span className="text-purple-500">Smart</span> way !
            </h1>
            <p className="text-white/50">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>
            <form className="flex justify-center items-center min-w-1/2 max-w-md mx-auto shadow-lg shadow-black/10 rounded-full">
              <input
                className="text-gray-300 focus:outline-none px-5 py-2 bg-white/10 rounded-l-full grow"
                type="text"
                name="Search"
                id="Search"
                placeholder="search For Products, Categories..."
              />
              <button className="px-3 py-2 bg-linear-to-r from-[#ac46ff77] to-[#ffc0cb80] text-2xl rounded-r-full">
                <CiSearch></CiSearch>
              </button>
            </form>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={"/allProducts"} className="btn-primary rounded-lg!">
                View All Products
              </Link>
              <Link
                to={"/createProducts"}
                className="rounded-lg! border border-purple-500 py-[7px] px-6 font-semibold bg-linear-to-r from-[#ac46ff] to-[#ffc0cb] bg-clip-text text-transparent"
              >
                Post a Product
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
