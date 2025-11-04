import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Components/Router";
import AuthProvider from "./Context/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "linear-gradient(90deg, #1e1b4b, #3b0764)",
            color: "#fff",
            border: "1px solid rgba(168,85,247,0.4)",
            boxShadow: "0 0 12px rgba(168,85,247,0.3)",
            fontSize: "15px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "10px 18px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>
);
