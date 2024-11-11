import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { InvalidTokenError } from 'jwt-decode';
export default function useApiErrorHandler() {
  const navigate = useNavigate();

  const handleError = (error) => {

    if (error instanceof InvalidTokenError) {
      // Comprobamos si ya hay un mensaje mostrando
      if (!toast.isActive('sessionExpiredToast')) {
        toast.error("Session expired. Please log in again.", {
          toastId: 'sessionExpiredToast', // Asignamos un ID único
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
      navigate('/auth/login');
    } else {
      // Comprobamos si ya hay un mensaje mostrando
      if (!toast.isActive('genericErrorToast')) {
        toast.error("An error occurred. Please try again.", {
          toastId: 'genericErrorToast', // Asignamos un ID único
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

  return { handleError };
};
