import { useCategory } from "../context/CategoryContext";

export default function Category({ category, className = "" }) {
  const { id, name, emoji } = category;

  const { selectedCategory,handleClickCategory } = useCategory();

  return (
    <button
      className={` w-full  border-r ${
        selectedCategory.name === name
          ? "border-r-white hover:"
          : "hover:bg-slate-100"
      } transition-colors justify-between font-bold border-b flex items-center gap-4 px-6 py-4 text-slate-800 cursor-pointer text-lg ${className}`}
      onClick={() => handleClickCategory(category)}
    >
      <span>{emoji}</span>
      <div>{name}</div>
    </button>
  );
}
