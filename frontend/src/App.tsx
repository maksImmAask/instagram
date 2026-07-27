import { useEffect } from "react";

import AppRouter from "./router";

import { me } from "./api/auth";

import { useAuthStore } from "./store/authStore";

export default function App() {

    const setUser = useAuthStore((state) => state.setUser);

    const logout = useAuthStore((state) => state.logout);

    const token = useAuthStore((state) => state.access);

    useEffect(() => {

        if (!token) return;

        me()
            .then((user) => {

                setUser(user);

            })
            .catch(() => {

                logout();

            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return <AppRouter />;

}