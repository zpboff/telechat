import { client } from "@/client";

export async function subscribe(login: string) {
    await client.post(`/users/subscribe/${login}`)
}