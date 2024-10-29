import { createContext, useContext, useState } from "react";

const FieldErrorContext = createContext(null);

export function FieldErrorProvider({ children }) {
  const [errors, setErrors] = useState({});

  //remueve el error del input con el nombre pasado por parametro
  const handleInputChange = (name) => {
    if (!errors[name]) {
      return;
    }
    const { [name]: removedError, ...rest } = errors; // Destructurar para quitar el error
    setErrors(rest); // Retornar el objeto sin el error del campo correspondiente
  };

  return (
    <FieldErrorContext.Provider
      value={{
        errors,
        setErrors,
        handleInputChange,
      }}
    >
      {children}
    </FieldErrorContext.Provider>
  );
}

export { FieldErrorContext };

export function useFieldError() {
  return useContext(FieldErrorContext);
}
