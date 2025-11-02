import React, { useState } from "react";
import { FaClipboardList, FaFileMedical, FaHome } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { RiMenuFold3Line, RiMenuFold4Line } from "react-icons/ri";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [show, setShow] = useState();

  const mobileNav = [
    <NavLink key="home" to={"/"} className="flex gap-2 items-center">
      <FaHome size={24}></FaHome>
      <span>Home</span>
    </NavLink>,
    <NavLink
      key="allProducts"
      to={"/allProducts"}
      className="flex gap-2 items-center"
    >
      <FaBasketShopping size={24}></FaBasketShopping>
      <span>All Products</span>
    </NavLink>,
    <NavLink
      key="myProducts"
      to={"/myProducts"}
      className="flex gap-2 items-center"
    >
      <FaClipboardList size={24}></FaClipboardList>
      <span>My Products</span>
    </NavLink>,
    <NavLink key="myBids" to={"/myBids"} className="flex gap-2 items-center">
      <FaClipboardList size={24}></FaClipboardList>
      <span>My Bids</span>
    </NavLink>,
    <NavLink
      key="createProducts"
      to={"/createProducts"}
      className="flex gap-2 items-center"
    >
      <FaFileMedical size={24}></FaFileMedical>
      <span>Create Products</span>
    </NavLink>,
  ];

  const NavLinks = [
    <NavLink key="home" to={"/"}>
      Home
    </NavLink>,
    <NavLink key="allProducts" to={"/allProducts"}>
      All Products
    </NavLink>,
    <NavLink key="myProducts" to={"/myProducts"}>
      My Products
    </NavLink>,
    <NavLink key="myBids" to={"/myBids"}>
      My Bids
    </NavLink>,
    <NavLink key="createProducts" to={"/createProducts"}>
      Create Products
    </NavLink>,
  ];

  return (
    <div className="py-4 bg-black/20">
      <div className="flex gap-4 justify-between items-center container mx-auto px-4 md:px-10 lg:px-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShow(!show)}
            className="text-3xl text-purple-500 lg:hidden"
          >
            {show ? (
              <RiMenuFold4Line></RiMenuFold4Line>
            ) : (
              <RiMenuFold3Line></RiMenuFold3Line>
            )}
          </button>
          {/* mobile nav */}
          <div
            className={`absolute lg:hidden top-0 h-screen bg-black/50 backdrop-blur-lg z-10 p-16 transition-all duration-500 shadow-2xl shadow-black
            ${
              show
                ? "right-0 opacity-100"
                : "-right-10 opacity-0 pointer-events-none"
            }
            `}
          >
            <nav
              onClick={() => setShow(false)}
              className="flex flex-col lg:hidden gap-12"
            >
              {mobileNav}
            </nav>
          </div>

          <Link to={"/"} className="text-3xl font-bold">
            Smart<span className="text-purple-500">Deals</span>
          </Link>
        </div>

        {/* large display nav */}
        <nav className="hidden text-sm lg:flex gap-6">{NavLinks}</nav>

        <div>
          <Link to={"/signin"} className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
