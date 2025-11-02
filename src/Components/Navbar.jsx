import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const NavLinks = [
    <NavLink to={"/"}>Home</NavLink>,
    <NavLink to={"/allProducts"}>All Products</NavLink>,
    <NavLink to={"/myProducts"}>My Products</NavLink>,
    <NavLink to={"/myBids"}>My Bids</NavLink>,
    <NavLink to={"/createProducts"}>Create Products</NavLink>,
  ];
  return (
    <div className="p-4 bg-black/20 shadow-lg ">
      <div className="flex gap-4 justify-between items-center container mx-auto px-4 md:px-10 lg:px-20">
        <Link to={"/"} className="text-3xl font-bold">
          Smart<span className="text-purple-500">Deals</span>
        </Link>
        <nav className="hidden lg:flex gap-4">{NavLinks}</nav>
        <div>
          <button className="btn-primary">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
