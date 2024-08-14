import { createContext } from "react";

const KioskContext = createContext();

const KioskProvider = ({ children }) => {
  const myFunction = () => {
    console.log(" hola mundo");
  };
  return (
    <KioskContext.Provider value={{ myFunction }}>
      {children}
    </KioskContext.Provider>
  );
};

export { KioskProvider };

export default KioskContext;
