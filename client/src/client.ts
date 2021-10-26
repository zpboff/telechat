import axios from "axios";
import { getToken } from "@/store/modules/auth/tokenStorage";

export const client = axios.create({
    baseURL: "http://auth.telechat.com:3001",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Credentials": "true"
    }
});

client.interceptors.request.use((config) => {
    if(!config.headers) {
        config.headers = {};
    }

    const token = getToken();
    config.headers["authorization"] = token ? `Bearer ${token}` : "";

    return config;
});

client.interceptors.response.use((config) => {
    console.log(config);

    return config;
});