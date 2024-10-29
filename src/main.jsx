import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { CategoryProvider } from "./context/CategoryContext";
import { OrderProvider } from "./context/OrderContext";
import "./index.css";
import router from "./router";
import { FieldErrorProvider } from "./context/FieldErrorsContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <OrderProvider>
    <ModalProvider>
      <CategoryProvider>
        <FieldErrorProvider>
          <RouterProvider router={router} />
        </FieldErrorProvider>
      </CategoryProvider>
    </ModalProvider>
  </OrderProvider>
  // </StrictMode>
);
