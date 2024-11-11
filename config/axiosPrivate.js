//cliente axios para peticiones con access_token
import axios from "axios";
import { InvalidTokenError } from "jwt-decode";
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
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // Elimina el encabezado si no hay token
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response, // Manejar la respuesta normalmente
  async (error) => {
    const originalRequest = error.config;

    // Verificar si el error es 401 y si no es un intento de renovación de token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Marcar la solicitud como reintentada

      // Obtener el refresh token solo si está disponible
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      if (!refreshToken) {
        return Promise.reject(new InvalidTokenError()); // No hacer más intentos
      }

      try {
        // Llamar a la URL de renovación del token
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh/token`,
          { Refresh: refreshToken },
          { withCredentials: true }
        );

        // Actualizar el access_token en localStorage y en los encabezados de axios
        const newAccessToken = response.data.access_token;
        localStorage.setItem("ACCESS_TOKEN", newAccessToken);
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Reintentar la solicitud original con el nuevo token
        return api(originalRequest);
      } catch (refreshError) {
        // Si no se pudo renovar el token
        return Promise.reject(new InvalidTokenError()); // No hacer más intentos
      }
    }

    return Promise.reject(error); // Si no es un 401 o ya se intentó renovar, propagar el error
  }
);


export default api;
