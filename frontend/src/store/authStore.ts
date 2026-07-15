import { create } from "zustand";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    phone: string;
}

interface AuthState {
    access: string | null;
    refresh: string | null;
    user: User | null;

    setTokens: (access: string, refresh: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),

    user: null,

    setTokens: (access, refresh) => {

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        set({
            access,
            refresh,
        });

    },

    setUser: (user) => {

        set({
            user,
        });

    },

    logout: () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        set({
            access: null,
            refresh: null,
            user: null,
        });

    },

}));