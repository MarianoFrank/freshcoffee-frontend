import { useOrder } from "../context/OrderContext";
import Order from "../components/Order";
import { formatPrice } from "../helpers";

export default function Resume() {
  const { orders, total } = useOrder();

  const hasOrders = orders.length > 0;

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
          >
            Confirm Order
          </button>
        </div>
      </form>
    </aside>
  );
}
