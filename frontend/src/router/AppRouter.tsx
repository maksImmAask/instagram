import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                element={
                    <ProtectedRoute>

                        <MainLayout />

                    </ProtectedRoute>
                }
            >

                <Route
                    path="/"
                    element={<DashboardPage />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>

    );

}