import { createContext, useContext, useState } from "react";

const ModalLoginContext = createContext(null);

export function ModalLoginProvider({ children }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <ModalLoginContext.Provider
      value={{
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </ModalLoginContext.Provider>
  );
}

export { ModalLoginContext };

export function useLoginModal() {
  return useContext(ModalLoginContext);
}
