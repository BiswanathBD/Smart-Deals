import { createBrowserRouter } from "react-router";
import Root from "./Root";
import HomePage from "../Pages/HomePage";
import AllProducts from "../Pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path: 'allProducts',
        element: <AllProducts></AllProducts>
      },
    ]
  },
]);

export default router;
