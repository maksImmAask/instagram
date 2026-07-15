import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

interface Props {

    children: React.ReactNode;

}

export default function ProtectedRoute({
    children,
}: Props) {

    const access = useAuthStore(
        (state) => state.access
    );

    if (!access) {

        return <Navigate to="/login" replace />;

    }

    return children;

}