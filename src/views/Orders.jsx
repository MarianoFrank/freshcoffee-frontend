
//api
import useApiErrorHandler from '../../hooks/handleApiError';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import api from '../../config/axiosPrivate';

//broadcast
import echo from '../../config/echo.js';
import { toast } from 'react-toastify';


export default function Orders() {

    const getCategoryEmoji = (categoryId) => {
        switch (categoryId) {
            case 1:
                return '☕'; // Coffee
            case 2:
                return '🍔'; // Hamburger
            case 3:
                return '🍕'; // Pizza
            case 4:
                return '🍩'; // Donuts
            case 5:
                return '🍰'; // Cakes
            case 6:
                return '🍪'; // Cookies
            default:
                return '🍽️'; // Default emoji for unknown categories
        }
    };

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        echo.private(`orders`)
            //el punto representa el namespace App\Events
            .listen('.NewOrder', (data) => {
                console.log(data.order)
                setOrders((orders) => [data.order, ...orders]);
            });

        return () => {
            echo.disconnect();
        };

        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;

        // const pusher = new Pusher('40b0353bc9aa49572748', {
        //     cluster: 'sa1',
        //     channelAuthorization: {
        //         endpoint: "http://localhost:80/broadcasting/auth",
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        //         },
        //     },
        // });

        // pusher.connection.bind('connected', function () {
        //     const channel = pusher.subscribe('private-orders');
        //     channel.bind('App\\Events\\NewOrder', function (data) {
        //         setOrders((orders) => [...orders, data.order]);
        //     });
        // });


        // return () => {
        //     //pusher.disconnect();
        // };
    }, []);



    const { handleError } = useApiErrorHandler();

    const fetchOrders = async () => {
        const response = await api.get('/orders?orderBy=desc');
        return response.data.data;
    };

    const { data, error, isLoading } = useSWR('/api/orders', fetchOrders, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    console.log(data)
    useEffect(() => {
        if (data) {
            setOrders(data); // Setear los pedidos iniciales
        }
    }, [data]);

    if (isLoading) return <p>Cargando...</p>;

    if (error) {
        console.error(error);
        handleError(error);
    }



    const handleCompleteOrder = async (orderId) => {
        api.put(`/orders/${orderId}`, { state: 1 })
            .then((response) => {
                if (response.data.message) {
                    toast.success(response.data.message);

                    setOrders((orders) => orders.filter(order => order.id !== response.data.order));
                }

            })
            .catch((error) => {
                handleError(error);
            });
    }


    return (
        <div className=" mx-auto p-4">
            {orders.length === 0 ? ( // Verificar si la lista está vacía
                <p className="text-center text-gray-500">No orders available</p>
            ) : (
                <ul className=" grid md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                        >
                            <div className='flex items-center mb-2 justify-between'>
                                <h2 className="text-xl font-bold text-gray-800 ">
                                    Order ID: <span className="text-blue-600">{order.id}</span>
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Created at: {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            <div className='flex items-center my-2 justify-between'>
                                <p className="text-gray-600 ">
                                    <span className="font-medium">State:</span>{" "}
                                    {order.state === 0 ? "Pending" : "Completed"}
                                </p>

                                <p className="text-gray-600 4">
                                    <span className="font-medium">User:</span> {order.user.name}
                                </p>
                            </div>


                            <div className="mt-4 border-t py-2">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Products</h3>
                                <ul className="space-y-2">
                                    {order.products.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
                                        >
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">
                                                    {getCategoryEmoji(product.category_id)}{" "}
                                                    {product.name}
                                                </h4>

                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-7000 font-medium">
                                                    Quantity: <span className='text-blue-700'>{product.order_product.quantity}</span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='flex items-center my-2 justify-between'>
                                <p className="text-gray-600 mb-4 mt-4 font-medium">
                                    Total:  <span className="text-blue-700 font-bold">${order.total.toFixed(2)}</span>
                                </p>
                                <button
                                    onClick={() => handleCompleteOrder(order.id)}
                                    className='blok bg-green-50 text-green-800 font-medium py-2 px-4 rounded border-green-700'>
                                    Completar ✅
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    );

}
