import { createContext, useContext, useEffect, useState } from "react";
import api from "../../config/axiosPrivate";
import useApiErrorHandler from "../../hooks/handleApiError";

//este contexto mantiene dos estados, el arreglo de categorias y la categoria seleccionada
const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  //almacena el arreglo de categoria que admite el kiosco
  const [categories, setCategories] = useState([]);
  //almacena la categoria seleccionada o actual
  const [selectedCategory, setSelectedCategory] = useState({ id: 1 });
  //maneja el click en el sidebar de categorias
  const handleClickCategory = (categoryClicked) => {
    setSelectedCategory(categoryClicked);
  };


  const { handleError } = useApiErrorHandler()

  useEffect(() => {
    //consulta en la base de datos luego de cargar el componente

    api.get("/categories")
      .then((response) => {
        const categories = response.data.data;
        setCategories(categories);
        setSelectedCategory(categories[0]);
      }).catch((error) => {
        handleError(error)
      })
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, selectedCategory, handleClickCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContext };

//esto facilita el acceso al contexto
export function useCategory() {
  return useContext(CategoryContext);
}
