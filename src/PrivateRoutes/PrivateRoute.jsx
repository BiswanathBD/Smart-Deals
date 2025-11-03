import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { pathname } = useLocation();

  if(loading){
    return <Loader></Loader>
  }

  if (!user) {
    return <Navigate to={"/signin"} state={pathname}></Navigate>;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
