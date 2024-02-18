import { Link } from "react-router-dom";

export default function MenuItem({ children, active, to }) {
    return (
        <Link
            className={`${active ? "bg bg-orange-400" : "hover:bg-amber-500"} py-2 px-6 rounded-lg`}
            to={to}
        >
            <div className={active ? "" : "text-white"}>{children}</div>
        </ Link>
    )
}