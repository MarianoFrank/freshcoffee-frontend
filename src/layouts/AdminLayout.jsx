import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
export default function AdminLayout() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <div className="md:flex">
          <AdminSidebar />
          {/* margin left for sidebar fixed */}
          <main className="ml-72 flex-1">
            <Outlet />
          </main>
        </div>
      </AdminRoute>
    </PrivateRoute>
  )
}
