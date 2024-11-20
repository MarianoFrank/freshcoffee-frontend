import { createContext, useContext, useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";

//este contexto mantiene el arreglo del resuemen de pedidos
const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  //Agrega o modifica una orden nueva que llega por parametro en el arreglo de ordenes
  const handleAddOrder = ({ category_id, ...newOrder }) => {
    const orderIndex = orders.findIndex((order) => order.id === newOrder.id);

    if (orderIndex !== -1) {
      const ordersModified = [...orders];
      ordersModified[orderIndex] = newOrder;
      setOrders(ordersModified);
      toast.success("Order Updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setOrders([...orders, newOrder]);
      toast.success("📦 Order Added", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDeleteOrder = (orderToDelete) => {
    const ordersModified = [...orders].filter(
      (order) => order.id !== orderToDelete.id
    );
    setOrders(ordersModified);
    toast.success("😖 Order Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  useEffect(() => {
    if (orders.length > 0) {
      const total = orders.reduce(
        (totalSum, order) => totalSum + order.price * order.amount,
        0
      );
      setTotal(total);
      return;
    }
    setTotal(0);
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        handleAddOrder,
        handleDeleteOrder,
        total,
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
