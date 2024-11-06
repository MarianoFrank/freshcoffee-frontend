import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Resume from "../components/Resume";
import { useModal } from "../context/ModalContext";
import ReactModal from "react-modal";
import ModalProduct from "../components/ModalProduct";
import { CategoryProvider } from "../context/CategoryContext";
import { OrderProvider } from "../context/OrderContext";
import { useLoginModal } from "../context/ModalLoginContext";
import Login from "../views/Login";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//esto elimina el error en consola, define el elemento raiz de la app
ReactModal.setAppElement("#root");

export default function Layout() {
  const { showModal, handleClickToggleModal, product } = useModal();
  const { showLoginModal, setShowLoginModal } = useLoginModal();

  return (
    <CategoryProvider>
      <OrderProvider>
        <div className="md:flex">
          <Sidebar />
          {/* margin left for sidebar fixed */}
          <main className="ml-72 flex-1">
            <Outlet />
          </main>
          <Resume />
        </div>
        <ReactModal isOpen={showModal} style={customStyles}>
          <ModalProduct product={product}></ModalProduct>
          {/* Close Modal button */}
          <div className=" absolute top-0 right-0 p-2">
            <button onClick={() => handleClickToggleModal()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </ReactModal>

        {/* Modal para el login  */}
        <ReactModal isOpen={showLoginModal} style={customStyles}>
          <Login></Login>
        </ReactModal>
      </OrderProvider>
    </CategoryProvider>
  );
}
