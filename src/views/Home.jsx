import { useCategory } from "../context/CategoryContext";
import useSWR from "swr";
import Product from "../components/Product";
import { PuffLoader } from "react-spinners";
import api from "../../config/axiosPrivate";

export default function Home() {
  const { selectedCategory } = useCategory();

  const categoryId = selectedCategory?.id;

  const { data, error, isLoading } = useSWR(
    `/products?page=1&available=true&category_id=${categoryId}`,
    () =>
      api.get(
        `/products?page=1&available=true&category_id=${categoryId}`
      ).then((res) => res.data.data)
  );

  return (
    <div className="ml-4">
      <button onClick={async () => api.get('/user').then((r) => console.log(r.data))}>pedir user</button>
      <h1 className=" text-3xl font-bold text-slate-800 my-4">
        {selectedCategory ? selectedCategory.name : ""}
      </h1>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 shadow-sm mb-10">
        {data &&
          data.map((product) => (
            <Product key={product.image} product={product} />
          ))}
      </ul>
      {isLoading ? (
        <div className="flex items-center justify-center p-5 flex-col">
          <p className="mb-5">Loading</p>
          <PuffLoader size={50} />
        </div>
      ) : null}
    </div>
  );
}
