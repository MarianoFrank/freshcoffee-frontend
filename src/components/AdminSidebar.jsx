import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export default function AdminSidebar() {
    const location = useLocation();
    const { logout } = useAuth({ middleware: "auth" });
    return (
        <aside className="md:w-48 h-screen p-4 border-r">
            <div className="p-4 flex flex-col gap-10">
                <img src="/img/logo.svg" alt="logo image" />
                <nav className="flex flex-col gap-8">
                    <Link
                        to="/admin"
                        className={`px-4 py-2 rounded text-slate-700 font-bold text-center 
                            ${location.pathname === "/admin" ? "bg-slate-200" : "hover:bg-slate-300"}`}
                    >
                        Orders
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`px-4 py-2 rounded text-slate-700 font-bold text-center 
                            ${location.pathname === "/admin/products" ? "bg-slate-200" : "hover:bg-slate-300"}`}
                    >
                        Products
                    </Link>
                    <Link
                        to="/order/display"
                        className={`px-4 py-2 rounded text-slate-700 font-bold text-center 
                            ${location.pathname === "/admin/products" ? "bg-slate-200" : "hover:bg-slate-300"}`}
                    >
                        Order display
                    </Link>
                    <div className=" flex-1 w-full flex flex-col px-5 pt-10 justify-between">
                        <button onClick={
                            logout
                        } className="bg-red-600 mb-3  px-4 py-2 rounded-md text-white font-bold">
                            Logout
                        </button>
                        <footer className="text-center text-sm text-slate-400">
                            <p>
                                Fresh Coffee. Admin Panel.
                            </p>
                        </footer>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
