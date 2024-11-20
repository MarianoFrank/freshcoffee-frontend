import { useOrder } from "../context/OrderContext";
import Order from "../components/Order";
import { formatPrice } from "../helpers";
import api from "../../config/axiosPrivate";
import useApiErrorHandler from "../../hooks/handleApiError";
import { toast } from "react-toastify";

export default function Resume() {
  const { orders, total, setOrders } = useOrder();

  const hasOrders = orders.length > 0;

  const { handleError } = useApiErrorHandler()
  const handleSubmit = (e) => {
    e.preventDefault();

    const products = orders.map(order => {
      return {
        id: order.id,
        quantity: order.amount
      }
    });

    const data = {
      total: total,
      products: products
    };
    //console.log(data)

    api.post('/orders', data).then(response => {
      if (response.data.message) {
        toast.success(response.data.message);
        setOrders([]); //limpio la orden porque ya se realizó
      }
    }).catch(error => {
      handleError(error);
    });
  }

  return (
    <aside className="md:w-72 h-screen p-4 overflow-y-scroll ">
      <h1 className=" font-bold text-3xl mb-4">My order</h1>
      <div>
        {orders.length === 0 ? (
          <p className="text-lg my-5">
            Here you can see the summary of your orders
          </p>
        ) : (
          orders.map((order) => <Order key={order.id} order={order} />)
        )}
      </div>

      <p>Total: {formatPrice(total)}</p>
      <form action="w-full">
        <div className="mt-5">
          <button
            type="submit"
            className={`${hasOrders ? "bg-yellow-300 hover:bg-yellow-400 cursor-pointer" : "bg-slate-300 cursor-not-allowed opacity-50"} rounded-md font-bold w-full text-center py-2`}
            disabled={!hasOrders}
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </form>
    </aside>
  );
}
