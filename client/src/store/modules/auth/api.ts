import { client } from "@/client";
import { Credentials } from "@/store/modules/auth/types";

export const login = async (credentials: Credentials) => {
    const { data } = await client.post("/login", credentials);

    return data;
};

export const register = async (credentials: Credentials) => {
    const { data } = await client.post("/register", credentials);

    return data;
};