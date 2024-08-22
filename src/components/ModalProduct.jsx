import { useEffect } from "react";
import { formatPrice } from "../helpers";
import { useModal } from "../context/ModalContext";
import { useOrder } from "../context/OrderContext";
import { useState } from "react";
export default function ModalProduct({ children, product }) {
  const {
    amount,
    setAmount,
    handleClickDecreaseAmount,
    handleClickIncreaseAmount,
    handleClickToggleModal,
  } = useModal();

  const { handleAddOrder, orders } = useOrder();

  const [editMode, setEditMode] = useState(false);

  //mantiene la cantidad actualizada segun la seleccionada previamente
  useEffect(() => {
    const productEdit = orders.filter((order) => order.id === product.id)[0];
    if (productEdit) {
      setAmount(productEdit.amount);
      setEditMode(true);
    }
  }, [product]);

  return (
    <div className="flex gap-10">
      <div className="w-1/3">
        <img
          className=" rounded-md"
          src={`img/${product.image}.jpg`}
          alt={`Product Image ${product.name} `}
        />
      </div>
      <div className="w-2/3">
        <h2 className=" font-bold mb-3">{product.name}</h2>
        <p className="font-bold text-yellow-600 text-2xl">
          {formatPrice(product.price)}
        </p>
        {/* amount selector */}
        <div className="flex gap-2">
          <button onClick={() => handleClickDecreaseAmount()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          {amount}
          <button onClick={() => handleClickIncreaseAmount()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => {
            handleAddOrder({ ...product, amount });
            handleClickToggleModal();
          }}
          className="flex gap-2 border py-2 px-4 rounded-md bg-yellow-200"
        >
          {editMode ? "Save changes" : "Add to cart"}

          {!editMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}
