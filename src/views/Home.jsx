import Product from "../components/Product";
import { products } from "../data/products";
import useKiosk from "../hooks/useKiosk";

export default function Home() {
  const {myFunction} = useKiosk();
  console.log(myFunction());
  return (
    <div className="ml-4">
      <p className=" text-3xl font-bold text-slate-800 my-4">
        Select the products 😋
      </p>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 shadow-sm mb-10">
        {products.map((product) => (
          <Product key={product.image} product={product} />
        ))}
      </ul>
    </div>
  );
}
