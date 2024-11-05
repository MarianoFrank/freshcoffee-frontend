import { toast } from "react-toastify";
import api from "../../config/axiosPrivate";
const getCategories = async () => {
  try {
    const { data } = await api.get("/categories");

    return data.data;
  } catch (error) {
    if (error?.message) {
      console.log(error.message)
    }
    return [];
  }
};

const errorToast = (message) => {
  toast.error(`Error: ${message}`, {
    position: "top-right",
    hideProgressBar: true,
    progress: false,
    autoClose: false,
  });
};

export { getCategories };
