import { createContext, useContext, useState } from "react";

//este contexto mantiene el estado de la ventana modal de los productos
//probablemente deba cambiar el nombre del archivo de "ModalContext" a "ModalProductContext"
const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);

  //intercambia el valor del estado del modal
  const handleClickToggleModal = (product) => {
    if (product) {
      setProduct(product);
    }
    setShowModal(!showModal);
  };

  const handleClickIncreaseAmount = () => {
    const newAmount = amount + 1;
    if(newAmount < 6){
      setAmount(newAmount);
    }
  };

  const handleClickDecreaseAmount = () => {
    const newAmount = amount - 1;
    if(newAmount > 0){
      setAmount(newAmount);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        handleClickToggleModal,
        product,
        handleClickIncreaseAmount,
        handleClickDecreaseAmount,
        amount,
        setAmount
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext };

//esto facilita el acceso al contexto
export function useModal() {
  return useContext(ModalContext);
}
