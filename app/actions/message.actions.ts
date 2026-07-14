"use server";

import { redis } from "@/lib/db";
import { randomUUID } from "crypto";

interface SendMessageParams {
    senderId: string;
    receiverId: string;
    content: string;
    type?: "text" | "image";
}

export async function sendMessage({
    senderId,
    receiverId,
    content,
    type = "text",
}: SendMessageParams) {
    try {
        const conversationId = [senderId, receiverId].sort().join(":");

        const conversationKey = `conversation:${conversationId}:messages`;

        // Check if conversation already exists
        const conversationExists = (await redis.exists(conversationKey)) === 1;

        const message = {
            id: randomUUID(),
            senderId,
            receiverId,
            content,
            type,
            createdAt: Date.now(),
        };

        // Save message
        await redis.rpush(conversationKey, JSON.stringify(message));

        // If this is the first message, register the conversation for both users
        if (!conversationExists) {
            await redis.sadd(
                `user:${senderId}:conversations`,
                conversationId
            );

            await redis.sadd(
                `user:${receiverId}:conversations`,
                conversationId
            );
        }

        return {
            success: true,
            conversationId,
            conversationExists,
            message,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Failed to send message.",
        };
    }
}