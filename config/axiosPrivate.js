//cliente axios para peticiones con access_token
import axios from 'axios';
import { toast, Bounce } from "react-toastify";
/*
Todas las peticiones que llamemos con el cliente axios "api"
verificaran en cada respuesta si el acces_token esta expirado,
luego pediran uno nuevo y reintentaran la peticion.
*/

// Configurar Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "X-Request-With": "XMLHttpRequest",
    },
    withCredentials: true,
});


// Interceptor para actualizar el token en cada solicitud
api.interceptors.request.use(config => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;  // Elimina el encabezado si no hay token
    }
    return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response, // Manejar la respuesta normalmente
    async (error) => {
        const originalRequest = error.config;

        // Verificar si el error es 401 y si no es un intento de renovación de token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log("Token invalido, pidiendo otro")
            originalRequest._retry = true;

            try {
                // Obtener el refresh token
                const refreshToken = localStorage.getItem('REFRESH_TOKEN');
                if (!refreshToken) throw new Error();

                // Llamar a la URL de renovación del token
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/refresh/token`,
                    { Refresh: refreshToken },
                    { withCredentials: true }
                );

                // Actualizar el access_token en localStorage y en los encabezados de axios

                const newAccessToken = response.data.access_token;

                localStorage.setItem('ACCESS_TOKEN', newAccessToken);
                api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Reintentar la solicitud original con el nuevo token
                return api(originalRequest);
            } catch (refreshError) {
                // Manejar error de refresh token, si es necesario
                toast.error("Token could not be renewed", {
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
                // Opcional: redirigir a login o lanzar una notificación
                return Promise.reject();
            }
        }

        return Promise.reject(error);
    }
);

export default api;

