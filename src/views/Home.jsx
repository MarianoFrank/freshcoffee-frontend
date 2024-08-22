import Product from "../components/Product";
import { products } from "../data/products";
import { useCategory } from "../context/CategoryContext";

export default function Home() {
  const { selectedCategory } = useCategory();
  const productsCategory = products.filter(
    (product) => product.category_id === selectedCategory.id
  );

  return (
    <div className="ml-4">
      <h1 className=" text-3xl font-bold text-slate-800 my-4">
        {selectedCategory.name}
      </h1>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 shadow-sm mb-10">
        {productsCategory.map((product) => (
          <Product key={product.image} product={product} />
        ))}
      </ul>
    </div>
  );
}
