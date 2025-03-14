import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminLayout from "./layouts/AdminLayout";
import Orders from "./views/Orders";
import Products from "./views/Products";
import ResetPassword from "./views/ResetPassword";
import NewPassword from "./views/NewPassword";
import OrderDisplay from "./components/OrderDisplay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ResetPassword />,
      },
      {
        path: "new-password",
        element: <NewPassword />,
      },
      {
        path: "verify-email",
        element: <div className="border border-blue-500 text-blue-500 p-4 rounded-md font-bold  "><p >📩 Please check your email inbox to verify your account.</p></div>,
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Orders />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/order/display",
    element: <OrderDisplay />,
  },
]);

export default router;
