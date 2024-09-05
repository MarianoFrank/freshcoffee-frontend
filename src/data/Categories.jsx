import { toast } from "react-toastify";
import axiosClient from "../../config/axios";
const getCategories = async () => {
  try {
    const { data } = await axiosClient("/categories");

    return data.data;
  } catch (error) {
    errorToast(error.message);
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
