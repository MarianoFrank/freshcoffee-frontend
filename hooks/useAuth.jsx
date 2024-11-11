
import axiosClient from "../config/axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFieldError } from "../src/context/FieldErrorsContext";
import { jwtDecode } from "jwt-decode";

export function useAuth({ middleware, url }) {
    const { setErrors } = useFieldError(); //sirve para setear los errores de los field en caso que el usuario los haya ingresado mal
    const navigate = useNavigate();

    const redirect = () => {
        console.log([middleware, url])
        if (middleware === "guest" && url) {
            navigate(url);
        }
        if (middleware === "auth") {
            navigate('/auth/login');
        }
    }

    const showError = (error) => {
        console.log(error);
        if (error.response?.data?.type === "fields") {
            setErrors(error.response.data.errors); //errores del fiel (cliente inserto mal los campos)
            return;
        }
        if (error.response?.data?.type === "credentials") { //errores validacion
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
            return;
        }
        //Cualquier otro tipo de error
        return toast.error("An error has occurred, please try again later.", {
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

    const login = async (data) => {
        try {
            const response = await axiosClient.post("/login", data);

            localStorage.setItem("ACCESS_TOKEN", response.data.access_token);

            if (response.data.refresh_token) {
                localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
            }

            //  Decodificar el payload del access_token para obtener los datos del usuario
            const decodedToken = jwtDecode(response.data.access_token);
            const user = {
                name: decodedToken.name,
                email: decodedToken.email,
            };
            localStorage.setItem("USER", JSON.stringify(user));
            redirect();

        } catch (error) {
            showError(error);
        }
    }

    const register = async (data) => {
        try {
            await axiosClient.post("/register", data);
            setErrors({});
            toast.success("Account register success", {
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
            redirect();
        } catch (error) {
            showError(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("USER");
        redirect();
    }


    return {
        login,
        register,
        logout

    };
}
