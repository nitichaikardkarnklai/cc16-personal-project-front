import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Container() {

    return (
        <div>
            <Header />
            <div className="py-4 px-6">
                <Outlet />
            </div>
        </div>
    )
}