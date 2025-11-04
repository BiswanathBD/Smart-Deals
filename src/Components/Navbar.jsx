import React, { use, useState, useEffect, useRef } from "react";
import { FaClipboardList, FaFileMedical, FaHome } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { RiMenuFold3Line, RiMenuFold4Line } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const [show, setShow] = useState();
  const { user, setUser, userSignOut } = use(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileNav = [
    <NavLink key="home" to={"/"} className="flex gap-2 items-center">
      <FaHome size={24} />
      <span>Home</span>
    </NavLink>,
    <NavLink
      key="allProducts"
      to={"/allProducts"}
      className="flex gap-2 items-center"
    >
      <FaBasketShopping size={24} />
      <span>All Products</span>
    </NavLink>,
    <NavLink
      key="myProducts"
      to={"/myProducts"}
      className="flex gap-2 items-center"
    >
      <FaClipboardList size={24} />
      <span>My Products</span>
    </NavLink>,
    <NavLink key="myBids" to={"/myBids"} className="flex gap-2 items-center">
      <FaClipboardList size={24} />
      <span>My Bids</span>
    </NavLink>,
    <NavLink
      key="createProducts"
      to={"/createProducts"}
      className="flex gap-2 items-center"
    >
      <FaFileMedical size={24} />
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

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        setUser(null);
      })
      .catch((e) => console.log(e.code));
  };

  return (
    <div className="py-4 bg-black/20">
      <div className="flex gap-4 justify-between items-center container mx-auto px-4 md:px-10 lg:px-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShow(!show)}
            className="text-3xl text-purple-500 lg:hidden"
          >
            {show ? <RiMenuFold4Line /> : <RiMenuFold3Line />}
          </button>

          {/* mobile nav */}
          <div
            className={`absolute lg:hidden top-0 h-screen bg-black/50 backdrop-blur-lg z-10 p-16 transition-all duration-500 shadow-2xl shadow-black
            ${
              show
                ? "right-0 opacity-100"
                : "-right-10 opacity-0 pointer-events-none"
            }`}
          >
            <nav
              onClick={() => setShow(false)}
              className={`flex flex-col lg:hidden ${
                show ? "gap-12" : "gap-4"
              } transition-all delay-200 duration-1000`}
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
          {user ? (
            <div className="relative" ref={profileRef}>
              <img
                onClick={() => setShowProfile(!showProfile)}
                className="w-12 aspect-square rounded-full border-2 border-purple-500 cursor-pointer"
                src={user.photoURL}
                alt=""
              />

              {/* profile dropdown */}
              <div
                className={`absolute right-0 bg-black/50 backdrop-blur-lg z-20 p-6 sm:p-8 w-72 transition-all duration-500 border border-purple-500/30 rounded-2xl shadow-[0_0_40px_#ac46ff30]
  ${
    showProfile ? "top-16 opacity-100" : "top-8 opacity-0 pointer-events-none"
  }`}
              >
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/2v9RkJ5/default-user.png"
                    }
                    alt="User"
                    className="w-20 h-20 rounded-full border-2 border-[#ac46ff] shadow-[0_0_20px_#ac46ff50]"
                  />
                  <h3 className="text-lg font-semibold text-white mt-3">
                    {user?.displayName || "Guest User"}
                  </h3>
                  <p className="text-sm text-white/70">
                    {user?.email || "Not available"}
                  </p>
                </div>

                {/* User Details */}
                <div className="mt-5 space-y-2 text-white/80 text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="font-medium text-white/60">Phone:</span>
                    <span>{user?.phoneNumber || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="font-medium text-white/60">Address:</span>
                    <span>{user?.address || "Not set"}</span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="w-full mt-6 btn-primary transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to={"/signin"} className="btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
