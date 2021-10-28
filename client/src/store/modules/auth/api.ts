import { client } from "@/client";
import { Credentials, UserCreateModel } from "@/store/modules/auth/types";
import { AxiosError } from "axios";

export type UserInfo = {
    id: number;
    email: string;
}

export type AuthResult<TError> = {
    accessToken: string;
    user: UserInfo;
    errors?: TError;
}

export type LoginErrors = {
    email?: string[];
    password?: string[];
    common?: string[];
}

export type RegisterErrors = LoginErrors;
export type RefreshErrors = unknown;
export type LogoutResult = unknown;

export type LoginResult = AuthResult<LoginErrors>;
export type RegisterResult = AuthResult<RegisterErrors>;
export type RefreshResult = AuthResult<RefreshErrors>;

export const login = async (credentials: Credentials) => {
    try {
        const response = await client.post<LoginResult>("/auth/login", credentials);

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<LoginResult>;

        if (error.response?.status === 403) {
            return error.response.data;
        }

        return null;
    }
};

export const register = async (user: UserCreateModel) => {
    try {
        const response = await client.post<RegisterResult>("/auth/registration", user);

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<RegisterResult>;

        if (error.response?.status === 401) {
            return error.response.data;
        }

        return null;
    }
};

export const refresh = async () => {
    try {
        const response = await client.get<RefreshResult>("/auth/refresh");

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<RefreshResult>;

        if (error.response?.status === 401) {
            return error.response.data;
        }

        return null;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        await client.get<LogoutResult>("/auth/logout");

        return true;
    } catch (err: unknown) {
        return false;
    }
};