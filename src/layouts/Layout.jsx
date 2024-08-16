import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Resume from "../components/Resume";

export default function Layout() {
  return (
    <div className="md:flex">
      <Sidebar />
      {/* margin left for sidebar fixed */}
      <main className="ml-72 flex-1">
        <Outlet />
      </main>
      <Resume />
    </div>
  );
}
