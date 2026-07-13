

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redis } from "@/lib/db";

export async function getCurrentUser() {
    const { getUser } = getKindeServerSession();

    const kindeUser = await getUser();

    if (!kindeUser) {
        return {
            success: false,
        };
    }

    // Check if the user exists in Redis
    let user = await redis.hgetall(`user:${kindeUser.id}`);

    // Create the user if they don't exist
    if (!user) {
        user = {
            id: kindeUser.id,
            email: kindeUser.email,
            firstName: kindeUser.given_name,
            lastName: kindeUser.family_name,
            image: kindeUser.picture,
            createdAt: Date.now(),
        };

        await redis.hset(`user:${kindeUser.id}`, user);
    }

    return {
        success: true,
    };
}
export async function getAllUsers() {
    const { getUser } = getKindeServerSession();
    const currentUser = await getUser();

    if (!currentUser) {
        return {
            success: false,
            users: [],
        };
    }

    const keys = await redis.keys("user:*");

    const users = (
        await Promise.all(
            keys.map(async (key) => ({
                ...(await redis.hgetall(key)),
            }))
        )
    ).filter((user) => user.id !== currentUser.id);

    return {
        success: true,
        users,
    };
}