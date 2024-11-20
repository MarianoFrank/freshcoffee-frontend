
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("USER"));

    const isAdmin = () => user.admin;

    useEffect(() => {

        if (!isAdmin()) {
            navigate('/')
        }

    }, [])

    return children;
};

export default AdminRoute;
