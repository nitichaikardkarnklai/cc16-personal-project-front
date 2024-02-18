import { Link } from "react-router-dom"
import Icon from "../components/Icon"
import useAuth from "../hooks/use-auth"
import EmployeeHeader from "./EmployeeHeader";
import AdminHeader from "./AdminHeader";
import ToggleAdmin from "./ToggleAdmin";

export default function Header() {
    const { authUser, isAdminMode, logout } = useAuth();
    // console.log(authUser);
    return (
        <header className="navbar bg-gradient-to-r from-amber-400 to-orange-400 flex justify-between text-white py-2 px-4 shadow-2xl">
            <div>
                <div className="justify-self-start btn btn-ghost">
                    <Link to="/">
                        <Icon />
                    </Link>
                </div>
                <div className="place-self-end">
                    <ToggleAdmin />
                </div>
            </div>
            <div className="text-[1.2rem]">
                {isAdminMode ? <AdminHeader /> : <EmployeeHeader />}
            </div>
            <div className="justify-self-end place-self-center">
                <ul className="menu menu-horizontal px-1 relative">
                    <li>
                        <details>
                            <summary className="text-[1.4rem]">
                                {authUser.firstName} {authUser.lastName}
                            </summary>
                            <ul onClick={logout} className="p-2 bg-slate-400 absolute right-0 top-6">
                                <li><a>LOGOUT</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </header>
    )
}