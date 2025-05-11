"use server";

import axios from "axios";
import { cookies } from "next/headers";

const fetcher = axios.create({
    baseURL: `http://localhost:8080`,
});

export async function setToken(newToken: string) {
    const cookieStore = await cookies();
    cookieStore.set("token", newToken);
}

export async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return token?.value;
}

export async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }
    try {
        const response = await fetcher.get(`/users`, {
            headers: {
                Authorization: token.value,
            },
        });
        return response.data as User;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function uploadFile(filename: string, file: File) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.post(
            `/files`,
            {
                filename,
                file,
            },
            {
                headers: {
                    Authorization: token.value,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getClubs() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const results: {
        myClubs: Organization[];
        allClubs: Organization[];
    } = {
        myClubs: [],
        allClubs: [],
    };

    if (!token || token.value === "") {
        return results;
    }

    try {
        const response = await fetcher.get(`/organizations/all`, {
            headers: {
                Authorization: token.value,
            },
        });
        results.allClubs = response.data.organizations as Organization[];
        // console.log(results.allClubs);
    } catch (error) {
        console.error(error);
    }

    if (token.value !== "") {
        try {
            const response = await fetcher.get(`/organizations`, {
                headers: {
                    Authorization: token.value,
                },
            });
            results.myClubs = response.data.organizations as Organization[];
            // console.log(results.myClubs);
        } catch (error) {
            console.error(error);
        }
    }
    return results;
}
