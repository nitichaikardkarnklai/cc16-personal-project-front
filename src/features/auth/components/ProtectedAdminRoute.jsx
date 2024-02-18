import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/use-auth"

export default function ProtectedAdminRoute({ children }) {
    const { authUser, isAdminMode } = useAuth();

    return (
        authUser.isAdmin && isAdminMode ? children : <Navigate to="/" />
    );
}