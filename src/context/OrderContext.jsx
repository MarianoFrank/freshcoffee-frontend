import { createContext, useContext, useState } from "react";
import { useModal } from "./ModalContext";
//este contexto mantiene el arreglo del resuemen de pedidos
const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const handleAddOrder = ({ category_id, image, ...newOrder }) => {
    const orderIndex = orders.findIndex((order) => order.id === newOrder.id);

    if (orderIndex !== -1) {
      const ordersModified = [...orders];
      ordersModified[orderIndex] = newOrder;
      setOrders(ordersModified);
    } else {
      setOrders([...orders, newOrder]);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        handleAddOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext };

//esto facilita el acceso al contexto
export function useOrder() {
  return useContext(OrderContext);
}
