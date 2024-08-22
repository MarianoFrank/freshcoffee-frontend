import { createContext, useContext, useState } from "react";
import { categories as initialCategories } from "../data/categories";

//este contexto mantiene dos estados, el arreglo de categorias y la categoria seleccionada
const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  //almacena el arreglo de categoria que admite el kiosco
  const [categories, setCategories] = useState(initialCategories);
  //almacena la categoria seleccionada o actual
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategories[0]
  );
  //maneja el click en el sidebar de categorias
  const handleClickCategory = (categoryClicked) => {
    setSelectedCategory(categoryClicked)
  };

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
