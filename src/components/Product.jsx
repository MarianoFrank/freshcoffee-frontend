import { formatPrice } from "../helpers";
import { useModal } from "../context/ModalContext";

export default function Product({ product }) {
  const { name, price, image, category_id, id } = product;
  const { handleClickToggleModal } = useModal();
  return (
    <li className="border rounded-xl overflow-hidden flex flex-col">
      <img
        src={`/img/${image}.jpg`}
        alt={`Image ${name}`}
        className="w-full h-auto"
      />
      <div className="m-4 flex flex-col justify-between items-center h-full">
        <h3 className="font-bold text-slate-800 text-center">{name}</h3>
        <p className="font-bold text-yellow-600">{formatPrice(price)}</p>
        <button
          type="button"
          className="mt-4 bg-yellow-200 text-yellow-600 hover:bg-yellow-300 font-bold px-4 py-2 rounded-xl w-full border-yellow-300 border"
          onClick={() => handleClickToggleModal(product)}
        > 
          Add
        </button>
      </div>
    </li>
  );
}
