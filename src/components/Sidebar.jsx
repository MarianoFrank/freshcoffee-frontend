import Category from "./Category";
import { useCategory } from "../context/CategoryContext";

export default function Sidebar() {
  const { categories } = useCategory();
  return (
    <div className="md:w-72 h-screen fixed flex flex-col">
      <div className="border-r p-4 ">
        <img
          src="img/logo.svg"
          alt="Logo image"
          className="w-40 h-20 m-auto mb-4"
        />
      </div>

      <div className="">
        {categories.map((category, index) => (
          <Category
            key={category.id}
            category={category}
            // Add border top to first element
            className={index === 0 ? "border-t" : ""}
          />
        ))}
      </div>

      <div className="border-r flex-1 w-full flex flex-col px-5 pt-10 justify-between">
        <button className="bg-red-600  px-4 py-2 rounded-md text-white font-bold">
          Cancel order
        </button>
        <footer className="text-center text-sm pb-2 text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Fresh Coffee. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
