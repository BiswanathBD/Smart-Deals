import { createBrowserRouter } from "react-router";
import Root from "./Root";
import HomePage from "../Pages/HomePage";
import AllProducts from "../Pages/AllProducts";
import ProductsDetails from "../Pages/ProductsDetails";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "allProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/products/:id",
        element: <ProductsDetails></ProductsDetails>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
