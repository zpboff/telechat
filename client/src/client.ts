import axios from "axios";

export const client = axios.create({
    baseURL: "http://auth.telechat.com:3001",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Credentials": "true"
    }
});

client.interceptors.request.use((config) => {
    return config;
});

client.interceptors.response.use((config) => {
    console.log(config);

    return config;
});