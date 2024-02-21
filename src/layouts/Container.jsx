import { Outlet } from "react-router-dom";
import Header from "./Header";
import useSurvey from "../hooks/use-survey";
import Spinner from "../components/Spinner";

export default function Container() {
    const { loading } = useSurvey();

    if (loading) {

        return (
            <div className="h-screen">
                <Spinner />
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="py-4 px-6">
                <Outlet />
            </div>
        </div>
    )
}