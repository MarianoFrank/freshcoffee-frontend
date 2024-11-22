import api from "../../config/axiosPrivate";
import useApiErrorHandler from '../../hooks/handleApiError';
import useSWR from "swr";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const { handleError } = useApiErrorHandler();

    const fetchProducts = async () => {
        const response = await api.get('/products');
        return response.data.data;
    };

    const { data, error, isLoading } = useSWR('/api/products', fetchProducts, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    const handleToggleAvailability = (productId, currentStatus) => {
        api.put(`/products/${productId}`, { available: !currentStatus })
            .then((response) => {
                if (response.data.message) {
                    toast.success(response.data.message);
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product.id === productId
                                ? { ...product, available: !currentStatus } // Cambiar la disponibilidad
                                : product
                        )
                    );
                }
            }).catch((error) => {
                console.log(error)
                handleError(error);
            });
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

    if (error) {
        console.error(error);
        handleError(error);
    }

    return (
        <div className="mx-auto p-4">
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products available</p>
            ) : (
                <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {product.name}
                                </h2>
                                <img loading="lazy"
                                    src={`/img/${product.image}.jpg`}
                                    alt={`Image ${product.name}`}
                                    className="h-10 w-10 rounded-full"
                                />
                            </div>

                            <div className="flex items-center justify-between my-2">

                                <p className="text-gray-600">
                                    <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between my-4">
                                <p className="text-gray-600">
                                    <span className="font-medium">Available:</span>{" "}
                                    {product.available ? "Yes" : "No"}
                                </p>
                                <button
                                    onClick={() => handleToggleAvailability(product.id, product.available)}
                                    className={`rounded py-2 px-4 rounded font-medium ${product.available ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                                        }`}
                                >
                                    {product.available ? "Mark as Unavailable" : "Mark as Available"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
