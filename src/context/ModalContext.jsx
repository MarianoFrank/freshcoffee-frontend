import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  
  const handleClickToggleModal = (product) => {
    if (product) {
      setProduct(product);
    }
    setShowModal(!showModal);
  };


  return (
    <ModalContext.Provider
      value={{
        showModal,
        handleClickToggleModal,
        product,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext };

export function useModal() {
  return useContext(ModalContext);
}
