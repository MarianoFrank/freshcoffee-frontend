import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";

import "./index.css";
import router from "./router";
import { FieldErrorProvider } from "./context/FieldErrorsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalLoginProvider } from "./context/ModalLoginContext";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>

    <ModalProvider>
      <FieldErrorProvider>
        <ModalLoginProvider>
          <RouterProvider router={router} />
        </ModalLoginProvider >
      </FieldErrorProvider>
    </ModalProvider>



    <ToastContainer />
  </>

  // </StrictMode>
);
