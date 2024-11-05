import axiosClient from "../config/axios";
import api from "../config/axiosPrivate";
import { jwtDecode } from "jwt-decode";

export const useAuth = (redirectUrl) => {

    const login = async (data, setErrors) => {
        try {
            const response = await axiosClient.post("/login", data);
            setErrors({});
            console.log(response.data.access_token);
            localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
            localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token ?? null);

            // Decodificar el payload del access_token para obtener los datos del usuario
            const decodedToken = jwtDecode(response.data.access_token);
            const user = {
                name: decodedToken.name,
                email: decodedToken.email
            };

            // Guardar el objeto del usuario en localStorage
            localStorage.setItem("USER", JSON.stringify(user));

        } catch (error) {

            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
            if (error.response.data.error) {
                toast.error(error.response.data.error, {
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
            if (error.response.data.message) {
                toast.error(error.response.data.message, {
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
        }
    }

    const register = () => {

    }
    const logout = () => {

    }
    return {
        login, register, logout
    }
}