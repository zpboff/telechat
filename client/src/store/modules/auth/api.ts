import { client } from "@/client";
import { Credentials } from "@/store/modules/auth/types";

export const sendSignInRequest = async (credentials: Credentials) => {
    const { data } = await client.post("/signin", credentials);

    return data;
};

export const sendSignUpRequest = async (credentials: Credentials) => {
    const { data } = await client.post("/signin", credentials);

    return data;
};