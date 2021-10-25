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
    const { data } = await client.post("/auth/login", credentials);

    return data;
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