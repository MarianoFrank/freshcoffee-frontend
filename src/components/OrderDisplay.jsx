//api
import useApiErrorHandler from '../../hooks/handleApiError';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import api from '../../config/axiosPrivate';

//broadcast
import echo from '../../config/echo.js';


/*
    Componente para mostrar la ordenes completadas en tiempo real
*/
const playNotificationSound = () => {
    const audio = new Audio('/sounds/two_bell_ring.mp3');
    audio.play();
};

const OrderDisplay = () => {
    const [orders, setOrders] = useState([]);

    const { handleError } = useApiErrorHandler();

    useEffect(() => {
        echo.private(`orders`)
            //el punto representa el namespace App\Events
            .listen('.OrderCompleted', (data) => {
                console.log(data.order)
                setOrders((orders) => [data.order, ...orders]);
                playNotificationSound();
            });

        return () => {
            echo.disconnect();
        };
    }, []);

    const fetchOrders = async () => {

        const response = await api.get(`/orders?status=completed&orderBy=desc&recently=true`);
        return response.data.data;
    };

    const { data, error, isLoading } = useSWR('/api/orders', fetchOrders, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

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

    if (!orders || orders.length === 0) return <p className="text-center text-gray-500">No orders available</p>;

    return (
        <div className="m-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Completed Orders ✅</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {orders.map((order) => (
                    <div key={order.id} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700">Order #{order.id}</h2>
                        <p className="text-gray-600">Customer: <span className="text-blue-600 font-medium">{order.user.name}</span></p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OrderDisplay;