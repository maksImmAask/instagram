import api from "./axios";

import type {
    LoginFormValues,
    LoginResponse,
    RegisterData,
    User,
} from "../types/auth";

export const login = async (
    data: LoginFormValues
): Promise<LoginResponse> => {

    const response = await api.post(
        "/auth/login/",
        data
    );

    return response.data;
};

export const register = async (
    data: RegisterData
) => {

    const response = await api.post(
        "/auth/register/",
        data
    );

    return response.data;
};

export const me = async (): Promise<User> => {

    const response = await api.get(
        "/auth/me/"
    );

    return response.data;
};