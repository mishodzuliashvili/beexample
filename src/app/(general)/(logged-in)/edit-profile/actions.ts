"use server";

import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createRateLimiter, createRateLimitInfoSA } from "@/lib/rateLimiter";

// Create a rate limiter instance with custom options if needed
const profileRateLimiter = createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 2, // 5 requests per minute
});

export const getUpdateProfileRateLimitInfo =
    createRateLimitInfoSA(profileRateLimiter);

/**
 * Updates a user's profile information in the database with authentication and rate limiting
 *
 * @param data Object containing name and/or image to update
 * @returns Result object with success status and user data with rate limiter status or error message
 */
export async function updateProfile(data: { name?: string; image?: string }) {
    try {
        // Get the database user to ensure we're updating the right profile
        const currentUser = await getUser({});
        if (!currentUser) {
            return { success: false, error: "Not authenticated" };
        }

        // Apply rate limiting
        if (profileRateLimiter.check(currentUser.id)) {
            return {
                success: false,
                limitInfo: profileRateLimiter.getRateLimitInfo(currentUser.id),
                error: "Too many profile updates. Please try again later.",
            };
        }

        const { name, image } = data;

        // If no data to update, return early
        if (!name && !image) {
            return {
                success: true,
                message: "No changes to save",

                limitInfo: profileRateLimiter.getRateLimitInfo(currentUser.id),
            };
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                ...(name && { name }),
                ...(image && { image }),
                updatedAt: new Date(),
            },
        });
        const limitInfo = profileRateLimiter.getRateLimitInfo(currentUser.id);
        return { success: true, user: updatedUser, limitInfo };
    } catch (error) {
        console.error("Failed to update profile:", error);

        return { success: false, error: "Failed to update profile" };
    }
}
