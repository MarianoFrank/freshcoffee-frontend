import axiosClient from "../config/axios";
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useLoginModal } from "../src/context/ModalLoginContext";

export const useAuth = (redirectUrl) => {
  const navigate = useNavigate();
  const { showLoginModal, setShowLoginModal } = useLoginModal();
  const login = async (data, setErrors) => {
    try {
      const response = await axiosClient.post("/login", data);
      setErrors({});
      //console.log(response.data.access_token);
      localStorage.setItem("ACCESS_TOKEN", response.data.access_token);

      if (response.data.refresh_token) {
        localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
      }

      // // Decodificar el payload del access_token para obtener los datos del usuario
      // const decodedToken = jwtDecode(response.data.access_token);
      // const user = {
      //   name: decodedToken.name,
      //   email: decodedToken.email,
      // };
      // Guardar el objeto del usuario en localStorage
      //localStorage.setItem("USER", JSON.stringify(user));

      //cerrar la login modal por las dudas
      if (showLoginModal) {
        setShowLoginModal(false);
      } else {
        //redirecciona a home
        navigate(redirectUrl);
      }
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
    }
  };

  const register = () => {};
  const logout = () => {};
  return {
    login,
    register,
    logout,
  };
};
