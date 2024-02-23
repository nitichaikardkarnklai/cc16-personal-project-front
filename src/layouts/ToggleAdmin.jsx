import useAuth from "../hooks/use-auth"
import { Link } from "react-router-dom";

export default function ToggleAdmin() {
    const { authUser, isAdminMode, setIsAdminMode } = useAuth();
    return (
        authUser.isAdmin ? (
            isAdminMode ? <button onClick={() => setIsAdminMode(false)}><Link to="/" className="text-[0.8rem] text-blue-500" >
                Admin
            </Link ></button>
                : <button onClick={() => setIsAdminMode(true)}><Link to="/admin/create" className="text-[0.8rem]" >
                    Employee
                </Link ></button>
        ) : ""
    )
}