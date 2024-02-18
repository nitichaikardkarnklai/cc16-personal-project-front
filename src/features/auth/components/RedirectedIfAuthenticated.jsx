import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";

export default function RedirectedIfAuthenticated({ children }) {
    const { authUser, isAdminMode } = useAuth();

    // console.log(authUser);

    return (
        authUser ? <Navigate to="/" /> : children
    )
}