"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { PostType } from "@prisma/client";

export async function getUserGroups() {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Get groups where user is a member
    const memberships = await prisma.groupMember.findMany({
        where: {
            userId: user.id,
            status: "ACTIVE",
        },
        include: {
            group: true,
        },
    });

    return memberships.map((membership) => membership.group);
}

interface FeedOptions {
    groups?: string[];
    types?: PostType[];
}

// Define a correct return type
export async function getUserFeed(options: FeedOptions = {}) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Get user's groups if not specified
    let groupIds = options.groups || [];

    if (groupIds.length === 0) {
        const memberships = await prisma.groupMember.findMany({
            where: {
                userId: user.id,
                status: "ACTIVE",
            },
            select: {
                groupId: true,
            },
        });

        groupIds = memberships.map((m) => m.groupId);
    }

    if (groupIds.length === 0) {
        return [];
    }

    // Build where clause for post types
    const whereTypes =
        options.types && options.types.length > 0
            ? { type: { in: options.types } }
            : {};

    // Get posts from groups
    const posts = await prisma.post.findMany({
        where: {
            groupId: {
                in: groupIds,
            },
            ...whereTypes,
        },
        include: {
            group: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            reactions: {
                where: {
                    userId: user.id,
                },
                select: {
                    id: true,
                    type: true, // Explicitly select the type field
                },
                take: 1,
            },
            _count: {
                select: {
                    reactions: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 50,
    });

    // Transform the posts to include hasReacted flag and reaction type
    return posts.map((post) => ({
        ...post,
        hasReacted: true,
        reactionType: undefined,
        // Remove the reactions array to keep the response clean
        reactions: undefined,
    }));
}
