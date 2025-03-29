// app/actions.ts or components/groups/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Define input validation schema
const CreateGroupSchema = z.object({
    name: z
        .string()
        .min(1, "Group name is required")
        .max(100, "Group name is too long"),
    description: z.string().max(500, "Description is too long").optional(),
    ownerId: z.string().min(1, "Owner ID is required"),
});

type CreateGroupInput = z.infer<typeof CreateGroupSchema>;

/**
 * Creates a new group and adds the creator as the owner
 */
export async function createGroup(input: CreateGroupInput) {
    try {
        // Validate input
        const validatedData = CreateGroupSchema.parse(input);
        const stats = await prisma.statusUpdate.create({
            data: {
                expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
                userId: validatedData.ownerId,
            },
        });
        // Create the group
        const group = await prisma.group.create({
            data: {
                name: validatedData.name,
                description: validatedData.description || null,
                ownerId: validatedData.ownerId,
                // Automatically add the creator as a member with OWNER role
                memberships: {
                    create: {
                        userId: validatedData.ownerId,
                        role: "OWNER",
                        // We need to create a status update for the membership as per the schema requirement
                        statusUpdateId: stats.id,
                    },
                },
            },
            include: {
                memberships: true,
            },
        });

        // Revalidate the groups page to show the new group
        revalidatePath("/groups");

        return { success: true, group };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors
                .map((err) => err.message)
                .join(", ");
            throw new Error(`Validation error: ${errorMessage}`);
        }
        console.error("Failed to create group:", error);
        throw new Error("Failed to create group. Please try again.");
    }
}

/**
 * Fetches detailed information about a group including owner and members
 * This function is cached to improve performance for multiple calls
 */
export const getGroupDetails = cache(async (groupId: string) => {
    if (!groupId) {
        throw new Error("Group ID is required");
    }

    try {
        // Get the group with owner and members information
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                memberships: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                                status: true,
                            },
                        },
                        currentStatusUpdate: {
                            select: {
                                id: true,
                                heading: true,
                                imageUrl: true,
                                expiresAt: true,
                                createdAt: true,
                                updatedAt: true,
                                Reaction: {
                                    include: {
                                        user: {
                                            select: {
                                                id: true,
                                                name: true,
                                                image: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        if (!group) {
            throw new Error("Group not found");
        }

        // Format the response for the client
        return {
            ...group,
            members: group.memberships.map((membership) => ({
                id: membership.id,
                userId: membership.userId,
                createdAt: membership.createdAt,
                updatedAt: membership.updatedAt,
                role: membership.role,
                user: membership.user,
                statusUpdate: membership.currentStatusUpdate,
            })),
        };
    } catch (error) {
        console.error("Error fetching group details:", error);
        throw new Error("Failed to load group details");
    }
});

// Define input validation schema
const JoinGroupSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    groupId: z.string().min(1, "Group ID is required"),
});

type JoinGroupInput = z.infer<typeof JoinGroupSchema>;

/**
 * Adds a user to a group as a member
 */
export async function joinGroup(input: JoinGroupInput) {
    try {
        // Validate input
        const validatedData = JoinGroupSchema.parse(input);
        const { userId, groupId } = validatedData;

        // Check if the user is already a member of the group
        const existingMembership = await prisma.membership.findUnique({
            where: {
                userId_groupId: {
                    userId,
                    groupId,
                },
            },
        });

        if (existingMembership) {
            throw new Error("You are already a member of this group");
        }

        // Check if the group exists
        const group = await prisma.group.findUnique({
            where: {
                id: groupId,
            },
        });

        if (!group) {
            throw new Error("Group not found");
        }

        // Create a status update first (required by schema)
        const statusUpdate = await prisma.statusUpdate.create({
            data: {
                userId,
                // Set expiration to 6 hours from now (as per your requirements)
                expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
            },
        });

        // Create the membership
        const membership = await prisma.membership.create({
            data: {
                userId,
                groupId,
                role: "MEMBER",
                statusUpdateId: statusUpdate.id,
            },
        });

        // Revalidate the groups page to reflect changes
        revalidatePath("/groups");

        return { success: true, membership };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors
                .map((err) => err.message)
                .join(", ");
            throw new Error(`Validation error: ${errorMessage}`);
        }
        console.error("Failed to join group:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to join group. Please try again.");
    }
}

// Define input validation schema
const CreateStatusUpdateSchema = z.object({
    heading: z
        .string()
        .optional()
        .transform((val) => val || null),
    imageUrl: z
        .string()
        .url("Please provide a valid image URL")
        .optional()
        .transform((val) => val || null),
    userId: z.string().min(1, "User ID is required"),
    groupIds: z.array(z.string()).min(1, "At least one group must be selected"),
    expiresAt: z.date(),
});

type CreateStatusUpdateInput = z.infer<typeof CreateStatusUpdateSchema>;

/**
 * Creates a status update for a user across multiple groups
 */
export async function createStatusUpdate(input: CreateStatusUpdateInput) {
    try {
        // Validate input
        const validatedData = CreateStatusUpdateSchema.parse(input);
        const { heading, imageUrl, userId, groupIds, expiresAt } =
            validatedData;

        // Require at least heading or imageUrl
        if (!heading && !imageUrl) {
            throw new Error("Please provide at least a heading or image URL");
        }

        // Check if user is a member of all selected groups
        const memberships = await prisma.membership.findMany({
            where: {
                userId,
                groupId: {
                    in: groupIds,
                },
            },
        });

        const userGroupIds = memberships.map((m) => m.groupId);
        const invalidGroupIds = groupIds.filter(
            (id) => !userGroupIds.includes(id)
        );

        if (invalidGroupIds.length > 0) {
            throw new Error(`You are not a member of some selected groups`);
        }

        // Check if user already has active status updates in any of the groups
        const currentTime = new Date();
        const activeStatusUpdates = await prisma.statusUpdate.findMany({
            where: {
                userId,
                expiresAt: {
                    gt: currentTime,
                },
                Membership: {
                    some: {
                        userId,
                        groupId: {
                            in: groupIds,
                        },
                    },
                },
            },
        });

        if (activeStatusUpdates.length > 0) {
            throw new Error(
                "You already have active status updates in some of these groups"
            );
        }

        // Create the status update
        const statusUpdate = await prisma.statusUpdate.create({
            data: {
                heading,
                imageUrl,
                userId,
                expiresAt,
            },
        });

        // Update memberships to use this status update
        await prisma.$transaction(
            groupIds.map((groupId) =>
                prisma.membership.update({
                    where: {
                        userId_groupId: {
                            userId,
                            groupId,
                        },
                    },
                    data: {
                        statusUpdateId: statusUpdate.id,
                    },
                })
            )
        );

        // Revalidate relevant paths
        revalidatePath("/groups");
        revalidatePath("/dashboard");

        return { success: true, statusUpdate };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors
                .map((err) => err.message)
                .join(", ");
            throw new Error(`Validation error: ${errorMessage}`);
        }
        console.error("Failed to create status update:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to create status update. Please try again.");
    }
}
