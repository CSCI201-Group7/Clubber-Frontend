"use server";

import axios from "axios";
import { cookies } from "next/headers";

const fetcher = axios.create({
    baseURL: `http://localhost:8080`,
});

export async function setCredentials(newToken: string, newUserId: string) {
    const cookieStore = await cookies();
    cookieStore.set("token", newToken);
    cookieStore.set("userId", newUserId);
}

export async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return token?.value;
}

export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    if (!userId || userId.value === "") {
        return null;
    }
    return userId.value;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("userId");
}

export async function getUser(id: string) {
    try {
        const response = await fetcher.get(`/users/${id}`);
        // console.log(response.data);
        return response.data as User;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSelf() {
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

export async function createReview(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.post(`/reviews`, formData, {
            headers: {
                Authorization: token.value,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function upvoteReview(reviewId: string, revoke: boolean = false) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.put(
            `/reviews/${reviewId}/upvote`,
            {
                revoke,
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

export async function downvoteReview(
    reviewId: string,
    revoke: boolean = false
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.put(
            `/reviews/${reviewId}/downvote`,
            {
                revoke,
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

export async function upvoteComment(
    commentId: string,
    revoke: boolean = false
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.put(
            `/comments/${commentId}/upvote`,
            {
                revoke,
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

export async function downvoteComment(
    commentId: string,
    revoke: boolean = false
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.put(
            `/comments/${commentId}/downvote`,
            {
                revoke,
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

export async function createComment(
    text: string,
    reviewId?: string,
    parentCommentId?: string
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }
    if (!reviewId && !parentCommentId) {
        return null;
    }

    try {
        const response = await fetcher.post(
            `/comments`,
            {
                text,
                reviewId: reviewId || null,
                parentCommentId: parentCommentId || null,
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

export async function updateUser(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        return null;
    }

    try {
        const response = await fetcher.put(`/users`, formData, {
            headers: {
                Authorization: token.value,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
