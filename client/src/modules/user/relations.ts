import { client } from "@/client";

export async function subscribe(login: string) {
    await client.post(`/users/subscribe/${login}`)
}

export async function accept(login: string) {
    await client.post(`/users/subscribe/${login}`)
}

export async function cancel(login: string) {
    await client.post(`/users/cancel/${login}`)
}

export async function block(login: string) {
    await client.post(`/users/accept/${login}`)
}