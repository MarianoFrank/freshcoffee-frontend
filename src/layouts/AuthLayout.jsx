import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="max-w-4xl mx-auto flex flex-col gap-10 md:flex-row mt-10 md:mt-48 items-start">
      <img src="/img/logo.svg" alt="Logo Image" className="max-w-xs" />
      <div className="w-full">
        <Outlet />
      </div>
    </main>
  );
}
