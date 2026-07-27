import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LeadsPage from "../pages/Leads/LeadsPage";
import MainLayout from "../components/layout/MainLayout";
import PostsPage from "../pages/Posts/PostsPage";
import CommentsPage from "../pages/Comments/CommentsPage";
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<DashboardPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route
    path="/posts"
    element={<PostsPage />}
/>
<Route
    path="/comments"
    element={<CommentsPage />}
/>
            </Route>
        </Routes>
    );
}