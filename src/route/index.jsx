import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RedirectedIfAuthenticated from "../features/auth/components/RedirectedIfAuthenticated";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import ProtectedAdminRoute from "../features/auth/components/ProtectedAdminRoute";
import Container from "../layouts/Container";
import StartSurveyPage from "../pages/employee/StartSurveyPage"
import HistoryPage from "../pages/employee/HistoryPage"
import CreateSurveyPage from "../pages/admin/CreateSurveyPage"
import FinishedSurveyPage from "../pages/admin/FinishedSurveyPage"
import OngoingSurveyPage from "../pages/admin/OngoingSurveyPage"
import EmployeeMgtPage from "../pages/admin/EmployeeMgtPage"
import SurveyFormPage from "../pages/admin/SurveyFormPage";
import SurveyContextProvider from "../features/survey/contexts/SurveyContext";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <RedirectedIfAuthenticated><LoginPage /></RedirectedIfAuthenticated>,
    },
    {
        path: "/",
        element:
            (
                <ProtectedRoute>
                    <SurveyContextProvider>
                        <Container /> {/* header and outlet */}
                    </SurveyContextProvider>
                </ProtectedRoute>
            ),
        children: [
            {
                path: "/",
                element: <StartSurveyPage />
            }, {
                path: "/history",
                element: <HistoryPage />
            },
            {
                path: "/admin",
                element:
                    (
                        <ProtectedAdminRoute>
                            <Outlet />
                        </ProtectedAdminRoute>
                    ),
                children: [
                    {
                        path: "/admin/create",
                        element: <CreateSurveyPage />
                    }, {
                        path: "/admin/ongoing",
                        element: <OngoingSurveyPage />
                    }, {
                        path: "/admin/finished",
                        element: <FinishedSurveyPage />
                    }, {
                        path: "/admin/employeeMgt",
                        element: <EmployeeMgtPage />
                    }, {
                        path: "/admin/surveyForm",
                        element: <SurveyFormPage />
                    }]
            }

        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />;
}