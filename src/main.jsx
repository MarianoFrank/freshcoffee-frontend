import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import KioskProvider from "./context/KioskProvider";
import "./index.css";
import router from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <KioskProvider>
      <RouterProvider router={router} />
    </KioskProvider>
  </StrictMode>
);
