'use server';

import { protectedServerQuery } from "../core/server";
import { getUserSession } from "../core/session";
import { authHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getBookmarksByUser = async (userId: string) => {
    return await protectedServerQuery(
        `/api/destinations/bookmark/${userId}`
    );
};

export const addBookmark = async (destinationId: string) => {
    const user = await getUserSession();

    if (!user) {
        throw new Error("User not logged in");
    }

    const res = await fetch(
        `${baseUrl}/api/destinations/bookmark`,
        {
            method: "POST",
            headers: {
                ...(await authHeader()),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user.id,
                destinationId,
            }),
        }
    );
     const data = await res.json().catch(() => null);

    if (!res.ok) {
       

        if (res.status === 409) {
            throw new Error("Already in bookmark");
        }

        throw new Error(
            data?.message || "Failed to add bookmark"
        );
    }

    return data;
};