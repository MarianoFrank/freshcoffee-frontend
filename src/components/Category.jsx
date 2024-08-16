import { useCategory, useCategoryDispatch } from "../context/CategoryContext";

export default function Category({ category, className = "" }) {
  const { id, name, emoji } = category;

  const currentCategory = useCategory();
  const dispatch = useCategoryDispatch();

  return (
    <button
      className={` w-full  border-r ${
        currentCategory === name
          ? "border-r-white hover:"
          : "hover:bg-slate-100"
      } transition-colors justify-between font-bold border-b flex items-center gap-4 px-6 py-4 text-slate-800 cursor-pointer text-lg ${className}`}
      onClick={() => dispatch({ type: "SET_CATEGORY", category: name })}
    >
      <span>{emoji}</span>
      <div>{name}</div>
    </button>
  );
}
