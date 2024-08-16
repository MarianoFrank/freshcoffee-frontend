import { createContext, useContext, useReducer } from "react";

const CategoryContext = createContext(null);
const CategoryDispatchContext = createContext(null);

const initialCategory = "all";

export function CategoryProvider({ children }) {
  const [category, dispatch] = useReducer(categoryReducer, initialCategory);

  return (
    <CategoryContext.Provider value={category}>
      <CategoryDispatchContext.Provider value={dispatch}>
        {children}
      </CategoryDispatchContext.Provider>
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}

export function useCategoryDispatch() {
  return useContext(CategoryDispatchContext);
}

function categoryReducer(currentCategory, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.category;
    default:
      return currentCategory;
  }
}
