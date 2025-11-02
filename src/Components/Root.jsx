import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar></Navbar>
      </div>

      {/* Dynamic Components */}
      <main className="grow">
        <Outlet></Outlet>
      </main>

      <div>
        <Footer></Footer>
      </div>

      {/* background animation */}
      <div className="w-1/2 md:w-1/3 lg:w-1/4 aspect-square blur-[100px] rounded-full bg-green-800/10 fixed -top-8 -right-8 -z-1">
      </div>
    </div>
  );
};

export default Root;
