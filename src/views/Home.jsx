import { useCategory } from "../context/CategoryContext";
import useSWR from "swr";
import Product from "../components/Product";
import { PuffLoader } from "react-spinners";
import api from "../../config/axiosPrivate";
import useApiErrorHandler from "../../hooks/handleApiError";
//import { useLoginModal } from "../context/ModalLoginContext";
export default function Home() {
  const { selectedCategory } = useCategory();
  // const { setShowLoginModal } = useLoginModal();
  const categoryId = selectedCategory?.id;

  const { handleError } = useApiErrorHandler()
  const { data, error, isLoading } = useSWR(
    `/products?category_id=${categoryId}`,
    () =>
      api
        .get(`/products?category_id=${categoryId}`)
        .then((res) => res.data.data)
        .catch((error) => {
          /*
          En este caso swr seguira intentando hacer la peticion, es mejor para este
          caso redireccionar directamente al login.
          En cambio si estubieramos parados en un formulario seria mejos mostrar la modal 
          del login para iniciar sesion nuevamente.
          Ademas dentro de la moda estoy mostrarndo la misma vista del login lo ideal tal vez 
          sea hacer un LoginModal para modificar un poco el comportamiento.
          
           if (error instanceof InvalidTokenError) {
            //modal para iniciar sesion nuevamente
            setShowLoginModal(true);
          }

          por ende simplemente aca redireccionare a login pero que sepa que funciona la modal
          */
          // Si no hay refresh token, redirigir al login o manejar el error
          handleError(error);
        })
  );

  return (
    <div className="ml-4">

      <h1 className=" text-3xl font-bold text-slate-800 my-4">
        {selectedCategory ? selectedCategory.name : ""}
      </h1>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 shadow-sm mb-10">
        {data &&
          data.map((product) => (
            <Product key={product.image} product={product} />
          ))}
      </ul>
      {isLoading ? (
        <div className="flex items-center justify-center p-5 flex-col">
          <p className="mb-5">Loading</p>
          <PuffLoader size={50} />
        </div>
      ) : null}
    </div>
  );
}
