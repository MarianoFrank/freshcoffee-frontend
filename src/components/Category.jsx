export default function Category({ category, className = "" }) {
  const { id, name, emoji } = category;
  return (
    <div
      className={`border-r hover:bg-slate-100 transition-colors justify-between font-bold border-b flex items-center gap-4 px-6 py-4 text-slate-800 cursor-pointer text-lg ${className}`}
    >
      <span>{emoji}</span>
      <div>{name}</div>
    </div>
  );
}
