import { create } from "zustand";

export interface User {
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

    isAuthenticated: boolean;

    setTokens: (access: string, refresh: string) => void;

    setUser: (user: User | null) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

    access: localStorage.getItem("access"),

    refresh: localStorage.getItem("refresh"),

    user: null,

    isAuthenticated: !!localStorage.getItem("access"),

    setTokens: (access, refresh) => {

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        set({

            access,

            refresh,

            isAuthenticated: true,

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

            isAuthenticated: false,

        });

    },

}));