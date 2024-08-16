import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import "./index.css";
import router from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryProvider>
      <RouterProvider router={router} />
    </CategoryProvider>
  </StrictMode>
);
