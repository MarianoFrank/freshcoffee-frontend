
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/*este componenete funciona en caso que se visite alguna url que nose haga un llamado de
api automaticamente, porque sino el hook useApi redireccionara por su cuenta, ya que no
encontrará el token para hacer la peticion.
Entonces si el usuario entra pone una url y carga la pagina esto comprobara en eso casos  */
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const isAuth = () => {

    const token = localStorage.getItem("ACCESS_TOKEN");
    const refresh_token = localStorage.getItem("REFRESH_TOKEN");

    const isTokenExpired = (token) => {

      if (!token) return true;
      const decodedToken = jwtDecode(token);
      const now = Date.now() / 1000; // Fecha actual en segundos
      return decodedToken.exp < now;
    };

    // Verificar si el `refresh_token` está presente y válido para renovar el `ACCESS_TOKEN`
    if (refresh_token && !isTokenExpired(refresh_token)) {
      // Aquí podrías implementar la lógica para solicitar un nuevo ACCESS_TOKEN.
      return true; // Autenticado y se renovará el ACCESS_TOKEN
    }

    // Verificar si el `ACCESS_TOKEN` es válido
    if (token && !isTokenExpired(token)) {
      return true; // Autenticado
    }

    return false;
  }

  useEffect(() => {
    if (!isAuth()) {
      navigate('/auth/login')
    }
  }, [])

  return children;
};

export default PrivateRoute;
