"use server";

import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createGroup(formData: FormData) {
    const user = await getUser({
        role: true,
    });

    if (!user || user.role !== "ADMIN") {
        return { error: "Unauthorized. Only admins can create groups." };
    }

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const image = formData.get("image") as string;

    if (!name || !slug || !image) {
        return { error: "All fields are required" };
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
        return {
            error: "Slug can only contain lowercase letters, numbers, and hyphens",
        };
    }

    try {
        // Check if slug already exists
        const existingGroup = await prisma.group.findUnique({
            where: { slug },
        });

        if (existingGroup) {
            return { error: "A group with this slug already exists" };
        }

        // Create the group
        const group = await prisma.group.create({
            data: {
                name,
                slug,
                image,
                owner: {
                    create: {
                        userId: user.id,
                    },
                },
            },
        });

        revalidatePath("/admin/groups");
        return { success: true, groupId: group.id };
    } catch (error) {
        console.error("Error creating group:", error);
        return { error: "Failed to create group. Please try again." };
    }
}

export async function joinGroup(groupId: string) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    const existingMembership = await prisma.groupMember.findFirst({
        where: {
            userId: user.id,
            groupId: groupId,
        },
    });

    if (existingMembership) {
        throw new Error("Already a member or pending");
    }

    await prisma.groupMember.create({
        data: {
            userId: user.id,
            groupId: groupId,
            status: "PENDING",
        },
    });

    revalidatePath("/groups");
}

export async function leaveGroup(groupId: string) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    await prisma.groupMember.deleteMany({
        where: {
            userId: user.id,
            groupId: groupId,
        },
    });

    revalidatePath("/groups");
}

export async function cancelJoinRequest(groupId: string) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    await prisma.groupMember.deleteMany({
        where: {
            userId: user.id,
            groupId: groupId,
            status: "PENDING",
        },
    });

    revalidatePath("/groups");
}
