// app/actions/user.ts
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
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            group: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
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

    return posts;
}
