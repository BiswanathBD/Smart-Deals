import React, { use } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const ProductsDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  console.log(user, id);

  return <div>{user}</div>;
};

export default ProductsDetails;
