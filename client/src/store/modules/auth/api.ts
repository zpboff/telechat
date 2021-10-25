import { client } from "@/client";
import { Credentials } from "@/store/modules/auth/types";
import { AxiosError } from "axios";

export type UserInfo = {
    id: number;
    email: string;
}

export type AuthResult = {
    accessToken: string;
    user: UserInfo;
    errors?: string[];
}

export const login = async (credentials: Credentials) => {
    try {
        const response = await client.post<AuthResult>("/auth/login", credentials);
        console.log(response);

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<AuthResult>;

        if (error.response?.status === 403) {
            return error.response.data;
        }

        return null;
    }
};

export const register = async (credentials: Credentials) => {
    try {
        const response = await client.post<AuthResult>("/auth/registration", credentials);

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<AuthResult>;

        if (error.response?.status === 401) {
            return error.response.data;
        }

        return null;
    }
};

export const refresh = async () => {
    try {
        const response = await client.get<AuthResult>("/auth/refresh");

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<AuthResult>;

        if (error.response?.status === 401) {
            return error.response.data;
        }

        return null;
    }
}